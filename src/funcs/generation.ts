import {GenerationListSchema, GenerationSchema, convertPaginationData} from "../api_types.js"
import {Core} from "../core.js";

export const getGeneration = async (core: Core,name: string) => {
        const endpoint = `/generation/${name}`;
            return core.httpRequest({endpoint},GenerationSchema);
        } 

 export const getGenerationList = async (core: Core,limit: number = 10, offset: number = 0) => {
        const endpoint = `/generation?limit=${limit}&offset=${offset}`;
        const resp = await  core.httpRequest({endpoint}, GenerationListSchema);
        const result = {
            ...convertPaginationData(resp),
            results:resp.results.map((item) => ({
                name: item.name
            }))
        }
        return result;
        
    }