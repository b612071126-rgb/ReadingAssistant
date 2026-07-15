function exportMarkdown(id){



    let records =
    loadArchives();



    let item =
    records.find(
        r=>r.id===id
    );



    if(!item){


        alert(
            "找不到阅读档案"
        );


        return;


    }






    let markdown = `

# ${item.title || "未命名阅读"}



## 基本信息


来源：

${item.source || "未知"}



阅读日期：

${new Date(item.startTime)
.toLocaleString()}



阅读时间：

${Math.floor(item.duration/60)}
分钟

${item.duration%60}
秒




## 标签


${
(item.tags || [])
.join("、")
}




## 摘录


${
(item.excerpts || [])
.map(
(e,index)=>
`${index+1}. ${e.content}`
)
.join("\n\n")
}





## 我的思考


${
(item.thoughts || [])
.map(
(t,index)=>
`${index+1}. ${t.content}`
)
.join("\n\n")
}







## 图片


图片数量：

${(item.images || []).length}



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
    URL.createObjectURL(
        blob
    );






    let a =
    document.createElement(
        "a"
    );



    a.href=url;



    a.download =

    (item.title || "阅读档案")

    +

    ".md";




    a.click();




    URL.revokeObjectURL(url);



}