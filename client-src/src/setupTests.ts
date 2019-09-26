// this adds jest-dom's custom assertions
import '@testing-library/jest-dom/extend-expect'
// This adds custom mocks
import './__mocks__';

const originalError = console.error;
beforeAll(() => {
    console.error = (...args: any[]) => {
        if (/Warning.*not wrapped in act/.test(args[0])) {
            return
        }
        originalError.call(console, ...args)
    }
});

afterAll(() => {
    console.error = originalError
});
