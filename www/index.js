import { hello_world, Universe, fib } from "wasm-example";

function jsFib(n) {
    const arr = [0n, 1n];
    function compute(n) {
        if (arr.length > n) {
            return arr[n];
        }
        let newV = compute(n - 1n) + compute(n - 2n)
        arr.push(newV);
        return newV;
    }
    return compute(n)
}

const testData = [5n, 12n, 45n, 60n, 70n, 100n, 1000n, 3000n, 8000n, 12000n];

function time(cb) {
    const start = performance.now();
    let res = cb();
    const end = performance.now();
    return [end - start, res];
}

setTimeout(() => {
    testData.forEach((n) => {
        console.log(`wasm ${n}:`, time(() => fib(n)));
        console.log(`js ${n}:`, time(() => jsFib(n)));
        console.log('-----')
    })
}, 1000)