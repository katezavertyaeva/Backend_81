// writing - соединим все наши независимые слои

import { Router } from "express";
import { DrizzleRepository, InMemoryRepository } from "./todo.repository";
import { TodoService } from "./todo.service";
import { TodoController } from "./todo.controllers";
import { createTodoRouter } from "./todo.router";

export function buildTodoRouter(): Router {
  // const repo = new InMemoryRepository();
    const repo = new DrizzleRepository();
  const service = new TodoService(repo);
  const controller = new TodoController(service);

  return createTodoRouter(controller);
}
