import type {Config} from 'jest';
console.log('Root Directory:', __dirname);

const config: Config = {
  verbose: true,
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@components/(.*)$': '<rootDir>/src/components/$1',
    '^@core/(.*)$': '<rootDir>/src/core/$1',
    '^@hooks/(.*)$': '<rootDir>/src/hooks/$1'
  },
  modulePaths: ['<rootDir>/src'], // Fügt den src-Ordner zu den Modulsuchpfaden hinzu
};

export default config;