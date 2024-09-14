import { createClient } from "@supabase/supabase-js";
import { ActiveSessionResource } from "@clerk/types";

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!;

export function createClerkSupabaseClient(session: ActiveSessionResource | null | undefined) {
    return createClient(supabaseUrl, supabaseAnonKey, {
        global: {
            // Get the custom Supabase token from Clerk
            fetch: async (url, options = {}) => {
                const clerkToken = await session?.getToken({
                    template: "supabase",
                });

                // Insert the Clerk Supabase token into the headers
                const headers = new Headers(options?.headers);
                headers.set("Authorization", `Bearer ${clerkToken}`);

                // Now call the default fetch
                return fetch(url, {
                    ...options,
                    headers,
                });
            },
        },
    });
}
