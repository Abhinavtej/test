package comprehensive_scenarios.java;
/**
 * Java Compilation Errors Test File
 * Tests various compilation failures
 */

// Missing import
import java.util.List;

public class CompilationErrors {
    
    // Syntax error: missing semicolon
    private String name = "test"
    
    // Type mismatch
    private int number = "not a number";
    
    // Undefined variable
    public void testUndefinedVariable() {
        System.out.println(undefinedVar);
    }
    
    // Missing return statement
    public int missingReturn() {
        int x = 5;
        // Missing return
    }
    
    // Unreachable code
    public void unreachableCode() {
        return;
        System.out.println("This is unreachable");
    }
    
    // Missing closing brace
    public void missingBrace() {
        if (true) {
            System.out.println("test");
        // Missing closing brace
    
    // Wrong method signature override
    @Override
    public String toString(int param) {
        return "Invalid override";
    }
    
    // Generic type error
    public void genericError() {
        List<String> strings = new ArrayList<Integer>();
    }
    
    // Array out of bounds (runtime, but detectable)
    public void arrayError() {
        int[] arr = new int[5];
        arr[10] = 100;
    }
}
