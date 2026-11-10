import express from "express";
import { auth } from "../middleware/auth.js";
import { validateMiddleware } from "../middleware/validate.js";
import { insertTodoSchema, updateTodoSchema } from "../schema.js";
import { roleBasedAccess } from "../middleware/roleBasedAccess.js";

export const todosRouter = express.Router();

const todos = [
  { id: 1, text: "make lunch", done: true },
  { id: 2, text: "go to the gym", done: false },
  { id: 3, text: "fix presentation", done: false },
];

todosRouter.get("/", auth, (req, res) => {
  res.json(todos);
});

todosRouter.get("/:id", auth, roleBasedAccess("admin"), (req, res) => {
  const todo_id = req.params.id;

  const data = todos.find((x) => x.id == todo_id);

  if (data) {
    res.json(data);
  } else {
    res.status(404).json({
      message: "todo not found",
    });
  }
});

todosRouter.post(
  "/",
  auth,
  roleBasedAccess("customer"),
  validateMiddleware(insertTodoSchema),
  (req, res) => {
    /// get data from body ✅
    /// validate data ✅
    /// presist data ✅

    // if (!body.text || body.text.length < 2) {
    //   res.status(422).json({
    //     message: "text is requried and should be at least 2 characters",
    //   });
    // }
    req.user

    todos.push({ ...req.body, id: randomId() });
    res.json(req.body);
  },
);

todosRouter.put(
  "/:todo_id",
  validateMiddleware(updateTodoSchema),
  (req, res) => {
    /// get id from params ✅
    /// get data from data layer ✅
    /// get data from body
    /// validate data
    /// presist data

    const todo_id = req.params.todo_id;

    const todo_from_data = todos.findIndex((x) => x.id == todo_id);

    if (todo_from_data == -1) {
      return res.status(404).json({
        message: `todo ${todo_id} not found`,
      });
    }

    todos[todo_from_data] = { ...todos[todo_from_data], ...req.body };
    res.json(req.body);
  },
);

todosRouter.delete("/:todo_id", (req, res) => {
  const todo_id = req.params.todo_id;
  const todo_from_data = todos.findIndex((x) => x.id == todo_id);

  if (todo_from_data == -1) {
    return res.status(404).json({
      message: `todo ${todo_id} not found`,
    });
  }

  todos.splice(todo_from_data, 1);

  res.status(204).end();
});
