"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const connection_1 = require("./database/connection");
const app = (0, express_1.default)();
const connect = connection_1.connection;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
// All users
app.get("/all-users", async (req, res) => {
    const { email, password } = req.body;
    const query = "SELECT * FROM users";
    const all_users = await connect.query(query);
    res.json(all_users[0]);
});
// Login user
app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const query = "SELECT * FROM users WHERE email = ? AND password = ?";
    const login = await connect.query(query, [email, password]);
    res.json(login[0]);
});
// Add user
app.post("/add-user", async (req, res) => {
    const { name, email, password, url_photo } = req.body;
    const query = "INSERT INTO users (name, email, password, url_photo) VALUES (?, ?, ?, ?)";
    const new_user = await connect.query(query, [name, email, password, url_photo]);
    res.json(new_user[0]);
});
// Modify user
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
// Modify user password
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
// Table User
app.get("/create-user", async (req, res) => {
    const query = "CREATE TABLE IF NOT EXISTS users (`id_users` INT NOT NULL AUTO_INCREMENT, `name` VARCHAR(50), `email` VARCHAR(50), `password` VARCHAR(8), `url_photo` VARCHAR(150), PRIMARY KEY (`id_users`))";
    const created = await connect.query(query);
    res.json(created);
});
app.listen(process.env.PORT || 4001, () => {
    console.log("Server ir running ");
});
