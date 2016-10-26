path = require('path');
webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

config = {

  debug: true,
  devtool: 'source-map',
  entry: {
    app : ['./src/entry.js'],
		vendor : [
							"bootstrap", 
							"crossfilter", 
							"d3",
							"dc",
							"immutable",
							"jquery",
							"jquery-ui",
							"underscore",
							"phylotree",
							"react",
							"redux"
						 ]
  },
  output: {
    path: path.resolve(__dirname, 'dist/'),
    filename: '[name].js',
  },
	externals: {
		"jsdom":"window"
	},
  module: {
    loaders: [{
      test: /\.js?$/,
      exclude: /node_modules/,
      loader: 'babel'
    }, {
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel'
    },
		{ test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader")},
		{ test: /jquery/, loader: 'expose?$!expose?jQuery' },
		{ test: /d3/, loader: 'expose?$!expose?d3' },
		{ test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/font-woff'},
		{ test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream'},
		{ test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file'},
		{ test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml'},
		],

  },
  plugins: [
		new webpack.optimize.CommonsChunkPlugin("vendor", "vendor.js"),
		new webpack.ProvidePlugin({
				$ : "jquery",
				d3: "d3",
				crossfilter : "crossfilter",
				dc : "dc",
				datamonkey : "datamonkey",
				_ : "underscore",
				jQuery: "jquery"
		}),
 		new webpack.IgnorePlugin(/jsdom$/),
		new ExtractTextPlugin("[name].css")
	],
  resolve: {
		alias: {
			'dc' : __dirname + '/node_modules/dc/dc.min.js',
			'dc.css' : __dirname + '/node_modules/dc/dc.min.css',
			'phylotree.css' : __dirname + '/node_modules/phylotree/phylotree.css',
		},
    modulesDirectories: [
      'src',
      'node_modules'
    ],
    extensions: ['', '.json', '.js', '.jsx']
	},
};

// Hot mode
if (process.env.HOT) {
  config.devtool = 'eval';
  config.entry.bundle.unshift('react-native-webpack-server/hot/entry');
  config.entry.bundle.unshift('webpack/hot/only-dev-server');
  config.entry.bundle.unshift('webpack-dev-server/client?http://localhost:8082');
  config.output.publicPath = 'http://localhost:8082/';
  config.plugins.unshift(new webpack.HotModuleReplacementPlugin());

  // Note: enabling React Transform and React Transform HMR:

  config.module.loaders[0].query.plugins.push('react-transform');
  config.module.loaders[0].query.extra = {
    'react-transform': [{
      target: 'react-transform-hmr',
      imports: ['react-native'],
      locals: ['module'],
    }],
  };
}

if (process.env.NODE_ENV === 'production') {
  config.devtool = false;
  config.debug = false;
  config.plugins.push(new webpack.optimize.OccurrenceOrderPlugin());
  config.plugins.push(new webpack.optimize.UglifyJsPlugin());
}

module.exports = config;
