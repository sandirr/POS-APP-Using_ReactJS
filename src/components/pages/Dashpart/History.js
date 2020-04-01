import React, { Component } from "react";
import "../Home.css";
import { connect } from "react-redux";
import { getHistory } from "../../redux/actions/History";
import Purchasedetail from "../../modals/Purchasedetail";
import Chart from "chart.js";
import axios from "axios";
const url = process.env.REACT_APP_URL;
class History extends Component {
  state = {
    id: 0,
    data: []
  };
  getdetail = idPurchase => {
    this.setState({ id: idPurchase });
  };
  getHistory() {
    this.props.dispatch(getHistory());
  }
  componentDidMount() {
    this.getHistory();
    axios
      .get(url + "lastweek", {
        headers: {
          token: localStorage.getItem("token"),
          "user-id": localStorage.getItem("user-id")
        }
      })
      .then(res => {
        var x = [];
        var y = [];
        var i = 0;
        res.data.result.forEach(e => {
          x[i] = e.date_added.toString().substr(0, 10);
          y[i] = e.totalPayment;
          i++;
        });
        var popCanvas = document.getElementById("popChart").getContext("2d");
        new Chart(popCanvas, {
          type: "bar",
          data: {
            labels: x,
            datasets: [
              {
                label: "Last 7 Days Revenue",
                data: y,
                backgroundColor: [
                  "rgba(54, 162, 235, 0.6)",
                  "rgba(255, 206, 86, 0.6)",
                  "rgba(75, 192, 192, 0.6)",
                  "rgba(153, 102, 255, 0.6)",
                  "rgba(255, 159, 64, 0.6)",
                  "rgba(255, 99, 132, 0.6)",
                  "rgba(54, 162, 235, 0.6)"
                ]
              }
            ]
          }
        });
      });
  }

  render() {
    const PriceParsed = data => {
      return (
        <span>
          {data.data
            .toString()
            .split("")
            .reverse()
            .join("")
            .match(/\d{1,3}/g)
            .join(".")
            .split("")
            .reverse()
            .join("")}
        </span>
      );
    };
    return (
      <div hidden={this.props.historyHidden}>
        <p>
          <a
            className="btn btn-info"
            data-toggle="collapse"
            href="#multiCollapseExample1"
            role="button"
            aria-expanded="false"
            aria-controls="multiCollapseExample1"
          >
            Last 7 Days Revenue
          </a>
          <button
            className="btn btn-info ml-2"
            type="button"
            data-toggle="collapse"
            data-target="#multiCollapseExample2"
            aria-expanded="false"
            aria-controls="multiCollapseExample2"
          >
            History in Table
          </button>
        </p>
        <div
          className="collapse show multi-collapse mb-5"
          id="multiCollapseExample1"
        >
          <div className="card card-body">
            <canvas id="popChart" width="250" height="100"></canvas>
          </div>
        </div>
        <div className="collapse multi-collapse" id="multiCollapseExample2">
          <div className="card card-body">
            <table className="table table-striped" name="table-category">
              <thead className="thead-dark">
                <tr>
                  <th scope="col">Invoices</th>
                  <th scope="col">Date</th>
                  <th scope="col">Total Payment</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {this.props.histories.map((history, index) => (
                  <tr key={index}>
                    <th scope="row">{history.idBuyer}</th>
                    <td>{history.date_added.toString().substr(0, 10)}</td>
                    <td>
                      Rp. <PriceParsed data={history.totalPayment} />
                    </td>
                    <td>
                      <button
                        data-toggle="modal"
                        data-target="#purchase-detail"
                        className="btn btn-info"
                        onClick={() => this.getdetail(history.idBuyer)}
                      >
                        Detail
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <Purchasedetail id={this.state.id} />
      </div>
    );
  }
}

const mapHistories = state => {
  return {
    histories: state.histories.histories
  };
};

export default connect(mapHistories)(History);
