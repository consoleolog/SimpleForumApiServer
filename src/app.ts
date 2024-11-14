import express from "express";
import routes from "./routes/v1/index"

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/v1', routes);

export default app;