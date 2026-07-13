let currentArchive = null;



function startReading(){

    currentArchive = {

        id:Date.now(),

        title:"",

        source:"",

        startTime:new Date(),

        endTime:null,

        duration:0,

        excerpts:[],

        thoughts:[],

        tags:[]

    };

}



function addExcerpt(text){

    currentArchive.excerpts.push({

        content:text,

        time:new Date()

    });

}



function addThought(text){

    currentArchive.thoughts.push({

        content:text,

        time:new Date()

    });

}



function finishReading(){

    currentArchive.endTime=new Date();


    //计算时间


    return currentArchive;

}