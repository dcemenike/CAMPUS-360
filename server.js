const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4'])

require('dotenv').config();

const express = require('express');
const app = express();
const helmet = require('helmet');
const cors = require('cors');

app.use(helmet());
app.use(cors());

const connectDB = require('./config/db');
connectDB();
const PORT = process.env.PORT;
const adminRoutes = require('./routes/adminRoutes');
const mealRoutes = require('./routes/mealRoutes');

const corsOptions = {
    origin: ['https://campus360restaurant.vercel.app', 'http://localhost:5173'],
    credentials: true,

}

app.use(cors(corsOptions));
app.use(express.json());    
app.use('/api/admins', adminRoutes);
app.use('/api/meals', mealRoutes);



app.listen(PORT, ()=>{
    console.log(`server running on port ${PORT}`);
    
})

