const express = require("express");
const router = express.Router();

const _workerController = require('../controllers/workers/workers.controller');
const _rolesController = require('../controllers/workers/roles.controller');
const _solutionsController = require('../controllers/solutions/solutions.controller');
const _risksController = require('../controllers/incidents/risks.controller');
const _incidentsController = require('../controllers/incidents/incidents.controller');

router
    .get("/workers/:cc", _workerController.getWorker)
    .get("/workers", _workerController.getWorkers)
    .post("/workers", _workerController.createWorker)
    .put("/workers/:cc", _workerController.updateWorker)
    .put("/workers/:cc", _workerController.updatePasswordWorker)
    .delete("/workers/:cc", _workerController.deleteWorker)

    .get("/roles/:id", _rolesController.getRol)
    .get("/roles", _rolesController.getRoles)
    
    .get("/solutions/:id", _solutionsController.getSolution)
    .get("/solutions_incident/:id_incident", _solutionsController.getIncidentSolutions)
    .post("/solutions/:id_incident", _solutionsController.createIncidentSolution)
    .put("/solutions/:id", _solutionsController.updateIncidentSolution)
    .delete("/solutions/:id", _solutionsController.deleteIncidentSolution)

    .get("/risks/:id", _risksController.getRisk)
    .get("/risks", _risksController.getRisks)

    .get("/incidents/:id", _incidentsController.getIncident)
    .get("/incidents", _incidentsController.getIncidents)
    .post("/incidents", _incidentsController.createIncident)
    .put("/incidents/:id", _incidentsController.updateIncident)
    .delete("/incidents/:id", _incidentsController.deleteIncident);


module.exports = router;