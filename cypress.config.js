const { defineConfig } = require("cypress");

module.exports = defineConfig({
  viewportHeight: 1440,
  viewportWidth: 1080,
  watchForFileChanges: false,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
