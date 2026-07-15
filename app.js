let lastPage = "readerPanel";

let selectedTags = [];





// 隐藏所有页面

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






// 开始阅读

function openReader(){


    lastPage="readerPanel";


    hideAllPages();



    document.getElementById(
        "readingPage"
    ).style.display="block";



    selectedTags=[];



    startReading();


}







// 首页

function openHome(){


    hideAllPages();


    document.getElementById(
        "readerPanel"
    ).style.display="block";



    showStats();


}







// 返回

function goBack(){


    hideAllPages();



    document.getElementById(
        lastPage
    ).style.display="block";


}








// 打开档案


function openArchive(){


    lastPage="readerPanel";


    hideAllPages();



    document.getElementById(
        "archivePage"
    ).style.display="block";



    showRecords();


}







// 标签选择


function selectTag(tag){


    if(
        selectedTags.includes(tag)
    ){


        selectedTags =
        selectedTags.filter(
            t=>t!==tag
        );


    }
    else{


        selectedTags.push(tag);


    }


    console.log(selectedTags);


}








// 显示档案


function showRecords(){


    let records =
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

📅

${new Date(item.startTime)
.toLocaleString()}

</p>



<p>

⏱

${Math.floor(item.duration/60)}
分

${item.duration%60}
秒

</p>



<p>

标签：

${
(item.tags||[])
.map(t=>" #"+t)
.join("")
}

</p>




<button onclick="viewArchive('${item.id}')">

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








// 删除


function deleteArchive(id){



    let ok =
    confirm(
        "确定删除吗？"
    );



    if(!ok){

        return;

    }




    let records =
    loadArchives();



    records =
    records.filter(
        r=>r.id!==id
    );



    saveArchives(records);



    showRecords();



}









// 查看详情


function viewArchive(id){


    lastPage="archivePage";



    let records =
    loadArchives();



    let item =
    records.find(
        r=>r.id===id
    );



    if(!item){

        return;

    }



    hideAllPages();



    document.getElementById(
        "detailPage"
    ).style.display="block";



    document.getElementById(
        "detailContent"
    ).innerHTML=`

<h3>
${item.title}
</h3>


<p>

来源：

${item.source}

</p>



<p>

阅读时间：

${Math.floor(item.duration/60)}
分
${item.duration%60}
秒

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


`;



}








// 搜索


function searchArchives(){


let key =
document.getElementById(
"searchInput"
).value;



let records =
loadArchives();



let result =
records.filter(item=>{


return (

(item.title||"")
.includes(key)

||

(item.source||"")
.includes(key)

||

JSON.stringify(item.tags)
.includes(key)

);



});



showSearchResult(result);


}







function showSearchResult(records){


let box =
document.getElementById(
"records"
);



box.innerHTML="";



records.forEach(item=>{


box.innerHTML += `


<div class="record">

<h3>
${item.title}
</h3>

<button onclick="viewArchive('${item.id}')">

查看

</button>


</div>


`;



});



}








// 速记


function openQuickNote(){


lastPage="readerPanel";


hideAllPages();


document.getElementById(
"quickPage"
).style.display="block";


}








// 说明


function openHelp(){


lastPage="readerPanel";


hideAllPages();


document.getElementById(
"helpPage"
).style.display="block";


}








// 首页统计


function showStats(){


let records =
loadArchives();



let total=0;



records.forEach(item=>{


total += Number(item.duration)||0;


});



let box =
document.getElementById(
"stats"
);



if(box){


box.innerHTML=`

<h3>
阅读数据
</h3>


<p>

累计阅读：
${records.length}
篇

</p>


<p>

累计时间：

${Math.floor(total/3600)}
小时

${Math.floor(total%3600/60)}
分钟

</p>

`;

}


}



showStats();