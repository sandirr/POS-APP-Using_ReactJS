import React, { Component } from "react";
import { connect } from "react-redux";
import { getDetailHistory } from "../redux/actions/History";
import Barcode from "react-barcode";

class Purchasedetail extends Component {
  constructor(props) {
    super(props);
    this._mount = true;
    this.state = {
      tPrice: 0
    };
  }

  reset = () => {
    this._mount = true;
  };

  componentDidMount() {
    this.setState({ tPrice: 0 });
  }

  componentDidUpdate() {
    if (this._mount) {
      this.props.dispatch(getDetailHistory(this.props.id));
      if (this.props.detailHistory[0]) {
        var a = 0;
        this.props.detailHistory.forEach(e => {
          a += e.Price;
        });
        this.setState({ tPrice: a });
        this._mount = false;
      }
    }
  }

  render() {
    return (
      <div
        className="modal fade"
        id="purchase-detail"
        role="dialog"
        aria-hidden="true"
        onClick={this.reset}
      >
        <div className="modal-dialog modal-dialog-scrollable" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalScrollableTitle">
                IrsandiCafe
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true" onClick={this.reset}>&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <p>Invoice:</p>
              <div style={{ marginBottom: 15, marginTop: -15 }}>
                <Barcode
                  value={this.props.id}
                  width={1}
                  height={30}
                  fontSize={18}
                />
              </div>
              {this.props.detailHistory.map((e, index) => (
                <div className="row" key={index}>
                  <div className="col-md-4">{e.name}</div>
                  <div className="col-md-4">{e.Qty}</div>
                  <div className="col-md-4">Rp. {e.Price}</div>
                </div>
              ))}
              <hr />
              <div className="row">
                <div className="col-md-4">Total : </div>
                <div className="col-md-4"></div>
                <div className="col-md-4">Rp. {this.state.tPrice}</div>
              </div>
              <button
                className="btn btn-info mt-3"
                data-dismiss="modal"
                onClick={this.reset}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapDetailHistory = state => {
  return {
    detailHistory: state.histories.detailHistory
  };
};

export default connect(mapDetailHistory)(Purchasedetail);
