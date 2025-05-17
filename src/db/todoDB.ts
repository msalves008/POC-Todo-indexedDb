import { openDB } from 'idb'
import type { IDBPDatabase } from 'idb'

const DB_NAME = 'todo-db'
export const STORE_NAME = 'todos'
const VERSION = 1

let dbPromise: Promise<IDBPDatabase> | null = null

export const getDB = async (): Promise<IDBPDatabase> => {
  if (!dbPromise) {
    dbPromise = openDB(DB_NAME, VERSION, {
      upgrade(db) {
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME, {
            keyPath: 'id',
            autoIncrement: true,
          })
        }
      },
    })
  }
  return dbPromise
}
