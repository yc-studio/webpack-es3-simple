function testPromise() {
    return new Promise((resolve) => {

        // import('./test2').then((rs) => {
        //     console.log(rs);
        // });
        // IE8  can not use import/export.
        require.ensure(['./test2'], () => {
            console.log('Async load ./test2: ', require('./test2'));
            return 'ensure..';
        }).then((rs) => {
            console.log('async load test2 ok.', rs);
            setTimeout(() => resolve('async resolve OK'), 1000);
        });
    });
}

// function testAsync() {
//     //IE 8 can not use async await.
//     return testPromise().then((text) => console.log('testAsync called: ', text));
// }



const getData = () => {
    return new Promise((resolve) => {
        setTimeout(() => resolve(3), 2000);
    });
};

const secondMethod = async() => {
    const resData = await getData();
    console.log(resData);
};
secondMethod();

export async function testAsync() {
    const result = await testPromise();
    console.log('testAsync called: ',result);

    return result;
}

// module.exports = {
//     testAsync
// };
