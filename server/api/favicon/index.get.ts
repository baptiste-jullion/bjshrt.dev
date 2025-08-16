export default defineEventHandler(async (event) => {
    const { url } = getQuery<{ url: string }>(event);

    if (!url) {
        throw createError({
            statusCode: 400,
            statusMessage: "URL parameter is required",
        });
    }

    const faviconUrl = `https://www.google.com/s2/favicons?domain=${encodeURIComponent(url)}&sz=16`;

    return faviconUrl;
});
