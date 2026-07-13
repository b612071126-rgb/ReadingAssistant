const STORAGE_KEY = "readingArchives";


// 保存阅读档案

function saveArchives(archives){

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(archives)
    );

}



// 读取阅读档案

function loadArchives(){

    let data = localStorage.getItem(
        STORAGE_KEY
    );


    if(data){

        return JSON.parse(data);

    }


    return [];

}