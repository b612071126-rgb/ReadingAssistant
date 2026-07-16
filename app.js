// ==========================
// 全局
// ==========================


let currentDetail = null;


let lastPage = "readerPanel";


let records = loadArchives();





// ==========================
// 页面控制
// ==========================


function hideAllPages(){


    let pages = [

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









function openHome(){


    hideAllPages();



    document.getElementById(
        "readerPanel"
    ).style.display="block";



    showStats();


}









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









// ==========================
// 结束阅读
// ==========================


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



    if(!box){

        return;

    }



    box.innerHTML="";





    records.forEach(item=>{



        box.innerHTML += `



<div class="record">


<h3>

${item.title || "未命名"}

</h3>



<p>

来源：

${item.source || "无"}

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

阅读：

${Math.floor(item.duration/60)}
分钟
${item.duration%60}
秒

</p>





<button onclick="openDetail('${item.id}')">

查看详情

</button>




<button onclick="exportMarkdown('${item.id}')">

导出Markdown

</button>




<button onclick="deleteArchive('${item.id}')">

删除

</button>



</div>



`;



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



    if(!item){

        return;

    }



    currentDetail=item;



    hideAllPages();



    document.getElementById(
        "detailPage"
    ).style.display="block";





    document.getElementById(
        "detailContent"
    ).innerHTML=`

<h2>

${item.title || "未命名"}

</h2>



<p>

来源：

${item.source || ""}

</p>



<p>

阅读时间：

${Math.floor(item.duration/60)}
分钟
${item.duration%60}
秒

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

图片资料

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



return `

<img 
src="${src}"
class="archive-image">

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
// 搜索
// ==========================


function searchArchives(){



    let keyword =
    document.getElementById(
        "searchInput"
    ).value;



    let all =
    loadArchives();



    if(!keyword){


        records=all;


    }
    else{


        records =
        all.filter(item=>{


            let text =
            JSON.stringify(item);



            return text.includes(keyword);



        });



    }



    let box =
    document.getElementById(
        "records"
    );



    box.innerHTML="";



    records.forEach(item=>{


        box.innerHTML += `


<div class="record">


<h3>
${item.title || "未命名"}
</h3>


<p>

${item.source || ""}

</p>


<button onclick="openDetail('${item.id}')">

查看详情

</button>



</div>


`;


    });



}









// ==========================
// 删除
// ==========================


function deleteArchive(id){



    let ok =
    confirm(
    "确定删除吗？"
    );



    if(!ok){

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
// 统计
// ==========================


function showStats(){



    let archives =
    loadArchives();



    let total=0;



    let quotes=0;



    let thoughts=0;



    archives.forEach(item=>{


        total +=
        Number(item.duration)||0;



        quotes +=
        (item.excerpts||[]).length;



        thoughts +=
        (item.thoughts||[]).length;



    });





    let box =
    document.getElementById(
        "stats"
    );



    if(!box){

        return;

    }




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

累计时间：

${Math.floor(total/3600)}
小时

${Math.floor(total%3600/60)}
分钟

</p>



<p>

摘录：

${quotes}

条

</p>



<p>

思考：

${thoughts}

条

</p>



`;



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


        time:new Date()



    });



    saveNotes(notes);



    alert(
    "保存成功"
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