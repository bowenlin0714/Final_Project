(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["products"],{"129f":function(t,e){t.exports=Object.is||function(t,e){return t===e?0!==t||1/t===1/e:t!=t&&e!=e}},1362:function(t,e,s){t.exports=s.p+"img/murcat.1dd7592d.png"},"14c3":function(t,e,s){var r=s("c6b6"),n=s("9263");t.exports=function(t,e){var s=t.exec;if("function"===typeof s){var a=s.call(t,e);if("object"!==typeof a)throw TypeError("RegExp exec method returned something other than an Object or null");return a}if("RegExp"!==r(t))throw TypeError("RegExp#exec called on incompatible receiver");return n.call(t,e)}},"841c":function(t,e,s){"use strict";var r=s("d784"),n=s("825a"),a=s("1d80"),i=s("129f"),o=s("14c3");r("search",1,(function(t,e,s){return[function(e){var s=a(this),r=void 0==e?void 0:e[t];return void 0!==r?r.call(e,s):new RegExp(e)[t](String(s))},function(t){var r=s(e,t,this);if(r.done)return r.value;var a=n(t),c=String(this),l=a.lastIndex;i(l,0)||(a.lastIndex=0);var u=o(a,c);return i(a.lastIndex,l)||(a.lastIndex=l),null===u?-1:u.index}]}))},9263:function(t,e,s){"use strict";var r=s("ad6d"),n=s("9f7f"),a=RegExp.prototype.exec,i=String.prototype.replace,o=a,c=function(){var t=/a/,e=/b*/g;return a.call(t,"a"),a.call(e,"a"),0!==t.lastIndex||0!==e.lastIndex}(),l=n.UNSUPPORTED_Y||n.BROKEN_CARET,u=void 0!==/()??/.exec("")[1],d=c||u||l;d&&(o=function(t){var e,s,n,o,d=this,p=l&&d.sticky,f=r.call(d),g=d.source,h=0,m=t;return p&&(f=f.replace("y",""),-1===f.indexOf("g")&&(f+="g"),m=String(t).slice(d.lastIndex),d.lastIndex>0&&(!d.multiline||d.multiline&&"\n"!==t[d.lastIndex-1])&&(g="(?: "+g+")",m=" "+m,h++),s=new RegExp("^(?:"+g+")",f)),u&&(s=new RegExp("^"+g+"$(?!\\s)",f)),c&&(e=d.lastIndex),n=a.call(p?s:d,m),p?n?(n.input=n.input.slice(h),n[0]=n[0].slice(h),n.index=d.lastIndex,d.lastIndex+=n[0].length):d.lastIndex=0:c&&n&&(d.lastIndex=d.global?n.index+n[0].length:e),u&&n&&n.length>1&&i.call(n[0],s,(function(){for(o=1;o<arguments.length-2;o++)void 0===arguments[o]&&(n[o]=void 0)})),n}),t.exports=o},"9f7f":function(t,e,s){"use strict";var r=s("d039");function n(t,e){return RegExp(t,e)}e.UNSUPPORTED_Y=r((function(){var t=n("a","y");return t.lastIndex=2,null!=t.exec("abcd")})),e.BROKEN_CARET=r((function(){var t=n("^r","gy");return t.lastIndex=2,null!=t.exec("str")}))},ac1f:function(t,e,s){"use strict";var r=s("23e7"),n=s("9263");r({target:"RegExp",proto:!0,forced:/./.exec!==n},{exec:n})},ad6d:function(t,e,s){"use strict";var r=s("825a");t.exports=function(){var t=r(this),e="";return t.global&&(e+="g"),t.ignoreCase&&(e+="i"),t.multiline&&(e+="m"),t.dotAll&&(e+="s"),t.unicode&&(e+="u"),t.sticky&&(e+="y"),e}},d784:function(t,e,s){"use strict";s("ac1f");var r=s("6eeb"),n=s("d039"),a=s("b622"),i=s("9263"),o=s("9112"),c=a("species"),l=!n((function(){var t=/./;return t.exec=function(){var t=[];return t.groups={a:"7"},t},"7"!=="".replace(t,"$<a>")})),u=function(){return"$0"==="a".replace(/./,"$0")}(),d=a("replace"),p=function(){return!!/./[d]&&""===/./[d]("a","$0")}(),f=!n((function(){var t=/(?:)/,e=t.exec;t.exec=function(){return e.apply(this,arguments)};var s="ab".split(t);return 2!==s.length||"a"!==s[0]||"b"!==s[1]}));t.exports=function(t,e,s,d){var g=a(t),h=!n((function(){var e={};return e[g]=function(){return 7},7!=""[t](e)})),m=h&&!n((function(){var e=!1,s=/a/;return"split"===t&&(s={},s.constructor={},s.constructor[c]=function(){return s},s.flags="",s[g]=/./[g]),s.exec=function(){return e=!0,null},s[g](""),!e}));if(!h||!m||"replace"===t&&(!l||!u||p)||"split"===t&&!f){var b=/./[g],x=s(g,""[t],(function(t,e,s,r,n){return e.exec===i?h&&!n?{done:!0,value:b.call(e,s,r)}:{done:!0,value:t.call(s,e,r)}:{done:!1}}),{REPLACE_KEEPS_$0:u,REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE:p}),v=x[0],w=x[1];r(String.prototype,t,v),r(RegExp.prototype,g,2==e?function(t,e){return w.call(t,this,e)}:function(t){return w.call(t,this)})}d&&o(RegExp.prototype[g],"sham",!0)}},e6dc:function(t,e,s){"use strict";s.r(e);var r=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("b-container",{staticClass:"products shadow"},[r("b-row",[r("b-col",{attrs:{cols:"12"}},[r("b-breadcrumb",{staticClass:"mt-2",attrs:{items:t.breads}})],1),r("b-col",{attrs:{cols:"12"}},[r("b-row",[r("b-col",{staticClass:"ml-auto mb-3",attrs:{cols:"12",lg:"3"}},[r("div",{staticClass:"searchbar mb-2"},[r("font-awesome-icon",{staticClass:"h4 mt-2",attrs:{icon:["fas","search"]}}),r("b-form-input",{staticClass:"w-75 ml-2",staticStyle:{right:"0"},attrs:{type:"text",placeholder:"Type to search"},model:{value:t.keyword,callback:function(e){t.keyword=e},expression:"keyword"}})],1)]),r("b-col",{staticClass:"d-block d-lg-none mx-auto",attrs:{cols:"10"}},[r("b-dropdown",{staticClass:"mb-4",attrs:{text:"選擇類別",block:"","menu-class":"w-100"}},t._l(this.$store.state.categories,(function(e){return r("b-dropdown-item-button",{staticClass:"my-2",on:{click:function(s){return t.tagCategory(e)}}},[t._v(t._s(e.text))])})),1)],1)],1)],1),r("b-col",{staticClass:"mx-auto",attrs:{cols:"10",lg:"2"}},[r("b-dropdown",{staticClass:"w-100 mb-3",attrs:{text:" 排序 "}},[r("b-dropdown-item",{staticClass:"w-100",on:{click:t.sortnumber}},[r("span",[t._v("價格")]),r("font-awesome-icon",{staticClass:"ml-2",attrs:{icon:["fas","long-arrow-alt-up"]}})],1),r("b-dropdown-item",{staticClass:"w-100",on:{click:t.sortreverse}},[r("span",[t._v("價格")]),r("font-awesome-icon",{staticClass:"ml-2",attrs:{icon:["fas","long-arrow-alt-down"]}})],1),r("b-dropdown-item",{staticClass:"w-100",on:{click:t.sortdate}},[r("span",[t._v("日期")]),r("font-awesome-icon",{staticClass:"ml-2",attrs:{icon:["fas","long-arrow-alt-down"]}})],1),r("b-dropdown-item",{staticClass:"w-100",on:{click:t.datereverse}},[r("span",[t._v("日期")]),r("font-awesome-icon",{staticClass:"ml-2",attrs:{icon:["fas","long-arrow-alt-up"]}})],1)],1),t._l(t.category,(function(e,s){return r("b-list-group",{key:s,staticClass:"p-1 d-none d-lg-block"},[r("b-list-group-item",{staticClass:"p-0 text-center d-block"},[r("div",{directives:[{name:"ripple",rawName:"v-ripple"}],staticClass:"button is-primary"},[t.tag===e.value?r("b-button",{staticClass:"activebtn w-100 shadow-sm",staticStyle:{"font-size":"0.9rem"},on:{click:function(s){return t.tagCategory(e)}}},[t._v(t._s(e.text))]):r("b-button",{staticClass:"w-100 shadow-sm",staticStyle:{"font-size":"0.9rem"},on:{click:function(s){return t.tagCategory(e)}}},[t._v(t._s(e.text))])],1)])],1)}))],2),r("b-col",{attrs:{cols:"12",lg:"10"}},[r("b-row",{staticClass:"d-flex justify-content-center justify-content-lg-start",staticStyle:{"min-height":"60vh"}},[0===t.finalLists.length?r("div",{staticClass:"m-auto d-flex flex-column"},[r("img",{staticStyle:{width:"10rem"},attrs:{src:s("1362")}}),r("h5",{staticClass:"text-center"},[t._v("目前沒有商品")])]):t._e(),t._l(t.finalLists,(function(e){return r("b-col",{attrs:{cols:"10",lg:"4"}},[r("a",{staticStyle:{"text-decoration":"none"},attrs:{href:"#/productsdetail",title:"title"},on:{click:function(s){return t.showdetail(e)}}},[r("b-card",{staticClass:"productCard mb-3 shadow border pb-0"},[r("div",{staticClass:"img border"},[r("b-card-img",{staticStyle:{"max-height":"100%"},attrs:{src:e.src[0]}})],1),r("b-card-text",{staticClass:"mt-2",staticStyle:{height:"4rem"}},[r("p",[t._v(t._s(e.name))])]),r("b-card-text",{staticClass:"d-flex align-items-center mt-2",staticStyle:{"vertical-align":"middle"}},[e.onsale?r("span",{staticClass:"text-danger mr-3 h5"},[t._v("特價: NT$: "+t._s(e.countPrice))]):t._e(),e.onsale?r("s",[t._v("NT$: "+t._s(e.price))]):r("span",[t._v("NT$: "+t._s(e.price))])])],1)],1)])}))],2),r("p",{staticClass:"text-center"},[t._v("第 "+t._s(t.currentPage)+" 頁 共 "+t._s(t.searchLists.length)+" 筆結果")]),r("b-pagination",{staticClass:"pt-3 mx-auto mb-4",attrs:{"total-rows":t.searchLists.length,"per-page":t.perPage,"aria-controls":"itemList",align:"center"},model:{value:t.currentPage,callback:function(e){t.currentPage=e},expression:"currentPage"}})],1)],1)],1)},n=[],a=(s("4de4"),s("d81d"),s("fb6a"),s("b0c0"),s("ac1f"),s("841c"),{name:"Products",data:function(){return{isLoading:!1,fullPage:!0,keyword:"",currentPage:1,perPage:9,breads:[{text:"首頁",to:"/"},{text:"商品列表",active:!0}],images:[]}},computed:{tag:function(){return this.$store.state.tag},category:function(){return this.$store.state.categories},filterLists:function(){var t=this,e=null;return""===this.$store.state.tag?(e=this.$store.state.onShoplists,e):(e=this.$store.state.onShoplists.filter((function(e){return e.category===t.$store.state.tag})),e)},searchLists:function(){var t=this,e="";return""===this.keyword?(e=this.filterLists,e):(e=this.filterLists.filter((function(e){return-1!==e.name.search(t.keyword)})),e)},finalLists:function(){return this.searchLists.slice((this.currentPage-1)*this.perPage,this.currentPage*this.perPage)}},methods:{sortdate:function(){this.searchLists.sort((function(t,e){return parseInt(t.productNumber)-parseInt(e.productNumber)}))},datereverse:function(){this.searchLists.sort((function(t,e){return parseInt(e.productNumber)-parseInt(t.productNumber)}))},sortnumber:function(){this.searchLists.sort((function(t,e){return t.price-e.price}))},sortreverse:function(){this.searchLists.sort((function(t,e){return e.price-t.price}))},tagCategory:function(t){this.$store.state.tag=t.value},showdetail:function(t){this.$store.commit("showdetail",t),window.scrollTo(0,0)}},mounted:function(){var t=this;this.axios.get("https://buyfig-bowen.herokuapp.com/products/").then((function(e){t.images=e.data.result.map((function(t){for(var e=[],s=0;s<t.images.length;s++)e.push("https://buyfig-bowen.herokuapp.com/products/"+t.images[s].file),t.src=e;return t}));var s=t.images;t.$store.commit("onShoplists",s)}))}}),i=a,o=s("2877"),c=Object(o["a"])(i,r,n,!1,null,null,null);e["default"]=c.exports}}]);
//# sourceMappingURL=products.58c5d4e7.js.map