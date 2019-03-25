module.exports = function() {
  return {
    files: ['src/*.js'],

    tests: ['src/**/*.test.js'],

    env: {
      type: 'node',
      runner: 'node',
    },

    testFramework: 'jest',
  }
}
