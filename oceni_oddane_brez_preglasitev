// ==UserScript==
// @name         Oceni vse oddane brez preglasitev
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  try to take over the world!
// @author       You
// @match        https://estudij.um.si/mod/assign/*action=grading*
// @require      http://code.jquery.com/jquery-latest.js
// @grant        none
// ==/UserScript==



/* jshint -W097 */



'use strict';



/* global $ */



/* global console */



$(()=>{
    let div = $("<div>").attr("style", "padding:0.5em 0;");
    let insertBtn = $("<button>").attr("id", "oceni").addClass("btn btn-outline-primary").text("Vnesi ocene oddanim");
    let insertTextField = $("<input>").attr({"id": "ocena", "type": "text", "placeholder": "Želena ocena"}).css({"margin-left": "20px", "height": "35px", "border-radius": "4px"});
    let insertMissingBtn = $("<button>").attr("id", "oceniManjkajoce").attr("style", "float:right").addClass("btn btn-outline-secondary").text("Vnesi manjkajoče ocene oddanim");

    const defaultGradeValue = '100';


    insertBtn.appendTo(div);
    insertTextField.appendTo(div)
    insertMissingBtn.appendTo(div);



   div.insertBefore("div.quickgradingform");



   insertBtn.click((e) => {
        e.preventDefault();
       let ocena = defaultGradeValue;
       if($("#ocena").val()){
          ocena = $("#ocena").val();
       }
        grade(true, ocena);
    });



   insertMissingBtn.click((e) => {
        e.preventDefault();
       let ocena = defaultGradeValue;
       if($("#ocena").val()){
          ocena = $("#ocena").val();
       }
        grade(false, ocena);
    });
});




const grade = (override, gradeValue) => {
    const rows = $("table tbody:first > tr");

   rows.each(function(key, value) {
        let countTd = $(value).find("td");
        let id = $(value).find("td.cell:nth-child(4)").text();
        let ocenaInput = $("input", $(value).find("td.cell:nth-child(7)"));
        let submissionStatus = $(value).find("td.cell:nth-child(6) div:first-child").attr('class');

       $(value).removeClass("unselectedrow");

       if (submissionStatus === 'submissionstatussubmitted'){
           if(!ocenaInput.val() || override){
               ocenaInput.val(gradeValue);
               console.log('Student '+id+' ocenjen z 100')
               $(value).css("backgroundColor", "#E8F5E9");
           }
       }
    });
};
