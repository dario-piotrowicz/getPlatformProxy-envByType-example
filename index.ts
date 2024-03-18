import { getPlatformProxy } from "wrangler";
import type { KVNamespace } from '@cloudflare/workers-types/2022-10-31';

const { envByType, dispose } = await getPlatformProxy<{
	MY_KV_1: KVNamespace<'my-key'>;
	MY_KV_2: KVNamespace;
	MY_KV_3: KVNamespace;
	MY_VAR_A: "my var A";
	MY_VAR_B: "my var B";
	MY_DO: DurableObjectNamespace;
	MY_R2: R2Bucket;
	DB: D1Database;
	MY_SERVICE: Fetcher;
	MY_QUEUE: Queue;
	AI: unknown;
}>();

console.log('');

console.log(`my KVs are: ${Object.keys(envByType.kv).join(', ')}`); // my KVs are: MY_KV_1, MY_KV_2, MY_KV_3

const myKv = envByType.kv.MY_KV_1;

// @ts-expect-error (MY_KV is typed with 'my-key' so we can't use 'key' here)
// (note: this shows that the type of MY_KV_1 is taken from the user provided Env type)
await myKv.put('key', 'my-value');

await myKv.put('my-key', 'my-value');
const value = await myKv.get('my-key');

console.log(`the value is: ${value}`);

await dispose();

console.log('');
