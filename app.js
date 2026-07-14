function hideAllPages(){

    document.getElementById("readerPanel")
    .style.display="none";


    document.getElementById("readingPage")
    .style.display="none";


    document.getElementById("archivePage")
    .style.display="none";

}



let records = loadArchives();



// 迁移旧数据

let oldRecords =
JSON.parse(localStorage.getItem("records"))
|| [];


if(
    oldRecords.length > 0 &&
    records.length === 0
){

    records = oldRecords.map(item=>{


        return {

            id:item.id,

            title:item.title,

            source:item.source,

            startTime:new Date(),

            endTime:new Date(),

            duration:item.time || 0,

            excerpts:[
                {
                    content:item.quote || "",
                    time:new Date()
                }
            ],

            thoughts:[
                {
                    content:item.thought || "",
                    time:new Date()
                }
            ],

            tags:[]

        };


    });


    saveArchives(records);


}



function startTimer(){

    startReading();

    alert("开始阅读");

}



function stopTimer(){

    let archive = finishReading();


    if(archive){

        alert(
            "阅读结束，时间："
            +
            archive.duration
            +
            "分钟"
        );
        

        openArchive();

    }

}



function showRecords(){


let box=
document.getElementById("records");


box.innerHTML="";



records.forEach(item=>{


box.innerHTML+=`

<div class="record">


<h3>
${item.title}
</h3>


<p>
来源：
${item.source}
</p>


<p>
阅读时间：
${item.duration}
分钟
</p>


<h4>
摘录
</h4>

<p>
${
item.excerpts
.map(e=>e.content)
.join("<br>")
}
</p>


<h4>
思考
</h4>

<p>
${
item.thoughts
.map(t=>t.content)
.join("<br>")
}
</p>

<button onclick="exportMarkdown(${item.id})">
导出Markdown
</button>

<button onclick="deleteArchive(${item.id})">
删除
</button>

</div>


`;


});


}





function exportMarkdown(id){


let item =
records.find(
r=>r.id===id
);



let md=`

# ${item.title}


来源：
${item.source}


日期：
${item.date}



## 摘录


${
item.excerpts
.map(e=>e.content)
.join("<br>")
}



## 我的思考


${
item.thoughts
.map(t=>t.content)
.join("<br>")
}



## 阅读时间


${item.duration}分钟

`;



let blob=
new Blob(
[md],
{
type:"text/markdown"
}
);



let url=
URL.createObjectURL(blob);



let a=
document.createElement("a");


a.href=url;


a.download=
item.title+".md";


a.click();

}



showRecords();

function openReader(){

alert("openReader运行");


hideAllPages();

document.getElementById(
"readingPage"
).style.display="block";


document.getElementById(
"readerPanel"
).style.display="none";


startTimer();

}



hideAllPages();

document.getElementById(
"readingPage"
).style.display="block";


document.getElementById(
"readerPanel"
).style.display="none";


startTimer();

}



function openArchive(){

hideAllPages();


document.getElementById(
"archivePage"
).style.display="block";


showRecords();

}



function deleteArchive(id){


let result =
confirm("确定删除这个阅读档案吗？");


if(!result){

return;

}


records =
records.filter(
item=>item.id!==id
);



saveArchives(records);


showRecords();


}



function openHome(){

    hideAllPages();


    document.getElementById(
        "readerPanel"
    ).style.display="block";

}