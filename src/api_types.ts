import { z } from "zod";
export const PaginationDataSchema = z.object({
    count: z.number(),
    next: z.string().nullable(),
    previous: z.string().nullable()
});
export type PaginationData = z.infer<typeof PaginationDataSchema>;

export const PokemonSchema = z.object({
    name: z.string(),
    id: z.number(),
    height: z.number(),
    weight: z.number(),
    base_experience: z.number(),
    abilities: z.array(z.object({
        ability: z.object({
            name: z.string(),
            url: z.string()
        }),
        is_hidden: z.boolean(),
        slot: z.number()
    })),
    types: z.array(z.object({
        slot: z.number(),
        type: z.object({
            name: z.string(),
            url: z.string()
        })
    }))
});



export const PokemonListSchema = z.object({
    ...PaginationDataSchema.shape,
    results: z.array(z.object({
        name: z.string(),
        url: z.string()
    }))
});

export const GenerationSchema = z.object({
    id: z.number(),
    name: z.string(),
    main_region: z.object({
        name: z.string(),
        url: z.string()
    }),
    abilities: z.array(z.object({
        name: z.string(),
        url: z.string()
    })),
    moves: z.array(z.object({
        name: z.string(),
        url: z.string()
    })),
    pokemon_species: z.array(z.object({
        name: z.string(),
        url: z.string()
    })),
    types: z.array(z.object({
        name: z.string(),
        url: z.string()
    }))
});

export const GenerationListSchema = z.object({
    ...PaginationDataSchema.shape,
    results: z.array(z.object({
        name: z.string(),
        url: z.string()
    }))
});

export function convertPaginationData<T extends PaginationData>(response : T): {next: boolean, previous: boolean, count: number} {
    return {
        next: response.next ? true : false,
        previous: response.previous ? true : false,
        count: response.count,
    };
}