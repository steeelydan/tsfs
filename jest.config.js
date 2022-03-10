import { testPathConfig } from './testFiles/testPathConfig.js';

export default {
    preset: 'ts-jest/presets/default-esm',
    extensionsToTreatAsEsm: ['.ts'],
    moduleNameMapper: {
        '^(\\.{1,2}/.*)\\.js$': '$1'
    },
    globals: {
        coreTestPathConfig: testPathConfig,
        'ts-jest': {
            tsconfig: '<rootDir>/tsconfig.json',
            useESM: true
        }
    },
    collectCoverage: true,
    collectCoverageFrom: ['**/*.{ts,tsx}'],
    modulePathIgnorePatterns: ['dist']
};
