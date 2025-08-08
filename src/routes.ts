import express from 'express';
import UsuarioController from './controller/UsuarioController.js';
import {SERVER_ROUTES} from "./app.Config.js"

const router = express.Router();

router.get('/', (req, res) => {
    res.json({ mensagem: "Rota principal" });
});

router.get(SERVER_ROUTES.LISTAR_USUARIO,UsuarioController.todos);

export { router }