import knexConfig from "knex"
import "dotenv/config"

export const knex = knexConfig({
    client: "pg",
    connection: {},
    debug: true
})