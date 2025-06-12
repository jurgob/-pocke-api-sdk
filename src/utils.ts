
import { PaginationData } from "./api_types.js";

export function convertPaginationData<T extends PaginationData>(response : T): {next: boolean, previous: boolean, count: number} {
    return {
        next: response.next ? true : false,
        previous: response.previous ? true : false,
        count: response.count,
    };
}