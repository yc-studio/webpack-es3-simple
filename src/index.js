var test = require('./test');
require('./assets/index.css');

console.log("test", test);

var a = {
    default: 123, //IE 8 default 关键字测试
    delete: 123, //IE 8 delete 关键字测试,"," 结尾测试
};

/**
 * Test
 * @param param1
 * @param param2
 */
function xx(param1, param2) {

    var dd = 123;
    var ee = {
        default: 123
    };
    try {
        console.log(dd, ee);
        throw new Error(param1);
    } catch (UglifyExceptionTest) {  //Uglify压缩时,对IE8 支持测试
        param2(UglifyExceptionTest);
    }
}

xx(1,  function () {
});
module.exports = {
    xx: xx,
    a: a
}