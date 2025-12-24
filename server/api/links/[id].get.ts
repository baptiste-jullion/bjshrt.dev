export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, "id");
    const {
        public: { fallbackUrl },
    } = useRuntimeConfig();

    if (!id) {
        return { originalUrl: fallbackUrl };
    }

    const { rows } = await db.sql`
        UPDATE links
        SET clicks = clicks + 1
        WHERE shortenedUrl = ${id}
        RETURNING *
    `;

    if (!rows || rows.length === 0) {
        return { originalUrl: fallbackUrl };
    }

    return rows[0] as LinkRead;
});
