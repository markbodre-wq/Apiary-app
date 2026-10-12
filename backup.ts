import * as FileSystem from 'expo-file-system/legacy';
import * as Sharing from 'expo-sharing';
import * as DocumentPicker from 'expo-document-picker';
import { getDb } from './database';

const BACKUP_VERSION = 1;
const TABLES = ['apiaries', 'hives', 'logs'] as const;

export async function exportBackup(): Promise<boolean> {
  const db = await getDb();
  const data: Record<string, unknown> = { app: 'apiary-manager', version: BACKUP_VERSION, exportedAt: new Date().toISOString() };
  for (const t of TABLES) data[t] = await db.getAllAsync(`SELECT * FROM ${t}`);
  const stamp = new Date().toISOString().slice(0, 10);
  const uri = `${FileSystem.cacheDirectory}apiary-backup-${stamp}.json`;
  await FileSystem.writeAsStringAsync(uri, JSON.stringify(data, null, 2));
  if (!(await Sharing.isAvailableAsync())) return false;
  await Sharing.shareAsync(uri, { mimeType: 'application/json', dialogTitle: 'Apiary backup' });
  return true;
}

/** Returns 'ok', 'cancelled' or 'invalid'. Replaces ALL local data inside one transaction. */
export async function importBackup(): Promise<'ok' | 'cancelled' | 'invalid'> {
  const res = await DocumentPicker.getDocumentAsync({ type: ['application/json', 'text/plain', '*/*'], copyToCacheDirectory: true });
  if (res.canceled || !res.assets?.[0]) return 'cancelled';
  let data: any;
  try {
    data = JSON.parse(await FileSystem.readAsStringAsync(res.assets[0].uri));
  } catch {
    return 'invalid';
  }
  if (data?.app !== 'apiary-manager' || !Array.isArray(data.apiaries) || !Array.isArray(data.hives) || !Array.isArray(data.logs)) return 'invalid';

  const db = await getDb();
  try {
    await db.execAsync('PRAGMA foreign_keys = OFF');
    await db.withTransactionAsync(async () => {
      await db.execAsync('DELETE FROM logs; DELETE FROM hives; DELETE FROM apiaries;');
      for (const t of TABLES) {
        // Only accept columns that really exist in our schema (prevents SQL injection via crafted files).
        const info = await db.getAllAsync<{ name: string }>(`PRAGMA table_info(${t})`);
        const allowed = new Set(info.map((c) => c.name));
        for (const row of data[t]) {
          const cols = Object.keys(row).filter((c) => allowed.has(c));
          if (cols.length === 0) continue;
          await db.runAsync(
            `INSERT INTO ${t} (${cols.join(',')}) VALUES (${cols.map(() => '?').join(',')})`,
            ...cols.map((c) => row[c]),
          );
        }
      }
    });
    return 'ok';
  } catch {
    return 'invalid';
  } finally {
    await db.execAsync('PRAGMA foreign_keys = ON');
  }
}
