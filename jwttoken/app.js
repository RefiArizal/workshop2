const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();

app.get("/api", (req, res) => {
    res.json({
        message: "akses API",
    });
});

app.post("/api/post", verifyToken, (req, res) => {
    jwt.verify(req.token, "rahasia", (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            res.json({
                message: "POST Dibuat",
                authData,
            });
        }
    });
});

app.post("/api/login", (req, res) => {
    // data user
    const user = {
        id: 1,
        username: "refi",
        email: "refi@gmailcom",
    };

    // fungsi untuk membuat token
    jwt.sign({ user: user }, "rahasia", (err, token) => {
        res.json({
            token,
        });
    });
});

// fungsi js
function verifyToken(req, res, next) {
    // get header
    const bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== "undefined") {
        const bearer = bearerHeader.split(" ");
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {
        res.sendStatus(403);
    }
}

app.listen(3000, () => console.log("server berjalan pada port 3000"));
