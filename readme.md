# search

Module that helps facilitate searching all the 3rd party packages. Also contains a command line interface to interact through these packages

## How to install

```sh
deno install --allow-net -n deno-pkg-search https://raw.githubusercontent.com/eankeen/search/dev/cli.ts
```

## How to use

```sh
deno-pkg-search
```

After invoking, type in any string and it will loosely search all the packages for your query

### Grain

For fine grained control, type 'grain'. Then type which parameter you want to search (ex. name). Then type the actual name.

## Api

We also export a `Search` object that is used internally

```ts
import { Search } from "https://raw.githubusercontent.com/eankeen/search/dev/cli.ts"
```
