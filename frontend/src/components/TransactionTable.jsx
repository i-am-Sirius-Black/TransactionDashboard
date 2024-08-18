import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TransactionTable = () => {
  const [transactions, setTransactions] = useState([]);
  const [search, setSearch] = useState('');
  const [month, setMonth] = useState(3);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  console.log("page update: ", page);
  

const perPage =3;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/transactions/get-transactions?search=${search}&month=${month}&page=${page}&perPage=${perPage}`)

        setTransactions(response.data.transactions);
        console.log("res : ", response.data.transactions);
        console.log("count ", response.data.count);
        
        setTotalPages(response.data.count);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    fetchData();
  }, [search, month, page, perPage]);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleMonthChange = (event) => {
    setPage(1)
    setMonth(event.target.value);
  };

  const handlePageChange = (newPage) => {
    console.log("current page: ", newPage);
    
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 flex flex-col items-center py-10">
      <div className="bg-white shadow-md rounded-lg w-11/12 max-w-4xl p-5">
        <div className="text-center text-xl font-semibold mb-5">Transaction Dashboard</div>

        <div className="flex justify-between mb-4">
          <input
            type="text"
            placeholder="Search transaction"
            className="border border-gray-300 rounded-md px-3 py-2 w-1/3"
            value={search}
            onChange={handleSearchChange}
          />
          <div className="relative">
            <select
              className="border border-gray-300 rounded-md px-3 py-2"
              value={month}
              onChange={handleMonthChange}
            >
              <option value="1">January</option>
              <option value="2">February</option>
              <option value="3">March</option>
              <option value="4">April</option>
              <option value="5">May</option>
              <option value="6">June</option>
              <option value="7">July</option>
              <option value="8">August</option>
              <option value="9">September</option>
              <option value="10">October</option>
              <option value="11">November</option>
              <option value="12">December</option>
            </select>
          </div>
        </div>

        <table className="min-w-full bg-yellow-200 rounded-lg">
          <thead>
            <tr className="text-left text-gray-700">
              <th className="py-2 px-4">ID</th>
              <th className="py-2 px-4">Title</th>
              <th className="py-2 px-4">Description</th>
              <th className="py-2 px-4">Price</th>
              <th className="py-2 px-4">Category</th>
              <th className="py-2 px-4">Sold</th>
              <th className="py-2 px-4">Image</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td className="py-2 px-4">{transaction.id}</td>
                <td className="py-2 px-4">{transaction.title}</td>
                <td className="py-2 px-4">{transaction.description}</td>
                <td className="py-2 px-4">${transaction.price}</td>
                <td className="py-2 px-4">{transaction.category}</td>
                <td className="py-2 px-4">{transaction.sold ? 'Yes' : 'No'}</td>
                <td className="py-2 px-4">
                  <img src={transaction.image} alt={transaction.title} className="w-12 h-12 object-cover" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-between mt-4 text-gray-700">
          <button
            onClick={() => handlePageChange(page - 1)}
            className="text-gray-500"
            disabled={page <= 1}
          >
            Previous
          </button>
          <div>Page No: {page}</div>
          <button
            onClick={() => handlePageChange(page + 1)}
            className="text-gray-500"
            disabled={page >= totalPages}
          >
            Next
          </button>
          <div>Per Page: {perPage}</div>
        </div>
      </div>
    </div>
  );
};

export default TransactionTable;
