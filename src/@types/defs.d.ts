
export interface PackageRaw {
  type: string,
  owner: string,
  repo: string,
  desc: string
}

export type PackageListObjectRaw = {
  [packageName: string]: PackageRaw
}

export interface Package extends PackageRaw {
  name: string
}

/**
 * @desc the name corresponds to each key (ex. fox, is_exe) in
 * the pkgDb
 */
export interface IQuery extends Partial<Package> {}
