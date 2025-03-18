import express from "express";
import { envs } from "./envs";
import { AlunosRoutes } from "./routes/alunos.routes";
import { TurmasRoutes } from "./routes/turmas.routes";

const app = express();
app.use(express.json());

app.get("/", (_, res) => {
    res.status(200).json({
        sucesso: true,
        mensagem: "API is running",
    });
});

app.use(AlunosRoutes.bind());
app.use(TurmasRoutes.bind());

app.listen(envs.PORT, () => console.log("Server is running"));