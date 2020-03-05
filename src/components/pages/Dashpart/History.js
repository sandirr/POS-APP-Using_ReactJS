import React, { Component } from 'react'
import '../Home.css'
import { connect } from 'react-redux'
import { getHistory } from '../../redux/actions/History'
import Purchasedetail from '../../modals/Purchasedetail'

class History extends Component {
    state = {
        id: 0,
        data: []
    }
    getdetail = (idPurchase) => {
        this.setState({ id: idPurchase })
    }
    getHistory() {
        this.props.dispatch(getHistory())
    }
    componentDidMount() {
        this.getHistory()
    }
    render() {
        console.log(this.props.histories)
        return (
            <div hidden={this.props.historyHidden}>
                <table className="table table-striped" name="table-category">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">#ID Purchase</th>
                            <th scope="col">Date</th>
                            <th scope="col">Total Payment</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.histories.map((history, index) =>
                            <tr key={index}>
                                <th scope="row">{history.idBuyer}</th>
                                <td>{history.date_added}</td>
                                <td>{history.totalPayment}</td>
                                <td><button data-toggle="modal" data-target="#purchase-detail" className="btn btn-info" onClick={() => this.getdetail(history.idBuyer)}>Detail</button></td>
                            </tr>
                        )}
                    </tbody>
                </table>

                <Purchasedetail id={this.state.id} />


            </div>
        )
    }
}

const mapHistories = (state) => {
    return {
        histories: state.histories.histories
    }
}

export default connect(mapHistories)(History)