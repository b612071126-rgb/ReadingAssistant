let currentArchive = null;

let timerInterval = null;

let activeStartTime = null;

let lastActiveTime = null;

let effectiveSeconds = 0;



// 开始阅读

function startReading(){


    currentArchive = {

        id: crypto.randomUUID(),

        type:"reading",

        title:"",

        source:"",

        startTime:new Date(),

        endTime:null,


        duration:0,

        effectiveDuration:0,


        excerpts:[],

        thoughts:[],

        images:[],

        tags:[]

    };



    activeStartTime = Date.now();

    lastActiveTime = Date.now();

    effectiveSeconds = 0;



    clearInterval(timerInterval);



    timerInterval=setInterval(()=>{


        let seconds =
        Math.floor(
            (Date.now()-activeStartTime)
            /
            1000
        );



        currentArchive.duration=seconds;



        // 有效阅读判断

        if(
            Date.now()-lastActiveTime
            <
            180000
        ){

            effectiveSeconds++;

        }


        currentArchive.effectiveDuration =
        effectiveSeconds;



        updateTime(seconds);



    },1000);



}






// 更新时间显示

function updateTime(seconds){


    let h =
    Math.floor(seconds/3600);


    let m =
    Math.floor(
        (seconds%3600)/60
    );


    let s =
    seconds%60;



    let time =
    document.getElementById("time");


    if(time){

        time.innerHTML =
        `${String(h).padStart(2,"0")}:${String(m).padStart(2,"0")}:${String(s).padStart(2,"0")}`;

    }

}



// 用户活动

document.addEventListener(
"click",
()=>{

lastActiveTime=Date.now();

});


document.addEventListener(
"input",
()=>{

lastActiveTime=Date.now();

});







// 添加摘录

function addExcerpt(content){


    if(!currentArchive){

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

        return;

    }


    currentArchive.thoughts.push({

        content:content,

        time:new Date()

    });


}







// 保存当前记录

function saveCurrentReading(){


    if(!currentArchive){

        alert("请先开始阅读");

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



    archives.push(
        JSON.parse(
            JSON.stringify(currentArchive)
        )
    );



    saveArchives(archives);



    alert("保存成功，可以继续阅读");


}







// 结束阅读

function finishReading(){


    if(!currentArchive){

        alert("没有正在阅读");

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

        addExcerpt(quote);

    }


    if(thought){

        addThought(thought);

    }





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







// 新建阅读

function newReading(){


    clearInterval(timerInterval);



    document.getElementById("title").value="";

    document.getElementById("source").value="";

    document.getElementById("quote").value="";

    document.getElementById("thought").value="";



    document.getElementById("time").innerHTML="00:00:00";



    startReading();


}