# electron-webpack-module-resolution
Example of module resolution failure using Electron, Webpack, and external modules

# To reproduce:
1. yarn install
2. npm run build
3. npm run dev

# Notice:
1. Unable to require moment.
2. Adding `require('module').globalPaths.push(process.cwd()+'/node_modules');` resolves the issue.
3. Running with `export NODE_DEBUG=module` shows resolution paths all rooted in `./electron-webpack-module-resolution/node_modules/electron/dist/Electron.app/Contents/Resources/`
