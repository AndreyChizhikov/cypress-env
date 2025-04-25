const { defineConfig } = require("cypress");
const fs = require('fs');

module.exports = defineConfig({
  defaultCommandTimeout: 10000,
  pageLoadTimeout: 10000,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here

      // Load environment file dynamically
      const configFile = config.env.configFile || 'default';
      const pathToConfigFile = `./cypress.env.${configFile}.json`;

      if (fs.existsSync(pathToConfigFile)) {
        const envConfig = JSON.parse(fs.readFileSync(pathToConfigFile, 'utf-8'));
        config.env = { ...config.env, ...envConfig };
      }

      return config;
    },
  },
});
