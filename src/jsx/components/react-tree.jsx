import React, { Component } from "react";
import Phylotree, { phylotreev1 } from "react-phylotree";
var download = require("in-browser-download");
var d3_save_svg = require("d3-save-svg");

import { saveSvgAsPng } from "save-svg-as-png";

require("phylotree");
require("phylotree.css");

class ReactTree extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tree: new phylotreev1(props.newick),
      pixels_per_node: 20
    };
  }
  togglePixelsPerNode(direction) {
    const new_candidate =
        this.state.pixels_per_node + (direction == "expand" ? 5 : -5),
      new_pixels_per_node = Math.max(Math.min(new_candidate, 100), 10);
    this.setState({
      pixels_per_node: new_pixels_per_node
    });
  }
  render() {
    const { number_of_sequences } = this.props,
      { pixels_per_node, tree } = this.state,
      { paddingLeft, paddingRight, paddingBottom, paddingTop } = this.props,
      width = 900,
      height = pixels_per_node * number_of_sequences;
    return (
      <div>
        <h4 className="dm-table-header">
          Fitted tree
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
            data-content={"<ul>" + this.props.popover + "<ul>"}
            data-placement="bottom"
          />
        </h4>

        <div className="row">
          <div
            className="col-12"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <div className="input-group-btn">
              <button
                type="button"
                className="btn btn-secondary dropdown-toggle"
                data-toggle="dropdown"
              >
                Options
                <span className="caret" />
              </button>
              <ul className="dropdown-menu" id="hyphy-tree-model-list"></ul>
            </div>

            <div className="input-group-btn">
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                data-direction="vertical"
                data-amount="1"
                title="Expand vertical spacing"
                onClick={() => this.togglePixelsPerNode("expand")}
              >
                <i className="fa fa-arrows-v" />
              </button>
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                data-direction="vertical"
                data-amount="-1"
                title="Compress vertical spacing"
                onClick={() => this.togglePixelsPerNode("compress")}
              >
                <i className="fa  fa-compress fa-rotate-135" />
              </button>
            </div>
            <div className="input-group-btn">
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                id="sort_ascending"
                title="Sort deepest clades to the bototm"
              >
                <i className="fa fa-sort-amount-asc" />
              </button>
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                id="sort_descending"
                title="Sort deepsest clades to the top"
              >
                <i className="fa fa-sort-amount-desc" />
              </button>
            </div>

            <div className="btn-group-toggle" data-toggle="buttons">
              <button className="btn btn-secondary active">
                <input
                  type="radio"
                  className="phylotree-align-toggler"
                  data-align="left"
                  name="options-align"
                  autoComplete="off"
                  title="Align tips labels to branches"
                />
                <i className="fa fa-align-left" />
              </button>
              <button className="btn btn-secondary btn-sm">
                <input
                  type="radio"
                  className="phylotree-align-toggler"
                  data-align="right"
                  name="options-align"
                  autoComplete="off"
                  title="Align tips labels to the edge of the plot"
                />
                <i className="fa fa-align-right" />
              </button>
            </div>

            <div className="input-group-btn">
              <button
                type="button"
                className="btn btn-secondary btn-sm dropdown-toggle"
                data-toggle="dropdown"
                style={{ paddingLeft: "30px" }}
              >
                <i className="fas fa-cog" /> <span className="caret" />
              </button>

              <div className="input-group-btn float-right">
                <button
                  type="button"
                  className="btn btn-secondary dropdown-toggle"
                  data-toggle="dropdown"
                >
                  Export <span className="caret" />
                </button>
                <ul className="dropdown-menu">
                  <li id="export-phylo-png">
                    <a
                      onClick={() =>
                        saveSvgAsPng(
                          document.getElementById("dm-phylotree"),
                          "tree.png"
                        )
                      }
                      href="javascript:;"
                    >
                      <i className="fa fa-image" /> PNG
                    </a>
                  </li>
                  <li id="export-phylo-png">
                    <a
                      onClick={() =>
                        d3_save_svg.save(d3.select("#dm-phylotree").node(), {
                          filename: "tree"
                        })
                      }
                      href="javascript:;"
                    >
                      <i className="fa fa-image" /> SVG
                    </a>
                  </li>
                  <li id="export-phylo-nwk">
                    <a onClick={this.exportNewick} href="javascript:;">
                      <i className="fa fa-file-o" /> Newick File
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <div className="row">
              <div id="tree_container" className="tree-widget">
                <svg id="dm-phylotree" width={width} height={height}>
                  <rect
                    x={0}
                    y={0}
                    width={width}
                    height={height}
                    fill="white"
                  />
                  <Phylotree
                    tree={tree}
                    transform={`translate(${paddingLeft}, ${paddingTop})`}
                    width={width - paddingLeft - paddingRight}
                    height={height - paddingTop - paddingBottom}
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ReactTree.defaultProps = {
  paddingLeft: 10,
  paddingRight: 10,
  paddingTop: 10,
  paddingBottom: 10
};

module.exports = ReactTree;
