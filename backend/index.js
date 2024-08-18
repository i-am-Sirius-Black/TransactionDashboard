import express from 'express';
import connectDB from './config/db.js'
import cors from 'cors'
import dotenv from "dotenv";

import transactionRoutes from './routes/transactionRoutes.js'

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.use('/api/transactions', transactionRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
