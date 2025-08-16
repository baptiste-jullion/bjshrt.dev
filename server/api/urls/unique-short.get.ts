import { nanoid } from "nanoid";

export default defineEventHandler(async () => {
    let nanoidLength = 6;
    let uniqueShortUrl = nanoid(nanoidLength);

    let exists = false;
    let attempts = 0;

    do {
        const { rows } =
            await db.sql`SELECT * FROM links WHERE shortenedUrl = ${uniqueShortUrl}`;
        if (rows?.length && rows.length > 0) {
            exists = true;
            uniqueShortUrl = nanoid(nanoidLength);
        } else {
            exists = false;
            attempts++;
            if (attempts > 10) {
                nanoidLength++;
            }
        }
    } while (exists);

    return uniqueShortUrl;
});
