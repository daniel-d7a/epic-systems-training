import { eq } from "drizzle-orm";
import { db } from "../db/index.js";
import { sessions, users } from "../db/schema.js";
import { DBError } from "../errors/DBError.js";

export async function auth(req, res, next) {
  const session_id = req.cookies.session_id;

  if (!session_id) {
    return res.status(401).json({
      message: "unauthenticated",
    });
  }

  let result;

  try {
    const data = await db
      .select({
        session_id: sessions.sesssion_id,
        username: users.username,
        email: users.email,
      })
      .from(sessions)
      .innerJoin(users, eq(sessions.userId, users.id))
      .where(eq(sessions.sesssion_id, session_id));
    result = data[0];
  } catch (e) {
    throw new DBError("db error at auth middleware");
  }

  // const result = sessions.find((s) => s.session_id == session_id);

  // const result = await db.query.sessions.findOne({
  //   with: {
  //     users: true
  //   },
  //   where: {
  //     sesssion_id: session_id,
  //   },
  // });

  console.log(result);

  if (!result) {
    return res.status(401).json({
      message: "unauthenticated",
    });
  }

  // req.user = result;

  next();
}
