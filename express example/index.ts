import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import multer from "multer";
import cron from "node-cron";
import crypto from "node:crypto";
import path from "node:path";
import { Worker } from "node:worker_threads";
import logger from "pino-http";
import pretty from "pino-pretty";
import { emailService } from "./email_service.js";
import { env } from "./lib/env.js";
import { authRouter } from "./routers/auth-routes.js";
import { todosRouter } from "./routers/todo-routes.js";

const app = express();

const stream = pretty({
  colorize: true,
});

app.use(
  cors({
    origin: "https://www.website.com",
    credentials: true,
    methods: ["GET", "OPTIONS"],
  }),
);
app.use(express.json());
app.use(cookieParser());

app.use(
  logger({
    genReqId: (req, res) => {
      const id = crypto.randomUUIDv7();
      req.headers["req_id"] = id;
    },
    stream: stream,
  }),
);

// app.use(
//   rateLimit({
//     windowMs: 1000 * 60 * 60,
//     limit: 2,
//   }),
// );

cron.schedule("* * * * *", async () => {
  await emailService();
});

app.use(express.static("public"));

// app.use("/users",(req, res, next) => {
//   console.log("method", req.method);
//   console.log("url", req.url);
//   console.log("headers", req.headers);
//   console.log("cookies", req.cookies);
//   console.log("ip", req.ip);
//   console.log("params", req.params);
//   console.log("query", req.query);

//   next()
// });

app.get("/fast", async (req, res) => {
  res.json("fast done");
});

app.get("/worker", async (req, res) => {
  const worker = new Worker("./worker.js", { workerData: 3_000_000_000_0 });

  worker.once("message", (data) => {
    console.log(data);
    
    res.json(data);
  });
});

app.get("/slow", async (req, res) => {
  for (let i = 0; i < 3_000_000_000_0; i++) {}
  res.json("slow done");
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/");
  },
  filename: function (req, file, cb) {
    const file_id = crypto.randomUUID();
    cb(null, file_id + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

app.post("/upload", upload.single("image"), async (req, res) => {
  console.log(req.file);
  res.end();
});

app.use("/todos", todosRouter);
app.use("/auth", authRouter);

// app.use((req, res) => {
//   res.json({
//     message: "express",
//   });
// });

// app.use((error, req, res, next) => {
//   console.log(error);

//   if (error instanceof DBError) {
//     res.status(500).json({
//       message: "DB error",
//     });
//   }

//   res.status(500).json({
//     message: "server error",
//   });
// });

app.listen(env.PORT, () => {
  console.log(`server running on port ${env.PORT}`);
});

function randomId() {
  return Math.floor(Math.random() * 100000) + 1;
}
