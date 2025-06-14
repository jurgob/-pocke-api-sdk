import { createClient} from "../index.js"
import { describe, it, expect } from 'vitest';
import { PockeApiHTTPError } from "../errors.js";
describe('PokeApi SDK', () => {
    
    it('should be able to initialize the client', () => {
        let pokeApi = createClient();
        expect(pokeApi).toBeDefined();
    });

});


describe('PokeApi SDK, Config errors', () => {
    
    it('should be able to initialize the client', async () => {
        let pokeApi = createClient({
            baseUrl: "https://fakepokeapinotexisting.co/api/v2",
        });
        const error = await pokeApi.pockemon.get("pikachu").catch(e => e);
        expect(error).toBeDefined();
        expect(error).toBeInstanceOf(TypeError);

    });

});

describe('PokeApi SDK - Pockemon', () => {
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
    
    
    it('should throw an error when getting a non-existing pockemon', async () => {
        const error = await pokeApi.pockemon.get("not-existing").catch(e => e);
        expect(error).toBeDefined();
        expect(error).toBeInstanceOf(PockeApiHTTPError);
        expect(error.statusCode).toBe(404);
    });

});

describe('PokeApi SDK - Generations', () => {
    let pokeApi = createClient();

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
        const error = await pokeApi.generation.get("not-existing").catch(e => e);
        expect(error).toBeDefined();
        expect(error).toBeInstanceOf(PockeApiHTTPError);
        expect(error.statusCode).toBe(404);
    });

});

