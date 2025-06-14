import { createCoreClient, SDKOptions } from "./core.js";
import {getPokemon, getPokemonList} from "./funcs/pokemon.js";
import {getGeneration, getGenerationList} from "./funcs/generation.js";

// Export types for consumers
export type { SDKOptions } from "./core.js";
export { PockeApiHTTPError } from "./errors.js";
export { 
    PokemonSchema, 
    PokemonListSchema, 
    GenerationSchema, 
    GenerationListSchema,
    convertPaginationData 
} from "./api_types.js";
export type { PaginationData } from "./api_types.js";

// Export type inferences
import { z } from "zod";
import { PokemonSchema, GenerationSchema } from "./api_types.js";
export type Pokemon = z.infer<typeof PokemonSchema>;
export type Generation = z.infer<typeof GenerationSchema>;




export function createClient(options?: SDKOptions) {
    const core = createCoreClient(options);
    return {
        pokemon: {
             get:  getPokemon.bind(null, core),
             list: getPokemonList.bind(null, core)
        },
        generation:{
             get: getGeneration.bind(null, core),
             list: getGenerationList.bind(null, core)
        } 
    };
}


