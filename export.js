function exportMarkdown(id){


    let archives =
    loadArchives();



    let item =
    archives.find(
        r=>r.id===id
    );



    if(!item){

        alert("没有找到这个阅读档案");

        return;

    }





    let md = `

# ${item.title || "未命名阅读"}



## 基本信息


来源：
${item.source || "无"}



开始时间：

${new Date(item.startTime).toLocaleString()}



结束时间：

${
item.endTime
?
new Date(item.endTime).toLocaleString()
:
"未结束"
}



## 阅读时间


总时间：

${Math.floor(item.duration/60)}分钟
${item.duration%60}秒



有效阅读时间：

${Math.floor((item.effectiveDuration||0)/60)}
分钟



## 标签


${
(item.tags||[])
.map(t=>"#" + t)
.join(" ")
}



## 摘录


${
(item.excerpts||[])
.map(
(e,index)=>
`
${index+1}.
${e.content}

`
)
.join("")
}




## 我的思考


${
(item.thoughts||[])
.map(
(t,index)=>
`
${index+1}.
${t.content}

`
)
.join("")
}




## 图片


${
(item.images||[])
.length
?
"包含图片："+item.images.length+"张"
:
"无图片"
}



---

由「个人阅读与思考助手」生成

`;





    let blob =
    new Blob(
        [md],
        {
            type:
            "text/markdown;charset=utf-8"
        }
    );




    let url =
    URL.createObjectURL(blob);



    let a =
    document.createElement("a");



    a.href=url;



    a.download =
    (item.title || "阅读档案")
    +
    ".md";



    a.click();



    URL.revokeObjectURL(url);


}