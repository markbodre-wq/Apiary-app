import * as SQLite from 'expo-sqlite';

let dbPromise: Promise<SQLite.SQLiteDatabase> | null = null;

export function getDb() {
  if (!dbPromise) {
    dbPromise = (async () => {
      const db = await SQLite.openDatabaseAsync('apiary.db');
      await db.execAsync('PRAGMA journal_mode = WAL; PRAGMA foreign_keys = ON;');
      await migrate(db);
      return db;
    })();
  }
  return dbPromise;
}

const MIGRATIONS: string[] = [
  // v1
  `CREATE TABLE apiaries (
     id INTEGER PRIMARY KEY AUTOINCREMENT,
     name TEXT NOT NULL,
     location TEXT,
     notes TEXT,
     created_at TEXT NOT NULL DEFAULT (datetime('now'))
   );
   CREATE TABLE hives (
     id INTEGER PRIMARY KEY AUTOINCREMENT,
     apiary_id INTEGER NOT NULL REFERENCES apiaries(id) ON DELETE CASCADE,
     number TEXT NOT NULL,
     name TEXT,
     status TEXT NOT NULL DEFAULT 'medium',
     total_frames INTEGER NOT NULL DEFAULT 0,
     brood_frames INTEGER NOT NULL DEFAULT 0,
     honey_frames INTEGER NOT NULL DEFAULT 0,
     queen_year INTEGER,
     origin TEXT NOT NULL DEFAULT 'original',
     parent_id INTEGER REFERENCES hives(id) ON DELETE SET NULL,
     notes TEXT,
     created_at TEXT NOT NULL DEFAULT (datetime('now'))
   );
   CREATE TABLE logs (
     id INTEGER PRIMARY KEY AUTOINCREMENT,
     hive_id INTEGER NOT NULL REFERENCES hives(id) ON DELETE CASCADE,
     type TEXT NOT NULL,
     date TEXT NOT NULL,
     amount REAL,
     unit TEXT,
     product TEXT,
     related_hive_id INTEGER REFERENCES hives(id) ON DELETE SET NULL,
     notes TEXT
   );
   CREATE TABLE settings (key TEXT PRIMARY KEY, value TEXT);
   CREATE INDEX idx_hives_apiary ON hives(apiary_id);
   CREATE INDEX idx_hives_parent ON hives(parent_id);
   CREATE INDEX idx_logs_hive ON logs(hive_id, date);`,
];

async function migrate(db: SQLite.SQLiteDatabase) {
  const row = await db.getFirstAsync<{ user_version: number }>('PRAGMA user_version');
  let version = row?.user_version ?? 0;
  while (version < MIGRATIONS.length) {
    await db.withTransactionAsync(async () => {
      await db.execAsync(MIGRATIONS[version]);
    });
    version += 1;
    await db.execAsync(`PRAGMA user_version = ${version}`);
  }
}
