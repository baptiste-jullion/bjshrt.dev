<template>
    <div class="w-full max-w-4xl grid md:grid-cols-2 gap-4">
        <Button @click="login('github')"> Login </Button>
        <Button @click="handleLogout()"> Logout </Button>

        <Card class="col-span-full p-4">
            <form class="flex" @submit="onSubmit">
                <FormField name="originalUrl" v-slot="{ componentField }">
                    <FormItem class="grow">
                        <FormControl>
                            <Input
                                placeholder="Enter URL"
                                class="rounded-r-none"
                                v-bind="componentField"
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                </FormField>
                <Button class="rounded-l-none">
                    <Scissors />
                    Shorten URL
                </Button>
            </form>
        </Card>
        <template v-if="loggedIn">
            <AppLinkCard
                v-for="(link, index) in links"
                :key="link.shortenedUrl"
                :link
                :class="{
                    'col-span-full': index === 0,
                }"
            />
        </template>
    </div>
</template>

<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod";
import { Scissors } from "lucide-vue-next";
import { useForm } from "vee-validate";

const { logout, login, loggedIn, clear } = useOidcAuth();

const form = useForm({
    validationSchema: toTypedSchema(ZLinkCreate),
});

const { data: links, refresh } = await useAsyncData(
    "links",
    async () => {
        return await $fetch("/api/links");
    },
    { server: false },
);

const onSubmit = form.handleSubmit(async (values) => {
    await $fetch("/api/links", {
        body: {
            originalUrl: values.originalUrl,
        },
        method: "post",
    });
    await refresh();
});

const handleLogout = async () => {
    await logout();
    await clear();
    await navigateTo("/auth/login");
};
</script>
