import express from "express";
import route from "../routes/router.js";
import "dotenv/config";
import path from "path";
import { fileURLToPath } from "url";

const __file = fileURLToPath(import.meta.url);
const __dir = path.dirname(__file);

const app = express();
const ENV = process.env;

const viewsPath = process.env.NETLIFY 
    ? path.join(process.cwd(), 'views')
    : process.env.NETLIFY_DEV
    ? path.join(__dir, '../views')
    : path.join(__dir, 'views');

app.set("views", viewsPath);
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const staticPath = process.env.NETLIFY
  ? path.join(process.cwd(), 'public')
  : path.join(__dir, '../public');
app.use(express.static(staticPath));

app.use(express.static(staticPath));
app.use("/", route);

//app.listen(ENV.PORT, () => console.log(`Listening on port: ${ENV.PORT}`));
export default app;