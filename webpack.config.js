const { path, isDev, isProd, optimization, filename, cssLoaders, pluginsSet, babelOptions, jsLoaders 
} = require('./webpack-base.config');



module.exports = {
    context: path.resolve(__dirname, 'src'),
        mode: 'development',
            entry: {
                main: ['./index.jsx'],
                stat: './statistics.ts'
    },
    target: 'web',
        devServer: {
            port: 4200
        },
    devtool: isDev ? 'source-map' : false,
     output: {
        filename: filename('js'),
            path: path.resolve(__dirname, 'dist')
     },
    resolve: {
        extensions: ['.js', '.json', '.ts', 'jsx', 'tsx'],
        alias: {
            '@': path.resolve(__dirname, 'src'),
            '@model': path.resolve(__dirname, 'src/model'),
            '@css': path.resolve(__dirname, 'src/css'),
            '@assets': path.resolve(__dirname, 'src/assets')
            }
        },

    optimization: optimization(),


    plugins: pluginsSet(),

    module: {
        rules: [ 
        {
            test: /\.js$/,
            exclude: /node_modules/,
            use: jsLoaders()
        },

        {
            test: /\.ts$/,
            exclude: /node_modules/,
            use: {
              loader: "babel-loader",
              options: babelOptions('@babel/preset-typescript')
              } 
        },

        {
            test: /\.jsx$/,
             exclude: /node_modules/,
                use: {
                loader: 'babel-loader',
                options: babelOptions('@babel/preset-react')
            }
        },

        {
            test: /\.css$/,
            use: cssLoaders()
        },

        {
            test: /\.less$/,
            use: cssLoaders('less-loader')
        },

        {
            test: /\.s[ac]ss$/,
            use: cssLoaders('sass-loader')
        },

        {
            test: /\.(png|jpg|jpeg|svg|gif)$/,
            use: ['file-loader']
        },

        {
            test: /\.(ttf|woff|woff2|eot)$/,
            use: ['file-loader']
        }, 

        {
            test: /\.xml$/,
            use: ['xml-loader']
        },

        {
            test: /\.csv$/,
            use: ['csv-loader']
        }
       ]
    }
};
      