import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";

import connectDB from "./mongodb/connect.js";
import userRouter from "./routes/user.routes.js";
import propertyRouter from "./routes/property.routes.js";
import customersRouter from "./routes/customers.routes.js"
import authRoute from './routes/auth.js'
import passport from "passport";
import cookieSession from "cookie-session";

dotenv.config();

const app = express();
app.use(
    cookieSession({
        name: 'session',
        keys:["cyberwolve"],
        maxAge: 24*60*60*100
    })
);
app.use(cors({
    origin: ["http://localhost:3000", "http://localhost:3001"],
    methods: "GET,POST,PUT,DELETE",
    credentials: true
  }));


app.use(express.json({ limit: "50mb" }));
app.use("/api/v1/auth", authRoute);
app.get("/", (req, res) => {
    res.send({ message: "Backend Test" });
});

app.use("/api/v1/users", userRouter);
app.use("/api/v1/products", propertyRouter);
app.use("/api/v1/customers", customersRouter);

const startServer = async () => {
    try {
        connectDB(process.env.MONGODB_URL);

        app.listen(8080, () =>
            console.log("Server started on port http://localhost:8080"),
        );
    } catch (error) {
        console.log(error);
    }
};

startServer();
