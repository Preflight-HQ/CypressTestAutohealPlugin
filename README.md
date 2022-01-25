# preflight-test-autoheal

## Install with npm

```shell
npm install -D preflight-test-autoheal
```
Then include in your project's `cypress/support/index.js`

```js
require('preflight-test-autoheal')
```

## Create account on https://app.preflight.com/
 - Create API key
## Set API key in your test envorinment
- you can set key in code like  `Cypress.Preflight.autohealApiToken = [YOUR_KEY];`
- or set it in Cypress env 

```
"env": {
  "PREFLIGHT_AUTOHEAL_API_TOKEN": "e2NvbXBhbnlJZDoiMSIsc2VjcmV0OiJDT205QTVlTEhCQ3U2d2QifQ=="
 }
```
