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

async function validateBody(req, res, next) {
  const { completed, notes, description, project_id } = req.validateBody;
  if (!notes || !description || !project_id) {
    res.status(400).json({
      message: "Notes, Description, or Project ID is missing :(",
    });
  } else {
    req.completed = completed;
    req.notes = notes;
    req.description = description;
    req.project_id = project_id;
    next();
  }
}

module.exports = { validateBody, validateId };
