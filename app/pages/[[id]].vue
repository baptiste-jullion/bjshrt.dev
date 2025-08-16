<script setup lang="ts">
definePageMeta({
    middleware: [
        async (to) => {
            if (import.meta.server) return;
            if (!to.params.id) return navigateTo("/404");
            const link = await $fetch(`/api/links/${to.params.id}`);
            if (!link?.originalUrl) return navigateTo("/404");
            await navigateTo(link.originalUrl, {
                external: true,
                redirectCode: 301,
            });
        },
    ],
});
</script>
