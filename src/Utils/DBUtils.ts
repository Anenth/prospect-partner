import { openDB, DBSchema } from 'idb'

const DB_NAME = 'PROSPECT_PARTNER_DB'

interface MyDB extends DBSchema {
  myStore: {
    key: string
    value: any
  }
}

// Function to add a value to IndexedDB
async function addToDB(key: string, value: any): Promise<void> {
  const db = await openDB<MyDB>(DB_NAME, 1, {
    upgrade(db) {
      db.createObjectStore('myStore')
    },
  })

  await db.put('myStore', value, key)
}

// Function to get a value from IndexedDB
async function getFromDB(key: string): Promise<any> {
  const db = await openDB<MyDB>(DB_NAME, 1)
  return db.get('myStore', key)
}

// Function to update a value in IndexedDB
async function updateInDB(key: string, value: any): Promise<void> {
  const db = await openDB<MyDB>(DB_NAME, 1)
  await db.put('myStore', value, key)
}
