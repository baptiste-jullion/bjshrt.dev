export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, "id");

    const { rows } =
        await db.sql`SELECT * FROM links WHERE shortenedUrl = ${id}`;

    if (!rows || rows?.length === 0) {
        throw createError({
            statusCode: 404,
            statusMessage: "Link not found",
        });
    }

    return rows[0] as LinkRead;
});
