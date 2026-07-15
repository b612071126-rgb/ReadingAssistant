const STORAGE_KEY = "readingArchives";

const NOTE_KEY = "quickNotes";


// ======================
// 阅读档案
// ======================


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
    localStorage.getItem(STORAGE_KEY);


    if(data){

        return JSON.parse(data);

    }


    return [];

}



// ======================
// 速记
// ======================


function saveNotes(notes){

    localStorage.setItem(
        NOTE_KEY,
        JSON.stringify(notes)
    );

}



function loadNotes(){

    let data =
    localStorage.getItem(NOTE_KEY);


    if(data){

        return JSON.parse(data);

    }


    return [];

}