const webpack = require("webpack");
const path = require("path");

module.exports = {
    context: path.resolve(__dirname, "./Scripts/src"),
    resolve: {
        // Add ".ts" and ".tsx" as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", ".json", ".html"]
    },
    entry: {
        main: './app'
    },
    output: {
        publicPath: '/Scripts/dist',
        path: path.resolve(__dirname, './Scripts/dist'),
        filename: '[name].build.js'
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'awesome-typescript-loader'
            },
            {
                // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
                test: /\.js$/,
                enforce: "pre",
                loader: "source-map-loader"
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },

    // pretty terminal output
    stats: { colors: true }
};