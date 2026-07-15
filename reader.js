let currentArchive = null;

let saved = false;


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