const db = require("./db");

const express = require("express");
const app = express();

const s3 = require("./s3");

const multer = require("multer");
const uidSafe = require("uid-safe");
const path = require("path");

const diskStorage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, path.join(__dirname, "uploads"));
    },
    filename: function (req, file, callback) {
        uidSafe(24).then(function (uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    },
});

const uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152,
    },
});

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

app.post("/upload", uploader.single("file"), s3.upload, (req, res) => {
    console.log("POST/upload");
    console.log("req.body: ", req.body);
    console.log("req.file: ", req.file);

    //console.log("link to file", s3.getLink(req.file.filename));
    if (!req.file) {
        res.json({ success: false });
    } else {
        const url = s3.getLink(req.file.filename);
        const { title, description, username } = req.body;
        console.log(url, username, title, description);
        db.addImage(url, username, title, description)
            .then((imageId) => {
                res.json({
                    success: true,
                    image: {
                        id: imageId,
                        username: username,
                        title: title,
                        description: description,
                        url: url,
                    },
                });
            })
            .catch((err) => {
                console.log("err in getImages", err);
            });
    }
});

app.get("*", (req, res) => {
    res.sendFile(`${__dirname}/index.html`);
});

app.listen(8080, () => console.log(`I'm listening on 8080...`));
