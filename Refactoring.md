# Refactoring

You've been asked to refactor the function `deterministicPartitionKey` in [`dpk.js`](dpk.js) to make it easier to read and understand without changing its functionality. For this task, you should:

1. Write unit tests to cover the existing functionality and ensure that your refactor doesn't break it. We typically use `jest`, but if you have another library you prefer, feel free to use it.
2. Refactor the function to be as "clean" and "readable" as possible. There are many valid ways to define those words - use your own personal definitions, but be prepared to defend them. Note that we do like to use the latest JS language features when applicable.
3. Write up a brief (~1 paragraph) explanation of why you made the choices you did and why specifically your version is more "readable" than the original.

You will be graded on the exhaustiveness and quality of your unit tests, the depth of your refactor, and the level of insight into your thought process provided by the written explanation.

## Your Explanation Here

1. The const variables should be moved outside of the function.
This avoids unnecessary initialization every time the function is called.

2. It is clear from the existing logic that when there is no event, TRIVIAL_PARTITION_KEY is returned.
So, it's better to handle this scenario early, without any further checks.
This improves code readability and performance.

3. The sha3-512 function generates a 512-bit hash, which corresponds to 128 hex characters.
This is always smaller than MAX_PARTITION_KEY_LENGTH.
Therefore, in some cases, we have a redundant check, which could cause confusion.
It's better to avoid this and return the result as soon as it's ready.

This whole refactoring is done in accordance with best practices as advocated by Uncle Bob Martin in his "Clean Code" book.
The main idea is to reduce the cognitive load while reading code.
It's beneficial to handle simple cases upfront where the result can be calculated immediately.
