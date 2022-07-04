// @ts-ignore
import { defineConfig } from 'cypress'

export default defineConfig({
  env: {
    PREFLIGHT_API_KEY:
      'ZTU0MGM1ZjYtMDkzMS00N2NmLTg3ZjgtNmQxM2M2ZTg0YWQ4OmFiM2M5MjJmLWNkOTMtNGJmNC04NjllLTgyMWI3MjM5N2ZiMA==',
  },
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.js')(on, config)
    },
  },
})
