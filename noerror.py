"""A simple module to calculate factorial of a number."""

def factorial(number: int) -> int:
    """Return the factorial of a given number."""
    if number < 0:
        raise ValueError("Factorial is not defined for negative numbers")
    if number in (0, 1):
        return 1
    return number * factorial(number - 1)


if __name__ == "__main__":
    try:
        user_input = int(input("Enter a positive integer: "))
        print(f"Factorial of {user_input} is {factorial(user_input)}")
    except ValueError as error:
        print("Error:", error)
