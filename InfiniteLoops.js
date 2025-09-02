/**
 * JavaScript Infinite Loops Test File
 * Tests various infinite loop scenarios in JavaScript
 */

// BASIC INFINITE LOOPS
function basicInfiniteLoops() {
    // Infinite while loop
    while (true) {
        console.log('Infinite while loop');
    }
    
    // Infinite for loop
    for (;;) {
        console.log('Infinite for loop');
    }
    
    // Do-while infinite
    do {
        console.log('Infinite do-while');
    } while (true);
}

// CONDITION-BASED INFINITE LOOPS
function conditionBasedInfiniteLoops() {
    // Variable never changes
    let counter = 5;
    while (counter > 0) {
        console.log('Counter is:', counter);
        // counter never decrements
    }
    
    // Always true condition
    let isRunning = true;
    while (isRunning) {
        console.log('Always running');
        // isRunning never set to false
    }
    
    // Condition reset
    let value = 0;
    while (value < 10) {
        console.log('Value:', value);
        value = 0; // Reset value, causing infinite loop
    }
}

// LOOP VARIABLE MANIPULATION
function loopVariableManipulation() {
    // Counter reset in for loop
    for (let i = 0; i < 10; i++) {
        console.log('Iteration:', i);
        if (i === 5) {
            i = 0; // Reset counter
        }
    }
    
    // Wrong increment direction
    let j = 0;
    while (j < 10) {
        console.log('j is:', j);
        j--; // Decreasing instead of increasing
    }
    
    // Floating point precision issues
    for (let f = 0.1; f !== 1.0; f += 0.1) {
        console.log('Float:', f);
        // Due to floating point precision, f may never equal 1.0
    }
}

// RECURSIVE INFINITE LOOPS
function recursiveInfiniteLoops() {
    // Simple infinite recursion
    function infiniteRecursion() {
        console.log('Infinite recursion');
        return infiniteRecursion();
    }
    
    // Mutual recursion
    function functionA() {
        console.log('Function A');
        return functionB();
    }
    
    function functionB() {
        console.log('Function B');
        return functionA();
    }
    
    // Conditional recursion that never meets base case
    function badRecursion(n) {
        console.log('n is:', n);
        if (n === 0) {
            return 1;
        }
        return badRecursion(n + 1); // n increases instead of decreasing
    }
    
    infiniteRecursion();
}

// ARRAY/OBJECT ITERATION INFINITE LOOPS
function iterationInfiniteLoops() {
    // Array that grows during iteration
    const items = [1, 2, 3];
    for (let i = 0; i < items.length; i++) {
        console.log('Item:', items[i]);
        items.push(i + 10); // Array keeps growing
    }
    
    // Object that grows during iteration
    const obj = { a: 1, b: 2 };
    for (const key in obj) {
        console.log('Key:', key, 'Value:', obj[key]);
        obj[`key_${Date.now()}`] = Math.random(); // Object keeps growing
    }
    
    // forEach with array modification
    const numbers = [1, 2, 3];
    numbers.forEach((num, index) => {
        console.log('Number:', num);
        numbers.push(num * 2); // Array grows during forEach
    });
}

// ASYNC INFINITE LOOPS
function asyncInfiniteLoops() {
    // Infinite Promise chain
    function infinitePromiseChain() {
        return Promise.resolve()
            .then(() => {
                console.log('Promise chain');
                return infinitePromiseChain();
            });
    }
    
    // Infinite async/await loop
    async function infiniteAsyncLoop() {
        while (true) {
            await new Promise(resolve => setTimeout(resolve, 100));
            console.log('Async infinite loop');
        }
    }
    
    // Infinite setTimeout chain
    function infiniteTimeout() {
        setTimeout(() => {
            console.log('Timeout chain');
            infiniteTimeout();
        }, 100);
    }
    
    // Infinite setInterval (obvious but common)
    setInterval(() => {
        console.log('Infinite interval');
    }, 1000);
    
    infinitePromiseChain();
}

// EVENT-DRIVEN INFINITE LOOPS
function eventDrivenInfiniteLoops() {
    // Event listener that triggers itself
    const button = document.getElementById('test-button');
    button.addEventListener('click', function() {
        console.log('Button clicked');
        button.click(); // Triggers itself infinitely
    });
    
    // Observer that modifies what it observes
    const target = document.getElementById('observed-element');
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(mutation => {
            console.log('Mutation observed');
            target.innerHTML += '<span>New content</span>'; // Triggers more mutations
        });
    });
    
    observer.observe(target, { childList: true, subtree: true });
    target.innerHTML = 'Initial change'; // Starts the infinite loop
}

// GENERATOR INFINITE LOOPS
function* infiniteGenerator() {
    let count = 0;
    while (true) {
        yield count++;
    }
}

function generatorInfiniteConsumption() {
    const gen = infiniteGenerator();
    
    // Infinite consumption
    for (const value of gen) {
        console.log('Generated value:', value);
        // No break condition
    }
}

// NESTED INFINITE LOOPS
function nestedInfiniteLoops() {
    // Outer infinite, inner finite
    while (true) {
        for (let i = 0; i < 5; i++) {
            console.log('Nested loop, i:', i);
        }
        console.log('Outer loop continues');
    }
    
    // Both loops infinite
    while (true) {
        let j = 0;
        while (j < 10) {
            console.log('Both infinite, j:', j);
            // j never increments
        }
    }
}

// PROTOTYPE CHAIN INFINITE LOOPS
function prototypeChainInfiniteLoop() {
    const obj1 = {};
    const obj2 = {};
    
    // Create circular prototype chain
    Object.setPrototypeOf(obj1, obj2);
    Object.setPrototypeOf(obj2, obj1);
    
    // This will cause infinite loop when accessing properties
    try {
        console.log(obj1.someProperty);
    } catch (error) {
        console.log('Circular prototype chain detected');
    }
}

// GOOD EXAMPLES (FINITE LOOPS WITH PROPER CONDITIONS)
function goodFiniteLoops() {
    // Proper while loop
    let counter = 10;
    while (counter > 0) {
        console.log('Counter:', counter);
        counter--; // Proper decrement
    }
    
    // Proper for loop
    for (let i = 0; i < 10; i++) {
        console.log('Iteration:', i);
        // i increments properly
    }
    
    // Proper recursion with base case
    function factorial(n) {
        if (n <= 1) { // Proper base case
            return 1;
        }
        return n * factorial(n - 1); // Proper recursive call
    }
    
    // Loop with break condition
    while (true) {
        const shouldContinue = Math.random() > 0.5;
        if (!shouldContinue) {
            break; // Proper exit condition
        }
        console.log('Loop continues...');
    }
    
    // Finite async loop
    async function finiteAsyncLoop() {
        let iterations = 0;
        const maxIterations = 100;
        
        while (iterations < maxIterations) {
            await new Promise(resolve => setTimeout(resolve, 10));
            console.log('Async iteration:', iterations);
            iterations++;
        }
    }
    
    // Proper array iteration
    const items = [1, 2, 3, 4, 5];
    for (let i = 0; i < items.length; i++) {
        console.log('Item:', items[i]);
        // No modification of array during iteration
    }
    
    // Proper timer with cleanup
    const intervalId = setInterval(() => {
        console.log('Timer with cleanup');
    }, 1000);
    
    setTimeout(() => {
        clearInterval(intervalId); // Proper cleanup
    }, 10000);
    
    return factorial(5);
}
