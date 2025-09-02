package comprehensive_scenarios.java;
/**
 * Java Memory Leaks Test File
 * Tests various types of memory leaks
 */

import java.util.*;
import java.io.*;
import java.sql.*;

public class MemoryLeaks {
    
    // Static collections that grow indefinitely
    private static List<String> staticList = new ArrayList<>();
    private static Map<String, Object> staticCache = new HashMap<>();
    
    // Unclosed resources
    public void unClosedFileStream() throws IOException {
        FileInputStream fis = new FileInputStream("test.txt");
        // Missing: fis.close();
    }
    
    public void unClosedConnection() throws SQLException {
        Connection conn = DriverManager.getConnection("jdbc:mysql://localhost/test");
        // Missing: conn.close();
    }
    
    // Event listeners not removed
    private List<ActionListener> listeners = new ArrayList<>();
    
    public void addListenerWithoutRemoval(JButton button) {
        ActionListener listener = e -> System.out.println("Clicked");
        button.addActionListener(listener);
        listeners.add(listener);
        // Missing: button.removeActionListener(listener);
    }
    
    // Inner class holding reference to outer class
    public class InnerClassLeak {
        private String data;
        
        public void processData() {
            // This inner class holds implicit reference to outer MemoryLeaks instance
            Timer timer = new Timer(1000, e -> {
                // This anonymous class also holds reference
                System.out.println("Timer: " + data);
            });
            timer.start();
            // Missing: timer.stop();
        }
    }
    
    // ThreadLocal not cleaned up
    private static ThreadLocal<String> threadLocal = new ThreadLocal<>();
    
    public void threadLocalLeak() {
        threadLocal.set("Some value");
        // Missing: threadLocal.remove();
    }
    
    // Large objects in collections
    public void collectionLeak() {
        List<byte[]> largeObjects = new ArrayList<>();
        for (int i = 0; i < 1000; i++) {
            largeObjects.add(new byte[1024 * 1024]); // 1MB each
        }
        // Never cleared
    }
    
    // Static reference to application objects
    private static MemoryLeaks instance;
    
    public static void setInstance(MemoryLeaks obj) {
        instance = obj; // Static reference prevents GC
    }
    
    // String concatenation in loops
    public String inefficientStringConcat() {
        String result = "";
        for (int i = 0; i < 10000; i++) {
            result += "Item " + i; // Creates new String objects
        }
        return result;
    }
    
    // Proper cleanup example
    public void properCleanup() throws SQLException, IOException {
        Connection conn = null;
        FileInputStream fis = null;
        try {
            conn = DriverManager.getConnection("jdbc:mysql://localhost/test");
            fis = new FileInputStream("test.txt");
            // Use resources
        } finally {
            if (conn != null) conn.close();
            if (fis != null) fis.close();
        }
    }
}
