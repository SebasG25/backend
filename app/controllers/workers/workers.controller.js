const PostgresService = require("../../services/postgres.service");
const _pg = new PostgresService();

const getWorker = async (req, res) => {
    let cc = req.params.cc
    let sql = `SELECT * FROM workers WHERE cc = '${cc}'`;
    try {
        let result = await _pg.executeSql(sql);
        let rows = result.rows;
        return res.send({
            ok: true,
            message: "Trabajador consultado con éxito",
            content: rows,
        });
    } catch (error) {
        return res.send({
            ok: false,
            message: "Ha ocurrido un error consultando el trabajador",
            content: error,
        })
    } 
}

const getWorkers = async (req, res) => {
    let sql = "SELECT * FROM workers";
    try {
        let result = await _pg.executeSql(sql);
        let rows = result.rows;
        return res.send({
            ok: true,
            message: "Trabajadores consultados con éxito",
            content: rows,
        });
    } catch (error) {
        return res.send({
            ok: false,
            message: "Ha ocurrido un error consultando los trabajadores",
            content: error,
        })
    }
}

const createWorker = async (req, res) => {
    try {
        let worker = req.body;
        let sql = `INSERT INTO public.workers (cc, email, "password", first_name, last_name, id_rol, active) VALUES('${worker.cc}', '${worker.email}', '${worker.password}', '${worker.first_name}', '${worker.last_name}', ${worker.id_rol}, ${worker.active});`
        let result = await _pg.executeSql(sql);
        return res.send({
            ok: result.rowCount == 1,
            message: result.rowCount == 1 ? "Trabajador creado con éxito" : "El trabajador no fue creado",
            content: worker,
        });
    } catch (error) {
        return res.send({
            ok: false,
            message: "Ha ocurrido un error creando el trabajador",
            content: error.message
        })
    }
};

const updateWorker = async (req, res) => {
    try {
        let cc = req.params.cc;
        let worker = req.body;
        let sql = `UPDATE public.workers SET first_name='${worker.first_name}', last_name='${worker.last_name}', email='${worker.email}', "password"='${worker.password}', id_rol=${worker.id_rol}, active=${worker.active} WHERE cc='${cc}';`;
        let result = await _pg.executeSql(sql);
        return res.send({
            ok: result.rowCount == 1,
            message: result.rowCount == 1 ? "Trabajador modificado" : "El trabajador no fue modificado",
            content: worker,
        });
    } catch (error) {
        return res.send({
            ok: false,
            message: "Ha ocurrido un error modificando el trabajador",
            content: error.message
        })
    }
};

const deleteWorker = async (req, res) => {
    try {
        let cc = req.params.cc;
        let sql = `DELETE FROM public.workers WHERE cc='${cc}';`;
        let result = await _pg.executeSql(sql);
        return res.send({
            ok: result.rowCount == 1,
            message: result.rowCount == 1 ? "Trabajador eliminado" : "El trabajador no fue eliminado",
            content: cc,
        });
    } catch (error) {
        return res.send({
            ok: false,
            message: "Ha ocurrido un error eliminando el trabajador",
            content: error.message
        });
    }
};

module.exports = { getWorker, getWorkers, createWorker, updateWorker, deleteWorker };