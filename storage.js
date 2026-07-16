// ==========================
// 数据存储系统
// ==========================


const STORAGE_KEY = "readingArchives";

const NOTE_KEY = "quickNotes";




// ==========================
// 阅读档案
// ==========================


function saveArchives(archives){


    localStorage.setItem(

        STORAGE_KEY,

        JSON.stringify(archives)

    );


}





function loadArchives(){


    let data =
    localStorage.getItem(
        STORAGE_KEY
    );



    if(!data){

        return [];

    }



    try{


        let result =
        JSON.parse(data);



        if(!Array.isArray(result)){


            return [];

        }



        return result;



    }
    catch(e){


        console.log(
            "阅读档案读取失败"
        );


        return [];

    }


}








// ==========================
// 速记
// ==========================


function saveNotes(notes){


    localStorage.setItem(

        NOTE_KEY,

        JSON.stringify(notes)

    );


}






function loadNotes(){


    let data =
    localStorage.getItem(
        NOTE_KEY
    );



    if(!data){

        return [];

    }



    try{


        let result =
        JSON.parse(data);



        if(!Array.isArray(result)){


            return [];

        }



        return result;



    }
    catch(e){


        return [];

    }



}







// ==========================
// 清空数据
// ==========================


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