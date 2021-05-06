const PostgresService = require("../../services/postgres.service");
const _pg = new PostgresService();

const getRol = async (req, res) => {
    let id = req.params.id
    let sql = `SELECT rol FROM roles WHERE id = ${id}`;
    try {
        let result = await _pg.executeSql(sql);
        let rows = result.rows;
        return res.send({
            ok: true,
            message: "Rol consultado con éxito",
            content: rows[0].rol,
        });
    } catch (error) {
        return res.send({
            ok: false,
            message: "Ha ocurrido un error consultando el rol",
            content: error,
        })
    } 
}

const getRoles = async (req, res) => {
    let sql = "SELECT rol FROM roles";
    try {
        let result = await _pg.executeSql(sql);
        let rows = result.rows;
        return res.send({
            ok: true,
            message: "Roles consultados con éxito",
            content: rows,
        });
    } catch (error) {
        return res.send({
            ok: false,
            message: "Ha ocurrido un error consultando los roles",
            content: error,
        })
    }
}


module.exports = { getRol, getRoles };