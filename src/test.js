const test2 = 123;

function xx() {
    console.log('xx');
}

console.log('test.js', test2, xx);

export class Test {
    constructor() {
        console.log('Test init');
    }

    test() {
        console.log('test call test()');
    }
}

setTimeout(async () => {
    import('./test2').then((rs) => {
        console.log('async import result:', rs);
    });
}, 2000);

export default {
    test: 1
};

