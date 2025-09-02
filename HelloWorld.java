import java.util.logging.Logger;

/**
 * A simple program that prints Hello, World!
 */
public final class HelloWorld {

    // Logger instance
    private static final Logger LOGGER = Logger.getLogger(HelloWorld.class.getName());

    // Private constructor to prevent instantiation
    private HelloWorld() {}

    /**
     * Entry point of the program.
     * @param args Command line arguments (unused)
     */
    public static void main(String[] args) {
        // Using logger instead of System.out
        LOGGER.info("Hello, World!");
    }
}
