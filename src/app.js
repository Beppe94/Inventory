import express from "express";
import route from "../routes/router.js";
import "dotenv/config";
import path from "path";
//import { fileURLToPath } from "url";

// const getDirName = (metaUrl) => {
//     const filename = fileURLToPath(metaUrl);
//     return path.dirname(filename);
// };

// const currDir = getDirName(import.meta.url);

const app = express();
const ENV = process.env;

// const viewsPath = process.env.NETLIFY 
//   ? path.join(process.cwd(), 'views') 
//   : path.join(currDir, '../views');

app.set("views", path.join("views"));
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// const staticPath = process.env.NETLIFY
//   ? path.join(process.cwd(), 'public')
//   : path.join(currDir, '../public');


app.use(express.static(path.join("public")));
app.use("/", route);

//app.listen(ENV.PORT, () => console.log(`Listening on port: ${ENV.PORT}`));
export default app;