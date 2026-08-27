const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4'])
require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
const connectDB = require('./config/db');
connectDB();
const PORT = process.env.PORT;
const adminRoutes = require('./routes/adminRoutes');
const mealRoutes = require('./routes/mealRoutes');
app.use(express.json());

app.use('/api/admins', adminRoutes);
app.use('/api/meals', mealRoutes);



app.listen(PORT, ()=>{
    console.log(`server running on port ${PORT}`);
    
})

