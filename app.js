function hideAllPages(){

    document.getElementById("readerPanel")
    .style.display="none";


    document.getElementById("readingPage")
    .style.display="none";


    document.getElementById("archivePage")
    .style.display="none";

}



let records =
JSON.parse(localStorage.getItem("records"))
|| [];



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



function saveReading(){


let title =
document.getElementById("title").value;


let source =
document.getElementById("source").value;


let quote =
document.getElementById("quote").value;


let thought =
document.getElementById("thought").value;



let reading={


id:Date.now(),


title:title,


source:source,


quote:quote,


thought:thought,


time:
Math.floor(seconds/60),


date:
new Date().toLocaleString()


};



records.push(reading);



localStorage.setItem(
"records",
JSON.stringify(records)
);



alert("保存成功");


showRecords();



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
${item.time}
分钟
</p>


<h4>
摘录
</h4>


<p>
${item.quote}
</p>


<h4>
思考
</h4>


<p>
${item.thought}
</p>


<button onclick="exportMarkdown(${item.id})">
导出Markdown
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


${item.quote}



## 我的思考


${item.thought}



## 阅读时间


${item.time}分钟

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