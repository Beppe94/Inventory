import express from "express";
import route from "../routes/router.js";
import "dotenv/config";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const ENV = process.env;

const viewsPath = process.env.NETLIFY 
    ? path.join(process.cwd(), 'views')
    : process.env.NETLIFY_DEV
    ? path.join(__dirname, '../views')
    : path.join(__dirname, 'views');

app.set("views", viewsPath);
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const staticPath = process.env.NETLIFY
  ? path.join(process.cwd(), 'public')
  : path.join(__dirname, '../public');
app.use(express.static(staticPath));

app.use(express.static(staticPath));
app.use("/", route);

//app.listen(ENV.PORT, () => console.log(`Listening on port: ${ENV.PORT}`));
export default app;