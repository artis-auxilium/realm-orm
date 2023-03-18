/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testEnvironmentOptions: {
        url: "http://localhost/",
    },
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
        ".*": "<rootDir>/node_modules/babel-jest"
    },
    collectCoverage: true,
    coverageReporters: [
        "text-summary",
        "lcov"
    ],
    collectCoverageFrom: [
        "libs/**/*.js",
        "index.js",
        "Model.js"
    ],

};
