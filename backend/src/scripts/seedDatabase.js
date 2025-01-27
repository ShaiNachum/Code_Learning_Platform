import mongoose from 'mongoose';
import { CodeBlock } from '../models/CodeBlock.js';
import dotenv from 'dotenv';

dotenv.config();

const codeBlocks = [
    {
        title: "Async/Await Example",
        initialCode: `async function fetchData() {
    // TODO: Implement fetch data from API
    // Should use try/catch
    // Should return the data
}`,
        solution: `async function fetchData() {
    try {
        const response = await fetch('https://api.example.com/data');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}`
    },
    {
        title: "Array Methods",
        initialCode: `const numbers = [1, 2, 3, 4, 5];
            // TODO: Use map to double each number
            // TODO: Use filter to get even numbers
            // TODO: Use reduce to get the sum`,
        solution: `const numbers = [1, 2, 3, 4, 5];
            const doubled = numbers.map(num => num * 2);
            const evens = numbers.filter(num => num % 2 === 0);
            const sum = numbers.reduce((acc, curr) => acc + curr, 0);`
    },
    {
        title: "Promise Chain",
        initialCode: `function processData(data) {
    // TODO: Create a promise chain that:
    // 1. Validates the data
    // 2. Transforms the data
    // 3. Saves the data
}`,
        solution: `function processData(data) {
    return Promise.resolve(data)
        .then(validateData)
        .then(transformData)
        .then(saveData)
        .catch(handleError);
}`
    },
    {
        title: "Class Implementation",
        initialCode: `class Calculator {
    // TODO: Implement a calculator class with:
    // - Constructor
    // - Add method
    // - Subtract method
    // - Multiply method
    // - Divide method
}`,
        solution: `class Calculator {
    constructor() {
        this.value = 0;
    }
    
    add(num) {
        this.value += num;
        return this;
    }
    
    subtract(num) {
        this.value -= num;
        return this;
    }
    
    multiply(num) {
        this.value *= num;
        return this;
    }
    
    divide(num) {
        if (num === 0) throw new Error('Cannot divide by zero');
        this.value /= num;
        return this;
    }
}`
    }
];

async function seedDatabase() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        
        // Clear existing code blocks
        await CodeBlock.deleteMany({});
        
        // Insert new code blocks
        await CodeBlock.insertMany(codeBlocks);
        
        console.log('Database seeded successfully');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}

seedDatabase();