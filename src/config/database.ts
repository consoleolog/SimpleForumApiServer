import { MongoClient } from "mongodb";
import config from "./config";



const uri = `mongodb+srv://${config.db.username}:${config.db.password}@cluster0.1o0bw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const connectDB = new MongoClient(uri).connect();

export { connectDB }
