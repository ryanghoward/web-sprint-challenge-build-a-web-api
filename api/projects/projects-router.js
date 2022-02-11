// Write your "projects" router here!
const express = require("express");
const { validateProjectId, validateBody } = require("./projects-middleware");
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
router.get("/:id", validateProjectId, (req, res, next) => {
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
router.put("/:id", validateProjectId, validateBody, async (req, res, next) => {
  let changes = { ...req.body, completed: req.completed };
  const updateProject = await Project.update(req.params.id, changes);
  try {
    res.status(400).json(updateProject);
  } catch (err) {
    next(err);
  }
});

// Delete ID
router.delete("./id", validateProjectId, async (req, res, next) => {
  // try {
  //   const result = await Project.remove(req.params.id);
  //   res.json(result);
  // } catch {
  //   res.status(404).json({
  //     message: "did not delete project",
  //   });
  // }
  // next();

  const { selectedId } = req.params.id;
  try {
    const results = await Project.remove(selectedId);
    res.status(201).json(results);
  } catch (err) {
    next(err);
  }
});

// Get ID Actions
router.get("/:id/actions", validateProjectId, (req, res, next) => {
  Project.getProjectActions(req.params.id)
    .then((actions) => {
      {
        res.json(actions);
      }
    })
    .catch(next);
});

module.exports = router;
