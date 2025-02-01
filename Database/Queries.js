import client from "./pools.js";

export async function getGames() {
    const { rows } = await client.query(`SELECT * FROM games INNER JOIN info ON games.id = info.game_id`);
    
    return rows;
}
