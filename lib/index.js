/*
 * @Author: 前端菜鸟--邓建军
 * @Date: 2023-12-18 10:35:57
 * @FilePath: \utils-tools\src\modules\debounce.ts
 * @LastEditors: djj
 * @LastEditTime: 2023-12-18 11:32:52
 */
var timeout = null;
/**
 * @param { Function } func 要执行的回调函数
 * @param {Number} wait 延时的时间
 * @return null
 */
function debounce(func, wait) {
    if (wait === void 0) { wait = 500; }
    // 清除定时器
    if (timeout !== null)
        clearTimeout(timeout);
    // 设置定时器，当最后一次操作后，timeout不会再被清除，所以在延时wait毫秒后执行func回调方法
    timeout = setTimeout(function () {
        typeof func === "function" && func();
    }, wait);
}

var flag;
/**
 * @param {Function} func 要执行的回调函数
 * @param {Number} wait 延时的时间
 */
function throttle(func, wait) {
    if (!flag) {
        flag = true;
        setTimeout(function () {
            flag = false;
            typeof func === 'function' && func();
        }, wait);
    }
}

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol */


var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

/**
 *
 * @param {arr} 给定一个数组 数组格式[20,60,80] 或 [{ scale: 30,color: 'red'},...]
 * @param {obj}  如果是数组对象用来指定对象的值，数组对象必传 格式{text:"固定的数值比如scale",value:"需要返回的值比如color"}
 * @param {price} 根据当前值查找所在的区间，返回区间数据或者值value
 */
var intervalValue = function (arr, obj, price) {
    if (obj === void 0) { obj = {}; }
    if (price === void 0) { price = null; }
    var _a = obj, text = _a.text, value = _a.value;
    //接收排序好的数组
    var sortedArr = [];
    //接收拷贝数组
    var sortedCopy = [];
    //接收排序好的区间数组
    var matrix = [];
    //需要返回的值
    var objValue = null;
    //判断是否是数组
    if (!Array.isArray(arr)) {
        console.error("接收到的值不是一个数组");
        return arr;
    }
    //判断数组值是否是对象
    var arrType = typeof arr[0] === "object";
    if (arrType) {
        if (!text) {
            console.warn("请添加查找字段");
            return arr;
        }
        if (typeof arr[0][text] != "number") {
            console.warn("希望参数值是number类型");
            for (var i = 0; i < arr.length; i++) {
                if (isNaN(Number(arr[i][text]))) {
                    console.error("不是数值类型");
                    return arr;
                }
                arr[i][text] = Number(arr[i][text]);
            }
        }
        //对数组进行排序
        sortedArr = arr.sort(function (a, b) {
            return a[text] - b[text];
        });
        //对数组进行拷贝
        sortedCopy = __spreadArray([], sortedArr, true);
        //查看数组第一位数值是否是0，不是0给起添加上
        var previousItem = void 0;
        if (sortedCopy[0][text] != 0) {
            previousItem = __assign({}, sortedArr[0]);
            previousItem[text] = 0;
            sortedCopy.unshift(previousItem);
        }
        //将数组进行转换成二维数组
        for (var i = 0; i < sortedCopy.length - 1; i++) {
            matrix.push(sortedCopy.slice(i, i + 2));
        }
        if (!price) {
            return matrix;
        }
        for (var i = 0; i < matrix.length; i++) {
            var index = matrix.findIndex(function (item) { return item[1][text] >= price; });
            if (index !== -1) {
                //判断是否有value值
                value ? objValue = matrix[index][1][value] : objValue = matrix[index];
                break;
            }
            else {
                //判断是否有value值
                value ? objValue = matrix[matrix.length - 1][1][value] : objValue = matrix[matrix.length - 1];
                break;
            }
        }
        return objValue;
    }
    else {
        sortedArr = arr.sort(function (a, b) {
            return a - b;
        });
        sortedCopy = __spreadArray([], sortedArr, true);
        if (sortedCopy[0] != 0) {
            sortedCopy.unshift(0);
        }
        //将数组进行转换成二维数组
        for (var i = 0; i < sortedCopy.length - 1; i++) {
            matrix.push(sortedCopy.slice(i, i + 2));
        }
        if (!price) {
            return matrix;
        }
        for (var i = 0; i < matrix.length; i++) {
            var index = matrix.findIndex(function (item) { return item[1] >= price; });
            if (index !== -1) {
                objValue = matrix[index];
                break;
            }
            else {
                objValue = matrix[matrix.length - 1];
                break;
            }
        }
        return objValue;
    }
};
/**
 *
 */

/*
 * @Author: 前端菜鸟--邓建军
 * @Date: 2024-01-04 14:13:49
 * @FilePath: \utils-tools\src\modules\timeFormat.ts
 * @LastEditors: djj
 * @LastEditTime: 2024-01-05 17:00:57
 */
/**
 *
 * @param {cellValue} 给定一个时间
 * @param {format} 需要返回的格式比如'yyyy-mm-dd' | 'yyyy-mm-dd hh:MM:ss' | 'yyyy/mm/dd hh:MM:ss' |'年'|'年月日' 默认返回'yyyy-mm-dd hh:MM:ss'格式
 * @returns
 */
var timeFormat = function (cellValue, format) {
    if (format === void 0) { format = ""; }
    var date = new Date(cellValue);
    var year = date.getFullYear();
    var month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
    var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    var hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
    var minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
    var seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
    var formats = {
        "yyyy": "".concat(year),
        "mm": "".concat(month),
        "dd": "".concat(day),
        "hh": "".concat(hours),
        "MM": "".concat(minutes),
        "ss": "".concat(seconds),
        "yyyy-mm-dd": "".concat(year, "-").concat(month, "-").concat(day),
        "hh:MM:ss": "".concat(hours, ":").concat(minutes, ":").concat(seconds),
        "yyyy-mm-dd hh:MM:ss": "".concat(year, "-").concat(month, "-").concat(day, " ").concat(hours, ":").concat(minutes, ":").concat(seconds),
        "yyyy/mm/dd": "".concat(year, "/").concat(month, "/").concat(day),
        "yyyy/mm/dd hh:MM:ss": "".concat(year, "/").concat(month, "/").concat(day, " ").concat(hours, ":").concat(minutes, ":").concat(seconds),
        "年": "".concat(year, "\u5E74"),
        "年月": "".concat(year, "\u5E74").concat(month, "\u6708"),
        "年月日": "".concat(year, "\u5E74").concat(month, "\u6708").concat(day, "\u65E5"),
        "月": "".concat(month, "\u6708"),
        "月日": "".concat(month, "\u6708").concat(day, "\u65E5"),
    };
    return format ? formats[format] : "".concat(year, "-").concat(month, "-").concat(day, " ").concat(hours, ":").concat(minutes, ":").concat(seconds);
};
/**
 * @param {date} 时间格式 如果时间大于1天,返回1天前如果小于1秒返回刚刚
 */
var formatPast = function (date) {
    var counTime;
    var time = new Date().getTime();
    var afferentTime = new Date(date).getTime();
    time = Number.parseInt("".concat(time - afferentTime));
    var units = {
        '年': 31557600000,
        '月': 2629800000,
        '天': 86400000,
        '小时': 3600000,
        '分钟': 60000,
        '秒': 1000
    };
    for (var key in units) {
        if (time >= units[key]) {
            counTime = "".concat(Math.floor(time / units[key])).concat(key, "\u524D");
            break;
        }
    }
    return counTime || '刚刚';
};

/**
 * 数据分组
 * @param {Array} 数组
 * @param {Number} 数组的长度
 * @return {Array} 分组后的新数组
 */
function splitData(arr, size) {
    if (arr === void 0) { arr = []; }
    if (size === void 0) { size = 1; }
    var result = [];
    for (var i = 0; i < arr.length; i += size) {
        result.push(arr.slice(i, i += size));
    }
    return result;
}
/**
 * 数据扁平化
 * @param {Array} 数组对象
 * @param {string} 默认值是children
 * @return {Array} 扁平化后的数组
 */
function dataFlattening(arr, text) {
    if (arr === void 0) { arr = []; }
    if (text === void 0) { text = "children"; }
    var result = JSON.parse(JSON.stringify(arr));
    return result.flatMap(function (item) { return __spreadArray([item], (item[text] ? dataFlattening(item[text]) : []), true); });
}

export { dataFlattening, debounce, formatPast, intervalValue, splitData, throttle, timeFormat };
