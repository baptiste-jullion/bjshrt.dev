export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, "id");

    if (!id) {
        throw createError({
            statusCode: 400,
            statusMessage: "Missing link identifier",
        });
    }

    const { rows } = await db.sql`
        DELETE FROM links WHERE shortenedUrl = ${id}
        RETURNING shortenedUrl
    `;

    if (!rows?.length) {
        throw createError({
            statusCode: 404,
            statusMessage: "Link not found",
        });
    }

    return { success: true };
});
