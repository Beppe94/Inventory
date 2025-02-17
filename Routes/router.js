import { Router } from "express";
import { getHomepage, newGameGet, newGamePost, removeGame } from "../Controller/controller.js";

const route = Router();

//Routes 
route.get("/", getHomepage, removeGame);
route.get("/newGame", newGameGet);
route.post("/newGame", newGamePost);
route.get("/:id/updateGame", newGameGet);
route.post("/:id/updateGame", newGamePost)
route.get("/:id/delete", removeGame);
route.post("/:id/delete", removeGame);

export default route;