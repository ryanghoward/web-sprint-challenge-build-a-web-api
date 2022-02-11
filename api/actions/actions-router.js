// Write your "actions" router here!
const express = require("express");
const router = express.Router();

const Actions = require("./actions-model");
const { validateId, validateBody } = require("./actions-middlware");

// Get
router.get("/", (req, res, next) => {
  Actions.get()
    .then((action) => {
      res.status(200).json(action);
    })
    .catch(next);
});

// Get ID
router.get("/:id", validateId, (req, res) => {
  res.status(200).json(req.actions);
});

// Post
router.post("/", (req, res, next) => {
  const { project_id, notes, description } = req.body;

  if (!project_id || !notes || !description) {
    res.status(400).json({
      message: "Something something something error",
    });
  } else {
    Actions.insert({ project_id, notes, description })
      .then((newAction) => {
        res.status(201).json(newAction);
      })
      .catch(next);
  }
});

// Put ID
router.put("/:id", validateId, validateBody, (req, res, next) => {
  Actions.update(req.params.id, {
    project_id: req.project_id,
    description: req.description,
    notes: req.notes,
    completed: req.completed,
  })
    .then(() => {
      return Actions.get(req.params.id);
    })
    .then((action) => {
      res.json(action);
    })
    .catch(next);
});

// Delete ID
router.delete("/:id", validateId, async (req, res, next) => {
  try {
    const action = await Actions.remove(req.params.id);
    res.status(200).json(action);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
