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
router.get("/:id", validateId, async (req, res, next) => {
  try {
    const action = await Actions.get(req.params.id);
    if (!action) {
      res.status(404).json({
        message: "That action does not exist :(",
      });
    } else {
      res.json(action);
    }
  } catch (err) {
    next(err);
  }
  // res.status(200).json(req.actions);
});

// Post
router.post("/", (req, res, next) => {
  const { project_id, notes, description } = req.body;
  if (!project_id || !notes || !description) {
    res.status(400).json({
      message: "There was an Error :(",
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
router.put("/:id", (req, res) => {
  const changes = req.body;
  Actions.update(req.params.id, changes)
    .then((actions) => {
      if (actions) {
        res.status(400).json(actions);
      } else {
        res.status(404).json({ message: "No such action found :(" });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json({
        message: "There was an error updating the action :(",
      });
    });
});

// Delete ID
router.delete("/:id", validateId, async (req, res) => {
  try {
    const action = await Actions.remove(req.params.id);
    if (!action) {
      res.status(404).json({
        message: "An action with that ID does not exist :(",
      });
    } else {
      await Actions.remove(req.params.id);
      res.json(action);
    }
  } catch (error) {
    res.status(500).json({
      message: "That action could not be removed :(",
      error: error.message,
      stack: error.stack,
    });
  }
});

module.exports = router;
