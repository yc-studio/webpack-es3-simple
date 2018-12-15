function testParams(...params) {
    console.log('test params: ', params);
}

function testParseArgs({param1, param2}) {
    console.log('test parse params: ', param1, param2);
}

class Test {
    constructor(param1) {
        console.log('Test class init: ', param1);
    }

    test() {
        console.log('test call test()');
    }
}

const TEST_NAME = 'test2';
const TestConst = {
    test: 1,
    [TEST_NAME]: 2
};

testParams(1, 2, 3);
testParseArgs({param1: 111, param2: 222});

const obj = new Test('param1');
obj.test();


module.exports = {
    Test,
    TestConst
};
// setTimeout(async () => {
//     import('./test2').then((rs) => {
//         console.log('async import result:', rs);
//     });
// }, 2000);
//

