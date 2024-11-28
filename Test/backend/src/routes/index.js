import { Router } from "express";
import {UsuarioController} from '../controllers/UsuarioController.js';
import { TarefaController } from "../controllers/TarefaController.js";

const router= Router();

router.post('/novoUsuario', UsuarioController.novoUsuario);

router.get('/listarUsuarios', UsuarioController.listarUsuarios);

router.get('/listarTarefas', TarefaController.listarTarefas);

router.get('/listarTarefa/:id', TarefaController.listarTarefa);

router.post('/novaTarefa', TarefaController.novaTarefa);

router.put('/atualizarStatus/:id', TarefaController.atualizarStatus);

router.delete('/deletar/:id', TarefaController.deletar);

router.put('/atualizarTarefa/:id', TarefaController.atualizarTarefa);

export default router;