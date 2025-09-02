def factorial(n: int) -> int:
    """Return the factorial of n (n!)."""
    if n < 0:
        raise ValueError("Factorial is not defined for negative numbers")
    if n in (0, 1):
        return 1
    return n * factorial(n - 1)


if __name__ == "__main__":
    try:
        number = int(input("Enter a positive integer: "))
        print(f"Factorial of {number} is {factorial(number)}")
    except ValueError as e:
        print("Error:", e)
