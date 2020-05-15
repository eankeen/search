import { cyan, magenta, red, green, bgBlack } from "https://deno.land/std@0.50.0/fmt/mod.ts"
import { Search } from "./src/search.ts"
import { Package } from './src/@types/defs.d.ts';

if(!import.meta.main) Deno.exit(0)

console.log(cyan("enter string and press enter. results will show on screen. use 'help' and 'grain'"))

const s = new Search()
s.init()

let inputStatus = "--- search ---"
let grainType = ""
let tempturnoff = false

while(true) await getInput()

async function getInput(instatus: string = "--- search ---"): Promise<Array<Package> | void> {
  if (instatus === "--- grain search ---") {
    console.log(cyan(instatus + " specifically: " + grainType))
  } else {
    console.log(cyan(instatus))
  }
  const buf = new Uint8Array(2048);
  const n = await Deno.stdin.read(buf);

  if (!n) return

  let input = new TextDecoder().decode(buf.subarray(0, n))
  input = input.trim().toLocaleLowerCase()

  let results: Array<Package> = []

  if (inputStatus === "--- search ---") {
    results = await s.query(input)
  }

  if (instatus === inputStatus) {
    if (input === "help") {
      return console.log(magenta("commands are 'help' and 'grain'. !!help and !!grain to 'escape'"))
    }
    if (input === "grain") {
      console.log(magenta(bgBlack(`fine grain control. type '${red('name')}', '${red('repo')}' (repository name), '${red('type')}' (repository type), '${red('owner')}', '${red('desc')}'`)))
      await getInput("--- grain ---")
    }

    if (input === "!!help") input = "help"
    if (input === "!!grain") input = "grain"
  // is grain
  } else if (instatus === "--- grain ---") {
    if (new Set(["name", "owner", "repo", "type", "desc", "link"]).has(input.trim().toLocaleLowerCase())) {
      grainType = input
      return await getInput("--- grain search ---")
    }


    if (input === "!!name") input = "name"
    else if (input === "!!owner") input = "owner"
    else if (input === "!!repo") input = "repo"
    else if (input === "!!ype") input = "type"
    else if (input === "!!desc") input = "desec"
    else if (input === "!!link") input = "link"
    else if (input === "!!exit") input = "exit"
  } else if (instatus === "--- grain search ---") {
    const newResults = s.query({
      [grainType]: input
    })
    results = newResults
    inputStatus = "--- search ---"
    tempturnoff = true
  }

  if (tempturnoff === false) {
    console.log(cyan(`input: ${input}`))
  }


  let printThis = ""
  const p = (key: string, value: string): string => printThis += green(key) + ': ' + red(value) + '\n'

  if ((!results || results.length === 0) && tempturnoff === false) {
    return console.log(red('no results \n'))
  }

  for(const pkg of results) {
    if (!pkg.name || !pkg.owner || !pkg.repo || !pkg.type || !pkg.desc) continue
    p('name', pkg.name)
    p('owner', pkg.owner)
    p('repo', pkg.repo)
    p('type', pkg.type)
    p('desc', pkg.desc)
    p('link', `https://${pkg.type}.com:${pkg.owner}/${pkg.repo}`)
    printThis += "\n"
  }

  console.log(printThis)
  tempturnoff = false
}
