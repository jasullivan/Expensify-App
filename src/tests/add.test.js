const add = (a, b) => a + b;
const generateGreeting = (name = 'Anonymous') => `Hello ${name}, whaa g'won?`

test('should add two numbers', () => {
    const result = add(3,4);
    expect(result).toBe(7);
})
test('should generate greeting from name', () => {
    const result = generateGreeting('Jimbo');
    expect(result).toBe('Hello Jimbo, whaa g\'won?');
})
test('should generate greeting for no name', () => {
    const result = generateGreeting();
    expect(result).toBe('Hello Anonymous, whaa g\'won?');
})