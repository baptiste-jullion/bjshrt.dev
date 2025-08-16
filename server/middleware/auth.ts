import { getUserSession } from "nuxt-oidc-auth/runtime/server/utils/session.js";
import { UserSession } from "nuxt-oidc-auth/runtime/types.js";

export default defineEventHandler(async (event) => {
    const { pathname } = getRequestURL(event);
    let userInfo: UserSession["userInfo"];

    try {
        const { userInfo: _userInfo } = await getUserSession(event);
        userInfo = _userInfo;
    } catch {
        userInfo = undefined;
    }

    const userId = userInfo?.id as number | undefined;

    const requiresAuthPaths = ["/api/links/"];

    const { whitelistedUsers } = useRuntimeConfig();

    const mappedWhitelistedUsers = whitelistedUsers.toString().split(",");

    if (requiresAuthPaths.includes(pathname)) {
        console.log("requires auth");
        if (!userId || !mappedWhitelistedUsers.includes(userId.toString())) {
            sendRedirect(event, "/auth/login");
        }
    }
});
