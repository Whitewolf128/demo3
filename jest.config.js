module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    testMatch: ["<rootDir>/tests/**/*.test.ts"],
    setupFilesAfterEnv: ["<rootDir>/tests/jest.setup.js"],
};