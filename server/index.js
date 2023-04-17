import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './mongoDB/connect.js';
import postRoutes from './routes/postRoutes.js'
import aiRoutes from './routes/aiRoutes.js'


dotenv.config()
const app = express();
app.use(cors());
app.use(express.json({limit: '50mb'}));

// Api endpoints for connecting frontend
app.use('/api/v1/post', postRoutes);
app.use('/api/v1/ai', aiRoutes);

app.get('/', async(req,res) => {            // root route
    res.status(200).json({
        message: 'Hello from DALL.E!',
      });
})

const startServer = async ()=> {
    try{
        connectDB(process.env.MONGODB_URL)
        app.listen(5959, ()=> console.log('Server has started on http://localhost:5959'));
    }
    catch(error){
        console.log(error);
    }
}

startServer();



