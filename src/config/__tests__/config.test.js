import { config } from '../config.js'

describe('config', () => {
  it('should have all required properties', () => {
    expect(config).toHaveProperty('DEV_MODE')
    expect(config).toHaveProperty('INPUT_DIRECTORY')
    expect(config).toHaveProperty('OUTPUT_DIRECTORY')
    expect(config).toHaveProperty('OUTPUT_FILE_NAME')
  })

  it('should have correct types for properties', () => {
    expect(typeof config.DEV_MODE).toBe('boolean')
    expect(typeof config.INPUT_DIRECTORY).toBe('string')
    expect(typeof config.OUTPUT_DIRECTORY).toBe('string')
    expect(typeof config.OUTPUT_FILE_NAME).toBe('string')
  })
}) 