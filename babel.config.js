module.exports = function(api) {
  api.cache(true);
  
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'react-native-reanimated/plugin',
      ['module-resolver', {
        root: ['./'],
        alias: {
          '@': './',
          'expo-router/node/render': './shims/router-render-shim.js',
          'expo-router/node/render.js': './shims/router-render-shim.js',
          '@expo/metro-runtime/src/error-overlay/ErrorOverlay': './shims/error-overlay-shim.js',
          'expo': './shims/expo-shim.js',
          '@babel/runtime/helpers/interopRequireDefault': './shims/babel-runtime-shim.js',
          '@react-navigation/native-stack': './shims/native-stack-shim.js',
          '@react-navigation/bottom-tabs': './shims/bottom-tabs-shim.js',
          'react-native-web': './shims/react-native-web/dist/index.js',
          'react-native-web/dist/index': './shims/react-native-web/dist/index.js',
          'react-native-web/dist': './shims/react-native-web/dist/index.js',
          'react': './node_modules/react'
        },
        extensions: [
          '.ios.js',
          '.android.js',
          '.js',
          '.jsx',
          '.ts',
          '.tsx',
          '.json',
        ],
      }],
    ]
  };
};
