# Obsidian Plugin Not Showing Up? Check It in 1 Command

> Your plugin is in `.obsidian/plugins/` but doesn't appear in Obsidian. This script tells you why.

![GIF DEMO](demo.gif)

## Le Problème

You copy your plugin into `.obsidian/plugins/`, restart Obsidian, and it's not in the list. No error. The usual causes: the folder name doesn't match the `id` in `manifest.json`, `manifest.json` is missing or invalid JSON, or `main.js` was never built.

## La Solution

- Checks that `manifest.json` exists and is valid JSON
- Checks the required fields (`id`, `name`, `version`, `minAppVersion`)
- Checks that the folder name matches the `id`, and that `main.js` exists

## Comment l'utiliser

```bash
git clone https://github.com/YOUR_USERNAME/obsidian-plugin-not-loading-check.git
cd obsidian-plugin-not-loading-check
node check-plugin.mjs ./path/to/your/plugin
```

## Ce que j'ai appris

Obsidian doesn't tell you why a plugin is skipped. It just ignores it, so you need to check the folder yourself.

---

Part of my challenge: 1 repo / 2 days. Building ShipIt, the tool to publish an app in 1 click.