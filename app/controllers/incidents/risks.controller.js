const PostgresService = require("../../services/postgres.service");
const _pg = new PostgresService();

const getRisk = async (req, res) => {
    let id = req.params.id
    let sql = `SELECT risk FROM risks WHERE id = ${id}`;
    try {
        let result = await _pg.executeSql(sql);
        let rows = result.rows;
        return res.send({
            ok: true,
            message: "Riesgo consultado con éxito",
            content: rows[0].risk,
        });
    } catch (error) {
        return res.send({
            ok: false,
            message: "Ha ocurrido un error consultando el riesgo",
            content: error,
        })
    } 
}

const getRisks = async (req, res) => {
    let sql = "SELECT risk FROM risks";
    try {
        let result = await _pg.executeSql(sql);
        let rows = result.rows;
        return res.send({
            ok: true,
            message: "Riesgos consultados con éxito",
            content: rows,
        });
    } catch (error) {
        return res.send({
            ok: false,
            message: "Ha ocurrido un error consultando los riesgos",
            content: error,
        })
    }
}


module.exports = { getRisk, getRisks };