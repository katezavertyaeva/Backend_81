import { Router } from "express";
import { Todo } from "../todos.types";
import { v7 } from "uuid";

const router = Router();

const todos: Todo[] = [
  {
    id: v7(),
    title: "Learn express",
    content: "Build a REST API",
    status: "pending",
    createdAd: new Date().toISOString(),
  },
  {
    id: v7(),
    title: "Learn Nest",
    content: "Build a Nest app",
    status: "pending",
    createdAd: new Date().toISOString(),
  },
];

// GET /todos - Получение всего списка дел
router.get("/", (_req, res) => {
  res.status(200).json(todos);
});

// GET /todos/:id - Получение определенного пункта списка дел по id
router.get("/:id", (req, res) => {
  const { id } = req.params;

  const todo = todos.find((todo) => todo.id === id);

  if (!todo) {
    res.status(404).json({ error: `Todo item with id ${id} not found` });
  }

  res.status(200).json(todo);
});

// POST /todos - Создание нового пункта списка дел
router.post("/", (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    res.status(400).json({ error: "Title and content are required" });
  }

  const newTodo: Todo = {
    id: v7(),
    title,
    content,
    status: "pending", // по умолчанию
    createdAd: new Date().toISOString(),
  };

  todos.push(newTodo);

  res.status(201).json({ message: "New Todo item is created", id: newTodo.id });
});

export default router;
