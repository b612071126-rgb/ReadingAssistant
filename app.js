function hideAllPages(){

    document.getElementById("readerPanel")
    .style.display="none";


    document.getElementById("readingPage")
    .style.display="none";


    document.getElementById("archivePage")
    .style.display="none";

}



let lastPage = "readerPanel";

let records = [];



// 初始化

function initApp(){

    records = loadArchives();

    showRecords();

    showStats();

}



initApp();






// =====================
// 打开阅读
// =====================


function openReader(){


    lastPage = "readerPanel";


    hideAllPages();


    document.getElementById(
        "readingPage"
    ).style.display="block";



    startReading();


}






// =====================
// 打开档案
// =====================


function openArchive(){


    lastPage = "readerPanel";


    hideAllPages();


    document.getElementById(
        "archivePage"
    ).style.display="block";



    showRecords();


}







// =====================
// 返回
// =====================


function goBack(){


    if(lastPage){

        hideAllPages();


        document.getElementById(
            lastPage
        ).style.display="block";


    }

}






function openHome(){


    hideAllPages();


    document.getElementById(
        "readerPanel"
    ).style.display="block";


}









// =====================
// 档案显示
// =====================


function showRecords(){


    records = loadArchives();



    let box =
    document.getElementById("records");



    if(!box){

        return;

    }



    box.innerHTML="";




    records.forEach(item=>{


        box.innerHTML += `



<div class="record">


<h3>

${item.title}

</h3>


<p>
📅
${new Date(item.startTime).toLocaleString()}
</p>



<p>

来源：

${item.source}

</p>



<p>

⏱

${Math.floor(item.duration/60)}分

${item.duration%60}秒

</p>



<p>

🏷

${(item.tags || []).join(" ")}

</p>




<h4>

摘录

</h4>


<p>

${

(item.excerpts||[])
.map(e=>e.content)
.join("<br>")

}

</p>




<h4>

思考

</h4>



<p>

${

(item.thoughts||[])
.map(t=>t.content)
.join("<br>")

}

</p>



<button onclick="deleteArchive('${item.id}')">

删除

</button>



<button onclick="exportMarkdown('${item.id}')">

导出Markdown

</button>



</div>



`;



    });


}








// =====================
// 删除
// =====================


function deleteArchive(id){


    let ok =
    confirm(
        "确定删除吗？"
    );


    if(!ok){

        return;

    }



    records =
    records.filter(
        item=>item.id!==id
    );



    saveArchives(records);



    showRecords();


    showStats();


}







// =====================
// 数据统计
// =====================


function showStats(){


    let stats =
    document.getElementById("stats");



    if(!stats){

        return;

    }



    let totalTime=0;


    records.forEach(item=>{

        totalTime +=
        Number(item.duration)||0;

    });




    stats.innerHTML = `


<h3>
我的阅读数据
</h3>


<p>
阅读：
${records.length}篇
</p>


<p>
时间：
${Math.floor(totalTime/3600)}小时
${Math.floor(totalTime%3600/60)}分钟
</p>



`;



}