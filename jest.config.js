module.exports = {
    "preset": "jest-expo",
    "collectCoverage": true,
    "rootDir": "./",
    "testRegex": "tests/.+\\.test\\.js",
    "transform": {
      '^.+\\.js?$': "babel-jest"
    },
    "moduleFileExtensions": ["js"],
    "moduleDirectories": [
      "node_modules",
      "src"
    ],
    "transformIgnorePatterns": [
        "node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg)"
    ]
}