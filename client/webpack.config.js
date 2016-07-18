module.exports = {
  entry: './src/index.ts',
  output: {
    filename: 'ares.js'
  },
  resolve: {
    // Add `.ts` and `.tsx` as a resolvable extension.
    extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js']
  },
  externals: {
      'phaser': 'Phaser',
      'socket.io-client': 'io'
  },
  devtool: "source-map",
  module: {
    loaders: [
      // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
      { test: /\.tsx?$/, loader: 'ts-loader' }
    ]
  }
}
