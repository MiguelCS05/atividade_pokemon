import {
    listarPokemons,
    atualizarPokemon,
    buscarPokemon,
} from "../services/pokemon.service.js";

export async function listar(req, res) {
    await listarPokemons(req, res);
}

export async function buscarPokemon(req, res) {
    await buscarPokemon(req, res);    
}

export async function atualizar(req, res) {
    await atualizarPokemon(req, res);
}