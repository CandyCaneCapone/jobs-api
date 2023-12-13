const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connect = require("./database/connect");
const authRouter = require("./routes/auth");
const jobsRouter = require("./routes/jobs");
const notFound = require("./middlewares/not-found");
const errorHandler = require("./middlewares/error-handler");
const isAuthenticated = require("./middlewares/auth");

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", isAuthenticated, jobsRouter);

app.use(notFound);
app.use(errorHandler);

connect();

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`http://localhost:${port}`));
