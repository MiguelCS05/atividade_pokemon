import express from "express";
import {
    listarPokemons,
    buscarPokemon,
    atualizarPokemon
} from "../controllers/pokemon.controller.js";

const router = express.Router();

router.get("/", listarPokemons);
router.get("/:id", buscarPokemon);
router.put("/:id", atualizarPokemon);
router.patch("/:id", atualizarPokemon);

export default router;