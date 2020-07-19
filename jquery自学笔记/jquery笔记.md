# Ramelon的JQuery自学笔记



## JQuery中文文档

https://www.jquery123.com/

http://hemin.cn/jq/



## 什么是JQuery？

JavaScript+Query，write Less，Do More。

jQuery是一个快速、简洁的JavaScript框架，是继Prototype之后又一个优秀的JavaScript代码库（*或JavaScript框架*）。jQuery设计的宗旨是“write Less，Do 

More”，即倡导写更少的代码，做更多的事情。它封装JavaScript常用的功能代码，提供一种简便的JavaScript设计模式，优化HTML文档操作、事件处理、动画设

计和Ajax交互。



## 对于原生JavaScript，JQuery有哪些优势？

![jzms](C:\Users\VULCAN\Desktop\jquery\images\jzms.png)

1.是可以写多个入口函数的(**$();**)

2.jQuery的API名字都容易记忆

3.jQuery的代码简洁（具有隐式迭代机制）

4.jQuery帮我们解决了浏览器兼容问题

5.容错率较高，前面的代码出了问题，后面的代码不受影响



## JQuery1.x，2.x，3.x有什么区别？应该使用那一个？

**1.x**：兼容ie678,使用最为广泛的，官方只做BUG维护，功能不再新增。因此一般项目来说，使用1.x版本就可以了，最终版本：1.12.4 (2016年5月20日)

**2.x**：不兼容ie678，**很少有人使用**，官方只做BUG维护，功能不再新增。如果不考虑兼容低版本的浏览器可以使用2.x，最终版本：2.2.4 (2016年5月20日)

**3.x**：不兼容ie678，只支持最新的浏览器。除非特殊要求，一般不会使用3.x版本的，很多老的jQuery插件不支持这个版本。目前该版本是官方主要更新维护的版

本。最新版本：3.5.1（2020年7月12日)

**查看淘宝，京东等等网站查看源代码即可看到大厂用什么版本，跟着用相同版本即可。xx.js，开发完替换。**



## 使用JQuery步骤有哪些？

```js
<script src="js/jquery-1.12.4.js"></script>
$(document).ready(function(){
        console.log("Hallo World");
    })
```



## 除了本地引用JQuery以外，还有其他方式可以引用么？

> 国外的CDN：
> 1.Google Hosted Libraries
> src="http://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"
> 2.Microsoft CDN
> src="http://ajax.aspnetcdn.com/ajax/jQuery/jquery-2.0.0.min.js"
> 3.CDNJS
> src="http://cdnjs.cloudflare.com/ajax/libs/jquery/2.0.0/jquery.min.js"
> 4.jQuery官网
> src="http://code.jquery.com/jquery-1.11.0.min.js"
> 5.jsDeliver
> src="http://cdn.jsdelivr.net/jquery/2.0.0/jquery-2.0.0.min.js"
> 国内的CDN:
> 1.百度【本bai人一般引用这个】
> src="http://libs.baidu.com/jquery/2.0.0/jquery.min.js"
> 2.七牛
> src="http://cdn.staticfile.org/jquery/2.0.0/jquery.min.js"
> 3.新浪
> src="http://lib.sinaapp.com/js/jquery/1.6/jquery.min.js"
> 4.又拍du云
> src="http://upcdn.b0.upaiyun.com/libs/jquery/jquery-2.0.0.min.js"
> 5.360
> src="http://libs.useso.com/js/jquery/2.0.0/jquery.min.js"



## 为什么我们能使用$符号访问JQuery

```js
(function (window, undefined) {
    jQuery = function (selector, context) {
        return new jQuery.fn.init(selector, context);
    }
    jQuery.fn = jQuery.prototype = {
        init: function (selector, context) {
            this.dom = document.querySelector(selector)
        },
        val: function (content) {
            if (content) {
                this.dom.value = content
            } else {
                return this.dom.value;
            }
        }
    }
    jQuery.fn.init.prototype = jQuery.fn;
    window.$ = jQuery;
})(window);
$("input").val("value")
```

首先，将jq的代码写在一个匿名函数里，这样避免了重复命名对变量的影响，通过window.$ = jQuery;把$挂在windo下，实现域外使用$的操作。其次，调用

Query这个方法，return 一个jQuery.fn.init()的对象，jQuery.fn.init()本质上是一个构造函数，这样$("input")的时候其实相当于已经new了一个对象。但是怎么使

.val()方法呢，现在new出来的对象只有一个dom属性（当然在我这个例子里是这样的）。所以，最后jQuery.fn.init.prototype = jQuery.fn;这句话格外关键，这

让jQuery.fn.init也能使用val()这个方法，当然也能使用init方法了，所以$("input").init("select").val("value")这种写法也是正确的，而这种写法的效果就是改变了

elect的值而没有改变input的值。



## JQuery入口函数有哪些写法？

```js
// jquery 入口函数
$(document).ready(function () {
    alert("Hallo world");
});

jQuery(document).ready(function () {
    alert("Hallo world");
});

$(function () { // 常用写法
    alert("Hallo world");
});

jQuery(function () {
    alert("Hallo world");
});
```



## 解决JQuery符号冲突有几种办法？

```html
// 第一种办法
<script src="js/jquery-1.12.4.js"></script>
<script src="js/test.js"></script>
<script>
    jQuery.noConflict();
    jQuery(function(){
    	alert("Ramelon");
    });
</script>

// 第二种办法
<script src="js/jquery-1.12.4.js"></script>
<script src="js/test.js"></script>
<script>
    //jQuery.noConflict();
    var ra = jQuery.noConflict();
    ra(function(){
        alert("Ramelon");
    });
</script>
```



## 什么是JQuery核心函数？

jQuery()函数是jQuery库的最核心函数，jQuery的一切都是基于此函数的。该函数主要用于获取HTML DOM元素并将其封装为jQuery对象，以便于使用jQuery对

象提供的其他属性和方法对DOM元素进行操作。jQuery()函数的功能非常强大，它可以将各种类型的参数智能地封装为jQuery对象。



## JQuery核心函数可以接受那些参数？

```js

// $();/jQuery原理();就代表调用jQuery的核心函数

// 1.接收一个函数
$(function () {
    alert("hello lnj");
    // 2.接收一个字符串
    // 2.1接收一个字符串选择器
    // 返回一个jQuery对象, 对象中保存了找到的DOM元素
    var $box1 = $(".box1");
    var $box2 = $("#box2");
    console.log($box1);
    console.log($box2);
    // 2.2接收一个字符串代码片段
    // 返回一个jQuery对象, 对象中保存了创建的DOM元素
    var $p = $("<p>我是段落</p>");
    console.log($p);
    $box1.append($p);
    // 3.接收一个DOM元素
    // 会被包装成一个jQuery对象返回给我们
    var span = document.getElementsByTagName("span")[0];
    console.log(span);
    var $span = $(span);
    console.log($span);
});

```



## 核心函数可以传入''/null/underfined/NAN/0/false吗？

```html
<script>
    $(function(){
        var $a = $('');
        console.log($a);

        var $b = $(null);
        console.log($b);

        var $c = $(undefined);
        console.log($c);

        var $e = $(0);
        console.log($e);

        var $f = $(false);
        console.log($f);

        var $d = $(NAN);
        console.log($d);
    });
</script>
```

![tsbl](C:\Users\VULCAN\Desktop\jquery\images\tsbl.png)



## JQuery对象的本质是什么？如何辨别？区别？

JQuery对象的本质是伪数组！

![dxbz](C:\Users\VULCAN\Desktop\jquery\images\dxbz.png)



## 什么是实例方法？什么是静态方法？

```html
<script>
    // 1.定义一个类
    function AClass(){

    }

    // 2.添加一个静态方法，
    AClass.staticMethod = function(){
        alert("staticMethod");
    }

    // 静态方法通过类名调用
    AClass.staticMethod();

    // 3.给这个类添加一个实例方法
    AClass.prototype.instanceMethod = function(){
        alert("instanceMethod");
    }

    // 实例方法调用
    var a = new AClass();
    a.instanceMethod();
</script>
```



## 什么是对象的原型对象？

“原型对象其实就是普通对象 (Function.prototype 除外,它是函数对象,但它很特殊,他没有prototype 属性(前面说道函数对象都有prototype 属性))。”



## JQuery中的each和原生js的each有什么不同？

```html
<script>
    // 原生js
    var arr = [1,3,5,7,9];
    // 第一个参数为值，第二个参数为索引，不能遍历伪数组
    arr.forEach(function(value,index){
        console.log(index,value);
    });

    // jquery的each静态方法遍历数组，可以遍历伪数组
    var obj = {0:1, 1:3, 2:5, 3:7, 4:9, length:5};
    // 第一个参数为索引，第二个参数为值，不能遍历伪数组
    $.each(obj, function(index,value){
        console.log(index,value);
    })
</script>
```

[each不同的应用场景](https://www.jquery123.com/jQuery.each/): https://www.jquery123.com/jQuery.each/



## JQuery中的map和Js中的map有什么不同，以及each的不同？

```html
<script>
    var arr = [1,3,5,7,9];
    var obj = {0:1, 1:3, 2:5, 3:7, 4:9, length:5};  
    // 参数1：value，参数2：index，参数3：array
    // 不能遍历伪数组
    arr.map(function(value, index, array){
        console.log(index, value, array);
    });

    // obj.map(function(value, index, array){
    //     console.log(index, value, array);
    // });

    var res = $.map(obj,function(index, value){
        console.log(index, value);
        return index + value;
    });

    var res2 = $.each(obj, function(index,value){
        console.log(index,value);
    });

    console.log(res);
    console.log(res2);


    // jquery中的each静态方法和map静态方法的区别:
    // each默认静态方法返回值就是遍历谁返回谁
    // map静态方法默认返回一个空数组，但是可以return.
    // each静态方法不支持在回调函数中对遍历的数组进行遍历
    // mao静态方法可以在回调函数中通过return对遍历数组进行处理
</script>
```



## JQuery静态方法示例

```html
<script>
    var str = "Ramelon";
    console.log("---" + str + "---");
    // 取出字符串两端的空格，并返回一个去除空格的新字符串
    console.log("---" + $.trim(str) + "---");


    // 数组
    var arr = [1,3,5,7,9];
    // 伪数组
    var arrlike = {0:1, 1:3, 2:5, 3:7, 4:9, length:5};  
    // 对象
    var obj = {"name": "Ramelon", "age":32};
    // 函数
    var fn = function(){};
    // window对象
    var w = window;
    /*
    判断传入的对象是否为window对象
    */
    var res = $.isWindow(w);
    console.log(res);

    /*
    判断是否为数组
    */
    var res2 = $.isArray();
    console.log(res2);

    /*
    判断是否为方法
    $.isFunction();返回为true
    */
    var res3 = $.isFunction();
    console.log(res3);


</script>
```



## 封装工具方法的好处

封装的好处：重用、bai不必关心具体的实du现、面向对象三大特征之zhi一、具有安全性。



## JQuery静态函数holdReady使用？

```html
<script>
    // 暂停ready执行
    $.holdReady(true);

     $(document).ready(function(){
        alert("ready");
     });
</script>
<body>
    <button>回复ready事件</button>
    <script>
        var btn = document.getElementsByTagName("button")[0];
        btn.onclick = function(){
            // 恢复ready执行
            $.holdReady(false);
        }
    </script>
</body>
```



## JQuery内容选择器

```html
<script>
    $(function(){
        // :empty:找到既没有文本内容也没有子元素的指定元素
        var $div = $("div:empty");
        console.log($div);

        // :parent:找到有文本内容或有子元素的指定元素
        var $div2 = $("div:parent");
        console.log($div2);

        // :contains(text):找到包含指定文本内容的指定元素
        var $div3 = $("div:contains('div')");
        console.log($div3);

         // :has(selector)：找到包含指定子元素的指定元素
         var $div4 = $("div:has('span')");
        console.log($div4);
    });
</script>
```



## parents方法和parent区别

````html
<table class="table table-bordered" id="user-table">
    <thead>
        <tr>
            <th>姓名</th>
            <th>职业</th>
            <th>操作</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>河浪</td>
            <td>web前端</td>
            <td>
                <button class="btn btn-default btn-xs on-delete">删除</button>
            </td>
        </tr>
        <!-- 更多代码省略 -->
    </tbody>
</table>


$("#user-table").on("click",".on-delete",function () {
    $(this).parent().parent().remove();
})


$("#user-table").on("click",".on-delete",function () {
    $(this).parents("tr").remove();
})
````



https://blog.csdn.net/u013350495/article/details/97437797



## 原生js属性和属性节点(setAttribute,getAttribute)

```html
<script>
    /*
    1.什么是属性?
    对象身上保存的变量就是属性
    2.如何操作属性?
    对象.属性名 = 属性值
    对象.属性名称
    对象.["属性名称"] = 属性值
    对象.["属性名称"]
    3.什么是属性节点?
    <span></span>
    在编写HTML代码时，在html标签中添加的属性就是属性节点
    在浏览器中找到span这个DOM元素之后，展开看到的就是属性在attributes属性中保持的所有内容都是属性节点
    4.如何操作属性节点?
    DOM元素.setAttribute("属性名称","值")
     DOM元素.getAttribute("属性名称")
    5.属性和属性节点有什么区别?
    任何对象都有属性，只有DOM对象才有属性节点
    */
    $(function(){

    });
    window.onload = (function(){
        var span  = document.getElementsByTagName("span")[0];
        span.setAttribute("name","ara");
        console.log(span.getAttribute("name"));
    });   
</script>
```



## JQurey属性和属性节点(attr,removeAttr)

```html
<script>
    /*
        1.attr(name|properties|key,value|fn)
        作用：获取或者设置属性节点的值
        可以传递一个参数，也可以传递两个参数
        如果传递一个参数，代表获取属性节点的值
        如果传递两个参数，代表设置属性节点的值

        注意点
        获取:无论找到多少个元素，都只会返回第一个元素指定的属性节点的值
        设置:找到多少个元素就会设置多少个元素
             如果设置的属性节点不存在，那么系统会自动新增

        2.removeAttr(name)
        从每一个匹配的元素中删除一个属性(所有匹配)
        注意点:1.6以下版本在IE6使用JQuery的removeAttr方法删除disabled是无效的。解决的方法就是使用$("XX").prop("disabled",false);
        1.7版本在IE6下已支持删除disabled。
        jquery 同时删除元素标签的多个属性，必须使用1.7或以上的版本才能实现，两个要删除的属性中间必须用空格隔开(同removeClass()删除多个class值格式写法		 一样)/p>
    */
    $(function(){
        // console.log($("span").attr("class"));
        // $("span").attr("class","box");
        // $("span").attr("acc","123");
        // $("span").removeAttr("class");
        $("span").removeAttr("class name");
    });
</script>
<body>
    <span class="span1" name="it666"></span>
    <span class="span2" name="rar"></span>
</body>
```



## JQurey属性和属性节点(prop,removeProp)

```html
<script>
    /*
        1.prop(name|properties|key,value|fn)
        获取匹配的元素集中第一个元素的属性（property）值或设置每一个匹配元素的一个或多个属性。
        prop还能操作属性节点！
        具有true和false两个属性使用prop或两个属性的属性节点
        具有checked/selected或者disabled使用prop，其他使用attr()
        2.removeProp(name)
        用来删除由.prop()方法设置的属性集
    */
    $(function(){
        // $("span").eq(0).prop("demo","it666");
        // $("span").eq(1).prop("demo","rar");
        // console.log($("span").prop("demo"));

        // $("span").removeProp("demo"); 
        // console.log($("span").prop("class"));
        // $("span").prop("class","box");
        console.log($("input").prop("checked")); // true/false
        console.log($("input").attr("checked")); // checked/undefined
    }); 
</script>
```



## JQuery操作相关的方法(*attr*,*removeClass*,*toggleClass*)

```html
<style>
    *{
        margin: 0;
        padding: 0;
    }
    .class1{
        width: 100px;
        height: 100px;
        background:lightcoral;
    }
    .class2{
        border: 10px solid #000;
    }
</style>
<script>
    /*
        1.attr(name|properties|key,value|fn)
        获取匹配的元素集合中的第一个元素的属性的值 或 设置每一个匹配元素的一个或多个属性。
        2.removeClass([class|fn])
        从所有匹配的元素中删除全部或者指定的类。
        3.toggleClass(class|fn[,sw])
        如果存在（不存在）就删除（添加）一个类。
    */
    $(function(){
        var $btn = $("button");
        $btn.eq(0).click(function(){
            $("div").addClass("class1 class2");
        });

        $btn.eq(1).click(function(){
            $("div").removeClass("class1 class2");
        });

        $btn.eq(2).click(function(){
            $("div").toggleClass("class1");
        });
    });
</script>
<body>
    <button>添加类</button>
    <button>删除类</button>
    <button>切换类</button>
    <div></div>
</body>
```



## JQuery获取文本相关的方法

```html
<script>
    /*
        1.html([val|fn])
        取得第一个匹配元素的html内容。这个函数不能用于XML文档。但可以用于XHTML文档。
        2.text([val|fn])
        结果是由所有匹配元素包含的文本内容组合起来的文本。这个方法对HTML和XML文档都有效。
        3.val([val|fn|arr])
        获得匹配元素的当前值。
    */
    $(function(){
        var $btn = $("button");
        $btn.eq(0).click(function(){
            $("div").html("<p>我是段落<span>我是span</span></p>");
        });

        $btn.eq(1).click(function(){
            console.log($("div").html());
        });

        $btn.eq(2).click(function(){
            $("div").text("<p>我是段落<span>我是span</span></p>");
        });

        $btn.eq(3).click(function(){
            console.log($("div").text());
        });

        $btn.eq(4).click(function(){
            $("input").val("请输入内容");
        });

        $btn.eq(5).click(function(){
            console.log($("input").val());
        });
    });
</script>
```



## JQuery操作css样式的方法

```js
<script>
    $(function(){
        // 1.逐个设置
        $("div").css("width","100px");
        $("div").css("height","100px");
        $("div").css("background","red");

        // 2.链式设置
        $("div").css("width","100px").css("height","100px").css("background","blue");

        // 3.批量设置
        $("div").css({
            width: "100px",
            height: "100px",
            background: "green"
        })

        // 4.获取css样式
        console.log($("div").css("width"));
    });
</script>
```



## JQuery位置尺寸操作方法

```html
<style>
    *{
        margin: 0;
        padding: 0;
    }
    .father{
        width: 200px;
        height: 200px;
        background: red;
        border: solid 50px #000;
        margin-left: 50px;
        position: relative;
    }
    .son{
        width: 100px;
        height: 100px;
        background: blue; 
        left: 50px;
        top: 50px;
        position: absolute;
    }
</style>
<script>
    $(function(){
        var $btn = $("button");
        $btn.eq(0).click(function(){
            console.log($(".father").width());
            // 1.offset([coordinates])
            // 用于设置或返回当前匹配元素相对于当前文档的偏移，也就是相对于当前文档的坐标。该函数值对可见元素有效。
            // 获取元素距离窗口的偏移位
            console.log($(".son").offset().left);
            // position()
            // 获取元素距离定位元素的偏移位
            // 获取匹配元素相对父元素的偏移。
            console.log($(".son").position().left);

        }); 

        $btn.eq(1).click(function(){
            $(".father").width("500px");
            $(".son").offset({
                left: 10
            });
            // position方法只能获取不能设置
            // $(".son").position({
            //     left: 10
            // });
        });
    });
</script>
```



### JQuery位置尺寸操作方法

```html
<style>
    *{
        margin: 0;
        padding: 0;
    }
    .father{
        width: 200px;
        height: 200px;
        background: red;
        border: solid 50px #000;
        margin-left: 50px;
        position: relative;
    }
    .son{
        width: 100px;
        height: 100px;
        background: blue; 
        left: 50px;
        top: 50px;
        position: absolute;
    }
</style>
<script src="js/jquery-1.12.4.js"></script>
<script>
    $(function(){
        var $btn = $("button");
        $btn.eq(0).click(function(){
            console.log($(".father").width());
            // 1.offset([coordinates])
            // 用于设置或返回当前匹配元素相对于当前文档的偏移，也就是相对于当前文档的坐标。该函数值对可见元素有效。
            // 获取元素距离窗口的偏移位
            console.log($(".son").offset().left);
            // position()
            // 获取元素距离定位元素的偏移位
            // 获取匹配元素相对父元素的偏移。
            console.log($(".son").position().left);

            console.log($(".father").innerHeight());


        }); 

        $btn.eq(1).click(function(){
            $(".father").width("500px");
            $(".son").offset({
                left: 10
            });
            // position方法只能获取不能设置
            // $(".son").position({
            //     left: 10
            // });
        });
    });
</script>
```



### JQuery-scrollTop

```html
<script>
    $(function () {
        var $btn = $("button");
        $btn.eq(0).click(function(){
            // console.log($(".scroll").scrollTop());
            // 避免ie浏览器出错
            console.log($("body").scrollTop()+$("html").scrollTop());
        });

        $btn.eq(1).click(function(){
            $(".scroll").scrollTop(300);
            $("html,body").scrollTop(300);
        });
    });
</script>
```



## JQuery事件

### click，on事件

```html
<script>
    $(function () {
        // 编写jQuery相关代码
        /*
        jQuery中有两种绑定事件方式
        1.eventName(fn);
        编码效率略高/ 部分事件jQuery没有实现,所以不能添加
        2.on(eventName, fn);
        编码效率略低/ 所有js事件都可以添加

        注意点:
        可以添加多个相同或者不同类型的事件,不会覆盖
        */
        // $("button").click(function () {
        //     alert("hello lnj");
        // });
        // $("button").click(function () {
        //     alert("hello 123");
        // });
        // $("button").mouseleave(function () {
        //     alert("hello mouseleave");
        // });
        // $("button").mouseenter(function () {
        //     alert("hello mouseenter");
        // });
        $("button").on("click", function () {
            alert("hello click1");
        });
        $("button").on("click", function () {
            alert("hello click2");
        });
        $("button").on("mouseleave", function () {
            alert("hello mouseleave");
        });
        $("button").on("mouseenter", function () {
            alert("hello mouseenter");
        });
    });
</script>
```



### 事件移除

```js
// off方法如果不传递参数, 会移除所有的事件
// $("button").off();
// off方法如果传递一个参数, 会移除所有指定类型的事件
// $("button").off("click");
// off方法如果传递两个参数, 会移除所有指定类型的指定事件
$("button").off("click", test1);
```



### jQuery事件冒泡和默行为

```html
<script>
    $(function () {
        // 编写jQuery相关代码
        /*
        1.什么是事件冒泡?
        2.如何阻止事件冒泡
        3.什么是默认行为?
        4.如何阻止默认行为
        */
        /*
        $(".son").click(function (event) {
            alert("son");
            // return false;
            event.stopPropagation();
        });
        $(".father").click(function () {
            alert("father");
        });
        */
        $("a").click(function (event) {
            alert("弹出注册框");
            // return false;
            event.preventDefault();
        });
    });
</script>
```



### jQuery事件自动触发

```html
<script>
    $(function () {
        // 编写jQuery相关代码
        $(".son").click(function (event) {
            alert("son");
        });

        $(".father").click(function () {
            alert("father");
        });
        // $(".father").trigger("click");
        // $(".father").triggerHandler("click");

        /*
        trigger: 如果利用trigger自动触发事件,会触发事件冒泡
        triggerHandler: 如果利用triggerHandler自动触发事件, 不会触发事件冒泡
        */
        // $(".son").trigger("click");
        // $(".son").triggerHandler("click");

        $("input[type='submit']").click(function () {
            alert("submit");
        });

        /*
        trigger: 如果利用trigger自动触发事件,会触发默认行为
        triggerHandler: 如果利用triggerHandler自动触发事件, 不会触发默认行为
        */
        // $("input[type='submit']").trigger("click");
        // $("input[type='submit']").triggerHandler("click");


        $("span").click(function () {
            alert("a");
        });
        // $("a").triggerHandler("click");
        $("span").trigger("click");
    });
</script>
```



### jQuery自定义事件

```html
<script>
    $(function () {
        // 编写jQuery相关代码
        // $(".son").myClick(function (event) {
        //     alert("son");
        // });
        /*
        想要自定义事件, 必须满足两个条件
        1.事件必须是通过on绑定的
        2.事件必须通过trigger来触发
        */
        $(".son").on("myClick", function () {
            alert("son");
        });
        $(".son").triggerHandler("myClick");
    });
</script>
```



### jQuery事件命名空间

```html
<script>
    $(function () {

        /*
        想要事件的命名空间有效,必须满足两个条件
        1.事件是通过on来绑定的
        2.通过trigger触发事件
        */
        $(".son").on("click.zs", function () {
            alert("click1");
        });
        $(".son").on("click.ls", function () {
            alert("click2");
        });
        // $(".son").trigger("click.zs");
        $(".son").trigger("click.ls");
    });
</script>
```



### jQuery事件命名空间面试题

```html
<script>
    $(function () {

        $(".father").on("click.ls", function () {
            alert("father click1");
        });
        $(".father").on("click", function () {
            alert("father click2");
        });
        $(".son").on("click.ls", function () {
            alert("son click1");
        });
        /*
        利用trigger触发子元素带命名空间的事件, 那么父元素带相同命名空间的事件也会被触发. 而父元素没有命名空间的事件不会被触发
        利用trigger触发子元素不带命名空间的事件,那么子元素所有相同类型的事件和父元素所有相同类型的事件都会被触发
        */
        // $(".son").trigger("click.ls");
        $(".son").trigger("click");
    });
</script>
```



### jQuery事件委托

```html
<script>
    $(function () {
        /*
        1.什么是事件委托?
        请别人帮忙做事情, 然后将做完的结果反馈给我们
        */
        $("button").click(function () {
            $("ul").append("<li>我是新增的li</li>");
        })

        /*
        在jQuery中,如果通过核心函数找到的元素不止一个, 那么在添加事件的时候,jQuery会遍历所有找到的元素,给所有找到的元素添加事件
        */
        // $("ul>li").click(function () {
        //     console.log($(this).html());
        // });
        /*
        以下代码的含义, 让ul帮li监听click事件
        之所以能够监听, 是因为入口函数执行的时候ul就已经存在了, 所以能够添加事件
        之所以this是li,是因为我们点击的是li, 而li没有click事件, 所以事件冒泡传递给了ul,ul响应了事件, 既然事件是从li传递过来的,所以ul必然指定this是谁
        */
        $("ul").delegate("li", "click", function () {
            console.log($(this).html());
        });
    });
</script>
```



### jQuery事件委托练习

```html
<script>
    $(function () {
        // 编写jQuery相关代码
        $("a").click(function () {
            var $mask = $("<div class=\"mask\">\n" +
                "    <div class=\"login\">\n" +
                "        <img src=\"../images/login.png\" alt=\"\">\n" +
                "        <span></span>\n" +
                "    </div>\n" +
                "</div>");
            // 添加蒙版
            $("body").append($mask);
            $("body").delegate(".login>span", "click", function () {
                // 移除蒙版
                $mask.remove();
            });
            return false;
        });
    });
</script>
```



### JQuery移入移出事件

```html
<script>
    $(function () {
        // 编写jQuery相关代码
        /*
        mouseover/mouseout事件, 子元素被移入移出也会触发父元素的事件
        */
        /*
        $(".father").mouseover(function () {
            console.log("father被移入了");
        });
        $(".father").mouseout(function () {
            console.log("father被移出了");
        });
        */

        /*
        mouseenter/mouseleave事件, 子元素被移入移出不会触发父元素的事件
        推荐大家使用
        */
        /*
        $(".father").mouseenter(function () {
            console.log("father被移入了");
        });
        $(".father").mouseleave(function () {
            console.log("father被移出了");
        });
        */

        /*
        $(".father").hover(function () {
            console.log("father被移入了");
        },function () {
            console.log("father被移出了");
        });
        */

        $(".father").hover(function () {
            console.log("father被移入移出了");
        });
    });
</script>
```



## AJAX

### ajax-封装

```js
function obj2str(obj) {
    /*
    {
        "userName":"lnj",
        "userPwd":"123456",
        "t":"3712i9471329876498132"
    }
    */
    obj = obj || {}; // 如果没有传参, 为了添加随机因子,必须自己创建一个对象
    obj.t = new Date().getTime();
    var res = [];
    for(var key in obj){
        // 在URL中是不可以出现中文的, 如果出现了中文需要转码
        // 可以调用encodeURIComponent方法
        // URL中只可以出现字母/数字/下划线/ASCII码
        res.push(encodeURIComponent(key)+"="+encodeURIComponent(obj[key])); // [userName=lnj, userPwd=123456];
    }
    return res.join("&"); // userName=lnj&userPwd=123456
}
function ajax(url, obj, timeout, success, error) {
    // 0.将对象转换为字符串
    var str = obj2str(obj); // key=value&key=value;
    // 1.创建一个异步对象
    var xmlhttp, timer;
    if (window.XMLHttpRequest)
    {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp=new XMLHttpRequest();
    }
    else
    {// code for IE6, IE5
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    // 2.设置请求方式和请求地址
    /*
    method：请求的类型；GET 或 POST
    url：文件在服务器上的位置
    async：true（异步）或 false（同步）
    */
    xmlhttp.open("GET", url+"?"+str, true);
    // 3.发送请求
    xmlhttp.send();
    // 4.监听状态的变化
    xmlhttp.onreadystatechange = function (ev2) {
        /*
        0: 请求未初始化
        1: 服务器连接已建立
        2: 请求已接收
        3: 请求处理中
        4: 请求已完成，且响应已就绪
        */
        if(xmlhttp.readyState === 4){
            clearInterval(timer);
            // 判断是否请求成功
            if(xmlhttp.status >= 200 && xmlhttp.status < 300 ||
                xmlhttp.status === 304){
                // 5.处理返回的结果
                // console.log("接收到服务器返回的数据");
                success(xmlhttp);
            }else{
                // console.log("没有接收到服务器返回的数据");
                error(xmlhttp);
            }
        }
    }
    // 判断外界是否传入了超时时间
    if(timeout){
        timer = setInterval(function () {
            console.log("中断请求");
            xmlhttp.abort();
            clearInterval(timer);
        }, timeout);
    }
}
```





### ajax-get

```html
<!--
1.什么是Ajax?
AJAX 是与服务器交换数据并更新部分网页的艺术，在不重新加载整个页面的情况下。
-->
<script>
    window.onload = function (ev) {
        var oBtn = document.querySelector("button");
        oBtn.onclick = function (ev1) {
            // 1.创建一个异步对象
            var xmlhttp=new XMLHttpRequest();
            // 2.设置请求方式和请求地址
            /*
            method：请求的类型；GET 或 POST
            url：文件在服务器上的位置
            async：true（异步）或 false（同步）
            */
            xmlhttp.open("GET", "04-ajax-get.php", true);
            // 3.发送请求
            xmlhttp.send();
            // 4.监听状态的变化
            xmlhttp.onreadystatechange = function (ev2) {
                /*
                0: 请求未初始化
                1: 服务器连接已建立
                2: 请求已接收
                3: 请求处理中
                4: 请求已完成，且响应已就绪
                */
                if(xmlhttp.readyState === 4){
                    // 判断是否请求成功
                    if(xmlhttp.status >= 200 && xmlhttp.status < 300 ||
                       xmlhttp.status === 304){
                        // 5.处理返回的结果
                        console.log("接收到服务器返回的数据");
                    }else{
                        console.log("没有接收到服务器返回的数据");
                    }

                }
            }
        }
    }
</script>

// 封装后
<script>
    window.onload = function (ev) {
        var oBtn = document.querySelector("button");
        var res = encodeURIComponent("wd=张三");
        console.log(res);
        oBtn.onclick = function (ev1) {
            //                            %E5%BC%A0%E4%B8%89
            // https://www.baidu.com/s?wd=%E5%BC%A0%E4%B8%89
            // url?key=value&key=value;
            ajax("04-ajax-get.php", {
                "userName":"lnj",
                "userPwd":"123456"
            }, 3000
            , function (xhr) {
                alert(xhr.responseText);
            }, function (xhr) {
                alert("请求失败");
            });
        }
    }
</script>
```



### ajax -post

```html
<script>
    window.onload = function (ev) {

        var oBtn = document.querySelector("button");
        oBtn.onclick = function (ev1) {
            /*
            var xhr;
            if (window.XMLHttpRequest)
            {// code for IE7+, Firefox, Chrome, Opera, Safari
                xhr=new XMLHttpRequest();
            }
            else
            {// code for IE6, IE5
                xhr=new ActiveXObject("Microsoft.XMLHTTP");
            }
            // var xhr = new XMLHttpRequest();
            xhr.open("POST","08-ajax-post.php",true);
            // 注意点: 以下代码必须放到open和send之间
            xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
            xhr.send("userName=zs&userPwd=321");
            xhr.onreadystatechange = function (ev2) {
                if(xhr.readyState === 4){
                    if(xhr.status >= 200 && xhr.status < 300 ||
                    xhr.status === 304){
                        // alert("请求成功");
                        alert(xhr.responseText);
                    }else{
                        alert("请求失败");
                    }
                }
            }
            */

            ajax("POST", "08-ajax-post.php",{
                "userName":"lnj",
                "userPwd":"321"
            }, 3000, function (xhr) {
                alert(xhr.responseText);
            }, function (xhr) {
                alert("请求失败");
            });
        }
    }
</script>
```



### ajax-jquery

```html
<!--<script src="js/jquery-1.12.4.js"></script>-->
<script src="myAjax2.js"></script>
<script>
    window.onload = function (ev) {

        var oBtn = document.querySelector("button");
        oBtn.onclick = function (ev1) {
            // $.ajax({
            //     url: "09-ajax-jquery.php",
            //     type: "get",
            //     data: "userName=lnj&userPwd=654321",
            //     success: function(msg){
            //         alert(msg );
            //     },
            //     error: function (xhr) {
            //         alert(xhr.status);
            //     }
            // });

            ajax({
                url:"04-ajax-get.php",
                data:{
                    "userName":"lnj",
                    "userPwd":"123456"
                },
                timeout: 3000,
                type:"post",
                success: function (xhr) {
                    alert(xhr.responseText);
                },
                error: function (xhr) {
                    alert("请求失败");
                }
            });
        }
    }
</script>
```



### ajax-xml

```html
<script>
    window.onload = function (ev) {

        var oBtn = document.querySelector("button");
        oBtn.onclick = function (ev1) {
            ajax({
                type:"get",
                url:"11-ajax-xml.php",
                success: function (xhr) {
                    // console.log(xhr.responseXML);
                    // console.log(document);
                    var res = xhr.responseXML;
                    console.log(res.querySelector("name").innerHTML);
                    console.log(res.querySelector("age").innerHTML);
                },
                error: function (xhr) {
                    console.log(xhr.status);
                }
            })
        }		
    }
</script>
```



### ajax-json

```html
<script>
    window.onload = function (ev) {

        var oBtn = document.querySelector("button");
        oBtn.onclick = function (ev1) {
            ajax({
                type:"get",
                url:"12-ajax-json.php",
                success: function (xhr) {
                    // console.log(xhr.responseText);
                    var str = xhr.responseText;
                    /*
                    在低版本的IE中, 不可以使用原生的JSON.parse方法, 但是可以使用json2.js这个框架来兼容
                    */
                    var obj = JSON.parse(str);
                    // console.log(obj);
                    console.log(obj.name);
                    console.log(obj.age);
                },
                error: function (xhr) {
                    console.log(xhr.status);
                }
            })
        }
    }
</script>
```



### jQuery.ajax(url,[settings])

#### 概述

通过 HTTP 请求加载远程数据。

jQuery 底层 AJAX 实现。简单易用的高层实现见 $.get, $.post 等。$.ajax() 返回其创建的 XMLHttpRequest 对象。大多数情况下你无需直接操作该函数，除非你需要操作不常用的选项，以获得更多的灵活性。

最简单的情况下，$.ajax()可以不带任何参数直接使用。

**注意**，所有的选项都可以通过$.ajaxSetup()函数来全局设置。

**回调函数**

如果要处理$.ajax()得到的数据，则需要使用回调函数。beforeSend、error、dataFilter、success、complete。

- beforeSend 在发送请求之前调用，并且传入一个XMLHttpRequest作为参数。
- error 在请求出错时调用。传入XMLHttpRequest对象，描述错误类型的字符串以及一个异常对象（如果有的话）
- dataFilter 在请求成功之后调用。传入返回的数据以及"dataType"参数的值。并且必须返回新的数据（可能是处理过的）传递给success回调函数。
- success 当请求之后调用。传入返回后的数据，以及包含成功代码的字符串。
- complete 当请求完成之后调用这个函数，无论成功或失败。传入XMLHttpRequest对象，以及一个包含成功或错误代码的字符串。

**数据类型**

$.ajax()函数依赖服务器提供的信息来处理返回的数据。如果服务器报告说返回的数据是XML，那么返回的结果就可以用普通的XML方法或者jQuery的选择器来遍历。如果见得到其他类型，比如HTML，则数据就以文本形式来对待。

通过dataType选项还可以指定其他不同数据处理方式。除了单纯的XML，还可以指定 html、json、jsonp、script或者text。

其中，text和xml类型返回的数据不会经过处理。数据仅仅简单的将XMLHttpRequest的responseText或responseHTML属性传递给success回调函数，

'''注意'''，我们必须确保网页服务器报告的MIME类型与我们选择的dataType所匹配。比如说，XML的话，服务器端就必须声明 text/xml 或者 application/xml 来获得一致的结果。

如果指定为html类型，任何内嵌的JavaScript都会在HTML作为一个字符串返回之前执行。类似的，指定script类型的话，也会先执行服务器端生成JavaScript，然后再把脚本作为一个文本数据返回。

如果指定为json类型，则会把获取到的数据作为一个JavaScript对象来解析，并且把构建好的对象作为结果返回。为了实现这个目的，他首先尝试使用JSON.parse()。如果浏览器不支持，则使用一个函数来构建。JSON数据是一种能很方便通过JavaScript解析的结构化数据。如果获取的数据文件存放在远程服务器上（域名不同，也就是跨域获取数据），则需要使用jsonp类型。使用这种类型的话，会创建一个查询字符串参数 callback=? ，这个参数会加在请求的URL后面。服务器端应当在JSON数据前加上回调函数名，以便完成一个有效的JSONP请求。如果要指定回调函数的参数名来取代默认的callback，可以通过设置$.ajax()的jsonp参数。

**注意**，JSONP是JSON格式的扩展。他要求一些服务器端的代码来检测并处理查询字符串参数。更多信息可以参阅 [最初的文章](http://bob.pythonmac.org/archives/2005/12/05/remote-json-jsonp/)。

如果指定了script或者jsonp类型，那么当从服务器接收到数据时，实际上是用了&lt;script&gt;标签而不是XMLHttpRequest对象。这种情况下，$.ajax()不再返回一个XMLHttpRequest对象，并且也不会传递事件处理函数，比如beforeSend。

**发送数据到服务器**

默认情况下，Ajax请求使用GET方法。如果要使用POST方法，可以设定type参数值。这个选项也会影响data选项中的内容如何发送到服务器。

data选项既可以包含一个查询字符串，比如 key1=value1&amp;key2=value2 ，也可以是一个映射，比如 {key1: 'value1', key2: 'value2'} 。如果使用了后者的形式，则数据再发送器会被转换成查询字符串。这个处理过程也可以通过设置processData选项为false来回避。如果我们希望发送一个XML对象给服务器时，这种处理可能并不合适。并且在这种情况下，我们也应当改变contentType选项的值，用其他合适的MIME类型来取代默认的 application/x-www-form-urlencoded 。

**高级选项**

global选项用于阻止响应注册的回调函数，比如.ajaxSend，或者ajaxError，以及类似的方法。这在有些时候很有用，比如发送的请求非常频繁且简短的时候，就可以在ajaxSend里禁用这个。更多关于这些方法的详细信息，请参阅下面的内容。

如果服务器需要HTTP认证，可以使用用户名和密码可以通过username和password选项来设置。

Ajax请求是限时的，所以错误警告被捕获并处理后，可以用来提升用户体验。请求超时这个参数通常就保留其默认值，要不就通过jQuery.ajaxSetup来全局设定，很少为特定的请求重新设置timeout选项。

默认情况下，请求总会被发出去，但浏览器有可能从他的缓存中调取数据。要禁止使用缓存的结果，可以设置cache参数为false。如果希望判断数据自从上次请求后没有更改过就报告出错的话，可以设置ifModified为true。

scriptCharset允许给&lt;script&gt;标签的请求设定一个特定的字符集，用于script或者jsonp类似的数据。当脚本和页面字符集不同时，这特别好用。

Ajax的第一个字母是asynchronous的开头字母，这意味着所有的操作都是并行的，完成的顺序没有前后关系。$.ajax()的async参数总是设置成true，这标志着在请求开始后，其他代码依然能够执行。强烈不建议把这个选项设置成false，这意味着所有的请求都不再是异步的了，这也会导致浏览器被锁死。

$.ajax函数返回他创建的XMLHttpRequest对象。通常jQuery只在内部处理并创建这个对象，但用户也可以通过xhr选项来传递一个自己创建的xhr对象。返回的对象通常已经被丢弃了，但依然提供一个底层接口来观察和操控请求。比如说，调用对象上的.abort()可以在请求完成前挂起请求。

#### 参数

#### **url,[settings]**Object*V1.5*

**url**:一个用来包含发送请求的URL字符串。

**settings**:AJAX 请求设置。所有选项都是可选的。

#### *V1.0***settings**:选项

#### **accepts**Map

默认： 取决于数据类型。

内容类型发送请求头，告诉服务器什么样的响应会接受返回。如果accepts设置需要修改，推荐在$.ajaxSetup()方法中做一次。

#### **async**Boolean

(默认: true) 默认设置下，所有请求均为异步请求。如果需要发送同步请求，请将此选项设置为 false。注意，同步请求将锁住浏览器，用户其它操作必须等待请求完成才可以执行。

#### **beforeSend(XHR)**Function

发送请求前可修改 XMLHttpRequest 对象的函数，如添加自定义 HTTP 头。XMLHttpRequest 对象是唯一的参数。这是一个 [Ajax 事件](http://docs.jquery.com/Ajax_Events)。如果返回false可以取消本次ajax请求。

```
function (XMLHttpRequest) {

    this; // 调用本次AJAX请求时传递的options参数

}
```



#### **cache**Boolean

(默认: true,dataType为script和jsonp时默认为false) jQuery 1.2 新功能，设置为 false 将不缓存此页面。

#### **complete(XHR, TS)**Function

请求完成后回调函数 (请求成功或失败之后均调用)。参数： XMLHttpRequest 对象和一个描述成功请求类型的字符串。 [Ajax 事件](http://docs.jquery.com/Ajax_Events)。

```
function (XMLHttpRequest, textStatus) {

    this; // 调用本次AJAX请求时传递的options参数

}
```



#### **contents**Map*V1.5*

一个以"{字符串:正则表达式}"配对的对象，用来确定jQuery将如何解析响应，给定其内容类型。

#### **contentType**String

(默认: "application/x-www-form-urlencoded") 发送信息至服务器时内容编码类型。默认值适合大多数情况。如果你明确地传递了一个content-type给 $.ajax() 那么他必定会发送给服务器（即使没有数据要发送）

#### **context**Object

这个对象用于设置Ajax相关回调函数的上下文。也就是说，让回调函数内this指向这个对象（如果不设定这个参数，那么this就指向调用本次AJAX请求时传递的options参数）。比如指定一个DOM元素作为context参数，这样就设置了success回调函数的上下文为这个DOM元素。就像这样：

```
$.ajax({ url: "test.html", context: document.body, success: function(){

    $(this).addClass("done");

}});
```



#### **converters**map*V1.5*

默认： {"* text": window.String, "text html": true, "text json": jQuery.parseJSON, "text xml": jQuery.parseXML}

一个数据类型对数据类型转换器的对象。每个转换器的值是一个函数，返回响应的转化值

#### **crossDomain**map*V1.5*

默认： 同域请求为false

跨域请求为true如果你想强制跨域请求（如JSONP形式）同一域，设置crossDomain为true。这使得例如，服务器端重定向到另一个域

#### **data**Object,String

发送到服务器的数据。将自动转换为请求字符串格式。GET 请求中将附加在 URL 后。查看 processData 选项说明以禁止此自动转换。必须为 Key/Value 格式。如果为数组，jQuery 将自动为不同值对应同一个名称。如 {foo:["bar1", "bar2"]} 转换为 "&foo=bar1&foo=bar2"。

#### **dataFilter**Function

给Ajax返回的原始数据的进行预处理的函数。提供data和type两个参数：data是Ajax返回的原始数据，type是调用jQuery.ajax时提供的dataType参数。函数返回的值将由jQuery进一步处理。

```
function (data, type) {

    // 对Ajax返回的原始数据进行预处理

    return data  // 返回处理后的数据

}
```



#### **dataType**String



预期服务器返回的数据类型。如果不指定，jQuery 将自动根据 HTTP 包 MIME 信息来智能判断，比如XML MIME类型就被识别为XML。在1.4中，JSON就会生成一个JavaScript对象，而script则会执行这个脚本。随后服务器端返回的数据会根据这个值解析后，传递给回调函数。可用值:

"xml": 返回 XML 文档，可用 jQuery 处理。

"html": 返回纯文本 HTML 信息；包含的script标签会在插入dom时执行。

"script": 返回纯文本 JavaScript 代码。不会自动缓存结果。除非设置了"cache"参数。'''注意：'''在远程请求时(不在同一个域下)，所有POST请求都将转为GET请求。(因为将使用DOM的script标签来加载)

"json": 返回 JSON 数据 。

"jsonp": [JSONP](http://bob.pythonmac.org/archives/2005/12/05/remote-json-jsonp/) 格式。使用 [JSONP](http://bob.pythonmac.org/archives/2005/12/05/remote-json-jsonp/) 形式调用函数时，如 "myurl?callback=?" jQuery 将自动替换 ? 为正确的函数名，以执行回调函数。

"text": 返回纯文本字符串



#### **error**Function

(默认: 自动判断 (xml 或 html)) 请求失败时调用此函数。有以下三个参数：XMLHttpRequest 对象、错误信息、（可选）捕获的异常对象。如果发生了错误，错误信息（第二个参数）除了得到null之外，还可能是"timeout", "error", "notmodified" 和 "parsererror"。[Ajax 事件](http://docs.jquery.com/Ajax_Events)。

```
function (XMLHttpRequest, textStatus, errorThrown) {

    // 通常 textStatus 和 errorThrown 之中

    // 只有一个会包含信息

    this; // 调用本次AJAX请求时传递的options参数

}
```



#### **global**Boolean

(默认: true) 是否触发全局 AJAX 事件。设置为 false 将不会触发全局 AJAX 事件，如 ajaxStart 或 ajaxStop 可用于控制不同的 [Ajax 事件](http://docs.jquery.com/Ajax_Events)。

#### **headers**map*V1.5*

Default: {}

一个额外的"{键:值}"对映射到请求一起发送。此设置被设置之前beforeSend函数被调用;因此，消息头中的值设置可以在覆盖beforeSend函数范围内的任何设置。

#### **ifModified**Boolean

(默认: false) 仅在服务器数据改变时获取新数据。使用 HTTP 包 Last-Modified 头信息判断。在jQuery 1.4中，他也会检查服务器指定的'etag'来确定数据没有被修改过。

#### **isLocal**map*V1.5.1*

默认: 取决于当前的位置协议

允许当前环境被认定为“本地”，（如文件系统），即使jQuery默认情况下不会承认它。以下协议目前公认为本地：file, *-extension, and widget。如果isLocal设置需要修改，建议在$.ajaxSetup()方法中这样做一次。

#### **jsonp**String

在一个jsonp请求中重写回调函数的名字。这个值用来替代在"callback=?"这种GET或POST请求中URL参数里的"callback"部分，比如{jsonp:'onJsonPLoad'}会导致将"onJsonPLoad=?"传给服务器。

#### **jsonpCallback**String

为jsonp请求指定一个回调函数名。这个值将用来取代jQuery自动生成的随机函数名。这主要用来让jQuery生成度独特的函数名，这样管理请求更容易，也能方便地提供回调函数和错误处理。你也可以在想让浏览器缓存GET请求的时候，指定这个回调函数名。

#### **mimeType**String*V1.5.1*

一个mime类型用来覆盖XHR的 MIME类型。

#### **password**String

用于响应HTTP访问认证请求的密码

#### **processData**Boolean

(默认: true) 默认情况下，通过data选项传递进来的数据，如果是一个对象(技术上讲只要不是字符串)，都会处理转化成一个查询字符串，以配合默认内容类型 "application/x-www-form-urlencoded"。如果要发送 DOM 树信息或其它不希望转换的信息，请设置为 false。

#### **scriptCharset**String

只有当请求时dataType为"jsonp"或"script"，并且type是"GET"才会用于强制修改charset。通常只在本地和远程的内容编码不同时使用。

#### **statusCode**map*V1.5*

默认: {}

一组数值的HTTP代码和函数对象，当响应时调用了相应的代码。例如，如果响应状态是404，将触发以下警报：

```
$.ajax({

  statusCode: {404: function() {

    alert('page not found');

  }

});
```



#### **success(data, textStatus, jqXHR)**Function,Array

请求成功后的回调函数。参数：由服务器返回，并根据dataType参数进行处理后的数据；描述状态的字符串。还有 jqXHR（在jQuery 1.4.x的中，XMLHttpRequest） 对象 。在jQuery 1.5， 成功设置可以接受一个函数数组。每个函数将被依次调用。 [Ajax 事件](http://docs.jquery.com/Ajax_Events)。

```
function (data, textStatus) {

    // data 可能是 xmlDoc, jsonObj, html, text, 等等...

    this; // 调用本次AJAX请求时传递的options参数

}
```



#### **traditional**Boolean

如果你想要用传统的方式来序列化数据，那么就设置为true。请参考工具分类下面的jQuery.param 方法。

#### **timeout**Number

设置请求超时时间（毫秒）。此设置将覆盖全局设置。

#### **type**String

(默认: "GET") 请求方式 ("POST" 或 "GET")， 默认为 "GET"。注意：其它 HTTP 请求方法，如 PUT 和 DELETE 也可以使用，但仅部分浏览器支持。

#### **url**String

(默认: 当前页地址) 发送请求的地址。

#### **username**String

用于响应HTTP访问认证请求的用户名

#### **xhr**Function

需要返回一个XMLHttpRequest 对象。默认在IE下是ActiveXObject 而其他情况下是XMLHttpRequest 。用于重写或者提供一个增强的XMLHttpRequest 对象。这个参数在jQuery 1.3以前不可用。

#### **xhrFields**map*V1.5*

一对“文件名-文件值”在本机设置XHR对象。例如，如果需要的话，你可以用它来设置withCredentials为true的跨域请求。

#### 示例



#### 描述:

加载并执行一个 JS 文件。

##### jQuery 代码:

```
$.ajax({

  type: "GET",

  url: "test.js",

  dataType: "script"

});
```

#### 描述:

保存数据到服务器，成功时显示信息。

##### jQuery 代码:

```
$.ajax({

   type: "POST",

   url: "some.php",

   data: "name=John&location=Boston",

   success: function(msg){

     alert( "Data Saved: " + msg );

   }

});
```

#### 描述:

装入一个 HTML 网页最新版本。

##### jQuery 代码:

```
$.ajax({

  url: "test.html",

  cache: false,

  success: function(html){

    $("#results").append(html);

  }

});
```

#### 描述:

同步加载数据。发送请求时锁住浏览器。需要锁定用户交互操作时使用同步方式。

##### jQuery 代码:

```
 var html = $.ajax({

  url: "some.php",

  async: false

 }).responseText;
```

#### 描述:

发送 XML 数据至服务器。设置 processData 选项为 false，防止自动转换数据格式。

##### jQuery 代码:

```
 var xmlDocument = [create xml document];

 $.ajax({

   url: "page.php",

   processData: false,

   data: xmlDocument,

   success: handleResponse

 });
```



### load(url, *[data]*, *[callback]*)

#### 概述

载入远程 HTML 文件代码并插入至 DOM 中。

默认使用 GET 方式 - 传递附加参数时自动转换为 POST 方式。jQuery 1.2 中，可以指定选择符，来筛选载入的 HTML 文档，DOM 中将仅插入筛选出的 HTML 代码。语法形如 "url #some > selector"。请查看示例。

#### 参数

#### **url,[data,[callback]]**String,Map/String,Callback*V1.0*

**url**:待装入 HTML 网页网址。

**data**:发送至服务器的 key/value 数据。在jQuery 1.3中也可以接受一个字符串了。

**callback**:载入成功时回调函数。

#### 示例



#### 描述:

加载文章侧边栏导航部分至一个无序列表。

##### HTML 代码:

```
<b>jQuery Links:</b>
<ul id="links"></ul>
```

##### jQuery 代码:

```
$("#links").load("/Main_Page #p-Getting-Started li");
```

#### 描述:

加载 feeds.html 文件内容。

##### jQuery 代码:

```
$("#feeds").load("feeds.html");
```

#### 描述:

同上，但是以 POST 形式发送附加参数并在成功时显示信息。

##### jQuery 代码:

```
 $("#feeds").load("feeds.php", {limit: 25}, function(){
   alert("The last 25 entries in the feed have been loaded");
 });
```



### jQuery.get(url, *[data]*, *[callback]*, *[type]*)

#### 概述

通过远程 HTTP GET 请求载入信息。

这是一个简单的 GET 请求功能以取代复杂 $.ajax 。请求成功时可调用回调函数。如果需要在出错时执行函数，请使用 $.ajax。

#### 参数

#### **url,[data],[callback],[type]**String,Map,Function,String*V1.0*

**url**:待载入页面的URL地址

**data**:待发送 Key/value 参数。

**callback**:载入成功时回调函数。

**type**:返回内容格式，xml, html, script, json, text, _default。

#### 示例



#### 描述:

请求 test.php 网页，忽略返回值。

##### jQuery 代码:

```
$.get("test.php");
```

#### 描述:

请求 test.php 网页，传送2个参数，忽略返回值。

##### jQuery 代码:

```
$.get("test.php", { name: "John", time: "2pm" } );
```

#### 描述:

显示 test.php 返回值(HTML 或 XML，取决于返回值)。

##### jQuery 代码:

```
$.get("test.php", function(data){
  alert("Data Loaded: " + data);
});
```

#### 描述:

显示 test.cgi 返回值(HTML 或 XML，取决于返回值)，添加一组请求参数。

##### jQuery 代码:

```
$.get("test.cgi", { name: "John", time: "2pm" },
  function(data){
    alert("Data Loaded: " + data);
  });
```



#### jQuery.getJSON(url, *[data]*, *[callback]*)

#### 概述

通过 HTTP GET 请求载入 JSON 数据。

在 jQuery 1.2 中，您可以通过使用[JSONP](http://bob.pythonmac.org/archives/2005/12/05/remote-json-jsonp/)形式的回调函数来加载其他网域的JSON数据，如 "myurl?callback=?"。jQuery 将自动替换 ? 为正确的函数名，以执行回调函数。 注意：此行以后的代码将在这个回调函数执行前执行。

#### 参数

#### **url,[data],[callback]**String,Map,Function*V1.0*

**url**:发送请求地址。

**data**:待发送 Key/value 参数。

**callback**:载入成功时回调函数。

#### 示例



#### 描述:

从 Flickr JSONP API 载入 4 张最新的关于猫的图片。

##### HTML 代码:

```
<div id="images"></div>
```

##### jQuery 代码:

```
$.getJSON("http://api.flickr.com/services/feeds/photos_public.gne?tags=cat&tagmode=any&format
=json&jsoncallback=?", function(data){
  $.each(data.items, function(i,item){
    $("<img/>").attr("src", item.media.m).appendTo("#images");
    if ( i == 3 ) return false;
  });
});
```

#### 描述:

从 test.js 载入 JSON 数据并显示 JSON 数据中一个 name 字段数据。

##### jQuery 代码:

```
$.getJSON("test.js", function(json){
  alert("JSON Data: " + json.users[3].name);
});
```

#### 描述:

从 test.js 载入 JSON 数据，附加参数，显示 JSON 数据中一个 name 字段数据。

##### jQuery 代码:

```
$.getJSON("test.js", { name: "John", time: "2pm" }, function(json){
  alert("JSON Data: " + json.users[3].name);
});
```



### jQuery.getScript(url, *[callback]*)

#### 概述

通过 HTTP GET 请求载入并执行一个 JavaScript 文件。

jQuery 1.2 版本之前，getScript 只能调用同域 JS 文件。 1.2中，您可以跨域调用 JavaScript 文件。注意：Safari 2 或更早的版本不能在全局作用域中同步执行脚本。如果通过 getScript 加入脚本，请加入延时函数。

#### 参数

#### **url,[callback]**String,Function*V1.0*

**url**:待载入 JS 文件地址。

**callback**:成功载入后回调函数。

#### 示例



#### 描述:

载入 <a title="http://jquery.com/plugins/project/color" class="external text" href="http://jquery.com/plugins/project/color">jQuery 官方颜色动画插件</a> 成功后绑定颜色变化动画。

##### HTML 代码:

```
<button id="go">» Run</button>
<div class="block"></div>
```

##### jQuery 代码:

```
jQuery.getScript("http://dev.jquery.com/view/trunk/plugins/color/jquery.color.js", function(){
  $("#go").click(function(){
    $(".block").animate( { backgroundColor: 'pink' }, 1000)
      .animate( { backgroundColor: 'blue' }, 1000);
  });
});
```

#### 描述:

加载并执行 test.js。

##### jQuery 代码:

```
$.getScript("test.js");
```

#### 描述:

加载并执行 test.js ，成功后显示信息。

##### jQuery 代码:

```
$.getScript("test.js", function(){
  alert("Script loaded and executed.");
});
```



### jQuery.post(url, *[data]*, *[callback]*, *[type]*)

#### 概述

通过远程 HTTP POST 请求载入信息。

这是一个简单的 POST 请求功能以取代复杂 $.ajax 。请求成功时可调用回调函数。如果需要在出错时执行函数，请使用 $.ajax。

#### 参数

#### **url,[data],[callback],[type]**String,Map,Function,String*V1.0*

**url**:发送请求地址。

**data**:待发送 Key/value 参数。

**callback**:发送成功时回调函数。

**type**:返回内容格式，xml, html, script, json, text, _default。

#### 示例



#### 1描述:

请求 test.php 网页，忽略返回值：

##### jQuery 代码:

```
$.post("test.php");
```

#### 2描述:

请求 test.php 页面，并一起发送一些额外的数据（同时仍然忽略返回值）：

##### jQuery 代码:

```
$.post("test.php", { name: "John", time: "2pm" } );
```

#### 3描述:

向服务器传递数据数组（同时仍然忽略返回值）：

##### jQuery 代码:

```
$.post("test.php", { 'choices[]': ["Jon", "Susan"] });
```

#### 4描述:

使用 ajax 请求发送表单数据：

##### jQuery 代码:

```
$.post("test.php", $("#testform").serialize());
```

#### 5描述:

输出来自请求页面 test.php 的结果（HTML 或 XML，取决于所返回的内容）：

##### jQuery 代码:

```
$.post("test.php", function(data){
   alert("Data Loaded: " + data);
 });
```

#### 6描述:

向页面 test.php 发送数据，并输出结果（HTML 或 XML，取决于所返回的内容）：

##### jQuery 代码:

```
$.post("test.php", { name: "John", time: "2pm" },
   function(data){
     alert("Data Loaded: " + data);
   });
```

#### 7描述:

获得 test.php 页面的内容，并存储为 XMLHttpResponse 对象，并通过 process() 这个 JavaScript 函数进行处理：

##### jQuery 代码:

```
$.post("test.php", { name: "John", time: "2pm" },
   function(data){
     process(data);
   }, "xml");
```

#### 8描述:

获得 test.php 页面返回的 json 格式的内容：：

##### jQuery 代码:

```
$.post("test.php", { "func": "getNameAndTime" },
   function(data){
     alert(data.name); // John
     console.log(data.time); //  2pm
   }, "json");
```



### ajaxComplete(callback)

#### 概述

AJAX 请求完成时执行函数。Ajax 事件。

XMLHttpRequest 对象和设置作为参数传递给回调函数。

#### 参数

#### **callback**Function*V1.0*

待执行函数

#### 示例



#### 描述:

AJAX 请求完成时执行函数。

##### jQuery 代码:

```
 $("#msg").ajaxComplete(function(event,request, settings){
   $(this).append("<li>请求完成.</li>");
 });
```

#### 描述:

当 AJAX 请求正在进行时显示“正在加载”的指示：

##### jQuery 代码:

```
$("#txt").ajaxStart(function(){
  $("#wait").css("display","block");
});
$("#txt").ajaxComplete(function(){
  $("#wait").css("display","none");
});
```



### ajaxError(callback)

#### 概述

AJAX 请求发生错误时执行函数。Ajax 事件。

XMLHttpRequest 对象和设置作为参数传递给回调函数。捕捉到的错误可作为最后一个参数传递。

#### 参数

#### **callback**Function*V1.0*

待执行函数

```
function (event, XMLHttpRequest, ajaxOptions, thrownError) {
      // thrownError 只有当异常发生时才会被传递
      this; // 监听的 dom 元素
}
```



#### 示例



#### 描述:

AJAX 请求失败时显示信息。

##### jQuery 代码:

```
$("#msg").ajaxError(function(event,request, settings){
     $(this).append("<li>出错页面:" + settings.url + "</li>");
});
```



### ajaxSend(callback)

#### 概述

AJAX 请求发送前执行函数。Ajax 事件。

XMLHttpRequest 对象和设置作为参数传递给回调函数。

#### 参数

#### **callback**Function*V1.0*

待执行函数

#### 示例



#### 描述:

AJAX 请求发送前显示信息。

##### jQuery 代码:

```
 $("#msg").ajaxSend(function(evt, request, settings){
   $(this).append("<li>开始请求: " + settings.url + "</li>");
 });
```



### ajaxStart(callback)

#### 概述

AJAX 请求开始时执行函数。Ajax 事件。

#### 参数

#### **callback**Function*V1.0*

待执行函数

#### 示例



#### 描述:

AJAX 请求开始时显示信息。

##### jQuery 代码:

```
 $("#loading").ajaxStart(function(){
   $(this).show();
 });
```



### ajaxStop(callback)

#### 概述

AJAX 请求结束时执行函数。Ajax 事件。

#### 参数

#### **callback**Function*V1.0*

待执行函数

#### 示例



#### 描述:

AJAX 请求结束后隐藏信息。

##### jQuery 代码:

```
 $("#loading").ajaxStop(function(){
   $(this).hide();
 });
```



### ajaxSuccess(callback)

#### 概述

AJAX 请求成功时执行函数。Ajax 事件。

XMLHttpRequest 对象和设置作为参数传递给回调函数。

#### 参数

#### **callback**Function*V1.0*

待执行函数

#### 示例



#### 描述:

当 AJAX 请求成功后显示消息。

##### jQuery 代码:

```
 $("#msg").ajaxSuccess(function(evt, request, settings){
   $(this).append("<li>请求成功!</li>");
 });
```



### jQuery.ajaxPrefilter( [dataTypes] , handler(options, originalOptions, jqXHR) )

#### 概述

在发送每个请求之前以及在$ .ajax（）处理它们之前，处理自定义Ajax选项或修改现有选项。

参数见'$ .ajax'说明。

#### 参数

#### **[数据类型]***V1.5*

包含一个或多个以空格分隔的dataTypes的可选字符串

####  **处理程序（选项，originalOptions，jqXHR）***V1.5*

为将来的Ajax请求设置默认值的处理程序。

#### 示例



#### 描述：

使用$ .ajaxPrefilter（）进行的典型预过滤器注册如下所示：

```
$ .ajaxPrefilter（function（options，originalOptions，jqXHR）{ 
   //修改选项，控制originalOptions，存储jqXHR等 
 }）;
```

##### 哪里：

- *选项* 是请求选项
- *ooriginalOptions* 是提供给ajax方法的选项，未经修改，因此没有*ajaxSettings的*默认值 
- *ojqXHR* 是请求的jqXHR对象



#### 描述：

当需要处理自定义选项时，预过滤器非常适合。例如，给定以下代码，如果自定义abortOnRetry选项设置为true，则对$ .ajax（）的调用将自动中止对同一URL的请求：

```
var currentRequests = {};    
$ .ajaxPrefilter（function（options，originalOptions，jqXHR）{
    如果（options.abortOnRetry）{
      如果（currentRequests [options.url]）{
        currentRequests [options.url] .abort（）;
      }
      currentRequests [options.url] = jqXHR;
    }
}）;
```

#### 描述：

预过滤器还可用于修改现有选项。例如，以下代理通过http://mydomain.net/proxy/跨域请求：

```
$ .ajaxPrefilter（function（options）{
    如果（options.crossDomain）{
      options.url =“ http://mydomain.net/proxy/” + encodeURIComponent（options.url）;
      options.crossDomain = false;
    }
  }）;
```

#### 描述：

如果提供了可选的dataTypes参数，则预过滤器将仅应用于具有指定dataTypes的请求。例如，以下内容仅将给定的预过滤器应用于JSON和脚本请求：

```
$ .ajaxPrefilter（“ json脚本”，function（选项，originalOptions，jqXHR）{
    //修改选项，控制originalOptions，存储jqXHR等
  }）;
```

#### 描述：

$ .ajaxPrefilter（）方法还可以通过返回该数据类型来将请求重定向到另一个数据类型。例如，如果URL具有在自定义isActuallyScript（）函数中定义的某些特定属性，则以下内容将请求设置为“脚本”：

```
$ .ajaxPrefilter（function（options）{
    如果（isActuallyScript（options.url））{
      返回“脚本”；
    }
  }）;
```

这样不仅可以确保将请求视为“脚本”，而且还可以确保将特定附加到脚本dataType的所有预过滤器都应用于该请求。



### jQuery.ajaxSetup(*[options]*)

#### 概述

设置全局 AJAX 默认选项。

参数见 '$.ajax' 说明。

#### 参数

#### **options** Object*V1.1*

选项设置。所有设置项均为可选设置。.

#### 示例



#### 描述:

设置 AJAX 请求默认地址为 "/xmlhttp/"，禁止触发全局 AJAX 事件，用 POST 代替默认 GET 方法。其后的 AJAX 请求不再设置任何选项参数。

##### jQuery 代码:

```
$.ajaxSetup({
  url: "/xmlhttp/",
  global: false,
  type: "POST"
});
$.ajax({ data: myData });
```



### serialize()

#### 概述

序列表表格内容为字符串。

#### 示例



#### 描述:

序列表表格内容为字符串，用于 Ajax 请求。

##### HTML 代码:

```
<p id="results"><b>Results: </b> </p>
<form>
  <select name="single">
    <option>Single</option>
    <option>Single2</option>
  </select>
  <select name="multiple" multiple="multiple">
    <option selected="selected">Multiple</option>
    <option>Multiple2</option>
    <option selected="selected">Multiple3</option>
  </select><br/>
  <input type="checkbox" name="check" value="check1"/> check1
  <input type="checkbox" name="check" value="check2" checked="checked"/> check2
  <input type="radio" name="radio" value="radio1" checked="checked"/> radio1
  <input type="radio" name="radio" value="radio2"/> radio2
</form>
```

##### jQuery 代码:

```
$("#results").append( "<tt>" + $("form").serialize() + "</tt>" );
```



### serializeArray()

#### 概述

序列化表格元素 (类似 '.serialize()' 方法) 返回 JSON 数据结构数据。

'''注意'''，此方法返回的是JSON对象而非JSON字符串。需要使用插件或者第三方库进行字符串化操作。



返回的JSON对象是由一个对象数组组成的，其中每个对象包含一个或两个名值对——name参数和value参数（如果value不为空的话）。举例来说：



```
 [ 
     {name: 'firstname', value: 'Hello'}, 
     {name: 'lastname', value: 'World'},
     {name: 'alias'}, // this one was empty
  ]
```



#### 示例



#### 描述:

取得表单内容并插入到网页中。

##### HTML 代码:

```
<p id="results"><b>Results:</b> </p>
<form>
  <select name="single">
    <option>Single</option>
    <option>Single2</option>
  </select>
  <select name="multiple" multiple="multiple">
    <option selected="selected">Multiple</option>
    <option>Multiple2</option>
    <option selected="selected">Multiple3</option>
  </select><br/>
  <input type="checkbox" name="check" value="check1"/> check1
  <input type="checkbox" name="check" value="check2" checked="checked"/> check2
  <input type="radio" name="radio" value="radio1" checked="checked"/> radio1
  <input type="radio" name="radio" value="radio2"/> radio2
</form>
```

##### jQuery 代码:

```
var fields = $("select, :radio").serializeArray();
jQuery.each( fields, function(i, field){
  $("#results").append(field.value + " ");
});
```



