"""
Python Syntax Errors Test File
Tests various syntax errors and runtime issues in Python
"""

# SYNTAX ERRORS

# Indentation errors
def indentation_error():
print("Missing indentation")  # IndentationError
    return "test"

# Missing colons
def missing_colon()  # SyntaxError: missing colon
    return "test"

if True  # SyntaxError: missing colon
    print("if without colon")

# Unmatched parentheses/brackets/braces
def unmatched_parentheses():
    result = (1 + 2 + 3  # SyntaxError: unmatched parenthesis
    return result

def unmatched_brackets():
    my_list = [1, 2, 3  # SyntaxError: unmatched bracket
    return my_list

def unmatched_braces():
    my_dict = {"key": "value"  # SyntaxError: unmatched brace
    return my_dict

# Invalid variable names
123invalid = "starts with number"  # SyntaxError
class = "reserved keyword"  # SyntaxError
my-var = "contains hyphen"  # SyntaxError

# Invalid string literals
def invalid_strings():
    unclosed_string = "this string is not closed  # SyntaxError
    invalid_escape = "invalid \z escape"  # SyntaxError (depending on context)
    mixed_quotes = 'single quote and "double quote  # SyntaxError

# Invalid function definitions
def invalid_function_def():
    def (param):  # SyntaxError: missing function name
        return param
    
    def func(param param2):  # SyntaxError: missing comma
        return param + param2

# IMPORT ERRORS

# Invalid import syntax
import  # SyntaxError: incomplete import
from module  # SyntaxError: incomplete from import
from module import  # SyntaxError: incomplete import
import .relative  # SyntaxError: invalid relative import

# Circular imports (runtime error)
import circular_module_a  # This would cause ImportError if circular_module_a imports this module

# RUNTIME ERRORS

# NameError - undefined variables
def name_errors():
    print(undefined_variable)  # NameError
    return another_undefined_var + 10  # NameError

# TypeError - type mismatches
def type_errors():
    result = "string" + 5  # TypeError: can't concatenate str and int
    length = len(123)  # TypeError: object of type 'int' has no len()
    index = "hello"[1.5]  # TypeError: string indices must be integers
    
    # Calling non-callable
    number = 42
    result = number()  # TypeError: 'int' object is not callable

# ValueError - wrong values
def value_errors():
    int_val = int("not_a_number")  # ValueError
    list_val = [1, 2, 3]
    list_val.remove(4)  # ValueError: list.remove(x): x not in list
    
    import math
    sqrt_val = math.sqrt(-1)  # ValueError: negative number

# IndexError - list index out of range
def index_errors():
    my_list = [1, 2, 3]
    item = my_list[10]  # IndexError
    
    my_string = "hello"
    char = my_string[20]  # IndexError

# KeyError - dictionary key not found
def key_errors():
    my_dict = {"a": 1, "b": 2}
    value = my_dict["c"]  # KeyError
    
    # Nested key error
    nested = {"outer": {"inner": "value"}}
    val = nested["outer"]["nonexistent"]  # KeyError

# AttributeError - attribute doesn't exist
def attribute_errors():
    my_string = "hello"
    my_string.nonexistent_method()  # AttributeError
    
    my_list = [1, 2, 3]
    my_list.invalid_attribute  # AttributeError

# ZeroDivisionError
def zero_division_errors():
    result = 10 / 0  # ZeroDivisionError
    mod_result = 10 % 0  # ZeroDivisionError

# FileNotFoundError
def file_errors():
    with open("nonexistent_file.txt", "r") as f:  # FileNotFoundError
        content = f.read()

# LOGICAL ERRORS (not syntax errors but problematic)

# Infinite loops
def infinite_loops():
    # Basic infinite loop
    while True:
        print("This runs forever")
    
    # Counter that never changes
    counter = 5
    while counter > 0:
        print(f"Counter: {counter}")
        # counter never decrements
    
    # Infinite recursion
    def infinite_recursion():
        return infinite_recursion()  # RecursionError eventually
    
    infinite_recursion()

# Memory issues
def memory_issues():
    # Creating very large lists
    huge_list = [i for i in range(10**9)]  # MemoryError on most systems
    
    # Infinite list growth
    growing_list = []
    while True:
        growing_list.extend(range(1000000))

# CLASS AND INHERITANCE ERRORS

class ErrorClass:
    def __init__(self):
        self.name = "test"
    
    # Invalid method definition
    def method(self):
        super().nonexistent_method()  # AttributeError if not overriding

class BadInheritance(NonExistentClass):  # NameError
    def __init__(self):
        super().__init__()

# Multiple inheritance issues
class A:
    def method(self):
        return "A"

class B:
    def method(self):
        return "B"

class C(A, B):
    def method(self):
        # Ambiguous super() call in multiple inheritance
        return super().method()  # Could be problematic

# EXCEPTION HANDLING ERRORS

def exception_handling_errors():
    # Invalid except clause
    try:
        risky_operation()
    except:  # Too broad exception handling
        pass
    
    # Invalid exception syntax
    try:
        risky_operation()
    except ValueError AttributeError:  # SyntaxError: missing comma or 'as'
        pass
    
    # Finally without try
    finally:  # SyntaxError: 'finally' without matching 'try'
        print("cleanup")

# GENERATOR AND ITERATOR ERRORS

def generator_errors():
    def bad_generator():
        return "not a generator"  # Should use yield
        yield 1  # Unreachable code
    
    # StopIteration not handled
    gen = (x for x in range(3))
    for _ in range(5):  # Will exhaust generator
        next(gen)  # StopIteration on 4th and 5th calls

# ASYNC/AWAIT ERRORS

# Await outside async function
def non_async_function():
    result = await some_async_function()  # SyntaxError

# Async function syntax errors
async def async_errors():
    # Missing await
    result = some_async_function()  # Should use await
    
    # Invalid async syntax
    async for item in regular_list:  # TypeError if regular_list is not async iterable
        print(item)

# LAMBDA ERRORS

def lambda_errors():
    # Multi-statement lambda (not allowed)
    bad_lambda = lambda x: print(x); return x  # SyntaxError
    
    # Invalid lambda syntax
    invalid_lambda = lambda: lambda: 5()  # SyntaxError

# COMPREHENSION ERRORS

def comprehension_errors():
    # Invalid comprehension syntax
    bad_list_comp = [x for x in]  # SyntaxError
    bad_dict_comp = {k: v for k, v}  # SyntaxError
    
    # Variable leakage in comprehensions (Python 2 vs 3 issue)
    [i for i in range(10)]
    print(i)  # NameError in Python 3, works in Python 2

# DECORATOR ERRORS

# Invalid decorator syntax
@  # SyntaxError: invalid decorator
def decorated_function():
    pass

@nonexistent_decorator  # NameError
def another_decorated_function():
    pass

# GOOD EXAMPLES (PROPER ERROR HANDLING)

def proper_error_handling():
    """Examples of proper error handling and code structure"""
    
    # Proper exception handling
    try:
        result = risky_operation()
    except ValueError as e:
        print(f"Value error occurred: {e}")
    except TypeError as e:
        print(f"Type error occurred: {e}")
    except Exception as e:
        print(f"Unexpected error: {e}")
    finally:
        print("Cleanup performed")
    
    # Proper file handling
    try:
        with open("data.txt", "r") as file:
            content = file.read()
    except FileNotFoundError:
        print("File not found")
    except PermissionError:
        print("Permission denied")
    
    # Proper type checking
    def safe_division(a, b):
        if not isinstance(a, (int, float)) or not isinstance(b, (int, float)):
            raise TypeError("Arguments must be numbers")
        if b == 0:
            raise ValueError("Cannot divide by zero")
        return a / b
    
    # Proper list access
    def safe_list_access(lst, index):
        if 0 <= index < len(lst):
            return lst[index]
        else:
            return None
    
    # Proper dictionary access
    def safe_dict_access(dictionary, key):
        return dictionary.get(key, "Default value")

# Helper functions for examples
def risky_operation():
    """Simulates a risky operation that might fail"""
    import random
    if random.random() < 0.5:
        raise ValueError("Random failure")
    return "Success"

async def some_async_function():
    """Example async function"""
    return "async result"
