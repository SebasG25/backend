const PostgresService = require("../../services/postgres.service");
const _pg = new PostgresService();

const getIncident = async (req, res) => {
    let id = req.params.id
    let sql = `SELECT * FROM incidents WHERE id = ${id}`;
    try {
        let result = await _pg.executeSql(sql);
        let rows = result.rows;
        return res.send({
            ok: true,
            message: "Incidente consultado con éxito",
            content: rows,
        });
    } catch (error) {
        return res.send({
            ok: false,
            message: "Ha ocurrido un error consultado el incidente",
            content: error.message,
        })
    } 
}

const getIncidents = async (req, res) => {
    let sql = "SELECT * FROM incidents";
    try {
        let result = await _pg.executeSql(sql);
        let rows = result.rows;
        return res.send({
            ok: true,
            message: "Incidentes consultados con éxito",
            content: rows,
        });
    } catch (error) {
        return res.send({
            ok: false,
            message: "Ha ocurrido un error consultando los incidentes",
            content: error,
        })
    }
}

const createIncident = async (req, res) => {
    try {
        let incident = req.body;
        let sql = `INSERT INTO public.incidents (title, description, id_risk, cc_worker) VALUES('${incident.title}', '${incident.description}', ${incident.id_risk}, '${incident.cc_worker}');`
        let result = await _pg.executeSql(sql);
        return res.send({
            ok: result.rowCount == 1,
            message: result.rowCount == 1 ? "Incidente creado con éxito" : "El incidente no fue creado",
            content: incident,
        });
    } catch (error) {
        return res.send({
            ok: false,
            message: "Ha ocurrido un error creando el incidente",
            content: error.message
        })
    }
};

const updateIncident = async (req, res) => {
    try {
        let id = req.params.id;
        let incident = req.body;
        let sql = `UPDATE public.incidents SET title='${incident.title}', id_risk=${incident.id_risk}, description='${incident.description}' WHERE id=${id};`;
        let result = await _pg.executeSql(sql);
        return res.send({
            ok: result.rowCount == 1,
            message: result.rowCount == 1 ? "Incidente modificado" : "El incidente no fue modificado",
            content: incident,
        });
    } catch (error) {
        return res.send({
            ok: false,
            message: "Ha ocurrido un error modificando el incidente",
            content: error.message
        })
    }
};

const deleteIncident = async (req, res) => {
    try {
        let id = req.params.id;
        let sql = `DELETE FROM public.incidents WHERE id=${id};`;
        let result = await _pg.executeSql(sql);
        return res.send({
            ok: result.rowCount == 1,
            message: result.rowCount == 1 ? "Incidente eliminado" : "El incidente no fue eliminado",
            content: id,
        });
    } catch (error) {
        return res.send({
            ok: false,
            message: "Ha ocurrido un error eliminando el incidente",
            content: error
        });
    }
};

module.exports = { getIncident, getIncidents, createIncident, updateIncident, deleteIncident };