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
    return db.query("SELECT id, url, title  FROM images");
};
