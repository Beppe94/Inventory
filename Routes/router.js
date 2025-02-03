import { Router } from "express";
import { getHomepage, newGameForm, newGamePost } from "../Controller/controller.js";

const route = Router();

//Routes 
route.get("/", getHomepage);
route.get("/newGame", newGameForm);
route.post("/newGame", newGamePost);

export default route;