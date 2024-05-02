"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainApp = void 0;
const todoRouter_1 = __importDefault(require("./Router/todoRouter"));
const mainApp = (app) => {
    try {
        app.use("/api", todoRouter_1.default);
        app.get("/", (req, res) => {
            res.status(200).json({
                msg: "todo success default Api🧨🎁🧨",
            });
        });
    }
    catch (error) {
        return error;
    }
};
exports.mainApp = mainApp;
