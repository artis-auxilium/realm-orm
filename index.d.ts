import * as Realm from 'realm'
import Model from './Model'

type LegacyConfiguration = Omit<Realm.Configuration, 'schema'> & { schema: Array<typeof Model<any>>, migration?: Realm.MigrationCallback, shouldCompactOnLaunch?: (totalBytes: number, usedBytes: number) => boolean}


export default class DB {
  constructor(option: LegacyConfiguration)
  static db: Realm
  static instance: DB
  open(): Promise<Realm>
}
