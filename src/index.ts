import express from "express";
import { envs } from "./envs";
import { AlunosRoutes } from "./routes/alunos.routes";

const app = express();

// qual o padrão de comunicação de api? rest

app.use(express.json()); // app entenda e responsa em json
// ... definição de rotas
app.get("/", (req, res, next) => {
    res.status(200).json({
        sucess: true,
        message: "Api is running.",
    });
});

app.use(AlunosRoutes.bind());

const PORT = 3030; // Define a porta corretamente

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`)); // executa uma função para saber se o servidor está funcionando 