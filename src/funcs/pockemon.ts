import {PockemonListSchema, PockemonSchema, convertPaginationData} from "../api_types.js"
import {Core} from "../core.js";

 
 export const getPokemon = async (core: Core, name: string) => {
    return core.httpRquest({endpoint: `/pokemon/${name}`}, PockemonSchema);
}

 export const getPokemonList = async (core: Core, limit: number = 20, offset: number = 0) => {
        const endpoint = `/pokemon?limit=${limit}&offset=${offset}`;
        const resp = await core.httpRquest({ endpoint}, PockemonListSchema);
        const result = {
            ...convertPaginationData(resp),
            results:resp.results.map((item) => ({
                name: item.name
            })),
            
        }
        return result
    }