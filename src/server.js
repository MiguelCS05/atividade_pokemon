import express from "express";
import { pokemonsRouter } from "./routes/pokemon.route.js";
import { treinadoresRouter } from "./routes/treinador.route.js";
import { setupDatabase } from "./database/setup.js";

const app = express();
const port = 3000

app.use(express.json());

app.use("/pokemons", pokemonsRouter);
app.use("/treinadores", treinadoresRouter);

app.get("/", (req, res) => {
    res.json({ mensgem: "API de Pokémon rodando."});
});

setupDatabase()
       .then(() => {
        app.listen(port, () => {
            console.log(`App rodando em http://localhost:${port}`);
        });
       })
       .catch((erro) => {
        console.error("Erro ao iniciar a API", erro.message);
        process.exit(1);
       });