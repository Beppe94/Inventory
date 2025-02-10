import { getGames, getGameToEdit, insertGameInDB, updateGame } from "../Database/Queries.js";
import { body, validationResult } from "express-validator";

const validateGameFields = [
    body("title").trim()
    .notEmpty().withMessage("Field is empty"),
    body("image").trim()
    .notEmpty().withMessage("Field is empty")
    .matches(/\.(jpeg|jpg|png)$/i).withMessage("URL must point to an image"),
    body("price").trim()
    .notEmpty().withMessage("Field is empty")
    .isFloat({max: 100}).withMessage("Price must be within 100"),
    body("reviews").trim()
    .notEmpty().withMessage("Field is empty")
    .isFloat({max: 10}).withMessage("Review must be within 10"),
    body("genre").trim()
    .notEmpty().withMessage("Tags required")
]

export async function getHomepage(req, res) {
    const data = await getGames();
    
    res.status(200).render("home", {data: data});
}

export function newGameGet(req, res) {
    const id = req.params.id
    res.status(200).render("newGame", {data: {id: id} , errors: []});
}

export const newGamePost = [validateGameFields, async (req, res) => {
    const errors = validationResult(req);
    const id = req.params.id;
    const {title, image, price, reviews, genre} = req.body;
    const array = [].concat(genre || []);
    const editGame = await getGameToEdit(id);

    if(!errors.isEmpty()) {
        return res.status(400).render("newGame", {
            data: {title, image, price, reviews, genre},
            errors: errors.array()
        });
    }

    if(id) {
        await updateGame({id, title, image, price, reviews, genre: JSON.stringify(array)});
    } else {
        
        await insertGameInDB({title, image, price, reviews, genre: JSON.stringify(array)})
    }
    res.redirect("/");
}]

