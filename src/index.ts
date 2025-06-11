

import { z } from "zod";
import {GenerationListSchema,GenerationSchema,PockemonListSchema, PockemonSchema,PaginationData} from "./api_types.js"


function convertPaginationData<T extends PaginationData>(response : T): {next: boolean, previous: boolean, count: number} {
    return {
        next: response.next ? true : false,
        previous: response.previous ? true : false,
        count: response.count,
    };
}


function PokeApi(){
    const fetcher = fetch
    async function httpRquest<T extends z.ZodTypeAny>(request:Request, schema: T): Promise<z.infer<T>>{
        const response = await fetcher(request);
         if (!response.ok) {
            throw new Error(`Error during http request: ${response.statusText}`);
         }
            const raw = await response.json();
            return schema.parseAsync(raw);
     }

    const getPokemon = async (name: string) => {
        return httpRquest(new Request(`https://pokeapi.co/api/v2/pokemon/${name}?limit=1`), PockemonSchema);
    }
    const getPokemonList = async (limit: number = 20, offset: number = 0) => {
        const resp = await httpRquest(new Request(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`), PockemonListSchema);
        const result = {
            ...convertPaginationData(resp),
            results:resp.results.map((item) => ({
                name: item.name
            })),
            
        }
        return result
    }
    const getGeneration = async (name: string) => {
            return httpRquest(new Request(`https://pokeapi.co/api/v2/generation/${name}`),GenerationSchema);
        }   
    const getGenerationList = async (limit: number = 10, offset: number = 0) => {
        const resp = await  httpRquest(new Request(`https://pokeapi.co/api/v2/generation?limit=${limit}&offset=${offset}`), GenerationListSchema);
        const result = {
            ...convertPaginationData(resp),
            results:resp.results.map((item) => ({
                name: item.name
            }))
        }
        return result;
        
    }
    

    return {
       pockemon: {
            get:  getPokemon,
            list: getPokemonList
       },
       generation:{
            get: getGeneration,
            list: getGenerationList
       } 
    };    
}


async function main() {
    console.log("PokeApi initialized");
    const pokeApi = PokeApi();
    console.log("Pockemon List:");
    const pockemonList = await pokeApi.pockemon.list(10, 1);

    console.dir(pockemonList, { depth: null });
    
    // const pockemon = await pokeApi.pockemon.get("pikachu")
    // console.log("Pockemon:");
    // console.dir(pockemon, { depth: null });
    // const generation = await pokeApi.getGeneration("generation-i");
    // console.log("Generation:", generation);
    // console.log("PokeApi finished");

}

main().catch(console.error);

