/*
 * @Author: 前端菜鸟--邓建军
 * @Date: 2023-12-21 09:40:14
 * @FilePath: \utils-tools\src\_text_\index.test.ts
 * @LastEditors: djj
 * @LastEditTime: 2024-01-04 15:12:48
 */
import {intervalValue,timeFormat} from "../index";
describe("intervalValue",()=>{
   const data:any=[{code:30,color:"red"},{code:60,color:"black"},{code:80,color:"green"}];
   const arr:any=[30,80,60];
   it("1-1",()=>{
      const result =intervalValue(arr);
      expect(result).toStrictEqual([[0,30],[30,60],[60,80]]);
   });
   it("1-2",()=>{
      const result =intervalValue(arr,{},25);
      expect(result).toEqual([0,30]);
   });
   it("2-1",()=>{
      const result =intervalValue(data,{text:"code",value:"color"},25);
      expect(result).toBe('red');
    });
    it("2-2",()=>{
      const result =intervalValue(data,{text:"code",value:"color"});
      expect(result).toEqual([[{code:0,color:"red"},{code:30,color:"red"}],[{code:30,color:"red"},{code:60,color:"black"}],[{code:60,color:"black"},{code:80,color:"green"}]]);
    });
    
    it("3-1",()=>{
      const result =intervalValue(data,{});
      expect(result).toEqual(data)
    });
    it("3-2",()=>{
      const data2:any=[{code:"30",color:"red"},{code:60,color:"black"},{code:80,color:"green"}]
      const result =intervalValue(data2,{text:"code",value:"color"},25);
      expect(result).toBe('red');
    });
    it("3-3",()=>{
      const data2:any={code:30,color:"red"}
      const result =intervalValue(data2,{text:"code",value:"color"},25);
      expect(result).toBe(data2);
    })
})

describe("timeFormat",()=>{
  const date="2024-1-04 15:01:00";
  it("测试时间格式1",()=>{
    const data=timeFormat(date,"yyyy-mm-dd");
    expect(data).toBe("2024-01-04")
  });
  it("测试时间格式2",()=>{
    const data=timeFormat(date);
    expect(data).toBe("2024-01-04 15:01:00")
  });
  it("测试时间格式3",()=>{
    const data=timeFormat(date,"yyyy/mm/dd hh:MM:ss");
    expect(data).toBe("2024/01/04 15:01:00")
  })
})