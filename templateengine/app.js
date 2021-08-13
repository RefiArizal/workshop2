const { render } = require("ejs");
const express = require("express");

const app = express();

const expressLayouts = require("express-ejs-layouts");

const port = 3000;

// set tempalte ejs
app.set("view engine", "ejs");
app.use(expressLayouts);

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
