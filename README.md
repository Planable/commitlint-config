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

## Emoji descriptions

✅ - Add a test

🛠 - Tooling improvement(VS code stuff, or linting)

📓 - Documentation/Readme

🚧 - Work in progress (WIP)

🐞 - Fix bug / issue

🚨 - Very critical fix or hotfix

👌 - General improvement

⚡️ - Performance improvement

⬆️ - Bump / update package deps

⬇️ - Downgrade package deps

✏️ - Update text / copy inside app (user-facing)

♻️ - Refactor code

⭐️ - Add new feature

✨ - Clean up

📦 - Add new package

🌈 - UI improvement

🔀 - Merge (can/should be added by amending a merge after it has been commited)

🤖 - AI / background automation (agent tasks, AI-related changes, automated updates)
