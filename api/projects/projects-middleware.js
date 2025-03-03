// add middlewares here related to projects
const Project = require("./projects-model");

async function validateProjectId(req, res, next) {
  try {
    const { id } = req.params.id;
    const project = await Project.get(id);
    if (!project) {
      next({ status: 404, message: "No such user found :(" });
    } else {
      req.project = project;
      next();
    }
  } catch (err) {
    res.status(500).json({
      message: "No such project found :(",
    });
  }
}

async function validateBody(req, res, next) {
  const { name, description, completed } = req.body;
  if (!description || !name) {
    res.status(400).json({
      message: "Name or Description is missing :(",
    });
  } else {
    req.name = name;
    req.description = description;
    req.completed = completed;
    next();
  }
}

module.exports = { validateProjectId, validateBody };
