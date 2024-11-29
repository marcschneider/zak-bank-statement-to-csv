export default {
  testEnvironment: 'node',
  transform: {},
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1'
  },
  testPathIgnorePatterns: [
    '/node_modules/',
    '/fixtures/'
  ],
  moduleDirectories: ['node_modules', 'src'],
  testTimeout: 30000,
  verbose: true
} 