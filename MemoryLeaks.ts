/**
 * TypeScript Memory Leaks Test File
 * Tests comprehensive memory leak scenarios
 */

class MemoryLeakScenarios {
    private timers: number[] = [];
    private subscriptions: any[] = [];
    private eventHandlers: Map<string, Function> = new Map();
    
    // EVENT LISTENER MEMORY LEAKS
    setupEventListeners() {
        const button = document.getElementById('myButton');
        const handler = () => console.log('clicked');
        
        // Memory leak: Missing removeEventListener
        button?.addEventListener('click', handler);
        window.addEventListener('resize', this.handleResize);
        document.addEventListener('keydown', this.handleKeydown);
        
        // Store handler for later removal (good practice)
        this.eventHandlers.set('buttonClick', handler);
    }
    
    // TIMER MEMORY LEAKS
    setupTimers() {
        // Memory leak: setInterval without clearInterval
        const intervalId = setInterval(() => {
            console.log('Interval running');
            this.processData();
        }, 1000);
        
        // Memory leak: setTimeout without clearTimeout
        const timeoutId = setTimeout(() => {
            console.log('Timeout executed');
        }, 5000);
        
        // Store timer IDs for cleanup (good practice)
        this.timers.push(intervalId, timeoutId);
    }
    
    // OBSERVABLE/SUBSCRIPTION MEMORY LEAKS
    setupObservables() {
        // Memory leak: subscription without unsubscribe
        const subscription1 = this.dataStream.subscribe(data => {
            console.log('Data received:', data);
        });
        
        const subscription2 = this.userEvents.subscribe({
            next: event => this.handleUserEvent(event),
            error: err => console.error(err)
        });
        
        // Store subscriptions for cleanup
        this.subscriptions.push(subscription1, subscription2);
    }
    
    // WEBSOCKET MEMORY LEAKS
    setupWebSocket() {
        // Memory leak: WebSocket without close
        const ws = new WebSocket('ws://localhost:8080');
        
        ws.onopen = () => console.log('Connected');
        ws.onmessage = (event) => {
            console.log('Message:', event.data);
        };
        ws.onerror = (error) => console.error('WebSocket error:', error);
        ws.onclose = () => console.log('Disconnected');
        
        // Should store ws reference for cleanup
        return ws;
    }
    
    // DOM REFERENCE MEMORY LEAKS
    cacheDOMElements() {
        // Memory leak: Storing DOM references
        const navbar = document.querySelector('.navbar');
        const sidebar = document.getElementById('sidebar');
        const menuItems = document.querySelectorAll('.menu-item');
        
        // Storing in object properties prevents GC
        this.domCache = {
            navbar,
            sidebar,
            menuItems: Array.from(menuItems)
        };
    }
    
    // CLOSURE MEMORY LEAKS
    createClosureLeak() {
        const largeData = new Array(1000000).fill('large string data');
        const moreData = {
            users: new Array(50000).fill({ name: 'User', data: 'lots of data' }),
            settings: new Array(10000).fill('configuration')
        };
        
        // Memory leak: Closure captures large objects
        return function processInput(input: string) {
            // This closure keeps largeData and moreData in memory
            return input + largeData.length + moreData.users.length;
        };
    }
    
    // GLOBAL VARIABLE MEMORY LEAKS
    createGlobalLeaks() {
        // Memory leak: Growing global collections
        (window as any).globalCache = (window as any).globalCache || [];
        (window as any).globalCache.push(new Array(1000).fill('data'));
        
        (window as any).userSessions = (window as any).userSessions || new Map();
        (window as any).userSessions.set(Date.now(), { 
            data: new Array(5000).fill('session data') 
        });
    }
    
    // STRING CONCATENATION MEMORY LEAKS
    inefficientStringBuilding() {
        let result = "";
        const items = new Array(10000).fill('item');
        
        // Memory leak: String concatenation in loop
        for (let i = 0; i < items.length; i++) {
            result += `Item ${i}: ${items[i]}\n`;
        }
        
        return result;
    }
    
    // PROMISE/ASYNC MEMORY LEAKS
    setupAsyncLeaks() {
        // Memory leak: Promise chains without proper cleanup
        this.fetchData()
            .then(data => this.processData(data))
            .then(result => this.updateUI(result))
            .catch(error => console.error(error));
        
        // Memory leak: Async generators not properly closed
        const asyncGen = this.createAsyncGenerator();
        asyncGen.next(); // Started but never completed
    }
    
    // INTERSECTION OBSERVER MEMORY LEAKS
    setupIntersectionObserver() {
        const targets = document.querySelectorAll('.observe-me');
        
        // Memory leak: Observer not disconnected
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    console.log('Element visible:', entry.target);
                }
            });
        });
        
        targets.forEach(target => observer.observe(target));
        // Missing: observer.disconnect();
    }
    
    // PROPER CLEANUP EXAMPLE
    cleanup() {
        // Clear all timers
        this.timers.forEach(timerId => {
            clearInterval(timerId);
            clearTimeout(timerId);
        });
        this.timers = [];
        
        // Unsubscribe from all observables
        this.subscriptions.forEach(sub => {
            if (sub && typeof sub.unsubscribe === 'function') {
                sub.unsubscribe();
            }
        });
        this.subscriptions = [];
        
        // Remove all event listeners
        this.eventHandlers.forEach((handler, key) => {
            if (key === 'buttonClick') {
                const button = document.getElementById('myButton');
                button?.removeEventListener('click', handler as EventListener);
            }
        });
        
        window.removeEventListener('resize', this.handleResize);
        document.removeEventListener('keydown', this.handleKeydown);
        
        // Clear DOM references
        this.domCache = null;
        this.eventHandlers.clear();
    }
    
    // Helper methods and properties
    private domCache: any = null;
    private dataStream: any = { subscribe: (cb: Function) => ({ unsubscribe: () => {} }) };
    private userEvents: any = { subscribe: (cb: any) => ({ unsubscribe: () => {} }) };
    
    private handleResize = () => console.log('Window resized');
    private handleKeydown = (e: KeyboardEvent) => console.log('Key:', e.key);
    private handleUserEvent = (event: any) => console.log('User event:', event);
    private processData = (data?: any) => console.log('Processing:', data);
    private updateUI = (result: any) => console.log('UI updated:', result);
    private fetchData = () => Promise.resolve('data');
    
    private async* createAsyncGenerator() {
        while (true) {
            yield await new Promise(resolve => setTimeout(() => resolve(Math.random()), 100));
        }
    }
}
