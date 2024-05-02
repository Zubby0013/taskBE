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
exports.getAllCombine = exports.deleteTodo = exports.getAll = exports.createTodoDone = exports.createTodoProgress = exports.createTodo = void 0;
const todoModel_1 = __importDefault(require("../Model/todoModel"));
const createTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title } = req.body;
        const createTask = yield todoModel_1.default.create({ title });
        return res.status(201).json({
            msg: "Created new todo successfully",
            data: createTask,
        });
    }
    catch (error) {
        return res.status(404).json({
            msg: "Error creating new todo",
        });
    }
});
exports.createTodo = createTodo;
const createTodoProgress = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { taskID } = req.params;
        const { title } = req.body;
        const createTask = yield todoModel_1.default.findByIdAndUpdate(taskID, { progress: true }, { new: true });
        return res.status(201).json({
            msg: "Created new todo successfully",
            data: createTask,
        });
    }
    catch (error) {
        return res.status(404).json({
            msg: "Error creating new todo",
        });
    }
});
exports.createTodoProgress = createTodoProgress;
const createTodoDone = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { taskID } = req.params;
        const { title } = req.body;
        const findTask = yield todoModel_1.default.findById(taskID);
        if (findTask === null || findTask === void 0 ? void 0 : findTask.progress) {
            const createTask = yield todoModel_1.default.findByIdAndUpdate(taskID, { done: true }, { new: true });
            return res.status(201).json({
                msg: "Created new todo successfully",
                data: createTask,
            });
        }
        else {
            return res.status(404).json({
                msg: "progress must be true",
            });
        }
    }
    catch (error) {
        return res.status(404).json({
            msg: "error creating done",
        });
    }
});
exports.createTodoDone = createTodoDone;
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getTasks = yield todoModel_1.default.find();
        return res.status(201).json({
            msg: "Created new todo successfully",
            data: getTasks,
        });
    }
    catch (error) {
        return res.status(404).json({
            msg: "Error creating new todo",
        });
    }
});
exports.getAll = getAll;
const deleteTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { taskID } = req.params;
        const getTasks = yield todoModel_1.default.findByIdAndDelete(taskID);
        return res.status(201).json({
            msg: " todo deleted successfully",
            data: getTasks,
        });
    }
    catch (error) {
        return res.status(404).json({
            msg: "Error deleting  todo",
        });
    }
});
exports.deleteTodo = deleteTodo;
const getAllCombine = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getTasks = yield todoModel_1.default.find();
        const getAllTask = getTasks.filter((el) => {
            return el.progress === false && el.done === false;
        });
        const getAllProgress = getTasks.filter((el) => {
            return el.progress === true && el.done === false;
        });
        const getAllDone = getTasks.filter((el) => {
            return el.progress === true && el.done === true;
        });
        let data = {
            task: getAllTask,
            progress: getAllProgress,
            done: getAllDone
        };
        return res.status(201).json({
            msg: "Todo task gotten successfully",
            data: data,
        });
    }
    catch (error) {
        return res.status(404).json({
            msg: "Error creating new todo",
        });
    }
});
exports.getAllCombine = getAllCombine;
