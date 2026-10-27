
import { pool } from "../database/db.js";

class pokemonService {
    async getall() {
        const res = await pool.query("SELECT * FROM pokemons");
        return res.rows;
    }

    async getById(id) {
        const res = await pool.query(
            "SELECT * FROM pokemons WHERE id = $1",
            [id]
        );
        return res.rows[0];
    }

    async create(nome, nivel, tipo, treinador_id) {
        const res = await pool.query(
            "INSERT INTO pokemons (nome, nivel, tipo, treinador_id) VALUES ($1, $2, $3, $4) RETURNING *",
            [nome, nivel, tipo, treinador_id]
        );
        return res.rows[0];
    }

    async update(id, nome, nivel, tipo, treinador_id) {
        const res = await pool.query(
            "UPDATE pokemons SET nome = $2, nivel = $3, tipo = $4, treinador_id = $5 WHERE id = $1 RETURNING *",
            [id, nome, nivel, tipo, treinador_id]
        );
        return res.rows[0];
    }

    async patch(id, dados) {
        const campos = [];
        const valores = [];
        let numero = 1;

        for (const campo in dados) {
            campos.push(`${campo} = $${numero}`);
            valores.push(dados[campo]);
            numero++;
        }

        valores.push(id);

        const res = await pool.query(
            `UPDATE pokemons SET ${campos.join(", ")} WHERE id = $${numero} RETURNING *`,
            valores
        );

        return res.rows[0];
    }
}

export const pokemonServices = new pokemonService();
