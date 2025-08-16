import { z } from "zod";

export const ZLinkCreate = z.object({
    originalUrl: z.url(),
});
export type LinkCreate = z.infer<typeof ZLinkCreate>;

export const ZLinkRead = ZLinkCreate.extend({
    shortenedUrl: z.string(),
    clicks: z.number().default(0),
    createdAt: z.iso.datetime(),
});
export type LinkRead = z.infer<typeof ZLinkRead>;

export const ZLinkList = z.array(ZLinkRead);
export type LinkList = z.infer<typeof ZLinkList>;
