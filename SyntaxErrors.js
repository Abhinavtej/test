/**
 * JavaScript Syntax and Runtime Errors Test File
 * Tests various syntax errors and runtime issues
 */

// SYNTAX ERRORS

// Missing semicolons (depending on ASI settings)
let name = "John"
let age = 25

// Unmatched brackets/braces/parentheses
function unmatchedBraces() {
    if (true) {
        console.log("missing closing brace");
    // Missing closing brace

function unmatchedParens() {
    console.log("test";
    // Missing closing parenthesis
}

// Invalid variable names
let 123invalid = "starts with number";
let class = "reserved keyword";
let my-var = "contains hyphen";

// Unexpected tokens
let obj = {
    name: "John",
    age: 25,
    // Extra comma might cause issues in older browsers
};

// REFERENCE ERRORS

function undefinedVariables() {
    console.log(nonExistentVariable);
    return anotherUndefinedVar + 10;
}

function undefinedFunction() {
    nonExistentFunction();
}

// TYPE ERRORS (Runtime)

function typeErrors() {
    let num = null;
    let result = num.toFixed(2); // TypeError: Cannot read property 'toFixed' of null
    
    let str = "hello";
    str.push("world"); // TypeError: str.push is not a function
    
    let obj = undefined;
    console.log(obj.property); // TypeError: Cannot read property 'property' of undefined
}

// RANGE ERRORS

function rangeErrors() {
    let arr = new Array(-1); // RangeError: Invalid array length
    
    let num = 123.456;
    num.toFixed(200); // RangeError: toFixed() digits argument must be between 0 and 100
    
    function infiniteRecursion() {
        return infiniteRecursion(); // RangeError: Maximum call stack size exceeded
    }
    infiniteRecursion();
}

// EVAL AND PARSING ERRORS

function evalErrors() {
    eval("let x = ;"); // SyntaxError: Unexpected token ;
    
    JSON.parse("{ invalid json }"); // SyntaxError: Unexpected token i in JSON
    
    new Function("invalid syntax here"); // SyntaxError
}

// STRICT MODE ERRORS

function strictModeErrors() {
    "use strict";
    
    undeclaredVariable = 5; // ReferenceError in strict mode
    
    delete Object.prototype; // TypeError in strict mode
    
    function duplicate(a, a) { // SyntaxError in strict mode
        return a + a;
    }
    
    with (Math) { // SyntaxError in strict mode
        let result = cos(PI);
    }
}

// PROMISE AND ASYNC ERRORS

async function asyncErrors() {
    // Unhandled promise rejection
    Promise.reject("This will cause unhandled rejection");
    
    // Await without async
    let result = await fetch("/api/data"); // SyntaxError if not in async function
    
    // Invalid async syntax
    let asyncVar = async "not a function"; // SyntaxError
}

// DESTRUCTURING ERRORS

function destructuringErrors() {
    let obj = null;
    let { name, age } = obj; // TypeError: Cannot destructure property 'name' of 'null'
    
    let arr = undefined;
    let [first, second] = arr; // TypeError: Cannot read property 'Symbol.iterator' of undefined
    
    // Invalid destructuring syntax
    let {,} = {}; // SyntaxError: Unexpected token ','
}

// CLASS AND INHERITANCE ERRORS

class ErrorClass {
    constructor() {
        this.name = "test";
    }
    
    // Invalid method syntax
    method() {
        super.nonExistentMethod(); // ReferenceError if not extending anything
    }
}

class ExtendingClass extends NonExistentClass { // ReferenceError
    constructor() {
        // Missing super() call
        this.value = 10; // ReferenceError: Must call super constructor
    }
}

// TEMPLATE LITERAL ERRORS

function templateLiteralErrors() {
    let name = "John";
    let invalid = `Hello ${name; // SyntaxError: Unexpected token ;
    
    let nested = `Outer ${`Inner ${unclosed`} template`; // SyntaxError
}

// IMPORT/EXPORT ERRORS (if using modules)

// Invalid import syntax
import { nonExistent } from './non-existent-module.js'; // Runtime error
import * as invalid from; // SyntaxError

// Invalid export syntax
export { undefinedVariable }; // ReferenceError

// SYMBOL AND ITERATOR ERRORS

function symbolErrors() {
    let sym = Symbol.for();
    sym.toString(); // Works
    
    let invalidIterator = {
        [Symbol.iterator]: "not a function" // TypeError when trying to iterate
    };
    
    for (let item of invalidIterator) {
        console.log(item);
    }
}

// PROXY AND REFLECT ERRORS

function proxyErrors() {
    let target = {};
    let handler = {
        get: "not a function" // TypeError: 'get' on proxy: trap is not a function
    };
    
    let proxy = new Proxy(target, handler);
    proxy.someProperty; // TypeError
}

// REGULAR EXPRESSION ERRORS

function regexErrors() {
    let invalidRegex = new RegExp("["); // SyntaxError: Invalid regular expression
    
    let str = "test";
    str.match(/(/); // SyntaxError: Invalid regular expression: unmatched parenthesis
}

// ARRAY AND OBJECT ERRORS

function arrayObjectErrors() {
    let arr = [1, 2, 3];
    arr.nonExistentMethod(); // TypeError: arr.nonExistentMethod is not a function
    
    let obj = Object.create(null);
    obj.toString(); // TypeError: obj.toString is not a function
    
    // Circular reference issues
    let a = {};
    let b = {};
    a.ref = b;
    b.ref = a;
    JSON.stringify(a); // TypeError: Converting circular structure to JSON
}

// GOOD EXAMPLES (Error Handling)

function properErrorHandling() {
    try {
        let data = JSON.parse('{"name": "John"}');
        console.log(data.name);
    } catch (error) {
        console.error("JSON parsing failed:", error.message);
    }
    
    // Null checking
    let obj = getObjectFromSomewhere();
    if (obj && obj.property) {
        console.log(obj.property);
    }
    
    // Type checking
    function safeOperation(input) {
        if (typeof input === 'number') {
            return input.toFixed(2);
        }
        return "Invalid input";
    }
    
    // Promise error handling
    fetch('/api/data')
        .then(response => response.json())
        .catch(error => console.error("Fetch failed:", error));
}

// Helper function for examples
function getObjectFromSomewhere() {
    return Math.random() > 0.5 ? { property: "value" } : null;
}
