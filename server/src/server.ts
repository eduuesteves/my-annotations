import "dotenv/config";
import express, { Request, Response } from "express";
import cors from "cors";
import { connection } from "./database/connection";

const app = express();
const connect = connection;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// All users
app.get("/all-users", async(req: Request, res:Response) => {
    const { email, password } = req.body;
    const query = "SELECT * FROM users";
    const all_users = await connect.query(query);

    res.json(all_users[0]);
})

// Login user
app.post("/login", async(req: Request, res: Response) => {
    const { email, password } = req.body;

    const query = "SELECT * FROM users WHERE email = ? AND password = ?";
    const login = await connect.query(query, [email, password]);

    res.json(login[0]);
});

// Add user
app.post("/add-user", async(req: Request, res: Response) => {
    const { name, email, password, url_photo } = req.body;

    const query = "INSERT INTO users (name, email, password, url_photo) VALUES (?, ?, ?, ?)";
    const new_user = await connect.query(query, [name, email, password, url_photo]);

    res.json(new_user[0]);
})

// Modify user
app.put("/modify-user", async(req: Request, res: Response) => {
    const { name, email, password, url_photo} = req.body;

    const verify = "SELECT * FROM users WHERE email = ? AND password = ?";
    const login = await connect.query(verify, [email, password]);
    if(login[0]) {
        const modify = "UPDATE users SET name = ?, url_photo = ?";
        const user_modify = await connect.query(modify, [name, url_photo]);

        res.json(user_modify[0]);
    }
});

// Modify user password
app.patch("/modify-user-password", async(req: Request, res: Response) => {
    const { email, password} = req.body;

    const verify = "SELECT * FROM users WHERE email = ? AND password = ?";
    const login = await connect.query(verify, [email, password]);
    if(login[0]) {
        const modify = "UPDATE users SET password = ?";
        const user_modify = await connect.query(modify, [password]);

        res.json(user_modify[0]);
    }
});


// Table User
app.get("/create-user", async(req: Request, res: Response) => {
    const query = "CREATE TABLE IF NOT EXISTS users (`id_users` INT NOT NULL AUTO_INCREMENT, `name` VARCHAR(50), `email` VARCHAR(50), `password` VARCHAR(8), `url_photo` VARCHAR(150), PRIMARY KEY (`id_users`))";
    const created = await connect.query(query);

    res.json(created);
})


app.listen(process.env.PORT || 4001, () => {
    console.log("Server ir running ")
})