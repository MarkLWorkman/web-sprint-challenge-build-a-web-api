const express = require("express");
const projects = require("./projects-model");

const { IDValidation } = require("../middleware/middleware");

const router = express.Router();

router.use("/:id", (req, res, next) =>
  IDValidation(projects, "project", req, next)
);

router.get("/", (req, res, next) => {
  projects
    .get()
    .then((projects) => res.status(200).json(projects))
    .catch(next);
});

router.get("/:id", (req, res) => res.status(200).json(req.idResult));

router.post("/", (req, res, next) => {
  projects
    .insert(req.body)
    .then((newProject) => res.status(201).json(newProject))
    .catch(next);
});

router.put("/:id", (req, res, next) => {
  const id = req.params.id;

  projects
    .update(id, req.body)
    .then((updateProject) => res.status(201).json(updateProject))
    .catch(next);
});

router.delete("/:id", (req, res, next) => {
  projects
    .remove(req.params.id)
    .then(() => res.sendStatus(200))
    .catch(next);
});

router.get("/:id/actions", (req, res, next) => {
  projects
    .getProjectActions(req.params.id)
    .then((actions) => res.status(200).json(actions))
    .catch(next);
});

module.exports = router;
