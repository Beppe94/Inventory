import { Router } from "express";
import { getHomepage, newGameForm, newGamePost, updateGame } from "../Controller/controller.js";

const route = Router();

//Routes 
route.get("/", getHomepage);
route.get("/newGame", newGameForm);
route.post("/newGame", newGamePost);
route.get("/:id/updateGame", updateGame);

export default route;