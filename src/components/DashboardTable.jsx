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
          <td>Success</td>
        </tr>
        <tr>
          <td>2025-07-01</td>
          <td>Referral</td>
          <td>$5.00</td>
          <td>Pending</td>
        </tr>
      </tbody>
    </table>
  </div>
);

export default DashboardTable;
