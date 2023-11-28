const express = require("express");
const pg = require("pg");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const port = 8080;

//middleware
    //cors allows data fetch from external servers
app.use(cors());
    //below allows clinte side data fetch in form of json
app.use(express.json());
    //below allow us to parse through body from client side
app.use(bodyParser.urlencoded({ extended: true }));

let notes = [];

const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "NoteUp",
    password:"a",
    port: 5432,
});

db.connect();

app.get("/", async (req,res)=>{
    try{
        const result = await db.query("SELECT * FROM notes;");
        notes = result.rows;
        res.json(notes);
    } catch (e) {
        console.error(e);
    }
});

app.post("/add", async (req,res)=>{

    const {title, content} = req.body;

    try {
        const result = await db.query("INSERT INTO notes (title, content) VALUES ($1, $2) RETURNING *;",
                                        [title, content]
                                    );
        res.json(result.rows);
    } catch (e) {
        console.error(e);
    }
});

app.put ("/edit/:id", (req,res) => {

    console.log ("EDITING!!!");
    const {id} = req.params;
    console.log(id);
    const {title, content} = req.body;


    try {
        const result = db.query("UPDATE notes SET title = COALESCE($1, title), content = COALESCE($2, content) WHERE id=$3 RETURNING *;",
                            [title, content, id]
                        );
        res.json(result.rows);
    } catch (e) {
        console.error(e);
    }
});

app.delete("/delete/:id", async (req,res)=> {

    const {id} = req.params;

    try {
        const result = await db.query("DELETE FROM notes WHERE id = $1 RETURNING *;", [id]);
        res.json(result.rows);
    } catch (e) {
        console.error(e);
    }
});

app.listen(port,()=>{

    console.log(`Listening to port: ${port}`);
});