package comprehensive_scenarios.java;
/**
 * Java Advanced Linting Test File
 * Tests coding standards, performance, design patterns, and thread safety
 */

import java.util.*;
import java.util.concurrent.*;

public class AdvancedLinting {
    
    // CODING STANDARDS VIOLATIONS
    
    // Poor naming conventions
    private int x; // Single letter variable
    private String BADNAME; // All caps for non-constant
    private final String badConstant = "test"; // Constant not in caps
    
    // Long method
    public void veryLongMethodThatDoesTooManyThings() {
        System.out.println("Line 1");
        System.out.println("Line 2");
        System.out.println("Line 3");
        System.out.println("Line 4");
        System.out.println("Line 5");
        System.out.println("Line 6");
        System.out.println("Line 7");
        System.out.println("Line 8");
        System.out.println("Line 9");
        System.out.println("Line 10");
        System.out.println("Line 11");
        System.out.println("Line 12");
        System.out.println("Line 13");
        System.out.println("Line 14");
        System.out.println("Line 15");
        System.out.println("Line 16");
        System.out.println("Line 17");
        System.out.println("Line 18");
        System.out.println("Line 19");
        System.out.println("Line 20");
    }
    
    // PERFORMANCE ISSUES
    
    // String concatenation in loops
    public String badStringConcat() {
        String result = "";
        for (int i = 0; i < 1000; i++) {
            result += "item" + i;
        }
        return result;
    }
    
    // Using Vector instead of ArrayList
    public void oldCollections() {
        Vector<String> vector = new Vector<>(); // Synchronized unnecessarily
        Hashtable<String, String> hashtable = new Hashtable<>();
    }
    
    // Boxing/unboxing in loops
    public void boxingInLoop() {
        List<Integer> numbers = new ArrayList<>();
        for (int i = 0; i < 1000; i++) {
            numbers.add(i); // Auto-boxing
        }
    }
    
    // Using == for string comparison
    public boolean badStringComparison(String a, String b) {
        return a == b; // Should use .equals()
    }
    
    // DESIGN PATTERN VIOLATIONS
    
    // Singleton with public constructor
    public class BadSingleton {
        private static BadSingleton instance;
        
        public BadSingleton() { } // Should be private
        
        public static BadSingleton getInstance() {
            if (instance == null) {
                instance = new BadSingleton();
            }
            return instance;
        }
    }
    
    // Large class (God Object)
    public class GodObject {
        private String name;
        private int age;
        private String address;
        private String phone;
        private String email;
        private Date birthDate;
        private List<String> hobbies;
        private Map<String, Object> preferences;
        private List<String> friends;
        private String jobTitle;
        private double salary;
        private String department;
        // ... many more fields and methods
    }
    
    // THREAD SAFETY ISSUES
    
    // Non-synchronized access to shared data
    private int counter = 0;
    
    public void unsafeIncrement() {
        counter++; // Not thread-safe
    }
    
    // Double-checked locking without volatile
    private static AdvancedLinting instance;
    
    public static AdvancedLinting getInstance() {
        if (instance == null) {
            synchronized (AdvancedLinting.class) {
                if (instance == null) {
                    instance = new AdvancedLinting(); // instance should be volatile
                }
            }
        }
        return instance;
    }
    
    // Synchronizing on mutable object
    private List<String> list = new ArrayList<>();
    
    public void badSynchronization() {
        synchronized (list) { // Bad: synchronizing on mutable object
            list.add("item");
        }
    }
    
    // Race condition in lazy initialization
    private Map<String, String> cache;
    
    public Map<String, String> getCache() {
        if (cache == null) {
            cache = new HashMap<>(); // Race condition
        }
        return cache;
    }
    
    // GOOD EXAMPLES
    
    // Proper string building
    public String goodStringConcat() {
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < 1000; i++) {
            sb.append("item").append(i);
        }
        return sb.toString();
    }
    
    // Thread-safe singleton
    public static class ThreadSafeSingleton {
        private static volatile ThreadSafeSingleton instance;
        
        private ThreadSafeSingleton() { }
        
        public static ThreadSafeSingleton getInstance() {
            if (instance == null) {
                synchronized (ThreadSafeSingleton.class) {
                    if (instance == null) {
                        instance = new ThreadSafeSingleton();
                    }
                }
            }
            return instance;
        }
    }
    
    // Proper synchronization
    private final Object lock = new Object();
    private final AtomicInteger atomicCounter = new AtomicInteger(0);
    
    public void safeIncrement() {
        atomicCounter.incrementAndGet(); // Thread-safe
    }
    
    public void properSynchronization() {
        synchronized (lock) { // Synchronizing on immutable object
            // Critical section
        }
    }
}
