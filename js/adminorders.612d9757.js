(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["adminorders"],{"129f":function(t,e){t.exports=Object.is||function(t,e){return t===e?0!==t||1/t===1/e:t!=t&&e!=e}},"14c3":function(t,e,r){var n=r("c6b6"),i=r("9263");t.exports=function(t,e){var r=t.exec;if("function"===typeof r){var a=r.call(t,e);if("object"!==typeof a)throw TypeError("RegExp exec method returned something other than an Object or null");return a}if("RegExp"!==n(t))throw TypeError("RegExp#exec called on incompatible receiver");return i.call(t,e)}},"25f0":function(t,e,r){"use strict";var n=r("6eeb"),i=r("825a"),a=r("d039"),s=r("ad6d"),o="toString",l=RegExp.prototype,c=l[o],d=a((function(){return"/a/b"!=c.call({source:"a",flags:"b"})})),u=c.name!=o;(d||u)&&n(RegExp.prototype,o,(function(){var t=i(this),e=String(t.source),r=t.flags,n=String(void 0===r&&t instanceof RegExp&&!("flags"in l)?s.call(t):r);return"/"+e+"/"+n}),{unsafe:!0})},"3ca3":function(t,e,r){"use strict";var n=r("6547").charAt,i=r("69f3"),a=r("7dd0"),s="String Iterator",o=i.set,l=i.getterFor(s);a(String,"String",(function(t){o(this,{type:s,string:String(t),index:0})}),(function(){var t,e=l(this),r=e.string,i=e.index;return i>=r.length?{value:void 0,done:!0}:(t=n(r,i),e.index+=t.length,{value:t,done:!1})}))},"4df4":function(t,e,r){"use strict";var n=r("0366"),i=r("7b0b"),a=r("9bdd"),s=r("e95a"),o=r("50c4"),l=r("8418"),c=r("35a1");t.exports=function(t){var e,r,d,u,f,p,h=i(t),v="function"==typeof this?this:Array,m=arguments.length,b=m>1?arguments[1]:void 0,g=void 0!==b,y=c(h),x=0;if(g&&(b=n(b,m>2?arguments[2]:void 0,2)),void 0==y||v==Array&&s(y))for(e=o(h.length),r=new v(e);e>x;x++)p=g?b(h[x],x):h[x],l(r,x,p);else for(u=y.call(h),f=u.next,r=new v;!(d=f.call(u)).done;x++)p=g?a(u,b,[d.value,x],!0):d.value,l(r,x,p);return r.length=x,r}},6547:function(t,e,r){var n=r("a691"),i=r("1d80"),a=function(t){return function(e,r){var a,s,o=String(i(e)),l=n(r),c=o.length;return l<0||l>=c?t?"":void 0:(a=o.charCodeAt(l),a<55296||a>56319||l+1===c||(s=o.charCodeAt(l+1))<56320||s>57343?t?o.charAt(l):a:t?o.slice(l,l+2):s-56320+(a-55296<<10)+65536)}};t.exports={codeAt:a(!1),charAt:a(!0)}},"841c":function(t,e,r){"use strict";var n=r("d784"),i=r("825a"),a=r("1d80"),s=r("129f"),o=r("14c3");n("search",1,(function(t,e,r){return[function(e){var r=a(this),n=void 0==e?void 0:e[t];return void 0!==n?n.call(e,r):new RegExp(e)[t](String(r))},function(t){var n=r(e,t,this);if(n.done)return n.value;var a=i(t),l=String(this),c=a.lastIndex;s(c,0)||(a.lastIndex=0);var d=o(a,l);return s(a.lastIndex,c)||(a.lastIndex=c),null===d?-1:d.index}]}))},9263:function(t,e,r){"use strict";var n=r("ad6d"),i=r("9f7f"),a=RegExp.prototype.exec,s=String.prototype.replace,o=a,l=function(){var t=/a/,e=/b*/g;return a.call(t,"a"),a.call(e,"a"),0!==t.lastIndex||0!==e.lastIndex}(),c=i.UNSUPPORTED_Y||i.BROKEN_CARET,d=void 0!==/()??/.exec("")[1],u=l||d||c;u&&(o=function(t){var e,r,i,o,u=this,f=c&&u.sticky,p=n.call(u),h=u.source,v=0,m=t;return f&&(p=p.replace("y",""),-1===p.indexOf("g")&&(p+="g"),m=String(t).slice(u.lastIndex),u.lastIndex>0&&(!u.multiline||u.multiline&&"\n"!==t[u.lastIndex-1])&&(h="(?: "+h+")",m=" "+m,v++),r=new RegExp("^(?:"+h+")",p)),d&&(r=new RegExp("^"+h+"$(?!\\s)",p)),l&&(e=u.lastIndex),i=a.call(f?r:u,m),f?i?(i.input=i.input.slice(v),i[0]=i[0].slice(v),i.index=u.lastIndex,u.lastIndex+=i[0].length):u.lastIndex=0:l&&i&&(u.lastIndex=u.global?i.index+i[0].length:e),d&&i&&i.length>1&&s.call(i[0],r,(function(){for(o=1;o<arguments.length-2;o++)void 0===arguments[o]&&(i[o]=void 0)})),i}),t.exports=o},"9bdd":function(t,e,r){var n=r("825a"),i=r("2a62");t.exports=function(t,e,r,a){try{return a?e(n(r)[0],r[1]):e(r)}catch(s){throw i(t),s}}},"9f7f":function(t,e,r){"use strict";var n=r("d039");function i(t,e){return RegExp(t,e)}e.UNSUPPORTED_Y=n((function(){var t=i("a","y");return t.lastIndex=2,null!=t.exec("abcd")})),e.BROKEN_CARET=n((function(){var t=i("^r","gy");return t.lastIndex=2,null!=t.exec("str")}))},a630:function(t,e,r){var n=r("23e7"),i=r("4df4"),a=r("1c7e"),s=!a((function(t){Array.from(t)}));n({target:"Array",stat:!0,forced:s},{from:i})},ac1f:function(t,e,r){"use strict";var n=r("23e7"),i=r("9263");n({target:"RegExp",proto:!0,forced:/./.exec!==i},{exec:i})},ad6d:function(t,e,r){"use strict";var n=r("825a");t.exports=function(){var t=n(this),e="";return t.global&&(e+="g"),t.ignoreCase&&(e+="i"),t.multiline&&(e+="m"),t.dotAll&&(e+="s"),t.unicode&&(e+="u"),t.sticky&&(e+="y"),e}},b85c:function(t,e,r){"use strict";r.d(e,"a",(function(){return a}));r("a4d3"),r("e01a"),r("d28b"),r("d3b7"),r("3ca3"),r("ddb0"),r("a630"),r("fb6a"),r("b0c0"),r("25f0");function n(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r];return n}function i(t,e){if(t){if("string"===typeof t)return n(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?n(t,e):void 0}}function a(t,e){var r;if("undefined"===typeof Symbol||null==t[Symbol.iterator]){if(Array.isArray(t)||(r=i(t))||e&&t&&"number"===typeof t.length){r&&(t=r);var n=0,a=function(){};return{s:a,n:function(){return n>=t.length?{done:!0}:{done:!1,value:t[n++]}},e:function(t){throw t},f:a}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var s,o=!0,l=!1;return{s:function(){r=t[Symbol.iterator]()},n:function(){var t=r.next();return o=t.done,t},e:function(t){l=!0,s=t},f:function(){try{o||null==r["return"]||r["return"]()}finally{if(l)throw s}}}}},be4e:function(t,e,r){"use strict";r.r(e);var n=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"min-vh-100 text-white",attrs:{id:"adminorders"}},[r("b-container",[r("b-row",[r("b-col",{attrs:{cols:"12"}},[r("h1",{staticClass:"my-3 mb-2 text-center"},[t._v("訂單管理")]),r("b-col",{staticClass:"ml-auto d-flex text-white",attrs:{cols:"12",lg:"3"}},[r("font-awesome-icon",{staticClass:"h4 mt-2 mr-3",attrs:{icon:["fas","search"]}}),r("b-form-input",{staticClass:"mb-3",staticStyle:{right:"0"},attrs:{type:"text",placeholder:"Type to search"},model:{value:t.keyword,callback:function(e){t.keyword=e},expression:"keyword"}})],1),r("b-table",{staticClass:"mx-auto text-white text-center",attrs:{items:t.orderlists,fields:t.fields},scopedSlots:t._u([{key:"cell(detail)",fn:function(e){return[r("b-button",{attrs:{variant:"info"},on:{click:e.toggleDetails}},[t._v("完整訊息")])]}},{key:"cell(amount)",fn:function(e){return[r("p",[t._v(" "+t._s(e.item.orders.length))])]}},{key:"row-details",fn:function(e){return[r("div",{staticClass:"bg-white"},[r("b-table",{staticClass:"bg-white",attrs:{stacked:"md",items:e.item.orders,fields:t.orders},scopedSlots:t._u([{key:"cell(detail)",fn:function(e){return[r("b-button",{directives:[{name:"b-modal",rawName:"v-b-modal.orderdetail",modifiers:{orderdetail:!0}}],attrs:{variant:"info"},on:{click:function(r){return t.showOrderdetail(e.item)}}},[t._v("查看訂單明細")])]}},{key:"cell(ispaid)",fn:function(n){return[r("b-button",{on:{click:function(r){return t.handlepaid(e,n.index)}}},[n.item.ispaid?r("p",{staticClass:"text-success"},[t._v("已付款 "+t._s(n.ispaid))]):r("p",{staticClass:"text-danger"},[t._v("未付款")])])]}},{key:"cell(shipment)",fn:function(n){return["未出貨"===n.item.shipment?r("b-button",{on:{click:function(r){return t.handleship(e,n.index)}}},[r("p",{staticClass:"text-danger"},[t._v(t._s(n.item.shipment))])]):"已出貨"===n.item.shipment?r("b-button",{on:{click:function(r){return t.notship(e,n.index)}}},[r("p",{staticClass:"text-info"},[t._v(t._s(n.item.shipment))])]):r("p",{staticClass:"text-success"},[t._v(t._s(n.item.shipment))])]}}],null,!0)}),r("hr"),r("b-container",{staticClass:"d-flex flex-row-reverse"},[r("b-button",{staticClass:"bg-danger mb-2",on:{click:e.toggleDetails}},[t._v("關閉")])],1)],1)]}}])}),r("p",{staticClass:"text-center"},[t._v("第 "+t._s(t.currentPage)+" 頁 共 "+t._s(t.orderlists.length)+" 筆結果")]),r("b-pagination",{staticClass:"pt-3",attrs:{"total-rows":t.orderlists.length,"per-page":t.perPage,"aria-controls":"itemList",align:"center"},model:{value:t.currentPage,callback:function(e){t.currentPage=e},expression:"currentPage"}})],1),r("b-modal",{attrs:{id:"orderdetail",title:"訂單明細 : ",size:"xl","hide-footer":""}},[r("b-container",[r("b-row",[r("b-col",{attrs:{cols:"12"}},[r("b-row",[r("b-col",{attrs:{cols:"12"}},[r("p",{staticClass:"my-1"},[t._v(" 購買日期 : "+t._s(t.orderdetail.date))]),r("p",{staticClass:"my-1"},[t._v("訂單編號: "+t._s(t.orderdetail._id))])]),r("b-col",{staticClass:"text-left",attrs:{cols:"12"}},[r("p",{staticClass:"my-1"},[t._v(" 收件人 : "+t._s(t.orderdetail.name))]),r("p",{staticClass:"my-1"},[t._v("電話 : "+t._s(t.orderdetail.phone))])])],1),r("p",{staticClass:"my-1"},[t._v(" 運送地址 : "+t._s(t.orderdetail.where))]),r("p",{staticClass:"my-1"},[t._v(" 付款方式 : "+t._s(t.orderdetail.howtopay)),r("span",{staticClass:"ml-3"},[t._v("付款狀態 :")]),t.orderdetail.ispaid?r("span",{staticClass:"text-success"},[t._v("已付款")]):r("span",{staticClass:"text-danger"},[t._v("未付款")])]),r("p",[t._v("運送方式 : "+t._s(t.orderdetail.method)),r("span",{staticClass:"ml-3"},[t._v(" 出貨狀態 :")]),"未出貨"==t.orderdetail.shipment?r("span",{staticClass:"text-danger"},[t._v("未出貨")]):"已出貨"==t.orderdetail.shipment?r("span",{staticClass:"text-info"},[t._v("已出貨")]):r("span",{staticClass:"text-success"},[t._v("已收貨")])]),r("b-table",{staticClass:"mt-3",attrs:{stacked:"md",items:t.orderdetail.products,fields:t.detailProducts},scopedSlots:t._u([{key:"cell(name)",fn:function(e){return[r("p",[t._v(t._s(e.item.p_id.name))])]}},{key:"cell(price)",fn:function(e){return[e.item.p_id.onsale?r("p",{staticClass:"text-danger"},[t._v(" "+t._s(e.item.p_id.countPrice))]):r("p",[t._v(" "+t._s(e.item.p_id.price))])]}},{key:"cell(smalltotal)",fn:function(e){return[e.item.p_id.onsale?r("p",[t._v(" "+t._s(e.item.amount*e.item.p_id.countPrice))]):r("p",[t._v(" "+t._s(e.item.amount*e.item.p_id.price))])]}},{key:"cell(image)",fn:function(t){return[r("img",{staticStyle:{height:"5rem"},attrs:{src:t.item.p_id.src}})]}}])}),r("hr"),r("div",{staticClass:"text-left"},[r("p",[t._v("備註 : "+t._s(t.orderdetail.note))])]),r("div",{staticClass:"text-right"},[r("p",{staticClass:"my-1"},[t._v("商品數量 : "+t._s(t.orderlength))]),r("p",{staticClass:"my-1"},[t._v("小計 : "+t._s(t.orderdetail.total-t.orderdetail.shipping))]),r("p",[t._v("運費 : "+t._s(t.orderdetail.shipping))]),r("hr"),r("h4",[t._v("合計 : "+t._s(t.orderdetail.total))])])],1)],1)],1)],1)],1)],1)],1)},i=[],a=(r("4de4"),r("d81d"),r("b0c0"),r("ac1f"),r("841c"),r("b85c")),s={name:"AdminOrders",data:function(){return{perPage:8,currentPage:1,images:null,keyword:"",user:"",orderdetail:"",orderlength:"",fields:[{key:"lastbuydate",label:"最後購買日期",sortable:!0},{key:"account",label:"帳號",sortable:!0},{key:"detail",label:"訂單"},{key:"amount",label:"訂單數量"}],orders:[{key:"name",label:"買家"},{key:"date",label:"購買日期",sortable:!0},{key:"phone",label:"電話"},{key:"total",label:"總價",sortable:!0},{key:"detail",label:"訂單明細"},{key:"ispaid",label:"付款狀態"},{key:"shipment",label:"出貨狀態"}],detailProducts:[{key:"name",label:"名稱"},{key:"image",label:"圖片"},{key:"amount",label:"數量"},{key:"price",label:"價格"},{key:"smalltotal",label:"小計"}]}},computed:{orderlists:function(){var t=this,e="";return""===this.keyword?(e=this.$store.state.orderlists,e):(e=this.$store.state.orderlists.filter((function(e){return-1!==e.name.search(t.keyword)})),e)}},methods:{handlepaid:function(t,e){var r=t.item._id,n=t.index;this.orderlists[n].orders[e].ispaid=!this.orderlists[n].orders[e].ispaid,this.axios.patch("https://buyfig-bowen.herokuapp.com/users/edit/"+r,{orders:this.orderlists[n].orders}).then((function(t){}))},handleship:function(t,e){var r=t.item._id,n=t.index;this.orderlists[n].orders[e].shipment="已出貨",this.axios.patch("https://buyfig-bowen.herokuapp.com/users/edit/"+r,{orders:this.orderlists[n].orders}).then((function(t){}))},notship:function(t,e){var r=t.item._id,n=t.index;this.orderlists[n].orders[e].shipment="未出貨",this.axios.patch("https://buyfig-bowen.herokuapp.com/users/edit/"+r,{orders:this.orderlists[n].orders}).then((function(t){}))},showOrderdetail:function(t){this.orderdetail=t,this.orderlength=t.products.length}},mounted:function(){var t=this;this.axios.get("https://buyfig-bowen.herokuapp.com/users/").then((function(e){var r,n=e.data.result,i=n.filter((function(t){return 0!==t.orders.length})),s=Object(a["a"])(i);try{for(s.s();!(r=s.n()).done;){var o,l=r.value,c=Object(a["a"])(l.orders);try{for(c.s();!(o=c.n()).done;){var d=o.value;t.images=d.products.map((function(t){t.p_id.src="https://buyfig-bowen.herokuapp.com/products/"+t.p_id.images[0].file}))}}catch(u){c.e(u)}finally{c.f()}}}catch(u){s.e(u)}finally{s.f()}t.$store.commit("orderlists",i)}))}},o=s,l=r("2877"),c=Object(l["a"])(o,n,i,!1,null,null,null);e["default"]=c.exports},d28b:function(t,e,r){var n=r("746f");n("iterator")},d784:function(t,e,r){"use strict";r("ac1f");var n=r("6eeb"),i=r("d039"),a=r("b622"),s=r("9263"),o=r("9112"),l=a("species"),c=!i((function(){var t=/./;return t.exec=function(){var t=[];return t.groups={a:"7"},t},"7"!=="".replace(t,"$<a>")})),d=function(){return"$0"==="a".replace(/./,"$0")}(),u=a("replace"),f=function(){return!!/./[u]&&""===/./[u]("a","$0")}(),p=!i((function(){var t=/(?:)/,e=t.exec;t.exec=function(){return e.apply(this,arguments)};var r="ab".split(t);return 2!==r.length||"a"!==r[0]||"b"!==r[1]}));t.exports=function(t,e,r,u){var h=a(t),v=!i((function(){var e={};return e[h]=function(){return 7},7!=""[t](e)})),m=v&&!i((function(){var e=!1,r=/a/;return"split"===t&&(r={},r.constructor={},r.constructor[l]=function(){return r},r.flags="",r[h]=/./[h]),r.exec=function(){return e=!0,null},r[h](""),!e}));if(!v||!m||"replace"===t&&(!c||!d||f)||"split"===t&&!p){var b=/./[h],g=r(h,""[t],(function(t,e,r,n,i){return e.exec===s?v&&!i?{done:!0,value:b.call(e,r,n)}:{done:!0,value:t.call(r,e,n)}:{done:!1}}),{REPLACE_KEEPS_$0:d,REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE:f}),y=g[0],x=g[1];n(String.prototype,t,y),n(RegExp.prototype,h,2==e?function(t,e){return x.call(t,this,e)}:function(t){return x.call(t,this)})}u&&o(RegExp.prototype[h],"sham",!0)}},ddb0:function(t,e,r){var n=r("da84"),i=r("fdbc"),a=r("e260"),s=r("9112"),o=r("b622"),l=o("iterator"),c=o("toStringTag"),d=a.values;for(var u in i){var f=n[u],p=f&&f.prototype;if(p){if(p[l]!==d)try{s(p,l,d)}catch(v){p[l]=d}if(p[c]||s(p,c,u),i[u])for(var h in a)if(p[h]!==a[h])try{s(p,h,a[h])}catch(v){p[h]=a[h]}}}}}]);
//# sourceMappingURL=adminorders.612d9757.js.map