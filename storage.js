// ==========================
// 数据存储中心 v1.2
// ==========================



// 阅读档案

const STORAGE_KEY = "readingArchives";


// 速记

const NOTE_KEY = "quickNotes";







// ==========================
// 保存阅读档案
// ==========================


function saveArchives(archives){


    localStorage.setItem(

        STORAGE_KEY,

        JSON.stringify(archives)

    );


}







// ==========================
// 读取阅读档案
// ==========================


function loadArchives(){



    let data =
    localStorage.getItem(
        STORAGE_KEY
    );



    if(!data){

        return [];

    }




    try{


        let archives =
        JSON.parse(data);



        return archives.map(item=>{


            return {


                id:
                item.id ||
                crypto.randomUUID(),



                title:
                item.title || "",



                source:
                item.source || "",



                startTime:
                item.startTime ||
                new Date(),



                endTime:
                item.endTime ||
                null,



                duration:
                Number(item.duration)||0,



                excerpts:
                item.excerpts || [],



                thoughts:
                item.thoughts || [],



                tags:
                item.tags || [],



                images:
                item.images || [],



                // 重要标记

                important:
                item.important || false


            };


        });



    }
    catch(e){


        console.log(
            "档案读取失败"
        );


        return [];


    }



}








// ==========================
// 保存速记
// ==========================


function saveNotes(notes){



    localStorage.setItem(

        NOTE_KEY,

        JSON.stringify(notes)

    );


}







// ==========================
// 读取速记
// ==========================


function loadNotes(){



    let data =
    localStorage.getItem(
        NOTE_KEY
    );



    if(!data){

        return [];

    }



    try{


        let notes =
        JSON.parse(data);



        return notes.map(item=>{


            return {


                id:
                item.id ||
                crypto.randomUUID(),



                content:
                item.content || "",



                duration:
                Number(item.duration)||0,



                time:
                item.time ||
                new Date()



            };


        });



    }
    catch(e){


        console.log(
            "速记读取失败"
        );


        return [];


    }


}







// ==========================
// 清空数据
// 测试使用
// ==========================


function clearAllData(){



    localStorage.removeItem(
        STORAGE_KEY
    );



    localStorage.removeItem(
        NOTE_KEY
    );



    alert(
    "所有数据已清空"
    );



}