const db = require("./db");

const express = require("express");
const app = express();

app.use(express.static("./public"));

app.use(express.json());

app.get("/get-images", (req, res) => {
    console.log("GET images request");
    db.getImages()
        .then(({ rows }) => {
            // console.log("Images from db:", rows);
            res.json(rows);
        })
        .catch((err) => {
            console.log("err in getImages", err);
        });
});

app.get("*", (req, res) => {
    res.sendFile(`${__dirname}/index.html`);
});

app.listen(8080, () => console.log(`I'm listening on 8080...`));
