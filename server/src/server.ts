import "dotenv/config";
import express, { Request, Response } from "express";
import cors from "cors";
import { connection } from "./database/connection";

const app = express();
const connect = connection;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

/** Users */

// All users
app.get("/all-users", async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const query = "SELECT * FROM users";
    const all_users = await connect.query(query);

    res.json(all_users[0]);
});

// Login user
app.post("/login", async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const query = "SELECT * FROM users WHERE email = ? AND password = ?";
    const login = await connect.query(query, [email, password]);

    res.json(login[0]);
});

// Add user
app.post("/add-user", async (req: Request, res: Response) => {
    const { name, email, password, url_photo } = req.body;

    const query = "INSERT INTO users (name, email, password, url_photo) VALUES (?, ?, ?, ?)";
    const new_user = await connect.query(query, [name, email, password, url_photo]);

    res.json(new_user[0]);
});

// Modify user
app.put("/modify-user", async (req: Request, res: Response) => {
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
app.patch("/modify-user-password", async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const verify = "SELECT * FROM users WHERE email = ? AND password = ?";
    const login = await connect.query(verify, [email, password]);
    if (login[0]) {
        const modify = "UPDATE users SET password = ?";
        const user_modify = await connect.query(modify, [password]);

        res.json(user_modify[0]);
    }
});


// Table: Users
app.get("/create-users", async (req: Request, res: Response) => {
    const query = "CREATE TABLE IF NOT EXISTS users (`id_users` INT NOT NULL AUTO_INCREMENT, `name` VARCHAR(50), `email` VARCHAR(50), `password` VARCHAR(8), `url_photo` VARCHAR(150), PRIMARY KEY (`id_users`))";
    const created = await connect.query(query);

    res.json(created);
});

/** Tasks */

// All tasks
app.post("/all-tasks", async (req: Request, res: Response) => {
    const { email } = req.body;

    const query = "SELECT * FROM tasks WHERE email = ?";
    const all_tasks = await connect.query(query, [email]);

    res.json(all_tasks[0]);
});

// Add task
app.post("/add-task", async (req: Request, res: Response) => {
    const { email, tasks, color_text, background, overline } = req.body;

    const query = "INSERT INTO tasks (email, tasks, color_text, background, overline) VALUES (?, ?, ?, ?, ?)";
    const new_task = await connect.query(query, [email, tasks, color_text, background, overline]);

    res.json(new_task[0]);
});

// Modify Task
app.put("/modify-tasks", async(req: Request, res: Response) => {
    const { id_tasks, tasks, color_text, background, overline } = req.body;

    const verify = "SELECT * FROM tasks WHERE id_tasks = ?";
    const modify = await connect.query(verify, [id_tasks]);
    if(modify[0]) {
        const query = "UPDATE tasks SET tasks = ?, color_text = ?, background = ?, overline = ?"
        const task_modify = await connect.query(query, [tasks, color_text, background, overline]);

        res.send(task_modify[0]);
    }
});

// Table: Tasks
app.get("/create-tasks", async (req: Request, res: Response) => {
    const query = "CREATE TABLE IF NOT EXISTS tasks (`id_tasks` INT NOT NULL AUTO_INCREMENT, `email` VARCHAR(50), tasks VARCHAR(200), color_text VARCHAR(6), background VARCHAR(6), overline VARCHAR(1), PRIMARY KEY (`id_tasks`))";
    const created = await connect.query(query);

    res.json(created);
});

app.listen(process.env.PORT || 4001, () => {
    console.log("Server ir running ")
});