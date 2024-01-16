/*
 * @Author: 前端菜鸟--邓建军
 * @Date: 2023-12-18 10:49:31
 * @FilePath: \utils-tools\src\modules\throttle.ts
 * @LastEditors: djj
 * @LastEditTime: 2024-01-16 15:26:21
 */
let timer;
let flag:boolean;
/**
 * @param {Function} func 要执行的回调函数
 * @param {Number} wait 延时的时间
 */
   function throttle(func:Function,wait:number=800){
    if(!flag){
        flag=true;
        timer=setTimeout(()=>{
            flag=false;
            typeof func === 'function' && func()
        },wait)
    }
}

export default throttle

