import { PockeApiHTTPError } from "./errors.js";
import { createClient} from "./index.js"

async function basicExamples(){
    console.log("PokeApi initialized");
    const pokeApi = createClient();
    
    console.log("Get a specific Pockemon:");
    const pockemon = await pokeApi.pockemon.get("pikachu")
    console.dir(pockemon, { depth: null });

    console.log("Pockemon List:");
    const pockemonList = await pokeApi.pockemon.list(10, 1);
    console.dir(pockemonList, { depth: null });

    console.log("Get Pockemon generation");
    const generation = await pokeApi.generation.get("generation-i");
    console.log("Generation:", generation);

    console.log("Get Pockemon generation list:");
    const generationList = await pokeApi.generation.list(5, 0);
    console.dir(generationList, { depth: null });
}

async function errorHttpExamples() {
    const pokeApi = createClient();
    try{
        const pockemon = await pokeApi.pockemon.get("not-existing-chu")
        console.dir(pockemon, { depth: null });
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
        const pockemon = await pokeApi.pockemon.get("not-existing-chu")
        console.dir(pockemon, { depth: null });
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