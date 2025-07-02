import React from 'react';


const DashboardTable = () => (
  <div className="dashboard-table">
    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Type</th>
          <th>Amount</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>2025-07-01</td>
          <td>Cashback</td>
          <td>$12.50</td>
          <td><span className="status success">Success</span></td>
        </tr>
        <tr>
          <td>2025-07-01</td>
          <td>Referral</td>
          <td>$5.00</td>
          <td><span className="status pending">Pending</span></td>
        </tr>
      </tbody>
    </table>
    <div className="table-alt-desc">
      <strong>Transaction Table:</strong> This table summarizes your recent cashback and referral transactions, including date, type, amount, and status. Status is color-coded for clarity.
    </div>
  </div>
);

export default DashboardTable;
