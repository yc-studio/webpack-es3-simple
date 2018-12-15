!function (e, t) {
    if ("object" == typeof exports && "object" == typeof module) module.exports = t(require("jQuery")); else if ("function" == typeof define && define.amd) define(["jQuery"], t); else {
        var o = "object" == typeof exports ? t(require("jQuery")) : t(e.jQuery);
        for (var n in o) ("object" == typeof exports ? exports : e)[n] = o[n]
    }
}(window, function (e) {
    return function (e) {
        var t = {};

        function o(n) {
            if (t[n]) return t[n].exports;
            var r = t[n] = {i: n, l: !1, exports: {}};
            return e[n].call(r.exports, r, r.exports, o), r.l = !0, r.exports
        }

        return o.m = e, o.c = t, o.d = function (e, t, n) {
            o.o(e, t) || Object.defineProperty(e, t, {enumerable: !0, get: n})
        }, o.r = function (e) {
            "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {value: "Module"}), Object.defineProperty(e, "__esModule", {value: !0})
        }, o.t = function (e, t) {
            if (1 & t && (e = o(e)), 8 & t) return e;
            if (4 & t && "object" == typeof e && e && e.__esModule) return e;
            var n = Object.create(null);
            if (o.r(n), Object.defineProperty(n, "default", {
                enumerable: !0,
                value: e
            }), 2 & t && "string" != typeof e) for (var r in e) o.d(n, r, function (t) {
                return e[t]
            }.bind(null, r));
            return n
        }, o.n = function (e) {
            var t = e && e.__esModule ? function () {
                return e["default"]
            } : function () {
                return e
            };
            return o.d(t, "a", t), t
        }, o.o = function (e, t) {
            return Object.prototype.hasOwnProperty.call(e, t)
        }, o.p = "", o(o.s = 1)
    }([function (e, t, o) {
        "use strict";
        console.log("test.js"), t.a = {test: 1}
    }, function (e, t, o) {
        "use strict";
        o.r(t), function (e) {
            var n = o(0);
            o(3);
            console.log("test", n.a);
            var r = {"default": 123, "catch": 456, "delete": 123};

            function u(e, t) {
                try {
                    throw console.log(123, {"default": 123}), new Error(e)
                } catch (o) {
                    t(o)
                }
            }

            u(1, function () {
                console.log(r)
            }), console.log(e), e("body").append("<span> ES3 OK </span>"), t["default"] = {xx: u, a: r}
        }.call(this, o(2))
    }, function (t, o) {
        t.exports = e
    }, function (e, t, o) {
    }])
});