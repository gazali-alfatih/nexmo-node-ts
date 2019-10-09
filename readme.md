# Nexmo Client (Unofficial)

> This repository has limited function for the whole Nexmo RESTful API and **leak of test**. **You should not use it for the production application.** You may move to the [official repository](https://github.com/Nexmo/nexmo-node) if you want liberary for production use-case.

Most of the functions in this repository is similar to the offical directory. The main differents are as follow.

- Promise-based instead of callback
- node-fetch for http-client instead of http / https / request
- auto retry for [404 errors](https://help.nexmo.com/hc/en-us/articles/115015969628-Why-do-I-get-a-404-when-trying-to-change-an-active-conversation-) in calls/conversation

## Installation

```bash
# NPM
npm install https://github.com/climba03003/nexmo-node-ts.git

# Yarn
yarn add https://github.com/climba03003/nexmo-node-ts.git
```

## Usage

```typescript
import Nexmo from 'nexmo'

const nexmo = new Nexmo({
  apiKey: API_KEY,
  apiSecret: API_SECRET,
  applicationId: APP_ID,
  privateKey: PRIVATE_KEY_PATH,
  signatureSecret: SIGNATURE_SECRET,
  signatureMethod: SIGNATURE_METHOD
})
```
