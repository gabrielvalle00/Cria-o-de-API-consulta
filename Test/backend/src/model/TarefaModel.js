import connection from '../config/db.js';

class Tarefa {
    constructor(pTarefa) {
        this.id_usuario = pTarefa.id_usuario;
        this.descricao = pTarefa.descricao;
        this.equipe = pTarefa.equipe;
        this.prioridade = pTarefa.prioridade;
        this.status = pTarefa.status;
    }


    async insertTarefa() {
        try {
            const conn = await connection();
            const pSql = "INSERT INTO TAREFA (ID_USUARIO,DESCRICAO, EQUIPE, PRIORIDADE,STATUS) VALUES (?,?,?,?,?)";
            const pValues = [this.id_usuario, this.descricao, this.equipe, this.prioridade, this.status];
            const [result] = await conn.query(pSql, pValues);
            console.log(result);
        } catch (error) {
            throw error;
        }
    }


    static async listarUsuarios() {
        try {
            const conn = await connection();
            const [rows] = await conn.query('SELECT ID_USUARIO, NOME FROM USUARIO');
            console.log(rows);
            return rows;
        } catch (error) {
            throw error;
        }
    }


    static async listarTarefas() {
        try {
            const conn = await connection();
            const [rows] = await conn.query(`SELECT 
                T.id_tarefa,
                T.id_usuario,
                T.descricao,
                T.equipe,
                U.nome,
                T.prioridade,
                T.data_cadastro,
                T.status
                FROM
                tarefa T
                    INNER JOIN
            usuario U ON T.id_usuario = U.id_usuario;`);
            console.log("teste", rows);
            return rows;
        } catch (error) {
            // throw error;
            console.log(error);
            
        }
    }


    static async atualizarStatus(id, status) {
        try {
            console.log(id,status);
            
            const conn = await connection();
            const pSql  = `UPDATE TAREFA SET STATUS = ? WHERE id_tarefa = ?`;
            const pValues = [status, id];
            const {result} = await conn.query(pSql,pValues);
            console.log("teste", result);
            return result;
        } catch (error) {
            // throw error;
            console.log(error);
            
        }
    }

    static async deletar (id) {
        console.log(id);
        
        try {
            const conn = await connection();
            const pSql = `DELETE FROM TAREFA WHERE id_tarefa = ?;`
            const pValues = [id];
            const result = await conn.query(pSql, pValues);
            console.log("aaaaaaaaaaa",result);
            return result;
            } catch (error) {
                // throw error;
                console.log(error);
            }
    }
}

export default Tarefa;