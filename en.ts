const en = {
  common: {
    save: 'Save', cancel: 'Cancel', delete: 'Delete', edit: 'Edit', add: 'Add',
    notes: 'Notes', date: 'Date', required: 'This field is required',
    confirmDelete: 'Delete this item? This cannot be undone.', error: 'Something went wrong. Try again.',
    none: '—', today: 'Today',
  },
  tabs: { apiaries: 'Apiaries', stats: 'Overview', settings: 'Settings' },
  apiary: {
    title: 'My apiaries', empty: 'No apiaries yet. Add your first apiary to start counting hives.',
    add: 'Add apiary', edit: 'Edit apiary', name: 'Apiary name', location: 'Location',
    hives: '{{count}} hives', deleteWarn: 'Deleting this apiary also deletes all its hives and records.',
  },
  hive: {
    add: 'Add hive', edit: 'Edit hive', empty: 'No hives here yet. Add the first one.',
    number: 'Hive number', name: 'Hive name (optional)', status: 'Strength',
    strong: 'Strong', medium: 'Medium', weak: 'Weak', dead: 'Dead',
    frames: 'Frames', totalFrames: 'Total frames', broodFrames: 'Brood frames', honeyFrames: 'Honey frames',
    queenYear: 'Queen year', origin: 'Origin',
    original: 'Original colony', split: 'Split', swarm: 'Swarm', purchased: 'Purchased',
    parent: 'Parent hive', noParent: 'No parent', framesError: 'Brood and honey frames cannot exceed total frames.',
    history: 'History', noLogs: 'No records yet.', addRecord: 'Add record',
    pedigree: 'Pedigree', pedigreeTitle: 'Lineage', thisHive: 'This hive', fromParent: 'Descended from',
    noRelatives: 'This hive has no parent and no descendants yet.',
    deleteWarn: 'Deleting this hive removes its records. Hives split from it keep their data but lose the link.',
  },
  log: {
    title: 'New record', type: 'Record type',
    feeding: 'Feeding', treatment: 'Treatment', harvest: 'Honey harvest', split: 'Split', inspection: 'Inspection',
    amount: 'Amount', unit: 'Unit', product: 'Product',
    syrup: 'Sugar syrup', candy: 'Candy', pollen: 'Pollen patty',
    oxalic: 'Oxalic acid', formic: 'Formic acid', thymol: 'Thymol', other: 'Other',
    varroaNote: 'Varroa treatment', newHiveNumber: 'New hive number',
    splitHint: 'A new hive is created and linked to this hive as its parent.',
    splitCreated: 'New hive created: {{number}}',
  },
  stats: {
    title: 'Overview', apiaries: 'Apiaries', hives: 'Hives', byStrength: 'Hives by strength',
    honey: 'Honey harvested', feed: 'Feedings logged', treatments: 'Treatments logged', splits: 'Splits made',
  },
  settings: {
    title: 'Settings', language: 'Language', backup: 'Backup', export: 'Export backup', import: 'Import backup',
    exportFail: 'Sharing is not available on this device.', importConfirm: 'Importing replaces all data on this phone. Continue?',
    importOk: 'Backup restored.', importFail: 'This file is not a valid backup.',
    dataNote: 'All data stays on this phone. Export a backup regularly.',
    ads: 'Ads', removeAds: 'Remove ads', adsRemoved: 'Ads are removed. Thank you for your support.',
    adsDesc: 'Ads appear only on the home and overview screens, never while you enter data.',
    adChoices: 'Ad privacy choices', about: 'About', version: 'Version',
    restart: 'Close and reopen the app to apply the new text direction.',
    billingSoon: 'Purchases are not connected yet in this build.',
  },
};
export default en;
export type Dict = typeof en;
