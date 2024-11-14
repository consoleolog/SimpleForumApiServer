import { MongoClient } from "mongodb";
import logger from "./logger";


const uri = "mongodb+srv://admin:mongodb!123@cluster0.1o0bw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

let db;

const connectDB = new MongoClient(uri).connect();
// const client = new MongoClient(uri)

// export async function connectDB(){
//     let db ;
//     try {
//         await client.connect();
//         db = await client.db('simple-forum');
//         return db;
//     } finally {
//         await client.close();
//         return;
//     }
//     return db;
// }

export { connectDB }
