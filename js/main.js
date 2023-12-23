'use strict'
/* i use 'use strict' to know if i have any errors  */
// variable decleration
var inputName = document.getElementById('inputName');
var inputSite = document.getElementById('inputSite');
var searchInput = document.getElementById('searchInput');
var massegeName = document.getElementById('massegeName');
var massegeURL = document.getElementById('massegeURL');
var designError = document.getElementById('designError');

var bookArray = []; //array has all mains of app.
/* this condition to pull the item form set to get and make a cond if its not = null do this */
if (localStorage.getItem("bookMarket")!= null)   {
    bookArray = JSON.parse(localStorage.getItem("bookMarket"));
    displayMarket();
}
function addNameAndSite() {
   if (validationName() == true && validationURL() == true ) {
    var mainAdd ={
        nameBook : inputName.value ,
        siteBook : inputSite.value
    }
    bookArray.push(mainAdd);
    localStorage.setItem("bookMarket" , JSON.stringify(bookArray));
    clearArray();
    displayMarket();
   }else{
    designError.classList.remove("d-none")
}
}
function actionErorr() {
    designError.classList.add("d-none")

}
function displayMarket() {
    var additional = '';
    for (var i = 0; i < bookArray.length; i++) {
        additional +=
            `
            <tr>
            <td>${i+1}</td>
            <td>${bookArray[i].nameBook}</td>
            <td>
            <a target="_blank" href="${bookArray[i].siteBook}">
            <button class=" text-white bg-Visit px-3 py-1 px-3 py-1">
                <i class="fa-solid fa-eye px-1" ></i>
                Visit
            </button></td>
            </a>
            <td><button class="btn btn-success" onclick="updateFirst(${i})">Update</button></td>
            <td><button onclick="deleteArray(${i})" id="deleteDisable${i}" class=" text-white bg-Delete px-3 py-1">
                <i class="fa-solid fa-trash-can px-1"></i>
                Delete</button></td>
        </tr>
    </tbody>
            `
    }
    document.getElementById('addTable').innerHTML = additional;
}
function clearArray() {
    inputName.value = "";
    inputSite.value = "";   
}
function deleteArray(index) {
    bookArray.splice(index , 1);
    displayMarket();
    localStorage.setItem("bookMarket" , JSON.stringify(bookArray));
}
function sarchInput() {
    var textSearch = searchInput.value;
    var additional = "";
    for (var i = 0; i < bookArray.length; i++) {
        if (bookArray[i].nameBook.toLowerCase().includes(textSearch.toLowerCase())) {
            additional +=
            `
            <tr>
            <td>${i+1}</td>
            <td>${bookArray[i].nameBook}</td>
            <td>
            <a target="_blank" href="${bookArray[i].siteBook}">
            <button class=" text-white bg-Visit px-3 py-1 px-3 py-1">
                <i class="fa-solid fa-eye px-1" ></i>
                Visit
            </button></td>
            </a>
            <td><button class="btn btn-success" onclick="updateFirst(${i})">Update</button></td>
            <td><button id="deleteDisable${i}" onclick="deleteArray(${i})" class=" text-white bg-Delete px-3 py-1">
                <i class="fa-solid fa-trash-can px-1"></i>
                Delete</button></td>
        </tr>
    </tbody>
            `
        }
    }
    document.getElementById('addTable').innerHTML = additional;
}
var updateMuSite ;
function updateFirst(indexup) {
    var delBtn = document.getElementById("deleteDisable" + indexup );
    updateMuSite = indexup;
    var indexValue =  bookArray[indexup];
    inputName.value = indexValue.nameBook;  
    inputSite.value = indexValue.siteBook;
    document.getElementById('SubmitSiteName').classList.add("d-none");
    delBtn.classList.add("d-none");
    document.getElementById('updateSite').classList.remove("d-none");
}
function upDadteNameAndSite() {

    if(validationName() == true && validationURL() == true){
        var mainAdd ={
            nameBook : inputName.value ,
            siteBook : inputSite.value
        }
        bookArray.splice(updateMuSite , 1 , mainAdd);
        displayMarket();
    localStorage.setItem("bookMarket" , JSON.stringify(bookArray));
    clearArray();
    document.getElementById('SubmitSiteName').classList.remove("d-none");

    document.getElementById('updateSite').classList.add("d-none");
    }else{
        designError.classList.remove("d-none")
    }
    
}
function validationName() {
    var regexName = /^\w{2,25}\s?\w{2,15}?$/
    var textName = inputName.value;
    /* 
    var massegeName = document.getElementById('massegeName');
    is-valid
    is-invalid
    */
    if (regexName.test(textName) == true) {
        massegeName.classList.add("d-none");
        inputName.classList.add("is-valid");
        inputName.classList.remove("is-invalid");
        return true ;
    }else{
        inputName.classList.add("is-invalid");
        massegeName.classList.remove("d-none");
        inputName.classList.remove("is-valid");
        return false ;
    }
}
function validationURL() {
    var regexURL =/^https:\/\/www\.(\w{5,25}\.com|net|org|gov|edu|us|foc\.cu\.edu\.eg)$/
    var textURL = inputSite.value;
    /* 
    var massegeURL = document.getElementById('massegeURL');
    is-valid
    is-invalid
    */
    if (regexURL.test(textURL) == true) {
        massegeURL.classList.add("d-none");
        inputSite.classList.add("is-valid");
        inputSite.classList.remove("is-invalid");
        return true ;
    }else{
        inputSite.classList.add("is-invalid");
        massegeURL.classList.remove("d-none");
        inputSite.classList.remove("is-valid");
        return false ;
    }
}