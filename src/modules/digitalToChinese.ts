/*
 * @Author: 前端菜鸟--邓建军
 * @Date: 2024-01-17 15:07:09
 * @FilePath: \utils-tools\src\modules\digitalToChinese.ts
 * @LastEditors: djj
 * @LastEditTime: 2024-01-18 10:17:32
 */
/** 数字转中文
 * @param {Number} 数值
 */

export function digitalToChinese(num:number):string{
    const units = ['', '十', '百', '千'];
    const bigUnits=['', '万', '亿']
    const chars = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
    let str = num.toString();
    const hasDecimal=str.includes(".");
    let prefix:any =hasDecimal?str.split(".")[0]:str;
    function _handleZero(s:string){
        return s.replace(/零+/g,'零').replace(/零$/,"")
    };
    function _stringToArr(s:string){
        return s.replace(/(?=(\d{4})+$)/g,",").split(",").filter(Boolean);
    }
    function _transForm(n:any){
        let result="";
        for(let i =0;i<n.length;i++){
            const c=chars[n[i]];
            let u=units[n.length-i-1];
            if(c==="零"){
                u=""
            }
            result+=c+u
        }
        return _handleZero(result)
    };
    let result=""
    prefix=_stringToArr(prefix);
    for(let i =0;i<prefix.length;i++){
        const c=_transForm(prefix[i])
          let u=bigUnits[prefix.length-i-1];
          if(c===''){
             result+="零";
             continue
          }
          result+=c+u
     }
     if(hasDecimal){
        result=`${_handleZero(result)}点${_transForm(str.substring(str.indexOf(".")+1).toString())}`
        return result
    }
    return _handleZero(result)
    }

export function toBigChine(num:number){
    const cnum=digitalToChinese(num);
    const map:any={
        零:"零",
        一:"壹",
        二:"贰",
        三:"叁",
        四:"肆",
        五:"伍",
        六:"陆",
        七:"柒",
        八:"捌",
        九:"玖",
        十:"拾",
        百:"佰",
        千:"仟",
        万:"万",
        亿:"亿",
        点:"点"
    }
    return cnum.split("").map((c)=>map[c]).join("")
}