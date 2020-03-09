import React, { useState } from "react";
import Colorbar from "d3-react-colorbar";
var ReactDOM = require("react-dom"),
  d3 = require("d3"),
  _ = require("underscore");

import ReactTree, {
  ModelsPartitionsList,
  SettingsItem
} from "./components/react-tree.jsx";
import { DatamonkeyTable, DatamonkeyModelTable } from "./components/tables.jsx";
import { DatamonkeySiteGraph } from "./components/graphs.jsx";
import { ResultsPage } from "./components/results_page.jsx";
import { scaleLog } from "d3-scale";

function MEMETree(props) {
  const { data } = props;
  if (!data) return null;
  const ebf_data = _.object(
      _.keys(data["branch attributes"]["attributes"])
        .filter(datum => datum.slice(0, 3) == "EBF")
        .map(datum => [+datum.split(" ")[2], +datum[datum.length - 2]])
    ),
    ebf_range = d3.extent(_.keys(ebf_data).map(d => +d));
  const [partition, setPartition] = useState(0);
  const [model, setModel] = useState("Global MG94xREV");
  const [ebf, setEbf] = useState(ebf_range[0]);
  const [message, setMessage] = useState(null);
  const newick = data.input.trees[String(partition)];
  function accessor(node) {
    const name = node.data.name,
      attributes = data["branch attributes"][String(partition)],
      branch_length = attributes[name][model];
    return branch_length;
  }

  var styler;
  if (ebf_data[ebf]) {
    const current_partition = data["branch attributes"][String(partition)],
      ebf_string = `EBF site ${ebf} (partition ${partition + 1})`,
      branch_ebf_range = d3.extent(
        _.values(current_partition).map(val => val[ebf_string])
      ),
      scale = scaleLog()
        .domain([
          branch_ebf_range[0],
          Math.sqrt(branch_ebf_range[0] * branch_ebf_range[1]),
          branch_ebf_range[1]
        ])
        .range(["#000000", "#EEEEEE", "#00A99D"]);
    styler = node => {
      return {
        stroke: scale(current_partition[node.name][ebf_string])
      };
    };
  } else styler = null;

  return (
    <ReactTree
      newick={newick}
      accessor={accessor}
      number_of_sequences={props.data.input["number of sequences"]}
      paddingLeft={ebf ? 100 : 10}
      popover={
        "<li>Use the options menu to toggle the different site partitions.</li>"
      }
      branchStyler={styler}
      options={
        <ModelsPartitionsList
          number_of_partitions={_.keys(data.input.trees).length}
          partition={partition}
          setPartition={setPartition}
          model={model}
          setModel={setModel}
        />
      }
      settings={
        <SettingsItem
          onClick={() => {
            setEbf(ebf == null ? ebf_range[0] : null);
          }}
        >
          {ebf == null ? "Show" : "Hide"} branch-wise EBF values
        </SettingsItem>
      }
      between={
        ebf != null ? (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginLeft: 20,
              marginTop: 10,
              marginBottom: 10
            }}
          >
            <span>
              Site to display:
              <input
                type="number"
                value={ebf}
                onChange={e => {
                  const site = e.target.value,
                    partition = ebf_data[site];
                  if (site == "" || site == 0) {
                    setMessage({
                      type: "error",
                      content: "Please enter a valid input (positive integer)."
                    });
                    setEbf("");
                  } else if (!ebf_data[site]) {
                    setMessage({
                      type: "warning",
                      content: "No variation at this site, so no EBFs."
                    });
                    setEbf(site);
                  } else {
                    setMessage(null);
                    setEbf(site);
                    setPartition(partition - 1);
                  }
                }}
              />
            </span>
            <span>
              {message ? (
                <div
                  className={
                    "alert alert-" +
                    (message.type == "error" ? "danger" : "warning")
                  }
                  role="alert"
                >
                  <b> {message.type.toUpperCase()}: </b> {message.content}
                </div>
              ) : null}
            </span>
          </div>
        ) : null
      }
    />
  );
}

function MEMESummary(props) {
  var number_of_sites = 0;
  if (props.json) {
    number_of_sites = _.flatten(_.values(props.json.MLE.content), true).filter(
      row => row[3] / (row[0] || 1e-10) > 1 && row[6] < props.pValue
    ).length;
  }

  return (
    <div className="row">
      <div className="col-md-12" />
      <div className="col-md-12">
        <div className="main-result">
          <p>
            MEME <strong className="hyphy-highlight">found evidence</strong> of
          </p>
          <p>
            <i className="fa fa-plus-circle" aria-hidden="true">
              {" "}
            </i>{" "}
            episodic positive/diversifying selection at
            <span className="hyphy-highlight"> {number_of_sites} </span>
            sites
          </p>
          <p>
            with p-value threshold of
            <input
              style={{
                display: "inline-block",
                marginLeft: "5px",
                width: "100px"
              }}
              className="form-control"
              type="number"
              defaultValue="0.1"
              step="0.01"
              min="0"
              max="1"
              onChange={props.updatePValue}
            />
            .
          </p>
          <hr />
          <p>
            <small>
              See{" "}
              <a href="http://www.hyphy.org/methods/selection-methods/#meme">
                here
              </a>{" "}
              for more information about the MEME method.
              <br />
              Please cite{" "}
              <a
                href="http://www.ncbi.nlm.nih.gov/pubmed/22807683"
                id="summary-pmid"
                target="_blank"
              >
                PMID 22807683
              </a>{" "}
              if you use this result in a publication, presentation, or other
              scientific work.
            </small>
          </p>
        </div>
      </div>
    </div>
  );
}

function MEMETable(props) {
  var flattened = _.flatten(_.values(props.body_data), true),
    partition_column = d3.range(flattened.length).map(d => 0);
  _.each(props.partitions, (val, key) => {
    val.coverage[0].forEach(d => {
      partition_column[d] = key;
    });
  });
  var formatter = d3.format(".2f"),
    new_rows = flattened.map((row, index) => {
      var alpha = row[0] ? row[0] : 1e-10,
        beta_plus = row[3];
      var selection =
        beta_plus / alpha > 1 && row[6] < props.pValue
          ? "positive-selection-row"
          : "";
      var site = { value: index + 1, classes: selection },
        partition = { value: +partition_column[index] + 1, classes: selection };
      return [site, partition].concat(
        row.map(entry => {
          return { value: formatter(entry), classes: selection };
        })
      );
    });
  if (props.header) {
    var headerData = [
      { value: "Site", sortable: true },
      { value: "Partition", sortable: true }
    ].concat(
      props.header.map(pair => {
        return {
          value: pair[0] == "alpha;" ? "&alpha; " : pair[0],
          abbr: pair[1],
          sortable: true
        };
      })
    );
  }

  return (
    <div className="row">
      <div className="col-md-12" id="table-tab">
        <h4 className="dm-table-header">
          MEME Table
          <span
            className="fas fa-info-circle"
            style={{
              verticalAlign: "middle",
              float: "right",
              minHeight: "30px",
              minWidth: "30px"
            }}
            aria-hidden="true"
            data-toggle="popover"
            data-trigger="hover"
            title="Actions"
            data-html="true"
            data-content="<ul><li>Hover over a column header for a description of its content.</li></ul>"
            data-placement="bottom"
          />
        </h4>
        <div className="col-md-12" role="alert">
          <p className="description">
            Sites that yielded a statistically significant result are
            highlighted in green.
          </p>
        </div>
        <DatamonkeyTable
          headerData={headerData}
          bodyData={new_rows}
          paginate={20}
          classes={"table table-smm table-striped"}
          export_csv
        />
      </div>
    </div>
  );
}

class MEMEContents extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input_data: null,
      data: null,
      fits: null,
      header: null,
      bodyData: null,
      partitions: null,
      pValue: 0.1
    };
  }

  componentDidMount() {
    this.processData(this.props.json);
  }

  componentWillReceiveProps(nextProps) {
    this.processData(nextProps.json);
  }

  processData(data) {
    data["trees"] = _.map(data["input"]["trees"], (val, key) => {
      var branchLengths = {
        "Global MG94xREV": _.mapObject(
          data["branch attributes"][key],
          val1 => val1["Global MG94xREV"]
        ),
        "Nucleotide GTR": _.mapObject(
          data["branch attributes"][key],
          val1 => val1["Nucleotide GTR"]
        )
      };
      return { newickString: val, branchLengths: branchLengths };
    });

    if (data["fits"]["Nucleotide GTR"]) {
      data["fits"]["Nucleotide GTR"]["Rate Distributions"] = {};
    }

    this.setState({
      input_data: data["input_data"],
      data: data,
      fits: data["fits"],
      header: data["MLE"]["headers"],
      bodyData: data["MLE"]["content"],
      partitions: data["data partitions"]
    });
  }

  updatePValue = e => {
    this.setState({ pValue: e.target.value });
  };

  render() {
    var self = this;
    var site_graph;
    var models = {};
    if (this.state.data) {
      var columns = _.pluck(self.state.header, 0);
      columns[0] = "&alpha;";
      site_graph = (
        <DatamonkeySiteGraph
          columns={columns}
          rows={_.flatten(_.values(self.state.bodyData), true)}
        />
      );
    }
    if (!_.isNull(self.state.data)) {
      models = self.state.data.fits;
    }

    var tree_settings = {
      omegaPlot: {},
      "tree-options": {
        /* value arrays have the following meaning
                [0] - the value of the attribute
                [1] - does the change in attribute value trigger tree re-layout?
            */
        "hyphy-tree-model": ["Unconstrained model", true],
        "hyphy-tree-highlight": ["RELAX.test", false],
        "hyphy-tree-branch-lengths": [false, true],
        "hyphy-tree-hide-legend": [true, false],
        "hyphy-tree-fill-color": [true, false]
      },
      "hyphy-tree-legend-type": "discrete",
      "suppress-tree-render": false,
      "chart-append-html": true,
      edgeColorizer: function(e, d) {
        return 0;
      }
    };

    return (
      <div>
        <MEMESummary
          json={self.state.data}
          updatePValue={self.updatePValue}
          pValue={self.state.pValue}
        />
        <MEMETable
          header={self.state.header}
          body_data={self.state.bodyData}
          partitions={self.state.partitions}
          pValue={self.state.pValue}
        />
        <div id="plot-tab" className="row hyphy-row">
          <div className="col-md-12">
            <h4 className="dm-table-header">MEME Site Plot</h4>
            {site_graph}
          </div>
        </div>

        <div className="row">
          <div id="tree-tab" className="col-md-12">
            <MEMETree data={self.state.data} />
          </div>
        </div>

        <div className="row">
          <div className="col-md-12" id="fit-tab">
            <DatamonkeyModelTable fits={self.state.fits} />
            <p className="description">
              This table reports a statistical summary of the models fit to the
              data. Here, <strong>MG94</strong> refers to the MG94xREV baseline
              model that infers a single &omega; rate category per branch.
            </p>
          </div>
        </div>
      </div>
    );
  }
}

function MEME(props) {
  return (
    <ResultsPage
      data={props.data}
      scrollSpyInfo={[
        { label: "summary", href: "summary-tab" },
        { label: "table", href: "table-tab" },
        { label: "plot", href: "plot-tab" },
        { label: "tree", href: "tree-tab" },
        { label: "fits", href: "fit-tab" }
      ]}
      methodName="Mixed Effects Model of Evolution"
      fasta={props.fasta}
      originalFile={props.originalFile}
      analysisLog={props.analysisLog}
    >
      {MEMEContents}
    </ResultsPage>
  );
}

function render_meme(data, element, fasta, originalFile, analysisLog) {
  ReactDOM.render(
    <MEME
      data={data}
      fasta={fasta}
      originalFile={originalFile}
      analysisLog={analysisLog}
    />,
    document.getElementById(element)
  );
}

module.exports = render_meme;
module.exports.MEME = MEME;
