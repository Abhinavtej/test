"""
Python Memory and Performance Issues Test File
Tests memory leaks, performance anti-patterns, and resource management issues
"""

import threading
import time
import gc
import weakref
from collections import defaultdict

# MEMORY LEAKS AND REFERENCE CYCLES

class MemoryLeakExamples:
    
    def __init__(self):
        self.data = []
        self.references = {}
    
    # Circular references
    def create_circular_references(self):
        """Creates circular references that prevent garbage collection"""
        class Node:
            def __init__(self, value):
                self.value = value
                self.children = []
                self.parent = None
            
            def add_child(self, child):
                child.parent = self  # Creates circular reference
                self.children.append(child)
        
        # Create circular reference structure
        root = Node("root")
        child1 = Node("child1")
        child2 = Node("child2")
        
        root.add_child(child1)
        root.add_child(child2)
        child1.add_child(root)  # Circular reference
        
        return root  # Even if this goes out of scope, circular refs prevent GC
    
    # Global collections that grow indefinitely
    _global_cache = []
    _global_registry = {}
    
    @classmethod
    def add_to_global_cache(cls, data):
        """Adds data to global cache without cleanup"""
        large_data = [data] * 10000  # Multiply data
        cls._global_cache.append(large_data)
        cls._global_registry[id(data)] = large_data
        # No cleanup mechanism
    
    # Closure memory leaks
    def create_closure_leak(self):
        """Creates closures that capture large objects unnecessarily"""
        large_data = list(range(1000000))  # Large object
        small_data = "small"
        
        def inner_function():
            # This closure captures large_data even though it only uses small_data
            return small_data.upper()
        
        return inner_function  # large_data stays in memory
    
    # Event listener accumulation
    def accumulate_event_listeners(self):
        """Simulates accumulating event listeners without removal"""
        listeners = []
        
        for i in range(1000):
            def listener(event_data=i):  # Closure captures i
                large_processing_data = list(range(10000))
                return f"Processed {event_data} with {len(large_processing_data)} items"
            
            listeners.append(listener)
        
        # Listeners accumulate in memory
        self.data.extend(listeners)
    
    # Thread-related memory leaks
    def create_thread_leak(self):
        """Creates threads that don't get properly cleaned up"""
        def worker():
            large_thread_data = list(range(100000))
            while True:  # Infinite loop keeps thread alive
                time.sleep(1)
                len(large_thread_data)  # Keep reference alive
        
        # Start thread but never join or clean up
        thread = threading.Thread(target=worker)
        thread.daemon = False  # Thread prevents program exit
        thread.start()
        
        return thread

# RESOURCE LEAKS

class ResourceLeakExamples:
    
    def file_handle_leaks(self):
        """File handles not properly closed"""
        files = []
        
        # Opening files without closing
        for i in range(100):
            try:
                f = open(f"temp_file_{i}.txt", "w")
                f.write("data" * 1000)
                files.append(f)
                # Missing: f.close()
            except:
                pass
        
        return files
    
    def database_connection_leaks(self):
        """Simulates database connections not being closed"""
        connections = []
        
        for i in range(50):
            # Simulate connection creation
            connection = {
                'id': i,
                'data': list(range(10000)),
                'status': 'open'
            }
            connections.append(connection)
            # Missing: connection.close()
        
        return connections
    
    def network_socket_leaks(self):
        """Simulates network sockets not being closed"""
        import socket
        
        sockets = []
        for i in range(20):
            try:
                sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
                sockets.append(sock)
                # Missing: sock.close()
            except:
                pass
        
        return sockets

# PERFORMANCE ANTI-PATTERNS

class PerformanceAntiPatterns:
    
    def string_concatenation_in_loop(self, n=10000):
        """Inefficient string concatenation"""
        result = ""
        for i in range(n):
            result += f"Item {i} with data\n"  # Creates new string each time
        return result
    
    def list_concatenation_in_loop(self, n=10000):
        """Inefficient list building"""
        result = []
        for i in range(n):
            result = result + [i]  # Creates new list each time
        return result
    
    def inefficient_membership_testing(self, n=10000):
        """Using list for membership testing instead of set"""
        items = list(range(n))
        found_items = []
        
        for i in range(n // 2):
            if i in items:  # O(n) operation on list
                found_items.append(i)
        
        return found_items
    
    def nested_loop_inefficiency(self, n=1000):
        """Unnecessary nested loops"""
        matrix = [[i + j for j in range(n)] for i in range(n)]
        
        # Inefficient: O(n^4) complexity
        result = []
        for i in range(n):
            for j in range(n):
                for k in range(n):
                    for l in range(n):
                        if matrix[i][j] == matrix[k][l]:
                            result.append((i, j, k, l))
        
        return len(result)
    
    def repeated_expensive_operations(self, items):
        """Repeating expensive operations unnecessarily"""
        results = []
        
        for item in items:
            # Expensive operation repeated in loop
            expensive_result = sum(range(10000))
            processed_item = item * expensive_result
            
            # More expensive operations
            sorted_item = sorted(str(processed_item))
            final_result = ''.join(sorted_item)
            results.append(final_result)
        
        return results

# GENERATOR AND ITERATOR ISSUES

class IteratorIssues:
    
    def generator_memory_leak(self):
        """Generator that holds onto large objects"""
        def large_data_generator():
            large_storage = list(range(1000000))  # Large object held for generator lifetime
            
            for i in range(1000):
                # Generator keeps large_storage in memory for entire iteration
                yield large_storage[i % len(large_storage)]
        
        return large_data_generator()
    
    def infinite_generator_consumption(self):
        """Infinite generator without proper termination"""
        def infinite_gen():
            counter = 0
            large_data = list(range(100000))
            while True:
                yield large_data[counter % len(large_data)]
                counter += 1
        
        # Consuming without break condition
        gen = infinite_gen()
        results = []
        for i, value in enumerate(gen):
            results.append(value)
            if i >= 1000000:  # Will run for a very long time
                break
        
        return results

# CACHING ISSUES

class CachingIssues:
    
    _cache = {}  # Class-level cache that never gets cleared
    
    def unbounded_cache(self, key, expensive_operation):
        """Cache that grows indefinitely"""
        if key not in self._cache:
            result = expensive_operation()
            large_result_data = [result] * 10000  # Amplify memory usage
            self._cache[key] = large_result_data
        
        return self._cache[key]
    
    def weak_reference_misuse(self):
        """Incorrect use of weak references"""
        objects = []
        weak_refs = []
        
        for i in range(1000):
            obj = {'data': list(range(1000)), 'id': i}
            objects.append(obj)
            
            # Weak reference without keeping strong reference
            weak_ref = weakref.ref(obj)
            weak_refs.append(weak_ref)
        
        # Objects might be garbage collected unexpectedly
        return weak_refs

# PROPER RESOURCE MANAGEMENT EXAMPLES

class ProperResourceManagement:
    
    def proper_file_handling(self):
        """Proper file resource management"""
        data = []
        
        # Using context manager for automatic cleanup
        for i in range(100):
            try:
                with open(f"temp_file_{i}.txt", "w") as f:
                    f.write("data" * 1000)
                    data.append(f"File {i} written")
            except IOError as e:
                print(f"Error with file {i}: {e}")
        
        return data
    
    def proper_string_building(self, n=10000):
        """Efficient string building"""
        parts = []
        for i in range(n):
            parts.append(f"Item {i} with data\n")
        
        return ''.join(parts)  # Efficient string concatenation
    
    def proper_caching_with_limits(self):
        """Cache with size limits and cleanup"""
        from functools import lru_cache
        
        @lru_cache(maxsize=128)  # Limited cache size
        def expensive_operation(key):
            return sum(range(key * 1000))
        
        return expensive_operation
    
    def proper_circular_reference_handling(self):
        """Using weak references to break circular references"""
        import weakref
        
        class Node:
            def __init__(self, value):
                self.value = value
                self.children = []
                self._parent = None
            
            @property
            def parent(self):
                return self._parent() if self._parent else None
            
            @parent.setter
            def parent(self, value):
                self._parent = weakref.ref(value) if value else None
            
            def add_child(self, child):
                child.parent = self  # Uses weak reference
                self.children.append(child)
        
        return Node
    
    def manual_garbage_collection(self):
        """Manual garbage collection for cleanup"""
        # Create some objects with potential cycles
        objects = self.create_circular_references()
        
        # Force garbage collection
        gc.collect()
        
        # Clear references
        objects = None
        
        # Force another collection
        collected = gc.collect()
        
        return f"Collected {collected} objects"
    
    def create_circular_references(self):
        """Helper method that creates circular references"""
        obj1 = {'name': 'obj1'}
        obj2 = {'name': 'obj2'}
        
        obj1['ref'] = obj2
        obj2['ref'] = obj1
        
        return [obj1, obj2]

# MONITORING AND PROFILING HELPERS

class MemoryMonitoring:
    
    def measure_memory_usage(self, func, *args, **kwargs):
        """Measure memory usage of a function"""
        import tracemalloc
        
        tracemalloc.start()
        
        # Execute function
        result = func(*args, **kwargs)
        
        # Get memory usage
        current, peak = tracemalloc.get_traced_memory()
        tracemalloc.stop()
        
        return {
            'result': result,
            'current_memory': current,
            'peak_memory': peak
        }
    
    def profile_function_performance(self, func, *args, **kwargs):
        """Profile function performance"""
        import cProfile
        import pstats
        import io
        
        profiler = cProfile.Profile()
        profiler.enable()
        
        result = func(*args, **kwargs)
        
        profiler.disable()
        
        # Get stats
        stats_buffer = io.StringIO()
        stats = pstats.Stats(profiler, stream=stats_buffer)
        stats.sort_stats('cumulative')
        stats.print_stats(10)
        
        return {
            'result': result,
            'profile_stats': stats_buffer.getvalue()
        }

# Example usage and testing
if __name__ == "__main__":
    # Create instances for testing
    memory_leaks = MemoryLeakExamples()
    resource_leaks = ResourceLeakExamples()
    performance_issues = PerformanceAntiPatterns()
    proper_management = ProperResourceManagement()
    
    print("Testing memory leak detection...")
    
    # These would cause memory issues in a real application
    # memory_leaks.create_circular_references()
    # memory_leaks.accumulate_event_listeners()
    # performance_issues.string_concatenation_in_loop()
    
    print("Memory leak test patterns created.")
