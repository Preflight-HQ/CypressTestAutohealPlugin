# preflight-cypress-plugin

## Install with npm

```shell
npm install -D preflight-cypress-plugin
```
Then include in your project's `cypress/support/index.js`

```js
require('preflight-test-autoheal')
```

## Create account on https://app.preflight.com/
 - Create API key
## Set API key in your test envorinment
- you can set key in code like  `Cypress.PreflightApiKey = [YOUR_KEY];`
- or set it in Cypress env 

```
"env": {
  "PREFLIGHT_API_KEY": "e2NvbXBhbnlJZDoiMSIsc2VjcmV0OiJDT205QTVlTEhCQ3U2d2QifQ=="
 }
```

Enable CORS
