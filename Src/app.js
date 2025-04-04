import express from "express";
import route from "../Routes/router.js";
import "dotenv/config";
import path from "path";

const app = express();
const ENV = process.env;

app.set("views", "Views");
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join("./Public")));
app.use("/", route);

app.listen(ENV.PORT, () => console.log(`Listening on port: ${ENV.PORT}`));

export default app;