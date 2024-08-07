import { bubbleSort, qSort } from './App';

describe('Bubble Sort', () => {
    test('an array should sorted in ascending way', () => {
        const input = [1, 5, 6, 3, 4, 8, 23];
        const output = [1, 3, 4, 5, 6, 8, 23];
        expect(bubbleSort(input)).toEqual(output);
    });
    test('an empty array should return an empty array', () => {
        const input: number[] = [];
        const output: number[] = [];
        expect(bubbleSort(input)).toEqual(output);
    });
    test('one-element array should return one-element array', () => {
        const input: number[] = [5];
        const output: number[] = [5];
        expect(bubbleSort(input)).toEqual(output);
    });
    test('should handle an array with negative elements', () => {
        const input: number[] = [-5, -2, -6, -4];
        const output: number[] = [-6, -5, -4, -2];
        expect(bubbleSort(input)).toEqual(output);
    });
});

describe('Quick Sort', () => {
    test('an array should sorted in ascending way', () => {
        const input = [1, 5, 6, 3, 4, 8, 23];
        const output = [1, 3, 4, 5, 6, 8, 23];
        expect(qSort(input)).toEqual(output);
    });
    test('an empty array should return an empty array', () => {
        const input: number[] = [];
        const output: number[] = [];
        expect(qSort(input)).toEqual(output);
    });
    test('one-element array should return one-element array', () => {
        const input: number[] = [5];
        const output: number[] = [5];
        expect(qSort(input)).toEqual(output);
    });
    test('should handle an array with negative elements', () => {
        const input: number[] = [-5, -2, -6, -4];
        const output: number[] = [-6, -5, -4, -2];
        expect(qSort(input)).toEqual(output);
    });
});
