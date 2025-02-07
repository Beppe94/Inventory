import client from "./pools.js";

export async function getGames() {
    const { rows } = await client.query(`SELECT * FROM games INNER JOIN info ON games.id = info.game_id`);
    
    return rows;
}

export async function insertGameInDB(data) {
    const {
        title,
        image,
        price,
        reviews,
        genre
    } = data;

    const game = await client.query(`INSERT INTO games (title, image, price) VALUES ($1, $2, $3) RETURNING id`, [title, image, price])
    const gameId = game.rows[0].id

    await client.query(`INSERT INTO info (game_id, reviews, genre) VALUES ($1, $2, $3)`, [gameId, reviews, genre])
}

