let currentArchive = null;

let timerInterval = null;

let selectedTags = [];




// ======================
// 开始阅读
// ======================

function startReading(){


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



    selectedTags = [];

    updateTags();



    startTimer();



    console.log(
        "开始阅读",
        currentArchive
    );

}





// ======================
// 计时
// ======================


function startTimer(){


    clearInterval(timerInterval);



    timerInterval =
    setInterval(()=>{


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
            (seconds%3600)/60
        );



        let s =
        seconds%60;



        document.getElementById("time")
        .innerHTML =


        `${String(h).padStart(2,"0")}:${String(m).padStart(2,"0")}:${String(s).padStart(2,"0")}`;



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


    }else{


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
// 添加摘录
// ======================


function addExcerpt(content){


    if(!currentArchive){

        return;

    }



    currentArchive.excerpts.push({

        content:content,

        time:new Date()

    });


}






// ======================
// 添加思考
// ======================


function addThought(content){


    if(!currentArchive){

        return;

    }



    currentArchive.thoughts.push({

        content:content,

        time:new Date()

    });


}






// ======================
// 获取输入
// ======================


function collectInput(){


    currentArchive.title =
    document.getElementById("title").value;



    currentArchive.source =
    document.getElementById("source").value;




    let quote =
    document.getElementById("quote").value;



    let thought =
    document.getElementById("thought").value;




    if(quote){


        addExcerpt(quote);


    }



    if(thought){


        addThought(thought);


    }



    currentArchive.tags =
    [...selectedTags];



}






// ======================
// 保存并开始下一篇
// ======================


function saveCurrentReading(){


    if(!currentArchive){

        alert("当前没有阅读");

        return;

    }



    collectInput();



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




    alert("保存成功，开始下一篇阅读");



    resetReading();



}






// ======================
// 结束阅读
// ======================


function finishReading(){



    if(!currentArchive){

        return null;

    }



    collectInput();



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



    clearInterval(timerInterval);



    let archives =
    loadArchives();



    archives.push(

        JSON.parse(
            JSON.stringify(currentArchive)
        )

    );



    saveArchives(archives);



    return currentArchive;


}







// ======================
// 重置开始下一篇
// ======================


function resetReading(){



    document.getElementById("title").value="";

    document.getElementById("source").value="";

    document.getElementById("quote").value="";

    document.getElementById("thought").value="";



    currentArchive=null;



    startReading();


}