import { describe, expect, it } from 'vitest';
import { getPokemon, getPokemonList } from '../funcs/pockemon.js';
import { createCoreClient } from '../core.js';


describe('Pockemon Functions', () => {
    const core = createCoreClient({ baseUrl: 'https://pokeapi.co/api/v2' });

    it('should call httpRquest with the correct parameters for getPokemon', async () => {
        const pokemonName = 'pikachu';
        const result = await getPokemon(core, pokemonName);

        expect(result.name).toEqual(pokemonName);
    });

    it('should return the correct data structure from getPokemon', async () => {
        const pokemonName = 'pikachu';
        const result = await getPokemon(core, pokemonName);

        expect(result).toHaveProperty('name');
        expect(result).toHaveProperty('id');
    });

    it('should call httpRquest with the correct parameters for getPokemonList with default parameters', async () => {
        const result = await getPokemonList(core);

        expect(result).toHaveProperty('count');
        expect(result).toHaveProperty('next');
        expect(result).toHaveProperty('previous');
        expect(result).toHaveProperty('results');
    });

    it('should call httpRquest with the correct parameters for getPokemonList with custom parameters', async () => {
        const limit = 10;
        const offset = 5;
        const result = await getPokemonList(core, limit, offset);

        expect(result).toHaveProperty('count');
        expect(result).toHaveProperty('next');
        expect(result).toHaveProperty('previous');
        expect(result).toHaveProperty('results');
    });

    it('should return the correct data structure from getPokemonList', async () => {
        const result = await getPokemonList(core);

        expect(result).toHaveProperty('count');
        expect(result).toHaveProperty('next');
        expect(result).toHaveProperty('previous');
        expect(result.results[0]).toHaveProperty('name');
    });
});
