import express from "express";
import postsRouter from "./modules/posts/routes/posts.rotes";

const app = express();

app.use(express.json());

app.get("/helth", (_req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use("/posts", postsRouter);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT} http://localhost:${PORT}`);
});
