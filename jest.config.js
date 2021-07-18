module.exports = {
  preset: "jest-expo",

  testPathIgnorePatterns: [
    '/node_modules',
    '/android',
    '/ios',
    '/.github',
    '/.vscode',
  ],

  setupFilesAfterEnv: [
    "@testing-library/jest-native/extend-expect",
    "jest-styled-components",
  ],

  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.tsx",
    "!src/**/*.spec.tsx",
    "!src/**/*.spec.ts",
  ],
  coverageReporters: [
    "lcov",
  ]
}