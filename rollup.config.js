/*
 * @Author: 前端菜鸟--邓建军
 * @Date: 2023-12-15 13:49:33
 * @FilePath: \utils-tools\scripts\rollup.config.js
 * @LastEditors: djj
 * @LastEditTime: 2023-12-25 10:28:12
 */

const resolve =require("@rollup/plugin-node-resolve");
const typescript = require('@rollup/plugin-typescript');
const commonjs = require('@rollup/plugin-commonjs');
const terser = require('@rollup/plugin-terser');
const {visualizer}=require("rollup-plugin-visualizer")
console.log("resolve",resolve("./src"));
const generateConfigs=(options)=>{
    console.log("options",options);
 return [
    {   
        /**入口文件 */
        input:"./src/index.ts",
        output:[
            {  
                dir: 'lib',
                format:"cjs",
                entryFileNames: '[name].cjs.js',
                sourcemap: false,
                plugins: [terser()],
            },
            {   dir: 'lib',
                format:"esm",
                entryFileNames: '[name].esm.js',
                sourcemap: false,
                plugins: [terser()],
            }
            ,
            {   dir: 'lib',
                format:"es",
                entryFileNames: '[name].js',
                sourcemap: false,
                plugins: [terser()],
            },
            {
                dir: 'lib',
                format: 'umd',
                entryFileNames: '[name].umd.js',
                name: '$utils', // umd 模块名称，相当于一个命名空间，会自动挂载到window下面
                sourcemap: false,
                plugins: [terser()],
            }
        ],
        /**各种插件使用的配置 */
        plugins:[resolve(),commonjs(),visualizer(),typescript({ module: 'ESNext' })]
    },
    
]
};
module.exports=generateConfigs
