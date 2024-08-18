import express from 'express';
import { getTransactions, initializeDatabase, getStatistics, getBarChart, getPieChartData } from '../controllers/transactionController.js'

const router = express.Router();

router.get('/initialize-database', initializeDatabase);

router.get('/get-transactions', getTransactions);

router.get('/get-statistics', getStatistics);

router.get('/get-barchart', getBarChart);

router.get('/get-piechart', getPieChartData);

// Define other routes here...

export default router;
