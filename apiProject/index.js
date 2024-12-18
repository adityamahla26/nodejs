require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT;
const users = require("./MOCK_DATA.json")

app.get("/users",(req,res)=>{
    const html = `
    <ul>
    ${users.map(({id,first_name,last_name,email,gender,job_title})=>`<li key=${id}>${first_name}</li>`).join("")}
    </ul>
    `
    res.send(html);
})

app.get("/api/users",(req,res)=>{
    return res.json(users)
})

app.get("/api/users/:id",(req,res)=>{
    const id = Number(req.params.id);
    const user = users.find((user)=>user.id === id);
    res.json(user);
})

app.post("/api/users/create",(req,res)=>{
    res.send("New user created")
})

app.patch("/api/users/:id",(req,res)=>{
    const id  = req.params.id;
    res.send(`user ${id} updated`)
})

app.delete("/api/users/:id",(req,res)=>{
    const id = req.params.id;
    res.send(`uer ${id} deleted`)
})

app.listen(port,()=>{
    console.log(`app is listening at port ${port}`)
})