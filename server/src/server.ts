import "dotenv/config";
import express, { Request, Response } from "express";
import cors from "cors";
import { connection } from "./database/connection";

const app = express();
const connect = connection;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req, res) => {
    res.json({ "teste": "teste" });
})

// Login user
app.post("/login", async(req: Request, res: Response) => {
    const { email, password } = req.body;

    const query = "SELECT * FROM users (email, password) VALUES (?, ?)";

});

// Add user

// Table User
app.get("/create-user", async(req: Request, res: Response) => {
    const query = "CREATE TABLE IF NOT EXISTS users (`id_users` INT NOT NULL AUTO_INCREMENT, `name` VARCHAR(50), `email` VARCHAR(50), `password` VARCHAR(8), `url_photo` VARCHAR(150), PRIMARY KEY (`id_users`))";
    const created = await connect.query(query);

    res.json(created);
})


app.listen(process.env.PORT || 4001, () => {
    console.log("Server ir running ")
})