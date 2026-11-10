import { treeifyError } from "zod";

export function validateMiddleware(schema) {
  
  return function(req, res, next) {
    const body = req.body

    const result = schema.safeParse(body)

    if (!result.success) {
      res.status(422).json(treeifyError(result.error));
    }

    next()
  }
}

