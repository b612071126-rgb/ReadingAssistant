let currentArchive = null;

let timerInterval = null;

let startTimestamp = 0;

let selectedImages = [];




// 开始阅读

function startReading(){


    currentArchive = {


        id:crypto.randomUUID(),

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



    startTimestamp =
    Date.now();



    clearInterval(timerInterval);



    timerInterval =
    setInterval(()=>{


        let seconds =
        Math.floor(
            (Date.now()-startTimestamp)
            /
            1000
        );



        currentArchive.duration =
        seconds;



        updateTime(seconds);



    },1000);



}







// 时间显示


function updateTime(seconds){


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
        `${String(h).padStart(2,"0")}:${String(m).padStart(2,"0")}:${String(s).padStart(2,"0")}`;


    }


}









// 保存当前阅读


function saveCurrentReading(){



    if(!currentArchive){

        alert(
        "请先开始阅读"
        );

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
    selectedTags || [];




    currentArchive.images =
    selectedImages;





    let archives =
    loadArchives();



    archives.push(
        JSON.parse(
            JSON.stringify(currentArchive)
        )
    );



    saveArchives(archives);





    alert(
        "保存成功，继续阅读"
    );




    clearInput();



}









// 清空输入


function clearInput(){


document.getElementById("title").value="";


document.getElementById("source").value="";


document.getElementById("quote").value="";


document.getElementById("thought").value="";


selectedImages=[];


}









// 结束阅读


function finishReading(){



    if(!currentArchive){

        alert(
        "没有正在阅读"
        );

        return null;

    }



    clearInterval(timerInterval);



    currentArchive.endTime =
    new Date();




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
    selectedTags;



    currentArchive.images =
    selectedImages;





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








// 结束按钮调用


function stopTimer(){



    let archive =
    finishReading();



    if(archive){


        alert(
        "阅读结束，已保存"
        );



        openArchive();


    }


}









// 图片保存


function saveImage(){



    let input =
    document.getElementById(
        "imageInput"
    );



    if(
        !input.files[0]
    ){

        alert(
        "请选择图片"
        );

        return;

    }





    let reader =
    new FileReader();



    reader.onload=function(e){



        selectedImages.push({

            data:e.target.result,

            name:
            input.files[0].name

        });



        alert(
        "图片已添加"
        );


    };



    reader.readAsDataURL(
        input.files[0]
    );

}










// 速记保存


function saveQuickNote(){



    let content =
    document.getElementById(
        "quickContent"
    ).value;



    if(!content){

        return;

    }



    let notes =
    loadNotes();



    notes.push({

        id:crypto.randomUUID(),

        content:content,

        time:new Date()

    });



    saveNotes(notes);



    alert(
    "速记保存成功"
    );



}