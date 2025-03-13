MOD = 10**9 + 7
PATTERN = "orbitaxian"
P_LEN = len(PATTERN)


def solve():
    import sys

    input = sys.stdin.read
    data = input().split()

    # Read the number of test cases
    T = int(data[0])
    index = 1

    results = []

    for _ in range(T):
        # Read the inputs for each test case
        N, K = int(data[index]), int(data[index + 1])
        S = data[index + 2]
        index += 3

        # Initialize DP table
        dp = [[0] * (N + 1) for _ in range(P_LEN)]
        prefix_sum = [[0] * (N + 1) for _ in range(P_LEN)]

        # Populate the dp for the first character 'o'
        for j in range(N):
            if S[j] == "o":
                dp[0][j] = 1

        # Calculate prefix sums for the first character
        prefix_sum[0][0] = dp[0][0]
        for j in range(1, N):
            prefix_sum[0][j] = (prefix_sum[0][j - 1] + dp[0][j]) % MOD

        # DP recurrence for the remaining characters in the pattern
        for i in range(1, P_LEN):
            for j in range(N):
                if S[j] == PATTERN[i]:
                    # We want dp[i][j] to be the sum of dp[i-1][p] for all p where j - K <= p < j
                    left_bound = max(0, j - K)
                    if left_bound > 0:
                        dp[i][j] = (
                            prefix_sum[i - 1][j - 1] - prefix_sum[i - 1][left_bound - 1]
                        ) % MOD
                    else:
                        dp[i][j] = prefix_sum[i - 1][j - 1] % MOD

            # Update the prefix sum for the current character in the pattern
            prefix_sum[i][0] = dp[i][0]
            for j in range(1, N):
                prefix_sum[i][j] = (prefix_sum[i][j - 1] + dp[i][j]) % MOD

        # Calculate the total number of valid subsequences
        result = sum(dp[P_LEN - 1][j] for j in range(N)) % MOD
        results.append(result)

    # Output the results
    print("\n".join(map(str, results)))
