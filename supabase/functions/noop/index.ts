// supabase/functions/noop/index.ts
import { serve } from "https://deno.land/std/http/server.ts";

serve((_req) => {
  return new Response("OK", { status: 200 });
});
