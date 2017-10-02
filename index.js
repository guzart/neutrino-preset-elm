const web = require('neutrino-preset-web');
const { join } = require('path');
const merge = require('deepmerge');

const MODULES = join(__dirname, 'node_modules');

module.exports = (neutrino, opts = {}) => {
  const options = merge({
    debug: false,
    presetWeb: {},
  }, opts);

  neutrino.use(web, options.presetWeb);

  neutrino.config
    .module
      .rule('elm')
        .test(/\.elm$/)
        .exclude
          .add(/elm-stuff/)
          .add(/node_modules/)
          .end()
        .use('elm')
          .loader(require.resolve('elm-webpack-loader'))
          .options({ verbose: true, warn: true })
          .end()
        .end()
      .rule('elmcss')
        .test(/Stylesheets\.elm$/)
        .use('style')
          .loader(require.resolve('style-loader'))
          .end()
        .use('css')
          .loader(require.resolve('css-loader'))
          .end()
        .use('elm')
          .loader(require.resolve('elm-css-webpack-loader'))
          .end()
        .end()
      .end()
    .resolve
      .modules
        .add(MODULES)
        .end()
      .extensions
        .add('.elm')
        .end()
      .end()
    .resolveLoader
      .modules
        .add(MODULES)
        .end()
      .end()

  if (process.env.NODE_ENV === 'development') {
    neutrino.config.module.rules.delete('elm');
    neutrino.config.module
      .rule('elm')
        .test(/\.elm$/)
        .exclude
          .add(/elm-stuff/)
          .add(/node_modules/)
          .end()
        .use('hot')
          .loader('elm-hot-loader')
          .end()
        .use('elm')
          .loader('elm-webpack-loader')
          .options({
            debug: options.debug,
            verbose: true,
            warn: true,
            forceWatch: true,
          })
          .end();
  } else {
    neutrino.config
      .plugin('copy')
      .tap((args) => {
        // (patterns: Array<string>, options: Object)
        if (!args[1].ignore) { args[1].ignore = []; }
        args[1].ignore.push('*.elm');
        return args;
      });
  }
};
