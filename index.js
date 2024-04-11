const express = require("express");
const app = express();

const port = 8080;

app.listen(port, () => {
    console.log(`app is listing on port ${port}`);
})

app.get("/", (req, res) => {
    res.send("hehe. meow");
})

app.get("/:username/:id", (req, res) => {
    let {username, id} = req.params;
    let html = `<h1> hehe. I see a user with id ${id}`;
    res.send(html);
})

app.get("/search", (req, res) => {
    let {q} = req.query;
    if(!q) {
        res.send("kuch toh search kar leta bhai!!");
    }
    res.send(`<h1>dekh lete h query ko : ${q} </h1>`);
})