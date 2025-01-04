import { Router } from "express";
import { getHomepage } from "../Controller/controller.js";

const route = Router();

//Routes 
route.get("/", getHomepage);

export default route;