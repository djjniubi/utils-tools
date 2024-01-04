/*
 * @Author: 前端菜鸟--邓建军
 * @Date: 2024-01-04 14:13:49
 * @FilePath: \utils-tools\src\modules\timeFormat.ts
 * @LastEditors: djj
 * @LastEditTime: 2024-01-04 15:36:54
 */
/**
 * 
 * @param {cellValue} 给定一个时间
 * @param {format} 需要返回的格式比如'yyyy-mm-dd' | 'yyyy-mm-dd hh:MM:ss' | 'yyyy/mm/dd hh:MM:ss' 默认返回'yyyy-mm-dd hh:MM:ss'格式
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
    };
    return format?formats[format]:`${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}
