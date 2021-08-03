//properties not include GPA
const NOT_IS_CREDIT = ["0",""];

const NOT_SUBJECT_START_CODE = ["VOV124","VOV134","VOV114","LAB101","LAB101","LAB211","LAB221","LAB231","OJS201","FE-000001"];
//properties include GPA
const STATUS = "Passed";

//selector to tr tag in table
const SELECTOR_TO_TR = "#ctl00_mainContent_divGrade > :first-child tbody tr";

const PLACE_INJECT_ELEMENT_GPA = "ctl00_mainContent_lblRollNumber";



/**
 * check condition
 */
function checkCondition(element){

    //check subject
    if(NOT_SUBJECT_START_CODE.includes(element.childNodes[3].innerText.trim())){
        return false;
    }else if(element.childNodes[9].childNodes[0].innerText.trim() != STATUS){ //check status
        return false;
    }else if(element.childNodes[8].childNodes[0].innerText.trim() == ""){ //check point
        return false;
    }
    else if(NOT_IS_CREDIT.includes(element.childNodes[7].innerText.trim())){ // check credit 0
        return false;
    }
    else{
        return true;
    }
}


/**
 * calculator GPA
 */
function calGPA(){
    let totalPoint = 0;
    let totalRecord = 0;

    let allTrElement = document.querySelectorAll(SELECTOR_TO_TR);

    for(let i = 0 ;i < allTrElement.length; i++){
        if(checkCondition(allTrElement[i])){
            let point = allTrElement[i].childNodes[8].childNodes[0].innerText.trim();
            let credit = allTrElement[i].childNodes[7].innerText.trim();
            totalPoint += parseFloat(point)*credit;
            totalRecord  += parseFloat(credit);
        }
    }
    return Math.round(totalPoint*100/totalRecord)/100;

}

/**
 * 
 * @param {*} text 
 */
function calClassification(gpa){
    let classification = "";
    if(gpa >= 9){
        classification = "Xuat Xac";
    }else if(gpa >= 8 ){
        classification = "Gioi";
    }else if(gpa >= 7){
        classification = "Kha";
    }else if(gpa >= 6){
        classification = "Trung Binh Kha";
    }else if(gpa >= 5){
        classification = "Trung Binh";
    }
    return classification;
}

/**
 * create element
 */
function createHTML(text){
    let element = document.createElement("span");
    element.className = "label label-default";
    element.innerText = text;
    return element;
}

/**
 * inject html to page
 */
function injectHtml(){
    let elem = document.getElementById(PLACE_INJECT_ELEMENT_GPA);
    let gpa = calGPA();
    let injectElement_GPA= createHTML("GPA: " + gpa);
    let injectElement_XL = createHTML("XL: " + calClassification(gpa));
    elem.innerHTML = elem.innerHTML + " - ";
    elem.append(injectElement_GPA);
    elem.innerHTML = elem.innerHTML + " - ";
    elem.append(injectElement_XL);
    
}

//call function
injectHtml();