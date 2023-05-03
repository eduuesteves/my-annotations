"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/server.ts
var import_config2 = require("dotenv/config");
var import_express = __toESM(require("express"));
var import_cors = __toESM(require("cors"));

// src/database/connection.ts
var import_config = require("dotenv/config");
var import_promise = require("mysql2/promise");
var connection = (0, import_promise.createPool)({
  host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  port: parseInt(`${process.env.MYSQLPORT}`),
  database: process.env.MYSQLDATABASE
});

// src/server.ts
var app = (0, import_express.default)();
var connect = connection;
app.use(import_express.default.json());
app.use(import_express.default.urlencoded({ extended: true }));
app.use((0, import_cors.default)());
app.get("/all-users", async (req, res) => {
  const { email, password } = req.body;
  const query = "SELECT * FROM users";
  const all_users = await connect.query(query);
  res.json(all_users[0]);
});
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const query = "SELECT * FROM users WHERE email = ? AND password = ?";
  const login = await connect.query(query, [email, password]);
  res.json(login[0]);
});
app.post("/add-user", async (req, res) => {
  const { name, email, password, url_photo } = req.body;
  const query = "INSERT INTO users (name, email, password, url_photo) VALUES (?, ?, ?, ?)";
  const new_user = await connect.query(query, [name, email, password, url_photo]);
  res.json(new_user[0]);
});
app.put("/modify-user", async (req, res) => {
  const { name, email, password, url_photo } = req.body;
  const verify = "SELECT * FROM users WHERE email = ? AND password = ?";
  const login = await connect.query(verify, [email, password]);
  if (login[0]) {
    const modify = "UPDATE users SET name = ?, url_photo = ?";
    const user_modify = await connect.query(modify, [name, url_photo]);
    res.json(user_modify[0]);
  }
});
app.patch("/modify-user-password", async (req, res) => {
  const { email, password } = req.body;
  const verify = "SELECT * FROM users WHERE email = ? AND password = ?";
  const login = await connect.query(verify, [email, password]);
  if (login[0]) {
    const modify = "UPDATE users SET password = ?";
    const user_modify = await connect.query(modify, [password]);
    res.json(user_modify[0]);
  }
});
app.get("/create-users", async (req, res) => {
  const query = "CREATE TABLE IF NOT EXISTS users (`id_users` INT NOT NULL AUTO_INCREMENT, `name` VARCHAR(50), `email` VARCHAR(50), `password` VARCHAR(8), `url_photo` VARCHAR(150), PRIMARY KEY (`id_users`))";
  const created = await connect.query(query);
  res.json(created);
});
app.post("/all-tasks", async (req, res) => {
  const { email } = req.body;
  const query = "SELECT * FROM tasks WHERE email = ?";
  const all_tasks = await connect.query(query, [email]);
  res.json(all_tasks[0]);
});
app.post("/add-task", async (req, res) => {
  const { email, tasks, color_text, background, overline } = req.body;
  const query = "INSERT INTO tasks (email, tasks, color_text, background, overline) VALUES (?, ?, ?, ?, ?)";
  const new_task = await connect.query(query, [email, tasks, color_text, background, overline]);
  res.json(new_task[0]);
});
app.put("/modify-tasks", async (req, res) => {
  const { id_tasks, tasks, color_text, background, overline } = req.body;
  const verify = "SELECT * FROM tasks WHERE id_tasks = ?";
  const modify = await connect.query(verify, [id_tasks]);
  if (modify[0]) {
    const query = "UPDATE tasks SET tasks = ?, color_text = ?, background = ?, overline = ?";
    const task_modify = await connect.query(query, [tasks, color_text, background, overline]);
    res.send(task_modify[0]);
  }
});
app.get("/create-tasks", async (req, res) => {
  const query = "CREATE TABLE IF NOT EXISTS tasks (`id_tasks` INT NOT NULL AUTO_INCREMENT, `email` VARCHAR(50), tasks VARCHAR(200), color_text VARCHAR(6), background VARCHAR(6), overline VARCHAR(1), PRIMARY KEY (`id_tasks`))";
  const created = await connect.query(query);
  res.json(created);
});
app.listen(process.env.PORT || 4001, () => {
  console.log("Server ir running ");
});
