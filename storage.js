// ==========================
// 阅读档案存储
// ==========================


const STORAGE_KEY = "readingArchives";

const NOTE_KEY = "quickNotes";






// 保存阅读档案

function saveArchives(archives){


    localStorage.setItem(

        STORAGE_KEY,

        JSON.stringify(archives)

    );


}







// 读取阅读档案

function loadArchives(){


    let data =
    localStorage.getItem(
        STORAGE_KEY
    );



    if(!data){

        return [];

    }



    try{


        return JSON.parse(data);



    }
    catch(e){


        console.log(
            "档案数据错误，重新初始化"
        );


        return [];

    }


}









// 保存速记


function saveNotes(notes){



    localStorage.setItem(

        NOTE_KEY,

        JSON.stringify(notes)

    );


}







// 读取速记


function loadNotes(){


    let data =
    localStorage.getItem(
        NOTE_KEY
    );



    if(!data){

        return [];

    }




    try{


        return JSON.parse(data);



    }
    catch(e){


        return [];

    }



}







// 清空所有数据
// 测试使用

function clearAllData(){


    localStorage.removeItem(
        STORAGE_KEY
    );


    localStorage.removeItem(
        NOTE_KEY
    );


    alert(
        "数据已清空"
    );


}