import { Request, Response } from "express";
import todoModel, { iProps } from "../Model/todoModel";

export const createTodo = async (
    req: Request,
    res: Response
): Promise<Response> => {
    try {
        const { title } = req.body;

        const createTask = await todoModel.create({ title });

        return res.status(201).json({
            msg: "Created new todo successfully",
            data: createTask,
        });
    } catch (error) {
        return res.status(404).json({
            msg: "Error creating new todo",
        });
    }
};

export const createTodoProgress = async (
    req: Request,
    res: Response
): Promise<Response> => {
    try {
        const { taskID } = req.params;

        const { title } = req.body;

        const createTask = await todoModel.findByIdAndUpdate(
            taskID,
            { progress: true },
            { new: true }
        );

        return res.status(201).json({
            msg: "Created new todo successfully",
            data: createTask,
        });
    } catch (error) {
        return res.status(404).json({
            msg: "Error creating new todo",
        });
    }
};

export const createTodoDone = async (
    req: Request,
    res: Response
): Promise<Response> => {
    try {
        const { taskID } = req.params;

        const { title } = req.body;

        const findTask = await todoModel.findById(taskID);
        if (findTask?.progress) {

            const createTask = await todoModel.findByIdAndUpdate(
                taskID,
                { done: true },
                { new: true }

            );
            return res.status(201).json({
                msg: "Created new todo successfully",
                data: createTask,
            });
        } else {
            return res.status(404).json({
                msg: "progress must be true",
            });
        }


    } catch (error) {
        return res.status(404).json({
            msg: "error creating done",
        });
    }
};

export const getAll = async (
    req: Request,
    res: Response
): Promise<Response> => {
    try {

        const getTasks = await todoModel.find()

        return res.status(201).json({
            msg: "Created new todo successfully",
            data: getTasks,
        });
    } catch (error) {
        return res.status(404).json({
            msg: "Error creating new todo",
        });
    }
};

export const deleteTodo = async (
    req: Request,
    res: Response
): Promise<Response> => {
    try {

        const { taskID } = req.params
        const getTasks = await todoModel.findByIdAndDelete(taskID)

        return res.status(201).json({
            msg: " todo deleted successfully",
            data: getTasks,
        });
    } catch (error) {
        return res.status(404).json({
            msg: "Error deleting  todo",
        });
    }
};

export const getAllCombine = async (
    req: Request,
    res: Response
): Promise<Response> => {
    try {

        const getTasks = await todoModel.find()

        const getAllTask = getTasks.filter((el: iProps) => {
            return el.progress === false && el.done === false
        })

        const getAllProgress = getTasks.filter((el: iProps) => {
            return el.progress === true && el.done === false
        })

        const getAllDone = getTasks.filter((el: iProps) => {
            return el.progress === true && el.done === true
        })

        let data = {
            task: getAllTask,
            progress: getAllProgress,
            done: getAllDone
        }
        return res.status(201).json({
            msg: "Todo task gotten successfully",
            data: data,
        });
    } catch (error) {
        return res.status(404).json({
            msg: "Error creating new todo",
        });
    }
};