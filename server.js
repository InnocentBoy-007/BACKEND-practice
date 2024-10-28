import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { connectDatabase } from './database.js'
import route from './route.js'

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/app", route);

const PORT = process.env.PORT;

const connectServer = async() => {
    try {
        await connectDatabase();
        app.listen(PORT || 5000, `0.0.0.0`,()=> {
            console.log(`Server listening at port ${PORT}`);
        })
        console.log("Server setup successfully!");

    } catch (error) {
        console.log(`Error setting up a server: ${error}`);
    }
}

connectServer();
