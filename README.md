<h2 id="about">💄🛒 About Egeria Cosmetic Store</h2>

This website is used to purchase cosmetic products online, equipped with a basket feature and admin dashboard for resource management

<p></p>

<h2 id="feature">✨ Features Available</h2>

- Admin Dasboard
  - Login admin
  - Manage data categories
  - Manage data brands
  - Manage data products cosmetic
  - Manage booking transaction
- Purchasing Products
  - Displays product, categories and brands
  - displays popular and unpopular products
  - Shopping Cart
  - Search produtcs
  - Purchase products by filling in personal data and sending proof
  - Check transactions and monitor transactions

<p></p>

<h2 id="support">💌 Support me</h2>

You can support me on the trakteer platform! Your support will be very helpful for me, but with you starring this project has also been very helpful, you know!

<p></p>

<a href="https://trakteer.id/dimassrfyy" target="_blank"><img id="wse-buttons-preview" src="https://cdn.trakteer.id/images/embed/trbtn-red-5.png" height="40" style="border:0px;height:40px;" alt="Trakteer Saya"></a>

<p></p>

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```
