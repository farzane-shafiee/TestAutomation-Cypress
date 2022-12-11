const { defineConfig } = require("cypress");
const {
  BASE_DEMO_URL,
  BASE_API_DEMO_URL,
  DKJET_USERNAME,
  DKJET_PASSWORD,
} = require('./src/constants/index');

module.exports = defineConfig({
  e2e: {
    baseUrl: BASE_DEMO_URL,
    defaultCommandTimeout: 10000,
    chromeWebSecurity: false,
    experimentalSessionAndOrigin: true,
    screenshotOnRunFailure: false,
    watchForFileChanges: false,
    videosFolder: 'src/videos',
    fixturesFolder: 'src/fixtures',
    downloadsFolder: 'src/downloads',
    screenshotsFolder: 'src/screenshots',
    specPattern: 'src/pages/**/*.cy.js',
    supportFile: 'src/support/index.js',
    env:{
      username: DKJET_USERNAME,
      password: DKJET_PASSWORD,
      API_BASE: BASE_API_DEMO_URL,
    },
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
