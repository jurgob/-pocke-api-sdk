import { z } from "zod";
import { PockeApiHTTPError } from "./errors.js";
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
    async function httpRequest<T extends z.ZodTypeAny>(request:SDKHTTPRequest, schema: T): Promise<z.infer<T>>{
        const url = `${coreOptions.baseUrl}${request.endpoint}`;
        const outboundRequest = new Request(url.toString(), {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                ...coreOptions.headers
            }
        });

        const response = await (coreOptions.fetch || globalThis.fetch)(outboundRequest);
         if (!response.ok) {
            throw new PockeApiHTTPError(`Error during http request`, {
                response,
                request: outboundRequest,
                body: await response.text()
            })
         }
            const raw = await response.json();
            return schema.parseAsync(raw);
     }

     return {
        httpRequest
     }
}

export type Core = ReturnType<typeof createCoreClient>;