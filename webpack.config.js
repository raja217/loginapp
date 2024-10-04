const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js', // Entry point of your application
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'), // Output directory
    publicPath: 'http://localhost:8081/', // Required for module federation
  },
  devServer: {
    port: 8081, // Port for the dev server
    historyApiFallback: true, // Enable support for client-side routing
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader', // For transpiling ES6+
      },
      {
        test: /\.css$/, // Matches .css files
        use: [
          'style-loader', // Injects CSS into the DOM
          'css-loader',   // Interprets @import and url() like import/require()
        ],
      },
    ],
  },
  plugins: [
    // HtmlWebpackPlugin to generate an HTML file that includes your bundled JS
    new HtmlWebpackPlugin({
      template: './public/index.html', // Path to your HTML template
      filename: 'index.html', // Output HTML file
    }),
    // Configure Module Federation
    new ModuleFederationPlugin({
      name: 'loginApp',
      filename: 'remoteEntry.js',
      exposes: {
        './login': './src/components/Login', // Exposing the Login component
      },
      remotes: {
        dashboardApp: 'dashboardApp@http://localhost:8082/remoteEntry.js',
      },
      shared: {
        react: {
          singleton: true, // Ensures only one version of React is used
          eager: true,
        },
        'react-dom': {
          singleton: true, // Ensures only one version of React DOM is used
          eager: true,
        },
      },
    }),
  ],
  mode: 'development', // Can be 'development' or 'production'
};
