(()=>{"use strict";var e={411:function(e,t,r){var l=r(5893),n=r(7294),a=r(745),s=r(5584),i=r(7221),o=r(2621),d=r(8409),u=r(1230),c=r(5746);let p=e=>{let{item:t,span:r=24,layoutType:a="row"}=e,s=t;if("function"==typeof s.getJSON&&(s=s.getJSON()),"object"!=typeof s||!s)return null;let{type:o,name:d,rules:u,label:p,elProps:h={},itemProps:y={},render:j,...x}=s,f={};return"row"===a&&(f={...f,span:r}),n.createElement("row"===a?c.Z:n.Fragment,f,j?j():(0,l.jsx)(i.Z.Item,{name:d,label:p,rules:u,...y,children:n.createElement(o,{...x,...h})}))};var h=r(7584);let y=e=>"[object Number]"===Object.prototype.toString.call(e),j=e=>(0,l.jsx)(l.Fragment,{children:e.map((e,t)=>{let r=e.length;if(24%r!=0)throw Error("The length of the array must be divisible by 24");let n=24/r;return(0,l.jsx)(u.Z,{children:e.map((e,t)=>(0,l.jsx)(p,{item:e,span:n,layoutType:"row"},t))},t)})}),x=e=>{let{layoutData:t,cols:r=1}=e,n=!1;if(Array.isArray(t[0])||(n=!0),n&&y(r)&&r>1&&r<=4){let e=[];do if(t.length>=r)e.push(t.slice(0,r)),t.splice(0,r);else{let l=r-t.length;for(;l--;)t.push({render:()=>null});e.push(t.slice(0,r)),t.length=0}while(t.length);return j(e)}return n?(0,l.jsx)(l.Fragment,{children:(0,l.jsx)(u.Z,{children:t.map((e,t)=>(0,l.jsx)(p,{item:e,span:24,layoutType:"row"},t))})}):(0,l.jsx)(l.Fragment,{children:j(t)})},f=e=>{let{layoutData:t,...r}=e;return(0,l.jsx)(h.Z,{align:"start",...r,children:t.map((e,t)=>(0,l.jsx)(p,{item:e,layoutType:"space"},t))})},m=()=>{let[e]=i.Z.useForm(),t=[{type:o.Z,label:"手机号",placeholder:"请输入",name:"tel",elProps:{maxLength:11},itemProps:{rules:[{required:!0,message:"请输入"},{pattern:/^1\d{10}$/,message:"手机号必须为11位数字"}]}},{type:o.Z.Password,label:"密码",placeholder:"请输入",name:"pwd",itemProps:{rules:[{required:!0,message:"请输入"}]}},{render:()=>(0,l.jsx)("div",{style:{display:"flex",justifyContent:"flex-end"},children:(0,l.jsx)(d.ZP,{type:"primary",htmlType:"submit",style:{width:120},children:"登录"})})}];return(0,l.jsx)("div",{style:{width:400,paddingTop:32},children:(0,l.jsx)(i.Z,{form:e,labelCol:{span:4},labelAlign:"left",children:(0,l.jsx)(x,{layoutData:t})})})};var g=r(8002);let b=()=>{let[e]=i.Z.useForm(),[t]=i.Z.useForm(),[r,a]=(0,n.useState)({}),s=[{type:g.ZP.Group,label:"性别",name:"gender",elProps:{options:[{label:"男",value:"男生"},{label:"女",value:"女生"}]}},{type:"div",label:"你是",elProps:{children:(null==r?void 0:r.gender)||"未选择"}}],o=[{type:g.ZP.Group,label:"性别",name:"gender",elProps:{options:[{label:"男",value:"男生"},{label:"女",value:"女生"}]}},{render:()=>(0,l.jsx)(i.Z.Item,{label:"你是",dependencies:["gender"],children:()=>t.getFieldValue("gender")||"未选择"})},{render:()=>(0,l.jsx)(i.Z.Item,{shouldUpdate:!0,label:"你是",children:()=>t.getFieldValue("gender")})}];return(0,l.jsxs)("div",{children:[(0,l.jsx)("p",{children:"1.定义onValuesChange 同步状态到state , 触发全量渲染实现表单联动"}),(0,l.jsx)(i.Z,{form:e,onValuesChange:e=>{a(t=>({...t,...e}))},children:(0,l.jsx)(x,{layoutData:s})}),(0,l.jsx)("p",{children:"2.基于Form.Item dependency/shouldUpdate 实现表单联动,局部渲染"}),(0,l.jsx)(i.Z,{form:t,children:(0,l.jsx)(x,{layoutData:o})})]})},v=()=>{let e=[],[t,r]=(0,n.useState)(4);for(let t=0;t<11;t++)e.push({type:o.Z,label:`输入框${t+1}`,name:`name${t}`,elProps:{placeholder:"请输入"}});return(0,l.jsx)("div",{style:{paddingTop:32,width:800},children:(0,l.jsxs)(i.Z,{layout:"vertical",children:[(0,l.jsx)("div",{style:{marginBottom:24},children:(0,l.jsxs)(g.ZP.Group,{onChange:e=>r(Number(e.target.value)),optionType:"button",value:t,children:[(0,l.jsx)(g.ZP,{value:1,children:"1行1列"}),(0,l.jsx)(g.ZP,{value:2,children:"1行2列"}),(0,l.jsx)(g.ZP,{value:3,children:"1行3列"}),(0,l.jsx)(g.ZP,{value:4,children:"1行4列"})]})}),(0,l.jsx)(x,{layoutData:e,cols:t})]})})},Z=()=>{let e=[],[t,r]=(0,n.useState)(8);for(let t=0;t<3;t++)e.push({name:`name${t}`,type:o.Z,label:`输入框${t+1}`,elProps:{placeholder:"请输入"}});return e.push({render:()=>(0,l.jsx)(d.ZP,{type:"primary",children:"submit"})}),(0,l.jsx)("div",{style:{paddingTop:32},children:(0,l.jsxs)(i.Z,{layout:"horizontal",children:[(0,l.jsx)("div",{style:{marginBottom:24},children:(0,l.jsxs)(g.ZP.Group,{onChange:e=>r(Number(e.target.value)),optionType:"button",value:t,children:[(0,l.jsx)(g.ZP,{value:8,children:"8px"}),(0,l.jsx)(g.ZP,{value:16,children:"16px"}),(0,l.jsx)(g.ZP,{value:24,children:"24px"}),(0,l.jsx)(g.ZP,{value:32,children:"32px"})]})}),(0,l.jsx)(f,{layoutData:e,size:t})]})})},P=()=>{let e=[[{type:o.Z,label:"姓名",name:"name",rules:[{required:!0,message:"请填写"}],elProps:{placeholder:"请填写姓名"}},{type:g.ZP.Group,label:"性别",name:"gender",rules:[{required:!0,message:"请选择"}],elProps:{options:[{label:"女",value:0},{label:"男",value:1}]}}],[{type:o.Z.TextArea,label:"个人简",elProps:{rows:6},placeholder:"请输入",name:"bio"}],[{render:()=>(0,l.jsxs)(h.Z,{style:{justifyContent:"flex-end",width:"100%"},children:[(0,l.jsx)(d.ZP,{type:"default",children:"取消"}),(0,l.jsx)(d.ZP,{type:"primary",children:"保存"})]})}]];return(0,l.jsx)("div",{style:{width:600},children:(0,l.jsx)(i.Z,{children:(0,l.jsx)(x,{layoutData:e})})})},w=()=>{let[e]=i.Z.useForm(),[t,r]=(0,n.useState)({gender:"0",tels:["15901631201","17721222222"],name:"leon"}),[a,s]=(0,n.useState)([...t.tels]),u=null==a?void 0:a.map((t,r)=>({render:()=>(0,l.jsxs)(h.Z,{align:"start",style:{width:"100%"},children:[(0,l.jsx)(i.Z.Item,{name:["tels",r],rules:[{pattern:/^1\d{10}$/,message:"请输入正确的手机号码"}],validateTrigger:"onBlur",children:(0,l.jsx)(o.Z,{maxLength:11,placeholder:"请输手机号",style:{width:350}})}),a.length>1&&(0,l.jsx)(d.ZP,{type:"link",onClick:()=>{let t=e.getFieldValue("tels");t.splice(r,1),e.setFieldsValue({tels:[...t]}),s([...t])},children:"删除"})]})})),c=[{type:o.Z,label:"姓名",name:"name",rules:[{required:!0,message:"请填写"}],elProps:{placeholder:"请填写姓名"}},{render:()=>(0,l.jsx)("div",{style:{margin:"12px 0"},children:"手机号"})},...u,{render:()=>(0,l.jsx)("div",{style:{display:"flex",justifyContent:"flex-end"},children:(0,l.jsx)(d.ZP,{type:"link",style:{padding:0},onClick:()=>{let t=[...e.getFieldValue("tels")||[""],""];e.setFieldsValue({tels:t}),s(t)},children:"+ 手机号"})})},{type:g.ZP.Group,label:"性别",name:"gender",elProps:{options:[{label:"女",value:"0"},{label:"男",value:"1"}]}},{getJSON:()=>void 0!==t.gender?{label:"性别",type:"div",children:"1"==t.gender?"男":"女"}:null},{render:()=>(0,l.jsxs)(h.Z,{style:{justifyContent:"flex-end",width:"100%"},children:[(0,l.jsx)(d.ZP,{type:"default",onClick:()=>e.resetFields(),children:"取消"}),(0,l.jsx)(d.ZP,{type:"primary",htmlType:"submit",children:"保存"})]})}];return(0,l.jsx)("div",{children:(0,l.jsx)(i.Z,{form:e,style:{width:400},layout:"vertical",initialValues:t,onFinish:e=>{console.log(e)},onValuesChange:(e,t)=>{r(t)},children:(0,l.jsx)(x,{layoutData:c})})})},{TabPane:O}=s.Z;(0,a.createRoot)(document.getElementById("root")).render((0,l.jsx)(()=>{let[e,t]=(0,n.useState)("1");return(0,l.jsx)("div",{children:(0,l.jsxs)(s.Z,{tabPosition:"left",defaultActiveKey:"1",activeKey:e,onChange:t,style:{padding:32},children:[(0,l.jsx)(O,{tab:"一行一列",children:(0,l.jsx)(m,{})},"1"),(0,l.jsx)(O,{tab:"一行N列",children:(0,l.jsx)(v,{})},"2"),(0,l.jsx)(O,{tab:"等间距排列",children:(0,l.jsx)(Z,{})},"3"),(0,l.jsx)(O,{tab:"二维数组自定义布局",children:(0,l.jsx)(P,{})},"4"),(0,l.jsx)(O,{tab:"表单联动",children:(0,l.jsx)(b,{})},"5"),(0,l.jsx)(O,{tab:"动态增删",children:(0,l.jsx)(w,{})},"6")]})})},{}))}},t={};function r(l){var n=t[l];if(void 0!==n)return n.exports;var a=t[l]={exports:{}};return e[l](a,a.exports,r),a.exports}r.m=e,r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,{a:t}),t},(()=>{var e,t=Object.getPrototypeOf?function(e){return Object.getPrototypeOf(e)}:function(e){return e.__proto__};r.t=function(l,n){if(1&n&&(l=this(l)),8&n||"object"==typeof l&&l&&(4&n&&l.__esModule||16&n&&"function"==typeof l.then))return l;var a=Object.create(null);r.r(a);var s={};e=e||[null,t({}),t([]),t(t)];for(var i=2&n&&l;"object"==typeof i&&!~e.indexOf(i);i=t(i))Object.getOwnPropertyNames(i).forEach(function(e){s[e]=function(){return l[e]}});return s.default=function(){return l},r.d(a,s),a}})(),r.d=function(e,t){for(var l in t)r.o(t,l)&&!r.o(e,l)&&Object.defineProperty(e,l,{enumerable:!0,get:t[l]})},r.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||Function("return this")()}catch(e){if("object"==typeof window)return window}}(),r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},(()=>{var e=[];r.O=function(t,l,n,a){if(l){a=a||0;for(var s=e.length;s>0&&e[s-1][2]>a;s--)e[s]=e[s-1];e[s]=[l,n,a];return}for(var i=1/0,s=0;s<e.length;s++){for(var l=e[s][0],n=e[s][1],a=e[s][2],o=!0,d=0;d<l.length;d++)(!1&a||i>=a)&&Object.keys(r.O).every(function(e){return r.O[e](l[d])})?l.splice(d--,1):(o=!1,a<i&&(i=a));if(o){e.splice(s--,1);var u=n();void 0!==u&&(t=u)}}return t}})(),r.rv=function(){return"1.2.2"},(()=>{var e={980:0};r.O.j=function(t){return 0===e[t]};var t=function(t,l){var n,a,s=l[0],i=l[1],o=l[2],d=0;if(s.some(function(t){return 0!==e[t]})){for(n in i)r.o(i,n)&&(r.m[n]=i[n]);if(o)var u=o(r)}for(t&&t(l);d<s.length;d++)a=s[d],r.o(e,a)&&e[a]&&e[a][0](),e[a]=0;return r.O(u)},l=self.webpackChunkantd_form_render=self.webpackChunkantd_form_render||[];l.forEach(t.bind(null,0)),l.push=t.bind(null,l.push.bind(l))})(),r.ruid="bundler=rspack@1.2.2";var l=r.O(void 0,["361","108"],function(){return r(411)});l=r.O(l)})();