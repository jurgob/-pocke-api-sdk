import { PockeApiHTTPError } from "./errors.js";
import { createClient} from "./index.js"

async function basicExamples(){
    console.log("PokeApi initialized");
    const pokeApi = createClient();
    
    console.log("Get a specific Pokemon:");
    const pokemon = await pokeApi.pokemon.get("pikachu")
    console.dir(pokemon, { depth: null });

    console.log("Pokemon List:");
    const pokemonList = await pokeApi.pokemon.list(10, 1);
    console.dir(pokemonList, { depth: null });

    console.log("Get Pokemon generation");
    const generation = await pokeApi.generation.get("generation-i");
    console.log("Generation:", generation);

    console.log("Get Pokemon generation list:");
    const generationList = await pokeApi.generation.list(5, 0);
    console.dir(generationList, { depth: null });
}

async function errorHttpExamples() {
    const pokeApi = createClient();
    try{
        const pokemon = await pokeApi.pokemon.get("not-existing-chu")
        console.dir(pokemon, { depth: null });
    }catch (error) {
        if (error instanceof PockeApiHTTPError) {
            console.error("PockeApiHTTPError:", error.message);
            console.error("Status Code:", error.statusCode);
            console.error("Response Body:", error.body);
        } else if(error instanceof TypeError){
            console.error("Probably some network error happend:", error);
        } else{
            console.error("Unexpected error happend:", error);
        }
    }
}

async function errorNetworkExamples() {
    const pokeApi = createClient({
        baseUrl: "https://not-existing.pokeapi.co/api/v2",
    });
    try{
        const pokemon = await pokeApi.pokemon.get("not-existing-chu")
        console.dir(pokemon, { depth: null });
    }catch (error) {
        if (error instanceof PockeApiHTTPError) {
            console.error("PockeApiHTTPError:", error.message);
            console.error("Status Code:", error.statusCode);
            console.error("Response Body:", error.body);
        } else if(error instanceof TypeError){
            console.error("Probably some network error happend:", error);
        } else{
            console.error("Unexpected error happend:", error);
        }
    }
}

export async function main() {
    await basicExamples()
    await errorHttpExamples();
    await errorNetworkExamples();
}





main().catch(console.error);