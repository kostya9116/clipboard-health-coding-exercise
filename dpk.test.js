const { deterministicPartitionKey, toSha3Hex, MAX_PARTITION_KEY_LENGTH, TRIVIAL_PARTITION_KEY } = require('./dpk');

describe("deterministicPartitionKey", () => {
  const crypto = require('crypto');

  it('should return "0" when event is falsy', () => {
    expect(deterministicPartitionKey(undefined)).toBe(TRIVIAL_PARTITION_KEY);
    expect(deterministicPartitionKey('')).toBe(TRIVIAL_PARTITION_KEY);
    expect(deterministicPartitionKey(null)).toBe(TRIVIAL_PARTITION_KEY);
  });

  it('should return hashed string of the event object when partitionKey is not defined', () => {
    const event = { data: "test" };
    expect(deterministicPartitionKey(event)).toBe(toSha3Hex(JSON.stringify(event)));
  });
 
  it('should return strigified partitionKey when it is not a string and less then limit(128) characters', () => {
    const partitionKey = { key: "test" };
    const event = { partitionKey: partitionKey };
    expect(deterministicPartitionKey(event)).toBe(JSON.stringify(partitionKey));
  });

  it('should return strigified and hash partitionKey when it is not a string and more then limit(128) characters', () => {
    const partitionKey = { key: "test".repeat(100) };
    const event = { partitionKey: partitionKey };
    expect(deterministicPartitionKey(event)).toBe(toSha3Hex(JSON.stringify(partitionKey)));
  });

  it('should return partitionKey when it is string and length is within the limit', () => {
    const event = { partitionKey: 'testKey' };
    expect(deterministicPartitionKey(event)).toBe(event.partitionKey);
  });

  it('should return hashed partitionKey when its string length exceeds the limit', () => {
    const longString = 'a'.repeat(MAX_PARTITION_KEY_LENGTH + 1);
    const event = { partitionKey: longString };
    expect(deterministicPartitionKey(event)).toBe(toSha3Hex(longString));
  });
});

