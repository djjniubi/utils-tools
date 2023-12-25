/*
 * @Author: 前端菜鸟--邓建军
 * @Date: 2023-12-18 10:35:57
 * @FilePath: \utils-tools\src\modules\debounce.ts
 * @LastEditors: djj
 * @LastEditTime: 2023-12-18 11:32:52
 */
let timeout:any=null;
/**
 * @param { Function } func 要执行的回调函数
 * @param {Number} wait 延时的时间
 * @return null
 */

function debounce(func:Function,wait:number=500){
 // 清除定时器
 if (timeout !== null) clearTimeout(timeout);
 // 设置定时器，当最后一次操作后，timeout不会再被清除，所以在延时wait毫秒后执行func回调方法
 timeout=setTimeout(()=>{
    typeof func==="function"&&func();

 },wait)
}

export default debounce