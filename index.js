const web = require('neutrino-preset-web');
const { join } = require('path');

const MODULES = join(__dirname, 'node_modules');

module.exports = (neutrino) => {
  const { config } = neutrino;

  neutrino.use(web);

  config.module.rule('elm')
    .test(/\.elm$/)
      .exclude
        .add(/elm-stuff/)
        .add(/node_modules/)
        .end()
    .use('elm')
      .loader('elm-webpack-loader')
      .options({
        verbose: true,
        warn: true
      });

  let noParse = config.module.get('noParse') || [];
  if (!noParse.push) noParse = [noParse];
  noParse.push(/\.elm$/);
  config.module.set('noParse', noParse);

  config.resolve.modules.add(MODULES);
  config.resolve.extensions.add('.elm');
  config.resolveLoader.modules.add(MODULES);

  if (process.env.NODE_ENV === 'development') {
    config.module.rules.delete('elm');
    config.module.rule('elm')
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
            verbose: true,
            warn: true
          })
          .end();
  }
};
