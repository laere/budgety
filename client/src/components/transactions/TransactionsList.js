import React from "react";
import { connect } from "react-redux";

class TransactionsList extends React.Component {
  renderTransactions() {
    const { transactions } = this.props.budget;

    console.log(transactions);
    if (!transactions) {
      return;
    }

    return transactions.map(({ amount, description }) => {
      return (
        <div key={amount} className="panel">
          <div class="panel-block">
            <span>{description}</span>
            <span>{amount}</span>
            <button>Delete</button>
          </div>
        </div>
      );
    });
  }

  render() {
    return <div>{this.renderTransactions()}</div>;
  }
}

const mapStateToProps = ({ budgets }, ownProps) => {
  console.log(ownProps);
  return { budget: budgets.budget };
};

export default connect(mapStateToProps)(TransactionsList);
