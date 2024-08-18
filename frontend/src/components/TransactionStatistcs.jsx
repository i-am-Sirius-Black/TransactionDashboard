import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TransactionStatistics = () => {

    const [month, setMonth] = useState('3');
    const [statistics, setStatistics] = useState({
        totalSaleAmount: 0,
        soldItems: 0,
        notSoldItems: 0
    });
  
    useEffect(() => {
        // Fetch data when the month changes
        const fetchStatistics = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/transactions/get-statistics?month=${month}`);
                setStatistics(response.data);
                // console.log("response: ", response.data);
                
            } catch (error) {
                console.error('Failed to fetch statistics:', error);
            }
        };

        fetchStatistics();
    }, [month]);

    const handleMonthChange = (event) => {
        setMonth(event.target.value);
    };

    return (
        <div className="flex flex-col items-center bg-blue-100 p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">Statistics - {new Date(0, month - 1).toLocaleString('default', { month: 'long' })}</h2>

            <div className="bg-yellow-200 p-4 rounded-lg shadow-md w-64">
                <div className="flex justify-between mb-2">
                    <span>Total sale:</span>
                    <span>{statistics.totalSaleAmount}</span>
                </div>
                <div className="flex justify-between mb-2">
                    <span>Total sold items:</span>
                    <span>{statistics.soldItems}</span>
                </div>
                <div className="flex justify-between">
                    <span>Total not sold items:</span>
                    <span>{statistics.notSoldItems}</span>
                </div>
            </div>

            <div className="mt-4">
                <label htmlFor="month" className="mr-2">Select Month:</label>
                <select id="month" value={month} onChange={handleMonthChange} className="border rounded p-2">
                    {Array.from({ length: 12 }, (_, i) => (
                        <option key={i + 1} value={i + 1}>
                            {new Date(0, i).toLocaleString('default', { month: 'long' })}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default TransactionStatistics;
