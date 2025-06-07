import express from "express";
import cors from "cors";
import { envs } from "./envs";

import { AlunosRoutes } from "./routes/alunos.routes";
import { TurmasRoutes } from "./routes/turmas.routes";
import { MatriculasRoutes } from "./routes/matriculas.routes";
import { AuthRoutes } from "./routes/auth.routes";
import { FasRoutes } from "./routes/fas.routes";
import { ProjetosRoutes } from "./routes/projetos.routes";
import { AvaliacoesRoutes } from "./routes/avaliacoes.routes";

import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import { swaggerOptions } from "./swaggerConfig";
const app = express();

app.use(express.json());
app.use(cors());

const specs = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.get("/", (_, res) => {
    res.status(200).json({
        sucesso: true,
        mensagem: "API is running",
    });
});

app.use(AlunosRoutes.bind());
app.use(TurmasRoutes.bind());
app.use(MatriculasRoutes.bind());
app.use(AuthRoutes.bind());
app.use(FasRoutes.bind());
app.use(ProjetosRoutes.bind());
app.use(AvaliacoesRoutes.bind()); 

app.listen(envs.PORT, () => {
    console.log(`Server is running on port ${envs.PORT}`);
});
