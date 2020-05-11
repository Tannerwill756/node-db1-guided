const express = require("express");

// database access using knex
const db = require("../data/db-config.js");

const router = express.Router();

router.get("/", (req, res) => {
  // get a list of posts from the database
  db.select("*")
    .from("posts")
    .then((posts) => {
      res.status(200).json({ data: posts });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ messag: err.message });
    });
  // respond with the posts and 200
});

router.get("/:id", (req, res) => {
  db("posts")
    .where({ id: req.params.id })
    .first() // pick the first record from the array
    .then((post) => {
      if (post) {
        res.status(200).json({ data: post });
      } else {
        res.status(404).json({ message: "No post with that id" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ messag: err.message });
    });
});

router.post("/", (req, res) => {
  const post = req.body;

  // a post must have title and contents
  if (isValidPost(post)) {
    // once you know the post is valid then try to save to the db
    db("posts")
      .insert(post, "id")
      .then((ids) => {
        res.status(201).json({ data: ids });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ messag: err.message });
      });
  } else {
    res
      .status(400)
      .json({ message: "please provide a title and contents for the post" });
  }
});

router.put("/:id", (req, res) => {});

router.delete("/:id", (req, res) => {});

function isValidPost(post) {
  return Boolean(post.title && post.contents);
}

module.exports = router;
