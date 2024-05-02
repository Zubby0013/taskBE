import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import { Server, IncomingMessage, ServerResponse } from "http";
import { connect } from "mongoose";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";

import session from "express-session";
import { mainApp } from "./mainApp";
import { dbConfig } from "./Config/dbConfig";
import MongoDB from "connect-mongodb-session";
dotenv.config();

const MongoDBStore = MongoDB(session);
const store = new MongoDBStore({
    uri: process.env.MONGO_DB_URL_ONLINE!,
    collection: "sessions",
});

const app: Application = express();

const port: number = parseInt(process.env.PORT!);

app.use(cors({ origin: "*" }));
app.use(express.json());

mainApp(app);
app.use(helmet());
app.use(morgan("dev"));

app.use(
    session({
        secret: process.env.SESSION_SECRET!,
        resave: false,
        saveUninitialized: false,

        cookie: {
            maxAge: 1000 * 60 * 24 * 60,
            // sameSite: "lax",
            // secure: false,
            httpOnly: true,
            // domain: process.env.APP_URL_DEPLOY,
        },

        store,
    })
);

app.use((req: Request, res: Response, next: NextFunction) => {
    res.header("Access-Control-Allow-Origin", process.env.APP_URL_DEPLOY);
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "GET, PUT, PATCH, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
});

const server: Server<typeof IncomingMessage, typeof ServerResponse> =
    app.listen(port, async () => {
        console.clear();
        console.log()
        dbConfig();
    });

process.on("uncaughtException", (error: Error) => {
    console.log("uncaughtException: ", error);
    process.exit(1);
});

process.on("unhandledRejection", (reason: any) => {
    console.log("unhandledRejection: ", reason);

    server.close(() => {
        process.exit(1);
    });
});

