import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: "2025-07-15",
    devtools: { enabled: true },
    css: ["~/assets/css/tailwind.css"],

    vite: {
        plugins: [tailwindcss()],
    },

    modules: ["shadcn-nuxt", "@nuxt/fonts", "nuxt-oidc-auth", "@nuxt/icon"],

    shadcn: {
        componentDir: "./app/components/ui",
        prefix: "",
    },

    nitro: {
        experimental: {
            database: true,
        },
    },

    runtimeConfig: {
        whitelistedUsers: "",
        public: {
            baseShortenedUrl: "",
            fallbackUrl: "",
        },
    },

    oidc: {
        providers: {
            github: {
                skipAccessTokenParsing: true,
                redirectUri: `${process.env.NUXT_PUBLIC_BASE_SHORTENED_URL}/auth/github/callback`,
                clientId: "",
                clientSecret: "",
                filterUserInfo: ["id"],
            },
        },
        middleware: {
            globalMiddlewareEnabled: false,
        },
        defaultProvider: "github",
    },

    icon: {
        mode: "svg",
    },
});
