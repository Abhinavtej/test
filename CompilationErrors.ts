/**
 * TypeScript Compilation Errors Test File
 * Tests various compilation failures
 */

// Type errors
let name: string = 123; // Type mismatch
let age: number = "twenty"; // Type mismatch

// Missing type annotations
let implicitAny; // Implicit any
function noReturnType() { // Missing return type
    return "hello";
}

// Undefined variables
function useUndefinedVar() {
    console.log(undefinedVariable);
}

// Property access on possibly null
function nullPropertyAccess() {
    let obj: { name: string } | null = null;
    console.log(obj.name); // Error: obj is possibly null
}

// Incorrect interface implementation
interface User {
    name: string;
    age: number;
    email: string;
}

class BadUser implements User {
    name: string = "John";
    // Missing: age and email properties
}

// Generic type errors
function genericError<T extends string>(param: T): number {
    return param; // Type 'T' is not assignable to type 'number'
}

// Array type mismatches
let numbers: number[] = ["one", "two", "three"];

// Function signature mismatches
function expectsNumber(n: number): void {
    console.log(n);
}

expectsNumber("not a number");

// Union type errors
type Status = "loading" | "success" | "error";
let currentStatus: Status = "pending"; // Not assignable

// Optional chaining errors
let user = { profile: { name: "John" } };
console.log(user.profile?.age?.toString()); // age doesn't exist

// Enum errors
enum Color {
    Red,
    Green,
    Blue
}

let color: Color = "red"; // String not assignable to enum

// Class inheritance errors
class Animal {
    name: string;
    constructor(name: string) {
        this.name = name;
    }
}

class Dog extends Animal {
    breed: string;
    // Missing constructor - should call super()
}

// Module import errors
import { nonExistentFunction } from './non-existent-module';

// Async/await type errors
async function asyncError(): Promise<string> {
    return 123; // Number not assignable to Promise<string>
}

// Decorator errors (if enabled)
function deprecated(target: any, propertyKey: string) {
    // Implementation
}

class Example {
    @deprecated
    method(): void {
        // This might cause issues depending on decorator configuration
    }
}
