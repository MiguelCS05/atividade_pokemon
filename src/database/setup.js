import { randomUUID } from "node:crypto";
import db from "./db.js";

export async function setupDatabase() {
    const existeTreinadores = await db.schema.hasTable("treinadores");

    if (!existeTreinadores) {
        await db.schema.createTable("treinadores", (table) => {
            table.uuid("id").primary();
            table.string("nome", 100).notNullable();
        });
    }

    const existePokemons = await db.schema.hasTable("pokemons");

    if (!existePokemons) {
        await db.schema.createTable("pokemons", (table) => {
            table.uuid("id").primary();
            table.string("nome", 100).notNullable();
            table.integer("nivel").notNullable();
            table.string("tipo", 50).notNullable();
            table.integer("ordem_captura").notNullable();

            table.uuid("treinador_id")
                .notNullable()
                .references("id")
                .inTable("treinadores")
                .onDelete("CASCADE");
        });
    }

    let treinador = await db("treinadores").first();

    if (!treinador) {
        const [novoTreinador] = await db("treinadores")
            .insert({
                id: randomUUID(),
                nome: "Treinador Principal"
            })
            .returning("*");

        treinador = novoTreinador;
    }

    const [{ total }] = await db("pokemons").count("* as total");

    if (Number(total) === 0) {
        await db("pokemons").insert([
            {
                id: randomUUID(),
                nome: "Decidueye",
                nivel: 100,
                tipo: "grama/fantasma",
                ordem_captura: 1,
                treinador_id: treinador.id
            },
            {
                id: randomUUID(),
                nome: "Gallade",
                nivel: 77,
                tipo: "psiquico/lutador",
                ordem_captura: 2,
                treinador_id: treinador.id
            },
            {
                id: randomUUID(),
                nome: "Zoroark",
                nivel: 84,
                tipo: "sombrio",
                ordem_captura: 3,
                treinador_id: treinador.id
            },
            {
                id: randomUUID(),
                nome: "Baxcalibur",
                nivel: 76,
                tipo: "dragao/gelo",
                ordem_captura: 4,
                treinador_id: treinador.id
            },
            {
                id: randomUUID(),
                nome: "Melmetal",
                nivel: 81,
                tipo: "aço",
                ordem_captura: 5,
                treinador_id: treinador.id
            },
            {
                id: randomUUID(),
                nome: "Regigigas",
                nivel: 100,
                tipo: "normal",
                ordem_captura: 6,
                treinador_id: treinador.id
            }
        ]);
    }
}