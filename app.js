// ==========================
// 页面状态
// ==========================

let lastPage="readerPanel";

let records=[];

// 速记计时

let quickTimer=null;

let quickStartTime=null;

let quickDuration=0;

// ==========================
// 今日句子
// ==========================

function showTodayQuote(){

let quotes=[  


    "阅读，让生活拥有更多可能。",  

    "真正的阅读，是改变理解世界的方式。",  

    "知识不会自动改变人生，思考才会。",  

    "每一次记录，都是未来自己的资产。",  

    "阅读的终点，不是记住，而是形成自己的理解。"  


];  



let box =  
document.getElementById(  
    "todayQuote"  
);  



if(box){  


    let index =  
    Math.floor(  
        Math.random()*quotes.length  
    );  


    box.innerHTML =  
    quotes[index];  


}

}

// ==========================
// 隐藏页面
// ==========================

function hideAllPages(){

let pages=[  


    "readerPanel",  

    "readingPage",  

    "archivePage",  

    "detailPage",  

    "quickPage",  
  
    "quickListPage",
   
    "helpPage"  


];  



pages.forEach(id=>{  


    let page =  
    document.getElementById(id);  



    if(page){  

        page.style.display="none";  

    }  


});

}

// ==========================
// 首页
// ==========================

function openHome(){

hideAllPages();  


document.getElementById(  
    "readerPanel"  
).style.display="block";  



showStats();  

showTodayQuote();

}

// ==========================
// 阅读
// ==========================

function openReader(){

lastPage="readerPanel";  


hideAllPages();  



document.getElementById(  
    "readingPage"  
).style.display="block";  


clearReadingForm();

startReading();

}


// ==========================
// 清空新的阅读数据
// ==========================

function clearReadingForm(){


    document.getElementById("title").value="";


    document.getElementById("source").value="";


    document.getElementById("quote").value="";


    document.getElementById("thought").value="";


    // 清除标签选择状态

    let buttons =
    document.querySelectorAll("#tagBox button");


    buttons.forEach(btn=>{

        btn.classList.remove("selected");

    });


}



function goBack(){

hideAllPages();  


document.getElementById(  
    lastPage  
).style.display="block";

}

function stopTimer(){

let result =  
finishReading();  



if(result){  


    alert(  
    "阅读结束，档案已保存"  
    );  


}  



openArchive();

}

// ==========================
// 档案
// ==========================

function openArchive(){

lastPage="readerPanel";  


hideAllPages();  



document.getElementById(  
    "archivePage"  
).style.display="block";  



showRecords();

}

function showRecords(){

records =  
loadArchives();  



let box =  
document.getElementById(  
    "records"  
);  



if(!box)return;  



box.innerHTML="";  



records.forEach(item=>{  


    let tags =  
    (item.tags||[])  
    .map(t=>t.name||t)  
    .join(" ");  



    box.innerHTML+=`

<div class="record">  <h3>  ${item.important?"⭐ ":""}

${item.title||"未命名"}

</h3>  <p>  来源：

${item.source||""}

</p>  <p>  标签：

${tags}

</p>  <p>  📅

${item.startTime?
new Date(item.startTime)
.toLocaleDateString()
:""}

</p>  <p>  ⏱

${Math.floor(item.duration/60)}
分钟

${item.duration%60}
秒

</p>  <button onclick="openDetail('${item.id}')">  查看

</button>  <button onclick="toggleImportant('${item.id}')">  ${item.important?"取消重要":"标记重要"}

</button>  <button onclick="exportMarkdown('${item.id}')">  导出

</button>  <button onclick="deleteArchive('${item.id}')">  删除

</button>  </div>  `;

});

}

// ==========================
// 详情
// ==========================

function openDetail(id){

let archives =  
loadArchives();  



let item =  
archives.find(  
    a=>a.id===id  
);  



if(!item)return;  



hideAllPages();  



document.getElementById(  
    "detailPage"  
).style.display="block";  




document.getElementById(  
    "detailContent"  
).innerHTML=`

<h2>  阅读详情

</h2>  <h3>  ${item.title||"未命名"}

</h3>  <p>  来源：

${item.source||""}

</p>  <p>  📅 阅读日期：

${item.startTime?
new Date(item.startTime)
.toLocaleString()
:""}

</p>  <p>  ⏱ 阅读时长：

${Math.floor(item.duration/60)}
分钟

${item.duration%60}
秒

</p>  <p>  标签：

${
(item.tags||[])
.map(t=>t.name||t)
.join(" ")
}

</p>  <h3>  摘录

</h3>  <p>  ${
(item.excerpts||[])
.map(e=>e.content)
.join("<br><br>")
}

</p>  <h3>  思考

</h3>  <p>  ${
(item.thoughts||[])
.map(t=>t.content)
.join("<br><br>")
}

</p>  <h3>  图片

</h3>  ${
(item.images||[])
.map(img=>{

let src =
typeof img==="string"
?
img
:
img.data;

return`

<img class="archive-image"  
src="${src}">

`

})
.join("")

}

`;

}

function backToArchive(){

openArchive();

}

// ==========================
// 重要标记
// ==========================

function toggleImportant(id){

let archives =  
loadArchives();  



let item =  
archives.find(  
    a=>a.id===id  
);  



if(item){  


    item.important =  
    !item.important;  


}  



saveArchives(archives);  



showRecords();

}

// ==========================
// 删除
// ==========================

function deleteArchive(id){

if(  
!confirm("确定删除吗？")  
){  

    return;  

}  



let archives =  
loadArchives();  



archives =  
archives.filter(  
    a=>a.id!==id  
);  



saveArchives(archives);  



showRecords();

}

// ==========================
// 搜索
// ==========================

function searchArchives(){

let key =  
document.getElementById(  
    "searchInput"  
).value;  



let archives =  
loadArchives();  



records =  
key?  
archives.filter(  
    item=>  
    JSON.stringify(item)  
    .includes(key)  
)  
:  
archives;  



let box =  
document.getElementById(  
    "records"  
);  



box.innerHTML="";  



records.forEach(item=>{  


    box.innerHTML+=`

<div class="record">  <h3>  ${item.title||"未命名"}

</h3>  <button onclick="openDetail('${item.id}')">  查看

</button>  </div>  `;

});

}

// ==========================
// 首页统计
// ==========================

function showStats(){

let archives =  
loadArchives();  



let total=0;  

let quote=0;  

let thought=0;  


let tagCount={};  



archives.forEach(item=>{  


    total+=  
    Number(item.duration)||0;  


    quote+=  
    (item.excerpts||[]).length;  


    thought+=  
    (item.thoughts||[]).length;  



    (item.tags||[])  
    .forEach(t=>{  


        let name =  
        t.name||t;  


        tagCount[name]=  
        (tagCount[name]||0)+1;  


    });  


});  



let hotTags =  
Object.entries(tagCount)  
.sort(  
    (a,b)=>b[1]-a[1]  
)  
.slice(0,3)  
.map(  
    t=>`${t[0]} ${t[1]}次`  
)  
.join("<br>");  



let box =  
document.getElementById(  
    "stats"  
);  



if(box){  


    box.innerHTML=`

<h3>  
阅读成长  
</h3>  <p>  
📚 阅读：  
${archives.length}  
篇  
</p>  <p>  
⏱ 时间：  
${Math.floor(total/3600)}  
小时  
</p>  <p>  
📝 摘录：  
${quote}  
条  
</p>  <p>  
💡 思考：  
${thought}  
条  
</p>  <p>  
🏷 阅读方向：  
<br>  
${hotTags||"暂无"}  
</p>  `;

}

}

// ==========================
// 速记
// ==========================

function openQuickNote(){

lastPage="readerPanel";  


hideAllPages();  



document.getElementById(  
    "quickPage"  
).style.display="block";  



quickStartTime =  
Date.now();  



clearInterval(  
    quickTimer  
);  



quickTimer =  
setInterval(()=>{  


    let seconds =  
    Math.floor(  
    (Date.now()-quickStartTime)  
    /  
    1000  
    );  



    quickDuration=seconds;  



    let box =  
    document.getElementById(  
        "quickTime"  
    );  



    if(box){  

        box.innerHTML=  
        formatTime(seconds);  

    }  


},1000);

}

function formatTime(seconds){

let h=Math.floor(seconds/3600);  


let m=Math.floor((seconds%3600)/60);  


let s=seconds%60;  



return `${String(h).padStart(2,"0")}:

${String(m).padStart(2,"0")}:
${String(s).padStart(2,"0")}`;

}

function saveQuickNote(){

let content =  
document.getElementById(  
    "quickContent"  
).value;  



if(!content)return;  



let notes =  
loadNotes();  



notes.unshift({  


    id:crypto.randomUUID(),  


    content,  


    duration:quickDuration,  


    time:new Date()  


});  



saveNotes(notes);  



alert(  
"速记保存成功"  
);

}

// 初始化

showTodayQuote();
function openQuickList(){

lastPage="quickPage";  


hideAllPages();  


document.getElementById(  
    "quickListPage"  
).style.display="block";  


showQuickNotes();

}

function showQuickNotes(){

let notes =  
loadNotes();  



let box =  
document.getElementById(  
    "quickRecords"  
);  


if(!box)return;  



box.innerHTML="";  



notes.forEach(note=>{  


    box.innerHTML+=`

<div class="record">  <h3>  ${note.content.substring(0,30)}

</h3>  <p>  时间：

${new Date(note.time).toLocaleString()}

</p>  <p>  记录：

${formatTime(note.duration)}

</p>  <button onclick="deleteQuickNote('${note.id}')">  删除

</button>  </div>  `;

});

}

function deleteQuickNote(id){

let notes =  
loadNotes();  



notes =  
notes.filter(  
    n=>n.id!==id  
);  


saveNotes(notes);  


showQuickNotes();

}

showStats();




// ==========================
// 说明反馈
// ==========================

function openHelp(){

    lastPage="readerPanel";

    hideAllPages();


    document.getElementById(
        "helpPage"
    ).style.display="block";

}




function clearReadingForm(){

document.getElementById("title").value="";

document.getElementById("source").value="";

document.getElementById("quote").value="";

document.getElementById("thought").value="";

document.getElementById("imageInput").value="";


let buttons=document.querySelectorAll("#tagBox button");

buttons.forEach(btn=>{

btn.classList.remove("active");

});


}