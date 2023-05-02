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
app.get("/", (req, res) => {
    res.json({ "teste": "teste" });
});
// Login user
app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const query = "SELECT * FROM users (email, password) VALUES (?, ?)";
});
// Add user
// Table User
app.get("/create-user", async (req, res) => {
    const query = "CREATE TABLE IF NOT EXISTS users (`id_users` INT NOT NULL AUTO_INCREMENT, `name` VARCHAR(50), `email` VARCHAR(50), `password` VARCHAR(8), `url_photo` VARCHAR(150), PRIMARY KEY (`id_users`))";
    const created = await connect.query(query);
    res.json(created);
});
app.listen(process.env.PORT || 4001, () => {
    console.log("Server ir running ");
});
