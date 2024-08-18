import React, { useEffect, useState } from 'react';
import { CChartBar } from '@coreui/react-chartjs';
import axios from 'axios'

const BarChart = () => {
    const[month, setMonth] = useState(3);
    const[fetchedData, setFetchedData] = useState([]);

    useEffect(() =>{
        const fetchBar = async () =>{
            try {
                const response = await axios.get(`http://localhost:3000/api/transactions/get-barchart?month=${month}`)
                
                setFetchedData(response.data)
                console.log("response chart: ", response.data);
            } catch (error) {
                console.log("error in bar chat api call");   
            }
        }
        fetchBar();
    },[month])

  // Extract labels and data from API response
  const labels = fetchedData.map(item => item.range);
  const data = fetchedData.map(item => item.count);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: '',
        backgroundColor: '#00c9a7',
        data: data,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        max: 8, // Set the maximum value for the y-axis
        ticks: {
          stepSize: 1, // Set the step size for y-axis ticks
        },
      },
    },
  };

  const handleMonthChange = (event) => {
    setMonth(event.target.value);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
    <div className='relative flex justify-center gap-2'>
      <h2 className="text-2xl font-semibold text-center mb-4">{`Bar Chart Stats - ${ new Date(0, month - 1).toLocaleString('default', { month: 'long' }) }`}</h2>
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
      <CChartBar
        data={chartData}
        options={options}
        style={{ height: '400px' }}
      />
    </div>
  );
};

export default BarChart;
