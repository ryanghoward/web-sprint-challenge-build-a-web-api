// Write your "projects" router here!
const Project = require("./projects-model");
const express = require("express");
const router = express.Router();
const { validateId, validateBody } = require("./projects-middleware");

// Get
router.get("/", (req, res, next) => {
  Project.get()
    .then((projects) => {
      res.status(201).json(projects);
    })
    .catch(next);
});

// Get ID
router.get("/:id", validateId, (req, res) => {
  res.json(req.projects);
});

// Post
router.post("/", validateBody, (req, res, next) => {
  Project.insert({
    name: req.name,
    description: req.description,
    completed: req.completed,
  })
    .then((projects) => {
      res.status(201).json(projects);
    })
    .catch(next);
});

// Put ID
router.put("/:id", validateId, validateBody, async (req, res, next) => {
  let changes = { ...req.body, completed: req.completed };
  const updateProject = await Project.update(req.params.id, changes);
  try {
    res.status(400).json(updateProject);
  } catch (err) {
    next(err);
  }
});

// Delete ID
router.delete("./id", validateId, async (req, res, next) => {
  const id = req.params.id;
  try {
    const results = await Project.remove(id);
    res.status(201).json(results);
  } catch (err) {
    next(err);
  }
});

// Get ID Actions
router.get("/:id/actions", validateId, (req, res, next) => {
  Project.getProjectActions(req.params.id)
    .then((actions) => {
      {
        res.json(actions);
      }
    })
    .catch(next);
});

module.exports = router;
