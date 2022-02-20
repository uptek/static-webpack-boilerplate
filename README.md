# Static WebPack Boilerplate

A Static WebPack Boilerplate for UI and JavaScript developers that fully supports SASS and modern JavaScript with backward compatibility. This boilerplate uses [webpack-dev-server](https://webpack.js.org/configuration/dev-server/) along with HMR, meaning, whenever you update your SASS or JavaScript, there are no browser reloads which makes the build process superfast! This boilerplate also generates bundle/asset size reports on each successful build.

## Usage

### Installation

Simply, clone this repository and run: `npm i` to install all the required dependencies.

### Development

The development process is very simple. Just run `npm run dev` to spin up the development server. The `src` folder contains your markup, scripts, styles, static and compiled assets. We'll talk about the structure in detail in the coming section.

### Build

In order to build your project for distribution, run `npm run build`. As soon as the build is successful, you'll noticed that there will be another file generated for you called, "report." Simply run `npm run report` to see the full analysis of the JavaScript/CSS bundle along with package sizes and what not.

This is extremely helpful when your bundle size is crazy and you're not sure what's causing the issue. You can use this report to figure out if you need to swap some packages IE remove `momentjs` and use `dayjs` to drastically reduce package size.


## Structure

### Markup

HTML files can be found or further created in the `src` folder. There is no need to include script or link tags in the HTML files as that's automatically being handled via [HtmlWebpackPlugin](https://webpack.js.org/plugins/html-webpack-plugin/) which also minifies the markup.

### Styles

SASS can be found in styles folder. Webpack provides `first-class-citizen` support for CSS/SASS, so its being imported directly via the entry point. We highly recommend for anyone using this boilerplate to use [7-in-1 folder structure](https://www.learnhowtoprogram.com/user-interfaces/building-layouts-preprocessors/7-1-sass-architecture) along with [BEM methodology](https://en.bem.info/methodology/). We also have integrated [stylelint-order](https://github.com/hudochenkov/stylelint-order) plugin which you may deactive by removing the `plugins` options from `.stylelintrc.json` file.

### JavaScript

JavaScript can be found in the `scripts` folder. You can use import/export statements, dynamic imports along with class properties and private methods. Pro tip: You can leverage [Dynamic Module Pattern](https://hasnain.dev/dynamic-module-pattern-for-javascript) with this boilerplate! Just install any package you like with `npm i [package-name]` and import it directly to start hacking. If we weren't clear enough, with dynamic imports and [Dynamic Module Pattern](https://hasnain.dev/dynamic-module-pattern-for-javascript), you can implement JS lazy loading!

## Plugins

Please, make sure to install these plugins in order to leverage static ESLint and Stylelint's static analysis. This also reinforce other good practices like `.editorconfig` so that a team using this boilerplate may remain consistent in how they code.

1. EditorConfig for VS Code
2. ESLint
3. Prettier - Code formatter
4. Stylelint

## Node.js

This boilerplate was updated recently. We recommend that you use at least Node v16.13.2 to make sure everything runs without any troubles.
