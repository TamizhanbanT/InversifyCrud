import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleFileExtensions: ["ts", "js", "json"],
  transform: {
    "^.+\\.ts$": "ts-jest",
  },
  // testMatch: ["**/__tests__/**/*.test.ts"], 
  testMatch: ['**/?(*.)+(spec|test).[jt]s?(x)']

};

export default config;