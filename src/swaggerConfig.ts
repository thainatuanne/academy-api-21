export const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "API da Plataforma Acadêmica",
            version: "1.0.0",
            description: "Documentação da API de Alunos, Login, Avaliações e demais módulos.",
        },
        servers: [
            {
                url: "http://localhost:3000",
                description: "Ambiente de desenvolvimento",
            },
            {
                url: "https://seu-link-render.onrender.com", // atualize depois do deploy
                description: "Ambiente de produção (Render)",
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    apis: ["./src/routes/*.ts"],
};
