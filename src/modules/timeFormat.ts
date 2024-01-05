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
export const timeFormat=(cellValue:any,format:string="")=>{
    const date=new Date(cellValue);
    const year=date.getFullYear();
    const month =date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
    const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate() 
    const hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours() 
    const minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes() 
    const seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
    const formats:any={
        "yyyy":`${year}`,
        "mm": `${month}`,
        "dd":`${day}`,
        "hh":`${hours}`,
        "MM":`${minutes}`,
        "ss":`${seconds}`,
        "yyyy-mm-dd":`${year}-${month}-${day}`,
        "hh:MM:ss":`${hours}:${minutes}:${seconds}`,
        "yyyy-mm-dd hh:MM:ss":`${year}-${month}-${day} ${hours}:${minutes}:${seconds}`,
        "yyyy/mm/dd":`${year}/${month}/${day}`,
        "yyyy/mm/dd hh:MM:ss":`${year}/${month}/${day} ${hours}:${minutes}:${seconds}`,
        "年":`${year}年`,
        "年月":`${year}年${month}月`,
        "年月日":`${year}年${month}月${day}日`,
        "月":`${month}月`,
        "月日":`${month}月${day}日`,
    };
    return format?formats[format]:`${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}

/**
 * @param {date} 时间格式 如果时间大于1天,返回1天前如果小于1秒返回刚刚
 */

 export const formatPast =(date:Date)=>{
    let counTime;
    let time=new Date().getTime();
    let afferentTime=new Date(date).getTime();
    time =Number.parseInt(`${time-afferentTime}`);
    const units:any={
        '年': 31557600000,
		'月': 2629800000,
		'天': 86400000,
		'小时': 3600000,
		'分钟': 60000,
		'秒': 1000
    };
    for (const key in units) {
        if (time>=units[key]) {
               counTime=`${Math.floor(time/units[key])}${key}前`
            break;
        }

    };
    return counTime|| '刚刚'
 }