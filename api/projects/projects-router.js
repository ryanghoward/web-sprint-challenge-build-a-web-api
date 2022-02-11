// Write your "projects" router here!
const express = require("express");
const { validateTheId, validateBody } = require("./projects-middleware");
const Project = require("./projects-model");
const router = express.Router();

// Get
router.get("/", (req, res, next) => {
  Project.get()
    .then((projects) => {
      res.status(201).json(projects);
    })
    .catch(next);
});

// Get ID
router.get("/:id", validateTheId, (req, res, next) => {
  const { id } = req.params;

  Project.get(id)
    .then((project) => {
      res.json(project);
    })
    .catch(next);
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
router.put("/:id", validateTheId, validateBody, async (req, res, next) => {
  let changes = { ...req.body, completed: req.completed };
  const updateProject = await Project.update(req.params.id, changes);
  try {
    res.status(400).json(updateProject);
  } catch (err) {
    next(err);
  }
});

// Delete ID
router.delete("./id", validateTheId, async (req, res, next) => {
  const id = req.params.id;
  try {
    const results = await Project.remove(id);
    res.status(201).json(results);
  } catch (err) {
    next(err);
  }
});

// Get ID Actions
router.get("/:id/actions", validateTheId, (req, res, next) => {
  Project.getProjectActions(req.params.id)
    .then((actions) => {
      {
        res.json(actions);
      }
    })
    .catch(next);
});

module.exports = router;
