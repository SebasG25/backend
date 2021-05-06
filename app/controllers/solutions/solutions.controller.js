const PostgresService = require("../../services/postgres.service");
const _pg = new PostgresService();

const getSolution = async (req, res) => {
    let id = req.params.id
    let sql = `SELECT * FROM solutions WHERE id = ${id}`;
    try {
        let result = await _pg.executeSql(sql);
        let rows = result.rows;
        return res.send({
            ok: true,
            message: "Solución consultada con éxito",
            content: rows,
        });
    } catch (error) {
        return res.send({
            ok: false,
            message: "Ha ocurrido un error consultado la solución",
            content: error,
        })
    } 
}

const getIncidentSolutions = async (req, res) => {
    let id_incident = req.params.id_incident
    let sql = `SELECT * FROM solutions WHERE id_incident = ${id_incident}`;
    try {
        let result = await _pg.executeSql(sql);
        let rows = result.rows;
        return res.send({
            ok: true,
            message: "Soluciones consultadas con éxito",
            content: rows,
        });
    } catch (error) {
        return res.send({
            ok: false,
            message: "Ha ocurrido un error consultando las soluciones",
            content: error,
        })
    }
}

const createIncidentSolution = async (req, res) => {
    try {
        let id_incident = req.params.id_incident
        let solution = req.body;
        let sql = `INSERT INTO public.solutions (description, id_incident, cc_worker) VALUES('${solution.description}', ${id_incident}, '${solution.cc_worker}');`
        let result = await _pg.executeSql(sql);
        return res.send({
            ok: result.rowCount == 1,
            message: result.rowCount == 1 ? "Solución creada con éxito" : "La solución no fue creada",
            content: solution,
        });
    } catch (error) {
        return res.send({
            ok: false,
            message: "Ha ocurrido un error creando la solución",
            content: error.message
        })
    }
};

const updateIncidentSolution = async (req, res) => {
    try {
        let id = req.params.id;
        let solution = req.body;
        let sql = `UPDATE public.solutions SET description='${solution.description}' WHERE id=${id};`;
        let result = await _pg.executeSql(sql);
        return res.send({
            ok: result.rowCount == 1,
            message: result.rowCount == 1 ? "Solución modificada" : "La solución no fue modificada",
            content: solution,
        });
    } catch (error) {
        return res.send({
            ok: false,
            message: "Ha ocurrido un error modificando la solución",
            content: error.message
        })
    }
};

const deleteIncidentSolution = async (req, res) => {
    try {
        let id = req.params.id;
        let sql = `DELETE FROM public.solutions WHERE id=${id};`;
        let result = await _pg.executeSql(sql);
        return res.send({
            ok: result.rowCount == 1,
            message: result.rowCount == 1 ? "Solución eliminada" : "La solución no fue eliminada",
            content: id,
        });
    } catch (error) {
        return res.send({
            ok: false,
            message: "Ha ocurrido un error eliminando la solución",
            content: error.message
        });
    }
};

module.exports = { getSolution, getIncidentSolutions, createIncidentSolution, updateIncidentSolution, deleteIncidentSolution };