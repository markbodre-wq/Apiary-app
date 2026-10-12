import { getDb } from './database';

export type Strength = 'strong' | 'medium' | 'weak' | 'dead';
export type Origin = 'original' | 'split' | 'swarm' | 'purchased';
export type LogType = 'feeding' | 'treatment' | 'harvest' | 'split' | 'inspection';

export interface Apiary { id: number; name: string; location: string | null; notes: string | null; hive_count?: number }
export interface Hive {
  id: number; apiary_id: number; number: string; name: string | null; status: Strength;
  total_frames: number; brood_frames: number; honey_frames: number; queen_year: number | null;
  origin: Origin; parent_id: number | null; notes: string | null;
}
export interface Log {
  id: number; hive_id: number; type: LogType; date: string; amount: number | null; unit: string | null;
  product: string | null; related_hive_id: number | null; notes: string | null;
}

// ---------- settings ----------
export async function getSetting(key: string) {
  const db = await getDb();
  const r = await db.getFirstAsync<{ value: string }>('SELECT value FROM settings WHERE key = ?', key);
  return r?.value ?? null;
}
export async function setSetting(key: string, value: string) {
  const db = await getDb();
  await db.runAsync('INSERT INTO settings (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value', key, value);
}

// ---------- apiaries ----------
export async function listApiaries() {
  const db = await getDb();
  return db.getAllAsync<Apiary>(
    `SELECT a.*, (SELECT COUNT(*) FROM hives h WHERE h.apiary_id = a.id) AS hive_count
     FROM apiaries a ORDER BY a.name COLLATE NOCASE`);
}
export async function getApiary(id: number) {
  const db = await getDb();
  return db.getFirstAsync<Apiary>('SELECT * FROM apiaries WHERE id = ?', id);
}
export async function saveApiary(a: { id?: number; name: string; location?: string; notes?: string }) {
  const db = await getDb();
  if (a.id) {
    await db.runAsync('UPDATE apiaries SET name = ?, location = ?, notes = ? WHERE id = ?', a.name, a.location ?? null, a.notes ?? null, a.id);
    return a.id;
  }
  const r = await db.runAsync('INSERT INTO apiaries (name, location, notes) VALUES (?, ?, ?)', a.name, a.location ?? null, a.notes ?? null);
  return r.lastInsertRowId;
}
export async function deleteApiary(id: number) {
  const db = await getDb();
  await db.runAsync('DELETE FROM apiaries WHERE id = ?', id);
}

// ---------- hives ----------
export async function listHives(apiaryId: number) {
  const db = await getDb();
  return db.getAllAsync<Hive>('SELECT * FROM hives WHERE apiary_id = ? ORDER BY CAST(number AS INTEGER), number COLLATE NOCASE', apiaryId);
}
export async function listAllHives() {
  const db = await getDb();
  return db.getAllAsync<Hive>('SELECT * FROM hives ORDER BY CAST(number AS INTEGER), number COLLATE NOCASE');
}
export async function getHive(id: number) {
  const db = await getDb();
  return db.getFirstAsync<Hive>('SELECT * FROM hives WHERE id = ?', id);
}
export type HiveInput = Omit<Hive, 'id'> & { id?: number };
export async function saveHive(h: HiveInput) {
  const db = await getDb();
  const vals = [h.apiary_id, h.number, h.name, h.status, h.total_frames, h.brood_frames, h.honey_frames, h.queen_year, h.origin, h.parent_id, h.notes] as const;
  if (h.id) {
    await db.runAsync(
      `UPDATE hives SET apiary_id=?, number=?, name=?, status=?, total_frames=?, brood_frames=?, honey_frames=?,
       queen_year=?, origin=?, parent_id=?, notes=? WHERE id=?`, ...vals, h.id);
    return h.id;
  }
  const r = await db.runAsync(
    `INSERT INTO hives (apiary_id, number, name, status, total_frames, brood_frames, honey_frames, queen_year, origin, parent_id, notes)
     VALUES (?,?,?,?,?,?,?,?,?,?,?)`, ...vals);
  return r.lastInsertRowId;
}
export async function deleteHive(id: number) {
  const db = await getDb();
  await db.runAsync('DELETE FROM hives WHERE id = ?', id);
}

// ---------- logs ----------
export async function listLogs(hiveId: number) {
  const db = await getDb();
  return db.getAllAsync<Log>('SELECT * FROM logs WHERE hive_id = ? ORDER BY date DESC, id DESC', hiveId);
}
export type LogInput = Omit<Log, 'id' | 'related_hive_id'>;
export async function saveLog(l: LogInput) {
  const db = await getDb();
  await db.runAsync('INSERT INTO logs (hive_id, type, date, amount, unit, product, notes) VALUES (?,?,?,?,?,?,?)',
    l.hive_id, l.type, l.date, l.amount, l.unit, l.product, l.notes);
}
export async function deleteLog(id: number) {
  const db = await getDb();
  await db.runAsync('DELETE FROM logs WHERE id = ?', id);
}

/** Creates a child hive in the same apiary and records the split on the parent, in one transaction. */
export async function createSplit(parent: Hive, newNumber: string, date: string, notes: string | null) {
  const db = await getDb();
  let childId = 0;
  await db.withTransactionAsync(async () => {
    const r = await db.runAsync(
      `INSERT INTO hives (apiary_id, number, status, origin, parent_id, total_frames, brood_frames, honey_frames)
       VALUES (?, ?, 'weak', 'split', ?, 0, 0, 0)`, parent.apiary_id, newNumber, parent.id);
    childId = r.lastInsertRowId;
    await db.runAsync(
      `INSERT INTO logs (hive_id, type, date, related_hive_id, notes) VALUES (?, 'split', ?, ?, ?)`,
      parent.id, date, childId, notes);
  });
  return childId;
}

// ---------- stats ----------
export async function getStats() {
  const db = await getDb();
  const one = async (sql: string) => (await db.getFirstAsync<{ n: number }>(sql))?.n ?? 0;
  const byStrength = await db.getAllAsync<{ status: Strength; n: number }>('SELECT status, COUNT(*) AS n FROM hives GROUP BY status');
  return {
    apiaries: await one('SELECT COUNT(*) AS n FROM apiaries'),
    hives: await one('SELECT COUNT(*) AS n FROM hives'),
    honeyKg: await one("SELECT COALESCE(SUM(amount),0) AS n FROM logs WHERE type='harvest'"),
    feedings: await one("SELECT COUNT(*) AS n FROM logs WHERE type='feeding'"),
    treatments: await one("SELECT COUNT(*) AS n FROM logs WHERE type='treatment'"),
    splits: await one("SELECT COUNT(*) AS n FROM logs WHERE type='split'"),
    byStrength,
  };
}
