import express from "express";

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


app.listen(3030, () => console.log("Server is running...")); // executa uma função para saber se o servidor está funcionando 

// 