import { z } from "zod";
export type SDKOptions = {
    fetch?: typeof fetch;
    baseUrl?: string;
    headers?: Record<string, string>;
}

type SDKHTTPRequest = {
    endpoint: string;
}


export function createCoreClient(coreOptions: SDKOptions = {
    baseUrl: "https://pokeapi.co/api/v2",
    fetch: globalThis.fetch
}) {
    async function httpRquest<T extends z.ZodTypeAny>(request:SDKHTTPRequest, schema: T): Promise<z.infer<T>>{
        console.log("Making HTTP request to:", request.endpoint);
        const url = `${coreOptions.baseUrl}${request.endpoint}`;
        // const url = new URL(request.endpoint, CoreOptions.baseUrl);
        console.log("Request URL:", url.toString());
        const response = await fetch(new Request(url.toString(), {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                ...coreOptions.headers
            }
        }));
         if (!response.ok) {
            throw new Error(`Error during http request: ${response.statusText}`);
         }
            const raw = await response.json();
            return schema.parseAsync(raw);
     }

     return {
        httpRquest
     }
}

export type Core = ReturnType<typeof createCoreClient>;