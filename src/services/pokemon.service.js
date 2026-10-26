import { randomUUID } from "node:crypto";
import db from "../database/db.js";

export async function listarPokemons() {
    return db("pokemons")
        .join(
            "treinadores",
            "pokemons.treinador_id",
            "treinadores.id"
        )
        .select(
            "pokemons.*",
            "treinadores.nome as treinador_nome"
        )
        .orderBy("pokemons.ordem_captura");
}

export async function buscarPokemonPorId(id) {
    return db("pokemons")
        .join(
            "treinadores",
            "pokemons.treinador_id",
            "treinadores.id"
        )
        .select(
            "pokemons.*",
            "treinadores.nome as treinador_nome"
        )
        .where("pokemons.id", id)
        .first();
}

export async function criarPokemon(dados) {
    const ultimo = await db("pokemons")
        .max("ordem_captura as maior")
        .first();

    const ordem = dados.ordem_captura ??
        (Number(ultimo.maior || 0) + 1);

    const [pokemon] = await db("pokemons")
        .insert({
            id: randomUUID(),
            nome: dados.nome,
            nivel: dados.nivel,
            tipo: dados.tipo,
            ordem_captura: ordem,
            treinador_id: dados.treinador_id
        })
        .returning("*");

    return pokemon;
}

export async function atualizarPokemon(id, dados) {
    const atualizacao = {};

    const campos = [
        "nome",
        "nivel",
        "tipo",
        "ordem_captura",
        "treinador_id"
    ];

    for (const campo of campos) {
        if (dados[campo] !== undefined) {
            atualizacao[campo] = dados[campo];
        }
    }

    if (Object.keys(atualizacao).length === 0) {
        return buscarPokemonPorId(id);
    }

    const [pokemon] = await db("pokemons")
        .where({ id })
        .update(atualizacao)
        .returning("*");

    return pokemon || null;
}

export async function excluirPokemon(id) {
    const [pokemon] = await db("pokemons")
        .where({ id })
        .delete()
        .returning("*");

    return pokemon || null;
}

export async function atualizarPokemon(id, dados) {
    const pokemon = await db("pokemons")
        .where({ id })
        .first();

    if (!pokemon) {
        return null;
    }

    await db("pokemons")
        .where({ id })
        .update(dados);

    return await db("pokemons")
        .where({ id })
        .first();
}