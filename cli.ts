import { cyan, magenta, red, green, bgBlack } from "https://deno.land/std@0.50.0/fmt/mod.ts"
import { Search } from "./src/search.ts"
import { Package } from './src/@types/defs.d.ts';

if(!import.meta.main) Deno.exit(0)

console.log(cyan("enter string and press enter. results will show on screen"))

const s = new Search()
s.init()

while(true) await getInput()

async function getInput(): Promise<void> {
  console.log(cyan("--- search ---"))
  const buf = new Uint8Array(2048);
  const n = await Deno.stdin.read(buf);

  if (!n) return
  let input = new TextDecoder().decode(buf.subarray(0, n))
  input = input.trim()

  if (input === "help") {
    return console.log(magenta("commands are 'help' and 'grain'. !!help and !!grain to 'escape'"))
  }
  if (input === "grain") {
    return console.log(magenta(bgBlack(`fine grain control. type '${red('name')}', '${red('repo')}' (repository name), '${red('type')}' (repository type), '${red('owner')}', '${red('desc')}'`)))
  }

  if (input === "!!help") input = "help"
  if (input === "!!grain") input = "grain"

  console.log(cyan(`input: ${input}`))
  const results = await s.query(input)

  let printThis = ""
  const p = (key: string, value: string): string => printThis += green(key) + ': ' + red(value) + '\n'

  for(const pkg of results) {
    p('name', pkg.name)
    p('owner', pkg.owner)
    p('repo', pkg.owner)
    p('type', pkg.type)
    p('desc', pkg.desc)
    p('link', `https://${pkg.type}.com:${pkg.owner}/${pkg.repo}`)
    printThis += "\n"
  }

  console.log(printThis)
}
