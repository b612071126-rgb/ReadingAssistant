function hideAllPages(){


    document.getElementById("readerPanel")
    .style.display="none";


    document.getElementById("readingPage")
    .style.display="none";


    document.getElementById("archivePage")
    .style.display="none";


}



let lastPage="readerPanel";




// 打开阅读

function openReader(){


    lastPage="readerPanel";


    hideAllPages();



    document.getElementById(
        "readingPage"
    ).style.display="block";



    startReading();


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






// 返回上一页

function goBack(){


    hideAllPages();



    document.getElementById(
        lastPage
    ).style.display="block";


}






// 返回主页

function openHome(){


    hideAllPages();


    document.getElementById(
        "readerPanel"
    ).style.display="block";


}







// 显示档案

function showRecords(){


    let records =
    loadArchives();



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
        ${item.title || "未命名阅读"}
        </h3>


        <p>
        📅 
        ${new Date(item.startTime).toLocaleString()}
        </p>



        <p>
        来源：
        ${item.source || "无"}
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
            .map(t=>"#"+t)
            .join(" ")
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







// 删除档案


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
        item=>item.id!==id
    );



    saveArchives(records);



    showRecords();



}








// 查看详情（预留）

function viewArchive(id){


    let records =
    loadArchives();



    let item =
    records.find(
        r=>r.id===id
    );



    if(!item){

        return;

    }



    alert(
        "详情页面将在下一步加入"
    );


}








// 首页统计


function showStats(){


    let records =
    loadArchives();



    let count =
    records.length;



    let total=0;



    records.forEach(item=>{


        total +=
        Number(item.duration)||0;


    });




    let box =
    document.getElementById("stats");



    if(box){


        box.innerHTML=`

        <h3>
        我的阅读数据
        </h3>


        <p>
        阅读：
        ${count}
        篇
        </p>


        <p>
        时间：
        ${Math.floor(total/3600)}
        小时
        ${Math.floor(total%3600/60)}
        分钟
        </p>


        `;


    }


}



showStats();