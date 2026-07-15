let currentArchive = null;


// 开始阅读

function startReading(){

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



// 结束阅读

function finishReading(){


    if(!currentArchive){

        alert("当前没有阅读");

        return null;

    }



    currentArchive.endTime=new Date();

// 获取输入框内容

currentArchive.title =
document.getElementById("title").value;


currentArchive.source =
document.getElementById("source").value;



let quote =
document.getElementById("quote").value;


let thought =
document.getElementById("thought").value;



// 保存摘录

if(quote){

    currentArchive.excerpts.push({

        content:quote,

        time:new Date()

    });

}



// 保存思考

if(thought){

    currentArchive.thoughts.push({

        content:thought,

        time:new Date()

    });

}



    let time=

    currentArchive.endTime

    -

    currentArchive.startTime;



    currentArchive.duration=

    Math.floor(time/1000);



    console.log("阅读结束",currentArchive);



// 获取已有档案

let archives = loadArchives();


// 加入新的阅读档案

archives.push(currentArchive);


// 保存

saveArchives(archives);



    return currentArchive;

}



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



    alert("保存成功");


}