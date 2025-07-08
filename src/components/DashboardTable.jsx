import React, { useState, useMemo } from 'react';
import { transactionData } from './mockData';

const StatusPill = ({ status }) => {
  const baseClasses = "inline-block rounded-full px-2 py-1 text-xs font-semibold";
  const statusClasses = {
    Completed: "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300",
    Pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300",
    Failed: "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300",
  };
  return <span className={`${baseClasses} ${statusClasses[status] || ''}`}>{status}</span>;
};

const DashboardTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState('');
  const itemsPerPage = 8;

  const filteredData = useMemo(() =>
    transactionData.filter(item =>
      Object.values(item).some(val =>
        String(val).toLowerCase().includes(filter.toLowerCase())
      )
    ), [filter]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredData, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const inputClass = "w-full max-w-xs rounded-md border-slate-300 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800 focus:border-blue-500 focus:ring-blue-500 sm:text-sm";
  const buttonClass = "rounded bg-slate-200 px-3 py-1 text-sm text-slate-700 hover:bg-slate-300 disabled:opacity-50 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600";

  return (
    <div className="rounded-lg border bg-white p-4 shadow-sm dark:bg-slate-900 dark:border-slate-800 text-black dark:text-white">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-black dark:text-white">Recent Transactions</h2>
        <input
          type="text"
          placeholder="Filter..."
          className={inputClass}
          value={filter}
          onChange={(e) => { setFilter(e.target.value); setCurrentPage(1); }}
        />
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 dark:bg-slate-800">
            <tr>
              <th className="p-4 font-medium">Date</th>
              <th className="p-4 font-medium">Type</th>
              <th className="p-4 font-medium">Amount</th>
              <th className="p-4 font-medium text-center">Status</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((row) => (
              <tr key={row.id} className="border-b dark:border-slate-800">
                <td className="p-4">{row.date}</td>
                <td className="p-4">{row.type}</td>
                <td className="p-4">{row.amount}</td>
                <td className="p-4 text-center"><StatusPill status={row.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-between pt-4 text-sm">
        <span className="text-slate-600 dark:text-slate-400">
          Page {currentPage} of {totalPages}
        </span>
        <div className="flex gap-2">
          <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className={buttonClass}>
            Previous
          </button>
          <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className={buttonClass}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardTable;