import "./DataTable.css";

const DataTable = ({ groupedTransactions, users }) => (
  <table>
    <thead>
      <tr>
        <td>User</td>
        <td>1st Month</td>
        <td>2nd Month</td>
        <td>3rd Month</td>
        <td>Total Points Earned</td>
      </tr>
    </thead>
    <tbody>
      {users.map((user) => {
        return (
          <tr>
            <td>{user}</td>
            <td>{groupedTransactions[user]["1"].points}</td>
            <td>{groupedTransactions[user]["2"].points}</td>
            <td>{groupedTransactions[user]["3"].points}</td>
            <td>
              {groupedTransactions[user]["1"].points +
                groupedTransactions[user]["2"].points +
                groupedTransactions[user]["3"].points}
            </td>
          </tr>
        );
      })}
    </tbody>
  </table>
);

export default DataTable;
