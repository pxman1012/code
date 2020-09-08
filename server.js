const express = require("express")
const { render } = require("ejs")
const app = express()
app.set("view engine", "ejs")
app.use(express.urlencoded({ extended: false })) // nhan duoc du lieu trong doi tuong request

const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");

const mongoose = require("mongoose");
// mongoose.connect("mongodb://localhost:27017/Bundesliga", { useNewUrlParser: true });

const users = []

app.get("/login", function (req, res) {
    res.render("login.ejs")
})
app.post("/login", function (req, res) {
    if (req.body.username === "pxman" && req.body.password === "1234") {
        var token = jwt.sign({ author: "PXMAN" }, "ChickenHandsome", { algorithm: "HS256", expiresIn: "15s" })
        res.json({ accessToken: token })
        res.redirect("/home")
    }
    res.render("login.ejs")

})
app.get("/register", function (req, res) {
    res.render("register.ejs")
})
app.post("/register", async function (req, res) {
    console.log(users)
    try {
        // const hashedPass = await bcrypt.hash(req.body.password, 10)
        // users.push({
        //     id: Date.now().toString(),
        //     name: req.body.name,
        //     email: req.body.email,
        //     password: hashedPass
        // })

        res.redirect("/login")
    } catch{
        res.redirect("/register")
    }
    console.log(users)
})

app.use(function (req, res, next) {
    try {
        const token = req.headers.authorization.split(' ')[1]
        jwt.verify(token, "ChickenHandsome", function (err, decode) {
            if (err) {
                return res.send({ message: "Token invalid" })
            } else {
                return next()
            }
        })
    } catch (err) {
        console.log(err)
    }
})

app.get("/club", function (req, res) {
    res.render("club.ejs", { mvp: "Neymar" })
})

app.get("/home", function (req, res) {
    res.render("home.ejs", { username: "pxman" })
})

var fs = require("fs")
var text = fs.readFileSync("file.txt", "utf-8")
var s = text.split("\n")
var pointSum = 0
var creditSum = 0
for (let i = 0; i < s.length; i++) {
    var number = s[i].split(" ")
    var num1=parseFloat(number[0])
    var num2=parseFloat(number[1])

    console.log(num1, num2)
    pointSum += num1 *num2
    creditSum += num2
}
console.log(pointSum,creditSum)
console.log(pointSum/creditSum)


// text = s.join("\n")
// fs.writeFileSync("file.txt", text)

app.listen(3000, function (req, res) {
    console.log("http://localhost:3000")
})