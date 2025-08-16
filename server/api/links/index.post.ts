export default defineEventHandler<{
    body: LinkCreate;
}>(async (event) => {
    const { originalUrl } = await readBody(event);

    const uniqueShortUrl = await $fetch("/api/urls/unique-short");

    await db.sql`INSERT INTO links (originalUrl, shortenedUrl) VALUES (${originalUrl}, ${uniqueShortUrl})`;
});
