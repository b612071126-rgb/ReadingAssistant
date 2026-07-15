let currentArchive = null;

let saved = false;

let timerInterval = null;

// 开始阅读

function startReading(){

    saved = false;


    currentArchive = {

        id: Date.now(),

        title:"",

        source:"",

        startTime:new Date(),

        endTime:null,

        duration:0,

        excerpts:[],

        thoughts:[],

        tags:[]

    };



let start = Date.now();


timerInterval = setInterval(()=>{


let seconds =
Math.floor(
(Date.now()-start)/1000
);



let h =
Math.floor(seconds/3600);


let m =
Math.floor(
(seconds%3600)/60
);


let s =
seconds%60;



document.getElementById("time").innerHTML =

`${String(h).padStart(2,"0")}:${String(m).padStart(2,"0")}:${String(s).padStart(2,"0")}`;


},1000);



    console.log(
        "开始阅读",
        currentArchive
    );

}



// 添加摘录

function addExcerpt(content){

    if(!currentArchive){

        alert("请先开始阅读");

        return;

    }


    currentArchive.excerpts.push({

        content:content,

        time:new Date()

    });


}



// 添加思考

function addThought(content){

    if(!currentArchive){

        alert("请先开始阅读");

        return;

    }


    currentArchive.thoughts.push({

        content:content,

        time:new Date()

    });


}




// 保存当前阅读

function saveCurrentReading(){

    if(!currentArchive){

        alert("当前没有阅读");

        return;

    }



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



    let archives =
    loadArchives();



    archives.push(currentArchive);



    saveArchives(archives);



    saved=true;



    alert("保存成功");


}





// 结束阅读

function finishReading(){


    if(!currentArchive){

        alert("当前没有阅读");

        return null;

    }

if(!currentArchive){

    alert("当前没有阅读");

    return null;

}



clearInterval(timerInterval);

    currentArchive.endTime =
    new Date();



    currentArchive.title =
    document.getElementById("title").value;



    currentArchive.source =
    document.getElementById("source").value;




    let quote =
    document.getElementById("quote").value;


    let thought =
    document.getElementById("thought").value;



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



    let time =
    currentArchive.endTime -
    currentArchive.startTime;



    currentArchive.duration =
    Math.floor(time/1000);


console.log(
"最终保存时间",
currentArchive.duration
);


    let archives =
    loadArchives();



    if(!saved){

        archives.push(currentArchive);

        saveArchives(archives);

    }



    console.log(
        "阅读结束",
        currentArchive
    );


    return currentArchive;

}