import express from 'express';
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import autoRoutes from "./routes/auth.js";
import messageRoutes from "./routes/messages.js";
import connectToMongoDB from './db/connectMongoDB.js';


const app = express();
const PORT = process.env.PORT || 5000;

dotenv.config();

app.use(express.json()); // to parse incoming request with json format
app.use(cookieParser()); //


app.use("/api/auth", autoRoutes);
app.use("/api/messages", messageRoutes);



app.listen(PORT, () => {
	connectToMongoDB();
	console.log(`server listening on ${PORT}`)
});