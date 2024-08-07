//  TODO: посмотреть что с eslint, я отключила его
//  TypeError: this.libOptions.parse is not a function -  ошибка

//  generate array of numbers different length

const generateArr = (maxLength: number): number[] => {
    const length = Math.floor(Math.random() * maxLength) + 1;

    return Array.from({ length }, (_, i) => Math.floor(Math.random() * 100));
};

//Bubble Sort

export const bubbleSort = (arr: number[]): number[] => {
    for (let i = 0; i < arr.length - 1; i++) {
        for (let j = 0; j < arr.length - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                const temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }

    return arr;
};

const measureBubbleSort = (arr: number[]): number[] => {
    console.time('Bubble Sort');
    const bubbleSorted = bubbleSort(arr);
    console.timeEnd('Bubble Sort');

    return bubbleSorted;
};

//  QSort

const insertionSort = (arr: number[]): number[] => {
    const copy = arr.slice();
    for (let i = 1; i < copy.length; i++) {
        const key = copy[i];
        let j = i - 1;
        while (j >= 0 && copy[j] > key) {
            copy[j + 1] = copy[j];
            j = j - 1;
        }
        copy[j + 1] = key;
    }
    return copy;
};

export const qSort = (arr: number[]): number[] => {
    if (arr.length < 2) return arr;

    if (arr.length < 10) {
        return insertionSort(arr);
    }

    let pivotIndex = Math.floor(Math.random() * arr.length);
    let pivot = arr[pivotIndex];
    const left: number[] = [];
    const right: number[] = [];

    for (let i = 0; i < arr.length; i++) {
        if (i !== pivotIndex) {
            if (arr[i] < pivot) {
                left.push(arr[i]);
            } else {
                right.push(arr[i]);
            }
        }
    }

    return qSort(left).concat(pivot, qSort(right));
};

const measureQuickSort = (arr: number[]): number[] => {
    console.time('Quick Sort');
    const quickSorted = qSort(arr);
    console.timeEnd('Quick Sort');

    return quickSorted;
};

for (let maxLength = 10; maxLength <= 10000; maxLength *= 10) {
    const testArray = generateArr(maxLength);
    console.log(`Array of length ${maxLength}`, testArray);

    console.time(`Bubble Sort ${maxLength}`);
    measureBubbleSort(testArray);
    console.timeEnd(`Bubble Sort ${maxLength}`);

    console.time(`Quick Sort ${maxLength}`);
    measureQuickSort(testArray);
    console.timeEnd(`Quick Sort ${maxLength}`);}

function App() {
    return <div>Hello world</div>;
}

export default App;
