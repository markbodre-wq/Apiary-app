import type { Dict } from './en';
const fr: Dict = {
  common: {
    save: 'Enregistrer', cancel: 'Annuler', delete: 'Supprimer', edit: 'Modifier', add: 'Ajouter',
    notes: 'Notes', date: 'Date', required: 'Ce champ est obligatoire',
    confirmDelete: 'Supprimer cet élément ? Cette action est irréversible.', error: 'Une erreur est survenue. Réessayez.',
    none: '—', today: "Aujourd'hui",
  },
  tabs: { apiaries: 'Ruchers', stats: 'Aperçu', settings: 'Réglages' },
  apiary: {
    title: 'Mes ruchers', empty: 'Aucun rucher pour le moment. Ajoutez votre premier rucher pour commencer le recensement.',
    add: 'Ajouter un rucher', edit: 'Modifier le rucher', name: 'Nom du rucher', location: 'Emplacement',
    hives: '{{count}} ruches', deleteWarn: 'Supprimer ce rucher supprime aussi toutes ses ruches et leurs enregistrements.',
  },
  hive: {
    add: 'Ajouter une ruche', edit: 'Modifier la ruche', empty: 'Aucune ruche ici. Ajoutez la première.',
    number: 'Numéro de la ruche', name: 'Nom de la ruche (facultatif)', status: 'Vigueur',
    strong: 'Forte', medium: 'Moyenne', weak: 'Faible', dead: 'Morte',
    frames: 'Cadres', totalFrames: 'Total des cadres', broodFrames: 'Cadres de couvain', honeyFrames: 'Cadres de miel',
    queenYear: 'Année de la reine', origin: 'Origine',
    original: 'Colonie d’origine', split: 'Division', swarm: 'Essaim', purchased: 'Achetée',
    parent: 'Ruche mère', noParent: 'Sans mère', framesError: 'Les cadres de couvain et de miel ne peuvent pas dépasser le total.',
    history: 'Historique', noLogs: 'Aucun enregistrement.', addRecord: 'Ajouter un enregistrement',
    pedigree: 'Généalogie', pedigreeTitle: 'Lignée', thisHive: 'Cette ruche', fromParent: 'Issue de',
    noRelatives: 'Cette ruche n’a ni mère ni descendance pour l’instant.',
    deleteWarn: 'Supprimer cette ruche efface ses enregistrements. Les ruches issues de sa division gardent leurs données mais perdent le lien.',
  },
  log: {
    title: 'Nouvel enregistrement', type: 'Type',
    feeding: 'Nourrissement', treatment: 'Traitement', harvest: 'Récolte de miel', split: 'Division', inspection: 'Inspection',
    amount: 'Quantité', unit: 'Unité', product: 'Produit',
    syrup: 'Sirop de sucre', candy: 'Candi', pollen: 'Pâtée protéinée',
    oxalic: 'Acide oxalique', formic: 'Acide formique', thymol: 'Thymol', other: 'Autre',
    varroaNote: 'Traitement varroa', newHiveNumber: 'Numéro de la nouvelle ruche',
    splitHint: 'Une nouvelle ruche est créée et liée à celle-ci comme ruche mère.',
    splitCreated: 'Nouvelle ruche créée : {{number}}',
  },
  stats: {
    title: 'Aperçu', apiaries: 'Ruchers', hives: 'Ruches', byStrength: 'Ruches par vigueur',
    honey: 'Miel récolté', feed: 'Nourrissements', treatments: 'Traitements', splits: 'Divisions',
  },
  settings: {
    title: 'Réglages', language: 'Langue', backup: 'Sauvegarde', export: 'Exporter une sauvegarde', import: 'Importer une sauvegarde',
    exportFail: 'Le partage n’est pas disponible sur cet appareil.', importConfirm: 'L’importation remplace toutes les données de ce téléphone. Continuer ?',
    importOk: 'Sauvegarde restaurée.', importFail: 'Ce fichier n’est pas une sauvegarde valide.',
    dataNote: 'Toutes les données restent sur ce téléphone. Exportez une sauvegarde régulièrement.',
    ads: 'Publicités', removeAds: 'Supprimer les publicités', adsRemoved: 'Les publicités sont supprimées. Merci pour votre soutien.',
    adsDesc: 'Les publicités n’apparaissent que sur l’accueil et l’aperçu, jamais pendant la saisie.',
    adChoices: 'Choix de confidentialité des annonces', about: 'À propos', version: 'Version',
    restart: 'Fermez et rouvrez l’application pour appliquer le nouveau sens d’écriture.',
    billingSoon: 'Les achats ne sont pas encore connectés dans cette version.',
  },
};
export default fr;
