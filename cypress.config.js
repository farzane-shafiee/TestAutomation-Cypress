const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    // defaultCommandTimeout: 4000,
    chromeWebSecurity: false,
    experimentalSessionAndOrigin: true,
    screenshotOnRunFailure: false,
    setupNodeEvents(on, config) {
      // implement node event listeners here
      let value
      const {addMatchImageSnapshotPlugin} = require("@cypress/snapshot");
      module.exports = (on, config) => {
        addMatchImageSnapshotPlugin(on, config);
      };

      on('task', {
        log(message){
          console.log(message);
          return null
        },
        save(v){
          value = v
          return null
        },
        load(){
          return value || null
        },
      })
    },

  },
});
