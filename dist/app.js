webpackJsonp([0],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(14);


/***/ },

/***/ 14:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';
	
	var _bootstrap = __webpack_require__(18);
	
	var _bootstrap2 = _interopRequireDefault(_bootstrap);
	
	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}
	
	window.$ = window.JQuery = $;
	
	__webpack_require__(262);
	__webpack_require__(38);
	
	__webpack_require__(40);
	__webpack_require__(53);
	
	// Bundle exports under hyphyvision
	__webpack_require__(237);
	
	var absrel = __webpack_require__(59);
	var busted = __webpack_require__(223);
	var relax = __webpack_require__(235);
	
	// Create new hyphy-vision export
	window.absrel = absrel;
	window.busted = busted;
	window.relax = relax;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(15)))

/***/ },

/***/ 18:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },

/***/ 38:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },

/***/ 53:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($, d3, _, jQuery) {'use strict';
	
	var root = undefined;
	var datamonkey = function datamonkey() {};
	
	if (true) {
	  if (typeof module !== 'undefined' && module.exports) {
	    exports = module.exports = datamonkey;
	  }
	  exports.datamonkey = datamonkey;
	} else {
	  root.datamonkey = datamonkey;
	}
	
	datamonkey.errorModal = function (msg) {
	  $('#modal-error-msg').text(msg);
	  $('#errorModal').modal();
	};
	
	datamonkey.export_csv_button = function (data) {
	  data = d3.csv.format(data);
	  if (data !== null) {
	    var pom = document.createElement('a');
	    pom.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(data));
	    pom.setAttribute('download', 'export.csv');
	    pom.className = 'btn btn-default btn-sm';
	    pom.innerHTML = '<span class="glyphicon glyphicon-floppy-save"></span> Download CSV';
	    $("body").append(pom);
	    pom.click();
	    pom.remove();
	  }
	};
	
	datamonkey.save_image = function (type, container) {
	
	  var prefix = {
	    xmlns: "http://www.w3.org/2000/xmlns/",
	    xlink: "http://www.w3.org/1999/xlink",
	    svg: "http://www.w3.org/2000/svg"
	  };
	
	  function get_styles(doc) {
	
	    function process_stylesheet(ss) {
	      try {
	        if (ss.cssRules) {
	          for (var i = 0; i < ss.cssRules.length; i++) {
	            var rule = ss.cssRules[i];
	            if (rule.type === 3) {
	              // Import Rule
	              process_stylesheet(rule.styleSheet);
	            } else {
	              // hack for illustrator crashing on descendent selectors
	              if (rule.selectorText) {
	                if (rule.selectorText.indexOf(">") === -1) {
	                  styles += "\n" + rule.cssText;
	                }
	              }
	            }
	          }
	        }
	      } catch (e) {
	        console.log('Could not process stylesheet : ' + ss);
	      }
	    }
	
	    var styles = "",
	        styleSheets = doc.styleSheets;
	
	    if (styleSheets) {
	      for (var i = 0; i < styleSheets.length; i++) {
	        process_stylesheet(styleSheets[i]);
	      }
	    }
	
	    return styles;
	  }
	
	  var convert_svg_to_png = function convert_svg_to_png(image_string) {
	
	    var image = document.getElementById("hyphy-chart-image");
	
	    image.onload = function () {
	
	      var canvas = document.getElementById("hyphy-chart-canvas");
	      canvas.width = image.width;
	      canvas.height = image.height;
	      var context = canvas.getContext("2d");
	      context.fillStyle = "#FFFFFF";
	      context.fillRect(0, 0, image.width, image.height);
	      context.drawImage(image, 0, 0);
	      var img = canvas.toDataURL("image/png");
	      var pom = document.createElement('a');
	      pom.setAttribute('download', 'image.png');
	      pom.href = canvas.toDataURL("image/png");
	      $("body").append(pom);
	      pom.click();
	      pom.remove();
	    };
	
	    image.src = image_string;
	  };
	
	  var svg = $(container).find("svg")[0];
	  if (!svg) {
	    svg = $(container)[0];
	  }
	
	  var styles = get_styles(window.document);
	
	  svg.setAttribute("version", "1.1");
	
	  var defsEl = document.createElement("defs");
	  svg.insertBefore(defsEl, svg.firstChild);
	
	  var styleEl = document.createElement("style");
	  defsEl.appendChild(styleEl);
	  styleEl.setAttribute("type", "text/css");
	
	  // removing attributes so they aren't doubled up
	  svg.removeAttribute("xmlns");
	  svg.removeAttribute("xlink");
	
	  // These are needed for the svg
	  if (!svg.hasAttributeNS(prefix.xmlns, "xmlns")) {
	    svg.setAttributeNS(prefix.xmlns, "xmlns", prefix.svg);
	  }
	
	  if (!svg.hasAttributeNS(prefix.xmlns, "xmlns:xlink")) {
	    svg.setAttributeNS(prefix.xmlns, "xmlns:xlink", prefix.xlink);
	  }
	
	  var source = new XMLSerializer().serializeToString(svg).replace('</style>', '<![CDATA[' + styles + ']]></style>');
	  var rect = svg.getBoundingClientRect();
	  var doctype = '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">';
	  var to_download = [doctype + source];
	  var image_string = 'data:image/svg+xml;base66,' + encodeURIComponent(to_download);
	
	  if (type == "png") {
	    convert_svg_to_png(image_string);
	  } else {
	    var pom = document.createElement('a');
	    pom.setAttribute('download', 'image.svg');
	    pom.setAttribute('href', image_string);
	    $("body").append(pom);
	    pom.click();
	    pom.remove();
	  }
	};
	
	datamonkey.jobQueue = function (container) {
	
	  // Load template
	  _.templateSettings = {
	    evaluate: /\{\%(.+?)\%\}/g,
	    interpolate: /\{\{(.+?)\}\}/g,
	    variable: "rc"
	  };
	
	  d3.json('/jobqueue', function (data) {
	
	    var job_queue = _.template($("script.job-queue").html());
	
	    var job_queue_html = job_queue(data);
	    $("#job-queue-panel").find('table').remove();
	    $(container).append(job_queue_html);
	  });
	};
	
	datamonkey.status_check = function () {
	
	  // Check if there are any status checkers on the page
	  if ($(".status-checker").length) {
	    // Check health status and report back to element
	    var url = "/clusterhealth";
	    d3.json(url, function (data) {
	      // Add appropriate class based on result
	      if (data.successful_connection) {
	        d3.select('.status-checker').classed({ 'status-healthy': true, 'status-troubled': false });
	        $(".status-checker").attr("title", 'Cluster Status : Healthy');
	      } else {
	        d3.select('.status-checker').classed({ 'status-healthy': false, 'status-troubled': true });
	        $(".status-checker").attr("title", 'Cluster Status : Troubled; ' + data.msg.description);
	      }
	    });
	  }
	};
	
	datamonkey.validate_date = function () {
	
	  // Check that it is not empty
	  if ($(this).val().length === 0) {
	    $(this).next('.help-block').remove();
	    $(this).parent().removeClass('has-success');
	    $(this).parent().addClass('has-error');
	
	    jQuery('<span/>', {
	      class: 'help-block',
	      text: 'Field is empty'
	    }).insertAfter($(this));
	  } else if (isNaN(Date.parse($(this).val()))) {
	    $(this).next('.help-block').remove();
	    $(this).parent().removeClass('has-success');
	    $(this).parent().addClass('has-error');
	
	    jQuery('<span/>', {
	      class: 'help-block',
	      text: 'Date format should be in the format YYYY-mm-dd'
	    }).insertAfter($(this));
	  } else {
	    $(this).parent().removeClass('has-error');
	    $(this).parent().addClass('has-success');
	    $(this).next('.help-block').remove();
	  }
	};
	
	$(document).ready(function () {
	  $(function () {
	    $('[data-toggle="tooltip"]').tooltip();
	  });
	  $('#datamonkey-header').collapse();
	
	  var initial_padding = $("body").css("padding-top");
	
	  $("#collapse_nav_bar").on("click", function (e) {
	    $('#datamonkey-header').collapse('toggle');
	    $(this).find("i").toggleClass("fa-times-circle fa-eye");
	    var new_padding = $("body").css("padding-top") == initial_padding ? "5px" : initial_padding;
	    d3.select("body").transition().style("padding-top", new_padding);
	  });
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(15), __webpack_require__(54), __webpack_require__(57), __webpack_require__(15)))

/***/ },

/***/ 59:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(d3, $) {'use strict';
	
	var _absrel_summary = __webpack_require__(60);
	
	var _model_fits = __webpack_require__(218);
	
	var _tree_summary = __webpack_require__(219);
	
	var _tree = __webpack_require__(220);
	
	var _branch_table = __webpack_require__(221);
	
	var React = __webpack_require__(61),
	    ReactDOM = __webpack_require__(227);
	
	var datamonkey = __webpack_require__(53),
	    _ = __webpack_require__(264),
	    busted = __webpack_require__(228);
	
	__webpack_require__(224);
	__webpack_require__(225);
	
	
	var React = __webpack_require__(61);
	
	var BSREL = React.createClass({
	  displayName: 'BSREL',
	
	
	  float_format: d3.format(".2f"),
	
	  loadFromServer: function loadFromServer() {
	
	    var self = this;
	    d3.json(this.props.url, function (data) {
	
	      data["fits"]["MG94"]["branch-annotations"] = self.formatBranchAnnotations(data, "MG94");
	      data["fits"]["Full model"]["branch-annotations"] = self.formatBranchAnnotations(data, "Full model");
	
	      // GH-#18 Add omega annotation tag
	      data["fits"]["MG94"]["annotation-tag"] = "ω";
	      data["fits"]["Full model"]["annotation-tag"] = "ω";
	
	      var annotations = data["fits"]["Full model"]["branch-annotations"],
	          json = data,
	          pmid = data["PMID"],
	          test_results = data["test results"];
	
	      self.setState({
	        annotations: annotations,
	        json: json,
	        pmid: pmid,
	        test_results: test_results
	      });
	    });
	  },
	
	  getDefaultProps: function getDefaultProps() {
	
	    var edgeColorizer = function edgeColorizer(element, data) {
	
	      var self = this;
	
	      var svg = d3.select("#tree_container svg"),
	          svg_defs = d3.select(".phylotree-definitions");
	
	      if (svg_defs.empty()) {
	        svg_defs = svg.append("defs").attr("class", "phylotree-definitions");
	      }
	
	      // clear existing linearGradients
	
	      var scaling_exponent = 1.0 / 3,
	          omega_format = d3.format(".3r"),
	          prop_format = d3.format(".2p"),
	          fit_format = d3.format(".2f"),
	          p_value_format = d3.format(".4f");
	
	      self.omega_color = d3.scale.pow().exponent(scaling_exponent).domain([0, 0.25, 1, 5, 10]).range(self.options()["color-fill"] ? ["#DDDDDD", "#AAAAAA", "#888888", "#444444", "#000000"] : ["#6e4fa2", "#3288bd", "#e6f598", "#f46d43", "#9e0142"]).clamp(true);
	
	      var createBranchGradient = function createBranchGradient(node) {
	
	        function generateGradient(svg_defs, grad_id, annotations, already_cumulative) {
	
	          var current_weight = 0;
	          var this_grad = svg_defs.append("linearGradient").attr("id", grad_id);
	
	          annotations.forEach(function (d, i) {
	
	            if (d.prop) {
	              var new_weight = current_weight + d.prop;
	              this_grad.append("stop").attr("offset", "" + current_weight * 100 + "%").style("stop-color", self.omega_color(d.omega));
	              this_grad.append("stop").attr("offset", "" + new_weight * 100 + "%").style("stop-color", self.omega_color(d.omega));
	              current_weight = new_weight;
	            }
	          });
	        }
	
	        // Create svg definitions
	        if (self.gradient_count == undefined) {
	          self.gradient_count = 0;
	        }
	
	        if (node.annotations) {
	
	          if (node.annotations.length == 1) {
	            node['color'] = self.omega_color(node.annotations[0]["omega"]);
	          } else {
	            self.gradient_count++;
	            var grad_id = "branch_gradient_" + self.gradient_count;
	            generateGradient(svg_defs, grad_id, node.annotations.omegas);
	            node['grad'] = grad_id;
	          }
	        }
	      };
	
	      var annotations = data.target.annotations,
	          alpha_level = 0.05,
	          tooltip = "<b>" + data.target.name + "</b>",
	          reference_omega_weight = prop_format(0),
	          distro = '';
	
	      if (annotations) {
	
	        reference_omega_weight = annotations.omegas[0].prop;
	
	        annotations.omegas.forEach(function (d, i) {
	
	          var omega_value = d.omega > 1e20 ? "&infin;" : omega_format(d.omega),
	              omega_weight = prop_format(d.prop);
	
	          tooltip += "<br/>&omega;<sub>" + (i + 1) + "</sub> = " + omega_value + " (" + omega_weight + ")";
	
	          if (i) {
	            distro += "<br/>";
	          }
	
	          distro += "&omega;<sub>" + (i + 1) + "</sub> = " + omega_value + " (" + omega_weight + ")";
	        });
	
	        tooltip += "<br/><i>p = " + omega_format(annotations["p"]) + "</i>";
	
	        $(element[0][0]).tooltip({
	          'title': tooltip,
	          'html': true,
	          'trigger': 'hover',
	          'container': 'body',
	          'placement': 'auto'
	        });
	
	        createBranchGradient(data.target);
	
	        if (data.target.grad) {
	          element.style('stroke', 'url(#' + data.target.grad + ')');
	        } else {
	          element.style('stroke', data.target.color);
	        }
	
	        element.style('stroke-width', annotations["p"] <= alpha_level ? '12' : '5').style('stroke-linejoin', 'round').style('stroke-linecap', 'round');
	      }
	    };
	
	    return {
	      edgeColorizer: edgeColorizer
	    };
	  },
	
	  getInitialState: function getInitialState() {
	
	    var tree_settings = {
	      'omegaPlot': {},
	      'tree-options': {
	        /* value arrays have the following meaning
	            [0] - the value of the attribute
	            [1] - does the change in attribute value trigger tree re-layout?
	        */
	        'hyphy-tree-model': ['Full model', true],
	        'hyphy-tree-highlight': [null, false],
	        'hyphy-tree-branch-lengths': [true, true],
	        'hyphy-tree-hide-legend': [false, true],
	        'hyphy-tree-fill-color': [false, true]
	      },
	      'suppress-tree-render': false,
	      'chart-append-html': true,
	      'edgeColorizer': this.props.edgeColorizer
	    };
	
	    return {
	      annotations: null,
	      json: null,
	      pmid: null,
	      settings: tree_settings,
	      test_results: null,
	      tree: null
	    };
	  },
	
	  componentWillMount: function componentWillMount() {
	    this.loadFromServer();
	    this.setEvents();
	  },
	
	  setEvents: function setEvents() {
	
	    var self = this;
	
	    $("#datamonkey-absrel-json-file").on("change", function (e) {
	      var files = e.target.files; // FileList object
	
	      if (files.length == 1) {
	        var f = files[0];
	        var reader = new FileReader();
	
	        reader.onload = function (theFile) {
	          return function (e) {
	            var data = JSON.parse(this.result);
	            data["fits"]["MG94"]["branch-annotations"] = self.formatBranchAnnotations(data, "MG94");
	            data["fits"]["Full model"]["branch-annotations"] = self.formatBranchAnnotations(data, "Full model");
	
	            var annotations = data["fits"]["Full model"]["branch-annotations"],
	                json = data,
	                pmid = data["PMID"],
	                test_results = data["test results"];
	
	            self.setState({
	              annotations: annotations,
	              json: json,
	              pmid: pmid,
	              test_results: test_results
	            });
	          };
	        }(f);
	        reader.readAsText(f);
	      }
	
	      $("#datamonkey-absrel-toggle-here").dropdown("toggle");
	      e.preventDefault();
	    });
	  },
	
	  formatBranchAnnotations: function formatBranchAnnotations(json, key) {
	
	    var initial_branch_annotations = json["fits"][key]["branch-annotations"];
	
	    if (!initial_branch_annotations) {
	      initial_branch_annotations = json["fits"][key]["rate distributions"];
	    }
	
	    // Iterate over objects
	    var branch_annotations = _.mapObject(initial_branch_annotations, function (val, key) {
	
	      var vals = [];
	      try {
	        vals = JSON.parse(val);
	      } catch (e) {
	        vals = val;
	      }
	
	      var omegas = { "omegas": _.map(vals, function (d) {
	          return _.object(["omega", "prop"], d);
	        }) };
	      var test_results = _.clone(json["test results"][key]);
	      _.extend(test_results, omegas);
	      return test_results;
	    });
	
	    return branch_annotations;
	  },
	
	  initialize: function initialize() {
	
	    var model_fits_id = "#hyphy-model-fits",
	        omega_plots_id = "#hyphy-omega-plots",
	        summary_id = "#hyphy-relax-summary",
	        tree_id = "#tree-tab";
	  },
	
	  render: function render() {
	
	    var self = this;
	
	    return React.createElement(
	      'div',
	      { className: 'tab-content' },
	      React.createElement(
	        'div',
	        { className: 'tab-pane active', id: 'summary-tab' },
	        React.createElement(
	          'div',
	          { className: 'row' },
	          React.createElement(
	            'div',
	            { id: 'summary-div', className: 'col-md-12' },
	            React.createElement(_absrel_summary.BSRELSummary, { test_results: self.state.test_results,
	              pmid: self.state.pmid })
	          )
	        ),
	        React.createElement(
	          'div',
	          { className: 'row' },
	          React.createElement(
	            'div',
	            { id: 'hyphy-tree-summary', className: 'col-md-6' },
	            React.createElement(_tree_summary.TreeSummary, { json: self.state.json })
	          ),
	          React.createElement(
	            'div',
	            { id: 'hyphy-model-fits', className: 'col-md-6' },
	            React.createElement(_model_fits.ModelFits, { json: self.state.json })
	          )
	        )
	      ),
	      React.createElement(
	        'div',
	        { className: 'tab-pane', id: 'tree-tab' },
	        React.createElement(_tree.Tree, { json: self.state.json,
	          settings: self.state.settings })
	      ),
	      React.createElement(
	        'div',
	        { className: 'tab-pane', id: 'table_tab' },
	        React.createElement(_branch_table.BranchTable, { tree: self.state.tree,
	          test_results: self.state.test_results,
	          annotations: self.state.annotations })
	      )
	    );
	  }
	
	});
	
	// Will need to make a call to this
	// omega distributions
	function render_absrel(url, element) {
	  React.render(React.createElement(BSREL, { url: url }), document.getElementById(element));
	}
	
	module.exports = render_absrel;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(54), __webpack_require__(15)))

/***/ },

/***/ 60:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(d3, _) {'use strict';
	
	var React = __webpack_require__(61);
	
	var BSRELSummary = React.createClass({
	  displayName: 'BSRELSummary',
	
	
	  float_format: d3.format(".2f"),
	
	  countBranchesTested: function countBranchesTested(branches_tested) {
	
	    if (branches_tested) {
	      return branches_tested.split(';').length;
	    } else {
	      return 0;
	    }
	  },
	
	  getBranchesWithEvidence: function getBranchesWithEvidence(test_results) {
	
	    var self = this;
	    return _.filter(test_results, function (d) {
	      return d.p <= 0.05;
	    }).length;
	  },
	
	  getTestBranches: function getTestBranches(test_results) {
	
	    var self = this;
	    return _.filter(test_results, function (d) {
	      return d.tested > 0;
	    }).length;
	  },
	
	  getTotalBranches: function getTotalBranches(test_results) {
	
	    var self = this;
	    return _.keys(test_results).length;
	  },
	
	  getInitialState: function getInitialState() {
	
	    var self = this;
	
	    return {
	      branches_with_evidence: this.getBranchesWithEvidence(self.props.test_results),
	      test_branches: this.getTestBranches(self.props.test_results),
	      total_branches: this.getTotalBranches(self.props.test_results)
	    };
	  },
	
	  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	
	    this.setState({
	      branches_with_evidence: this.getBranchesWithEvidence(nextProps.test_results),
	      test_branches: this.getTestBranches(nextProps.test_results),
	      total_branches: this.getTotalBranches(nextProps.test_results)
	    });
	  },
	
	  render: function render() {
	
	    var self = this;
	
	    return React.createElement(
	      'ul',
	      { className: 'list-group' },
	      React.createElement(
	        'li',
	        { className: 'list-group-item list-group-item-info' },
	        React.createElement(
	          'h3',
	          { className: 'list-group-item-heading' },
	          React.createElement('i', { className: 'fa fa-list' }),
	          React.createElement(
	            'span',
	            { id: 'summary-method-name' },
	            'Adaptive branch site REL'
	          ),
	          ' summary'
	        ),
	        React.createElement(
	          'p',
	          { className: 'list-group-item-text lead' },
	          'Evidence',
	          React.createElement(
	            'sup',
	            null,
	            '\u2020'
	          ),
	          ' of episodic diversifying selection was found on',
	          React.createElement(
	            'strong',
	            null,
	            ' ',
	            self.state.branches_with_evidence
	          ),
	          ' out of',
	          React.createElement(
	            'span',
	            null,
	            ' ',
	            self.state.test_branches
	          ),
	          ' tested branches (',
	          React.createElement(
	            'span',
	            null,
	            self.state.total_branches
	          ),
	          ' total branches).'
	        ),
	        React.createElement(
	          'p',
	          null,
	          React.createElement(
	            'small',
	            null,
	            React.createElement(
	              'sup',
	              null,
	              '\u2020'
	            ),
	            React.createElement(
	              'abbr',
	              { title: 'Likelihood Ratio Test' },
	              'LRT'
	            ),
	            ' p \u2264 0.05, corrected for multiple testing.'
	          )
	        ),
	        React.createElement(
	          'p',
	          null,
	          React.createElement(
	            'small',
	            null,
	            'Please cite ',
	            React.createElement(
	              'a',
	              { href: 'http://www.ncbi.nlm.nih.gov/pubmed/25697341', id: 'summary-pmid', target: '_blank' },
	              'PMID 25697341'
	            ),
	            ' if you use this result in a publication, presentation, or other scientific work.'
	          )
	        )
	      )
	    );
	  }
	
	});
	
	// Will need to make a call to this
	// omega distributions
	function render_absrel_summary(test_results, pmid, element) {
	  React.render(React.createElement(BSRELSummary, { test_results: test_results, pmid: pmid }), document.getElementById(element));
	}
	
	module.exports.BSRELSummary = BSRELSummary;
	module.exports.render_absrel_summary = render_absrel_summary;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(54), __webpack_require__(57)))

/***/ },

/***/ 218:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(d3, _, $) {"use strict";
	
	var React = __webpack_require__(61);
	
	var ModelFits = React.createClass({
	  displayName: "ModelFits",
	
	
	  getInitialState: function getInitialState() {
	    var table_row_data = this.getModelRows(this.props.json),
	        table_columns = this.getModelColumns(table_row_data);
	
	    return {
	      table_row_data: table_row_data,
	      table_columns: table_columns
	    };
	  },
	
	  formatRuntime: function formatRuntime(seconds) {
	    var duration_string = "",
	        seconds = parseFloat(seconds);
	
	    var split_array = [Math.floor(seconds / (24 * 3600)), Math.floor(seconds / 3600) % 24, Math.floor(seconds / 60) % 60, seconds % 60],
	        quals = ["d.", "hrs.", "min.", "sec."];
	
	    split_array.forEach(function (d, i) {
	      if (d) {
	        duration_string += " " + d + " " + quals[i];
	      }
	    });
	
	    return duration_string;
	  },
	
	  getLogLikelihood: function getLogLikelihood(this_model) {
	    return d3.format(".2f")(this_model['log-likelihood']);
	  },
	
	  getAIC: function getAIC(this_model) {
	    return d3.format(".2f")(this_model['AIC-c']);
	  },
	
	  getNumParameters: function getNumParameters(this_model) {
	    return this_model['parameters'];
	  },
	
	  getBranchLengths: function getBranchLengths(this_model) {
	
	    if (this_model["tree length"]) {
	      return d3.format(".2f")(this_model["tree length"]);
	    } else {
	      return d3.format(".2f")(d3.values(this_model["branch-lengths"]).reduce(function (p, c) {
	        return p + c;
	      }, 0));
	    }
	  },
	
	  getRuntime: function getRuntime(this_model) {
	    //return this.formatRuntime(this_model['runtime']);
	    return this.formatRuntime(this_model['runtime']);
	  },
	
	  getDistributions: function getDistributions(m, this_model) {
	
	    var omega_distributions = {};
	    omega_distributions[m] = {};
	
	    var omega_format = d3.format(".3r"),
	        prop_format = d3.format(".2p"),
	        p_value_format = d3.format(".4f");
	
	    var distributions = [];
	
	    for (var d in this_model["rate-distributions"]) {
	
	      var this_distro = this_model["rate-distributions"][d];
	      var this_distro_entry = [d, "", "", ""];
	
	      omega_distributions[m][d] = this_distro.map(function (d) {
	        return {
	          'omega': d[0],
	          'weight': d[1]
	        };
	      });
	
	      for (var k = 0; k < this_distro.length; k++) {
	        this_distro_entry[k + 1] = omega_format(this_distro[k][0]) + " (" + prop_format(this_distro[k][1]) + ")";
	      }
	
	      distributions.push(this_distro_entry);
	    }
	
	    distributions.sort(function (a, b) {
	      return a[0] < b[0] ? -1 : a[0] == b[0] ? 0 : 1;
	    });
	
	    return distributions;
	  },
	
	  getModelRows: function getModelRows(json) {
	
	    if (!json) {
	      return [];
	    }
	
	    var table_row_data = [];
	    var omega_format = d3.format(".3r");
	    var prop_format = d3.format(".2p");
	    var p_value_format = d3.format(".4f");
	
	    for (var m in json["fits"]) {
	
	      var this_model_row = [],
	          this_model = json["fits"][m];
	
	      this_model_row = [this_model['display-order'], "", m, this.getLogLikelihood(this_model), this.getNumParameters(this_model), this.getAIC(this_model), this.getRuntime(this_model), this.getBranchLengths(this_model)];
	
	      var distributions = this.getDistributions(m, this_model);
	
	      if (distributions.length) {
	
	        this_model_row = this_model_row.concat(distributions[0]);
	        this_model_row[1] = distributions[0][0];
	
	        table_row_data.push(this_model_row);
	
	        for (var d = 1; d < distributions.length; d++) {
	
	          var this_distro_entry = this_model_row.map(function (d, i) {
	            if (i) return "";
	            return d;
	          });
	
	          this_distro_entry[1] = distributions[d][0];
	
	          for (var k = this_distro_entry.length - 4; k < this_distro_entry.length; k++) {
	            this_distro_entry[k] = distributions[d][k - this_distro_entry.length + 4];
	          }
	
	          table_row_data.push(this_distro_entry);
	        }
	      } else {
	        table_row_data.push(this_model_row);
	      }
	    }
	
	    table_row_data.sort(function (a, b) {
	      if (a[0] == b[0]) {
	        return a[1] < b[1] ? -1 : a[1] == b[1] ? 0 : 1;
	      }
	      return a[0] - b[0];
	    });
	
	    table_row_data = table_row_data.map(function (r) {
	      return r.slice(2);
	    });
	
	    return table_row_data;
	  },
	
	  getModelColumns: function getModelColumns(table_row_data) {
	
	    var model_header = '<th>Model</th>',
	        logl_header = '<th><em> log </em>L</th>',
	        num_params_header = '<th><abbr title="Number of estimated model parameters"># par.</abbr></th>',
	        aic_header = '<th><abbr title="Small Sample AIC">AIC<sub>c</sub></abbr></th>',
	        runtime_header = '<th>Time to fit</th>',
	        branch_lengths_header = '<th><abbr title="Total tree length, expected substitutions/site">L<sub>tree</sub></abbr></th>',
	        branch_set_header = '<th>Branch set</th>',
	        omega_1_header = '<th>&omega;<sub>1</sub></th>',
	        omega_2_header = '<th>&omega;<sub>2</sub></th>',
	        omega_3_header = '<th>&omega;<sub>3</sub></th>';
	
	    // inspect table_row_data and return header
	    var all_columns = [model_header, logl_header, num_params_header, aic_header, runtime_header, branch_lengths_header, branch_set_header, omega_1_header, omega_2_header, omega_3_header];
	
	    // validate each table row with its associated header
	    if (table_row_data.length == 0) {
	      return [];
	    }
	
	    // trim columns to length of table_row_data
	    var column_headers = _.take(all_columns, table_row_data[0].length);
	
	    // remove all columns that have 0, null, or undefined rows
	    var items = d3.transpose(table_row_data);
	
	    return column_headers;
	  },
	
	  componentDidUpdate: function componentDidUpdate() {
	
	    var model_columns = d3.select('#summary-model-header1');
	    model_columns = model_columns.selectAll("th").data(this.state.table_columns);
	    model_columns.enter().append("th");
	    model_columns.html(function (d) {
	      return d;
	    });
	
	    var model_rows = d3.select('#summary-model-table').selectAll("tr").data(this.state.table_row_data);
	    model_rows.enter().append('tr');
	    model_rows.exit().remove();
	    model_rows = model_rows.selectAll("td").data(function (d) {
	      return d;
	    });
	    model_rows.enter().append("td");
	    model_rows.html(function (d) {
	      return d;
	    });
	  },
	
	  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	
	    var table_row_data = this.getModelRows(nextProps.json),
	        table_columns = this.getModelColumns(table_row_data);
	
	    this.setState({
	      table_row_data: table_row_data,
	      table_columns: table_columns
	    });
	  },
	
	  render: function render() {
	
	    return React.createElement(
	      "div",
	      { className: "col-lg-12" },
	      React.createElement(
	        "ul",
	        { className: "list-group" },
	        React.createElement(
	          "li",
	          { className: "list-group-item" },
	          React.createElement(
	            "h4",
	            { className: "list-group-item-heading" },
	            React.createElement("i", { className: "fa fa-cubes", styleFormat: "margin-right: 10px" }),
	            "Model fits"
	          ),
	          React.createElement(
	            "table",
	            { className: "table table-hover table-condensed list-group-item-text", styleFormat: "margin-top:0.5em;" },
	            React.createElement("thead", { id: "summary-model-header1" }),
	            React.createElement("tbody", { id: "summary-model-table" })
	          )
	        )
	      )
	    );
	  }
	
	});
	
	// Will need to make a call to this
	// omega distributions
	function render_model_fits(json, element) {
	  React.render(React.createElement(ModelFits, { json: json }), $(element)[0]);
	}
	
	// Will need to make a call to this
	// omega distributions
	function rerender_model_fits(json, element) {
	  $(element).empty();
	  render_model_fits(json, element);
	}
	
	module.exports.ModelFits = ModelFits;
	module.exports.render_model_fits = render_model_fits;
	module.exports.rerender_model_fits = rerender_model_fits;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(54), __webpack_require__(57), __webpack_require__(15)))

/***/ },

/***/ 219:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(d3, $) {'use strict';
	
	var React = __webpack_require__(61),
	    _ = __webpack_require__(264);
	
	var TreeSummary = React.createClass({
	  displayName: 'TreeSummary',
	
	
	  getInitialState: function getInitialState() {
	
	    var table_row_data = this.getSummaryRows(this.props.json),
	        table_columns = this.getTreeSummaryColumns(table_row_data);
	
	    return {
	      table_row_data: table_row_data,
	      table_columns: table_columns
	    };
	  },
	
	  getRateClasses: function getRateClasses(branch_annotations) {
	
	    // Get count of all rate classes
	    var all_branches = _.values(branch_annotations);
	
	    return _.countBy(all_branches, function (branch) {
	      return branch.omegas.length;
	    });
	  },
	
	  getBranchProportion: function getBranchProportion(rate_classes) {
	    var sum = _.reduce(_.values(rate_classes), function (memo, num) {
	      return memo + num;
	    });
	    return _.mapObject(rate_classes, function (val, key) {
	      return d3.format(".2p")(val / sum);
	    });
	  },
	
	  getBranchLengthProportion: function getBranchLengthProportion(rate_classes, branch_annotations, total_branch_length) {
	
	    var self = this;
	
	    // get branch lengths of each rate distribution
	    //return prop_format(d[2] / total_tree_length
	
	    // Get count of all rate classes
	    var branch_lengths = _.mapObject(rate_classes, function (d) {
	      return 0;
	    });
	
	    for (var key in branch_annotations) {
	      var node = self.tree.get_node_by_name(key);
	      branch_lengths[branch_annotations[key].omegas.length] += self.tree.branch_length()(node);
	    };
	
	    return _.mapObject(branch_lengths, function (val, key) {
	      return d3.format(".2p")(val / total_branch_length);
	    });
	  },
	
	  getNumUnderSelection: function getNumUnderSelection(rate_classes, branch_annotations, test_results) {
	
	    var num_under_selection = _.mapObject(rate_classes, function (d) {
	      return 0;
	    });
	
	    for (var key in branch_annotations) {
	      num_under_selection[branch_annotations[key].omegas.length] += test_results[key]["p"] <= 0.05;
	    };
	
	    return num_under_selection;
	  },
	
	  getSummaryRows: function getSummaryRows(json) {
	
	    var self = this;
	
	    // Will need to create a tree for each fits
	    var analysis_data = json;
	
	    if (!analysis_data) {
	      return [];
	    }
	
	    // Create an array of phylotrees from fits
	    var trees = _.map(analysis_data["fits"], function (d) {
	      return d3.layout.phylotree("body")(d["tree string"]);
	    });
	    var tree = trees[0];
	
	    self.tree = tree;
	
	    //TODO : Do not hard code model here
	    var tree_length = analysis_data["fits"]["Full model"]["tree length"];
	    var branch_annotations = analysis_data["fits"]["Full model"]["branch-annotations"];
	    var test_results = analysis_data["test results"];
	
	    var rate_classes = this.getRateClasses(branch_annotations),
	        proportions = this.getBranchProportion(rate_classes),
	        length_proportions = this.getBranchLengthProportion(rate_classes, branch_annotations, tree_length),
	        num_under_selection = this.getNumUnderSelection(rate_classes, branch_annotations, test_results);
	
	    // zip objects into matrix
	    var keys = _.keys(rate_classes);
	
	    var summary_rows = _.zip(keys, _.values(rate_classes), _.values(proportions), _.values(length_proportions), _.values(num_under_selection));
	
	    summary_rows.sort(function (a, b) {
	      if (a[0] == b[0]) {
	        return a[1] < b[1] ? -1 : a[1] == b[1] ? 0 : 1;
	      }
	      return a[0] - b[0];
	    });
	
	    return summary_rows;
	  },
	
	  getTreeSummaryColumns: function getTreeSummaryColumns(table_row_data) {
	
	    var omega_header = '<th>ω rate<br>classes</th>',
	        branch_num_header = '<th># of <br>branches</th>',
	        branch_prop_header = '<th>% of <br>branches</th>',
	        branch_prop_length_header = '<th>% of tree <br>length</th>',
	        under_selection_header = '<th># under <br>selection</th>';
	
	    // inspect table_row_data and return header
	    var all_columns = [omega_header, branch_num_header, branch_prop_header, branch_prop_length_header, under_selection_header];
	
	    // validate each table row with its associated header
	    if (table_row_data.length == 0) {
	      return [];
	    }
	
	    // trim columns to length of table_row_data
	    var column_headers = _.take(all_columns, table_row_data[0].length);
	
	    return column_headers;
	  },
	
	  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	
	    var table_row_data = this.getSummaryRows(nextProps.json),
	        table_columns = this.getTreeSummaryColumns(table_row_data);
	
	    this.setState({
	      table_row_data: table_row_data,
	      table_columns: table_columns
	    });
	  },
	
	  componentDidUpdate: function componentDidUpdate() {
	
	    d3.select('#summary-tree-header').empty();
	
	    var tree_summary_columns = d3.select('#summary-tree-header');
	
	    tree_summary_columns = tree_summary_columns.selectAll("th").data(this.state.table_columns);
	    tree_summary_columns.enter().append("th");
	    tree_summary_columns.html(function (d) {
	      return d;
	    });
	
	    var tree_summary_rows = d3.select('#summary-tree-table').selectAll("tr").data(this.state.table_row_data);
	    tree_summary_rows.enter().append('tr');
	    tree_summary_rows.exit().remove();
	    tree_summary_rows = tree_summary_rows.selectAll("td").data(function (d) {
	      return d;
	    });
	
	    tree_summary_rows.enter().append("td");
	    tree_summary_rows.html(function (d) {
	      return d;
	    });
	  },
	
	  render: function render() {
	
	    return React.createElement(
	      'ul',
	      { className: 'list-group' },
	      React.createElement(
	        'li',
	        { className: 'list-group-item' },
	        React.createElement(
	          'h4',
	          { className: 'list-group-item-heading' },
	          React.createElement('i', { className: 'fa fa-tree' }),
	          'Tree'
	        ),
	        React.createElement(
	          'table',
	          { className: 'table table-hover table-condensed list-group-item-text' },
	          React.createElement('thead', { id: 'summary-tree-header' }),
	          React.createElement('tbody', { id: 'summary-tree-table' })
	        )
	      )
	    );
	  }
	
	});
	
	//TODO
	//<caption>
	//<p className="list-group-item-text text-muted">
	//    Total tree length under the branch-site model is <strong id="summary-tree-length">2.30</strong> expected substitutions per nucleotide site, and <strong id="summary-tree-length-mg94">1.74</strong> under the MG94 model.
	//</p>
	//</caption>
	
	
	// Will need to make a call to this
	// omega distributions
	function render_tree_summary(json, element) {
	  React.render(React.createElement(TreeSummary, { json: json }), $(element)[0]);
	}
	
	// Will need to make a call to this
	// omega distributions
	function rerender_tree_summary(tree, element) {
	  $(element).empty();
	  render_tree_summary(tree, element);
	}
	
	module.exports.TreeSummary = TreeSummary;
	module.exports.render_tree_summary = render_tree_summary;
	module.exports.rerender_tree_summary = rerender_tree_summary;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(54), __webpack_require__(15)))

/***/ },

/***/ 220:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(d3, _, $) {'use strict';
	
	var React = __webpack_require__(61);
	var datamonkey = __webpack_require__(53);
	__webpack_require__(224);
	
	var Tree = React.createClass({
	    displayName: 'Tree',
	
	
	    getInitialState: function getInitialState() {
	        return {
	            json: this.props.json,
	            settings: this.props.settings
	        };
	    },
	
	    sortNodes: function sortNodes(asc) {
	
	        var self = this;
	
	        self.tree.traverse_and_compute(function (n) {
	            var d = 1;
	            if (n.children && n.children.length) {
	                d += d3.max(n.children, function (d) {
	                    return d["count_depth"];
	                });
	            }
	            n["count_depth"] = d;
	        });
	
	        self.tree.resort_children(function (a, b) {
	            return (a["count_depth"] - b["count_depth"]) * (asc ? 1 : -1);
	        });
	    },
	
	    getBranchLengths: function getBranchLengths() {
	
	        var self = this;
	
	        if (!this.state.json) {
	            return [];
	        }
	
	        var branch_lengths = self.settings["tree-options"]["hyphy-tree-branch-lengths"][0] ? this.state.json["fits"][this.which_model]["branch-lengths"] : null;
	
	        if (!branch_lengths) {
	
	            var nodes = _.filter(self.tree.get_nodes(), function (d) {
	                return d.parent;
	            });
	
	            branch_lengths = _.object(_.map(nodes, function (d) {
	                return d.name;
	            }), _.map(nodes, function (d) {
	                return parseFloat(d.attribute);
	            }));
	        }
	
	        return branch_lengths;
	    },
	
	    assignBranchAnnotations: function assignBranchAnnotations() {
	        if (this.state.json && this.state.json["fits"][this.which_model]) {
	            this.tree.assign_attributes(this.state.json["fits"][this.which_model]["branch-annotations"]);
	        }
	    },
	
	    renderDiscreteLegendColorScheme: function renderDiscreteLegendColorScheme(svg_container) {
	
	        var self = this,
	            svg = self.svg;
	
	        var color_fill = self.settings["tree-options"]["hyphy-tree-fill-color"][0] ? "black" : "red";
	
	        var margins = {
	            'bottom': 30,
	            'top': 15,
	            'left': 40,
	            'right': 2
	        };
	
	        d3.selectAll("#color-legend").remove();
	
	        var dc_legend = svg.append("g").attr("id", "color-legend").attr("class", "dc-legend").attr("transform", "translate(" + margins["left"] + "," + margins["top"] + ")");
	
	        var fg_item = dc_legend.append("g").attr("class", "dc-legend-item").attr("transform", "translate(0,0)");
	
	        fg_item.append("rect").attr("width", "13").attr("height", "13").attr("fill", color_fill);
	
	        fg_item.append("text").attr("x", "15").attr("y", "11").text("Foreground");
	
	        var bg_item = dc_legend.append("g").attr("class", "dc-legend-item").attr("transform", "translate(0,18)");
	
	        bg_item.append("rect").attr("width", "13").attr("height", "13").attr("fill", "gray");
	
	        bg_item.append("text").attr("x", "15").attr("y", "11").text("Background");
	    },
	
	    renderLegendColorScheme: function renderLegendColorScheme(svg_container, attr_name, do_not_render) {
	
	        var self = this;
	
	        var branch_annotations = this.state.json["fits"][this.which_model]["branch-annotations"];
	
	        var svg = self.svg;
	
	        // clear existing linearGradients
	        d3.selectAll(".legend-definitions").selectAll("linearGradient").remove();
	        d3.selectAll("#color-legend").remove();
	
	        if (branch_annotations && !do_not_render) {
	            var bar_width = 70,
	                bar_height = 300,
	                margins = {
	                'bottom': 30,
	                'top': 15,
	                'left': 40,
	                'right': 2
	            };
	
	            var this_grad = svg.append("defs").attr("class", "legend-definitions").append("linearGradient").attr("id", "_omega_bar").attr("x1", "0%").attr("y1", "0%").attr("x2", "0%").attr("y2", "100%");
	
	            var omega_scale = d3.scale.pow().exponent(this.scaling_exponent).domain(d3.extent(self.omega_color.domain())).range([0, 1]),
	                axis_scale = d3.scale.pow().exponent(this.scaling_exponent).domain(d3.extent(self.omega_color.domain())).range([0, bar_height - margins['top'] - margins['bottom']]);
	
	            self.omega_color.domain().forEach(function (d) {
	                this_grad.append("stop").attr("offset", "" + omega_scale(d) * 100 + "%").style("stop-color", self.omega_color(d));
	            });
	
	            var g_container = svg.append("g").attr("id", "color-legend").attr("transform", "translate(" + margins["left"] + "," + margins["top"] + ")");
	
	            g_container.append("rect").attr("x", 0).attr("width", bar_width - margins['left'] - margins['right']).attr("y", 0).attr("height", bar_height - margins['top'] - margins['bottom']).style("fill", "url(#_omega_bar)");
	
	            var draw_omega_bar = d3.svg.axis().scale(axis_scale).orient("left").tickFormat(d3.format(".1r")).tickValues([0, 0.01, 0.1, 0.5, 1, 2, 5, 10]);
	
	            var scale_bar = g_container.append("g");
	
	            scale_bar.style("font-size", "14").attr("class", "hyphy-omega-bar").call(draw_omega_bar);
	
	            scale_bar.selectAll("text").style("text-anchor", "right");
	
	            var _label = '';
	            var x_label = _label = scale_bar.append("g").attr("class", "hyphy-omega-bar");
	            x_label = x_label.selectAll("text").data([attr_name]);
	            x_label.enter().append("text");
	            x_label.text(function (d) {
	                return $('<textarea />').html(d).text();
	            }).attr("transform", "translate(" + (bar_width - margins['left'] - margins['right']) * 0.5 + "," + (bar_height - margins['bottom']) + ")").style("text-anchor", "middle").style("font-size", "18").attr("dx", "0.0em").attr("dy", "0.1em");
	        }
	    },
	
	    setHandlers: function setHandlers() {
	
	        var self = this;
	
	        $("#hyphy-error-hide").on("click", function (e) {
	            d3.select("#hyphy-error").style("display", "none");
	            e.preventDefault();
	        });
	
	        $(".hyphy-tree-trigger").on("click", function (e) {
	
	            self.renderTree();
	        });
	
	        $(".tree-tab-btn").on('click', function (e) {
	            self.tree.placenodes().update();
	        });
	
	        $("#export-phylo-svg").on('click', function (e) {
	            datamonkey.save_image("svg", "#tree_container");
	        });
	
	        $("#export-phylo-png").on('click', function (e) {
	            datamonkey.save_image("png", "#tree_container");
	        });
	
	        $("#export-phylo-nwk").on('click', function (e) {
	            var nwk = self.tree.get_newick(function () {});
	            var pom = document.createElement('a');
	            pom.setAttribute('href', 'data:text/octet-stream;charset=utf-8,' + encodeURIComponent(nwk));
	            pom.setAttribute('download', 'nwk.txt');
	            $("body").append(pom);
	            pom.click();
	            pom.remove();
	        });
	    },
	
	    setTreeHandlers: function setTreeHandlers() {
	
	        var self = this;
	        var tree_object = self.tree;
	
	        $("[data-direction]").on("click", function (e) {
	            var which_function = $(this).data("direction") == 'vertical' ? tree_object.spacing_x : tree_object.spacing_y;
	            which_function(which_function() + +$(this).data("amount")).update();
	        });
	
	        $(".phylotree-layout-mode").on("change", function (e) {
	            if ($(this).is(':checked')) {
	                if (tree_object.radial() != ($(this).data("mode") == "radial")) {
	                    tree_object.radial(!tree_object.radial()).placenodes().update();
	                }
	            }
	        });
	
	        $(".phylotree-align-toggler").on("change", function (e) {
	            if ($(this).is(':checked')) {
	                if (tree_object.align_tips($(this).data("align") == "right")) {
	                    tree_object.placenodes().update();
	                }
	            }
	        });
	
	        $("#sort_original").on("click", function (e) {
	            tree_object.resort_children(function (a, b) {
	                return a["original_child_order"] - b["original_child_order"];
	            });
	
	            e.preventDefault();
	        });
	
	        $("#sort_ascending").on("click", function (e) {
	            self.sortNodes(true);
	            e.preventDefault();
	        });
	
	        $("#sort_descending").on("click", function (e) {
	            self.sortNodes(false);
	            e.preventDefault();
	        });
	    },
	
	    setPartitionList: function setPartitionList() {
	
	        var self = this;
	
	        // Check if partition list exists
	        if (!self.props.json["partition"]) {
	            d3.select("#hyphy-tree-highlight-div").style("display", "none");
	            d3.select("#hyphy-tree-highlight").style("display", "none");
	            return;
	        }
	
	        // set tree partitions
	        self.tree.set_partitions(self.props.json["partition"]);
	
	        var partition_list = d3.select("#hyphy-tree-highlight-branches").selectAll("li").data([['None']].concat(d3.keys(self.props.json["partition"]).map(function (d) {
	            return [d];
	        }).sort()));
	
	        partition_list.enter().append("li");
	        partition_list.exit().remove();
	        partition_list = partition_list.selectAll("a").data(function (d) {
	            return d;
	        });
	
	        partition_list.enter().append("a");
	        partition_list.attr("href", "#").on("click", function (d, i) {
	            d3.select("#hyphy-tree-highlight").attr("value", d);
	            self.renderTree();
	        });
	
	        // set default to passed setting
	        partition_list.text(function (d) {
	            if (d == "RELAX.test") {
	                this.click();
	            }
	            return d;
	        });
	    },
	
	    setModelList: function setModelList() {
	
	        var self = this;
	
	        if (!this.state.json) {
	            return [];
	        }
	
	        this.state.settings['suppress-tree-render'] = true;
	
	        var def_displayed = false;
	
	        var model_list = d3.select("#hyphy-tree-model-list").selectAll("li").data(d3.keys(this.state.json["fits"]).map(function (d) {
	            return [d];
	        }).sort());
	
	        model_list.enter().append("li");
	        model_list.exit().remove();
	        model_list = model_list.selectAll("a").data(function (d) {
	            return d;
	        });
	
	        model_list.enter().append("a");
	
	        model_list.attr("href", "#").on("click", function (d, i) {
	            d3.select("#hyphy-tree-model").attr("value", d);
	            self.renderTree();
	        });
	
	        model_list.text(function (d) {
	
	            if (d == "General Descriptive") {
	                def_displayed = true;
	                this.click();
	            }
	
	            if (!def_displayed && d == "Alternative") {
	                def_displayed = true;
	                this.click();
	            }
	
	            if (!def_displayed && d == "Partitioned MG94xREV") {
	                def_displayed = true;
	                this.click();
	            }
	
	            if (!def_displayed && d == "MG94") {
	                def_displayed = true;
	                this.click();
	            }
	
	            if (!def_displayed && d == "Full model") {
	                def_displayed = true;
	                this.click();
	            }
	
	            return d;
	        });
	
	        this.settings['suppress-tree-render'] = false;
	    },
	
	    initialize: function initialize() {
	
	        var self = this;
	
	        this.settings = this.state.settings;
	
	        if (!this.settings) {
	            return null;
	        }
	
	        if (!this.state.json) {
	            return null;
	        }
	
	        $("#hyphy-tree-branch-lengths").click();
	
	        this.scaling_exponent = 0.33;
	        this.omega_format = d3.format(".3r");
	        this.prop_format = d3.format(".2p");
	        this.fit_format = d3.format(".2f");
	        this.p_value_format = d3.format(".4f");
	
	        var json = this.state.json;
	        var analysis_data = json;
	
	        this.width = 800;
	        this.height = 600;
	
	        this.which_model = this.settings["tree-options"]["hyphy-tree-model"][0];
	        this.legend_type = this.settings["hyphy-tree-legend-type"];
	
	        this.setHandlers();
	        this.setModelList();
	        this.initializeTree();
	        this.setPartitionList();
	    },
	
	    initializeTree: function initializeTree() {
	
	        var self = this;
	
	        var analysis_data = self.state.json;
	
	        var width = this.width,
	            height = this.height,
	            alpha_level = 0.05,
	            branch_lengths = [];
	
	        if (!this.tree) {
	            this.tree = d3.layout.phylotree("body").size([height, width]).separation(function (a, b) {
	                return 0;
	            });
	        }
	
	        this.setTreeHandlers();
	
	        // clear any existing svg
	        d3.select("#tree_container").html("");
	
	        this.svg = d3.select("#tree_container").append("svg").attr("width", width).attr("height", height);
	
	        this.tree.branch_name(null);
	        this.tree.node_span('equal');
	        this.tree.options({
	            'draw-size-bubbles': false,
	            'selectable': false,
	            'left-right-spacing': 'fit-to-size',
	            'left-offset': 100,
	            'color-fill': this.settings["tree-options"]["hyphy-tree-fill-color"][0]
	        }, false);
	
	        this.assignBranchAnnotations();
	
	        self.omega_color = d3.scale.pow().exponent(this.scaling_exponent).domain([0, 0.25, 1, 5, 10]).range(this.settings["tree-options"]["hyphy-tree-fill-color"][0] ? ["#DDDDDD", "#AAAAAA", "#888888", "#444444", "#000000"] : ["#5e4fa2", "#3288bd", "#e6f598", "#f46d43", "#9e0142"]).clamp(true);
	
	        self.renderTree();
	
	        if (self.legend_type == 'discrete') {
	            self.renderDiscreteLegendColorScheme("tree_container");
	        } else {
	            self.renderLegendColorScheme("tree_container", analysis_data["fits"][this.which_model]["annotation-tag"]);
	        }
	
	        if (this.settings.edgeColorizer) {
	            this.edgeColorizer = this.settings.edgeColorizer;
	        }
	
	        this.tree.style_edges(this.edgeColorizer);
	        this.tree.style_nodes(this.nodeColorizer);
	
	        this.tree.spacing_x(30, true);
	        this.tree.layout();
	        this.tree.placenodes().update();
	        this.tree.layout();
	    },
	
	    renderTree: function renderTree(skip_render) {
	
	        var self = this;
	        var analysis_data = this.state.json;
	        var svg = self.svg;
	
	        if (!this.settings['suppress-tree-render']) {
	
	            var do_layout = false;
	
	            for (var k in this.settings["tree-options"]) {
	
	                //TODO : Check to make sure settings has a matching field
	                if (k == 'hyphy-tree-model') {
	
	                    var controller = d3.select("#" + k),
	                        controller_value = controller.attr("value") || controller.property("checked");
	
	                    if (controller_value != this.settings["tree-options"][k][0] && controller_value != false) {
	                        this.settings["tree-options"][k][0] = controller_value;
	                        do_layout = do_layout || this.settings["tree-options"][k][1];
	                    }
	                } else {
	                    var controller = d3.select("#" + k),
	                        controller_value = controller.attr("value") || controller.property("checked");
	
	                    if (controller_value != this.settings["tree-options"][k][0]) {
	                        this.settings["tree-options"][k][0] = controller_value;
	                        do_layout = do_layout || this.settings["tree-options"][k][1];
	                    }
	                }
	            }
	
	            // Update which_model
	            if (self.which_model != this.settings["tree-options"]["hyphy-tree-model"][0]) {
	                self.which_model = this.settings["tree-options"]["hyphy-tree-model"][0];
	                self.initializeTree();
	                return;
	            }
	
	            if (_.indexOf(_.keys(analysis_data), "tree") > -1) {
	                this.tree(analysis_data["tree"]).svg(svg);
	            } else {
	                this.tree(analysis_data["fits"][self.which_model]["tree string"]).svg(svg);
	            }
	
	            this.branch_lengths = this.getBranchLengths();
	
	            this.tree.font_size(18);
	            this.tree.scale_bar_font_size(14);
	            this.tree.node_circle_size(0);
	
	            this.tree.branch_length(function (n) {
	                if (self.branch_lengths) {
	                    return self.branch_lengths[n.name] || 0;
	                }
	                return undefined;
	            });
	
	            this.assignBranchAnnotations();
	
	            if (_.findKey(analysis_data, "partition")) {
	                this.partition = (this.settings["tree-options"]["hyphy-tree-highlight"] ? analysis_data["partition"][this.settings["tree-options"]["hyphy-tree-highlight"][0]] : null) || null;
	            } else {
	                this.partition = null;
	            }
	
	            self.omega_color = d3.scale.pow().exponent(self.scaling_exponent).domain([0, 0.25, 1, 5, 10]).range(self.settings["tree-options"]["hyphy-tree-fill-color"][0] ? ["#DDDDDD", "#AAAAAA", "#888888", "#444444", "#000000"] : ["#5e4fa2", "#3288bd", "#e6f598", "#f46d43", "#9e0142"]).clamp(true);
	
	            self.tree.options({
	                'color-fill': self.settings["tree-options"]["hyphy-tree-fill-color"][0]
	            }, false);
	
	            d3.select(".phylotree-definitions").selectAll("linearGradient").remove();
	
	            // TODO: Should be a prop. Hide or show legend.
	            if (!this.settings["tree-options"]["hyphy-tree-hide-legend"][0]) {
	                d3.select("#color-legend").style("visibility", "visible");
	
	                if (self.legend_type) {
	                    self.renderDiscreteLegendColorScheme("tree_container");
	                } else {
	                    self.renderLegendColorScheme("tree_container", self.state.json["fits"][self.which_model]["annotation-tag"]);
	                }
	            } else {
	                d3.select("#color-legend").style("visibility", "hidden");
	            }
	
	            if (!skip_render) {
	                if (do_layout) {
	                    this.tree.update_layout();
	                }
	                //d3_phylotree_trigger_refresh(this.tree);
	                //this.tree.trigger_refresh();
	            }
	        }
	    },
	
	    componentDidMount: function componentDidMount() {
	        this.initialize();
	    },
	
	    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	
	        this.setState({
	            json: nextProps.json,
	            settings: nextProps.settings
	        });
	    },
	
	    componentDidUpdate: function componentDidUpdate() {
	        this.initialize();
	    },
	
	    render: function render() {
	
	        return React.createElement(
	            'div',
	            null,
	            React.createElement(
	                'div',
	                { className: 'row' },
	                React.createElement(
	                    'div',
	                    { className: 'cold-md-12' },
	                    React.createElement(
	                        'div',
	                        { className: 'input-group input-group-sm' },
	                        React.createElement(
	                            'div',
	                            { className: 'input-group-btn' },
	                            React.createElement(
	                                'button',
	                                { type: 'button', className: 'btn btn-default dropdown-toggle', 'data-toggle': 'dropdown' },
	                                'Export',
	                                React.createElement('span', { className: 'caret' })
	                            ),
	                            React.createElement(
	                                'ul',
	                                { className: 'dropdown-menu' },
	                                React.createElement(
	                                    'li',
	                                    { id: 'export-phylo-png' },
	                                    React.createElement(
	                                        'a',
	                                        { href: '#' },
	                                        React.createElement('i', { className: 'fa fa-image' }),
	                                        ' Image'
	                                    )
	                                ),
	                                React.createElement(
	                                    'li',
	                                    { id: 'export-phylo-nwk' },
	                                    React.createElement(
	                                        'a',
	                                        { href: '#' },
	                                        React.createElement('i', { className: 'fa fa-file-o' }),
	                                        ' Newick File'
	                                    )
	                                )
	                            ),
	                            React.createElement(
	                                'button',
	                                { type: 'button', className: 'btn btn-default btn-sm', 'data-direction': 'vertical', 'data-amount': '1', title: 'Expand vertical spacing' },
	                                React.createElement('i', { className: 'fa fa-arrows-v' })
	                            ),
	                            React.createElement(
	                                'button',
	                                { type: 'button', className: 'btn btn-default btn-sm', 'data-direction': 'vertical', 'data-amount': '-1', title: 'Compress vertical spacing' },
	                                React.createElement('i', { className: 'fa  fa-compress fa-rotate-135' })
	                            ),
	                            React.createElement(
	                                'button',
	                                { type: 'button', className: 'btn btn-default btn-sm', 'data-direction': 'horizontal', 'data-amount': '1', title: 'Expand horizonal spacing' },
	                                React.createElement('i', { className: 'fa fa-arrows-h' })
	                            ),
	                            React.createElement(
	                                'button',
	                                { type: 'button', className: 'btn btn-default btn-sm', 'data-direction': 'horizontal', 'data-amount': '-1', title: 'Compress horizonal spacing' },
	                                React.createElement('i', { className: 'fa  fa-compress fa-rotate-45' })
	                            ),
	                            React.createElement(
	                                'button',
	                                { type: 'button', className: 'btn btn-default btn-sm', id: 'sort_ascending', title: 'Sort deepest clades to the bototm' },
	                                React.createElement('i', { className: 'fa fa-sort-amount-asc' })
	                            ),
	                            React.createElement(
	                                'button',
	                                { type: 'button', className: 'btn btn-default btn-sm', id: 'sort_descending', title: 'Sort deepsest clades to the top' },
	                                React.createElement('i', { className: 'fa fa-sort-amount-desc' })
	                            ),
	                            React.createElement(
	                                'button',
	                                { type: 'button', className: 'btn btn-default btn-sm', id: 'sort_original', title: 'Restore original order' },
	                                React.createElement('i', { className: 'fa fa-sort' })
	                            )
	                        ),
	                        React.createElement(
	                            'div',
	                            { className: 'input-group-btn', 'data-toggle': 'buttons' },
	                            React.createElement(
	                                'label',
	                                { className: 'btn btn-default active btn-sm' },
	                                React.createElement('input', { type: 'radio', name: 'options', className: 'phylotree-layout-mode', 'data-mode': 'linear', autoComplete: 'off', checked: '', title: 'Layout left-to-right' }),
	                                'Linear'
	                            ),
	                            React.createElement(
	                                'label',
	                                { className: 'btn btn-default  btn-sm' },
	                                React.createElement('input', { type: 'radio', name: 'options', className: 'phylotree-layout-mode', 'data-mode': 'radial', autoComplete: 'off', title: 'Layout radially' }),
	                                ' Radial'
	                            )
	                        ),
	                        React.createElement(
	                            'div',
	                            { className: 'input-group-btn', 'data-toggle': 'buttons' },
	                            React.createElement(
	                                'label',
	                                { className: 'btn btn-default active btn-sm' },
	                                React.createElement('input', { type: 'radio', className: 'phylotree-align-toggler', 'data-align': 'left', name: 'options-align', autoComplete: 'off', checked: '', title: 'Align tips labels to branches' }),
	                                React.createElement('i', { className: 'fa fa-align-left' })
	                            ),
	                            React.createElement(
	                                'label',
	                                { className: 'btn btn-default btn-sm' },
	                                React.createElement('input', { type: 'radio', className: 'phylotree-align-toggler', 'data-align': 'right', name: 'options-align', autoComplete: 'off', title: 'Align tips labels to the edge of the plot' }),
	                                React.createElement('i', { className: 'fa fa-align-right' })
	                            )
	                        ),
	                        React.createElement(
	                            'div',
	                            { className: 'input-group-btn' },
	                            React.createElement(
	                                'button',
	                                { type: 'button', className: 'btn btn-default dropdown-toggle', 'data-toggle': 'dropdown' },
	                                'Model',
	                                React.createElement('span', { className: 'caret' })
	                            ),
	                            React.createElement('ul', { className: 'dropdown-menu', id: 'hyphy-tree-model-list' })
	                        ),
	                        React.createElement('input', { type: 'text', className: 'form-control disabled', id: 'hyphy-tree-model', disabled: true }),
	                        React.createElement(
	                            'div',
	                            { id: 'hyphy-tree-highlight-div', className: 'input-group-btn' },
	                            React.createElement(
	                                'button',
	                                { type: 'button', className: 'btn btn-default dropdown-toggle', 'data-toggle': 'dropdown' },
	                                'Highlight branch set',
	                                React.createElement('span', { className: 'caret' })
	                            ),
	                            React.createElement('ul', { className: 'dropdown-menu', id: 'hyphy-tree-highlight-branches' })
	                        ),
	                        React.createElement('input', { type: 'text', className: 'form-control disabled', id: 'hyphy-tree-highlight', disabled: true }),
	                        React.createElement(
	                            'span',
	                            { className: 'input-group-addon' },
	                            'Use model branch lengths',
	                            React.createElement('input', { type: 'checkbox', id: 'hyphy-tree-branch-lengths', className: 'hyphy-tree-trigger' })
	                        ),
	                        React.createElement(
	                            'span',
	                            { className: 'input-group-addon' },
	                            'Hide legend',
	                            React.createElement('input', { type: 'checkbox', id: 'hyphy-tree-hide-legend', className: 'hyphy-tree-trigger' })
	                        ),
	                        React.createElement(
	                            'span',
	                            { className: 'input-group-addon' },
	                            'Grayscale',
	                            React.createElement('input', { type: 'checkbox', id: 'hyphy-tree-fill-color', className: 'hyphy-tree-trigger' })
	                        )
	                    )
	                )
	            ),
	            React.createElement(
	                'div',
	                { className: 'row' },
	                React.createElement(
	                    'div',
	                    { className: 'col-md-12' },
	                    React.createElement(
	                        'div',
	                        { className: 'row' },
	                        React.createElement('div', { id: 'tree_container', className: 'tree-widget' })
	                    )
	                )
	            )
	        );
	    }
	
	});
	
	function render_tree(json, element, settings) {
	    return React.render(React.createElement(Tree, { json: json, settings: settings }), $(element)[0]);
	}
	
	function rerender_tree(json, element, settings) {
	    $(element).empty();
	    return render_tree(json, settings);
	}
	
	module.exports.Tree = Tree;
	module.exports.render_tree = render_tree;
	module.exports.rerender_tree = rerender_tree;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(54), __webpack_require__(57), __webpack_require__(15)))

/***/ },

/***/ 221:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(_, d3, $) {'use strict';
	
	var _prop_chart = __webpack_require__(222);
	
	var React = __webpack_require__(61);
	
	
	var BranchTable = React.createClass({
	  displayName: 'BranchTable',
	
	
	  getInitialState: function getInitialState() {
	
	    // add the following
	    var table_row_data = this.getBranchRows(this.props.tree, this.props.test_results, this.props.annotations),
	        table_columns = this.getBranchColumns(table_row_data),
	        initial_model_name = _.take(_.keys(this.props.annotations)),
	        initial_omegas = this.props.annotations ? this.props.annotations[initial_model_name]["omegas"] : null;
	
	    var distro_settings = {
	      dimensions: { width: 600, height: 400 },
	      margins: { 'left': 50, 'right': 15, 'bottom': 15, 'top': 35 },
	      legend: false,
	      domain: [0.00001, 10000],
	      do_log_plot: true,
	      k_p: null,
	      plot: null,
	      svg_id: "prop-chart"
	    };
	
	    return {
	      tree: this.props.tree,
	      test_results: this.props.test_results,
	      annotations: this.props.annotations,
	      table_row_data: table_row_data,
	      table_columns: table_columns,
	      current_model_name: initial_model_name,
	      current_omegas: initial_omegas,
	      distro_settings: distro_settings
	    };
	  },
	
	  getBranchLength: function getBranchLength(m) {
	
	    if (!this.state.tree) {
	      return '';
	    }
	
	    return d3.format(".4f")(this.state.tree.get_node_by_name(m).attribute);
	  },
	
	  getLRT: function getLRT(branch) {
	    var formatted = d3.format(".4f")(branch["LRT"]);
	    if (formatted == "NaN") {
	      return branch["LRT"];
	    } else {
	      return formatted;
	    }
	  },
	
	  getPVal: function getPVal(branch) {
	    return d3.format(".4f")(branch["p"]);
	  },
	
	  getUncorrectedPVal: function getUncorrectedPVal(branch) {
	    return d3.format(".4f")(branch["uncorrected p"]);
	  },
	
	  getOmegaDistribution: function getOmegaDistribution(m, annotations) {
	
	    if (!annotations) {
	      return '';
	    }
	
	    var omega_string = "";
	
	    for (var i in annotations[m]["omegas"]) {
	      var omega = parseFloat(annotations[m]["omegas"][i]["omega"]);
	      var formatted_omega = "∞";
	      if (omega < 1e+20) {
	        formatted_omega = d3.format(".3r")(omega);
	      }
	      omega_string += "&omega;<sub>" + (parseInt(i) + 1) + "</sub> = " + formatted_omega + " (" + d3.format(".2p")(annotations[m]["omegas"][i]["prop"]) + ")<br/>";
	    }
	
	    return omega_string;
	  },
	
	  getBranchRows: function getBranchRows(tree, test_results, annotations) {
	
	    var self = this;
	
	    var table_row_data = [],
	        omega_format = d3.format(".3r"),
	        prop_format = d3.format(".2p");
	
	    for (var m in test_results) {
	
	      var branch_row = [];
	      var branch = test_results[m];
	
	      branch_row = [m, this.getBranchLength(m), this.getLRT(branch), this.getPVal(branch), this.getUncorrectedPVal(branch), this.getOmegaDistribution(m, annotations)];
	
	      table_row_data.push(branch_row);
	    }
	
	    table_row_data.sort(function (a, b) {
	
	      if (a[0] == b[0]) {
	        return a[1] < b[1] ? -1 : a[1] == b[1] ? 0 : 1;
	      }
	
	      return a[3] - b[3];
	    });
	
	    return table_row_data;
	  },
	
	  setEvents: function setEvents() {
	
	    var self = this;
	
	    if (self.state.annotations) {
	      var branch_table = d3.select('#table-branch-table').selectAll("tr");
	
	      branch_table.on("click", function (d) {
	        var label = d[0];
	        self.setState({
	          current_model_name: label,
	          current_omegas: self.state.annotations[label]["omegas"]
	        });
	      });
	    }
	  },
	
	  createDistroChart: function createDistroChart() {
	
	    var self = this;
	
	    this.settings = {
	      dimensions: { width: 600, height: 400 },
	      margins: { 'left': 50, 'right': 15, 'bottom': 15, 'top': 15 },
	      has_zeros: true,
	      legend_id: null,
	      do_log_plot: true,
	      k_p: null,
	      plot: null,
	      svg_id: "prop-chart"
	    };
	  },
	
	  getBranchColumns: function getBranchColumns(table_row_data) {
	
	    if (table_row_data.length <= 0) {
	      return null;
	    }
	
	    var name_header = '<th>Name</th>',
	        length_header = '<th><abbr title="Branch Length">B</abbr></th>',
	        lrt_header = '<th><abbr title="Likelihood ratio test statistic">LRT</abbr></th>',
	        pvalue_header = '<th>Test p-value</th>',
	        uncorrected_pvalue_header = '<th>Uncorrected p-value</th>',
	        omega_header = '<th>ω distribution over sites</th>';
	
	    // inspect table_row_data and return header
	    var all_columns = [name_header, length_header, lrt_header, pvalue_header, uncorrected_pvalue_header, omega_header];
	
	    // validate each table row with its associated header
	
	    // trim columns to length of table_row_data
	    var column_headers = _.take(all_columns, table_row_data[0].length);
	
	    // remove all columns that have 0, null, or undefined rows
	    var items = d3.transpose(table_row_data);
	
	    return column_headers;
	  },
	
	  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	
	    var table_row_data = this.getBranchRows(nextProps.tree, nextProps.test_results, nextProps.annotations),
	        table_columns = this.getBranchColumns(table_row_data),
	        initial_model_name = _.take(_.keys(nextProps.annotations)),
	        initial_omegas = nextProps.annotations ? nextProps.annotations[initial_model_name]["omegas"] : null;
	
	    var distro_settings = {
	      dimensions: { width: 600, height: 400 },
	      margins: { 'left': 50, 'right': 15, 'bottom': 15, 'top': 15 },
	      legend: false,
	      domain: [0.00001, 10000],
	      do_log_plot: true,
	      k_p: null,
	      plot: null,
	      svg_id: "prop-chart"
	    };
	
	    if (nextProps.test_results && nextProps.annotations) {
	      this.setState({
	        tree: nextProps.tree,
	        test_results: nextProps.test_results,
	        annotations: nextProps.annotations,
	        table_row_data: table_row_data,
	        table_columns: table_columns,
	        current_model_name: initial_model_name,
	        current_omegas: initial_omegas,
	        distro_settings: distro_settings
	      });
	    }
	  },
	
	  componentDidUpdate: function componentDidUpdate() {
	
	    var branch_columns = d3.select('#table-branch-header');
	    branch_columns = branch_columns.selectAll("th").data(this.state.table_columns);
	    branch_columns.enter().append("th");
	
	    branch_columns.html(function (d) {
	      return d;
	    });
	
	    var branch_rows = d3.select('#table-branch-table').selectAll("tr").data(this.state.table_row_data);
	
	    branch_rows.enter().append('tr');
	    branch_rows.exit().remove();
	    branch_rows.style('font-weight', function (d) {
	      return d[3] <= 0.05 ? 'bold' : 'normal';
	    });
	
	    branch_rows = branch_rows.selectAll("td").data(function (d) {
	      return d;
	    });
	
	    branch_rows.enter().append("td");
	    branch_rows.html(function (d) {
	      return d;
	    });
	
	    this.createDistroChart();
	    this.setEvents();
	  },
	
	  render: function render() {
	
	    var self = this;
	
	    return React.createElement(
	      'div',
	      { className: 'row' },
	      React.createElement(
	        'div',
	        { id: 'hyphy-branch-table', className: 'col-md-7' },
	        React.createElement(
	          'table',
	          { className: 'table table-hover table-condensed' },
	          React.createElement('thead', { id: 'table-branch-header' }),
	          React.createElement('tbody', { id: 'table-branch-table' })
	        )
	      ),
	      React.createElement(
	        'div',
	        { id: 'primary-omega-tag', className: 'col-md-5' },
	        React.createElement(_prop_chart.PropChart, { name: self.state.current_model_name, omegas: self.state.current_omegas,
	          settings: self.state.distro_settings })
	      )
	    );
	  }
	
	});
	
	// Will need to make a call to this
	// omega distributions
	function render_branch_table(tree, test_results, annotations, element) {
	  React.render(React.createElement(BranchTable, { tree: tree, test_results: test_results, annotations: annotations }), $(element)[0]);
	}
	
	// Will need to make a call to this
	// omega distributions
	function rerender_branch_table(tree, test_results, annotations, element) {
	  $(element).empty();
	  render_branch_table(tree, test_results, annotations, element);
	}
	
	module.exports.BranchTable = BranchTable;
	module.exports.render_branch_table = render_branch_table;
	module.exports.rerender_branch_table = rerender_branch_table;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(57), __webpack_require__(54), __webpack_require__(15)))

/***/ },

/***/ 222:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(d3, _, $) {'use strict';
	
	var React = __webpack_require__(61);
	var datamonkey = __webpack_require__(53);
	
	var PropChart = React.createClass({
	    displayName: 'PropChart',
	
	
	    getDefaultProps: function getDefaultProps() {
	        return {
	            svg_id: null,
	            dimensions: { width: 600, height: 400 },
	            margins: { 'left': 50, 'right': 15, 'bottom': 25, 'top': 35 },
	            has_zeros: false,
	            legend_id: null,
	            do_log_plot: true,
	            k_p: null,
	            plot: null
	        };
	    },
	
	    getInitialState: function getInitialState() {
	        return {
	            model_name: this.props.name,
	            omegas: this.props.omegas,
	            settings: this.props.settings
	        };
	    },
	
	    setEvents: function setEvents() {
	        var self = this;
	
	        d3.select("#" + this.save_svg_id).on('click', function (e) {
	            datamonkey.save_image("svg", "#" + self.svg_id);
	        });
	
	        d3.select("#" + this.save_png_id).on('click', function (e) {
	            datamonkey.save_image("png", "#" + self.svg_id);
	        });
	    },
	
	    initialize: function initialize() {
	
	        // clear svg
	        d3.select("#prop-chart").html("");
	
	        this.data_to_plot = this.state.omegas;
	
	        // Set props from settings
	        this.svg_id = this.props.settings.svg_id;
	        this.dimensions = this.props.settings.dimensions || this.props.dimensions;
	        this.margins = this.props.settings.margins || this.props.margins;
	        this.legend_id = this.props.settings.legend || this.props.legend_id;
	        this.do_log_plot = this.props.settings.log || this.props.do_log_plot;
	        this.k_p = this.props.settings.k || this.props.k_p;
	
	        var dimensions = this.props.dimensions;
	        var margins = this.props.margins;
	
	        if (this.props.do_log_plot) {
	            this.has_zeros = this.data_to_plot.some(function (d) {
	                return d.omega <= 0;
	            });
	        }
	
	        this.plot_width = dimensions["width"] - margins['left'] - margins['right'], this.plot_height = dimensions["height"] - margins['top'] - margins['bottom'];
	
	        var domain = this.state.settings["domain"];
	
	        this.omega_scale = (this.do_log_plot ? this.has_zeros ? d3.scale.pow().exponent(0.2) : d3.scale.log() : d3.scale.linear()).range([0, this.plot_width]).domain(domain).nice();
	
	        this.proportion_scale = d3.scale.linear().range([this.plot_height, 0]).domain([-0.05, 1]).clamp(true);
	
	        // compute margins -- circle AREA is proportional to the relative weight
	        // maximum diameter is (height - text margin)
	        this.svg = d3.select("#" + this.svg_id).attr("width", dimensions.width + margins['left'] + margins['right']).attr("height", dimensions.height + margins['top'] + margins['bottom']);
	
	        this.plot = this.svg.selectAll(".container");
	
	        this.svg.selectAll("defs").remove();
	
	        this.svg.append("defs").append("marker").attr("id", "arrowhead").attr("refX", 10) /*must be smarter way to calculate shift*/
	        .attr("refY", 4).attr("markerWidth", 10).attr("markerHeight", 8).attr("orient", "auto").attr("stroke", "#000").attr("fill", "#000").append("path").attr("d", "M 0,0 V8 L10,4 Z");
	
	        if (this.plot.empty()) {
	            this.plot = this.svg.append("g").attr("class", "container");
	        }
	
	        this.plot.attr("transform", "translate(" + this.margins["left"] + " , " + this.margins["top"] + ")");
	        this.reference_omega_lines = this.plot.selectAll(".hyphy-omega-line-reference"), this.displacement_lines = this.plot.selectAll(".hyphy-displacement-line");
	
	        this.createNeutralLine();
	        this.createXAxis();
	        this.createYAxis();
	        this.setEvents();
	        this.createOmegaLine(this.state.omegas);
	        console.log('initialized everything');
	        //_.map(this.props.omegas, function(d) { return this.createOmegaLine(d["omega"],d["prop"]); });
	
	        console.log(this.svg);
	    },
	
	    createOmegaLine: function createOmegaLine(omegas) {
	
	        var self = this;
	        var data_to_plot = this.data_to_plot;
	
	        // generate color wheel from omegas
	        self.colores_g = _.shuffle(["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b", "#e377c2", "#7f7f7f", "#bcbd22", "#17becf"]);
	
	        // ** Omega Line (Red) ** //
	        var omega_lines = this.plot.selectAll(".hyphy-omega-line").data(omegas);
	        omega_lines.enter().append("line");
	        omega_lines.exit().remove();
	
	        omega_lines.transition().attr("x1", function (d) {
	            return self.omega_scale(d.omega);
	        }).attr("x2", function (d) {
	            return self.omega_scale(d.omega);
	        }).attr("y1", function (d) {
	            return self.proportion_scale(-0.05);
	        }).attr("y2", function (d) {
	            return self.proportion_scale(d.prop);
	        }).style("stroke", function (d) {
	            var color = _.take(self.colores_g);
	            self.colores_g = _.rest(self.colores_g);
	            return color;
	        }).attr("class", "hyphy-omega-line");
	    },
	
	    createNeutralLine: function createNeutralLine() {
	        var self = this;
	
	        // ** Neutral Line (Blue) ** //
	        var neutral_line = this.plot.selectAll(".hyphy-neutral-line").data([1]);
	        neutral_line.enter().append("line").attr("class", "hyphy-neutral-line");
	        neutral_line.exit().remove();
	        neutral_line.transition().attr("x1", function (d) {
	            return self.omega_scale(d);
	        }).attr("x2", function (d) {
	            return self.omega_scale(d);
	        }).attr("y1", 0).attr("y2", this.plot_height);
	    },
	    createXAxis: function createXAxis() {
	
	        // *** X-AXIS *** //
	        var xAxis = d3.svg.axis().scale(this.omega_scale).orient("bottom");
	
	        if (this.do_log_plot) {
	            xAxis.ticks(10, this.has_zeros ? ".2r" : ".1r");
	        }
	
	        var x_axis = this.svg.selectAll(".x.axis");
	        var x_label;
	
	        if (x_axis.empty()) {
	            x_axis = this.svg.append("g").attr("class", "x hyphy-axis");
	
	            x_label = x_axis.append("g").attr("class", "hyphy-axis-label x-label");
	        } else {
	            x_label = x_axis.select(".axis-label.x-label");
	        }
	
	        x_axis.attr("transform", "translate(" + this.margins["left"] + "," + (this.plot_height + this.margins["top"]) + ")").call(xAxis);
	        x_label = x_label.attr("transform", "translate(" + this.plot_width + "," + this.margins["bottom"] + ")").selectAll("text").data(['\u03C9']);
	        x_label.enter().append("text");
	        x_label.text(function (d) {
	            return d;
	        }).style("text-anchor", "end").attr("dy", "0.0em");
	    },
	    createYAxis: function createYAxis() {
	
	        // *** Y-AXIS *** //
	        var yAxis = d3.svg.axis().scale(this.proportion_scale).orient("left").ticks(10, ".1p");
	
	        var y_axis = this.svg.selectAll(".y.hyphy-axis");
	        var y_label;
	
	        if (y_axis.empty()) {
	            y_axis = this.svg.append("g").attr("class", "y hyphy-axis");
	            y_label = y_axis.append("g").attr("class", "hyphy-axis-label y-label");
	        } else {
	            y_label = y_axis.select(".hyphy-axis-label.y-label");
	        }
	        y_axis.attr("transform", "translate(" + this.margins["left"] + "," + this.margins["top"] + ")").call(yAxis);
	        y_label = y_label.attr("transform", "translate(" + -this.margins["left"] + "," + 0 + ")").selectAll("text").data(["Proportion of sites"]);
	        y_label.enter().append("text");
	        y_label.text(function (d) {
	            return d;
	        }).style("text-anchor", "start").attr("dy", "-1em");
	    },
	
	    componentDidMount: function componentDidMount() {
	        try {
	            this.initialize();
	        } catch (e) {};
	    },
	
	    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	
	        this.setState({
	            model_name: nextProps.name,
	            omegas: nextProps.omegas
	        });
	    },
	
	    componentDidUpdate: function componentDidUpdate() {
	        try {
	            this.initialize();
	        } catch (e) {};
	    },
	
	    render: function render() {
	
	        this.save_svg_id = "export-" + this.svg_id + "-svg";
	        this.save_png_id = "export-" + this.svg_id + "-png";
	
	        return React.createElement(
	            'div',
	            { className: 'panel panel-default', id: this.state.model_name },
	            React.createElement(
	                'div',
	                { className: 'panel-heading' },
	                React.createElement(
	                    'h3',
	                    { className: 'panel-title' },
	                    React.createElement(
	                        'strong',
	                        null,
	                        this.state.model_name
	                    )
	                ),
	                React.createElement(
	                    'p',
	                    null,
	                    '\u03C9 distribution'
	                ),
	                React.createElement(
	                    'div',
	                    { className: 'btn-group' },
	                    React.createElement(
	                        'button',
	                        { id: this.save_svg_id, type: 'button', className: 'btn btn-default btn-sm' },
	                        React.createElement('span', { className: 'glyphicon glyphicon-floppy-save' }),
	                        ' SVG'
	                    ),
	                    React.createElement(
	                        'button',
	                        { id: this.save_png_id, type: 'button', className: 'btn btn-default btn-sm' },
	                        React.createElement('span', { className: 'glyphicon glyphicon-floppy-save' }),
	                        ' PNG'
	                    )
	                )
	            ),
	            React.createElement(
	                'div',
	                { className: 'panel-body' },
	                React.createElement('svg', { id: this.svg_id })
	            )
	        );
	    }
	});
	
	function render_prop_chart(model_name, omegas, settings) {
	    return React.render(React.createElement(PropChart, { name: model_name, omegas: omegas, settings: settings }), document.getElementById("primary-omega-tag"));
	}
	
	function rerender_prop_chart(model_name, omeags, settings) {
	
	    $("#primary-omega-tag").empty();
	    return render_prop_chart(model_name, omeags, settings);
	}
	
	module.exports.render_prop_chart = render_prop_chart;
	module.exports.rerender_prop_chart = rerender_prop_chart;
	module.exports.PropChart = PropChart;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(54), __webpack_require__(57), __webpack_require__(15)))

/***/ },

/***/ 223:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(d3, _, $) {"use strict";
	
	var _tree = __webpack_require__(220);
	
	var _model_fits = __webpack_require__(218);
	
	var _tree_summary = __webpack_require__(219);
	
	var _prop_chart = __webpack_require__(222);
	
	__webpack_require__(224);
	__webpack_require__(225);
	
	var React = __webpack_require__(61),
	    ReactDOM = __webpack_require__(227);
	
	var datamonkey = __webpack_require__(53),
	    busted = __webpack_require__(228);
	
	var BUSTED = React.createClass({
	  displayName: "BUSTED",
	
	
	  float_format: d3.format(".2f"),
	  p_value_format: d3.format(".4f"),
	  fit_format: d3.format(".2f"),
	
	  loadFromServer: function loadFromServer() {
	
	    var self = this;
	
	    d3.json(this.props.url, function (data) {
	
	      data["fits"]["Unconstrained model"]["branch-annotations"] = self.formatBranchAnnotations(data, "Unconstrained model");
	      data["fits"]["Constrained model"]["branch-annotations"] = self.formatBranchAnnotations(data, "Constrained model");
	
	      // rename rate distributions
	      data["fits"]["Unconstrained model"]["rate-distributions"] = data["fits"]["Unconstrained model"]["rate distributions"];
	      data["fits"]["Constrained model"]["rate-distributions"] = data["fits"]["Constrained model"]["rate distributions"];
	
	      // set display order
	      data["fits"]["Unconstrained model"]["display-order"] = 0;
	      data["fits"]["Constrained model"]["display-order"] = 1;
	
	      var json = data,
	          pmid = "25701167",
	          pmid_text = "PubMed ID " + pmid,
	          pmid_href = "http://www.ncbi.nlm.nih.gov/pubmed/" + pmid,
	          p = json["test results"]["p"],
	          test_result = p <= 0.05 ? "evidence" : "no evidence";
	
	      var fg_rate = json["fits"]["Unconstrained model"]["rate distributions"]["FG"];
	      var mapped_omegas = { "omegas": _.map(fg_rate, function (d) {
	          return _.object(["omega", "prop"], d);
	        }) };
	
	      self.setState({
	        p: p,
	        test_result: test_result,
	        json: json,
	        omegas: mapped_omegas["omegas"],
	        pmid_text: pmid_text,
	        pmid_href: pmid_href
	      });
	    });
	  },
	
	  getDefaultProps: function getDefaultProps() {
	
	    var edgeColorizer = function edgeColorizer(element, data) {
	
	      var is_foreground = data.target.annotations.is_foreground,
	          color_fill = this.options()["color-fill"] ? "black" : "red";
	
	      element.style('stroke', is_foreground ? color_fill : 'gray').style('stroke-linejoin', 'round').style('stroke-linejoin', 'round').style('stroke-linecap', 'round');
	    };
	
	    var tree_settings = {
	      'omegaPlot': {},
	      'tree-options': {
	        /* value arrays have the following meaning
	            [0] - the value of the attribute
	            [1] - does the change in attribute value trigger tree re-layout?
	        */
	        'hyphy-tree-model': ["Unconstrained model", true],
	        'hyphy-tree-highlight': ["RELAX.test", false],
	        'hyphy-tree-branch-lengths': [true, true],
	        'hyphy-tree-hide-legend': [true, false],
	        'hyphy-tree-fill-color': [true, false]
	      },
	      'hyphy-tree-legend-type': 'discrete',
	      'suppress-tree-render': false,
	      'chart-append-html': true,
	      'edgeColorizer': edgeColorizer
	    };
	
	    var distro_settings = {
	      dimensions: { width: 600, height: 400 },
	      margins: { 'left': 50, 'right': 15, 'bottom': 35, 'top': 35 },
	      legend: false,
	      domain: [0.00001, 100],
	      do_log_plot: true,
	      k_p: null,
	      plot: null,
	      svg_id: "prop-chart"
	    };
	
	    return {
	      distro_settings: distro_settings,
	      tree_settings: tree_settings,
	      constrained_threshold: "Infinity",
	      null_threshold: "-Infinity",
	      model_name: "FG"
	    };
	  },
	
	  getInitialState: function getInitialState() {
	    return {
	      p: null,
	      test_result: null,
	      json: null,
	      omegas: null,
	      pmid_text: null,
	      pmid_href: null
	    };
	  },
	
	  setEvents: function setEvents() {
	
	    var self = this;
	
	    $("#json_file").on("change", function (e) {
	      var files = e.target.files; // FileList object
	      if (files.length == 1) {
	        var f = files[0];
	        var reader = new FileReader();
	        reader.onload = function (theFile) {
	          return function (e) {
	
	            var data = JSON.parse(this.result);
	            data["fits"]["Unconstrained model"]["branch-annotations"] = self.formatBranchAnnotations(data, "Unconstrained model");
	            data["fits"]["Constrained model"]["branch-annotations"] = self.formatBranchAnnotations(data, "Constrained model");
	
	            // rename rate distributions
	            data["fits"]["Unconstrained model"]["rate-distributions"] = data["fits"]["Unconstrained model"]["rate distributions"];
	            data["fits"]["Constrained model"]["rate-distributions"] = data["fits"]["Constrained model"]["rate distributions"];
	
	            var json = data,
	                pmid = "25701167",
	                pmid_text = "PubMed ID " + pmid,
	                pmid_href = "http://www.ncbi.nlm.nih.gov/pubmed/" + pmid,
	                p = json["test results"]["p"],
	                test_result = p <= 0.05 ? "evidence" : "no evidence";
	
	            var fg_rate = json["fits"]["Unconstrained model"]["rate distributions"]["FG"];
	            var mapped_omegas = { "omegas": _.map(fg_rate, function (d) {
	                return _.object(["omega", "prop"], d);
	              }) };
	
	            self.setState({
	              p: p,
	              test_result: test_result,
	              json: json,
	              omegas: mapped_omegas["omegas"],
	              pmid_text: pmid_text,
	              pmid_href: pmid_href
	            });
	          };
	        }(f);
	        reader.readAsText(f);
	      }
	      $("#datamonkey-absrel-toggle-here").dropdown("toggle");
	      e.preventDefault();
	    });
	  },
	
	  formatBranchAnnotations: function formatBranchAnnotations(json, key) {
	
	    // attach is_foreground to branch annotations
	    var foreground = json["test set"].split(",");
	
	    var tree = d3.layout.phylotree(),
	        nodes = tree(json["fits"][key]["tree string"]).get_nodes(),
	        node_names = _.map(nodes, function (d) {
	      return d.name;
	    });
	
	    // Iterate over objects
	    var branch_annotations = _.object(node_names, _.map(node_names, function (d) {
	      return { is_foreground: _.indexOf(foreground, d) > -1 };
	    }));
	
	    return branch_annotations;
	  },
	
	  initialize: function initialize() {
	
	    var json = this.state.json;
	
	    if (!json) {
	      return;
	    }
	
	    busted.render_histogram("#chart-id", json);
	
	    // delete existing tree
	    d3.select('#tree_container').select("svg").remove();
	
	    var fg_rate = json["fits"]["Unconstrained model"]["rate distributions"]["FG"],
	        omegas = fg_rate.map(function (r) {
	      return r[0];
	    }),
	        weights = fg_rate.map(function (r) {
	      return r[1];
	    });
	
	    var dsettings = {
	      'log': true,
	      'legend': false,
	      'domain': [0.00001, 20],
	      'dimensions': { 'width': 325, 'height': 300 }
	    };
	
	    $("#export-dist-svg").on('click', function (e) {
	      datamonkey.save_image("svg", "#primary-omega-dist");
	    });
	
	    $("#export-dist-png").on('click', function (e) {
	      datamonkey.save_image("png", "#primary-omega-dist");
	    });
	  },
	
	  componentWillMount: function componentWillMount() {
	    this.loadFromServer();
	    this.setEvents();
	  },
	
	  render: function render() {
	
	    var self = this;
	    self.initialize();
	
	    return React.createElement(
	      "div",
	      { className: "tab-content" },
	      React.createElement(
	        "div",
	        { className: "tab-pane active", id: "summary_tab" },
	        React.createElement(
	          "div",
	          { className: "row", styleName: "margin-top: 5px" },
	          React.createElement(
	            "div",
	            { className: "col-md-12" },
	            React.createElement(
	              "ul",
	              { className: "list-group" },
	              React.createElement(
	                "li",
	                { className: "list-group-item list-group-item-info" },
	                React.createElement(
	                  "h3",
	                  { className: "list-group-item-heading" },
	                  React.createElement("i", { className: "fa fa-list", styleName: "margin-right: 10px" }),
	                  React.createElement(
	                    "span",
	                    { id: "summary-method-name" },
	                    "BUSTED"
	                  ),
	                  " summary"
	                ),
	                "There is ",
	                React.createElement(
	                  "strong",
	                  null,
	                  this.state.test_result
	                ),
	                " of episodic diversifying selection, with LRT p-value of ",
	                this.state.p,
	                ".",
	                React.createElement(
	                  "p",
	                  null,
	                  React.createElement(
	                    "small",
	                    null,
	                    "Please cite ",
	                    React.createElement(
	                      "a",
	                      { href: this.state.pmid_href, id: "summary-pmid" },
	                      this.state.pmid_text
	                    ),
	                    " if you use this result in a publication, presentation, or other scientific work."
	                  )
	                )
	              )
	            )
	          )
	        ),
	        React.createElement(
	          "div",
	          { className: "row" },
	          React.createElement(
	            "div",
	            { id: "hyphy-model-fits", className: "col-lg-12" },
	            React.createElement(_model_fits.ModelFits, { json: self.state.json })
	          )
	        ),
	        React.createElement(
	          "button",
	          { id: "export-chart-svg", type: "button", className: "btn btn-default btn-sm pull-right btn-export" },
	          React.createElement("span", { className: "glyphicon glyphicon-floppy-save" }),
	          " Export Chart to SVG"
	        ),
	        React.createElement(
	          "button",
	          { id: "export-chart-png", type: "button", className: "btn btn-default btn-sm pull-right btn-export" },
	          React.createElement("span", { className: "glyphicon glyphicon-floppy-save" }),
	          " Export Chart to PNG"
	        ),
	        React.createElement(
	          "div",
	          { className: "row hyphy-busted-site-table" },
	          React.createElement(
	            "div",
	            { id: "chart-id", className: "col-lg-8" },
	            React.createElement(
	              "strong",
	              null,
	              "Model Evidence Ratios Per Site"
	            ),
	            React.createElement("div", { className: "clearfix" })
	          )
	        ),
	        React.createElement(
	          "div",
	          { className: "row site-table" },
	          React.createElement(
	            "div",
	            { className: "col-lg-12" },
	            React.createElement(
	              "form",
	              { id: "er-thresholds" },
	              React.createElement(
	                "div",
	                { className: "form-group" },
	                React.createElement(
	                  "label",
	                  { "for": "er-constrained-threshold" },
	                  "Constrained Evidence Ratio Threshold:"
	                ),
	                React.createElement("input", { type: "text", className: "form-control", id: "er-constrained-threshold", defaultValue: this.props.constrained_threshold })
	              ),
	              React.createElement(
	                "div",
	                { className: "form-group" },
	                React.createElement(
	                  "label",
	                  { "for": "er-optimized-null-threshold" },
	                  "Optimized Null Evidence Ratio Threshold:"
	                ),
	                React.createElement("input", { type: "text", className: "form-control", id: "er-optimized-null-threshold", defaultValue: this.props.null_threshold })
	              )
	            ),
	            React.createElement(
	              "button",
	              { id: "export-csv", type: "button", className: "btn btn-default btn-sm pull-right hyphy-busted-btn-export" },
	              React.createElement("span", { className: "glyphicon glyphicon-floppy-save" }),
	              " Export Table to CSV"
	            ),
	            React.createElement(
	              "button",
	              { id: "apply-thresholds", type: "button", className: "btn btn-default btn-sm pull-right hyphy-busted-btn-export" },
	              "Apply Thresholds"
	            ),
	            React.createElement(
	              "table",
	              { id: "sites", className: "table sites dc-data-table" },
	              React.createElement(
	                "thead",
	                null,
	                React.createElement(
	                  "tr",
	                  { className: "header" },
	                  React.createElement(
	                    "th",
	                    null,
	                    "Site Index"
	                  ),
	                  React.createElement(
	                    "th",
	                    null,
	                    "Unconstrained Likelihood"
	                  ),
	                  React.createElement(
	                    "th",
	                    null,
	                    "Constrained Likelihood"
	                  ),
	                  React.createElement(
	                    "th",
	                    null,
	                    "Optimized Null Likelihood"
	                  ),
	                  React.createElement(
	                    "th",
	                    null,
	                    "Constrained Evidence Ratio"
	                  ),
	                  React.createElement(
	                    "th",
	                    null,
	                    "Optimized Null Evidence Ratio"
	                  )
	                )
	              )
	            )
	          )
	        )
	      ),
	      React.createElement(
	        "div",
	        { className: "tab-pane", id: "tree_tab" },
	        React.createElement(
	          "div",
	          { className: "col-md-12" },
	          React.createElement(_tree.Tree, { json: self.state.json,
	            settings: self.props.tree_settings })
	        ),
	        React.createElement(
	          "div",
	          { className: "col-md-12" },
	          React.createElement(
	            "div",
	            { id: "primary-omega-dist", className: "panel-body" },
	            React.createElement(_prop_chart.PropChart, { name: self.props.model_name, omegas: self.state.omegas,
	              settings: self.props.distro_settings })
	          )
	        )
	      )
	    );
	  }
	});
	
	// Will need to make a call to this
	// omega distributions
	var render_busted = function render_busted(url, element) {
	  ReactDOM.render(React.createElement(BUSTED, { url: url }), document.getElementById(element));
	};
	
	module.exports = render_busted;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(54), __webpack_require__(57), __webpack_require__(15)))

/***/ },

/***/ 225:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },

/***/ 227:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	module.exports = __webpack_require__(63);


/***/ },

/***/ 228:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(d3, $) {'use strict';
	
	__webpack_require__(229);
	
	var crossfilter = __webpack_require__(231),
	    dc = __webpack_require__(234),
	    datamonkey = __webpack_require__(53);
	
	function busted_render_summary(json) {
	
	    var fit_format = d3.format(".2f"),
	        prop_format = d3.format(".2p"),
	        omega_format = d3.format(".3r");
	
	    var format_run_time = function format_run_time(seconds) {
	
	        var duration_string = "";
	        seconds = parseFloat(seconds);
	        var split_array = [Math.floor(seconds / (24 * 3600)), Math.floor(seconds / 3600) % 24, Math.floor(seconds / 60) % 60, seconds % 60],
	            quals = ["d.", "hrs.", "min.", "sec."];
	
	        split_array.forEach(function (d, i) {
	            if (d) {
	                duration_string += " " + d + " " + quals[i];
	            }
	        });
	
	        return duration_string;
	    };
	
	    var branch_p_values = {};
	
	    var rate_distro_by_branch = {},
	        branch_count = 1,
	        selected_count = 0,
	        tested_count = 0;
	
	    var for_branch_table = [];
	
	    //var tree_info = render_bs_rel_tree (json, "Unconstrained model");
	
	    //var branch_lengths   = tree_info[0],
	    //    tested_branches  = {};
	
	    for (var p in json["test results"]) {
	        branch_p_values[p] = json["test results"]["p"];
	        if (branch_p_values[p] <= 0.05) {
	            selected_count++;
	        }
	    }
	
	    var fitted_distributions = json["fits"]["Unconstrained model"]["rate distributions"];
	
	    for (var b in fitted_distributions) {
	        //for_branch_table.push ([b + (tested_branches[b] ? "" : ""),branch_lengths[b],0,0,0]);
	        try {
	            for_branch_table[branch_count][2] = json["test results"][b]["LRT"];
	            for_branch_table[branch_count][3] = json["test results"][b]["p"];
	            for_branch_table[branch_count][4] = json["test results"][b]["uncorrected p"];
	        } catch (e) {}
	
	        var rateD = fitted_distributions[b];
	        rate_distro_by_branch[b] = rateD;
	        //for_branch_table[branch_count].push (branch_omegas[b]['distro']);
	        branch_count += 1;
	    }
	
	    // render summary data
	    var total_tree_length = d3.format("g")(json["fits"]["Unconstrained model"]["tree length"]);
	
	    for_branch_table = for_branch_table.sort(function (a, b) {
	        return a[4] - b[4];
	    });
	
	    d3.select('#summary-test-result').text(json['test results']['p'] <= 0.05 ? "evidence" : "no evidence");
	    d3.select('#summary-test-pvalue').text(d3.format(".3f")(json['test results']['p']));
	    d3.select('#summary-pmid').text("PubMed ID " + json['PMID']).attr("href", "http://www.ncbi.nlm.nih.gov/pubmed/" + json['PMID']);
	    d3.select('#summary-total-runtime').text(format_run_time(json['timers']['overall']));
	    d3.select('#summary-total-branches').text(branch_count);
	    d3.select('#summary-tested-branches').text(tested_count);
	    d3.select('#summary-selected-branches').text(selected_count);
	
	    has_background = json['background'];
	
	    var model_rows = [[], []];
	
	    if (has_background) {
	        model_rows.push([]);
	    }
	
	    for (k = 0; k < 2 + has_background; k++) {
	
	        var access_key,
	            secondary_key,
	            only_distro = 0;
	
	        if (k === 0) {
	
	            access_key = 'Unconstrained model';
	            secondary_key = 'FG';
	            model_rows[k].push('Unconstrained Model');
	            only_distro = 0;
	        } else {
	
	            if (has_background && k == 1) {
	                model_rows[k].push('(background branches)');
	                secondary_key = 'BG';
	                only_distro = 1;
	            } else {
	                access_key = 'Constrained model';
	                if (!(access_key in json['fits'])) {
	                    break;
	                }
	                model_rows[k].push('Constrained Model');
	                secondary_key = 'FG';
	                only_distro = 0;
	            }
	        }
	
	        try {
	            model_rows[k].push(only_distro ? '' : fit_format(json['fits'][access_key]['log-likelihood']));
	            model_rows[k].push(only_distro ? '' : json['fits'][access_key]['parameters']);
	            model_rows[k].push(only_distro ? '' : fit_format(json['fits'][access_key]['AIC-c']));
	            model_rows[k].push(only_distro ? '' : format_run_time(json['fits'][access_key]['runtime']));
	            model_rows[k].push(only_distro ? '' : fit_format(json['fits'][access_key]['tree length']));
	
	            for (j = 0; j < 3; j++) {
	                model_rows[k].push(omega_format(json['fits'][access_key]['rate distributions'][secondary_key][j][0]) + " (" + prop_format(json['fits'][access_key]['rate distributions'][secondary_key][j][1]) + ")");
	            }
	        } catch (e) {
	            datamonkey.errorModal(e);
	        }
	    }
	
	    model_rows = d3.select('#summary-model-table').selectAll("tr").data(model_rows);
	    model_rows.enter().append('tr');
	    model_rows.exit().remove();
	    model_rows = model_rows.selectAll("td").data(function (d) {
	        return d;
	    });
	    model_rows.enter().append("td");
	    model_rows.html(function (d) {
	        return d;
	    });
	}
	
	function busted_render_histogram(c, json) {
	
	    var self = this;
	
	    // Massage data for use with crossfilter
	    if (d3.keys(json["evidence ratios"]).length === 0) {
	        // no evidence ratios computed
	        d3.selectAll(c).style("display", "none");
	        d3.selectAll(".dc-data-table").style("display", "none");
	        //d3.selectAll ('[id^="export"]').style ("display", "none");
	        d3.selectAll("#er-thresholds").style("display", "none");
	        d3.selectAll("#apply-thresholds").style("display", "none");
	        return;
	    } else {
	        d3.selectAll(c).style("display", "block");
	        d3.selectAll(".dc-data-table").style("display", "table");
	        //d3.selectAll ('[id^="export"]').style ("display", "block");
	        d3.selectAll("#er-thresholds").style("display", "block");
	        d3.selectAll("#apply-thresholds").style("display", "block");
	    }
	
	    var erc = json["evidence ratios"]["constrained"][0];
	    erc = erc.map(function (d) {
	        return Math.log(d);
	    });
	
	    var test_set = json["test set"].split(",");
	    var model_results = [];
	
	    erc.forEach(function (elem, i) {
	        model_results.push({
	            "site_index": i + 1,
	            "unconstrained": json["profiles"]["unconstrained"][0][i],
	            "constrained": json["profiles"]["constrained"][0][i],
	            "optimized_null": json["profiles"]["optimized null"][0][i],
	            "er_constrained": Math.log(json["evidence ratios"]["constrained"][0][i]),
	            "er_optimized_null": Math.log(json["evidence ratios"]["optimized null"][0][i])
	        });
	    });
	
	    var data = crossfilter(model_results);
	    var site_index = data.dimension(function (d) {
	        return d["site_index"];
	    });
	
	    var sitesByConstrained = site_index.group().reduce(function (p, v) {
	        p.constrained_evidence += +v["er_constrained"];
	        p.optimized_null_evidence += +v["er_optimized_null"];
	        return p;
	    }, function (p, v) {
	        p.constrained_evidence -= +v["er_constrained"];
	        p.optimized_null_evidence -= +v["er_optimized_null"];
	        return p;
	    }, function () {
	        return { constrained_evidence: 0, optimized_null_evidence: 0 };
	    });
	
	    var sitesByON = site_index.group().reduce(function (p, v) {
	        p.optimized_null_evidence += +v["er_optimized_null"];
	        return p;
	    }, function (p, v) {
	        p.optimized_null_evidence -= +v["er_optimized_null"];
	        return p;
	    }, function () {
	        return { optimized_null_evidence: 0 };
	    });
	
	    // Set up new crossfilter dimensions to slice the table by constrained or ON evidence ratio.
	    var er_constrained = data.dimension(function (d) {
	        return d["er_constrained"];
	    });
	    var er_optimized_null = data.dimension(function (d) {
	        return d["er_optimized_null"];
	    });
	    self.er_constrained = er_constrained;
	    self.er_optimized_null = er_optimized_null;
	
	    var composite = dc.compositeChart(c);
	
	    composite.width($(window).width()).height(300).dimension(site_index).x(d3.scale.linear().domain([1, erc.length])).yAxisLabel("2 * Ln Evidence Ratio").xAxisLabel("Site Location").legend(dc.legend().x($(window).width() - 150).y(20).itemHeight(13).gap(5)).renderHorizontalGridLines(true).compose([dc.lineChart(composite).group(sitesByConstrained, "Constrained").colors(d3.scale.ordinal().range(['green'])).valueAccessor(function (d) {
	        return 2 * d.value.constrained_evidence;
	    }).keyAccessor(function (d) {
	        return d.key;
	    }), dc.lineChart(composite).group(sitesByON, "Optimized Null").valueAccessor(function (d) {
	        return 2 * d.value.optimized_null_evidence;
	    }).keyAccessor(function (d) {
	        return d.key;
	    }).colors(d3.scale.ordinal().range(['red']))]);
	
	    composite.xAxis().ticks(50);
	
	    var numberFormat = d3.format(".4f");
	
	    // Render the table
	    dc.dataTable(".dc-data-table").dimension(site_index)
	    // data table does not use crossfilter group but rather a closure
	    // as a grouping function
	    .group(function (d) {
	        return site_index.bottom(1)[0].site_index + " - " + site_index.top(1)[0].site_index;
	    }).size(site_index.groupAll().reduceCount().value()) // (optional) max number of records to be shown, :default = 25
	    // dynamic columns creation using an array of closures
	    .columns([function (d) {
	        return d.site_index;
	    }, function (d) {
	        return numberFormat(d["unconstrained"]);
	    }, function (d) {
	        return numberFormat(d["constrained"]);
	    }, function (d) {
	        return numberFormat(d["optimized_null"]);
	    }, function (d) {
	        return numberFormat(d["er_constrained"]);
	    }, function (d) {
	        return numberFormat(d["er_optimized_null"]);
	    }])
	
	    // (optional) sort using the given field, :default = function(d){return d;}
	    .sortBy(function (d) {
	        return d.site_index;
	    })
	
	    // (optional) sort order, :default ascending
	    .order(d3.ascending)
	
	    // (optional) custom renderlet to post-process chart using D3
	    .renderlet(function (table) {
	        table.selectAll(".dc-table-group").classed("info", true);
	    });
	
	    $("#export-csv").on('click', function (e) {
	        datamonkey.export_csv_button(site_index.top(Infinity));
	    });
	
	    $("#export-chart-svg").on('click', function (e) {
	        // class manipulation for the image to display correctly
	        $("#chart-id").find("svg")[0].setAttribute("class", "dc-chart");
	        datamonkey.save_image("svg", "#chart-id");
	        $("#chart-id").find("svg")[0].setAttribute("class", "");
	    });
	
	    $("#export-chart-png").on('click', function (e) {
	        // class manipulation for the image to display correctly
	        $("#chart-id").find("svg")[0].setAttribute("class", "dc-chart");
	        datamonkey.save_image("png", "#chart-id");
	        $("#chart-id").find("svg")[0].setAttribute("class", "");
	    });
	    $("#apply-thresholds").on('click', function (e) {
	        var erConstrainedThreshold = document.getElementById("er-constrained-threshold").value;
	        var erOptimizedNullThreshold = document.getElementById("er-optimized-null-threshold").value;
	        self.er_constrained.filter(function (d) {
	            return d >= erConstrainedThreshold;
	        });
	        self.er_optimized_null.filter(function (d) {
	            return d >= erOptimizedNullThreshold;
	        });
	        dc.renderAll();
	    });
	
	    dc.renderAll();
	}
	
	module.exports.render_summary = busted_render_summary;
	module.exports.render_histogram = busted_render_histogram;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(54), __webpack_require__(15)))

/***/ },

/***/ 229:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },

/***/ 235:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(d3, $) {"use strict";
	
	var _model_fits = __webpack_require__(218);
	
	var _tree_summary = __webpack_require__(219);
	
	var _tree = __webpack_require__(220);
	
	var _omega_plots = __webpack_require__(236);
	
	var React = __webpack_require__(61);
	var _ = __webpack_require__(264);
	var RELAX = React.createClass({
	  displayName: "RELAX",
	
	
	  float_format: d3.format(".2f"),
	  p_value_format: d3.format(".4f"),
	  fit_format: d3.format(".2f"),
	
	  loadFromServer: function loadFromServer() {
	
	    var self = this;
	
	    d3.json(this.props.url, function (data) {
	
	      data["fits"]["Partitioned MG94xREV"]["branch-annotations"] = self.formatBranchAnnotations(data, "Partitioned MG94xREV");
	      data["fits"]["General Descriptive"]["branch-annotations"] = self.formatBranchAnnotations(data, "General Descriptive");
	      data["fits"]["Null"]["branch-annotations"] = self.formatBranchAnnotations(data, "Null");
	      data["fits"]["Alternative"]["branch-annotations"] = self.formatBranchAnnotations(data, "Alternative");
	      data["fits"]["Partitioned Exploratory"]["branch-annotations"] = self.formatBranchAnnotations(data, "Partitioned Exploratory");
	
	      var annotations = data["fits"]["Partitioned MG94xREV"]["branch-annotations"],
	          json = data,
	          pmid = data["PMID"],
	          test_results = data["relaxation_test"];
	
	      var p = data["relaxation-test"]["p"],
	          direction = data["fits"]["Alternative"]["K"] > 1 ? 'intensification' : 'relaxation',
	          evidence = p <= self.props.alpha_level ? 'significant' : 'not significant',
	          pvalue = self.p_value_format(p),
	          lrt = self.fit_format(data["relaxation-test"]["LR"]),
	          summary_k = self.fit_format(data["fits"]["Alternative"]["K"]),
	          pmid_text = "PubMed ID " + pmid,
	          pmid_href = "http://www.ncbi.nlm.nih.gov/pubmed/" + pmid;
	
	      self.setState({
	        annotations: annotations,
	        json: json,
	        pmid: pmid,
	        test_results: test_results,
	        p: p,
	        direction: direction,
	        evidence: evidence,
	        pvalue: pvalue,
	        lrt: lrt,
	        summary_k: summary_k,
	        pmid_text: pmid_text,
	        pmid_href: pmid_href
	      });
	    });
	  },
	
	  getDefaultProps: function getDefaultProps() {
	
	    var edgeColorizer = function edgeColorizer(element, data) {
	
	      var self = this,
	          scaling_exponent = 0.33,
	          omega_format = d3.format(".3r");
	
	      var omega_color = d3.scale.pow().exponent(scaling_exponent).domain([0, 0.25, 1, 5, 10]).range(self.options()["color-fill"] ? ["#DDDDDD", "#AAAAAA", "#888888", "#444444", "#000000"] : ["#6e4fa2", "#3288bd", "#e6f598", "#f46d43", "#9e0142"]).clamp(true);
	
	      if (data.target.annotations) {
	        element.style('stroke', omega_color(data.target.annotations.length) || null);
	        $(element[0][0]).tooltip('destroy');
	        $(element[0][0]).tooltip({
	          'title': omega_format(data.target.annotations.length),
	          'html': true,
	          'trigger': 'hover',
	          'container': 'body',
	          'placement': 'auto'
	        });
	      } else {
	        element.style('stroke', null);
	        $(element[0][0]).tooltip('destroy');
	      }
	
	      var selected_partition = $("#hyphy-tree-highlight").attr("value");
	
	      if (selected_partition && this.get_partitions()) {
	        var partitions = this.get_partitions()[selected_partition];
	
	        element.style('stroke-width', partitions && partitions[data.target.name] ? '8' : '4').style('stroke-linejoin', 'round').style('stroke-linecap', 'round');
	      }
	    };
	
	    return {
	      edgeColorizer: edgeColorizer,
	      alpha_level: 0.05
	    };
	  },
	
	  getInitialState: function getInitialState() {
	
	    var model_fits_id = "#hyphy-model-fits",
	        omega_plots_id = "#hyphy-omega-plots",
	        summary_id = "#hyphy-relax-summary",
	        tree_id = "#tree-tab";
	
	    var tree_settings = {
	      'omegaPlot': {},
	      'tree-options': {
	        /* value arrays have the following meaning
	            [0] - the value of the attribute
	            [1] - does the change in attribute value trigger tree re-layout?
	        */
	        'hyphy-tree-model': ["Partitioned MG94xREV", true],
	        'hyphy-tree-highlight': ["RELAX.test", false],
	        'hyphy-tree-branch-lengths': [true, true],
	        'hyphy-tree-hide-legend': [true, false],
	        'hyphy-tree-fill-color': [true, false]
	      },
	      'suppress-tree-render': false,
	      'chart-append-html': true,
	      'edgeColorizer': this.props.edgeColorizer
	    };
	
	    return {
	      annotations: null,
	      json: null,
	      pmid: null,
	      settings: tree_settings,
	      test_results: null,
	      tree: null,
	      p: null,
	      direction: 'unknown',
	      evidence: 'unknown',
	      pvalue: null,
	      lrt: null,
	      summary_k: 'unknown',
	      pmid_text: "PubMed ID : Unknown",
	      pmid_href: "#",
	      relaxation_K: "unknown"
	    };
	  },
	
	  componentWillMount: function componentWillMount() {
	    this.loadFromServer();
	    this.setEvents();
	  },
	
	  setEvents: function setEvents() {
	
	    var self = this;
	
	    $("#datamonkey-relax-load-json").on("change", function (e) {
	      var files = e.target.files; // FileList object
	
	      if (files.length == 1) {
	        var f = files[0];
	        var reader = new FileReader();
	
	        reader.onload = function (theFile) {
	          return function (e) {
	
	            var data = JSON.parse(this.result);
	            data["fits"]["Partitioned MG94xREV"]["branch-annotations"] = self.formatBranchAnnotations(data, "Partitioned MG94xREV");
	            data["fits"]["General Descriptive"]["branch-annotations"] = self.formatBranchAnnotations(data, "General Descriptive");
	            data["fits"]["Null"]["branch-annotations"] = self.formatBranchAnnotations(data, "Null");
	            data["fits"]["Alternative"]["branch-annotations"] = self.formatBranchAnnotations(data, "Alternative");
	            data["fits"]["Partitioned Exploratory"]["branch-annotations"] = self.formatBranchAnnotations(data, "Partitioned Exploratory");
	
	            var annotations = data["fits"]["Partitioned MG94xREV"]["branch-annotations"],
	                json = data,
	                pmid = data["PMID"],
	                test_results = data["relaxation_test"];
	
	            var p = data["relaxation-test"]["p"],
	                direction = data["fits"]["Alternative"]["K"] > 1 ? 'intensification' : 'relaxation',
	                evidence = p <= self.props.alpha_level ? 'significant' : 'not significant',
	                pvalue = self.p_value_format(p),
	                lrt = self.fit_format(data["relaxation-test"]["LR"]),
	                summary_k = self.fit_format(data["fits"]["Alternative"]["K"]),
	                pmid_text = "PubMed ID " + pmid,
	                pmid_href = "http://www.ncbi.nlm.nih.gov/pubmed/" + pmid;
	
	            self.setState({
	              annotations: annotations,
	              json: json,
	              pmid: pmid,
	              test_results: test_results,
	              p: p,
	              direction: direction,
	              evidence: evidence,
	              pvalue: pvalue,
	              lrt: lrt,
	              summary_k: summary_k,
	              pmid_text: pmid_text,
	              pmid_href: pmid_href
	            });
	          };
	        }(f);
	        reader.readAsText(f);
	      }
	
	      $("#datamonkey-absrel-toggle-here").dropdown("toggle");
	      e.preventDefault();
	    });
	  },
	
	  formatBranchAnnotations: function formatBranchAnnotations(json, key) {
	
	    var initial_branch_annotations = json["fits"][key]["branch-annotations"];
	
	    if (!initial_branch_annotations) {
	      initial_branch_annotations = json["fits"][key]["rate distributions"];
	    }
	
	    // Iterate over objects
	    var branch_annotations = _.mapObject(initial_branch_annotations, function (val, key) {
	      return { "length": val };
	    });
	
	    return branch_annotations;
	  },
	
	  initialize: function initialize() {},
	
	  render: function render() {
	
	    var self = this;
	
	    return React.createElement(
	      "div",
	      { className: "tab-content" },
	      React.createElement(
	        "div",
	        { className: "tab-pane active", id: "datamonkey-relax-summary-tab" },
	        React.createElement(
	          "div",
	          { id: "hyphy-relax-summary", className: "row" },
	          React.createElement(
	            "div",
	            { className: "col-md-12" },
	            React.createElement(
	              "ul",
	              { className: "list-group" },
	              React.createElement(
	                "li",
	                { className: "list-group-item list-group-item-info" },
	                React.createElement(
	                  "h3",
	                  { className: "list-group-item-heading" },
	                  React.createElement("i", { className: "fa fa-list", styleFormat: "margin-right: 10px" }),
	                  React.createElement(
	                    "span",
	                    { id: "summary-method-name" },
	                    "RELAX(ed selection test)"
	                  ),
	                  " summary"
	                ),
	                React.createElement(
	                  "p",
	                  { className: "list-group-item-text lead", styleFormat: "margin-top:0.5em; " },
	                  "Test for selection ",
	                  React.createElement(
	                    "strong",
	                    { id: "summary-direction" },
	                    this.state.direction
	                  ),
	                  "(",
	                  React.createElement(
	                    "abbr",
	                    { title: "Relaxation coefficient" },
	                    "K"
	                  ),
	                  " = ",
	                  React.createElement(
	                    "strong",
	                    { id: "summary-K" },
	                    this.state.summary_k
	                  ),
	                  ") was ",
	                  React.createElement(
	                    "strong",
	                    { id: "summary-evidence" },
	                    this.state.evidence
	                  ),
	                  "(p = ",
	                  React.createElement(
	                    "strong",
	                    { id: "summary-pvalue" },
	                    this.state.p
	                  ),
	                  ", ",
	                  React.createElement(
	                    "abbr",
	                    { title: "Likelihood ratio statistic" },
	                    "LR"
	                  ),
	                  " = ",
	                  React.createElement(
	                    "strong",
	                    { id: "summary-LRT" },
	                    this.state.lrt
	                  ),
	                  ")"
	                ),
	                React.createElement(
	                  "p",
	                  null,
	                  React.createElement(
	                    "small",
	                    null,
	                    "Please cite ",
	                    React.createElement(
	                      "a",
	                      { href: this.state.pmid_href, id: "summary-pmid" },
	                      this.state.pmid_text
	                    ),
	                    " if you use this result in a publication, presentation, or other scientific work."
	                  )
	                )
	              )
	            )
	          )
	        ),
	        React.createElement(
	          "div",
	          { id: "hyphy-model-fits", className: "row" },
	          React.createElement(_model_fits.ModelFits, { json: self.state.json })
	        ),
	        React.createElement(
	          "div",
	          { id: "hyphy-omega-plots", className: "row" },
	          React.createElement(_omega_plots.OmegaPlotGrid, { json: self.state.json })
	        )
	      ),
	      React.createElement(
	        "div",
	        { className: "tab-pane", id: "tree-tab" },
	        React.createElement(_tree.Tree, { json: self.state.json,
	          settings: self.state.settings })
	      )
	    );
	  }
	});
	
	// Will need to make a call to this
	// omega distributions
	function render_relax(url, element) {
	  React.render(React.createElement(RELAX, { url: url }), document.getElementById(element));
	}
	
	module.exports = render_relax;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(54), __webpack_require__(15)))

/***/ },

/***/ 236:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(d3) {'use strict';
	
	var React = __webpack_require__(61);
	var datamonkey = __webpack_require__(53);
	var _ = __webpack_require__(264);
	
	var OmegaPlot = React.createClass({
	    displayName: 'OmegaPlot',
	
	
	    getDefaultProps: function getDefaultProps() {
	        return {
	            svg_id: null,
	            dimensions: { width: 600, height: 400 },
	            margins: { 'left': 50, 'right': 15, 'bottom': 35, 'top': 35 },
	            has_zeros: false,
	            legend_id: null,
	            do_log_plot: true,
	            k_p: null,
	            plot: null
	        };
	    },
	
	    setEvents: function setEvents() {
	        var self = this;
	
	        d3.select("#" + this.save_svg_id).on('click', function (e) {
	            datamonkey.save_image("svg", "#" + self.svg_id);
	        });
	
	        d3.select("#" + this.save_png_id).on('click', function (e) {
	            datamonkey.save_image("png", "#" + self.svg_id);
	        });
	    },
	
	    initialize: function initialize() {
	
	        if (!this.state.omegas || !this.state.omegas["Reference"]) {
	            return;
	        }
	
	        var data_to_plot = this.state.omegas["Reference"];
	        var secondary_data = this.state.omegas["Test"];
	
	        // Set props from settings
	        this.svg_id = this.props.settings.svg_id;
	        this.dimensions = this.props.settings.dimensions || this.props.dimensions;
	        this.legend_id = this.props.settings.legend || this.props.legend_id;
	        this.do_log_plot = this.props.settings.log || this.props.do_log_plot;
	        this.k_p = this.props.settings.k || this.props.k_p;
	
	        var dimensions = this.props.dimensions;
	        var margins = this.props.margins;
	
	        this.margins = margins;
	
	        if (this.do_log_plot) {
	            this.has_zeros = data_to_plot.some(function (d) {
	                return d.omega <= 0;
	            });
	            if (secondary_data) {
	                this.has_zeros = this.has_zeros || data_to_plot.some(function (d) {
	                    return d.omega <= 0;
	                });
	            }
	        }
	
	        this.plot_width = dimensions["width"] - margins['left'] - margins['right'], this.plot_height = dimensions["height"] - margins['top'] - margins['bottom'];
	
	        var domain = this.state.settings["domain"] || d3.extent(secondary_data ? secondary_data.map(function (d) {
	            return d.omega;
	        }).concat(data_to_plot.map(function (d) {
	            return d.omega;
	        })) : data_to_plot.map(function (d) {
	            return d.omega;
	        }));
	
	        domain[0] *= 0.5;
	
	        this.omega_scale = (this.do_log_plot ? this.has_zeros ? d3.scale.pow().exponent(0.2) : d3.scale.log() : d3.scale.linear()).range([0, this.plot_width]).domain(domain).nice();
	
	        this.proportion_scale = d3.scale.linear().range([this.plot_height, 0]).domain([-0.05, 1]).clamp(true);
	
	        // compute margins -- circle AREA is proportional to the relative weight
	        // maximum diameter is (height - text margin)
	        this.svg = d3.select("#" + this.svg_id).attr("width", dimensions.width).attr("height", dimensions.height);
	        this.plot = this.svg.selectAll(".container");
	
	        this.svg.selectAll("defs").remove();
	        this.svg.append("defs").append("marker").attr("id", "arrowhead").attr("refX", 10) /*must be smarter way to calculate shift*/
	        .attr("refY", 4).attr("markerWidth", 10).attr("markerHeight", 8).attr("orient", "auto").attr("stroke", "#000").attr("fill", "#000").append("path").attr("d", "M 0,0 V8 L10,4 Z");
	
	        if (this.plot.empty()) {
	            this.plot = this.svg.append("g").attr("class", "container");
	        }
	
	        this.plot.attr("transform", "translate(" + this.margins["left"] + " , " + this.margins["top"] + ")");
	        this.reference_omega_lines = this.plot.selectAll(".hyphy-omega-line-reference"), this.displacement_lines = this.plot.selectAll(".hyphy-displacement-line");
	
	        this.createDisplacementLine();
	        this.createNeutralLine();
	        this.createOmegaLine();
	        this.createReferenceLine();
	        this.createXAxis();
	        this.createYAxis();
	        this.setEvents();
	    },
	    makeSpring: function makeSpring(x1, x2, y1, y2, step, displacement) {
	
	        if (x1 == x2) {
	            y1 = Math.min(y1, y2);
	            return "M" + x1 + "," + (y1 - 40) + "v20";
	        }
	
	        var spring_data = [],
	            point = [x1, y1],
	            angle = Math.atan2(y2 - y1, x2 - x1);
	
	        var step = [step * Math.cos(angle), step * Math.sin(angle)];
	        var k = 0;
	
	        if (Math.abs(x1 - x2) < 15) {
	            spring_data.push(point);
	        } else {
	            while (x1 < x2 && point[0] < x2 - 15 || x1 > x2 && point[0] > x2 + 15) {
	                point = point.map(function (d, i) {
	                    return d + step[i];
	                });
	                if (k % 2) {
	                    spring_data.push([point[0], point[1] + displacement]);
	                } else {
	                    spring_data.push([point[0], point[1] - displacement]);
	                }
	                k++;
	                if (k > 100) {
	                    break;
	                }
	            }
	        }
	
	        if (spring_data.length > 1) {
	            spring_data.pop();
	        }
	
	        spring_data.push([x2, y2]);
	        var line = d3.svg.line().interpolate("monotone");
	        return line(spring_data);
	    },
	    createDisplacementLine: function createDisplacementLine() {
	
	        var self = this;
	        var data_to_plot = this.state.omegas["Reference"];
	        var secondary_data = this.state.omegas["Test"];
	
	        if (secondary_data) {
	            var diffs = data_to_plot.map(function (d, i) {
	                return {
	                    'x1': d.omega,
	                    'x2': secondary_data[i].omega,
	                    'y1': d.weight * 0.98,
	                    'y2': secondary_data[i].weight * 0.98
	                };
	            });
	
	            this.displacement_lines = this.displacement_lines.data(diffs);
	            this.displacement_lines.enter().append("path");
	            this.displacement_lines.exit().remove();
	            this.displacement_lines.transition().attr("d", function (d) {
	                return self.makeSpring(self.omega_scale(d.x1), self.omega_scale(d.x2), self.proportion_scale(d.y1 * 0.5), self.proportion_scale(d.y2 * 0.5), 5, 5);
	            }).attr("marker-end", "url(#arrowhead)").attr("class", "hyphy-displacement-line");
	        }
	    },
	    createReferenceLine: function createReferenceLine() {
	
	        var data_to_plot = this.state.omegas["Reference"];
	        var secondary_data = this.state.omegas["Test"];
	        var self = this;
	
	        if (secondary_data) {
	            this.reference_omega_lines = this.reference_omega_lines.data(data_to_plot);
	            this.reference_omega_lines.enter().append("line");
	            this.reference_omega_lines.exit().remove();
	
	            this.reference_omega_lines.transition().attr("x1", function (d) {
	                return self.omega_scale(d.omega);
	            }).attr("x2", function (d) {
	                return self.omega_scale(d.omega);
	            }).attr("y1", function (d) {
	                return self.proportion_scale(-0.05);
	            }).attr("y2", function (d) {
	                return self.proportion_scale(d.weight);
	            }).style("stroke", function (d) {
	                return "#d62728";
	            }).attr("class", "hyphy-omega-line-reference");
	        } else {
	            this.reference_omega_lines.remove();
	            this.displacement_lines.remove();
	        }
	    },
	    createOmegaLine: function createOmegaLine() {
	
	        var data_to_plot = this.state.omegas["Reference"];
	        var secondary_data = this.state.omegas["Test"];
	        var self = this;
	
	        // ** Omega Line (Red) ** //
	        var omega_lines = this.plot.selectAll(".hyphy-omega-line").data(secondary_data ? secondary_data : data_to_plot);
	        omega_lines.enter().append("line");
	        omega_lines.exit().remove();
	        omega_lines.transition().attr("x1", function (d) {
	            return self.omega_scale(d.omega);
	        }).attr("x2", function (d) {
	            return self.omega_scale(d.omega);
	        }).attr("y1", function (d) {
	            return self.proportion_scale(-0.05);
	        }).attr("y2", function (d) {
	            return self.proportion_scale(d.weight);
	        }).style("stroke", function (d) {
	            return "#1f77b4";
	        }).attr("class", "hyphy-omega-line");
	    },
	    createNeutralLine: function createNeutralLine() {
	        var self = this;
	
	        // ** Neutral Line (Blue) ** //
	        var neutral_line = this.plot.selectAll(".hyphy-neutral-line").data([1]);
	        neutral_line.enter().append("line").attr("class", "hyphy-neutral-line");
	        neutral_line.exit().remove();
	        neutral_line.transition().attr("x1", function (d) {
	            return self.omega_scale(d);
	        }).attr("x2", function (d) {
	            return self.omega_scale(d);
	        }).attr("y1", 0).attr("y2", this.plot_height);
	    },
	    createXAxis: function createXAxis() {
	
	        // *** X-AXIS *** //
	        var xAxis = d3.svg.axis().scale(this.omega_scale).orient("bottom");
	
	        if (this.do_log_plot) {
	            xAxis.ticks(10, this.has_zeros ? ".2r" : ".1r");
	        }
	
	        var x_axis = this.svg.selectAll(".x.axis");
	        var x_label;
	
	        if (x_axis.empty()) {
	            x_axis = this.svg.append("g").attr("class", "x hyphy-axis");
	
	            x_label = x_axis.append("g").attr("class", "hyphy-axis-label x-label");
	        } else {
	            x_label = x_axis.select(".axis-label.x-label");
	        }
	
	        x_axis.attr("transform", "translate(" + this.margins["left"] + "," + (this.plot_height + this.margins["top"]) + ")").call(xAxis);
	        x_label = x_label.attr("transform", "translate(" + this.plot_width + "," + this.margins["bottom"] + ")").selectAll("text").data(['\u03C9']);
	        x_label.enter().append("text");
	        x_label.text(function (d) {
	            return d;
	        }).style("text-anchor", "end").attr("dy", "0.0em");
	    },
	    createYAxis: function createYAxis() {
	
	        // *** Y-AXIS *** //
	        var yAxis = d3.svg.axis().scale(this.proportion_scale).orient("left").ticks(10, ".1p");
	
	        var y_axis = this.svg.selectAll(".y.hyphy-axis");
	        var y_label;
	
	        if (y_axis.empty()) {
	            y_axis = this.svg.append("g").attr("class", "y hyphy-axis");
	            y_label = y_axis.append("g").attr("class", "hyphy-axis-label y-label");
	        } else {
	            y_label = y_axis.select(".hyphy-axis-label.y-label");
	        }
	        y_axis.attr("transform", "translate(" + this.margins["left"] + "," + this.margins["top"] + ")").call(yAxis);
	        y_label = y_label.attr("transform", "translate(" + -this.margins["left"] + "," + 0 + ")").selectAll("text").data(["Proportion of sites"]);
	        y_label.enter().append("text");
	        y_label.text(function (d) {
	            return d;
	        }).style("text-anchor", "start").attr("dy", "-1em");
	    },
	
	    getInitialState: function getInitialState() {
	        return {
	            omegas: this.props.omegas,
	            settings: this.props.settings
	        };
	    },
	
	    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	
	        this.setState({
	            omegas: nextProps.omegas
	        });
	    },
	
	    componentDidUpdate: function componentDidUpdate() {
	        this.initialize();
	    },
	
	    componentDidMount: function componentDidMount() {
	        this.initialize();
	    },
	
	    render: function render() {
	
	        var key = this.props.omegas.key,
	            label = this.props.omegas.label;
	
	        this.svg_id = key + "-svg";
	        this.save_svg_id = "export-" + key + "-svg";
	        this.save_png_id = "export-" + key + "-png";
	
	        return React.createElement(
	            'div',
	            { className: 'col-lg-6' },
	            React.createElement(
	                'div',
	                { className: 'panel panel-default', id: key },
	                React.createElement(
	                    'div',
	                    { className: 'panel-heading' },
	                    React.createElement(
	                        'h3',
	                        { className: 'panel-title' },
	                        '\u03C9 distributions under the ',
	                        React.createElement(
	                            'strong',
	                            null,
	                            label
	                        ),
	                        ' model'
	                    ),
	                    React.createElement(
	                        'p',
	                        null,
	                        React.createElement(
	                            'small',
	                            null,
	                            'Test branches are shown in ',
	                            React.createElement(
	                                'span',
	                                { className: 'hyphy-blue' },
	                                'blue'
	                            ),
	                            ' and reference branches are shown in ',
	                            React.createElement(
	                                'span',
	                                { className: 'hyphy-red' },
	                                'red'
	                            )
	                        )
	                    ),
	                    React.createElement(
	                        'div',
	                        { className: 'btn-group' },
	                        React.createElement(
	                            'button',
	                            { id: this.save_svg_id, type: 'button', className: 'btn btn-default btn-sm' },
	                            React.createElement('span', { className: 'glyphicon glyphicon-floppy-save' }),
	                            ' SVG'
	                        ),
	                        React.createElement(
	                            'button',
	                            { id: this.save_png_id, type: 'button', className: 'btn btn-default btn-sm' },
	                            React.createElement('span', { className: 'glyphicon glyphicon-floppy-save' }),
	                            ' PNG'
	                        )
	                    )
	                ),
	                React.createElement(
	                    'div',
	                    { className: 'panel-body' },
	                    React.createElement('svg', { id: this.svg_id })
	                )
	            )
	        );
	    }
	});
	
	var OmegaPlotGrid = React.createClass({
	    displayName: 'OmegaPlotGrid',
	
	
	    getInitialState: function getInitialState() {
	        return { omega_distributions: this.getDistributions(this.props.json) };
	    },
	
	    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	
	        this.setState({
	            omega_distributions: this.getDistributions(nextProps.json)
	        });
	    },
	
	    getDistributions: function getDistributions(json) {
	
	        var omega_distributions = {};
	
	        if (!json) {
	            return [];
	        }
	
	        for (var m in json["fits"]) {
	            var this_model = json["fits"][m];
	            omega_distributions[m] = {};
	            var distributions = [];
	            for (var d in this_model["rate-distributions"]) {
	                var this_distro = this_model["rate-distributions"][d];
	                var this_distro_entry = [d, "", "", ""];
	                omega_distributions[m][d] = this_distro.map(function (d) {
	                    return {
	                        'omega': d[0],
	                        'weight': d[1]
	                    };
	                });
	            }
	        }
	
	        _.each(omega_distributions, function (item, key) {
	            item.key = key.toLowerCase().replace(/ /g, '-');
	            item.label = key;
	        });
	
	        var omega_distributions = _.filter(omega_distributions, function (item) {
	            return _.isObject(item["Reference"]);
	        });
	
	        return omega_distributions;
	    },
	
	    render: function render() {
	
	        var OmegaPlots = _.map(this.state.omega_distributions, function (item, key) {
	
	            var model_name = key;
	            var omegas = item;
	
	            var settings = {
	                svg_id: omegas.key + '-svg',
	                dimensions: { width: 600, height: 400 },
	                margins: { 'left': 50, 'right': 15, 'bottom': 35, 'top': 35 },
	                has_zeros: false,
	                legend_id: null,
	                do_log_plot: true,
	                k_p: null,
	                plot: null
	            };
	
	            return React.createElement(OmegaPlot, { name: model_name, omegas: omegas, settings: settings });
	        });
	
	        return React.createElement(
	            'div',
	            null,
	            OmegaPlots
	        );
	    }
	
	});
	
	module.exports.OmegaPlot = OmegaPlot;
	module.exports.OmegaPlotGrid = OmegaPlotGrid;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(54)))

/***/ },

/***/ 237:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(d3, $, _) {"use strict";
	
	__webpack_require__(238);
	__webpack_require__(239);
	__webpack_require__(240);
	
	var React = __webpack_require__(61);
	var datamonkey = __webpack_require__(53);
	
	var SLAC = React.createClass({
	    displayName: "SLAC",
	
	
	    float_format: d3.format(".2f"),
	
	    dm_loadFromServer: function dm_loadFromServer() {
	        /* 20160721 SLKP: prefixing all custom (i.e. not defined by REACT) with dm_
	           to make it easier to recognize scoping immediately */
	
	        var self = this;
	
	        d3.json(self.props.url, function (request_error, data) {
	
	            if (!data) {
	                var error_message_text = request_error.status == 404 ? self.props.url + " could not be loaded" : request_error.statusText;
	                self.setState({ error_message: error_message_text });
	            } else {
	                self.dm_initializeFromJSON(data);
	            }
	        });
	    },
	
	    dm_initializeFromJSON: function dm_initializeFromJSON(data) {
	        this.setState({ analysis_results: data });
	    },
	
	    getDefaultProps: function getDefaultProps() {
	        /* default properties for the component */
	
	        return {
	            url: "#"
	        };
	    },
	
	    getInitialState: function getInitialState() {
	
	        return {
	            analysis_results: null,
	            error_message: null,
	            pValue: 0.1
	        };
	    },
	
	    componentWillMount: function componentWillMount() {
	        this.dm_loadFromServer();
	        this.dm_setEvents();
	    },
	
	    dm_setEvents: function dm_setEvents() {
	
	        var self = this;
	
	        $("#datamonkey-json-file").on("change", function (e) {
	
	            var files = e.target.files; // FileList object
	
	            if (files.length == 1) {
	                var f = files[0];
	                var reader = new FileReader();
	
	                reader.onload = function (theFile) {
	                    return function (e) {
	                        try {
	                            self.dm_initializeFromJSON(JSON.parse(this.result));
	                        } catch (error) {
	                            self.setState({ error_message: error.toString() });
	                        }
	                    };
	                }(f);
	
	                reader.readAsText(f);
	            }
	
	            $("#datamonkey-json-file-toggle").dropdown("toggle");
	        });
	    },
	
	    dm_adjustPvalue: function dm_adjustPvalue(event) {
	        this.setState({ pValue: parseFloat(event.target.value) });
	    },
	
	    render: function render() {
	
	        var self = this;
	
	        if (self.state.error_message) {
	            return React.createElement(
	                "div",
	                { id: "datamonkey-error", className: "alert alert-danger alert-dismissible", role: "alert" },
	                React.createElement(
	                    "button",
	                    { type: "button", className: "close", "data-dismiss": "alert", "aria-label": "Close" },
	                    React.createElement(
	                        "span",
	                        { "aria-hidden": "true" },
	                        "\xD7"
	                    )
	                ),
	                React.createElement(
	                    "strong",
	                    null,
	                    self.state.error_message
	                ),
	                " ",
	                React.createElement("span", { id: "datamonkey-error-text" })
	            );
	        }
	
	        if (self.state.analysis_results) {
	
	            return React.createElement(
	                "div",
	                { className: "tab-content" },
	                React.createElement(
	                    "div",
	                    { className: "tab-pane", id: "summary_tab" },
	                    React.createElement(
	                        "div",
	                        { className: "row" },
	                        React.createElement(
	                            "div",
	                            { id: "summary-div", className: "col-md-12" },
	                            React.createElement(SLACBanner, { analysis_results: self.state.analysis_results, pValue: self.state.pValue, pAdjuster: _.bind(self.dm_adjustPvalue, self) })
	                        )
	                    ),
	                    React.createElement(
	                        "div",
	                        { className: "row hidden-print" },
	                        React.createElement(
	                            "div",
	                            { id: "datamonkey-slac-tree-summary", className: "col-lg-4 col-md-6 col-sm-12" },
	                            React.createElement(
	                                "div",
	                                { className: "panel panel-default" },
	                                React.createElement(
	                                    "div",
	                                    { className: "panel-heading" },
	                                    React.createElement(
	                                        "h3",
	                                        { className: "panel-title" },
	                                        React.createElement("i", { className: "fa fa-puzzle-piece" }),
	                                        " Partition information"
	                                    )
	                                ),
	                                React.createElement(
	                                    "div",
	                                    { className: "panel-body" },
	                                    React.createElement(
	                                        "small",
	                                        null,
	                                        React.createElement(DatamonkeyPartitionTable, {
	                                            pValue: self.state.pValue,
	                                            trees: self.state.analysis_results.trees,
	                                            partitions: self.state.analysis_results.partitions,
	                                            branchAttributes: self.state.analysis_results['branch attributes'],
	                                            siteResults: self.state.analysis_results.MLE,
	                                            accessorPositive: function accessorPositive(json, partition) {
	                                                return _.map(json["content"][partition]["by-site"]["AVERAGED"], function (v) {
	                                                    return v[8];
	                                                });
	                                            },
	                                            accessorNegative: function accessorNegative(json, partition) {
	                                                return _.map(json["content"][partition]["by-site"]["AVERAGED"], function (v) {
	                                                    return v[9];
	                                                });
	                                            }
	                                        })
	                                    )
	                                )
	                            )
	                        ),
	                        React.createElement(
	                            "div",
	                            { id: "datamonkey-slac-model-fits", className: "col-lg-5 col-md-6 col-sm-12" },
	                            React.createElement(
	                                "div",
	                                { className: "panel panel-default" },
	                                React.createElement(
	                                    "div",
	                                    { className: "panel-heading" },
	                                    React.createElement(
	                                        "h3",
	                                        { className: "panel-title" },
	                                        React.createElement("i", { className: "fa fa-table" }),
	                                        " Model fits"
	                                    )
	                                ),
	                                React.createElement(
	                                    "div",
	                                    { className: "panel-body" },
	                                    React.createElement(
	                                        "small",
	                                        null,
	                                        React.createElement(DatamonkeyModelTable, { fits: self.state.analysis_results.fits })
	                                    )
	                                )
	                            )
	                        ),
	                        React.createElement(
	                            "div",
	                            { id: "datamonkey-slac-timers", className: "col-lg-3 col-md-3 col-sm-12" },
	                            React.createElement(
	                                "div",
	                                { className: "panel panel-default" },
	                                React.createElement(
	                                    "div",
	                                    { className: "panel-heading" },
	                                    React.createElement(
	                                        "h3",
	                                        { className: "panel-title" },
	                                        React.createElement("i", { className: "fa fa-clock-o" }),
	                                        " Execution time"
	                                    )
	                                ),
	                                React.createElement(
	                                    "div",
	                                    { className: "panel-body" },
	                                    React.createElement(
	                                        "small",
	                                        null,
	                                        React.createElement(DatamonkeyTimersTable, { timers: self.state.analysis_results.timers, totalTime: "Total time" })
	                                    )
	                                )
	                            )
	                        )
	                    )
	                ),
	                React.createElement(
	                    "div",
	                    { className: "tab-pane active", id: "sites_tab" },
	                    React.createElement(
	                        "div",
	                        { className: "row" },
	                        React.createElement(
	                            "div",
	                            { id: "summary-div", className: "col-md-12" },
	                            React.createElement(SLACSites, {
	                                headers: self.state.analysis_results.MLE.headers,
	                                mle: datamonkey.helpers.map(datamonkey.helpers.filter(self.state.analysis_results.MLE.content, function (value, key) {
	                                    return _.has(value, "by-site");
	                                }), function (value, key) {
	                                    return value["by-site"];
	                                }),
	                                sample25: self.state.analysis_results["sample-2.5"],
	                                sampleMedian: self.state.analysis_results["sample-median"],
	                                sample975: self.state.analysis_results["sample-97.5"],
	                                partitionSites: self.state.analysis_results.partitions
	                            })
	                        )
	                    )
	                ),
	                React.createElement("div", { className: "tab-pane", id: "tree_tab" })
	            );
	        }
	        return null;
	    }
	
	});
	
	// Will need to make a call to this
	// omega distributions
	function render_slac(url, element) {
	    ReactDOM.render(React.createElement(SLAC, { url: url }), document.getElementById(element));
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(54), __webpack_require__(15), __webpack_require__(57)))

/***/ },

/***/ 238:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(_, d3) {'use strict';
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	var React = __webpack_require__(61);
	var datamonkey = __webpack_require__(53);
	
	var DatamonkeyTableRow = React.createClass({
	    displayName: 'DatamonkeyTableRow',
	
	    /**
	        A single table row
	    
	        *rowData* is an array of cells
	            each cell can be one of
	                1. string: simply render the text as shown
	                2. object: a polymorphic case; can be rendered directly (if the object is a valid react.js element)
	                   or via a transformation of the value associated with the key 'value'
	    
	                   supported keys
	                    2.1. 'value' : the value to use to generate cell context
	                    2.2. 'format' : the function (returning something react.js can render directly) that will be called
	                    to transform 'value' into the object to be rendered
	                    2.3. 'span' : colSpan attribute
	                    2.4. 'style': CSS style attributes (JSX specification, i.e. {margin-top: '1em'} and not a string)
	                    2.5. 'classes': CSS classes to apply to the cell
	                    2.6. 'abbr': wrap cell value in <abbr> tags
	    
	                3. array: directly render array elements in the cell (must be renderable to react.js; note that plain
	                text elements will be wrapped in "span" which is not allowed to nest in <th/td>
	    
	    
	        *header* is a bool indicating whether the header is a header row (th cells) or a regular row (td cells)
	    */
	
	    /*propTypes: {
	     rowData: React.PropTypes.arrayOf (React.PropTypes.oneOfType ([React.PropTypes.string,React.PropTypes.number,React.PropTypes.object,React.PropTypes.array])).isRequired,
	     header:  React.PropTypes.bool,
	    },*/
	
	    dm_compareTwoValues: function dm_compareTwoValues(a, b) {
	        /**
	            compare objects by iterating over keys
	        */
	
	        var myType = typeof a === 'undefined' ? 'undefined' : _typeof(a),
	            self = this;
	
	        if (myType == (typeof b === 'undefined' ? 'undefined' : _typeof(b))) {
	            if (myType == "string" || myType == "number") {
	                return a == b ? 1 : 0;
	            }
	
	            if (_.isArray(a) && _.isArray(b)) {
	
	                if (a.length != b.length) {
	                    return 0;
	                }
	
	                var not_compared = 0;
	                var result = _.every(a, function (c, i) {
	                    var comp = self.dm_compareTwoValues(c, b[i]);if (comp < 0) {
	                        not_compared = comp;return false;
	                    }return comp == 1;
	                });
	
	                if (not_compared < 0) {
	                    return not_compared;
	                }
	
	                return result ? 1 : 0;
	            }
	
	            return -2;
	        }
	        return -1;
	    },
	
	    dm_log100times: _.before(100, function (v) {
	        console.log(v);
	        return 0;
	    }),
	
	    shouldComponentUpdate: function shouldComponentUpdate(nextProps) {
	
	        var self = this;
	
	        if (this.props.header !== nextProps.header) {
	            return true;
	        }
	
	        var result = _.some(this.props.rowData, function (value, index) {
	            /** TO DO
	                check for format and other field equality
	            */
	            if (value === nextProps.rowData[index]) {
	                return false;
	            }
	
	            var compare = self.dm_compareTwoValues(value, nextProps.rowData[index]);
	            if (compare >= 0) {
	                return compare == 0;
	            }
	
	            if (compare == -2) {
	                if (_.has(value, "value") && _.has(nextProps.rowData[index], "value")) {
	                    return self.dm_compareTwoValues(value.value, nextProps.rowData[index].value) != 1;
	                }
	            }
	
	            return true;
	        });
	
	        if (result) {
	            this.dm_log100times(["Old", this.props.rowData, "New", nextProps.rowData]);
	        }
	
	        return result;
	    },
	
	    render: function render() {
	        return React.createElement(
	            'tr',
	            null,
	            this.props.rowData.map(_.bind(function (cell, index) {
	
	                var value = _.has(cell, "value") ? cell.value : cell;
	
	                if (_.isArray(value)) {
	                    if (!_.has(cell, "format")) {
	                        return value;
	                    }
	                } else {
	                    if (_.isObject(value)) {
	                        if (!React.isValidElement(value)) {
	                            return null;
	                        }
	                    }
	                }
	
	                if (_.has(cell, "format")) {
	                    value = cell.format(value);
	                }
	
	                if (_.has(cell, "abbr")) {
	                    value = React.createElement(
	                        'abbr',
	                        { title: cell.abbr },
	                        value
	                    );
	                }
	
	                var cellProps = { key: index };
	
	                if (_.has(cell, "span")) {
	                    cellProps["colSpan"] = cell.span;
	                }
	
	                if (_.has(cell, "style")) {
	                    cellProps["style"] = cell.style;
	                }
	
	                if (_.has(cell, "classes")) {
	                    cellProps["className"] = cell.classes;
	                }
	
	                return React.createElement(this.props.header ? "th" : "td", cellProps, value);
	            }, this))
	        );
	    }
	});
	
	var DatamonkeyTable = React.createClass({
	    displayName: 'DatamonkeyTable',
	
	    /**
	        A table composed of rows
	            *headerData* -- an array of cells (see DatamonkeyTableRow) to render as the header
	            *bodyData* -- an array of arrays of cells (rows) to render
	            *classes* -- CSS classes to apply to the table element
	    */
	
	    /*propTypes: {
	        headerData: React.PropTypes.array,
	        bodyData: React.PropTypes.arrayOf (React.PropTypes.array),
	    },*/
	
	    getDefaultProps: function getDefaultProps() {
	        return { classes: "table table-condensed table-hover",
	            rowHash: null,
	            sortableColumns: new Object(null),
	            initialSort: null
	        };
	    },
	
	    getInitialState: function getInitialState() {
	        return { sortedOn: this.props.initialSort };
	    },
	
	    render: function render() {
	        var children = [];
	
	        if (this.props.headerData) {
	            if (_.isArray(this.props.headerData[0])) {
	                // multiple rows
	                children.push(React.createElement(
	                    'thead',
	                    { key: 0 },
	                    _.map(this.props.headerData, function (row, index) {
	                        return React.createElement(DatamonkeyTableRow, { rowData: row, header: true, key: index });
	                    })
	                ));
	            } else {
	                children.push(React.createElement(
	                    'thead',
	                    { key: 0 },
	                    React.createElement(DatamonkeyTableRow, { rowData: this.props.headerData, header: true })
	                ));
	            }
	        }
	
	        children.push(React.createElement("tbody", { key: 1 }, _.map(this.props.bodyData, _.bind(function (componentData, index) {
	            return React.createElement(DatamonkeyTableRow, { rowData: componentData, key: this.props.rowHash ? this.props.rowHash(componentData) : index, header: false });
	        }, this))));
	
	        return React.createElement("table", { className: this.props.classes }, children);
	    }
	});
	
	var DatamonkeyRateDistributionTable = React.createClass({
	    displayName: 'DatamonkeyRateDistributionTable',
	
	
	    /** render a rate distribution table from JSON formatted like this
	    {
	         "non-synonymous/synonymous rate ratio for *background*":[ // name of distribution
	          [0.1701428265961598, 1] // distribution points (rate, weight)
	          ],
	         "non-synonymous/synonymous rate ratio for *test*":[
	          [0.1452686330406915, 1]
	          ]
	    }
	     */
	
	    propTypes: {
	        distribution: React.PropTypes.object.isRequired
	    },
	
	    dm_formatterRate: d3.format(".3r"),
	    dm_formatterProp: d3.format(".3p"),
	
	    dm_createDistributionTable: function dm_createDistributionTable(jsonRates) {
	        var rowData = [];
	        var self = this;
	        _.each(jsonRates, function (value, key) {
	            rowData.push([{ value: key, span: 3, classes: "info" }]);
	            _.each(value, function (rate, index) {
	                rowData.push([{ value: rate[1], format: self.dm_formatterProp }, '@', { value: rate[0], format: self.dm_formatterRate }]);
	            });
	        });
	        return rowData;
	    },
	
	    render: function render() {
	        return React.createElement(DatamonkeyTable, { bodyData: this.dm_createDistributionTable(this.props.distribution), classes: "table table-condensed" });
	    }
	
	});
	
	var DatamonkeyPartitionTable = React.createClass({
	    displayName: 'DatamonkeyPartitionTable',
	
	
	    dm_formatterFloat: d3.format(".3r"),
	    dm_formatterProp: d3.format(".3p"),
	
	    propTypes: {
	        trees: React.PropTypes.object.isRequired,
	        partitions: React.PropTypes.object.isRequired,
	        branchAttributes: React.PropTypes.object.isRequired,
	        siteResults: React.PropTypes.object.isRequired,
	        accessorNegative: React.PropTypes.func.isRequired,
	        accessorPositive: React.PropTypes.func.isRequired,
	        pValue: React.PropTypes.number.isRequired
	    },
	
	    dm_computePartitionInformation: function dm_computePartitionInformation(trees, partitions, attributes, pValue) {
	
	        var partitionKeys = _.sortBy(_.keys(partitions), function (v) {
	            return v;
	        }),
	            matchingKey = null,
	            self = this;
	
	        var extractBranchLength = this.props.extractOn || _.find(attributes.attributes, function (value, key) {
	            matchingKey = key;return value["attribute type"] == "branch length";
	        });
	        if (matchingKey) {
	            extractBranchLength = matchingKey;
	        }
	
	        return _.map(partitionKeys, function (key, index) {
	            var treeBranches = trees.tested[key],
	                tested = {};
	
	            _.each(treeBranches, function (value, key) {
	                if (value == "test") tested[key] = 1;
	            });
	
	            var testedLength = extractBranchLength ? datamonkey.helpers.sum(attributes[key], function (v, k) {
	                if (tested[k.toUpperCase()]) {
	                    return v[extractBranchLength];
	                }return 0;
	            }) : 0;
	            var totalLength = extractBranchLength ? datamonkey.helpers.sum(attributes[key], function (v) {
	                return v[extractBranchLength] || 0;
	            }) : 0; // || 0 is to resolve root node missing length
	
	
	            return _.map([index + 1, // 1-based partition index
	            partitions[key].coverage[0].length, // number of sites in the partition
	            _.size(tested), // tested branches
	            _.keys(treeBranches).length, // total branches
	            testedLength, testedLength / totalLength, totalLength, _.filter(self.props.accessorPositive(self.props.siteResults, key), function (p) {
	                return p <= pValue;
	            }).length, _.filter(self.props.accessorNegative(self.props.siteResults, key), function (p) {
	                return p <= pValue;
	            }).length], function (cell, index) {
	                if (index > 1) {
	                    var attributedCell = { value: cell,
	                        style: { textAlign: 'center' } };
	
	                    if (index == 4 || index == 6) {
	                        _.extend(attributedCell, { 'format': self.dm_formatterFloat });
	                    }
	                    if (index == 5) {
	                        _.extend(attributedCell, { 'format': self.dm_formatterProp });
	                    }
	
	                    return attributedCell;
	                }
	                return cell;
	            });
	        });
	    },
	
	    dm_makeHeaderRow: function dm_makeHeaderRow(pValue) {
	        return [_.map(["Partition", "Sites", "Branches", "Branch Length", "Selected at p" + String.fromCharCode(parseInt("2264", 16)) + pValue], function (d, i) {
	            return _.extend({ value: d, style: { borderBottom: 0, textAlign: i > 1 ? 'center' : 'left' } }, i > 1 ? { 'span': i == 3 ? 3 : 2 } : {});
	        }), _.map(["", "", "Tested", "Total", "Tested", "% of total", "Total", "Positive", "Negative"], function (d, i) {
	            return { value: d, style: { borderTop: 0, textAlign: i > 1 ? 'center' : 'left' } };
	        })];
	    },
	
	    getInitialState: function getInitialState() {
	        return {
	            header: this.dm_makeHeaderRow(this.props.pValue),
	            rows: this.dm_computePartitionInformation(this.props.trees, this.props.partitions, this.props.branchAttributes, this.props.pValue)
	        };
	    },
	
	    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	        this.setState({
	            header: this.dm_makeHeaderRow(nextProps.pValue),
	            rows: this.dm_computePartitionInformation(nextProps.trees, nextProps.partitions, nextProps.branchAttributes, nextProps.pValue)
	        });
	    },
	
	    render: function render() {
	        return React.createElement(
	            'div',
	            { className: 'table-responsive' },
	            React.createElement(DatamonkeyTable, { headerData: this.state.header, bodyData: this.state.rows })
	        );
	    }
	});
	
	var DatamonkeyModelTable = React.createClass({
	    displayName: 'DatamonkeyModelTable',
	
	
	    /** render a model fit table from a JSON object with entries like this
	            "Global MG94xREV":{ // model name
	               "log likelihood":-5453.527975908821,
	               "parameters":131,
	               "AIC-c":11172.05569160427,
	               "rate distributions":{
	                 "non-synonymous/synonymous rate ratio for *background*":[
	                  [0.1701428265961598, 1]
	                  ],
	                 "non-synonymous/synonymous rate ratio for *test*":[
	                  [0.1452686330406915, 1]
	                  ]
	                },
	               "display order":0
	              }
	       dm_supportedColumns controls which keys from model specification will be consumed;
	          * 'value' is the cell specification to be consumed by DatamonkeyTableRow
	          * 'order' is the column order in the resulting table (relative; doesn't have to be sequential)
	          * 'display_format' is a formatting function for cell entries
	          * 'transform' is a data trasformation function for cell entries
	     */
	
	    dm_numberFormatter: d3.format(".2f"),
	
	    dm_supportedColumns: { 'log likelihood': { order: 2,
	            value: { "value": "log L", "abbr": "log likelihood" },
	            display_format: d3.format(".2f") },
	        'parameters': { order: 3,
	            value: "Parameters" },
	        'AIC-c': { order: 1,
	            value: { value: React.createElement('span', null, ['AIC', React.createElement(
	                    'sub',
	                    { key: '0' },
	                    'C'
	                )]),
	                abbr: "Small-sample corrected Akaike Information Score" },
	            display_format: d3.format(".2f") },
	        'rate distributions': { order: 4,
	            value: "Rate distributions",
	            transform: function transform(value) {
	                return React.createElement(DatamonkeyRateDistributionTable, { distribution: value });
	            } }
	    },
	
	    propTypes: {
	        fits: React.PropTypes.object.isRequired
	    },
	
	    getDefaultProps: function getDefaultProps() {
	        return {
	            orderOn: "display order"
	        };
	    },
	
	    dm_extractFitsTable: function dm_extractFitsTable(jsonTable) {
	        var modelList = [];
	        var columnMap = null;
	        var columnMapIterator = [];
	        var valueFormat = {};
	        var valueTransform = {};
	        var rowData = [];
	        var self = this;
	
	        _.each(jsonTable, function (value, key) {
	            if (!columnMap) {
	                columnMap = {};
	                _.each(value, function (cellValue, cellName) {
	                    if (self.dm_supportedColumns[cellName]) {
	                        columnMap[cellName] = self.dm_supportedColumns[cellName];
	                        columnMapIterator[columnMap[cellName].order] = cellName;
	                        valueFormat[cellName] = self.dm_supportedColumns[cellName]["display_format"];
	                        if (_.isFunction(self.dm_supportedColumns[cellName]["transform"])) {
	                            valueTransform[cellName] = self.dm_supportedColumns[cellName]["transform"];
	                        }
	                    }
	                });
	                columnMapIterator = _.filter(columnMapIterator, function (v) {
	                    return v;
	                });
	            }
	
	            var thisRow = [{ value: key, style: { fontVariant: "small-caps" } }];
	
	            _.each(columnMapIterator, function (tag) {
	
	                var myValue = valueTransform[tag] ? valueTransform[tag](value[tag]) : value[tag];
	
	                if (valueFormat[tag]) {
	                    thisRow.push({ 'value': myValue, 'format': valueFormat[tag] });
	                } else {
	                    thisRow.push(myValue);
	                }
	            });
	
	            rowData.push([thisRow, _.isNumber(value[self.props.orderOn]) ? value[self.props.orderOn] : rowData.length]);
	        });
	
	        return { 'data': _.map(_.sortBy(rowData, function (value) {
	                return value[1];
	            }), function (r) {
	                return r[0];
	            }),
	            'columns': _.map(columnMapIterator, function (tag) {
	                return columnMap[tag].value;
	            }) };
	    },
	
	    dm_makeHeaderRow: function dm_makeHeaderRow(columnMap) {
	        var headerRow = ['Model'];
	        _.each(columnMap, function (v) {
	            headerRow.push(v);
	        });
	        return headerRow;
	    },
	
	    getInitialState: function getInitialState() {
	
	        var tableInfo = this.dm_extractFitsTable(this.props.fits);
	
	        return {
	            header: this.dm_makeHeaderRow(tableInfo.columns),
	            rows: tableInfo.data,
	            caption: null
	        };
	    },
	
	    render: function render() {
	        return React.createElement(
	            'div',
	            { className: 'table-responsive' },
	            React.createElement(DatamonkeyTable, { headerData: this.state.header, bodyData: this.state.rows })
	        );
	    }
	});
	
	var DatamonkeyTimersTable = React.createClass({
	    displayName: 'DatamonkeyTimersTable',
	
	
	    dm_percentageFormatter: d3.format(".2%"),
	
	    propTypes: {
	        timers: React.PropTypes.object.isRequired
	    },
	
	    dm_formatSeconds: function dm_formatSeconds(seconds) {
	
	        var fields = [~~(seconds / 3600), ~~(seconds % 3600 / 60), seconds % 60];
	
	        return _.map(fields, function (d) {
	            return d < 10 ? "0" + d : "" + d;
	        }).join(':');
	    },
	
	    dm_extractTimerTable: function dm_extractTimerTable(jsonTable) {
	        var totalTime = 0.,
	            formattedRows = _.map(jsonTable, _.bind(function (value, key) {
	            if (this.props.totalTime) {
	                if (key == this.props.totalTime) {
	                    totalTime = value['timer'];
	                }
	            } else {
	                totalTime += value['timer'];
	            }
	            return [key, value['timer'], value['order']];
	        }, this));
	
	        formattedRows = _.sortBy(formattedRows, function (row) {
	            return row[2];
	        });
	
	        formattedRows = _.map(formattedRows, _.bind(function (row) {
	            var fraction = null;
	            if (this.props.totalTime === null || this.props.totalTime != row[0]) {
	                row[2] = { "value": row[1] / totalTime, "format": this.dm_percentageFormatter };
	            } else {
	                row[2] = "";
	            }
	            row[1] = this.dm_formatSeconds(row[1]);
	            return row;
	        }, this));
	
	        return formattedRows;
	    },
	
	    dm_makeHeaderRow: function dm_makeHeaderRow() {
	        return ['Task', 'Time', '%'];
	    },
	
	    getInitialState: function getInitialState() {
	
	        return {
	            header: this.dm_makeHeaderRow(),
	            rows: this.dm_extractTimerTable(this.props.timers),
	            caption: null
	        };
	    },
	
	    render: function render() {
	        return React.createElement(DatamonkeyTable, { headerData: this.state.header, bodyData: this.state.rows });
	    }
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(57), __webpack_require__(54)))

/***/ },

/***/ 239:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(d3, _) {'use strict';
	
	var React = __webpack_require__(61);
	var datamonkey = __webpack_require__(53);
	
	var SLACSites = React.createClass({
	    displayName: 'SLACSites',
	
	    propTypes: {
	        headers: React.PropTypes.arrayOf(React.PropTypes.arrayOf(React.PropTypes.string)).isRequired,
	        mle: React.PropTypes.object.isRequired,
	        sample25: React.PropTypes.object,
	        sampleMedian: React.PropTypes.object,
	        sample975: React.PropTypes.object,
	        initialAmbigHandling: React.PropTypes.string.isRequired,
	        partitionSites: React.PropTypes.object.isRequired
	    },
	
	    getInitialState: function getInitialState() {
	        var canDoCI = this.props.sample25 && this.props.sampleMedian && this.props.sample975;
	
	        return {
	
	            ambigOptions: this.dm_AmbigOptions(this.props),
	            ambigHandling: this.props.initialAmbigHandling,
	            filters: new Object(null),
	            showIntervals: canDoCI,
	            hasCI: canDoCI
	        };
	    },
	
	    getDefaultProps: function getDefaultProps() {
	
	        return {
	            sample25: null,
	            sampleMedian: null,
	            sample975: null,
	            initialAmbigHandling: "RESOLVED"
	        };
	    },
	
	    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	        this.setState({
	
	            ambigOptions: this.dm_AmbigOptions(nextProps),
	            ambigHandling: nextProps.initialAmbigHandling
	        });
	    },
	
	    dm_formatNumber: d3.format(".3r"),
	    dm_formatNumberShort: d3.format(".2r"),
	
	    dm_log10times: _.before(10, function (v) {
	        console.log(v);
	        return 0;
	    }),
	
	    dm_formatInterval: function dm_formatInterval(values) {
	        //this.dm_log10times (values);
	
	        return this.dm_formatNumber(values[0]) + " / " + this.dm_formatNumber(values[2]) + " [" + this.dm_formatNumber(values[1]) + " : " + this.dm_formatNumber(values[3]) + "]";
	    },
	
	    dm_AmbigOptions: function dm_AmbigOptions(theseProps) {
	        return _.keys(theseProps.mle[0]);
	    },
	
	    dm_changeAmbig: function dm_changeAmbig(event) {
	
	        this.setState({
	            ambigHandling: event.target.value
	        });
	    },
	
	    dm_toggleIntervals: function dm_toggleIntervals(event) {
	        this.setState({
	            showIntervals: !this.state.showIntervals
	        });
	    },
	
	    dm_toggleVariableFilter: function dm_toggleVariableFilter(event) {
	
	        var filterState = new Object(null);
	        _.extend(filterState, this.state.filters);
	        filterState["variable"] = this.state.filters["variable"] == "on" ? "off" : "on";
	        this.setState({ filters: filterState });
	    },
	
	    dm_makeFilterFunction: function dm_makeFilterFunction() {
	
	        var filterFunction = null;
	
	        _.each(this.state.filters, function (value, key) {
	            var composeFunction = null;
	
	            switch (key) {
	                case "variable":
	                    {
	                        if (value == "on") {
	                            composeFunction = function composeFunction(f, partitionIndex, index, site, siteData) {
	                                return (!f || f(partitionIndex, index, site, siteData)) && siteData[2] + siteData[3] > 0;
	                            };
	                        }
	                        break;
	                    }
	            }
	
	            if (composeFunction) {
	                filterFunction = _.wrap(filterFunction, composeFunction);
	            }
	        });
	
	        return filterFunction;
	    },
	
	    dm_makeHeaderRow: function dm_makeHeaderRow() {
	
	        var headers = ['Partition', 'Site'],
	            doCI = this.state.showIntervals;
	
	        if (doCI) {
	            var secondRow = ['', ''];
	
	            _.each(this.props.headers, function (value) {
	                headers.push({ value: value[0], abbr: value[1], span: 4, style: { textAlign: 'center' } });
	                secondRow.push('MLE');
	                secondRow.push('Med');
	                secondRow.push('2.5%');
	                secondRow.push('97.5%');
	            });
	            return [headers, secondRow];
	        } else {
	
	            _.each(this.props.headers, function (value) {
	                headers.push({ value: value[0], abbr: value[1] });
	            });
	        }
	        return headers;
	    },
	
	    dm_makeDataRows: function dm_makeDataRows(filter) {
	
	        var rows = [],
	            partitionCount = datamonkey.helpers.countPartitionsJSON(this.props.partitionSites),
	            partitionIndex = 0,
	            self = this,
	            doCI = this.state.showIntervals;
	
	        while (partitionIndex < partitionCount) {
	
	            _.each(self.props.partitionSites[partitionIndex].coverage[0], function (site, index) {
	                var siteData = self.props.mle[partitionIndex][self.state.ambigHandling][index];
	                if (!filter || filter(partitionIndex, index, site, siteData)) {
	                    var thisRow = [partitionIndex + 1, site + 1];
	                    //secondRow = doCI ? ['',''] : null;
	
	                    _.each(siteData, function (estimate, colIndex) {
	
	                        if (doCI) {
	                            thisRow.push({ value: estimate, format: self.dm_formatNumber });
	                            thisRow.push({ value: self.props.sample25[partitionIndex][self.state.ambigHandling][index][colIndex], format: self.dm_formatNumberShort });
	                            thisRow.push({ value: self.props.sampleMedian[partitionIndex][self.state.ambigHandling][index][colIndex], format: self.dm_formatNumberShort });
	                            thisRow.push({ value: self.props.sample975[partitionIndex][self.state.ambigHandling][index][colIndex], format: self.dm_formatNumberShort });
	
	                            /*thisRow.push ({value: [estimate, self.props.sample25[partitionIndex][self.state.ambigHandling][index][colIndex],
	                                                             self.props.sampleMedian[partitionIndex][self.state.ambigHandling][index][colIndex],
	                                                             self.props.sample975[partitionIndex][self.state.ambigHandling][index][colIndex]],
	                                           format: self.dm_formatInterval,
	                                            }); */
	                        } else {
	                            thisRow.push({ value: estimate, format: self.dm_formatNumber });
	                        }
	                    });
	                    rows.push(thisRow);
	                    //if (secondRow) {
	                    //    rows.push (secondRow);
	                    //}
	                }
	            });
	
	            partitionIndex++;
	        }
	
	        return rows;
	    },
	
	    render: function render() {
	
	        var self = this;
	
	        var result = React.createElement(
	            'div',
	            { className: 'table-responsive' },
	            React.createElement(
	                'form',
	                { className: 'form-inline navbar-form navbar-left' },
	                React.createElement(
	                    'div',
	                    { className: 'form-group' },
	                    React.createElement(
	                        'div',
	                        { className: 'btn-group' },
	                        React.createElement(
	                            'button',
	                            { className: 'btn btn-default btn-sm dropdown-toggle', type: 'button', 'data-toggle': 'dropdown', 'aria-haspopup': 'true', 'aria-expanded': 'false' },
	                            'Display Options ',
	                            React.createElement('span', { className: 'caret' })
	                        ),
	                        React.createElement(
	                            'ul',
	                            { className: 'dropdown-menu' },
	                            React.createElement(
	                                'li',
	                                { key: 'variable' },
	                                React.createElement(
	                                    'div',
	                                    { className: 'checkbox' },
	                                    React.createElement('input', { type: 'checkbox', checked: self.state.filters["variable"] == "on" ? true : false, defaultChecked: self.state.filters["variable"] == "on" ? true : false, onChange: self.dm_toggleVariableFilter }),
	                                    ' Variable sites only'
	                                )
	                            ),
	                            self.state.hasCI ? React.createElement(
	                                'li',
	                                { key: 'intervals' },
	                                React.createElement(
	                                    'div',
	                                    { className: 'checkbox' },
	                                    React.createElement('input', { type: 'checkbox', checked: self.state.showIntervals, defaultChecked: self.state.showIntervals, onChange: self.dm_toggleIntervals }),
	                                    ' Show sampling confidence intervals'
	                                )
	                            ) : null
	                        )
	                    ),
	                    React.createElement(
	                        'div',
	                        { className: 'input-group' },
	                        React.createElement(
	                            'div',
	                            { className: 'input-group-addon' },
	                            'Ambiguities are '
	                        ),
	                        React.createElement(
	                            'select',
	                            { className: 'form-control input-sm', defaultValue: self.state.ambigHandling, onChange: self.dm_changeAmbig },
	                            _.map(this.state.ambigOptions, function (value, index) {
	                                return React.createElement(
	                                    'option',
	                                    { key: index, value: value },
	                                    value
	                                );
	                            })
	                        )
	                    )
	                )
	            ),
	            React.createElement(DatamonkeyTable, { headerData: this.dm_makeHeaderRow(), bodyData: this.dm_makeDataRows(this.dm_makeFilterFunction()) })
	        );
	
	        return result;
	    }
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(54), __webpack_require__(57)))

/***/ },

/***/ 240:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(_, d3) {'use strict';
	
	var React = __webpack_require__(61);
	var datamonkey = __webpack_require__(53);
	
	var SLACBanner = React.createClass({
	  displayName: 'SLACBanner',
	
	
	  dm_countSites: function dm_countSites(json, cutoff) {
	
	    var result = { all: 0,
	      positive: 0,
	      negative: 0 };
	
	    result.all = datamonkey.helpers.countSitesFromPartitionsJSON(json);
	
	    result.positive = datamonkey.helpers.sum(json["MLE"]["content"], function (partition) {
	      return _.reduce(partition["by-site"]["RESOLVED"], function (sum, row) {
	        return sum + (row[8] <= cutoff ? 1 : 0);
	      }, 0);
	    });
	
	    result.negative = datamonkey.helpers.sum(json["MLE"]["content"], function (partition) {
	      return _.reduce(partition["by-site"]["RESOLVED"], function (sum, row) {
	        return sum + (row[9] <= cutoff ? 1 : 0);
	      }, 0);
	    });
	
	    return result;
	  },
	
	  dm_computeState: function dm_computeState(state, pvalue) {
	    return {
	      sites: this.dm_countSites(state, pvalue)
	    };
	  },
	
	  dm_formatP: d3.format(".3f"),
	
	  getInitialState: function getInitialState() {
	    return this.dm_computeState(this.props.analysis_results, this.props.pValue);
	  },
	
	  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	    this.setState(this.dm_computeState(nextProps.analysis_results, nextProps.pValue));
	  },
	
	  render: function render() {
	
	    return React.createElement(
	      'div',
	      { className: 'panel panel-primary' },
	      React.createElement(
	        'div',
	        { className: 'panel-heading' },
	        React.createElement(
	          'h3',
	          { className: 'panel-title' },
	          React.createElement(
	            'abbr',
	            { title: 'Single Likelihood Ancestor Counting' },
	            'SLAC'
	          ),
	          ' analysis summary'
	        )
	      ),
	      React.createElement(
	        'div',
	        { className: 'panel-body' },
	        React.createElement(
	          'span',
	          { className: 'lead' },
	          'Evidence',
	          React.createElement(
	            'sup',
	            null,
	            '\u2020'
	          ),
	          ' of pervasive ',
	          React.createElement(
	            'span',
	            { className: 'hyphy-red' },
	            'diversifying'
	          ),
	          ' / ',
	          React.createElement(
	            'span',
	            { className: 'hyphy-navy' },
	            'purifying'
	          ),
	          ' selection was found at',
	          React.createElement(
	            'strong',
	            { className: 'hyphy-red' },
	            ' ',
	            this.state.sites.positive
	          ),
	          ' / ',
	          React.createElement(
	            'strong',
	            { className: 'hyphy-navy' },
	            this.state.sites.negative
	          ),
	          ' sites among ',
	          this.state.sites.all,
	          ' tested sites'
	        ),
	        React.createElement(
	          'div',
	          { style: { marginBottom: '0em' } },
	          React.createElement(
	            'small',
	            null,
	            React.createElement(
	              'sup',
	              null,
	              '\u2020'
	            ),
	            'Extended binomial test, p \u2264 ',
	            this.dm_formatP(this.props.pValue),
	            React.createElement(
	              'div',
	              { className: 'dropdown hidden-print', style: { display: 'inline', marginLeft: '0.25em' } },
	              React.createElement(
	                'button',
	                { id: 'dm.pvalue.slider', type: 'button', className: 'btn btn-primary btn-xs dropdown-toggle', 'data-toggle': 'dropdown', 'aria-haspopup': 'true', 'aria-expanded': 'false' },
	                React.createElement('span', { className: 'caret' })
	              ),
	              React.createElement(
	                'ul',
	                { className: 'dropdown-menu', 'aria-labelledby': 'dm.pvalue.slider' },
	                React.createElement(
	                  'li',
	                  null,
	                  React.createElement(
	                    'a',
	                    { href: '#' },
	                    React.createElement('input', { type: 'range', min: '0', max: '1', value: this.props.pValue, step: '0.01', onChange: this.props.pAdjuster })
	                  )
	                )
	              )
	            ),
	            React.createElement(
	              'emph',
	              null,
	              ' not'
	            ),
	            ' corrected for multiple testing; ambiguous characters resolved to minimize substitution counts.',
	            React.createElement('br', null),
	            React.createElement('i', { className: 'fa fa-exclamation-circle' }),
	            ' Please cite ',
	            React.createElement(
	              'a',
	              { href: 'http://www.ncbi.nlm.nih.gov/pubmed/15703242', target: '_blank' },
	              'PMID 15703242'
	            ),
	            ' if you use this result in a publication, presentation, or other scientific work.'
	          )
	        )
	      )
	    );
	  }
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(57), __webpack_require__(54)))

/***/ },

/***/ 262:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },

/***/ 264:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;//     Underscore.js 1.8.3
	//     http://underscorejs.org
	//     (c) 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	//     Underscore may be freely distributed under the MIT license.
	
	(function() {
	
	  // Baseline setup
	  // --------------
	
	  // Establish the root object, `window` in the browser, or `exports` on the server.
	  var root = this;
	
	  // Save the previous value of the `_` variable.
	  var previousUnderscore = root._;
	
	  // Save bytes in the minified (but not gzipped) version:
	  var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype;
	
	  // Create quick reference variables for speed access to core prototypes.
	  var
	    push             = ArrayProto.push,
	    slice            = ArrayProto.slice,
	    toString         = ObjProto.toString,
	    hasOwnProperty   = ObjProto.hasOwnProperty;
	
	  // All **ECMAScript 5** native function implementations that we hope to use
	  // are declared here.
	  var
	    nativeIsArray      = Array.isArray,
	    nativeKeys         = Object.keys,
	    nativeBind         = FuncProto.bind,
	    nativeCreate       = Object.create;
	
	  // Naked function reference for surrogate-prototype-swapping.
	  var Ctor = function(){};
	
	  // Create a safe reference to the Underscore object for use below.
	  var _ = function(obj) {
	    if (obj instanceof _) return obj;
	    if (!(this instanceof _)) return new _(obj);
	    this._wrapped = obj;
	  };
	
	  // Export the Underscore object for **Node.js**, with
	  // backwards-compatibility for the old `require()` API. If we're in
	  // the browser, add `_` as a global object.
	  if (true) {
	    if (typeof module !== 'undefined' && module.exports) {
	      exports = module.exports = _;
	    }
	    exports._ = _;
	  } else {
	    root._ = _;
	  }
	
	  // Current version.
	  _.VERSION = '1.8.3';
	
	  // Internal function that returns an efficient (for current engines) version
	  // of the passed-in callback, to be repeatedly applied in other Underscore
	  // functions.
	  var optimizeCb = function(func, context, argCount) {
	    if (context === void 0) return func;
	    switch (argCount == null ? 3 : argCount) {
	      case 1: return function(value) {
	        return func.call(context, value);
	      };
	      case 2: return function(value, other) {
	        return func.call(context, value, other);
	      };
	      case 3: return function(value, index, collection) {
	        return func.call(context, value, index, collection);
	      };
	      case 4: return function(accumulator, value, index, collection) {
	        return func.call(context, accumulator, value, index, collection);
	      };
	    }
	    return function() {
	      return func.apply(context, arguments);
	    };
	  };
	
	  // A mostly-internal function to generate callbacks that can be applied
	  // to each element in a collection, returning the desired result — either
	  // identity, an arbitrary callback, a property matcher, or a property accessor.
	  var cb = function(value, context, argCount) {
	    if (value == null) return _.identity;
	    if (_.isFunction(value)) return optimizeCb(value, context, argCount);
	    if (_.isObject(value)) return _.matcher(value);
	    return _.property(value);
	  };
	  _.iteratee = function(value, context) {
	    return cb(value, context, Infinity);
	  };
	
	  // An internal function for creating assigner functions.
	  var createAssigner = function(keysFunc, undefinedOnly) {
	    return function(obj) {
	      var length = arguments.length;
	      if (length < 2 || obj == null) return obj;
	      for (var index = 1; index < length; index++) {
	        var source = arguments[index],
	            keys = keysFunc(source),
	            l = keys.length;
	        for (var i = 0; i < l; i++) {
	          var key = keys[i];
	          if (!undefinedOnly || obj[key] === void 0) obj[key] = source[key];
	        }
	      }
	      return obj;
	    };
	  };
	
	  // An internal function for creating a new object that inherits from another.
	  var baseCreate = function(prototype) {
	    if (!_.isObject(prototype)) return {};
	    if (nativeCreate) return nativeCreate(prototype);
	    Ctor.prototype = prototype;
	    var result = new Ctor;
	    Ctor.prototype = null;
	    return result;
	  };
	
	  var property = function(key) {
	    return function(obj) {
	      return obj == null ? void 0 : obj[key];
	    };
	  };
	
	  // Helper for collection methods to determine whether a collection
	  // should be iterated as an array or as an object
	  // Related: http://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength
	  // Avoids a very nasty iOS 8 JIT bug on ARM-64. #2094
	  var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;
	  var getLength = property('length');
	  var isArrayLike = function(collection) {
	    var length = getLength(collection);
	    return typeof length == 'number' && length >= 0 && length <= MAX_ARRAY_INDEX;
	  };
	
	  // Collection Functions
	  // --------------------
	
	  // The cornerstone, an `each` implementation, aka `forEach`.
	  // Handles raw objects in addition to array-likes. Treats all
	  // sparse array-likes as if they were dense.
	  _.each = _.forEach = function(obj, iteratee, context) {
	    iteratee = optimizeCb(iteratee, context);
	    var i, length;
	    if (isArrayLike(obj)) {
	      for (i = 0, length = obj.length; i < length; i++) {
	        iteratee(obj[i], i, obj);
	      }
	    } else {
	      var keys = _.keys(obj);
	      for (i = 0, length = keys.length; i < length; i++) {
	        iteratee(obj[keys[i]], keys[i], obj);
	      }
	    }
	    return obj;
	  };
	
	  // Return the results of applying the iteratee to each element.
	  _.map = _.collect = function(obj, iteratee, context) {
	    iteratee = cb(iteratee, context);
	    var keys = !isArrayLike(obj) && _.keys(obj),
	        length = (keys || obj).length,
	        results = Array(length);
	    for (var index = 0; index < length; index++) {
	      var currentKey = keys ? keys[index] : index;
	      results[index] = iteratee(obj[currentKey], currentKey, obj);
	    }
	    return results;
	  };
	
	  // Create a reducing function iterating left or right.
	  function createReduce(dir) {
	    // Optimized iterator function as using arguments.length
	    // in the main function will deoptimize the, see #1991.
	    function iterator(obj, iteratee, memo, keys, index, length) {
	      for (; index >= 0 && index < length; index += dir) {
	        var currentKey = keys ? keys[index] : index;
	        memo = iteratee(memo, obj[currentKey], currentKey, obj);
	      }
	      return memo;
	    }
	
	    return function(obj, iteratee, memo, context) {
	      iteratee = optimizeCb(iteratee, context, 4);
	      var keys = !isArrayLike(obj) && _.keys(obj),
	          length = (keys || obj).length,
	          index = dir > 0 ? 0 : length - 1;
	      // Determine the initial value if none is provided.
	      if (arguments.length < 3) {
	        memo = obj[keys ? keys[index] : index];
	        index += dir;
	      }
	      return iterator(obj, iteratee, memo, keys, index, length);
	    };
	  }
	
	  // **Reduce** builds up a single result from a list of values, aka `inject`,
	  // or `foldl`.
	  _.reduce = _.foldl = _.inject = createReduce(1);
	
	  // The right-associative version of reduce, also known as `foldr`.
	  _.reduceRight = _.foldr = createReduce(-1);
	
	  // Return the first value which passes a truth test. Aliased as `detect`.
	  _.find = _.detect = function(obj, predicate, context) {
	    var key;
	    if (isArrayLike(obj)) {
	      key = _.findIndex(obj, predicate, context);
	    } else {
	      key = _.findKey(obj, predicate, context);
	    }
	    if (key !== void 0 && key !== -1) return obj[key];
	  };
	
	  // Return all the elements that pass a truth test.
	  // Aliased as `select`.
	  _.filter = _.select = function(obj, predicate, context) {
	    var results = [];
	    predicate = cb(predicate, context);
	    _.each(obj, function(value, index, list) {
	      if (predicate(value, index, list)) results.push(value);
	    });
	    return results;
	  };
	
	  // Return all the elements for which a truth test fails.
	  _.reject = function(obj, predicate, context) {
	    return _.filter(obj, _.negate(cb(predicate)), context);
	  };
	
	  // Determine whether all of the elements match a truth test.
	  // Aliased as `all`.
	  _.every = _.all = function(obj, predicate, context) {
	    predicate = cb(predicate, context);
	    var keys = !isArrayLike(obj) && _.keys(obj),
	        length = (keys || obj).length;
	    for (var index = 0; index < length; index++) {
	      var currentKey = keys ? keys[index] : index;
	      if (!predicate(obj[currentKey], currentKey, obj)) return false;
	    }
	    return true;
	  };
	
	  // Determine if at least one element in the object matches a truth test.
	  // Aliased as `any`.
	  _.some = _.any = function(obj, predicate, context) {
	    predicate = cb(predicate, context);
	    var keys = !isArrayLike(obj) && _.keys(obj),
	        length = (keys || obj).length;
	    for (var index = 0; index < length; index++) {
	      var currentKey = keys ? keys[index] : index;
	      if (predicate(obj[currentKey], currentKey, obj)) return true;
	    }
	    return false;
	  };
	
	  // Determine if the array or object contains a given item (using `===`).
	  // Aliased as `includes` and `include`.
	  _.contains = _.includes = _.include = function(obj, item, fromIndex, guard) {
	    if (!isArrayLike(obj)) obj = _.values(obj);
	    if (typeof fromIndex != 'number' || guard) fromIndex = 0;
	    return _.indexOf(obj, item, fromIndex) >= 0;
	  };
	
	  // Invoke a method (with arguments) on every item in a collection.
	  _.invoke = function(obj, method) {
	    var args = slice.call(arguments, 2);
	    var isFunc = _.isFunction(method);
	    return _.map(obj, function(value) {
	      var func = isFunc ? method : value[method];
	      return func == null ? func : func.apply(value, args);
	    });
	  };
	
	  // Convenience version of a common use case of `map`: fetching a property.
	  _.pluck = function(obj, key) {
	    return _.map(obj, _.property(key));
	  };
	
	  // Convenience version of a common use case of `filter`: selecting only objects
	  // containing specific `key:value` pairs.
	  _.where = function(obj, attrs) {
	    return _.filter(obj, _.matcher(attrs));
	  };
	
	  // Convenience version of a common use case of `find`: getting the first object
	  // containing specific `key:value` pairs.
	  _.findWhere = function(obj, attrs) {
	    return _.find(obj, _.matcher(attrs));
	  };
	
	  // Return the maximum element (or element-based computation).
	  _.max = function(obj, iteratee, context) {
	    var result = -Infinity, lastComputed = -Infinity,
	        value, computed;
	    if (iteratee == null && obj != null) {
	      obj = isArrayLike(obj) ? obj : _.values(obj);
	      for (var i = 0, length = obj.length; i < length; i++) {
	        value = obj[i];
	        if (value > result) {
	          result = value;
	        }
	      }
	    } else {
	      iteratee = cb(iteratee, context);
	      _.each(obj, function(value, index, list) {
	        computed = iteratee(value, index, list);
	        if (computed > lastComputed || computed === -Infinity && result === -Infinity) {
	          result = value;
	          lastComputed = computed;
	        }
	      });
	    }
	    return result;
	  };
	
	  // Return the minimum element (or element-based computation).
	  _.min = function(obj, iteratee, context) {
	    var result = Infinity, lastComputed = Infinity,
	        value, computed;
	    if (iteratee == null && obj != null) {
	      obj = isArrayLike(obj) ? obj : _.values(obj);
	      for (var i = 0, length = obj.length; i < length; i++) {
	        value = obj[i];
	        if (value < result) {
	          result = value;
	        }
	      }
	    } else {
	      iteratee = cb(iteratee, context);
	      _.each(obj, function(value, index, list) {
	        computed = iteratee(value, index, list);
	        if (computed < lastComputed || computed === Infinity && result === Infinity) {
	          result = value;
	          lastComputed = computed;
	        }
	      });
	    }
	    return result;
	  };
	
	  // Shuffle a collection, using the modern version of the
	  // [Fisher-Yates shuffle](http://en.wikipedia.org/wiki/Fisher–Yates_shuffle).
	  _.shuffle = function(obj) {
	    var set = isArrayLike(obj) ? obj : _.values(obj);
	    var length = set.length;
	    var shuffled = Array(length);
	    for (var index = 0, rand; index < length; index++) {
	      rand = _.random(0, index);
	      if (rand !== index) shuffled[index] = shuffled[rand];
	      shuffled[rand] = set[index];
	    }
	    return shuffled;
	  };
	
	  // Sample **n** random values from a collection.
	  // If **n** is not specified, returns a single random element.
	  // The internal `guard` argument allows it to work with `map`.
	  _.sample = function(obj, n, guard) {
	    if (n == null || guard) {
	      if (!isArrayLike(obj)) obj = _.values(obj);
	      return obj[_.random(obj.length - 1)];
	    }
	    return _.shuffle(obj).slice(0, Math.max(0, n));
	  };
	
	  // Sort the object's values by a criterion produced by an iteratee.
	  _.sortBy = function(obj, iteratee, context) {
	    iteratee = cb(iteratee, context);
	    return _.pluck(_.map(obj, function(value, index, list) {
	      return {
	        value: value,
	        index: index,
	        criteria: iteratee(value, index, list)
	      };
	    }).sort(function(left, right) {
	      var a = left.criteria;
	      var b = right.criteria;
	      if (a !== b) {
	        if (a > b || a === void 0) return 1;
	        if (a < b || b === void 0) return -1;
	      }
	      return left.index - right.index;
	    }), 'value');
	  };
	
	  // An internal function used for aggregate "group by" operations.
	  var group = function(behavior) {
	    return function(obj, iteratee, context) {
	      var result = {};
	      iteratee = cb(iteratee, context);
	      _.each(obj, function(value, index) {
	        var key = iteratee(value, index, obj);
	        behavior(result, value, key);
	      });
	      return result;
	    };
	  };
	
	  // Groups the object's values by a criterion. Pass either a string attribute
	  // to group by, or a function that returns the criterion.
	  _.groupBy = group(function(result, value, key) {
	    if (_.has(result, key)) result[key].push(value); else result[key] = [value];
	  });
	
	  // Indexes the object's values by a criterion, similar to `groupBy`, but for
	  // when you know that your index values will be unique.
	  _.indexBy = group(function(result, value, key) {
	    result[key] = value;
	  });
	
	  // Counts instances of an object that group by a certain criterion. Pass
	  // either a string attribute to count by, or a function that returns the
	  // criterion.
	  _.countBy = group(function(result, value, key) {
	    if (_.has(result, key)) result[key]++; else result[key] = 1;
	  });
	
	  // Safely create a real, live array from anything iterable.
	  _.toArray = function(obj) {
	    if (!obj) return [];
	    if (_.isArray(obj)) return slice.call(obj);
	    if (isArrayLike(obj)) return _.map(obj, _.identity);
	    return _.values(obj);
	  };
	
	  // Return the number of elements in an object.
	  _.size = function(obj) {
	    if (obj == null) return 0;
	    return isArrayLike(obj) ? obj.length : _.keys(obj).length;
	  };
	
	  // Split a collection into two arrays: one whose elements all satisfy the given
	  // predicate, and one whose elements all do not satisfy the predicate.
	  _.partition = function(obj, predicate, context) {
	    predicate = cb(predicate, context);
	    var pass = [], fail = [];
	    _.each(obj, function(value, key, obj) {
	      (predicate(value, key, obj) ? pass : fail).push(value);
	    });
	    return [pass, fail];
	  };
	
	  // Array Functions
	  // ---------------
	
	  // Get the first element of an array. Passing **n** will return the first N
	  // values in the array. Aliased as `head` and `take`. The **guard** check
	  // allows it to work with `_.map`.
	  _.first = _.head = _.take = function(array, n, guard) {
	    if (array == null) return void 0;
	    if (n == null || guard) return array[0];
	    return _.initial(array, array.length - n);
	  };
	
	  // Returns everything but the last entry of the array. Especially useful on
	  // the arguments object. Passing **n** will return all the values in
	  // the array, excluding the last N.
	  _.initial = function(array, n, guard) {
	    return slice.call(array, 0, Math.max(0, array.length - (n == null || guard ? 1 : n)));
	  };
	
	  // Get the last element of an array. Passing **n** will return the last N
	  // values in the array.
	  _.last = function(array, n, guard) {
	    if (array == null) return void 0;
	    if (n == null || guard) return array[array.length - 1];
	    return _.rest(array, Math.max(0, array.length - n));
	  };
	
	  // Returns everything but the first entry of the array. Aliased as `tail` and `drop`.
	  // Especially useful on the arguments object. Passing an **n** will return
	  // the rest N values in the array.
	  _.rest = _.tail = _.drop = function(array, n, guard) {
	    return slice.call(array, n == null || guard ? 1 : n);
	  };
	
	  // Trim out all falsy values from an array.
	  _.compact = function(array) {
	    return _.filter(array, _.identity);
	  };
	
	  // Internal implementation of a recursive `flatten` function.
	  var flatten = function(input, shallow, strict, startIndex) {
	    var output = [], idx = 0;
	    for (var i = startIndex || 0, length = getLength(input); i < length; i++) {
	      var value = input[i];
	      if (isArrayLike(value) && (_.isArray(value) || _.isArguments(value))) {
	        //flatten current level of array or arguments object
	        if (!shallow) value = flatten(value, shallow, strict);
	        var j = 0, len = value.length;
	        output.length += len;
	        while (j < len) {
	          output[idx++] = value[j++];
	        }
	      } else if (!strict) {
	        output[idx++] = value;
	      }
	    }
	    return output;
	  };
	
	  // Flatten out an array, either recursively (by default), or just one level.
	  _.flatten = function(array, shallow) {
	    return flatten(array, shallow, false);
	  };
	
	  // Return a version of the array that does not contain the specified value(s).
	  _.without = function(array) {
	    return _.difference(array, slice.call(arguments, 1));
	  };
	
	  // Produce a duplicate-free version of the array. If the array has already
	  // been sorted, you have the option of using a faster algorithm.
	  // Aliased as `unique`.
	  _.uniq = _.unique = function(array, isSorted, iteratee, context) {
	    if (!_.isBoolean(isSorted)) {
	      context = iteratee;
	      iteratee = isSorted;
	      isSorted = false;
	    }
	    if (iteratee != null) iteratee = cb(iteratee, context);
	    var result = [];
	    var seen = [];
	    for (var i = 0, length = getLength(array); i < length; i++) {
	      var value = array[i],
	          computed = iteratee ? iteratee(value, i, array) : value;
	      if (isSorted) {
	        if (!i || seen !== computed) result.push(value);
	        seen = computed;
	      } else if (iteratee) {
	        if (!_.contains(seen, computed)) {
	          seen.push(computed);
	          result.push(value);
	        }
	      } else if (!_.contains(result, value)) {
	        result.push(value);
	      }
	    }
	    return result;
	  };
	
	  // Produce an array that contains the union: each distinct element from all of
	  // the passed-in arrays.
	  _.union = function() {
	    return _.uniq(flatten(arguments, true, true));
	  };
	
	  // Produce an array that contains every item shared between all the
	  // passed-in arrays.
	  _.intersection = function(array) {
	    var result = [];
	    var argsLength = arguments.length;
	    for (var i = 0, length = getLength(array); i < length; i++) {
	      var item = array[i];
	      if (_.contains(result, item)) continue;
	      for (var j = 1; j < argsLength; j++) {
	        if (!_.contains(arguments[j], item)) break;
	      }
	      if (j === argsLength) result.push(item);
	    }
	    return result;
	  };
	
	  // Take the difference between one array and a number of other arrays.
	  // Only the elements present in just the first array will remain.
	  _.difference = function(array) {
	    var rest = flatten(arguments, true, true, 1);
	    return _.filter(array, function(value){
	      return !_.contains(rest, value);
	    });
	  };
	
	  // Zip together multiple lists into a single array -- elements that share
	  // an index go together.
	  _.zip = function() {
	    return _.unzip(arguments);
	  };
	
	  // Complement of _.zip. Unzip accepts an array of arrays and groups
	  // each array's elements on shared indices
	  _.unzip = function(array) {
	    var length = array && _.max(array, getLength).length || 0;
	    var result = Array(length);
	
	    for (var index = 0; index < length; index++) {
	      result[index] = _.pluck(array, index);
	    }
	    return result;
	  };
	
	  // Converts lists into objects. Pass either a single array of `[key, value]`
	  // pairs, or two parallel arrays of the same length -- one of keys, and one of
	  // the corresponding values.
	  _.object = function(list, values) {
	    var result = {};
	    for (var i = 0, length = getLength(list); i < length; i++) {
	      if (values) {
	        result[list[i]] = values[i];
	      } else {
	        result[list[i][0]] = list[i][1];
	      }
	    }
	    return result;
	  };
	
	  // Generator function to create the findIndex and findLastIndex functions
	  function createPredicateIndexFinder(dir) {
	    return function(array, predicate, context) {
	      predicate = cb(predicate, context);
	      var length = getLength(array);
	      var index = dir > 0 ? 0 : length - 1;
	      for (; index >= 0 && index < length; index += dir) {
	        if (predicate(array[index], index, array)) return index;
	      }
	      return -1;
	    };
	  }
	
	  // Returns the first index on an array-like that passes a predicate test
	  _.findIndex = createPredicateIndexFinder(1);
	  _.findLastIndex = createPredicateIndexFinder(-1);
	
	  // Use a comparator function to figure out the smallest index at which
	  // an object should be inserted so as to maintain order. Uses binary search.
	  _.sortedIndex = function(array, obj, iteratee, context) {
	    iteratee = cb(iteratee, context, 1);
	    var value = iteratee(obj);
	    var low = 0, high = getLength(array);
	    while (low < high) {
	      var mid = Math.floor((low + high) / 2);
	      if (iteratee(array[mid]) < value) low = mid + 1; else high = mid;
	    }
	    return low;
	  };
	
	  // Generator function to create the indexOf and lastIndexOf functions
	  function createIndexFinder(dir, predicateFind, sortedIndex) {
	    return function(array, item, idx) {
	      var i = 0, length = getLength(array);
	      if (typeof idx == 'number') {
	        if (dir > 0) {
	            i = idx >= 0 ? idx : Math.max(idx + length, i);
	        } else {
	            length = idx >= 0 ? Math.min(idx + 1, length) : idx + length + 1;
	        }
	      } else if (sortedIndex && idx && length) {
	        idx = sortedIndex(array, item);
	        return array[idx] === item ? idx : -1;
	      }
	      if (item !== item) {
	        idx = predicateFind(slice.call(array, i, length), _.isNaN);
	        return idx >= 0 ? idx + i : -1;
	      }
	      for (idx = dir > 0 ? i : length - 1; idx >= 0 && idx < length; idx += dir) {
	        if (array[idx] === item) return idx;
	      }
	      return -1;
	    };
	  }
	
	  // Return the position of the first occurrence of an item in an array,
	  // or -1 if the item is not included in the array.
	  // If the array is large and already in sort order, pass `true`
	  // for **isSorted** to use binary search.
	  _.indexOf = createIndexFinder(1, _.findIndex, _.sortedIndex);
	  _.lastIndexOf = createIndexFinder(-1, _.findLastIndex);
	
	  // Generate an integer Array containing an arithmetic progression. A port of
	  // the native Python `range()` function. See
	  // [the Python documentation](http://docs.python.org/library/functions.html#range).
	  _.range = function(start, stop, step) {
	    if (stop == null) {
	      stop = start || 0;
	      start = 0;
	    }
	    step = step || 1;
	
	    var length = Math.max(Math.ceil((stop - start) / step), 0);
	    var range = Array(length);
	
	    for (var idx = 0; idx < length; idx++, start += step) {
	      range[idx] = start;
	    }
	
	    return range;
	  };
	
	  // Function (ahem) Functions
	  // ------------------
	
	  // Determines whether to execute a function as a constructor
	  // or a normal function with the provided arguments
	  var executeBound = function(sourceFunc, boundFunc, context, callingContext, args) {
	    if (!(callingContext instanceof boundFunc)) return sourceFunc.apply(context, args);
	    var self = baseCreate(sourceFunc.prototype);
	    var result = sourceFunc.apply(self, args);
	    if (_.isObject(result)) return result;
	    return self;
	  };
	
	  // Create a function bound to a given object (assigning `this`, and arguments,
	  // optionally). Delegates to **ECMAScript 5**'s native `Function.bind` if
	  // available.
	  _.bind = function(func, context) {
	    if (nativeBind && func.bind === nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
	    if (!_.isFunction(func)) throw new TypeError('Bind must be called on a function');
	    var args = slice.call(arguments, 2);
	    var bound = function() {
	      return executeBound(func, bound, context, this, args.concat(slice.call(arguments)));
	    };
	    return bound;
	  };
	
	  // Partially apply a function by creating a version that has had some of its
	  // arguments pre-filled, without changing its dynamic `this` context. _ acts
	  // as a placeholder, allowing any combination of arguments to be pre-filled.
	  _.partial = function(func) {
	    var boundArgs = slice.call(arguments, 1);
	    var bound = function() {
	      var position = 0, length = boundArgs.length;
	      var args = Array(length);
	      for (var i = 0; i < length; i++) {
	        args[i] = boundArgs[i] === _ ? arguments[position++] : boundArgs[i];
	      }
	      while (position < arguments.length) args.push(arguments[position++]);
	      return executeBound(func, bound, this, this, args);
	    };
	    return bound;
	  };
	
	  // Bind a number of an object's methods to that object. Remaining arguments
	  // are the method names to be bound. Useful for ensuring that all callbacks
	  // defined on an object belong to it.
	  _.bindAll = function(obj) {
	    var i, length = arguments.length, key;
	    if (length <= 1) throw new Error('bindAll must be passed function names');
	    for (i = 1; i < length; i++) {
	      key = arguments[i];
	      obj[key] = _.bind(obj[key], obj);
	    }
	    return obj;
	  };
	
	  // Memoize an expensive function by storing its results.
	  _.memoize = function(func, hasher) {
	    var memoize = function(key) {
	      var cache = memoize.cache;
	      var address = '' + (hasher ? hasher.apply(this, arguments) : key);
	      if (!_.has(cache, address)) cache[address] = func.apply(this, arguments);
	      return cache[address];
	    };
	    memoize.cache = {};
	    return memoize;
	  };
	
	  // Delays a function for the given number of milliseconds, and then calls
	  // it with the arguments supplied.
	  _.delay = function(func, wait) {
	    var args = slice.call(arguments, 2);
	    return setTimeout(function(){
	      return func.apply(null, args);
	    }, wait);
	  };
	
	  // Defers a function, scheduling it to run after the current call stack has
	  // cleared.
	  _.defer = _.partial(_.delay, _, 1);
	
	  // Returns a function, that, when invoked, will only be triggered at most once
	  // during a given window of time. Normally, the throttled function will run
	  // as much as it can, without ever going more than once per `wait` duration;
	  // but if you'd like to disable the execution on the leading edge, pass
	  // `{leading: false}`. To disable execution on the trailing edge, ditto.
	  _.throttle = function(func, wait, options) {
	    var context, args, result;
	    var timeout = null;
	    var previous = 0;
	    if (!options) options = {};
	    var later = function() {
	      previous = options.leading === false ? 0 : _.now();
	      timeout = null;
	      result = func.apply(context, args);
	      if (!timeout) context = args = null;
	    };
	    return function() {
	      var now = _.now();
	      if (!previous && options.leading === false) previous = now;
	      var remaining = wait - (now - previous);
	      context = this;
	      args = arguments;
	      if (remaining <= 0 || remaining > wait) {
	        if (timeout) {
	          clearTimeout(timeout);
	          timeout = null;
	        }
	        previous = now;
	        result = func.apply(context, args);
	        if (!timeout) context = args = null;
	      } else if (!timeout && options.trailing !== false) {
	        timeout = setTimeout(later, remaining);
	      }
	      return result;
	    };
	  };
	
	  // Returns a function, that, as long as it continues to be invoked, will not
	  // be triggered. The function will be called after it stops being called for
	  // N milliseconds. If `immediate` is passed, trigger the function on the
	  // leading edge, instead of the trailing.
	  _.debounce = function(func, wait, immediate) {
	    var timeout, args, context, timestamp, result;
	
	    var later = function() {
	      var last = _.now() - timestamp;
	
	      if (last < wait && last >= 0) {
	        timeout = setTimeout(later, wait - last);
	      } else {
	        timeout = null;
	        if (!immediate) {
	          result = func.apply(context, args);
	          if (!timeout) context = args = null;
	        }
	      }
	    };
	
	    return function() {
	      context = this;
	      args = arguments;
	      timestamp = _.now();
	      var callNow = immediate && !timeout;
	      if (!timeout) timeout = setTimeout(later, wait);
	      if (callNow) {
	        result = func.apply(context, args);
	        context = args = null;
	      }
	
	      return result;
	    };
	  };
	
	  // Returns the first function passed as an argument to the second,
	  // allowing you to adjust arguments, run code before and after, and
	  // conditionally execute the original function.
	  _.wrap = function(func, wrapper) {
	    return _.partial(wrapper, func);
	  };
	
	  // Returns a negated version of the passed-in predicate.
	  _.negate = function(predicate) {
	    return function() {
	      return !predicate.apply(this, arguments);
	    };
	  };
	
	  // Returns a function that is the composition of a list of functions, each
	  // consuming the return value of the function that follows.
	  _.compose = function() {
	    var args = arguments;
	    var start = args.length - 1;
	    return function() {
	      var i = start;
	      var result = args[start].apply(this, arguments);
	      while (i--) result = args[i].call(this, result);
	      return result;
	    };
	  };
	
	  // Returns a function that will only be executed on and after the Nth call.
	  _.after = function(times, func) {
	    return function() {
	      if (--times < 1) {
	        return func.apply(this, arguments);
	      }
	    };
	  };
	
	  // Returns a function that will only be executed up to (but not including) the Nth call.
	  _.before = function(times, func) {
	    var memo;
	    return function() {
	      if (--times > 0) {
	        memo = func.apply(this, arguments);
	      }
	      if (times <= 1) func = null;
	      return memo;
	    };
	  };
	
	  // Returns a function that will be executed at most one time, no matter how
	  // often you call it. Useful for lazy initialization.
	  _.once = _.partial(_.before, 2);
	
	  // Object Functions
	  // ----------------
	
	  // Keys in IE < 9 that won't be iterated by `for key in ...` and thus missed.
	  var hasEnumBug = !{toString: null}.propertyIsEnumerable('toString');
	  var nonEnumerableProps = ['valueOf', 'isPrototypeOf', 'toString',
	                      'propertyIsEnumerable', 'hasOwnProperty', 'toLocaleString'];
	
	  function collectNonEnumProps(obj, keys) {
	    var nonEnumIdx = nonEnumerableProps.length;
	    var constructor = obj.constructor;
	    var proto = (_.isFunction(constructor) && constructor.prototype) || ObjProto;
	
	    // Constructor is a special case.
	    var prop = 'constructor';
	    if (_.has(obj, prop) && !_.contains(keys, prop)) keys.push(prop);
	
	    while (nonEnumIdx--) {
	      prop = nonEnumerableProps[nonEnumIdx];
	      if (prop in obj && obj[prop] !== proto[prop] && !_.contains(keys, prop)) {
	        keys.push(prop);
	      }
	    }
	  }
	
	  // Retrieve the names of an object's own properties.
	  // Delegates to **ECMAScript 5**'s native `Object.keys`
	  _.keys = function(obj) {
	    if (!_.isObject(obj)) return [];
	    if (nativeKeys) return nativeKeys(obj);
	    var keys = [];
	    for (var key in obj) if (_.has(obj, key)) keys.push(key);
	    // Ahem, IE < 9.
	    if (hasEnumBug) collectNonEnumProps(obj, keys);
	    return keys;
	  };
	
	  // Retrieve all the property names of an object.
	  _.allKeys = function(obj) {
	    if (!_.isObject(obj)) return [];
	    var keys = [];
	    for (var key in obj) keys.push(key);
	    // Ahem, IE < 9.
	    if (hasEnumBug) collectNonEnumProps(obj, keys);
	    return keys;
	  };
	
	  // Retrieve the values of an object's properties.
	  _.values = function(obj) {
	    var keys = _.keys(obj);
	    var length = keys.length;
	    var values = Array(length);
	    for (var i = 0; i < length; i++) {
	      values[i] = obj[keys[i]];
	    }
	    return values;
	  };
	
	  // Returns the results of applying the iteratee to each element of the object
	  // In contrast to _.map it returns an object
	  _.mapObject = function(obj, iteratee, context) {
	    iteratee = cb(iteratee, context);
	    var keys =  _.keys(obj),
	          length = keys.length,
	          results = {},
	          currentKey;
	      for (var index = 0; index < length; index++) {
	        currentKey = keys[index];
	        results[currentKey] = iteratee(obj[currentKey], currentKey, obj);
	      }
	      return results;
	  };
	
	  // Convert an object into a list of `[key, value]` pairs.
	  _.pairs = function(obj) {
	    var keys = _.keys(obj);
	    var length = keys.length;
	    var pairs = Array(length);
	    for (var i = 0; i < length; i++) {
	      pairs[i] = [keys[i], obj[keys[i]]];
	    }
	    return pairs;
	  };
	
	  // Invert the keys and values of an object. The values must be serializable.
	  _.invert = function(obj) {
	    var result = {};
	    var keys = _.keys(obj);
	    for (var i = 0, length = keys.length; i < length; i++) {
	      result[obj[keys[i]]] = keys[i];
	    }
	    return result;
	  };
	
	  // Return a sorted list of the function names available on the object.
	  // Aliased as `methods`
	  _.functions = _.methods = function(obj) {
	    var names = [];
	    for (var key in obj) {
	      if (_.isFunction(obj[key])) names.push(key);
	    }
	    return names.sort();
	  };
	
	  // Extend a given object with all the properties in passed-in object(s).
	  _.extend = createAssigner(_.allKeys);
	
	  // Assigns a given object with all the own properties in the passed-in object(s)
	  // (https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)
	  _.extendOwn = _.assign = createAssigner(_.keys);
	
	  // Returns the first key on an object that passes a predicate test
	  _.findKey = function(obj, predicate, context) {
	    predicate = cb(predicate, context);
	    var keys = _.keys(obj), key;
	    for (var i = 0, length = keys.length; i < length; i++) {
	      key = keys[i];
	      if (predicate(obj[key], key, obj)) return key;
	    }
	  };
	
	  // Return a copy of the object only containing the whitelisted properties.
	  _.pick = function(object, oiteratee, context) {
	    var result = {}, obj = object, iteratee, keys;
	    if (obj == null) return result;
	    if (_.isFunction(oiteratee)) {
	      keys = _.allKeys(obj);
	      iteratee = optimizeCb(oiteratee, context);
	    } else {
	      keys = flatten(arguments, false, false, 1);
	      iteratee = function(value, key, obj) { return key in obj; };
	      obj = Object(obj);
	    }
	    for (var i = 0, length = keys.length; i < length; i++) {
	      var key = keys[i];
	      var value = obj[key];
	      if (iteratee(value, key, obj)) result[key] = value;
	    }
	    return result;
	  };
	
	   // Return a copy of the object without the blacklisted properties.
	  _.omit = function(obj, iteratee, context) {
	    if (_.isFunction(iteratee)) {
	      iteratee = _.negate(iteratee);
	    } else {
	      var keys = _.map(flatten(arguments, false, false, 1), String);
	      iteratee = function(value, key) {
	        return !_.contains(keys, key);
	      };
	    }
	    return _.pick(obj, iteratee, context);
	  };
	
	  // Fill in a given object with default properties.
	  _.defaults = createAssigner(_.allKeys, true);
	
	  // Creates an object that inherits from the given prototype object.
	  // If additional properties are provided then they will be added to the
	  // created object.
	  _.create = function(prototype, props) {
	    var result = baseCreate(prototype);
	    if (props) _.extendOwn(result, props);
	    return result;
	  };
	
	  // Create a (shallow-cloned) duplicate of an object.
	  _.clone = function(obj) {
	    if (!_.isObject(obj)) return obj;
	    return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
	  };
	
	  // Invokes interceptor with the obj, and then returns obj.
	  // The primary purpose of this method is to "tap into" a method chain, in
	  // order to perform operations on intermediate results within the chain.
	  _.tap = function(obj, interceptor) {
	    interceptor(obj);
	    return obj;
	  };
	
	  // Returns whether an object has a given set of `key:value` pairs.
	  _.isMatch = function(object, attrs) {
	    var keys = _.keys(attrs), length = keys.length;
	    if (object == null) return !length;
	    var obj = Object(object);
	    for (var i = 0; i < length; i++) {
	      var key = keys[i];
	      if (attrs[key] !== obj[key] || !(key in obj)) return false;
	    }
	    return true;
	  };
	
	
	  // Internal recursive comparison function for `isEqual`.
	  var eq = function(a, b, aStack, bStack) {
	    // Identical objects are equal. `0 === -0`, but they aren't identical.
	    // See the [Harmony `egal` proposal](http://wiki.ecmascript.org/doku.php?id=harmony:egal).
	    if (a === b) return a !== 0 || 1 / a === 1 / b;
	    // A strict comparison is necessary because `null == undefined`.
	    if (a == null || b == null) return a === b;
	    // Unwrap any wrapped objects.
	    if (a instanceof _) a = a._wrapped;
	    if (b instanceof _) b = b._wrapped;
	    // Compare `[[Class]]` names.
	    var className = toString.call(a);
	    if (className !== toString.call(b)) return false;
	    switch (className) {
	      // Strings, numbers, regular expressions, dates, and booleans are compared by value.
	      case '[object RegExp]':
	      // RegExps are coerced to strings for comparison (Note: '' + /a/i === '/a/i')
	      case '[object String]':
	        // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
	        // equivalent to `new String("5")`.
	        return '' + a === '' + b;
	      case '[object Number]':
	        // `NaN`s are equivalent, but non-reflexive.
	        // Object(NaN) is equivalent to NaN
	        if (+a !== +a) return +b !== +b;
	        // An `egal` comparison is performed for other numeric values.
	        return +a === 0 ? 1 / +a === 1 / b : +a === +b;
	      case '[object Date]':
	      case '[object Boolean]':
	        // Coerce dates and booleans to numeric primitive values. Dates are compared by their
	        // millisecond representations. Note that invalid dates with millisecond representations
	        // of `NaN` are not equivalent.
	        return +a === +b;
	    }
	
	    var areArrays = className === '[object Array]';
	    if (!areArrays) {
	      if (typeof a != 'object' || typeof b != 'object') return false;
	
	      // Objects with different constructors are not equivalent, but `Object`s or `Array`s
	      // from different frames are.
	      var aCtor = a.constructor, bCtor = b.constructor;
	      if (aCtor !== bCtor && !(_.isFunction(aCtor) && aCtor instanceof aCtor &&
	                               _.isFunction(bCtor) && bCtor instanceof bCtor)
	                          && ('constructor' in a && 'constructor' in b)) {
	        return false;
	      }
	    }
	    // Assume equality for cyclic structures. The algorithm for detecting cyclic
	    // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.
	
	    // Initializing stack of traversed objects.
	    // It's done here since we only need them for objects and arrays comparison.
	    aStack = aStack || [];
	    bStack = bStack || [];
	    var length = aStack.length;
	    while (length--) {
	      // Linear search. Performance is inversely proportional to the number of
	      // unique nested structures.
	      if (aStack[length] === a) return bStack[length] === b;
	    }
	
	    // Add the first object to the stack of traversed objects.
	    aStack.push(a);
	    bStack.push(b);
	
	    // Recursively compare objects and arrays.
	    if (areArrays) {
	      // Compare array lengths to determine if a deep comparison is necessary.
	      length = a.length;
	      if (length !== b.length) return false;
	      // Deep compare the contents, ignoring non-numeric properties.
	      while (length--) {
	        if (!eq(a[length], b[length], aStack, bStack)) return false;
	      }
	    } else {
	      // Deep compare objects.
	      var keys = _.keys(a), key;
	      length = keys.length;
	      // Ensure that both objects contain the same number of properties before comparing deep equality.
	      if (_.keys(b).length !== length) return false;
	      while (length--) {
	        // Deep compare each member
	        key = keys[length];
	        if (!(_.has(b, key) && eq(a[key], b[key], aStack, bStack))) return false;
	      }
	    }
	    // Remove the first object from the stack of traversed objects.
	    aStack.pop();
	    bStack.pop();
	    return true;
	  };
	
	  // Perform a deep comparison to check if two objects are equal.
	  _.isEqual = function(a, b) {
	    return eq(a, b);
	  };
	
	  // Is a given array, string, or object empty?
	  // An "empty" object has no enumerable own-properties.
	  _.isEmpty = function(obj) {
	    if (obj == null) return true;
	    if (isArrayLike(obj) && (_.isArray(obj) || _.isString(obj) || _.isArguments(obj))) return obj.length === 0;
	    return _.keys(obj).length === 0;
	  };
	
	  // Is a given value a DOM element?
	  _.isElement = function(obj) {
	    return !!(obj && obj.nodeType === 1);
	  };
	
	  // Is a given value an array?
	  // Delegates to ECMA5's native Array.isArray
	  _.isArray = nativeIsArray || function(obj) {
	    return toString.call(obj) === '[object Array]';
	  };
	
	  // Is a given variable an object?
	  _.isObject = function(obj) {
	    var type = typeof obj;
	    return type === 'function' || type === 'object' && !!obj;
	  };
	
	  // Add some isType methods: isArguments, isFunction, isString, isNumber, isDate, isRegExp, isError.
	  _.each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp', 'Error'], function(name) {
	    _['is' + name] = function(obj) {
	      return toString.call(obj) === '[object ' + name + ']';
	    };
	  });
	
	  // Define a fallback version of the method in browsers (ahem, IE < 9), where
	  // there isn't any inspectable "Arguments" type.
	  if (!_.isArguments(arguments)) {
	    _.isArguments = function(obj) {
	      return _.has(obj, 'callee');
	    };
	  }
	
	  // Optimize `isFunction` if appropriate. Work around some typeof bugs in old v8,
	  // IE 11 (#1621), and in Safari 8 (#1929).
	  if (typeof /./ != 'function' && typeof Int8Array != 'object') {
	    _.isFunction = function(obj) {
	      return typeof obj == 'function' || false;
	    };
	  }
	
	  // Is a given object a finite number?
	  _.isFinite = function(obj) {
	    return isFinite(obj) && !isNaN(parseFloat(obj));
	  };
	
	  // Is the given value `NaN`? (NaN is the only number which does not equal itself).
	  _.isNaN = function(obj) {
	    return _.isNumber(obj) && obj !== +obj;
	  };
	
	  // Is a given value a boolean?
	  _.isBoolean = function(obj) {
	    return obj === true || obj === false || toString.call(obj) === '[object Boolean]';
	  };
	
	  // Is a given value equal to null?
	  _.isNull = function(obj) {
	    return obj === null;
	  };
	
	  // Is a given variable undefined?
	  _.isUndefined = function(obj) {
	    return obj === void 0;
	  };
	
	  // Shortcut function for checking if an object has a given property directly
	  // on itself (in other words, not on a prototype).
	  _.has = function(obj, key) {
	    return obj != null && hasOwnProperty.call(obj, key);
	  };
	
	  // Utility Functions
	  // -----------------
	
	  // Run Underscore.js in *noConflict* mode, returning the `_` variable to its
	  // previous owner. Returns a reference to the Underscore object.
	  _.noConflict = function() {
	    root._ = previousUnderscore;
	    return this;
	  };
	
	  // Keep the identity function around for default iteratees.
	  _.identity = function(value) {
	    return value;
	  };
	
	  // Predicate-generating functions. Often useful outside of Underscore.
	  _.constant = function(value) {
	    return function() {
	      return value;
	    };
	  };
	
	  _.noop = function(){};
	
	  _.property = property;
	
	  // Generates a function for a given object that returns a given property.
	  _.propertyOf = function(obj) {
	    return obj == null ? function(){} : function(key) {
	      return obj[key];
	    };
	  };
	
	  // Returns a predicate for checking whether an object has a given set of
	  // `key:value` pairs.
	  _.matcher = _.matches = function(attrs) {
	    attrs = _.extendOwn({}, attrs);
	    return function(obj) {
	      return _.isMatch(obj, attrs);
	    };
	  };
	
	  // Run a function **n** times.
	  _.times = function(n, iteratee, context) {
	    var accum = Array(Math.max(0, n));
	    iteratee = optimizeCb(iteratee, context, 1);
	    for (var i = 0; i < n; i++) accum[i] = iteratee(i);
	    return accum;
	  };
	
	  // Return a random integer between min and max (inclusive).
	  _.random = function(min, max) {
	    if (max == null) {
	      max = min;
	      min = 0;
	    }
	    return min + Math.floor(Math.random() * (max - min + 1));
	  };
	
	  // A (possibly faster) way to get the current timestamp as an integer.
	  _.now = Date.now || function() {
	    return new Date().getTime();
	  };
	
	   // List of HTML entities for escaping.
	  var escapeMap = {
	    '&': '&amp;',
	    '<': '&lt;',
	    '>': '&gt;',
	    '"': '&quot;',
	    "'": '&#x27;',
	    '`': '&#x60;'
	  };
	  var unescapeMap = _.invert(escapeMap);
	
	  // Functions for escaping and unescaping strings to/from HTML interpolation.
	  var createEscaper = function(map) {
	    var escaper = function(match) {
	      return map[match];
	    };
	    // Regexes for identifying a key that needs to be escaped
	    var source = '(?:' + _.keys(map).join('|') + ')';
	    var testRegexp = RegExp(source);
	    var replaceRegexp = RegExp(source, 'g');
	    return function(string) {
	      string = string == null ? '' : '' + string;
	      return testRegexp.test(string) ? string.replace(replaceRegexp, escaper) : string;
	    };
	  };
	  _.escape = createEscaper(escapeMap);
	  _.unescape = createEscaper(unescapeMap);
	
	  // If the value of the named `property` is a function then invoke it with the
	  // `object` as context; otherwise, return it.
	  _.result = function(object, property, fallback) {
	    var value = object == null ? void 0 : object[property];
	    if (value === void 0) {
	      value = fallback;
	    }
	    return _.isFunction(value) ? value.call(object) : value;
	  };
	
	  // Generate a unique integer id (unique within the entire client session).
	  // Useful for temporary DOM ids.
	  var idCounter = 0;
	  _.uniqueId = function(prefix) {
	    var id = ++idCounter + '';
	    return prefix ? prefix + id : id;
	  };
	
	  // By default, Underscore uses ERB-style template delimiters, change the
	  // following template settings to use alternative delimiters.
	  _.templateSettings = {
	    evaluate    : /<%([\s\S]+?)%>/g,
	    interpolate : /<%=([\s\S]+?)%>/g,
	    escape      : /<%-([\s\S]+?)%>/g
	  };
	
	  // When customizing `templateSettings`, if you don't want to define an
	  // interpolation, evaluation or escaping regex, we need one that is
	  // guaranteed not to match.
	  var noMatch = /(.)^/;
	
	  // Certain characters need to be escaped so that they can be put into a
	  // string literal.
	  var escapes = {
	    "'":      "'",
	    '\\':     '\\',
	    '\r':     'r',
	    '\n':     'n',
	    '\u2028': 'u2028',
	    '\u2029': 'u2029'
	  };
	
	  var escaper = /\\|'|\r|\n|\u2028|\u2029/g;
	
	  var escapeChar = function(match) {
	    return '\\' + escapes[match];
	  };
	
	  // JavaScript micro-templating, similar to John Resig's implementation.
	  // Underscore templating handles arbitrary delimiters, preserves whitespace,
	  // and correctly escapes quotes within interpolated code.
	  // NB: `oldSettings` only exists for backwards compatibility.
	  _.template = function(text, settings, oldSettings) {
	    if (!settings && oldSettings) settings = oldSettings;
	    settings = _.defaults({}, settings, _.templateSettings);
	
	    // Combine delimiters into one regular expression via alternation.
	    var matcher = RegExp([
	      (settings.escape || noMatch).source,
	      (settings.interpolate || noMatch).source,
	      (settings.evaluate || noMatch).source
	    ].join('|') + '|$', 'g');
	
	    // Compile the template source, escaping string literals appropriately.
	    var index = 0;
	    var source = "__p+='";
	    text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
	      source += text.slice(index, offset).replace(escaper, escapeChar);
	      index = offset + match.length;
	
	      if (escape) {
	        source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
	      } else if (interpolate) {
	        source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
	      } else if (evaluate) {
	        source += "';\n" + evaluate + "\n__p+='";
	      }
	
	      // Adobe VMs need the match returned to produce the correct offest.
	      return match;
	    });
	    source += "';\n";
	
	    // If a variable is not specified, place data values in local scope.
	    if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';
	
	    source = "var __t,__p='',__j=Array.prototype.join," +
	      "print=function(){__p+=__j.call(arguments,'');};\n" +
	      source + 'return __p;\n';
	
	    try {
	      var render = new Function(settings.variable || 'obj', '_', source);
	    } catch (e) {
	      e.source = source;
	      throw e;
	    }
	
	    var template = function(data) {
	      return render.call(this, data, _);
	    };
	
	    // Provide the compiled source as a convenience for precompilation.
	    var argument = settings.variable || 'obj';
	    template.source = 'function(' + argument + '){\n' + source + '}';
	
	    return template;
	  };
	
	  // Add a "chain" function. Start chaining a wrapped Underscore object.
	  _.chain = function(obj) {
	    var instance = _(obj);
	    instance._chain = true;
	    return instance;
	  };
	
	  // OOP
	  // ---------------
	  // If Underscore is called as a function, it returns a wrapped object that
	  // can be used OO-style. This wrapper holds altered versions of all the
	  // underscore functions. Wrapped objects may be chained.
	
	  // Helper function to continue chaining intermediate results.
	  var result = function(instance, obj) {
	    return instance._chain ? _(obj).chain() : obj;
	  };
	
	  // Add your own custom functions to the Underscore object.
	  _.mixin = function(obj) {
	    _.each(_.functions(obj), function(name) {
	      var func = _[name] = obj[name];
	      _.prototype[name] = function() {
	        var args = [this._wrapped];
	        push.apply(args, arguments);
	        return result(this, func.apply(_, args));
	      };
	    });
	  };
	
	  // Add all of the Underscore functions to the wrapper object.
	  _.mixin(_);
	
	  // Add all mutator Array functions to the wrapper.
	  _.each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function(name) {
	    var method = ArrayProto[name];
	    _.prototype[name] = function() {
	      var obj = this._wrapped;
	      method.apply(obj, arguments);
	      if ((name === 'shift' || name === 'splice') && obj.length === 0) delete obj[0];
	      return result(this, obj);
	    };
	  });
	
	  // Add all accessor Array functions to the wrapper.
	  _.each(['concat', 'join', 'slice'], function(name) {
	    var method = ArrayProto[name];
	    _.prototype[name] = function() {
	      return result(this, method.apply(this._wrapped, arguments));
	    };
	  });
	
	  // Extracts the result from a wrapped and chained object.
	  _.prototype.value = function() {
	    return this._wrapped;
	  };
	
	  // Provide unwrapping proxy for some methods used in engine operations
	  // such as arithmetic and JSON stringification.
	  _.prototype.valueOf = _.prototype.toJSON = _.prototype.value;
	
	  _.prototype.toString = function() {
	    return '' + this._wrapped;
	  };
	
	  // AMD registration happens at the end for compatibility with AMD loaders
	  // that may not enforce next-turn semantics on modules. Even though general
	  // practice for AMD registration is to be anonymous, underscore registers
	  // as a named module because, like jQuery, it is a base library that is
	  // popular enough to be bundled in a third party lib, but not be part of
	  // an AMD load request. Those cases could generate an error when an
	  // anonymous define() is called outside of a loader request.
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {
	      return _;
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  }
	}.call(this));


/***/ }

});
//# sourceMappingURL=app.js.map