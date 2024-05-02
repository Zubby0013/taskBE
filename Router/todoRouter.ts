import { Router } from "express";
import { createTodo, createTodoDone, createTodoProgress, deleteTodo, getAll, getAllCombine } from "../Controller/todoController";

const router: Router = Router();

router.route('/create-todo').post(createTodo)
router.route('/create-todo-progress/:taskID').patch(createTodoProgress)
router.route('/create-todo-done/:taskID').patch(createTodoDone)
router.route('/get-all').get(getAll)
router.route('/delete-todo/:taskID').delete(deleteTodo)
router.route('/get-combine').get(getAllCombine)

export default router;