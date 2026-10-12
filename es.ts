import type { Dict } from './en';
const es: Dict = {
  common: {
    save: 'Guardar', cancel: 'Cancelar', delete: 'Eliminar', edit: 'Editar', add: 'Añadir',
    notes: 'Notas', date: 'Fecha', required: 'Este campo es obligatorio',
    confirmDelete: '¿Eliminar este elemento? No se puede deshacer.', error: 'Algo salió mal. Inténtalo de nuevo.',
    none: '—', today: 'Hoy',
  },
  tabs: { apiaries: 'Apiarios', stats: 'Resumen', settings: 'Ajustes' },
  apiary: {
    title: 'Mis apiarios', empty: 'Aún no hay apiarios. Añade el primero para empezar el inventario de colmenas.',
    add: 'Añadir apiario', edit: 'Editar apiario', name: 'Nombre del apiario', location: 'Ubicación',
    hives: '{{count}} colmenas', deleteWarn: 'Eliminar este apiario también elimina todas sus colmenas y registros.',
  },
  hive: {
    add: 'Añadir colmena', edit: 'Editar colmena', empty: 'Aún no hay colmenas aquí. Añade la primera.',
    number: 'Número de colmena', name: 'Nombre de la colmena (opcional)', status: 'Fuerza',
    strong: 'Fuerte', medium: 'Media', weak: 'Débil', dead: 'Muerta',
    frames: 'Cuadros', totalFrames: 'Total de cuadros', broodFrames: 'Cuadros de cría', honeyFrames: 'Cuadros de miel',
    queenYear: 'Año de la reina', origin: 'Origen',
    original: 'Colonia original', split: 'División', swarm: 'Enjambre', purchased: 'Comprada',
    parent: 'Colmena madre', noParent: 'Sin madre', framesError: 'Los cuadros de cría y miel no pueden superar el total.',
    history: 'Historial', noLogs: 'Aún no hay registros.', addRecord: 'Añadir registro',
    pedigree: 'Genealogía', pedigreeTitle: 'Linaje', thisHive: 'Esta colmena', fromParent: 'Descendiente de',
    noRelatives: 'Esta colmena aún no tiene madre ni descendientes.',
    deleteWarn: 'Eliminar esta colmena borra sus registros. Las colmenas divididas a partir de ella conservan sus datos pero pierden el vínculo.',
  },
  log: {
    title: 'Nuevo registro', type: 'Tipo de registro',
    feeding: 'Alimentación', treatment: 'Tratamiento', harvest: 'Cosecha de miel', split: 'División', inspection: 'Inspección',
    amount: 'Cantidad', unit: 'Unidad', product: 'Producto',
    syrup: 'Jarabe de azúcar', candy: 'Candy', pollen: 'Pasta de polen',
    oxalic: 'Ácido oxálico', formic: 'Ácido fórmico', thymol: 'Timol', other: 'Otro',
    varroaNote: 'Tratamiento contra varroa', newHiveNumber: 'Número de la nueva colmena',
    splitHint: 'Se crea una colmena nueva vinculada a esta como colmena madre.',
    splitCreated: 'Colmena nueva creada: {{number}}',
  },
  stats: {
    title: 'Resumen', apiaries: 'Apiarios', hives: 'Colmenas', byStrength: 'Colmenas por fuerza',
    honey: 'Miel cosechada', feed: 'Alimentaciones', treatments: 'Tratamientos', splits: 'Divisiones',
  },
  settings: {
    title: 'Ajustes', language: 'Idioma', backup: 'Copia de seguridad', export: 'Exportar copia', import: 'Importar copia',
    exportFail: 'Compartir no está disponible en este dispositivo.', importConfirm: 'Importar reemplaza todos los datos de este teléfono. ¿Continuar?',
    importOk: 'Copia restaurada.', importFail: 'Este archivo no es una copia válida.',
    dataNote: 'Todos los datos se quedan en este teléfono. Exporta una copia con regularidad.',
    ads: 'Anuncios', removeAds: 'Quitar anuncios', adsRemoved: 'Anuncios eliminados. Gracias por tu apoyo.',
    adsDesc: 'Los anuncios solo aparecen en el inicio y el resumen, nunca mientras introduces datos.',
    adChoices: 'Opciones de privacidad de anuncios', about: 'Acerca de', version: 'Versión',
    restart: 'Cierra y vuelve a abrir la app para aplicar la nueva dirección del texto.',
    billingSoon: 'Las compras aún no están conectadas en esta versión.',
  },
};
export default es;
