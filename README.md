<div align="center">
    <h1>better-async-await.macro 🎣</h1>
    Write better async await and avoid the try catch statement
</div>

<hr />

[![Build Status](https://travis-ci.com/vivek12345/better-async-await.macro.svg?branch=master)](https://travis-ci.com/vivek12345/better-async-await.macro) [![Babel Macro](https://img.shields.io/badge/babel--macro-%F0%9F%8E%A3-f5da55.svg?style=flat-square)](https://github.com/kentcdodds/babel-plugin-macros) [![Greenkeeper badge](https://badges.greenkeeper.io/vivek12345/better-async-await.macro.svg)](https://greenkeeper.io/)


## Installation with CRA < 2.0

```sh
npm install --save-dev babel-plugin-macros better-async-await.macro
```

or

```sh
yarn add babel-plugin-macros better-async-await.macro --dev
```

**.babelrc**

```json
{
  "plugins": ["babel-plugin-macros"]
}
```

## Installation with CRA >= 2.0

```sh
npm install --save-dev better-async-await.macro
```

or

```sh
yarn add better-async-await.macro --dev
```

## ⭐ Usage

```javascript
import betterAsyncAwait 'better-async-await.macro';

async function test() {
  const [err, resp] = await betterAsyncAwait(api.getData(5));
  if(err) handleError();
  // else do something with the response
}
```


## Motivation and Idea

This babel macro is to use this plugin [babel-plugin-better-async-await](https://github.com/vivek12345/babel-plugin-better-async-await/) with CRA or any app which in any way relies on @babel/env or on the order of plugins or presets.


> In async/await functions we often use try/catch blocks to catch errors.

For example:-

```javascript
async function completeApplicationFlow() {
  // wait for get session status api to check the status
  let response;
  try {
    response = await getSessionStatusApi();
  } catch(err) {
    // if error show a generic error message
    return handleError(err);
  }

  // wait for getting next set of questions api
  try {
    response = await getNextQuestionsApi();
  } catch(err) {
    // if error show a generic error message
    return handleError(err);
  }

  // finally submit application
  try {
    response = await submitApplication();
  } catch(err) {
    // if error show a generic error message
    return handleError(err);
  }
}

```

> Approach with this macro and different way of doing this could be:-

```javascript
import betterAsyncAwait 'better-async-await.macro';

async function completeApplicationFlow() {
  // wait for get session status api to check the status
  let err, response;
  // wait for get session status api to check the status
  [err, response] = await betterAsyncAwait(getSessionStatusApi());
  // if error show a generic error message
  if (err) return handleError(err);
  // call getNextQuestion Api
  [err, response] = await betterAsyncAwait(getNextQuestionsApi());
  // if error show a generic error message
  if (err) return handleError(err);
  // finally submit application
  [err, response] = await betterAsyncAwait(this.submitApplication());
  if (err) return handleError(err);
}

```



## ⚡️ The problem solved

> Using this babel macro you could write async await in the alternate approach mentioned above.
We will transform your async await code so that it works the `[err, resp]` way.

## 📒 Examples of using it in your code

**Before**
```javascript
async function test() {
  let resp;
  try {
    resp = await api.getData(5);
  } catch(err)
    handleError();
  }
}
```

**After**

```javascript
async function test() {
  const [err, resp] = await betterAsyncAwait(api.getData(5));
  if(err) handleError();
  // else do something with the response
}
```

**Before**
```javascript
async function test() {
  let resp;
  try {
    resp = await getData;
  } catch(err)
    handleError();
  }
}

function getData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(true);
    }, 1000);
  });
}
```

**After**

```javascript
async function test() {
  const [err, resp] = await betterAsyncAwait(getData);
  if(err) handleError();
  // else do something with the response
}

function getData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(true);
    }, 1000);
  });
}
```

**Before**
```javascript
async function test() {
  let resp;
  try {
    resp = await fetch('http://some-rest-endpoint');
  } catch(err)
    handleError();
  }
}
```

**After**

```javascript
async function test() {
  const [err, resp] = await betterAsyncAwait(fetch('http://some-rest-endpoint'));
  if(err) handleError();
  // else do something with the response
}
```

## 📒 Babel Tranformation

**In**

```javascript
async function test() {
  const [err, resp] = await betterAsyncAwait(fetch('http://some-rest-endpoint'));
}
```

**Out**

```javascript
async function test() {
  const [err, resp] = await fetch('http://some-rest-endpoint').then(resp => {
    return [null, resp];
  }).catch(error => {
    return [error];
  })
}
```

## 👍 Contribute

Show your ❤️ and support by giving a ⭐. Any suggestions and pull request are welcome !

### 📝 License

MIT © [viveknayyar](https://github.com/vivek12345)

## 👷 TODO

- [x] Complete README
- [ ] Add Examples and Demo
- [x] Test Suite
