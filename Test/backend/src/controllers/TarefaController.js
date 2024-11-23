import Tarefa from '../model/TarefaModel.js'

export const TarefaController = {
    novaTarefa: async (req, res) => {
        try {
            const { id_usuario, descricao, equipe, prioridade, } = req.body;
            const status = 'NÃO INICIADO';
            const tarefa = new Tarefa({ id_usuario, descricao, equipe, prioridade, status });
            console.log(tarefa);

            const result = await tarefa.insertTarefa();
            
            res.json({ result });
        } catch (error) {
            res.json({ message: error })
        }
    },


    listarUsuarios: async (req, res) => {
        try {
            const users = await Usuario.listarUsuarios();
            console.log(users);
            res.json({ users});
            
        } catch (error) {
            res.json({ message: error })
        }
    }
}
export default TarefaController;

