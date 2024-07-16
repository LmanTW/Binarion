// Cache
export default class {
  private _groups: { [key: string]: Map<any, any> } = {}

  // Check If A Cache Group Exists
  public hasGroup (name: string): boolean {
    return this._groups[name] !== undefined
  }

  // Create A Cache Group
  public createGroup (name: string): void {
    if (this._groups[name] !== undefined) throw new Error(`Cache Group Already Exists: "${name}"`)

    this._groups[name] = new Map()
  }

  // Get A Cache
  public getCache <Type> (groupName: string, name: any): undefined | Type {
    if (this._groups[groupName] === undefined) throw new Error(`Cache Group Not Found: "${groupName}"`)

    return this._groups[groupName].get(name)
  }

  // Set A Cache
  public setCache (groupName: string, name: any, value: any): void {
    if (this._groups[groupName] === undefined) throw new Error(`Cache Group Not Found: "${groupName}"`)

    this._groups[groupName].set(name, value)
  }

  // Clear The Cache
  public clear (): void {
    Object.keys(this._groups).forEach((name) => this._groups[name].clear())
  }
}
