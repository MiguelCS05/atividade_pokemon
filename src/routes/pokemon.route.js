import { Router } from "express";

import {
    listarPokemons,
    buscarPokemonPorId,
    criarPokemon,
    atualizarPokemon,
    excluirPokemon
} from "../services/pokemon.service.js";

const router = Router();

router.get("/", async (req, res) => {
    try {
        res.json(await listarPokemons());
    } catch (erro) {
        res.status(500).json({
            erro: "Erro ao listar os Pokémon."
        });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const pokemon = await buscarPokemonPorId(req.params.id);

        if (!pokemon) {
            return res.status(404).json({
                erro: "Pokémon não encontrado."
            });
        }

        res.json(pokemon);
    } catch (erro) {
        res.status(500).json({
            erro: "Erro ao buscar o Pokémon."
        });
    }
});

router.post("/", async (req, res) => {
    const { nome, nivel, tipo, treinador_id } = req.body;

    if (!nome || nivel === undefined || !tipo || !treinador_id) {
        return res.status(400).json({
            erro: "Informe nome, nivel, tipo e treinador_id."
        });
    }

    if (
        !Number.isInteger(Number(nivel)) ||
        Number(nivel) < 1 ||
        Number(nivel) > 100
    ) {
        return res.status(400).json({
            erro: "O nível deve ser um número entre 1 e 100."
        });
    }

    try {
        const pokemon = await criarPokemon({
            ...req.body,
            nivel: Number(nivel)
        });

        res.status(201).json(pokemon);
    } catch (erro) {
        res.status(400).json({
            erro: "Não foi possível cadastrar o Pokémon. Confira o treinador informado."
        });
    }
});

router.put("/:id", async (req, res) => {
    const { nome, nivel, tipo, treinador_id } = req.body;

    if (!nome || nivel === undefined || !tipo || !treinador_id) {
        return res.status(400).json({
            erro: "No PUT, informe nome, nivel, tipo e treinador_id."
        });
    }

    if (
        !Number.isInteger(Number(nivel)) ||
        Number(nivel) < 1 ||
        Number(nivel) > 100
    ) {
        return res.status(400).json({
            erro: "O nível deve ser um número entre 1 e 100."
        });
    }

    try {
        const pokemon = await atualizarPokemon(req.params.id, {
            ...req.body,
            nivel: Number(nivel)
        });

        if (!pokemon) {
            return res.status(404).json({
                erro: "Pokémon não encontrado."
            });
        }

        res.json(pokemon);
    } catch (erro) {
        res.status(400).json({
            erro: "Não foi possível atualizar o Pokémon."
        });
    }
});

router.patch("/:id", async (req, res) => {
    const dados = { ...req.body };

    if (dados.nivel !== undefined) {
        if (
            !Number.isInteger(Number(dados.nivel)) ||
            Number(dados.nivel) < 1 ||
            Number(dados.nivel) > 100
        ) {
            return res.status(400).json({
                erro: "O nível deve ser um número entre 1 e 100."
            });
        }

        dados.nivel = Number(dados.nivel);
    }

    try {
        const pokemon = await atualizarPokemon(req.params.id, dados);

        if (!pokemon) {
            return res.status(404).json({
                erro: "Pokémon não encontrado."
            });
        }

        res.json(pokemon);
    } catch (erro) {
        res.status(400).json({
            erro: "Não foi possível atualizar o Pokémon."
        });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const pokemon = await excluirPokemon(req.params.id);

        if (!pokemon) {
            return res.status(404).json({
                erro: "Pokémon não encontrado."
            });
        }

        res.json({
            mensagem: "Pokémon excluído com sucesso.",
            pokemon
        });
    } catch (erro) {
        res.status(500).json({
            erro: "Erro ao excluir o Pokémon."
        });
    }
});

router.patch("/:id", atualizarPokemon);

export const pokemonsRouter = router;