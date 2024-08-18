import { PieChart } from "@mui/x-charts/PieChart";
import axios from "axios";
import { useEffect, useState } from "react";

const PieChartStats = () => {
  const [month, setMonth] = useState(3);
  const [pieData, setPieData] = useState([]);

  useEffect(()=>{
    const fetchPie = async() =>{
      try {
        const response = await axios.get(`http://localhost:3000/api/transactions/get-piechart?month=${month}`)
        setPieData(response.data);
        console.log("pie_data: ",response.data);
        
      } catch (error) {
        console.log("error in piechart ", error);
      }
    }
    fetchPie();
  },[month])

  const handleMonthChange = (event) => {
    setMonth(event.target.value);
  };

  return (
    <>
    <div className="container">
      <div>
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
      <PieChart
                series={[
                  {
                    data: pieData.map((item, index) => ({
                      id: index,
                      value: item.count,
                      label: item.category,
                    })),
                  },
                ]}
                width={800}
                height={400}
      />
      </div>
    </>
  );
};

export default PieChartStats;
