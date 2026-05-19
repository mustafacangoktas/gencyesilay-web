import * as migration_20260502_194212_initial from './20260502_194212_initial';

export const migrations = [
  {
    up: migration_20260502_194212_initial.up,
    down: migration_20260502_194212_initial.down,
    name: '20260502_194212_initial'
  },
];
