import express from "express";
import route from "../Routes/router.js";
import "dotenv/config";

const app = express();
export const ENV = process.env;

app.set("views", "Views");
app.set("view engine", "ejs");
app.use(express.json());
app.use("/", route)

app.listen(ENV.PORT, () => console.log(`Listening on port: ${ENV.PORT}`));