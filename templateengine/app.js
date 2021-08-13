const { render } = require("ejs");
const express = require("express");

const app = express();
const morgan = require("morgan");

//3rd party middleware
app.use(morgan("tiny"));

// module layouting ejs express
const expressLayouts = require("express-ejs-layouts");

// middleware built in express
app.use(express.json());

const port = 3000;

const mahasiswa = [
    { id: 1, nama: "refi" },
    { id: 2, nama: "azel" },
    { id: 3, nama: "mori" },
];

// set tempalte ejs
app.set("view engine", "ejs");
app.use(expressLayouts);

// middleware user defined
app.use(function (req, res, next) {
    console.log("log middleware...");
    next();
});

// get post data mahasiswa
app.get("/api/mhs", (req, res) => {
    res.send(mahasiswa);
});

app.post("/api/mhs", (req, res) => {
    const datamahasiswa = {
        id: mahasiswa.length + 1,
        nama: req.body.nama,
    };
    mahasiswa.push(datamahasiswa);
    res.send(datamahasiswa);
});

app.get("/", (req, res) => {
    //     res.send("hello world");
    //     res.sendFile("./index.html", { root: __dirname });

    const peserta = [
        {
            nama: "refi",
            email: "refi@gmail.com",
        },

        {
            nama: "azel",
            email: "azel@gmail.com",
        },

        {
            nama: "mori",
            email: "mori@gmail.com",
        },
    ];

    res.render("index", { title: "homepage EJS", peserta, layout: "layouts/main-layout" });
});

app.get("/about", (req, res) => {
    //     res.send("hello world about");
    //     res.sendFile("./about.html", { root: __dirname });
    res.render("about", { title: "about EJS", layout: "layouts/main-layout" });
});

app.get("/contact", (req, res) => {
    //     res.send("hello world contact");
    //     res.sendFile("./contact.html", { root: __dirname });
    res.render("contact", { title: "contact EJS", layout: "layouts/main-layout" });
});

app.listen(port, () => console.log(`server berjalan pada port ${port}.`));
