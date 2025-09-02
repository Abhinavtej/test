package comprehensive_scenarios.java;
/**
 * Java Infinite Loops Test File
 * Tests various types of infinite loops
 */

public class InfiniteLoops {
    
    // Basic infinite while loop
    public void basicInfiniteWhile() {
        while (true) {
            System.out.println("Infinite loop");
        }
    }
    
    // Infinite for loop
    public void infiniteForLoop() {
        for (;;) {
            System.out.println("Forever");
        }
    }
    
    // Condition never changes
    public void conditionNeverChanges() {
        int x = 5;
        while (x > 0) {
            System.out.println("x is still: " + x);
            // x never decreases
        }
    }
    
    // Do-while infinite
    public void doWhileInfinite() {
        do {
            System.out.println("Do while infinite");
        } while (true);
    }
    
    // Nested infinite loops
    public void nestedInfiniteLoops() {
        while (true) {
            for (int i = 0; i < 10; i++) {
                while (true) {
                    System.out.println("Nested infinite");
                }
            }
        }
    }
    
    // Infinite recursion
    public void infiniteRecursion() {
        infiniteRecursion();
    }
    
    // Subtle infinite loop - counter reset
    public void subtleInfiniteLoop() {
        for (int i = 0; i < 10; i++) {
            System.out.println(i);
            i = 0; // Reset counter, causes infinite loop
        }
    }
    
    // Loop with break (not infinite - good example)
    public void loopWithBreak() {
        while (true) {
            System.out.println("This will break");
            break;
        }
    }
    
    // Loop with condition that eventually becomes false (good example)
    public void finiteLoop() {
        int counter = 10;
        while (counter > 0) {
            System.out.println("Counter: " + counter);
            counter--;
        }
    }
}
