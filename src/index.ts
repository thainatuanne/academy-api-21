import app from "./app";
import { envs } from "./envs";

app.listen(envs.PORT, () => {
    console.log(`Server is running on port ${envs.PORT}`);
});
