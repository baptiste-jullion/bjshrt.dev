const db = useDatabase();

(async () => {
    await db.sql`CREATE TABLE IF NOT EXISTS links (
    originalUrl TEXT,
    shortenedUrl TEXT,
    clicks INTEGER DEFAULT 0,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`;
})();

export default db;
