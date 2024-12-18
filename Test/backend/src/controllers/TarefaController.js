import Tarefa from '../model/TarefaModel.js';
import Usuario from '../model/UsuarioModel.js';

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
            res.json({ users });

        } catch (error) {
            res.json({ message: error })
        }
    },

    listarTarefas: async (req, res) => {
        try {
            const tarefas = await Tarefa.listarTarefas();
            console.log("opaa", tarefas);
            res.json({ tarefas });

        } catch (error) {
            res.json({ message: error })
        }
    },

    atualizarStatus: async (req, res) => {
        try {

            const { id } = req.params;
            const { status } = req.body;
            console.log(id,status);
            
            const newStatus = status.toUpperCase();
            const tarefas = await Tarefa.atualizarStatus(id,newStatus);
            console.log("opaa", tarefas);
            res.json({ tarefas });

        } catch (error) {
            res.json({ message: error })
        }
    },

    deletar: async (req, res) => {
        try {

            const { id } = req.params;
            const deletar = await Tarefa.deletar(id);
            console.log("opaa", deletar);
            res.json({ deletar });

        } catch (error) {
            res.json({ message: error })
        }
    },

    listarTarefa: async (req, res) => {
        try {
            const { id } = req.params;
            const tarefa = await Tarefa.listarTarefa(id);
            console.log("opaa", tarefa);
            res.json({ tarefa });

        } catch (error) {
            res.json({ message: error })
        }
    },


    atualizarTarefa: async (req, res) => {
        try {
            const { id } = req.params;
            const { id_usuario, descricao, equipe, prioridade  } = req.body;
            const tarefa = new Tarefa({ id_usuario, descricao, equipe, prioridade });
            console.log(tarefa);

            const result = await tarefa.atualizarTarefa(id);

            res.json({ result });
        } catch (error) {
            res.json({ message: error })
        }
    },
}
export default TarefaController;

