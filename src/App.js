import "./App.css";
import { useState, useEffect } from "react";
import { transactionData } from "./transactions";
import DataTable from "./components/DataTable";

export const calculatePoints = (amount) => {
  if (amount > 100) {
    return 2 * (amount - 100) + 50;
  } else if (amount > 50 && amount <= 100) {
    return amount - 50;
  } else {
    return 0;
  }
};

const App = () => {
  const [transactions, setTransactions] = useState([]);
  const [groupedTransactions, setGroupedTransactions] = useState({});

  useEffect(() => {
    // const fetchTransactions = async () => {
    //   const API = "https://fakeapi/transactions?months=3"; // assuming backend could return data by query param of amount of months
    //   const response = await fetch(API);
    // if (response.ok) {
    //  setTransactions(response);
    // } else {
    // throw Error;
    // }
    setTransactions(transactionData);
  }, []);

  useEffect(() => {
    const grouped = groupTransactionsByUser(transactions);
    setGroupedTransactions(grouped);
  }, [transactions]);

  const groupTransactionsByUser = (list) => {
    const groupedTransactionsByUser = {};

    list.forEach((transaction) => {
      const month = transaction.date.split("/")[0];
      const user = transaction.user;

      if (!groupedTransactionsByUser.hasOwnProperty(user)) {
        groupedTransactionsByUser[user] = { total: 0, points: 0 };
      }

      if (!groupedTransactionsByUser[user].hasOwnProperty(month)) {
        groupedTransactionsByUser[user][month] = {
          total: 0,
          points: 0,
        };
      }

      groupedTransactionsByUser[user][month].total += transaction.amount;
      groupedTransactionsByUser[user][month].points += calculatePoints(
        transaction.amount
      );

      groupedTransactionsByUser[user].total += transaction.amount;
    });

    return groupedTransactionsByUser;
  };

  return (
    <div className="App">
      {!(transactions && transactions.length) ? (
        "loading"
      ) : (
        <>
          <h1>Points Rewards for Users</h1>
          <DataTable
            groupedTransactions={groupedTransactions}
            users={Object.keys(groupedTransactions)}
          />
        </>
      )}
    </div>
  );
};

export default App;
