import knex from "knex";
import "dotenv/config";

const db = knex({
    client: "pg",
    connection: {
        host: process.env.PGHOST,
        port:
        Number(process.env.PGPORT),
        database: process.env.PGDATABASE,
        user: process.env.PGUSER,
        password: process.env.PGPASSWORD
    }
});

export default db