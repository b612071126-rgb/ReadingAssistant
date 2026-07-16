let currentArchive = null;


let timerInterval = null;


let startTimestamp = null;


let selectedImages = [];





// 开始阅读

function startReading(){


    currentArchive = {


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



    selectedImages=[];



    startTimestamp =
    Date.now();




    clearInterval(timerInterval);



    timerInterval =
    setInterval(updateReadingTime,1000);



}









// 更新时间


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









// 显示时间


function showTime(seconds){


    let h =
    Math.floor(
        seconds/3600
    );



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









// 获取当前页面内容


function updateCurrentArchive(){



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
    selectedImages.slice();



}









// 保存当前阅读


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




    archives.unshift(

        JSON.parse(
            JSON.stringify(
                currentArchive
            )
        )

    );





    saveArchives(archives);




    alert(
        "保存成功，可以继续阅读"
    );





    clearReadingInput();



}









// 清空输入


function clearReadingInput(){


    document.getElementById(
        "title"
    ).value="";



    document.getElementById(
        "source"
    ).value="";



    document.getElementById(
        "quote"
    ).value="";



    document.getElementById(
        "thought"
    ).value="";



    selectedImages=[];



}









// 结束阅读


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



    // 没有任何内容，不保存

    if(!hasContent){


        currentArchive=null;


        return null;


    }



    let archives =
    loadArchives();



    // 如果之前没有保存过，才新增

    if(!saved){


        archives.unshift(

            JSON.parse(
                JSON.stringify(
                    currentArchive
                )
            )

        );


        saveArchives(archives);


    }



    return currentArchive;


}








// 结束按钮


function stopTimer(){



    let result =
    finishReading();




    if(result){


        alert(
            "阅读结束，档案已保存"
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

            name:
            input.files[0].name,


            data:
            e.target.result


        });



        alert(
            "图片已添加"
        );



    };




    reader.readAsDataURL(

        input.files[0]

    );



}