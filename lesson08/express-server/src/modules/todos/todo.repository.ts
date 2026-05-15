import { db } from "../../db";
import { todos } from "../../db/schema";
import { Todo, TodoRepository } from "./todo.entity";
import { v7 } from "uuid";

// Drizzle
export class DrizzleRepository implements TodoRepository {
  async findAll(): Promise<Todo[]> {
    return await db.select().from(todos);
  }

  async create(title: string): Promise<Todo> {
    const newTodo = {
      title,
      done: false,
    };

    const [todo] = await db.insert(todos).values(newTodo).returning()
    return todo
  }
}

// Working with DB
export class InMemoryRepository implements TodoRepository {
  private store: Map<string, Todo> = new Map();

  async findAll(): Promise<Todo[]> {
    return Array.from(this.store.values());
  }

  async create(title: string): Promise<Todo> {
    const todo: Todo = {
      id: v7(),
      title,
      done: false,
      createdAt: new Date(),
    };

    this.store.set(todo.id, todo);
    return todo;
  }
}

// findAll, create, update, findById, delete