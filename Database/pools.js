import pkg from "pg";
import { ENV } from "../Src/app.js";

const { Pool }= pkg
const SQL = `
    CREATE TABLE IF NOT EXISTS Games (
        id uuid DEFAULT gen_random_uuid(),
        title VARCHAR ( 100 ) NOT NULL,
        description VARCHAR ( 255 ) NOT NULL,
        releaseDate DATE NOT NULL,
        price DECIMAL (5, 2),
        PRIMARY KEY (id)
    );

    CREATE TABLE IF NOT EXISTS Info (
        game_id UUID NOT NULL,
        publisher VARCHAR ( 100 ),
        reviews DECIMAL ( 2, 1 ),
        genre VARCHAR ( 20 ),
        PRIMARY KEY (game_id),
        FOREIGN KEY (game_id) REFERENCES Games(id) ON DELETE CASCADE
    );
`
const client = new Pool({
    connectionString:`postgresql://${ENV.PGUSER}:${ENV.PGPASSWORD}@${ENV.PGHOST}/${ENV.PGDATABASE}?sslmode=require`
})

export default client;