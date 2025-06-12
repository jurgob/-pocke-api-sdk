

import { z } from "zod";
import {GenerationListSchema,GenerationSchema,PockemonListSchema, PockemonSchema,PaginationData} from "./api_types.js"


function convertPaginationData<T extends PaginationData>(response : T): {next: boolean, previous: boolean, count: number} {
    return {
        next: response.next ? true : false,
        previous: response.previous ? true : false,
        count: response.count,
    };
}


type SDKOptions = {
    fetch?: typeof fetch;
    baseUrl?: string;
    headers?: Record<string, string>;
}

type SDKHTTPRequest = {
    endpoint: string;
}

// https://pokeapi.co/
function Core(coreOptions: SDKOptions = {
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

type Core = ReturnType<typeof Core>;

 const getPokemon = async (core: Core, name: string) => {
    return core.httpRquest({endpoint: `/pokemon/${name}`}, PockemonSchema);
}

 const getPokemonList = async (core: Core, limit: number = 20, offset: number = 0) => {
        const endpoint = `/pokemon?limit=${limit}&offset=${offset}`;
        const resp = await core.httpRquest({ endpoint}, PockemonListSchema);
        const result = {
            ...convertPaginationData(resp),
            results:resp.results.map((item) => ({
                name: item.name
            })),
            
        }
        return result
    }

const getGeneration = async (core: Core,name: string) => {
        const endpoint = `/generation/${name}`;
            return core.httpRquest({endpoint},GenerationSchema);
        } 

 const getGenerationList = async (core: Core,limit: number = 10, offset: number = 0) => {
        const endpoint = `/generation?limit=${limit}&offset=${offset}`;
        const resp = await  core.httpRquest({endpoint}, GenerationListSchema);
        const result = {
            ...convertPaginationData(resp),
            results:resp.results.map((item) => ({
                name: item.name
            }))
        }
        return result;
        
    }

function PokeApi(options?: SDKOptions) {
    const core = Core(options);
    return {
        pockemon: {
             get:  getPokemon.bind(null, core),
             list: getPokemonList.bind(null, core)
        },
        generation:{
             get: getGeneration.bind(null, core),
             list: getGenerationList.bind(null, core)
        } 
    };
}


async function main() {
    console.log("PokeApi initialized");
    const pokeApi = PokeApi();
    console.log("Pockemon List:");
    // const pockemonList = await pokeApi.pockemon.list(10, 1);

    // console.dir(pockemonList, { depth: null });
    
    const pockemon = await pokeApi.pockemon.get("pikachu")
    console.log("Pockemon:");
    console.dir(pockemon, { depth: null });
    // const generation = await pokeApi.getGeneration("generation-i");
    // console.log("Generation:", generation);
    // console.log("PokeApi finished");

}

main().catch(console.error);

