const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { spawn } = require('child_process');

// Config directories
const SRC_DIR = path.resolve(__dirname, 'src');
const OUTPUT_DIR = path.resolve(__dirname, 'dist');

module.exports = {
    entry: SRC_DIR + '/index.js',
    output: {
        path: OUTPUT_DIR,
        publicPath: '/dist/',
        filename: 'bundle.js'

    },
    externals: {
        moment: "commonjs moment"
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: "/node_modules/",
                use: [{ loader: 'babel-loader' }],
                include: [SRC_DIR]
            }
        ]
    },

    target: 'electron-renderer',
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.html',
            inject: 'body'
        })
    ],
    devServer: {
        contentBase: OUTPUT_DIR,
        before() {
            spawn(
                'electron',
                ['./src/electron.js'],
                { shell: true, env: process.env, stdio: 'inherit' }

            )
            .on('close', code => process.exit(0))
            .on('error', spawnError => console.error(spawnError));
        }

    }

};