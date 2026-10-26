import { randomUUID } from "node:crypto";
import db from "../database/db.js";

export async function listarTreinadores() {
    return db("treinadores")
        .select("*")
        .orderBy("nome");
}

export async function buscarTreinadorPorId(id) {
    return db("treinadores")
        .where({ id })
        .first();
}

export async function criarTreinador(nome) {
    const [treinador] = await db("treinadores")
        .insert({
            id: randomUUID(),
            nome
        })
        .returning("*");

    return treinador;
}

export async function atualizarTreinador(id, dados) {
    if (dados.nome === undefined) {
        return buscarTreinadorPorId(id);
    }

    const [treinador] = await db("treinadores")
        .where({ id })
        .update({ nome: dados.nome })
        .returning("*");

    return treinador || null;
}

export async function excluirTreinador(id) {
    const [treinador] = await db("treinadores")
        .where({ id })
        .delete()
        .returning("*");

    return treinador || null;
}