const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4'])
require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
connectDB();
const app = express();
const PORT = process.env.PORT;
const adminRoutes = require('./routes/adminRoutes');
app.use(express.json());

app.use('/api/admins', adminRoutes);


app.listen(PORT, ()=>{
    console.log(`server running on port ${PORT}`);
    
})

