// ==UserScript==
// @name         Auto-grade v2.0 preglasitev
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
    let textarea = $("<textarea>").attr("id","students-list").attr("cols", 75).attr("rows", 10).addClass("form-control").attr("style", "margin-bottom: 0.5em;");
    let insertBtn = $("<button>").attr("id", "oceni").addClass("btn btn-outline-primary").text("Vnesi ocene");
    let insertMissingBtn = $("<button>").attr("id", "oceniManjkajoce").attr("style", "float:right").addClass("btn btn-outline-secondary").text("Vnesi manjkajoče ocene");



   textarea.appendTo(div);
    insertBtn.appendTo(div);
    insertMissingBtn.appendTo(div);



   div.insertBefore("div.quickgradingform");



   insertBtn.click((e) => {
        e.preventDefault();
        const students = getGrades();
        grade(students, true);
    });



   insertMissingBtn.click((e) => {
        e.preventDefault();
        const students = getGrades();
        grade(students, false);
    });
});



const getGrades = () => {
    const value = $("#students-list").val().trim();
    let values = value.split("\n"),
        students = [];



   for (let v of values) {
        const item = v.split("\t");
        students.push({
            studentID: item[0],
            grade: item[1],
            comment: item[2]
        });
    }
    return students;
};



const grade = (students, override) => {
    const rows = $("table tbody:first > tr");



   rows.each(function(key, value) {
        let countTd = $(value).find("td");
        let id = $(value).find("td.cell:nth-child(4)").text();
        let ocenaInput = $("input", $(value).find("td.cell:nth-child(10)"));
        let komentarInput = $("textarea", $(value).find("td.cell:nth-child(16)"));
        let student = students.find(x => x.studentID == id);



       $(value).removeClass("unselectedrow");



       if (id.trim() !== "" && student) {



           let obstojecKomentar = komentarInput.val();
            let obstojecaOcena = ocenaInput.val();



           //console.log("obstsojecaOcena:", obstojecaOcena);



           if (student.comment !== '') {
                if (obstojecKomentar.trim()) {
                    $("<div>").html(`<strong>Komentar od prej:</strong><br /> ${obstojecKomentar}<br />`).insertBefore(komentarInput);
                }
                komentarInput.val(student.comment).css({
                    height: "auto",
                    width: "25em",
                    minHeight: "15em"
                });



               $(value).attr("style", "background-color: #FFF3E0;");
            } else {
                if (override) {
                    $(value).css("backgroundColor", "#FFEBEE");
                }
            }



           if (student.grade !== "" && student.grade !== undefined) {
                if (override) {
                    if (obstojecaOcena.trim()) {
                        $("<div>").html(`<strong>od prej:</strong><br /> ${obstojecaOcena}<br />`).insertBefore(ocenaInput);
                    }
                    ocenaInput.val(student.grade);
                    $(value).css("backgroundColor", "#E8F5E9");
                } else if (!override && obstojecaOcena === "") {
                    ocenaInput.val(student.grade);
                    $(value).css("backgroundColor", "#E8F5E9");
                } else {
                    console.debug("Student", student.studentID, "was already graded. Click 'Vnesi ocene' if you would like to override existing grades.")
                }
            } else {
               console.debug("Grade for student", student.studentID, "is not defined. Skipping grading.");
               $(value).css("backgroundColor", "#FFEBEE");
            }
        } else {
            if (student) {
                console.debug("Grading was skipped for user:", student);
                $(value).css("backgroundColor", "#FFEBEE");
            }
        }
    });
};
