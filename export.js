const STORAGE_KEY = "records";


// 保存阅读记录

function saveRecords(records){

localStorage.setItem(
STORAGE_KEY,
JSON.stringify(records)
);

}



//读取阅读记录

function loadRecords(){

let data =
localStorage.getItem(STORAGE_KEY);


if(data){

return JSON.parse(data);

}


return [];

}