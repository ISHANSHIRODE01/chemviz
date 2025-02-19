import Sidebar from "./_components/Sidebar"
import Navbar from "./_components/Navbar"
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";

import { ourFileRouter } from "/app/(learning)/api/uploadthing/core";

const LearningDashboard = ({ children }) => {
    return (
        <div className="h-full">
            <div className="h-[80px] md:pl-56 fixed inset-y-0 w-full z-50">
                <Navbar />
            </div>
            <div className="hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-50">
                <Sidebar />
            </div>
            <main className="md:pl-56 pt-[80px] h-full">
                <NextSSRPlugin
                    /**
                     * The `extractRouterConfig` will extract **only** the route configs
                     * from the router to prevent additional information from being
                     * leaked to the client. The data passed to the client is the same
                     * as if you were to fetch `/api/uploadthing` directly.
                     */
                    routerConfig={extractRouterConfig(ourFileRouter)}
                />
                {children}
            </main>
        </div>
    )
}

export default LearningDashboard