# PokeAPI SDK

This SDK provides a user-friendly interface for accessing the PokeAPI, a comprehensive database of Pokémon information. It was developed as part of an engineering take-home project.

## Project Scope

This SDK covers the following PokeAPI endpoints:

-   `GET https://pokeapi.co/api/v2/pokemon/{id or name}/`
-   `GET https://pokeapi.co/api/v2/generation/{id or name}/`

It also includes pagination support for retrieving lists of resources.

## SDK Installation (NOT DONE YET)

```bash
# Example using npm
npm install pocke-api-sdk
```

## Usage

```ts
// Example usage
import { createClient } from 'pocke-api-sdk';

// initialize the sdk:
const pokeApi = createClient();

// get a specific pockemon:
const pockemon = await pokeApi.pockemon.get("pikachu")

// get a list of pockemon:
const pockemonList = await pokeApi.pockemon.list(10, 1);

// get a specific pockemon generation:
const generation = await pokeApi.generation.get("generation-i");

// get a list of  pockemon generations:
const generationList = await pokeApi.generation.list(5, 0);
```

### Individual components usage

Alternatively, you can import individual components from the SDK, such as:

```ts
import { getPokemon, getPokemonList } from '../funcs/pockemon.js';
import { createCoreClient } from '../core.js';

const result = await getPokemon(core, pokemonName);
```

### Error Handling

This is an example of Error handling 

```ts
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

```


for more example look at the [`src/examples.ts`](src/examples.ts) file in this repository


## Contributing

## Installing

clone this repo, then install dependencies with:

```npm i```

### Testing

To run the tests, use the following command:

```npm test```



## npm scripts: 

```npm run examples``` -> run examples (one day those examples could be exported in a generated documentaion)

```npm test``` -> run test (you need to be connected)

```npm run typecheck``` -> run typecheck

```npm run all``` -> run all the script that your ci is gonna probably run

```pnm run cov:report``` -> allow to navigate the code coverate report (from the last `npm run test` made)


### Design Decisions
- **Abstraction:** Higher-level functions organized by namespace (e.g., `pokeApi.pokemon.get()`) to simplify common API requests
- **Pagination**: Opaque abstraction maintains original pagination shape while replacing URLs with boolean flags
- **Modular exports:** Each module exports independently for better tree-shaking and bundler compatibility
- **No default exports:** Named exports only for bundler-friendly imports
- **Type safety:** Zod schemas parse and validate all API responses
- **Error handling:** Custom error classes for better HTTP error management
- **Centralized HTTP logic:** Unified request handling enables future SDK expansions like custom fetch implementations and middleware support
- **Tested examples:** All examples are type-checked and tested to ensure accuracy and support future documentation generation