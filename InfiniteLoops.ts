/**
 * TypeScript Infinite Loops Test File
 * Tests various infinite loop scenarios
 */

class InfiniteLoopScenarios {
    
    // BASIC INFINITE LOOPS
    basicInfiniteWhile() {
        // Infinite while loop
        while (true) {
            console.log('This runs forever');
        }
    }
    
    infiniteForLoop() {
        // Infinite for loop
        for (;;) {
            console.log('Forever loop');
        }
    }
    
    // CONDITION-BASED INFINITE LOOPS
    conditionNeverChanges() {
        let counter = 5;
        while (counter > 0) {
            console.log('Counter is:', counter);
            // counter never decreases - infinite loop
        }
    }
    
    alwaysTrueCondition() {
        let isRunning = true;
        while (isRunning) {
            console.log('Always running');
            // isRunning never set to false
        }
    }
    
    // LOOP VARIABLE MANIPULATION
    counterReset() {
        for (let i = 0; i < 10; i++) {
            console.log('Iteration:', i);
            if (i === 5) {
                i = 0; // Reset counter causes infinite loop
            }
        }
    }
    
    wrongIncrement() {
        let i = 0;
        while (i < 10) {
            console.log('Value:', i);
            i--; // Decreasing instead of increasing
        }
    }
    
    // ASYNC INFINITE LOOPS
    async asyncInfiniteLoop() {
        while (true) {
            await new Promise(resolve => setTimeout(resolve, 1000));
            console.log('Async infinite loop');
        }
    }
    
    infiniteAsyncRecursion() {
        return this.infiniteAsyncRecursion();
    }
    
    // RECURSIVE INFINITE LOOPS
    infiniteRecursion(depth: number = 0): void {
        console.log('Recursion depth:', depth);
        this.infiniteRecursion(depth + 1); // No base case
    }
    
    mutualRecursionA(): void {
        console.log('Function A');
        this.mutualRecursionB();
    }
    
    mutualRecursionB(): void {
        console.log('Function B');
        this.mutualRecursionA();
    }
    
    // NESTED INFINITE LOOPS
    nestedInfiniteLoops() {
        while (true) {
            for (let i = 0; i < 5; i++) {
                while (true) {
                    console.log('Nested infinite');
                    break; // This breaks inner loop but outer while(true) continues
                }
            }
        }
    }
    
    // EVENT-DRIVEN INFINITE LOOPS
    eventDrivenInfiniteLoop() {
        const processEvents = () => {
            while (true) {
                // Process events infinitely
                console.log('Processing events...');
            }
        };
        
        setTimeout(processEvents, 0);
    }
    
    // GENERATOR INFINITE LOOPS
    *infiniteGenerator() {
        while (true) {
            yield Math.random();
        }
    }
    
    // PROMISE INFINITE LOOPS
    promiseInfiniteLoop(): Promise<never> {
        return new Promise((resolve) => {
            const loop = () => {
                console.log('Promise loop');
                setTimeout(loop, 0); // Infinite setTimeout chain
            };
            loop();
        });
    }
    
    // ARRAY/OBJECT ITERATION INFINITE LOOPS
    arrayModificationLoop() {
        const items = [1, 2, 3];
        for (let i = 0; i < items.length; i++) {
            console.log('Item:', items[i]);
            items.push(i + 10); // Array keeps growing
        }
    }
    
    forInInfiniteLoop() {
        const obj: any = { a: 1, b: 2 };
        for (const key in obj) {
            console.log('Key:', key);
            obj[`key_${Date.now()}`] = Math.random(); // Object keeps growing
        }
    }
    
    // OBSERVER PATTERN INFINITE LOOPS
    observerInfiniteLoop() {
        const observable = {
            value: 0,
            observers: [] as Function[],
            
            subscribe(callback: Function) {
                this.observers.push(callback);
            },
            
            setValue(newValue: number) {
                this.value = newValue;
                this.observers.forEach(observer => observer(newValue));
            }
        };
        
        // This creates infinite loop when observers modify the value
        observable.subscribe((value: number) => {
            console.log('Value changed:', value);
            observable.setValue(value + 1); // Infinite updates
        });
        
        observable.setValue(1);
    }
    
    // GOOD EXAMPLES (FINITE LOOPS)
    finiteWhileLoop() {
        let counter = 10;
        while (counter > 0) {
            console.log('Counter:', counter);
            counter--; // Proper decrement
        }
    }
    
    finiteForLoop() {
        for (let i = 0; i < 10; i++) {
            console.log('Iteration:', i);
            // i increments properly
        }
    }
    
    finiteRecursion(n: number): number {
        if (n <= 1) { // Proper base case
            return 1;
        }
        return n * this.finiteRecursion(n - 1);
    }
    
    loopWithBreak() {
        while (true) {
            const shouldContinue = Math.random() > 0.5;
            if (!shouldContinue) {
                break; // Proper exit condition
            }
            console.log('Loop continues...');
        }
    }
    
    finiteAsyncLoop() {
        let iterations = 0;
        const maxIterations = 100;
        
        const loop = async () => {
            while (iterations < maxIterations) {
                await new Promise(resolve => setTimeout(resolve, 10));
                console.log('Async iteration:', iterations);
                iterations++;
            }
        };
        
        return loop();
    }
}
