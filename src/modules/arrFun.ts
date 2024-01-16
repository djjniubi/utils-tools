/**
 * 数据分组
 * @param {Array} 数组
 * @param {Number} 数组的长度
 * @return {Array} 分组后的新数组
 */

export function splitData<T>(arr:Array<T>=[],size=1):Array<T[]>{
    const result=[];
    for (let i = 0; i < arr.length; i+=size) {
        result.push(arr.slice(i,i+=size))
    }
    return result as T[][]
}


/**
 * 数据扁平化
 * @param {Array} 数组对象
 * @param {string} 默认值是children
 * @return {Array} 扁平化后的数组
 */

 export function dataFlattening<T>(arr:Array<T>=[],text="children"):Array<T[]>{
      const result=JSON.parse(JSON.stringify(arr));
      return result.flatMap((item:any)=>[item,...(item[text]?dataFlattening(item[text]):[])])
}