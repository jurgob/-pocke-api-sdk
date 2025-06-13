import { createClient} from "./index.js"

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