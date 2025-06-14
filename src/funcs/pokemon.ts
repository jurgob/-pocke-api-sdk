import {PokemonListSchema, PokemonSchema, convertPaginationData} from "../api_types.js"
import {Core} from "../core.js";

 
 export const getPokemon = async (core: Core, name: string) => {
    return core.httpRequest({endpoint: `/pokemon/${name}`}, PokemonSchema);
}

 export const getPokemonList = async (core: Core, limit: number = 20, offset: number = 0) => {
        const endpoint = `/pokemon?limit=${limit}&offset=${offset}`;
        const resp = await core.httpRequest({ endpoint}, PokemonListSchema);
        const result = {
            ...convertPaginationData(resp),
            results:resp.results.map((item) => ({
                name: item.name
            })),
            
        }
        return result
    }