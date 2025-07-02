import React, { useState, useMemo } from 'react';
import { transactionData } from './mockData';


const StatusPill = ({ status }) => {
  const statusClass = status.toLowerCase().replace(' ', '-');
  return <span className={`status-pill status-${statusClass}`}>{status}</span>;
};


const DashboardTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'desc' });
  const [filter, setFilter] = useState('');
  const itemsPerPage = 8;

  const filteredData = useMemo(() =>
    transactionData.filter(item =>
      Object.values(item).some(val =>
        String(val).toLowerCase().includes(filter.toLowerCase())
      )
    ), [filter]);

  const sortedData = useMemo(() => {
    const data = [...filteredData];
    data.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
    return data;
  }, [filteredData, sortConfig]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return sortedData.slice(startIndex, startIndex + itemsPerPage);
  }, [sortedData, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(sortedData.length / itemsPerPage);

  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const getSortIndicator = (key) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === 'asc' ? '▲' : '▼';
  };

  return (
    <div className="dashboard-table glassmorphism-card">
      <div className="table-header">
        <h3 className="table-title">Recent Transactions</h3>
        <input
          type="text"
          placeholder="Filter transactions..."
          className="table-filter"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th onClick={() => requestSort('date')}>Date {getSortIndicator('date')}</th>
              <th onClick={() => requestSort('type')}>Type {getSortIndicator('type')}</th>
              <th onClick={() => requestSort('amount')}>Amount {getSortIndicator('amount')}</th>
              <th onClick={() => requestSort('status')}>Status {getSortIndicator('status')}</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((row) => (
              <tr key={row.id}>
                <td>{row.date}</td>
                <td>{row.type}</td>
                <td>{row.amount}</td>
                <td className="status-cell"><StatusPill status={row.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="table-pagination">
        <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}>
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
      <div className="table-alt-desc">
        <strong>Transaction Table:</strong> This table lists your recent transactions with options to sort, filter, and paginate the data for easier navigation.
      </div>
    </div>
  );
};

export default DashboardTable;
