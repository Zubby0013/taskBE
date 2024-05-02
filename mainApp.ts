import { Application, Request, Response } from "express";
import todo from "./Router/todoRouter"

export const mainApp = (app: Application) => {
    try {
        app.use("/api", todo)
        app.get("/", (req: Request, res: Response) => {
            res.status(200).json({
                msg: "todo success default Api🧨🎁🧨",
            });
        });
    } catch (error) {
        return error
    }
}