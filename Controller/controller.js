import { getGames } from "../Database/Queries.js";

export async function getHomepage(req, res) {
    const data = await getGames();

    console.log(data);
    res.render("Home");
}

export function addNewGame(req, res) {
    return 
}

