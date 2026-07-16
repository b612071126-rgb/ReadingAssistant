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
// 页面隐藏
// ==========================


function hideAllPages(){



    let pages=[


        "readerPanel",

        "readingPage",

        "archivePage",

        "detailPage",

        "quickPage",

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



    startReading();



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


        box.innerHTML+=`


<div class="record">


<h3>

${item.title || "未命名"}

</h3>



<p>

来源：

${item.source||""}

</p>



<p>

标签：

${
(item.tags||[])
.map(t=>t.name||t)
.join(" ")
}

</p>



<p>

阅读时间：

${Math.floor(item.duration/60)}
分钟

${item.duration%60}
秒

</p>




<button onclick="openDetail('${item.id}')">

查看

</button>




<button onclick="exportMarkdown('${item.id}')">

导出

</button>



<button onclick="deleteArchive('${item.id}')">

删除

</button>



</div>


`;



    });


}









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


<h2>

${item.title||"未命名"}

</h2>



<p>

来源：

${item.source||""}

</p>



<p>

标签：

${
(item.tags||[])
.map(t=>t.name||t)
.join(" ")
}

</p>



<h3>

摘录

</h3>


<p>

${
(item.excerpts||[])
.map(e=>e.content)
.join("<br><br>")
}

</p>




<h3>

思考

</h3>


<p>

${
(item.thoughts||[])
.map(t=>t.content)
.join("<br><br>")
}

</p>



<h3>

图片

</h3>



${
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



    if(!key){


        records=archives;


    }
    else{


        records =
        archives.filter(
            item=>
            JSON.stringify(item)
            .includes(key)
        );


    }




    let box =
    document.getElementById(
        "records"
    );



    box.innerHTML="";



    records.forEach(item=>{


        box.innerHTML+=`


<div class="record">


<h3>

${item.title||"未命名"}

</h3>



<button onclick="openDetail('${item.id}')">

查看

</button>


</div>


`;


    });



}









// ==========================
// 统计
// ==========================


function showStats(){



    let archives =
    loadArchives();



    let total=0;


    let quote=0;


    let thought=0;



    archives.forEach(item=>{


        total+=
        Number(item.duration)||0;



        quote+=
        (item.excerpts||[]).length;



        thought+=
        (item.thoughts||[]).length;



    });




    let box =
    document.getElementById(
        "stats"
    );



    if(box){


        box.innerHTML=`

<h3>
阅读成长
</h3>


<p>
阅读：
${archives.length}
篇
</p>


<p>
时间：
${Math.floor(total/3600)}
小时
</p>


<p>
摘录：
${quote}
条
</p>


<p>
思考：
${thought}
条
</p>

`;

    }


}








// ==========================
// 速记系统
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


            box.innerHTML =
            formatTime(seconds);


        }


    },1000);



}








function formatTime(seconds){



    let h =
    Math.floor(seconds/3600);



    let m =
    Math.floor(
        (seconds%3600)/60
    );



    let s =
    seconds%60;



    return `${String(h).padStart(2,"0")}:
${String(m).padStart(2,"0")}:
${String(s).padStart(2,"0")}`;


}








function saveQuickNote(){



    let content =
    document.getElementById(
        "quickContent"
    ).value;



    if(!content){


        alert(
        "请输入内容"
        );


        return;


    }




    let notes =
    loadNotes();



    notes.unshift({


        id:crypto.randomUUID(),


        content:content,


        duration:quickDuration,


        time:new Date()


    });



    saveNotes(notes);



    alert(
    "速记保存成功"
    );



}









// ==========================
// 说明
// ==========================


function openHelp(){



    lastPage="readerPanel";



    hideAllPages();



    document.getElementById(
        "helpPage"
    ).style.display="block";



}







showStats();