// ==========================
// Markdown 导出 v1.1
// ==========================


function exportMarkdown(id){



    let archives =
    loadArchives();



    let item =
    archives.find(
        a=>a.id===id
    );



    if(!item){


        alert(
        "找不到阅读档案"
        );


        return;


    }





    let tags =
    (item.tags || [])
    .map(
        t=>t.name || t
    )
    .join("、");






    let markdown = `

# ${item.title || "未命名阅读"}



${item.important ? "⭐ 重要阅读\n\n" : ""}



## 基本信息



来源：

${item.source || "未知"}



阅读日期：

${
item.startTime
?
new Date(item.startTime)
.toLocaleString()
:
"未知"
}



阅读时长：

${Math.floor(item.duration/60)}
分钟

${item.duration%60}
秒






## 标签



${tags}







## 摘录



${
(item.excerpts||[])
.map(
(e,i)=>
`${i+1}. ${e.content}`
)
.join("\n\n")
}







## 我的思考



${
(item.thoughts||[])
.map(
(t,i)=>
`${i+1}. ${t.content}`
)
.join("\n\n")
}







## 图片资料


${
(item.images||[])
.map(
(img,i)=>{


let src =
typeof img==="string"
?
img
:
img.data;



return `

### 图片 ${i+1}


![图片${i+1}](${src})


`;

}
)
.join("\n\n")
}


`;







    let blob =
    new Blob(

        [
        "\ufeff"+markdown
        ],

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
    (
    item.title || "阅读档案"
    )
    +
    ".md";



    a.click();



    URL.revokeObjectURL(url);



}