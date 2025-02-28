import { findGames, getGames, getGameToEdit, insertGameInDB, removeGameFromDb, updateGame } from "../Database/Queries.js";
import { body, validationResult } from "express-validator";
import "dotenv/config";

const validateGameFields = [
    body("title").trim()
    .notEmpty().withMessage("Field is empty"),
    body("image").trim()
    .notEmpty().withMessage("Field is empty")
    .matches(/\.(jpeg|jpg|png)$/i).withMessage("URL must point to an image"),
    body("price").trim()
    .notEmpty().withMessage("Field is empty")
    .isFloat({max: 100}).withMessage("Max 100"),
    body("reviews").trim()
    .notEmpty().withMessage("Field is empty")
    .isFloat({max: 10}).withMessage("Max 10"),
    body("genre").trim()
    .notEmpty().withMessage("Tags required")
]

export async function getHomepage(req, res) {
    const data = await getGames();
    const search = req.query.search;

    res.status(200).render("home", {data: data});
}

export async function newGameGet(req, res) {
    const id = req.params.id
    let editGame;

    if(id) {
        editGame = await getGameToEdit(id);   
        
        renderFunction(res, editGame[0], {id: id}, []);
    } else {
        renderFunction(res, [], {id: id}, [])
    }
}

export const newGamePost = [validateGameFields, async (req, res) => {
    const errors = validationResult(req);
    const id = req.params.id;
    const {title, image, price, reviews, genre} = req.body;
    const array = [].concat(genre || []);

    //check for errors
    if(!errors.isEmpty()) {
        renderFunction(res, [], {title,image,price,reviews,genre}, errors.array());
        return
    }
    
    //if there's an id, send update info to database
    //else we insert new data row in database
    if(id) {
        await updateGame({id, title, image, price, reviews, genre: JSON.stringify(array)});
    } else {
        await insertGameInDB({title, image, price, reviews, genre: JSON.stringify(array)});   
    }

    res.redirect("/");
}]

export async function removeGame(req, res) {
    const gameId = req.params.id
    const { password } = req.body;
    
    if(password !== process.env.PASSWORD || password.trim() === '') {
        
        return res.json({success: false})
    }

    await removeGameFromDb(gameId);
    return res.json({success: true})
}

export async function searchGamePost(req, res) {
    const search = req.query.search;
    const games = await findGames(search);

    console.log(games);
    

    res.render("gamesFound", {search: search});
}

function renderFunction(res, edit, data, errors) {
    return res.status(200).render("newGame", {
        edit: edit,
        data: data,
        errors: errors
    })
}

