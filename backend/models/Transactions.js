import mongoose  from 'mongoose'

const TransactionSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    category: String,
    dateOfSale: Date,
    sold: Boolean,
});

const Transaction = mongoose.model('Transaction', TransactionSchema);
export default Transaction;