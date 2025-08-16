export default defineEventHandler(async () => {
    const { rows } = await db.sql`SELECT * FROM links ORDER BY createdAt DESC`;

    return rows as LinkList;
});
