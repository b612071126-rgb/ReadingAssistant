let currentArchive = null;

let timerInterval = null;

let selectedTags = [];




// ======================
// 开始阅读
// ======================

function startReading(){


    clearInterval(timerInterval);



    currentArchive = {


        id: crypto.randomUUID(),


        title:"",


        source:"",


        startTime:new Date(),


        endTime:null,


        duration:0,


        excerpts:[],


        thoughts:[],


        tags:[]


    };



    selectedTags=[];


    updateTags();



    startTimer();



}








// ======================
// 计时器
// ======================


function startTimer(){


    timerInterval =
    setInterval(function(){



        if(!currentArchive){

            return;

        }




        let seconds =

        Math.floor(

        (Date.now()
        -
        currentArchive.startTime)

        /

        1000

        );




        let h =
        Math.floor(seconds/3600);



        let m =
        Math.floor(
            seconds%3600/60
        );



        let s =
        seconds%60;



        let time =
        document.getElementById("time");



        if(time){


            time.innerHTML =

            `${String(h).padStart(2,"0")}:${String(m).padStart(2,"0")}:${String(s).padStart(2,"0")}`;


        }




    },1000);



}









// ======================
// 标签
// ======================


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



    updateTags();


}




function updateTags(){


    let box =
    document.getElementById(
        "selectedTags"
    );


    if(!box){

        return;

    }



    box.innerHTML =

    selectedTags.length

    ?

    selectedTags.join(" ")

    :

    "无";

}









// ======================
// 收集输入
// ======================


function collectReading(){


    currentArchive.title =

    document.getElementById(
        "title"
    ).value;



    currentArchive.source =

    document.getElementById(
        "source"
    ).value;




    let quote =

    document.getElementById(
        "quote"
    ).value;



    let thought =

    document.getElementById(
        "thought"
    ).value;





    if(quote){


        currentArchive.excerpts.push({


            content:quote,


            time:new Date()


        });


    }






    if(thought){


        currentArchive.thoughts.push({


            content:thought,


            time:new Date()


        });


    }



    currentArchive.tags =
    [...selectedTags];



}










// ======================
// 保存并开始下一篇
// ======================


function saveCurrentReading(){


    if(!currentArchive){

        alert("请先开始阅读");

        return;

    }




    collectReading();



    currentArchive.duration =

    Math.floor(

    (Date.now()
    -
    currentArchive.startTime)

    /

    1000

    );





    let archives =
    loadArchives();





    archives.push(

        JSON.parse(
            JSON.stringify(currentArchive)
        )

    );





    saveArchives(archives);





    alert(
        "保存成功，开始下一篇阅读"
    );





    clearReading();



    startReading();



}









// ======================
// 结束阅读
// ======================


function stopTimer(){


    if(!currentArchive){

        alert("当前没有阅读");

        return;

    }




    collectReading();




    currentArchive.endTime =
    new Date();




    currentArchive.duration =

    Math.floor(

    (currentArchive.endTime
    -
    currentArchive.startTime)

    /

    1000

    );





    let archives =
    loadArchives();





    archives.push(

        JSON.parse(
            JSON.stringify(currentArchive)
        )

    );





    saveArchives(archives);





    clearInterval(timerInterval);




    openArchive();



}









// ======================
// 清空输入
// ======================


function clearReading(){



    document.getElementById("title").value="";


    document.getElementById("source").value="";


    document.getElementById("quote").value="";


    document.getElementById("thought").value="";



    selectedTags=[];


    updateTags();



    let time =
    document.getElementById("time");



    if(time){

        time.innerHTML="00:00:00";

    }



}