//properties not include GPA
const NOT_IS_CREDIT = ["0",""];
const NOT_SUBJECT_START_CODE = ["VOV"];
//properties
const STATUS = "Passed";


/**
 * 
 * @param {*} elements
 */
// function isUndefined(...elements){
//     for (const elem of elements) {
//         if(elem === undefined){
//             return true;
//         }
//     }
//     return false;
// }

/**
 * check condition to find 
 */
function checkCondition(element){
    // let x = element.childNodes[8].hasChildNodes();
    // //check undefined
    // if(isUndefined([element.childNodes[3],element.childNodes[7],element.childNodes[9].childNodes[0],element.childNodes[8].childNodes[0]])){
    //     return false;
    // }

    // let ele = element.childNodes[3];
    // let subjectCode = element.childNodes[3].innerText.trim();
    // let credit = element.childNodes[7].innerText.trim();
    // let status = element.childNodes[9].childNodes[0].innerText.trim();
    // let point = element.childNodes[8].childNodes[0].innerText.trim();

    if(element.childNodes[3].innerText.trim().startsWith(NOT_SUBJECT_START_CODE[0])){
        return false;
    }else if(element.childNodes[9].childNodes[0].innerText.trim() != "Passed"){
        return false;
    }else if(element.childNodes[8].childNodes[0].innerText.trim() == ""){
        return false;
    }
    else if(NOT_IS_CREDIT.includes(element.childNodes[7].innerText.trim())){
        return false;
    }
    else{
        return true;
    }
}


/**
 * 
 */
function calGPA(){
    let totalPoint = 0;
    let totalRecord = 0;

    let allTrElement = document.querySelectorAll("#ctl00_mainContent_divGrade > :first-child tbody tr");

    for(let i = 0 ;i < allTrElement.length; i++){
        if(checkCondition(allTrElement[i])){
            let point = allTrElement[i].childNodes[8].childNodes[0].innerText;
            totalPoint += parseFloat(point);
            totalRecord++;
        }
    }
    return Math.round(totalPoint*100/totalRecord)/100;

}

function createHTML(){
    let element = document.createElement("span");
    element.className = "label label-default";
    element.innerText = "GPA: "+ calGPA();
    return element;
}

/**
 * 
 */
function injectHtml(){
    let elem = document.getElementById("ctl00_mainContent_lblRollNumber");
    let injectElement= createHTML();
    elem.innerHTML = elem.innerHTML + " - ";
    elem.append(injectElement);
}

//call function
injectHtml();