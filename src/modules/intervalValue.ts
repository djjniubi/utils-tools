/**
 * 
 * @param {arr} 给定一个数组 数组格式[20,60,80] 或 [{ scale: 30,color: 'red'},...] 
 * @param {obj}  如果是数组对象用来指定对象的值，数组对象必传 格式{text:"固定的数值比如scale",value:"需要返回的值比如color"}
 * @param {price} 根据当前值查找所在的区间，返回区间数据或者值value
 */
export const intervalValue=(arr:[any],obj:object={},price:number|null=null)=>{
    const {text,value}=obj as {text:string,value:string};
    //接收排序好的数组
    let sortedArr=[];
    //接收拷贝数组
    let sortedCopy = [];
    //接收排序好的区间数组
    let matrix = [];
     //需要返回的值
     let objValue=null;
    //判断是否是数组
    if(!Array.isArray(arr)){
        console.error("接收到的值不是一个数组");
        return arr
    };
    //判断数组值是否是对象
    let arrType = typeof arr[0] === "object";
    if(arrType){
        if(!text){
            console.warn("请添加查找字段");
            return arr
        }
        if (typeof arr[0][text] != "number"){
            console.warn("希望参数值是number类型");
            for (let i = 0; i < arr.length; i++) {
                if (isNaN(Number(arr[i][text]))) {
                    console.error("不是数值类型");
                    return arr
                }
                arr[i][text] = Number(arr[i][text])
            }
        };
        //对数组进行排序
        sortedArr = arr.sort((a, b) => {
            return a[text] - b[text]
        });
        //对数组进行拷贝
        sortedCopy = [...sortedArr];
        //查看数组第一位数值是否是0，不是0给起添加上
        let previousItem:any
        if(sortedCopy[0][text]!=0){
            previousItem = { ...sortedArr[0] };
            previousItem[text] = 0 ;
            sortedCopy.unshift(previousItem);
        };
        //将数组进行转换成二维数组
        for (let i = 0; i < sortedCopy.length - 1; i++) {
            matrix.push(sortedCopy.slice(i, i + 2))
        };
       
        if(!price&&price!=0){
            return matrix  
        }
        for(let i=0;i<matrix.length;i++){
            let index=matrix.findIndex((item)=>item[1][text]>=price);
            if (index !== -1) {
                 //判断是否有value值
                value?objValue = matrix[index][1][value]:objValue = matrix[index]
                break;
            } else {
                 //判断是否有value值
                value?objValue = matrix[matrix.length - 1][1][value]:objValue = matrix[matrix.length - 1]
                break;
            }
       }
       return objValue
    }else{
        sortedArr = arr.sort((a, b) => {
            return a - b
        });
        sortedCopy = [...sortedArr];
       if( sortedCopy[0]!=0) {
            sortedCopy.unshift(0);
       }
         //将数组进行转换成二维数组
         for (let i = 0; i < sortedCopy.length - 1; i++) {
            matrix.push(sortedCopy.slice(i, i + 2))
        };
        if(!price){
            return matrix  
        }
        for(let i=0;i<matrix.length;i++){
            let index=matrix.findIndex((item)=>item[1]>=price);
            if (index !== -1) {
                objValue = matrix[index]
                break;
            } else {
                 objValue = matrix[matrix.length - 1]
                break;
            }
       }
       return objValue
    }
};

/**
 * 
 */