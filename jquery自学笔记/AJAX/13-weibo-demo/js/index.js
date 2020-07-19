$(function () {
    // 输入框
    var oText = $(".comment");
    // 发送按钮
    var oBtn  = $(".send");
    // 消息列表
    var oMsgList = $(".messageList");
    // 页码
    var oPage = $(".page");
    // 请求地址
    var url = "weibo.php";

    // 0.监听内容的时时输入
    $("body").delegate(".comment","propertychange input", function () {
        // 判断是否输入了内容
        if($(this).val().length > 0){
            // 让按钮可用
            oBtn.prop("disabled", false);
        }else{
            // 让按钮不可用
            oBtn.prop("disabled", true);
        }
    });

    getPage();
    function getPage(){
        $.ajax({
            type:"get",
            url:"weibo.php",
            data:"act=get_page_count",
            success:function (msg) {
                var obj = eval("("+msg+")");
                oPage.html("");
                for(var i = 0; i < obj.count; i++){
                    var $a = $("<a>"+(i+1)+"</a>");
                    $a.attr({
                       src:"javascript:;",
                       class:"page_number"
                    });
                    oPage.append($a);
                    if(i === 0){
                        $a.addClass("current");
                    }
                }
            },
            error:function (xhr) {
                alert(xhr.status);
            }
        });
    }

    getMsgList(1);
    function getMsgList(number){
        $.ajax({
            type:"get",
            url:"weibo.php",
            data:"act=get&page="+number,
            success:function (msg) {
                var list = eval(msg);
                oMsgList.html("");
                $.each(list,function(key, value){
                    // 根据内容创建节点
                    var $weibo = createEle(value);
                    $weibo.get(0).obj = value;
                    // 插入微博
                    oMsgList.append($weibo);
                });
            },
            error: function (xhr) {
                alert(xhr.status);
            }
        });
    }

    // 1.监听发布按钮的点击
    oBtn.click(function () {
        // 拿到用户输入的内容
        var $text = oText.val();
        // 将微博提交到远程服务器
        $.ajax({
            type:"get",
            url:"weibo.php",
            data: "act=add&content="+$text,
            success:function (msg) {
                // {error: 0, id: 6, time: 1526184841}
                // console.log(msg);
                // var obj = JSON.parse(msg);
               var obj = eval("("+msg+")");
                obj.content = $text;
                // 根据内容创建节点
                var $weibo = createEle(obj);
                $weibo.get(0).obj = obj;
                // 插入微博
                oMsgList.prepend($weibo);
                // 清空输入框
                oText.val("");
                console.log($(".info").length);
                if($(".info").length >= 6){
                    getMsgList(1);
                    getPage();
                }
            },
            error:function (xhr) {
                alert("发布微博失败");
            }
        });
    });

    // 2.监听顶点击
    $("body").delegate(".infoTop", "click", function () {
        var $this = $(this);
        var weibo = $this.parents(".info").get(0);
        $.ajax({
            type:"get",
            url:"weibo.php",
            data:"act=acc&id="+weibo.obj.id,
            success: function(msg) {
                // console.log((msg));
                $this.text(parseInt($this.text()) + 1);
            },
            error:function (xhr) {
                alert(xhr.status);
            }
        });
    });

    // 3.监听踩点击
    $("body").delegate(".infoDown", "click", function () {
        var $this = $(this);
        var weibo = $this.parents(".info").get(0);
        $.ajax({
            type:"get",
            url:"weibo.php",
            data:"act=ref&id="+weibo.obj.id,
            success: function(msg) {
                // console.log((msg));
                $this.text(parseInt($this.text()) + 1);
            },
            error:function (xhr) {
                alert(xhr.status);
            }
        });
    });

    // 4.监听删除点击
    $("body").delegate(".infoDel", "click", function () {
        var $this = $(this);
        var weibo = $this.parents(".info").get(0);
        $.ajax({
            type:"get",
            url:"weibo.php",
            data:"act=del&id="+weibo.obj.id,
            success: function(msg) {
                // console.log((msg));
                $this.parents(".info").remove();
                getMsgList(1);
                getPage();
            },
            error:function (xhr) {
                alert(xhr.status);
            }
        });
    });

    // 5.监听页码点击
    $(".page").delegate(".page_number", "click", function () {
        // 设置选中状态
        $(this).addClass("current");
        // 排它
        $(this).siblings().removeClass("current");
        // 清空原有数据
        oMsgList.html("");
        // 添加新数据
        getMsgList($(this).text());
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