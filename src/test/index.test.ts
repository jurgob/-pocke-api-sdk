import { createClient} from "../index.js"
import { describe, it, expect } from 'vitest';
describe('PokeApi SDK', () => {
    let pokeApi = createClient();

    it('should fetch a pokemon by name', async () => {
        const pokemon = await pokeApi.pockemon.get("pikachu");
        expect(pokemon).toBeDefined();
        expect(pokemon.name).toBe("pikachu");
    });

    it('should fetch a list of pokemon', async () => {
        const pokemonList = await pokeApi.pockemon.list(12, 0);
        expect(pokemonList).toBeDefined();
        expect(pokemonList.results.length).toBe(12);
        expect(pokemonList.next).toBe(true);
        expect(pokemonList.previous).toBe(false);
    });

    it('should fetch a generation by name', async () => {
        const generation = await pokeApi.generation.get("generation-i");
        expect(generation).toBeDefined();
        expect(generation.name).toBe("generation-i");
    });

    it('should fetch a list of generations', async () => {
        const generationList = await pokeApi.generation.list(5, 0);
        expect(generationList).toBeDefined();
        expect(generationList.results.length).toBe(5);
        expect(generationList.next).toBe(true);
        expect(generationList.previous).toBe(false);
    });
    
    
    it('should throw an error when getting a non-existing pockemon', async () => {
        await expect(pokeApi.pockemon.get("not existing")).rejects.toThrowError("Error during http request: Not Found");
    });

});