const { defineConfig } = require("cypress");
require('dotenv').config()

module.exports = defineConfig({
  env: {
    UI_USERNAME: process.env.UI_USERNAME,
    UI_PASSWORD: process.env.UI_PASSWORD,
  },

  viewportHeight: 1440,
  viewportWidth: 1080,
  watchForFileChanges: false,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
