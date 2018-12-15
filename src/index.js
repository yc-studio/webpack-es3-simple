import {default as test, Test} from './test';
import './assets/index.scss';

console.log("test", test, Test);
//
const test2 = {
    default: 123, //IE 8 default 关键字测试
    catch: 456,   //IE 8 catch 关键字测试
    delete: 123,  //IE 8 delete 关键字测试,"," 结尾测试
};

function testPromise() {
    return new Promise((resolve) => {
        setTimeout(() => resolve('async OK'), 1000);
    });
}

async function testAsync() {
    const result = await testPromise();
    console.log(result);

    return result;
}

function xx(param1, param2, ...param3) {

    let dd = 123;
    let ee = {
        default: 123,
    };
    try {
        console.log(dd, ee, param3);
        throw new Error(param1);
    } catch (UglifyExceptionTest) {  //Uglify压缩时,对IE8 支持测试
        param2(UglifyExceptionTest);
    }
}

xx(1, () => {
    console.log(test2);
}, 1, 2, 3);

const asyncResult = testAsync();
console.log(asyncResult);

// $(() => $('body').append('<span> ES3 OK </span>'));

export default {
    xx,
    test2
};
