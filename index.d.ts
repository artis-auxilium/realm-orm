import * as Realm from 'realm'
import Model from './Model'

type LegacyConfiguration = Realm.Configuration & {  migration?: Realm.MigrationCallback, shouldCompactOnLaunch?: (totalBytes: number, usedBytes: number) => boolean}


export default class DB {
  constructor(option: LegacyConfiguration)
  static db: Realm
  open(): Promise<Realm>
}
