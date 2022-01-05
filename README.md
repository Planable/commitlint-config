# @planable/commitlint-config

Commitlint configs used in Planable projects

## Install

```bash
npm install --save-dev @planable/commitlint-config
```

In `commitlint.config.js`

```js
module.exports = {
  extends: ['@planable']
};
```

or run in terminal

```bash
echo "module.exports = { extends: ['@planable'] };" > commitlint.config.js
```