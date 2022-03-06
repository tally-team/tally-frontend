module.exports = {
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
    transformIgnorePatterns: [
        "/node_modules/(?!(@react-native|react-native)/).*/"
    ]
}