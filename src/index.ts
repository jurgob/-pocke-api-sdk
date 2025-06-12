

// import { z } from "zod";
import { createCoreClient, Core, SDKOptions } from "./core.js";
import {getPokemon, getPokemonList} from "./funcs/pockemon.js";
import {getGeneration, getGenerationList} from "./funcs/generation.js";




function createClient(options?: SDKOptions) {
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


async function main() {
    console.log("PokeApi initialized");
    const pokeApi = createClient();
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

