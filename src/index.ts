

// import { z } from "zod";
import { createCoreClient, SDKOptions } from "./core.js";
import {getPokemon, getPokemonList} from "./funcs/pockemon.js";
import {getGeneration, getGenerationList} from "./funcs/generation.js";




export function createClient(options?: SDKOptions) {
    const core = createCoreClient(options);
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


