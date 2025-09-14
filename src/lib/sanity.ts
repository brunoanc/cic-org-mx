import { createClient } from "@sanity/client";

export const client = createClient({
    projectId: "p73f2w79",
    dataset: "production",
    apiVersion: "v2025-06-14",
    useCdn: true
});
