'use strict'

const fs = require('fs-extra')
const path = require('path')
const mkdirp = require('mkdirp')
const webpack = require('webpack')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')

const buildPath = path.join(process.cwd(), 'build')
const publicPath = path.join(process.cwd(), 'public')

mkdirp.sync(buildPath)

const compiler = webpack({
  entry: [
    './src/index.js'
  ],
  output: {
    filename: 'index.js',
    path: './public/'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        query: {
          presets: ['es2015']
        },
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new ProgressBarPlugin()
  ]
})

compiler.run((err, stats) => {
  if (err) {
    console.log(err)
  } else {
    fs.copySync(publicPath, buildPath)
  }
})
