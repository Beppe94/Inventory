import { getGames, insertGameInDB } from "../Database/Queries.js";

export async function getHomepage(req, res) {
    const data = await getGames();

    console.log(data);
    res.render("home", {data: data});
}

export function newGameForm(req, res) {
    res.render("newGame");
}

export async function newGamePost(req, res) {
    const {
        title, 
        description,
        image,
        price,
        publisher,
        reviews,
        genre
    } = req.body;

    console.log(title,description, image ,price,publisher,reviews,genre);

    await insertGameInDB({title, description, image, price, publisher, reviews, genre})

    res.redirect("/")
}