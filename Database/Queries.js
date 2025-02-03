import client from "./pools.js";

export async function getGames() {
    const { rows } = await client.query(`SELECT * FROM games INNER JOIN info ON games.id = info.game_id`);
    
    return rows;
}

export async function insertGameInDB(data) {
    const {
        title, 
        description,
        image,
        price,
        publisher,
        reviews,
        genre
    } = data;

    const game = await client.query(`INSERT INTO games (title, description, image, price) VALUES ($1, $2, $3, $4) RETURNING id`, [title, description, image, price])
    const gameId = game.rows[0].id

    await client.query(`INSERT INTO info (game_id, publisher, reviews, genre) VALUES ($1, $2, $3, $4)`, [gameId, publisher, reviews, genre])
}