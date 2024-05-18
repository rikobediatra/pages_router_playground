import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  dir: './',
});

/** @type {import('jest').Config} */
const config = {
  modulePaths: ["<rootDir>/src"],
  collectCoverage: true,
  collectCoverageFrom: [
    "**/*.{js,jsx,ts,tsx}",
    '!**/*.d.ts',
    '!**/node_modules/**',
    '!**/*.type.ts',
    '!<rootDir>/.next/**',
    '!<rootDir>/coverage/**',
    '!<rootDir>/*.config.js',
    '!<rootDir>/src/middleware.ts',
    '!<rootDir>/src/lib/**',
    '!<rootDir>/src/middlewares/**',
  ],

  testEnvironment: 'jest-environment-jsdom',  

};

export default createJestConfig(config);