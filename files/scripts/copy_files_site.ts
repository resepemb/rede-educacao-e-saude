import { copy } from "https://deno.land/std/fs/copy.ts";

await copy('./static/images/', './_site/static/images', { overwrite: true });
await copy('./static/requests_content/', './_site/static/requests_content', { overwrite: true });
await copy('./sw.js', './_site/sw.js', { overwrite: true });

