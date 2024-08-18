import BarChart from "./components/BarChart";
import TransactionStatistics from "./components/TransactionStatistcs";
import TransactionTable from "./components/TransactionTable";
import PieChartStats from "./components/PieChartStats";

function App() {
  return (
    <>
      <div className="container m-auto ">
        <div className="my-5">
          <TransactionTable />
        </div>
        <div className="my-5">
          <TransactionStatistics />
        </div>
        <div className="my-5">
          <BarChart />
        </div>
        <div className="my-5">
          <PieChartStats />
        </div>
      </div>
    </>
  );
}

export default App;
