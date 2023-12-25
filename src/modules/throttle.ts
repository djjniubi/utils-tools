let timer;
let flag:boolean;
/**
 * @param {Function} func 要执行的回调函数
 * @param {Number} wait 延时的时间
 */
   function throttle(func:Function,wait:number){
    if(!flag){
        flag=true;
        timer=setTimeout(()=>{
            flag=false;
            typeof func === 'function' && func()
        },wait)
    }
}

export default throttle

