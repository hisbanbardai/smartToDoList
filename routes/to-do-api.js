const express = require("express");
const router = express.Router();
const toDoQueries = require("../db/queries/to_dos");

router.get("/", (req, res) => {
  toDoQueries
    .getToDos()
    .then((toDos) => {
      res.json({ toDos });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.post("/", (req, res) => {});

router.get("/:id", (req, res) => {});

router.post("/:id", (req, res) => {});

router.post("/:id/delete", (req, res) => {});

module.exports = router;
