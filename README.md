# PokeAPI SDK

This SDK provides a user-friendly interface for accessing the PokeAPI, a comprehensive database of Pokémon information. It was developed as part of an engineering take-home project.

## Project Scope

This SDK covers the following PokeAPI endpoints:

-   `GET https://pokeapi.co/api/v2/pokemon/{id or name}/`
-   `GET https://pokeapi.co/api/v2/generation/{id or name}/`

It also includes pagination support for retrieving lists of resources.

## Installation

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

Alternatively, you can import individual components from the SDK, such as:

```ts
import { getPokemon, getPokemonList } from '../funcs/pockemon.js';
import { createCoreClient } from '../core.js';

const result = await getPokemon(core, pokemonName);
```


for more example look at the `src/examples.ts` file in this repository


## Contributing

## Installing

clone this repo, then install dependencies with:

```npm i```

### Testing

To run the tests, use the following command:

```ts
npm test
```

### Design Decisions
 - Abstraction: The SDK provides higher-level functions (e.g., getPokemonByName) to simplify common API requests.
- zod for parsing api responses

