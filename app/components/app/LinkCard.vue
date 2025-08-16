<template>
    <Card class="p-4">
        <section class="flex flex-col gap-2">
            <div>
                <div class="flex items-center gap-2">
                    <h2
                        class="font-bold truncate flex items-center gap-1 cursor-pointer"
                        title="Click to copy shortened link"
                        @click="copyLink()"
                    >
                        <Button size="sm" variant="outline" disabled>
                            {{ shortenedUrl.base }}
                        </Button>
                        <span class="font-mono">
                            {{ shortenedUrl.pathname }}
                        </span>
                    </h2>
                    <div class="ml-auto flex gap-1">
                        <DropdownMenu>
                            <DropdownMenuTrigger as-child>
                                <Button variant="ghost" size="sm">
                                    <Ellipsis />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent class="w-56" align="end">
                                <DropdownMenuGroup>
                                    <DropdownMenuItem
                                        @click="
                                            navigateTo(shortenedUrl.href, {
                                                external: true,
                                                open: { target: '_blank' },
                                            })
                                        "
                                    >
                                        <span>Open in a new tab</span>
                                        <ExternalLink
                                            class="ml-auto size-3.5"
                                        />
                                    </DropdownMenuItem>
                                    <DropdownMenuItem @click="copyLink()">
                                        <span>Copy shortened link</span>
                                        <Copy class="ml-auto size-3.5" />
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>
                                <DropdownMenuSeparator />
                                <DropdownMenuGroup>
                                    <DropdownMenuItem disabled>
                                        <span>Edit</span>
                                        <Pencil class="ml-auto size-3.5" />
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        variant="destructive"
                                        disabled
                                    >
                                        <span>Delete</span>
                                        <Trash class="ml-auto size-3.5" />
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
                <Tooltip :delay-duration="500">
                    <TooltipTrigger class="max-w-full mt-2">
                        <a
                            tabindex="-1"
                            :href="link.originalUrl"
                            class="flex items-center gap-2"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <img
                                :src="favicon"
                                class="size-6 bg-white border rounded p-1"
                            />
                            <small
                                class="text-foreground/50 hover:text-foreground duration-100 truncate block"
                            >
                                {{ link.originalUrl }}
                            </small>
                        </a>
                    </TooltipTrigger>
                    <TooltipContent side="bottom" :side-offset="0">
                        <p>{{ link.originalUrl }}</p>
                    </TooltipContent>
                </Tooltip>
            </div>
            <div class="flex items-center gap-2">
                <Badge variant="outline">
                    <MousePointerClick /> {{ link.clicks }} clicks
                </Badge>
                <HoverCard>
                    <HoverCardTrigger>
                        <Badge variant="outline" class="cursor-pointer">
                            <QrCode /> QR Code
                        </Badge>
                    </HoverCardTrigger>
                    <HoverCardContent class="p-0 overflow-hidden">
                        <div class="relative group">
                            <img
                                :src="qrcode"
                                class="size-full"
                                alt=""
                                style="image-rendering: optimizeSpeed"
                            />
                            <Button
                                variant="outline"
                                class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 duration-200"
                                as="a"
                                :href="qrcode"
                                :download="`qrcode_${link.shortenedUrl}.png`"
                            >
                                <ImageDown /> Download
                            </Button>
                        </div>
                    </HoverCardContent>
                </HoverCard>
            </div>
        </section>
    </Card>
</template>

<script setup lang="ts">
import { useClipboard } from "@vueuse/core";
import { useQRCode } from "@vueuse/integrations/useQRCode";
import {
    Copy,
    Ellipsis,
    ExternalLink,
    ImageDown,
    MousePointerClick,
    Pencil,
    QrCode,
    Trash,
} from "lucide-vue-next";
import { toast } from "vue-sonner";

const { link } = defineProps<{
    link: LinkRead;
}>();

const { data: favicon } = await useFetch("/api/favicon", {
    query: {
        url: link.originalUrl,
    },
});

const { baseShortenedUrl } = useRuntimeConfig().public;

const shortenedUrl = computed(() => {
    const url = new URL(link.shortenedUrl, baseShortenedUrl);
    return {
        href: url.href,
        base: url.hostname,
        pathname: url.pathname,
    };
});

const qrcode = useQRCode(() => shortenedUrl.value.href);

const { copy } = useClipboard();

const copyLink = () => {
    copy(shortenedUrl.value.href);
    toast.success("Shortened link copied to clipboard", {
        duration: 1000,
        dismissible: true,
    });
};
</script>
