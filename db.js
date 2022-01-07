//will be where we have all our functions
//retriev/add/update

const spicedPg = require("spiced-pg");

const database = "imageboard";
const username = "postgres";
const password = "postgres";

//comunication to the db

const db = spicedPg(
    process.env.DATABASE_URL ||
        `postgress:${username}:${password}:@localhost:5432/${database}`
);

console.log(`[db] connecting to ${database}`);
//console.log(db);

module.exports.getImages = () => {
    return db.query(
        `SELECT id, url, title, (SELECT id
                            FROM images
                            ORDER BY id ASC
                            LIMIT 1) AS "lowestId" 
                            FROM images ORDER BY id DESC LIMIT 6;`
    );
};

module.exports.getImagesFromId = (id) => {
    console.log("DB: get images from id ", id);
    const q = `SELECT id, url, title, (SELECT id
                            FROM images
                            ORDER BY id ASC
                            LIMIT 1) AS "lowestId" FROM images
                    WHERE id < $1
                    ORDER BY id DESC
                    LIMIT 6;`;
    const params = [id];
    return db.query(q, params);
};

module.exports.getImageByID = (id) => {
    console.log("DB:  i'm getting image", id);
    const q = `SELECT url, title, description, username, country  FROM images 
                WHERE id = $1`;
    const params = [id];
    return db.query(q, params);
};

module.exports.addImage = (url, username, title, description, country) => {
    console.log("DB:  i'm adding new image");
    const q = `INSERT INTO images (url, username, title, description, country) 
                VALUES ($1, $2, $3, $4, $5)
                RETURNING id;`;
    const params = [url, username, title, description, country];
    return db.query(q, params);
};

module.exports.getCommentsByID = (id) => {
    console.log("DB:  i'm getting comments", id);
    const q = `SELECT comment_text, username, created_at, id FROM comments 
                WHERE image_id = $1
                ORDER BY created_at DESC`;
    const params = [id];
    return db.query(q, params);
};

module.exports.addComment = (comment_text, username, image_id) => {
    console.log("DB:  i'm adding new comment");
    const q = `INSERT INTO comments (comment_text, username, image_id) 
                VALUES ($1, $2, $3)
                RETURNING id,created_at;`;
    const params = [comment_text, username, image_id];
    return db.query(q, params);
};
