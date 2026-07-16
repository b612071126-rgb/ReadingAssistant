let currentArchive = null;


let timerInterval = null;


let startTimestamp = null;


let selectedTags = [];


let selectedImages = [];






// ==========================
// 开始阅读
// ==========================


function startReading(){


    currentArchive={


        id:crypto.randomUUID(),


        title:"",


        source:"",


        startTime:new Date(),


        endTime:null,


        duration:0,


        excerpts:[],


        thoughts:[],


        tags:[],


        images:[]


    };



    selectedTags=[];


    selectedImages=[];



    clearReadingInput();



    startTimestamp =
    Date.now();



    clearInterval(timerInterval);



    timerInterval =
    setInterval(
        updateReadingTime,
        1000
    );



}









// ==========================
// 计时
// ==========================


function updateReadingTime(){


    if(!currentArchive){

        return;

    }



    let seconds =
    Math.floor(
        (Date.now()-startTimestamp)
        /
        1000
    );



    currentArchive.duration =
    seconds;



    showTime(seconds);


}






function showTime(seconds){



    let h =
    Math.floor(seconds/3600);


    let m =
    Math.floor(
        (seconds%3600)/60
    );


    let s =
    seconds%60;




    let box =
    document.getElementById(
        "time"
    );



    if(box){


        box.innerHTML =
        `${String(h).padStart(2,"0")}:
${String(m).padStart(2,"0")}:
${String(s).padStart(2,"0")}`;


    }


}









// ==========================
// 标签
// ==========================


function selectTag(button,tag){



    if(
        selectedTags.includes(tag)
    ){


        selectedTags =
        selectedTags.filter(
            t=>t!==tag
        );


        button.classList.remove(
            "tag-active"
        );



    }
    else{


        selectedTags.push(tag);



        button.classList.add(
            "tag-active"
        );


    }



}









// ==========================
// 更新档案
// ==========================


function updateCurrentArchive(){


    if(!currentArchive){

        return;

    }




    currentArchive.title =

    document.getElementById(
        "title"
    ).value;




    currentArchive.source =

    document.getElementById(
        "source"
    ).value;




    currentArchive.tags =
    [...selectedTags];





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




    currentArchive.images =
    [...selectedImages];



}








// ==========================
// 保存阅读
// ==========================


function saveCurrentReading(){



    if(!currentArchive){

        alert(
        "请先开始阅读"
        );

        return;

    }



    updateCurrentArchive();



    let archives =
    loadArchives();




    let index =
    archives.findIndex(
        a=>a.id===currentArchive.id
    );



    if(index>=0){


        archives[index] =
        JSON.parse(
        JSON.stringify(currentArchive)
        );


    }
    else{


        archives.unshift(
        JSON.parse(
        JSON.stringify(currentArchive)
        )
        );


    }



    saveArchives(archives);



    alert(
    "保存成功"
    );



}









// ==========================
// 结束阅读
// ==========================


function finishReading(){



    if(!currentArchive){

        return null;

    }



    updateCurrentArchive();



    currentArchive.endTime =
    new Date();



    clearInterval(timerInterval);




    let hasContent =

    currentArchive.title ||

    currentArchive.source ||

    currentArchive.excerpts.length ||

    currentArchive.thoughts.length ||

    currentArchive.images.length;



    if(!hasContent){


        currentArchive=null;


        return null;


    }



    saveCurrentReading();



    let result =
    currentArchive;



    currentArchive=null;



    return result;



}








// ==========================
// 图片
// ==========================


function selectImages(event){



    let files =
    event.target.files;



    Array.from(files)
    .forEach(file=>{


        let reader =
        new FileReader();



        reader.onload=function(e){



            selectedImages.push({

                name:file.name,

                data:e.target.result

            });


        };



        reader.readAsDataURL(file);



    });


}