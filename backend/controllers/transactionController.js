import Transaction from '../models/Transactions.js';
import axios from 'axios';

export const initializeDatabase = async (req, res) => {
    try {
        // Check if there are already transactions in the database
        const existingTransactions = await Transaction.find();
        
        if (existingTransactions.length > 0) {
            return res.status(400).json({ message: 'Database is already initialized' });
        }

        // Fetch data from the external API
        const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');

        // Insert the data into the database
        await Transaction.insertMany(response.data);
        res.status(200).send('Database initialized');
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


export const getTransactions = async (req, res) => {
    const { page = 1, perPage = 10, search = '', month } = req.query;

    try {
        let query = {};

        // Handle search parameter
        if (search) {
            const searchRegex = new RegExp(search, 'i'); // Case-insensitive search
            query.$or = [
                { title: { $regex: searchRegex } },
                { description: { $regex: searchRegex } }
            ];
            if (!isNaN(search)) {
                query.$or.push({ price: parseFloat(search) });
            }
        }

        // Handle month filter
        if (month) {
            query.$expr = {
                $eq: [{ $month: "$dateOfSale" }, parseInt(month)]
            };
        }

        const count = await Transaction.countDocuments(query);

        // Pagination logic
        const skip = (parseInt(page) - 1) * parseInt(perPage);
        const transactions = await Transaction.find(query)
            .skip(skip)
            .limit(parseInt(perPage));
        res.status(200).json({
            transactions,
            count,
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


export const getStatistics = async (req, res) =>{
    try {
        const { month } = req.query;
        if (!month) {
            return res.status(400).json({ message: 'Month is required' });
        }
        
        const transactions = await Transaction.find({
            $expr: {
                $eq: [{ $month: "$dateOfSale" }, month]
            }
            
        });
        

        let totalSaleAmount = 0;
        let soldItems = 0;
        let notSoldItems = 0;

        transactions.forEach(transaction => {
            totalSaleAmount += transaction.price;
            if (transaction.sold) {
                soldItems += 1;
            } else {
                notSoldItems += 1;
            }
        });

        res.status(200).json({
            totalSaleAmount,
            soldItems,
            notSoldItems
        });

    } catch (err) {
        res.status(500).json({ message: err.message });
        console.log("check error in controller statistics");
        
    }
}

export const getBarChart = async (req, res) =>{
    try {
        const { month } = req.query;
        if (!month) {
            return res.status(400).json({ message: 'Month is required' });
        }
        
        const transactions = await Transaction.find({
            $expr: {
                $eq: [{ $month: "$dateOfSale" }, month]
            }
            
        });
        

        // Define price ranges
        const priceRanges = [
            { range: '0 - 100', count: 0 },
            { range: '101 - 200', count: 0 },
            { range: '201 - 300', count: 0 },
            { range: '301 - 400', count: 0 },
            { range: '401 - 500', count: 0 },
            { range: '501 - 600', count: 0 },
            { range: '601 - 700', count: 0 },
            { range: '701 - 800', count: 0 },
            { range: '801 - 900', count: 0 },
            { range: '901 and above', count: 0 }
        ];

        // Categorize transactions by price range
        transactions.forEach(transaction => {
            const price = transaction.price;

            if (price <= 100) priceRanges[0].count++;
            else if (price <= 200) priceRanges[1].count++;
            else if (price <= 300) priceRanges[2].count++;
            else if (price <= 400) priceRanges[3].count++;
            else if (price <= 500) priceRanges[4].count++;
            else if (price <= 600) priceRanges[5].count++;
            else if (price <= 700) priceRanges[6].count++;
            else if (price <= 800) priceRanges[7].count++;
            else if (price <= 900) priceRanges[8].count++;
            else priceRanges[9].count++;
        });

        // Respond with the price range data
        res.status(200).json(priceRanges);

    } catch (err) {
        res.status(500).json({ message: err.message });
        console.log("check error in controller statistics");
        
    }
}


// Controller to get data for Pie Chart
export const getPieChartData = async (req, res) => {
    try {
        const { month } = req.query;

        if (!month) {
            return res.status(400).json({ message: 'Month is required' });
        }

        // Use aggregation to group by category and count items in each category for the selected month
        const pieChartData = await Transaction.aggregate([
            {
                $match: {
                    $expr: {
                        $eq: [{ $month: "$dateOfSale" }, parseInt(month)]
                    }
                }
            },
            {
                $group: {
                    _id: "$category",
                    count: { $sum: 1 }
                }
            },
            {
                $project: {
                    _id: 0,
                    category: "$_id",
                    count: 1
                }
            }
        ]);

        res.status(200).json(pieChartData);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


// Define other API functions here...
