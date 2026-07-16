let currentDetail=null;



function openDetail(id){


    let item =
    records.find(
        r=>r.id===id
    );


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
时间：
${new Date(item.startTime).toLocaleString()}
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
.map(img=>`

<img src="${img}"
style="width:100%;">

`)
.join("")
}


`;

}


function backToArchive(){

hideAllPages();

document.getElementById(
"archivePage"
).style.display="block";


showRecords();

}



function hideAllPages(){


    document.getElementById(
        "readerPanel"
    ).style.display="none";


    document.getElementById(
        "readingPage"
    ).style.display="none";


    document.getElementById(
        "archivePage"
    ).style.display="none";


}



let lastPage="readerPanel";


let records =
loadArchives();



function openReader(){


    lastPage="readerPanel";


    hideAllPages();


    document.getElementById(
        "readingPage"
    ).style.display="block";


    selectedTags=[];


    startReading();


}



function openArchive(){


    lastPage="readerPanel";


    hideAllPages();


    document.getElementById(
        "archivePage"
    ).style.display="block";


    showRecords();


}



function openHome(){


    hideAllPages();


    document.getElementById(
        "readerPanel"
    ).style.display="block";


}



function goBack(){


    hideAllPages();


    document.getElementById(
        lastPage
    ).style.display="block";


}




function stopTimer(){


    let archive =
    finishReading();


    openArchive();


    if(archive){


        alert(
        "阅读结束："
        +
        Math.floor(
        archive.duration/60
        )
        +
        "分钟"
        );


    }


}





function showRecords(){


    records =
    loadArchives();



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
        来源：
        ${item.source || ""}
        </p>


        <p>
        时间：
        ${
        new Date(
        item.startTime
        ).toLocaleString()
        }
        </p>



        <p>

        标签：

        ${
        (item.tags || [])
        .map(
        t=>t.name || t
        )
        .join(" ")

        }

        </p>



        <p>

        阅读：

        ${
        Math.floor(
        item.duration/60
        )
        }

        分

        ${
        item.duration%60
        }

        秒

        </p>




        <h4>
        摘录
        </h4>


        <p>

        ${
        (item.excerpts || [])
        .map(
        e=>e.content
        )
        .join("<br>")
        }

        </p>



        <h4>
        思考
        </h4>


<h4>
图片资料
</h4>


${
(item.images || [])
.map(img=>`

<img 
src="${img}"
style="
width:100%;
border-radius:10px;
margin-top:10px;
">

`)
.join("")
}



        <p>

        ${
        (item.thoughts || [])
        .map(
        t=>t.content
        )
        .join("<br>")
        }

        </p>




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




function deleteArchive(id){


    let ok =
    confirm(
    "确定删除这个阅读档案吗？"
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


}





function showStats(){


    records =
    loadArchives();



    let count =
    records.length;



    let totalTime=0;


    let quoteCount=0;


    let thoughtCount=0;



    records.forEach(item=>{


        totalTime +=
        Number(item.duration)||0;



        quoteCount +=
        (item.excerpts||[]).length;



        thoughtCount +=
        (item.thoughts||[]).length;


    });





    let box =
    document.getElementById(
        "stats"
    );



    if(!box)return;



    box.innerHTML = `


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
    ${
    Math.floor(totalTime/3600)
    }
    小时
    ${
    Math.floor(
    totalTime%3600/60
    )
    }
    分钟
    </p>


    <p>
    摘录：
    ${quoteCount}
    条
    </p>


    <p>
    思考：
    ${thoughtCount}
    条
    </p>


    `;


}



showRecords();

showStats();