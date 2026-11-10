import argon2 from "argon2";
import { eq } from "drizzle-orm";
import express from "express";
import crypto from "node:crypto";
import { db } from "../db/index.js";
import { sessions, users } from "../db/schema.js";
import { validateMiddleware } from "../middleware/validate.js";
import { loginSchema, registerSchema } from "../schema.js";

export const authRouter = express.Router();

authRouter.post(
  "/register",
  validateMiddleware(registerSchema),
  async (req, res) => {
    /// take user data from body
    /// validate

    /// ensure unique email
    // const oldUser = users.findIndex((u) => u.email == req.body.email);
    const [oldUser] = await db
      .select()
      .from(users)
      .where(eq(users.email, req.body.email));

    if (oldUser) {
      res.status(400).json({
        message: "email already exisits",
      });
    }

    /// hash password
    const passwordHash = await argon2.hash(req.body.password);

    /// add to database
    // users.push({
    // email: req.body.email,
    // username: req.body.username,
    // passwordHash: passwordHash,
    // });

    await db.insert(users).values({
      email: req.body.email,
      username: req.body.username,
      passwordHash: passwordHash,
    });

    res.status(201).json({
      message: "user registered successfully",
    });
  },
);

authRouter.post("/login", validateMiddleware(loginSchema), async (req, res) => {
  /// get data from body, validate

  /// get user from database
  // const oldUser = users.find((u) => u.email == req.body.email);
  const [oldUser] = await db
    .select()
    .from(users)
    .where(eq(users.email, req.body.email));

  if (!oldUser) {

    throw new Error()
    // res.status(404).json({
    //   message: "user not found",
    // });
  }

  /// verify user password
  const result = await argon2.verify(oldUser.passwordHash, req.body.password);

  if (!result) {
    res.status(400).json({
      message: "incorrect email or password",
    });
  }

  const session_id = crypto.randomBytes(16).toString("hex");

  // sessions.push({
  //   session_id: session_id,
  //   user: oldUser,
  //   expiresAt: Date.now() + 1000 * 60 * 60 * 24,
  // });

  const expires_at = new Date();
  expires_at.setMonth(expires_at.getMonth() + 1);

  await db.insert(sessions).values({
    sesssion_id: session_id,
    expiresAt: expires_at,
    userId: oldUser.id,
  });

  res.cookie("session_id", session_id, {
    httpOnly: true,
    sameSite: "lax",
    expiresAt: Date.now() + 1000 * 60 * 60 * 24,
  });

  res.status(200).json({
    data: oldUser,
  });
});

authRouter.post("/logout", async (req, res) => {
  const session_id = req.cookies.session_id;

  // const index = sessions.findIndex((s) => s.session_id == session_id);

  const [session] = await db
    .select()
    .from(sessions)
    .where(eq(sessions.sesssion_id, session_id));

  if (!session) {
    res.status(404).json({
      message: "session not found",
    });
  } else {
    // sessions.splice(index, 1);

    await db.delete(session).where(eq(sessions.sesssion_id, session_id));

    res.cookie("session_id", session_id, {
      httpOnly: true,
      sameSite: "lax",
      expiresAt: Date.now() - 1000,
    });

    res.status(204).end();
  }
});
