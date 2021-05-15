const express = require("express");
const actions = require("./actions-model");

const { IDValidation } = require("../middleware/middleware");

const router = express.Router();

router.use("/:id", (req, res, next) => {
  IDValidation(actions, "project", req, next);
});

router.get("/", (req, res, next) => {
  actions
    .get()
    .then((actions) => res.status(200).json(actions))
    .catch(next);
});

router.get("/:id", (req, res) => res.status(200).json(req.idResult));

router.post("/", (req, res, next) => {
  actions
    .insert(req.body)
    .then((newAction) => res.status(201).json(newAction))
    .catch(next);
});

router.put("/:id", (req, res, next) => {
  const id = req.params.id;

  actions
    .update(id, req.body)
    .then((updateAction) => res.status(201).json(updateAction))
    .catch(next);
});

router.patch("/:id", (req, res, next) => {
  const id = req.params.id;
  const status = req.query.status;

  if (typeof status === "boolean") {
    res.status(400).json({ message: "must be true or false" });
  } else {
    req.idResult.completed = status;
    actions
      .update(id, req.idResult)
      .then((updateAction) => res.status(201).json(updateAction))
      .catch(next);
  }
});

router.delete("/:id", (req, res, next) => {
  actions
    .remove(req.params.id)
    .then(() => res.sendStatus(200))
    .catch(next);
});

module.exports = router;
