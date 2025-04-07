import express from "express";
import route from "../routes/router.js";
import "dotenv/config";
import path from "path";

const app = express();
const ENV = process.env;

app.set("views", path.join("views"));
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join("./public")));
app.use("/", route);

//app.listen(ENV.PORT, () => console.log(`Listening on port: ${ENV.PORT}`));
export default app;