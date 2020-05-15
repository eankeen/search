import type { Package, PackageRaw, PackageListObjectRaw, IQuery} from "./@types/defs.d.ts"

export class Search {
  #pkgDbRaw: PackageListObjectRaw = <unknown>undefined as PackageListObjectRaw
  #pkgDb: Array<Package> = <unknown>undefined as Array<Package>

  async init() {
    const packageDatabaseRaw = await fetch('https://raw.githubusercontent.com/denoland/deno_website2/master/database.json')
    const packageDatabaseJson = await packageDatabaseRaw.json()

    this.#pkgDbRaw = packageDatabaseJson

    const pkgDb: Array<Package> = [];
    for(const packageName in packageDatabaseJson) {
      const pkg = packageDatabaseJson[packageName]
        pkgDb.push(pkg)
        pkgDb[pkgDb.length -1].name = packageName
    }
    this.#pkgDb = pkgDb
  }

  get() {
    return this.#pkgDb
  }

  query(query: string | IQuery): Array<Package> {
    const matches: Array<Package> = []

    const add = (pkg: Package): void => (matches.push(pkg), undefined)

    for (const pkgName in this.#pkgDb) {
      const pkg: Package = this.#pkgDb[pkgName]

      if (typeof query === 'string') {
        if (pkg.name?.trim() === query.trim()) add(pkg)
        else if (pkg.owner?.trim().toLocaleLowerCase() === query.trim().toLocaleLowerCase()) add(pkg)
        else if (pkg.repo?.trim().toLocaleLowerCase().includes(query.trim().toLocaleLowerCase())) add(pkg)
        else if (pkg.desc?.trim().toLocaleLowerCase().includes(query.trim().toLocaleLowerCase())) add(pkg)
        continue
      }


      if (query.name?.trim().toLocaleLowerCase() === pkg.name.trim().toLocaleLowerCase()) add(pkg)
      if (query.repo?.trim().toLocaleLowerCase() === pkg.repo.trim().toLocaleLowerCase()) add(pkg)
      if (query.type?.trim().toLocaleLowerCase() === pkg.type.trim().toLocaleLowerCase()) add(pkg)
      if (query.owner?.trim().toLocaleLowerCase() === pkg.owner.trim().toLocaleLowerCase()) add(pkg)
      if (pkg.desc.includes(query.desc!)) add(pkg)
    }

    return matches
  }
}
