$(function () {
    // 0.监听内容的时时输入
    $("body").delegate(".comment","propertychange input", function () {
        // 判断是否输入了内容
        if($(this).val().length > 0){
            // 让按钮可用
            $(".send").prop("disabled", false);
        }else{
            // 让按钮不可用
            $(".send").prop("disabled", true);
        }
    });

    // var number = $.getCookie("pageNumber") || 1;
    var number = window.location.hash.substring(1) || 1;
    getMsgPage();
    function getMsgPage(){
        $(".page").html("");
        // weibo.php?act=get_page_count	获取页数
        $.ajax({
            type:"get",
            url:"weibo.php",
            data:"act=get_page_count",
            success: function (msg) {
                // console.log(msg);
                var obj = eval("("+msg+")");
                for(var i = 0; i < obj.count; i++){
                    var $a = $("<a href=\"javascript:;\">"+(i+1)+"</a>");
                    if(i === (number-1)){
                        $a.addClass("cur");
                    }
                    $(".page").append($a);
                }
            },
            error: function (xhr) {
                alert(xhr.status);
            }
        });
    }

    // console.log(number);
    getMsgList(number);
    function getMsgList(number){
        $(".messageList").html("");
        $.ajax({
            type:"get",
            url:"weibo.php",
            data:"act=get&page="+number,
            success: function (msg) {
                var obj = eval("("+msg+")");
                $.each(obj, function (key, value) {
                    // console.log(value);
                    // 根据内容创建节点
                    var $weibo = createEle(value);
                    $weibo.get(0).obj = value;
                    // 插入微博
                    $(".messageList").append($weibo);
                });
            },
            error: function (xhr) {
                alert(xhr.status);
            }
        });
    }

    // 1.监听发布按钮的点击
    $(".send").click(function () {
        // 拿到用户输入的内容
        var $text = $(".comment").val();
        $.ajax({
            type:"get",
            url:"weibo.php",
            data:"act=add&content="+$text,
            success: function (msg) {
                /*
                {error: 0, id: 新添加内容的ID, time: 添加时间, acc: 点赞数, ref: 点踩数}
                非标准的JSON字符串: {error: 0, id: 1, time: 1526541587, acc: 0, ref: 0}
                标准的JSON字符串: {"error": "0", "id": "1", "time": "1526541587", "acc": "0", "ref": "0"}
                VM179:1 Uncaught SyntaxError: Unexpected token e in JSON at position 1
                */
                var obj = eval("("+msg+")");
                obj.content = $text;
                // console.log(obj);
                // 根据内容创建节点
                var $weibo = createEle(obj);
                $weibo.get(0).obj = obj;
                // 插入微博
                $(".messageList").prepend($weibo);
                // 清空输入框的内容
                $(".comment").val("");
                // 重新获取一下页码
                getMsgPage();
                // 删除最前面一条微博
                if($(".info").length > 6){
                    $(".info:last-child").remove();
                }
            },
            error: function (xhr) {
                alert(xhr.status);
            }
        });
    });
    // 2.监听顶点击
    $("body").delegate(".infoTop", "click", function () {
        $(this).text(parseInt($(this).text()) + 1);
        var obj = $(this).parents(".info").get(0).obj;
        // weibo.php?act=acc&id=12			顶某一条数据
        $.ajax({
            type:"get",
            url:"weibo.php",
            data:"act=acc&id="+obj.id,
            success: function (msg) {
                console.log(msg);
            },
            error: function (xhr) {
                alert(xhr.status);
            }
        });
    });
    // 3.监听踩点击
    $("body").delegate(".infoDown", "click", function () {
        $(this).text(parseInt($(this).text()) + 1);
        var obj = $(this).parents(".info").get(0).obj;
        // weibo.php?act=ref&id=12			踩某一条数据
        $.ajax({
            type:"get",
            url:"weibo.php",
            data:"act=ref&id="+obj.id,
            success: function (msg) {
                console.log(msg);
            },
            error: function (xhr) {
                alert(xhr.status);
            }
        });
    });
    // 4.监听删除点击
    $("body").delegate(".infoDel", "click", function () {
        $(this).parents(".info").remove();
        var obj = $(this).parents(".info").get(0).obj;
        // weibo.php?act=del&id=12			删除一条数据
        $.ajax({
            type:"get",
            url:"weibo.php",
            data:"act=del&id="+obj.id,
            success: function (msg) {
                console.log(msg);
            },
            error: function (xhr) {
                alert(xhr.status);
            }
        });
        // 重新获取当前这一页数据
        // console.log($(".cur").html());
        getMsgList($(".cur").html());
    });
    // 5.监听页码点击
    $("body").delegate(".page>a", "click", function () {
        $(this).addClass("cur");
        $(this).siblings().removeClass("cur");
        // console.log($(this).html());
        getMsgList($(this).html());
        // 保存当前点击的页码
        // $.addCookie("pageNumber", $(this).html());
        window.location.hash = $(this).html();
    });
    // 创建节点方法
    function createEle(obj) {
        var $weibo = $("<div class=\"info\">\n" +
            "            <p class=\"infoText\">"+obj.content+"</p>\n" +
            "            <p class=\"infoOperation\">\n" +
            "                <span class=\"infoTime\">"+formartDate(obj.time)+"</span>\n" +
            "                <span class=\"infoHandle\">\n" +
            "                    <a href=\"javascript:;\" class='infoTop'>"+obj.acc+"</a>\n" +
            "                    <a href=\"javascript:;\" class='infoDown'>"+obj.ref+"</a>\n" +
            "                    <a href=\"javascript:;\" class='infoDel'>删除</a>\n" +
            "                </span>\n" +
            "            </p>\n" +
            "        </div>");
        return $weibo;
    }
    // 生成时间方法
    function formartDate(time) {
        var date = new Date(time * 1000);
        // 2018-4-3 21:30:23
        var arr = [date.getFullYear() + "-",
            date.getMonth() + 1 + "-",
            date.getDate() + " ",
            date.getHours() + ":",
            date.getMinutes() + ":",
            date.getSeconds()];
        return arr.join("");
    }
});