// Write your "actions" router here!
const Actions = require("./actions-model");
const { validateBody, validateId } = require("./actions-middleware");
const { validateId } = require("../projects/projects-middleware");

const router = express.Router();
const express = requires(express);

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
router.post("/", validateBody, async (req, res, next) => {
  try {
    const action = await Actions.insert({
      completed: req.completed,
      notes: req.notes,
      description: req.description,
      project_id: req.project_id,
    });
    res.status(201).json(action);
  } catch (err) {
    next(err);
  }
});

// Put ID
router.put("/:id", validateBody, validateId, (req, res, next) => {
  Actions.update(req.params.id, {
    completed: req.completed,
    notes: req.notes,
    description: req.description,
    project_id: req.project_id,
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
