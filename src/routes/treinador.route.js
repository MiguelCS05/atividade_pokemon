import { Router } from "express";

import {
    listarTreinadores,
    buscarTreinadorPorId,
    criarTreinador,
    atualizarTreinador,
    excluirTreinador
} from "../services/treinador.service.js";

const router = Router();

router.get("/", async (req, res) => {
    try {
        res.json(await listarTreinadores());
    } catch (erro) {
        res.status(500).json({
            erro: "Erro ao listar os treinadores."
        });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const treinador = await buscarTreinadorPorId(req.params.id);

        if (!treinador) {
            return res.status(404).json({
                erro: "Treinador não encontrado."
            });
        }

        res.json(treinador);
    } catch (erro) {
        res.status(500).json({
            erro: "Erro ao buscar o treinador."
        });
    }
});

router.post("/", async (req, res) => {
    const { nome } = req.body;

    if (!nome || !nome.trim()) {
        return res.status(400).json({
            erro: "Informe o nome do treinador."
        });
    }

    try {
        const treinador = await criarTreinador(nome.trim());

        res.status(201).json(treinador);
    } catch (erro) {
        res.status(500).json({
            erro: "Erro ao cadastrar o treinador."
        });
    }
});

router.put("/:id", async (req, res) => {
    const { nome } = req.body;

    if (!nome || !nome.trim()) {
        return res.status(400).json({
            erro: "No PUT, informe o nome do treinador."
        });
    }

    try {
        const treinador = await atualizarTreinador(
            req.params.id,
            { nome: nome.trim() }
        );

        if (!treinador) {
            return res.status(404).json({
                erro: "Treinador não encontrado."
            });
        }

        res.json(treinador);
    } catch (erro) {
        res.status(500).json({
            erro: "Erro ao atualizar o treinador."
        });
    }
});

router.patch("/:id", async (req, res) => {
    const dados = {};

    if (req.body.nome !== undefined) {
        if (
            typeof req.body.nome !== "string" ||
            !req.body.nome.trim()
        ) {
            return res.status(400).json({
                erro: "O nome não pode ficar vazio."
            });
        }

        dados.nome = req.body.nome.trim();
    }

    try {
        const treinador = await atualizarTreinador(
            req.params.id,
            dados
        );

        if (!treinador) {
            return res.status(404).json({
                erro: "Treinador não encontrado."
            });
        }

        res.json(treinador);
    } catch (erro) {
        res.status(500).json({
            erro: "Erro ao atualizar o treinador."
        });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const treinador = await excluirTreinador(req.params.id);

        if (!treinador) {
            return res.status(404).json({
                erro: "Treinador não encontrado."
            });
        }

        res.json({
            mensagem: "Treinador excluído com sucesso.",
            treinador
        });
    } catch (erro) {
        res.status(500).json({
            erro: "Erro ao excluir o treinador."
        });
    }
});

export const treinadoresRouter = router;