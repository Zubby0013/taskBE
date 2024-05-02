"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const express_session_1 = __importDefault(require("express-session"));
const mainApp_1 = require("./mainApp");
const dbConfig_1 = require("./Config/dbConfig");
const connect_mongodb_session_1 = __importDefault(require("connect-mongodb-session"));
dotenv_1.default.config();
const MongoDBStore = (0, connect_mongodb_session_1.default)(express_session_1.default);
const store = new MongoDBStore({
    uri: process.env.MONGO_DB_URL_ONLINE,
    collection: "sessions",
});
const app = (0, express_1.default)();
const port = parseInt(process.env.PORT);
app.use((0, cors_1.default)({ origin: "*" }));
app.use(express_1.default.json());
(0, mainApp_1.mainApp)(app);
app.use((0, helmet_1.default)());
app.use((0, morgan_1.default)("dev"));
app.use((0, express_session_1.default)({
    secret: process.env.SESSION_SECRET,
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
}));
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", process.env.APP_URL_DEPLOY);
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "GET, PUT, PATCH, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
});
const server = app.listen(port, () => __awaiter(void 0, void 0, void 0, function* () {
    console.clear();
    console.log();
    (0, dbConfig_1.dbConfig)();
}));
process.on("uncaughtException", (error) => {
    console.log("uncaughtException: ", error);
    process.exit(1);
});
process.on("unhandledRejection", (reason) => {
    console.log("unhandledRejection: ", reason);
    server.close(() => {
        process.exit(1);
    });
});
