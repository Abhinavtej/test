# Comprehensive Test Scenarios

This directory contains comprehensive test files for all supported programming languages, covering various types of code analysis scenarios.

## Directory Structure

```
tests/comprehensive_scenarios/
├── java/
│   ├── CompilationErrors.java      # Java compilation failures
│   ├── InfiniteLoops.java          # Java infinite loop patterns
│   ├── MemoryLeaks.java            # Java memory leak scenarios
│   └── AdvancedLinting.java        # Java coding standards, performance, design patterns
├── typescript/
│   ├── CompilationErrors.ts        # TypeScript type and compilation errors
│   ├── InfiniteLoops.ts            # TypeScript infinite loop patterns
│   └── MemoryLeaks.ts              # TypeScript memory leak scenarios
├── javascript/
│   ├── SyntaxErrors.js             # JavaScript syntax and runtime errors
│   ├── InfiniteLoops.js            # JavaScript infinite loop patterns
│   └── MemoryLeaks.js              # JavaScript memory leak scenarios
└── python/
    ├── SyntaxErrors.py             # Python syntax and runtime errors
    └── MemoryAndPerformance.py     # Python memory leaks and performance issues
```

## Test Scenarios Coverage

### Java Test Files

#### 1. CompilationErrors.java
- **Syntax Errors**: Missing semicolons, unmatched braces, type mismatches
- **Type Issues**: Generic type errors, wrong method signatures
- **Missing Elements**: Import statements, return statements, method parameters
- **Code Structure**: Unreachable code, array bounds issues

#### 2. InfiniteLoops.java
- **Basic Infinite Loops**: `while(true)`, `for(;;)`, `do-while(true)`
- **Condition Issues**: Variables that never change, counters that reset
- **Recursion**: Infinite recursion, mutual recursion
- **Complex Patterns**: Nested infinite loops, subtle counter manipulation

#### 3. MemoryLeaks.java
- **Resource Leaks**: Unclosed file streams, database connections
- **Collection Issues**: Static collections that grow indefinitely
- **Event Listeners**: Listeners added without removal
- **Threading**: ThreadLocal not cleaned up, timer leaks
- **String Building**: Inefficient string concatenation

#### 4. AdvancedLinting.java
- **Coding Standards**: Naming conventions, method length, code structure
- **Performance Issues**: String concatenation, collection choices, boxing/unboxing
- **Design Patterns**: Singleton implementation, God Object anti-pattern
- **Thread Safety**: Synchronization issues, race conditions, volatile usage

### TypeScript Test Files

#### 1. CompilationErrors.ts
- **Type Errors**: Type mismatches, missing type annotations
- **Interface Issues**: Incorrect implementations, missing properties
- **Generic Problems**: Generic type constraints, type assertions
- **Module Errors**: Import/export issues, missing modules
- **Advanced Features**: Optional chaining, union types, enum errors

#### 2. InfiniteLoops.ts
- **Basic Patterns**: `while(true)`, infinite for loops
- **Async Loops**: Infinite Promise chains, async/await loops
- **Event-Driven**: Event listeners that trigger themselves
- **Generators**: Infinite generator patterns
- **Observer Patterns**: Circular update loops

#### 3. MemoryLeaks.ts
- **Event Listeners**: addEventListener without removeEventListener
- **Timers**: setInterval/setTimeout without cleanup
- **Observables**: Subscriptions without unsubscribe
- **WebSockets**: Connections without close
- **DOM References**: Caching DOM elements preventing GC
- **Closures**: Large objects captured unnecessarily

### JavaScript Test Files

#### 1. SyntaxErrors.js
- **Syntax Issues**: Unmatched brackets, invalid variable names
- **Runtime Errors**: TypeError, ReferenceError, RangeError
- **Strict Mode**: Strict mode violations
- **ES6+ Features**: Destructuring, template literals, classes
- **Async/Await**: Promise and async syntax errors

#### 2. InfiniteLoops.js
- **Basic Loops**: Standard infinite loop patterns
- **Array/Object**: Growing collections during iteration
- **Event-Driven**: Self-triggering events, mutation observers
- **Prototype**: Circular prototype chains
- **Async Patterns**: Infinite Promise chains, setTimeout loops

#### 3. MemoryLeaks.js
- **Global Variables**: Accidental globals, growing global collections
- **Event Listeners**: Missing removeEventListener calls
- **Timers**: setInterval without clearInterval
- **DOM References**: Detached DOM nodes, circular references
- **Closures**: Large objects captured in closures
- **Web Workers**: Workers without termination

### Python Test Files

#### 1. SyntaxErrors.py
- **Syntax Issues**: Indentation errors, missing colons, unmatched brackets
- **Import Problems**: Invalid import syntax, circular imports
- **Runtime Errors**: NameError, TypeError, ValueError, IndexError
- **Class Issues**: Inheritance problems, method definition errors
- **Advanced Features**: Generator errors, async/await issues

#### 2. MemoryAndPerformance.py
- **Memory Leaks**: Circular references, global collections, closure leaks
- **Resource Leaks**: File handles, database connections, network sockets
- **Performance**: String concatenation, inefficient algorithms
- **Caching Issues**: Unbounded caches, weak reference misuse
- **Threading**: Thread leaks, resource management

## Usage Instructions

### Running Individual Tests

Each test file is designed to demonstrate specific types of issues. To test the analyzers:

```bash
# Java Tests
python src/analyzers/java_analyzer.py tests/comprehensive_scenarios/java/CompilationErrors.java
python src/analyzers/java_analyzer.py tests/comprehensive_scenarios/java/InfiniteLoops.java
python src/analyzers/java_analyzer.py tests/comprehensive_scenarios/java/MemoryLeaks.java
python src/analyzers/java_analyzer.py tests/comprehensive_scenarios/java/AdvancedLinting.java

# TypeScript Tests
python src/analyzers/typescript_analyzer.py tests/comprehensive_scenarios/typescript/CompilationErrors.ts
python src/analyzers/typescript_analyzer.py tests/comprehensive_scenarios/typescript/InfiniteLoops.ts
python src/analyzers/typescript_analyzer.py tests/comprehensive_scenarios/typescript/MemoryLeaks.ts

# JavaScript Tests
python src/analyzers/javascript_analyzer.py tests/comprehensive_scenarios/javascript/SyntaxErrors.js
python src/analyzers/javascript_analyzer.py tests/comprehensive_scenarios/javascript/InfiniteLoops.js
python src/analyzers/javascript_analyzer.py tests/comprehensive_scenarios/javascript/MemoryLeaks.js

# Python Tests
python src/analyzers/simple_analyzer.py tests/comprehensive_scenarios/python/SyntaxErrors.py
python src/analyzers/simple_analyzer.py tests/comprehensive_scenarios/python/MemoryAndPerformance.py
```

### Running All Tests

Use the main analyzer to run tests on all files:

```bash
python src/analyzers/main_analyzer.py tests/comprehensive_scenarios/
```

## Expected Analysis Results

### Java Analyzer Results
- **Compilation Errors**: Detects syntax errors, type mismatches, missing imports
- **Infinite Loops**: Identifies while(true), for(;;), infinite recursion patterns
- **Memory Leaks**: Finds unclosed resources, growing collections, event listener issues
- **Advanced Linting**: Reports coding standards violations, performance issues, design pattern problems, thread safety concerns

### TypeScript Analyzer Results
- **Compilation Status**: SUCCESS/FAILURE with detailed type checking
- **Memory Leaks**: Event listeners, timers, observables, WebSocket connections
- **Code Quality**: Type usage, console statements, magic numbers
- **Infinite Loops**: Basic and complex infinite loop patterns

### JavaScript Analyzer Results
- **Syntax Analysis**: Bracket matching, variable declarations, function definitions
- **Quality Issues**: Console usage, strict mode compliance, error handling
- **Performance**: String operations, loop efficiency

### Python Analyzer Results
- **Syntax Checking**: Indentation, imports, basic syntax validation
- **Code Structure**: Function/class definitions, control flow

## Test File Features

### Realistic Scenarios
All test files contain realistic code patterns that developers might actually write, not just artificial test cases.

### Progressive Complexity
Each file includes both obvious and subtle versions of issues, testing the analyzer's detection capabilities.

### Good Examples
Most files include properly written examples alongside problematic code to validate that analyzers don't produce false positives.

### Comprehensive Coverage
The test suite covers all major analysis features:
- Compilation/syntax checking
- Infinite loop detection
- Memory leak detection
- Code quality analysis
- Performance issues
- Security concerns
- Best practice violations

## Extending the Test Suite

To add new test scenarios:

1. **Create new test files** following the naming convention
2. **Document the scenarios** in this README
3. **Include both problematic and correct examples**
4. **Test with the appropriate analyzer** to verify detection
5. **Update the expected results** section

## Notes

- Some test files intentionally contain errors and may not compile
- Files are designed for static analysis, not execution
- Each analyzer has different capabilities and will detect different issues
- Test files serve as both validation and demonstration of analyzer capabilities
