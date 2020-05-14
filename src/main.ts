const packageDatabaseRaw = await fetch('https://raw.githubusercontent.com/denoland/deno_website2/master/database.json')
const packageDatabasejson = await packageDatabaseRaw.json()

const keys = Object.keys(packageDatabasejson)
console.log(keys)
