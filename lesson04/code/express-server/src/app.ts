import express from "express";
import postsRouter from "./modules/posts/routes/posts.routes";
import todosRouter from "./modules/todos/routes/todos.routes"

const app = express();

app.use(express.json());

app.get("/helth", (_req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use("/posts", postsRouter);
app.use("/todos", todosRouter);

export default app;