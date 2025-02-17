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

    const game = await client.query(`INSERT INTO games (title, image, price) VALUES ($1, $2, $3) RETURNING id`, [title, image, price]);
    const gameId = game.rows[0].id;

    await client.query(`INSERT INTO info (game_id, reviews, genre) VALUES ($1, $2, $3)`, [gameId, reviews, genre]);
}

export async function getGameToEdit(id) {
    const { rows } = await client.query(`SELECT * FROM games INNER JOIN info ON games.id = info.game_id WHERE games.id = ($1)`, [id]);
    
    return rows;
}

export async function updateGame(data) {
    const { id, title, image, price, reviews, genre } = data;

    await client.query(`UPDATE games SET title = $1, image = $2, price = $3 WHERE id = $4`, [title, image, price, id]);
    await client.query(`UPDATE info SET reviews = $1, genre = $2 WHERE game_id = $3`, [reviews, genre, id]);
}

export async function removeGameFromDb(id) {
    await client.query(`DELETE FROM games WHERE games.id = $1`, [id]);
}