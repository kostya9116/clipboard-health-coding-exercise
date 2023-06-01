const crypto = require("crypto");

const TRIVIAL_PARTITION_KEY = "0";
const MAX_PARTITION_KEY_LENGTH = 256;

// Helper function to generate SHA3-512 hash in hex format of given data
const toSha3Hex = (data) => crypto.createHash("sha3-512").update(data).digest("hex");

exports.deterministicPartitionKey = (event) => {  
  // If the event is null or undefined, return the trivial partition key
  if (!event) {
    return TRIVIAL_PARTITION_KEY;
  }

  // If the event does not have a partition key, hash the entire event
  if (!event.partitionKey) {
    const dataStr = JSON.stringify(event);
    return toSha3Hex(dataStr);
  }

  // Get the partition key from the event and 
  // If the partition key is not a string, convert it to a string
  let candidate = event.partitionKey;  
  if (typeof candidate !== "string") {
    candidate = JSON.stringify(event.partitionKey);
  }
  
  // If the partition key is longer than the maximum allowed length, hash it
  if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
    return toSha3Hex(candidate)
  }

  // If none of the above conditions are met, return the partition key as is
  return candidate;
};

exports.toSha3Hex = toSha3Hex;
exports.MAX_PARTITION_KEY_LENGTH = MAX_PARTITION_KEY_LENGTH;
exports.TRIVIAL_PARTITION_KEY = TRIVIAL_PARTITION_KEY;
