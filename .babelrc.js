module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // Melhor resolução de módulos
      [
        'module-resolver',
        {
          alias: {
            '@': './',
            'assets': './assets',
            'components': './components',
            'constants': './constants',
            'expo-router': './node_modules/expo-router',
            'entry.js': './entry.js',
            'expo-router/entry': './node_modules/expo-router/entry.js'
          },
          extensions: [
            '.js',
            '.jsx',
            '.ts',
            '.tsx',
            '.android.js',
            '.android.tsx',
            '.ios.js',
            '.ios.tsx',
          ],
        },
      ],
      // Suporte a decorators (opcional)
      ['@babel/plugin-proposal-decorators', { legacy: true }],
      // Suporte a reanimated
      'react-native-reanimated/plugin',
    ],
  };
};
