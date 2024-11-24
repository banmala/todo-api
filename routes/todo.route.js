import { Router } from "express";
import {
  createTodo,
  deleteTodo,
  getAllTodos,
  getSingleTodo,
  updateTodo,
} from "../controllers/todo.controller.js";

const todoRouter = Router();

todoRouter.route("/").get(getAllTodos).post(createTodo);
todoRouter
  .route("/:id")
  .get(getSingleTodo)
  .patch(updateTodo)
  .delete(deleteTodo);

export default todoRouter;
