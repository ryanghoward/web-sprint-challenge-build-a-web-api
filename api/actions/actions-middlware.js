// add middlewares here related to actions
const Actions = require("./actions-model");

async function validateId(req, res, next) {
  try {
    const { id } = req.params;
    const actions = await Actions.get(id);
    if (!actions) {
      next({ status: 404, message: "No such user found :(" });
    } else {
      req.actions = actions;
      next();
    }
  } catch (err) {
    res.status(500).json({
      message: "No such action found :(",
    });
  }
}

function validateBody(req, res, next) {
  const { project_id, description, notes, completed } = req.validateBody;
  if (!project_id || !description || !notes) {
    res.status(400).json({
      message: "Notes, Description, or Project ID is missing :(",
    });
  } else {
    req.project_id = project_id;
    req.description = description;
    req.notes = notes;
    req.completed = completed;
    next();
  }
}

module.exports = { validateId, validateBody };
