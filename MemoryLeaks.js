/**
 * JavaScript Memory Leaks Test File
 * Tests various memory leak scenarios in JavaScript
 */

// GLOBAL VARIABLE MEMORY LEAKS
function globalVariableLeaks() {
    // Accidental global variables
    leakedGlobal = "This becomes a global variable";
    
    // Global collections that grow
    window.globalCache = window.globalCache || [];
    window.globalCache.push(new Array(1000).fill("data"));
    
    window.userSessions = window.userSessions || new Map();
    window.userSessions.set(Date.now(), {
        data: new Array(5000).fill("session data")
    });
}

// EVENT LISTENER MEMORY LEAKS
function eventListenerLeaks() {
    const button = document.getElementById('myButton');
    const handler = function() {
        console.log('Button clicked');
    };
    
    // Memory leak: addEventListener without removeEventListener
    button.addEventListener('click', handler);
    
    // Global event listeners
    window.addEventListener('resize', function() {
        console.log('Window resized');
    });
    
    document.addEventListener('click', function(e) {
        console.log('Document clicked', e.target);
    });
    
    // Multiple listeners on same element
    for (let i = 0; i < 100; i++) {
        button.addEventListener('click', function() {
            console.log('Handler', i);
        });
    }
}

// TIMER MEMORY LEAKS
function timerLeaks() {
    // setInterval without clearInterval
    const intervalId = setInterval(function() {
        console.log('Interval running');
        processLargeData();
    }, 1000);
    
    // setTimeout chains
    function chainedTimeouts() {
        setTimeout(function() {
            console.log('Chained timeout');
            chainedTimeouts(); // Creates infinite chain
        }, 100);
    }
    chainedTimeouts();
    
    // Timers with closure capturing large objects
    const largeObject = new Array(100000).fill("large data");
    setInterval(function() {
        // This closure keeps largeObject in memory
        console.log('Timer with large closure', largeObject.length);
    }, 5000);
}

// DOM REFERENCE MEMORY LEAKS
function domReferenceLeaks() {
    // Storing DOM references
    const cachedElements = {
        navbar: document.querySelector('.navbar'),
        sidebar: document.getElementById('sidebar'),
        menuItems: document.querySelectorAll('.menu-item')
    };
    
    // Circular references between DOM and JS objects
    const element = document.getElementById('target');
    const dataObject = {
        element: element,
        data: new Array(1000).fill("data")
    };
    element.dataObject = dataObject; // Circular reference
    
    // Detached DOM nodes
    const parent = document.getElementById('parent');
    const child = document.createElement('div');
    child.innerHTML = '<span>Large content</span>'.repeat(1000);
    parent.appendChild(child);
    
    // Remove parent but keep reference to child
    parent.remove();
    window.detachedChild = child; // Child stays in memory
}

// CLOSURE MEMORY LEAKS
function closureLeaks() {
    const largeData = new Array(1000000).fill({
        id: Math.random(),
        data: "large data string",
        timestamp: Date.now()
    });
    
    // Closure captures large data unnecessarily
    function createHandler() {
        return function(event) {
            // This closure keeps largeData alive
            console.log('Event handled', event.type, largeData.length);
        };
    }
    
    document.addEventListener('click', createHandler());
    
    // Nested closures
    function outerFunction() {
        const outerData = new Array(50000).fill("outer data");
        
        return function innerFunction() {
            const innerData = new Array(50000).fill("inner data");
            
            return function deepestFunction() {
                // Captures both outerData and innerData
                console.log(outerData.length, innerData.length);
            };
        };
    }
    
    const deepFunction = outerFunction()();
    window.deepReference = deepFunction;
}

// OBSERVER PATTERN MEMORY LEAKS
function observerLeaks() {
    const eventEmitter = {
        listeners: new Map(),
        
        on(event, callback) {
            if (!this.listeners.has(event)) {
                this.listeners.set(event, []);
            }
            this.listeners.get(event).push(callback);
        },
        
        emit(event, data) {
            const callbacks = this.listeners.get(event) || [];
            callbacks.forEach(callback => callback(data));
        }
    };
    
    // Adding listeners without removal
    for (let i = 0; i < 1000; i++) {
        eventEmitter.on('data', function(data) {
            console.log('Listener', i, data);
        });
    }
    
    // Intersection Observer not disconnected
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            console.log('Element intersecting:', entry.target);
        });
    });
    
    document.querySelectorAll('.observe-me').forEach(el => {
        observer.observe(el);
    });
    // Missing: observer.disconnect();
}

// AJAX/FETCH MEMORY LEAKS
function ajaxLeaks() {
    // XMLHttpRequest not properly cleaned up
    function makeRequest() {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', '/api/data');
        
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                const largeResponse = new Array(10000).fill(xhr.responseText);
                console.log('Response received', largeResponse.length);
            }
        };
        
        xhr.send();
        // xhr is not cleaned up
    }
    
    // Multiple fetch requests
    for (let i = 0; i < 100; i++) {
        fetch('/api/data')
            .then(response => response.json())
            .then(data => {
                // Large data processing
                const processedData = new Array(1000).fill(data);
                window.responseCache = window.responseCache || [];
                window.responseCache.push(processedData);
            });
    }
}

// CONSOLE REFERENCES
function consoleLeaks() {
    const largeObject = {
        data: new Array(100000).fill("console data"),
        nested: {
            moreData: new Array(50000).fill("nested data")
        }
    };
    
    // Console.log can keep references to large objects
    console.log('Large object:', largeObject);
    console.error('Error with large object:', largeObject);
    console.table(largeObject.data);
}

// STRING BUILDING MEMORY LEAKS
function stringBuildingLeaks() {
    // String concatenation in loops
    let result = "";
    for (let i = 0; i < 100000; i++) {
        result += `Item ${i}: ${Math.random()}\n`;
    }
    
    // Building large HTML strings
    let htmlContent = "";
    for (let i = 0; i < 10000; i++) {
        htmlContent += `<div class="item-${i}">
            <span>Item ${i}</span>
            <p>Description for item ${i}</p>
        </div>`;
    }
    
    return { result, htmlContent };
}

// WEB WORKERS MEMORY LEAKS
function webWorkerLeaks() {
    // Creating workers without termination
    for (let i = 0; i < 10; i++) {
        const worker = new Worker('worker.js');
        
        worker.postMessage({
            data: new Array(10000).fill(`worker data ${i}`)
        });
        
        worker.onmessage = function(event) {
            console.log('Worker response:', event.data);
        };
        
        // Missing: worker.terminate();
    }
}

// PROPER CLEANUP EXAMPLES
function properCleanup() {
    const timers = [];
    const listeners = [];
    const workers = [];
    
    // Timer cleanup
    const intervalId = setInterval(() => {
        console.log('Interval with cleanup');
    }, 1000);
    timers.push(intervalId);
    
    // Event listener cleanup
    const button = document.getElementById('cleanup-button');
    const clickHandler = () => console.log('Clean click');
    button.addEventListener('click', clickHandler);
    listeners.push({ element: button, event: 'click', handler: clickHandler });
    
    // Worker cleanup
    const worker = new Worker('worker.js');
    workers.push(worker);
    
    // Cleanup function
    function cleanup() {
        // Clear timers
        timers.forEach(timer => clearInterval(timer));
        timers.length = 0;
        
        // Remove listeners
        listeners.forEach(({ element, event, handler }) => {
            element.removeEventListener(event, handler);
        });
        listeners.length = 0;
        
        // Terminate workers
        workers.forEach(worker => worker.terminate());
        workers.length = 0;
        
        // Clear references
        window.cachedData = null;
        window.globalCache = null;
    }
    
    // Cleanup on page unload
    window.addEventListener('beforeunload', cleanup);
    
    return cleanup;
}

// Helper function
function processLargeData() {
    return new Array(1000).fill(Math.random());
}
