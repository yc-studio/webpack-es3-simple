import Test, {TestConst as test} from './test-es6';
// const {Test, TestConst} = require('./test-es6'); // IE8 无法使用 import/export
// const test = TestConst;
import './assets/index.scss';

import {testAsync} from './test-async';
import TEST_ASYNC from './test2';

console.log("test: ", test, Test, TEST_ASYNC);

const testIE8Keywords = {
    default: 123, //IE 8 default 关键字测试
    catch: 456,   //IE 8 catch 关键字测试
    delete: 123,  //IE 8 delete 关键字测试,"," 结尾测试
};

function xx(param1, param2) {
    let ee = {
        param1,
        param2,
    };
    try {
        console.log('try ', ee);
        throw new Error(param1);
    } catch (UglifyExceptionTest) {  //Uglify压缩时,对IE8 支持测试
        console.log('Throw error: ', UglifyExceptionTest);
    }
}

xx(111, 222);

console.log('IE8 obj Keywords: ', testIE8Keywords);

testAsync();

$(() => $('body').append('<span> ES3 OK </span>'));
