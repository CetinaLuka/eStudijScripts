// ==UserScript==
// @name         Full screen edit estudij.um.si
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       Luka Četina
// @match        https://estudij.um.si/course/modedit*
// @require      http://code.jquery.com/jquery-latest.js
// @grant        none
// ==/UserScript==
/* jshint -W097 */
'use strict';
/* global $ */

$(() => {
    //ustvari se gumb za fullscreen
    let fullScreenGumb = $($.parseHTML('<button type="button" tabindex="0" title="Fullscreen"><i class="icon fa fa-arrows-alt" title="Fullscreen editor" role="img" aria-label="Fullscreen editor"></i></button>'));
    //gumb show more items na editorju, ki je del iste skupine kamor se doda fullscreen gumb
    let fullscreen_button_sibling = document.querySelector("div.collapse_group.atto_group").children[0];
    //gumb se doda za gumb "pokazi vec"
    fullScreenGumb.insertAfter('#id_name');

    //poslušalec za klik na fullScreenGumb
    fullScreenGumb.click((e) => {
        console.log("clicked");
        e.preventDefault();
        toggleFullScreen();
    });

    if (document.addEventListener) {
        document.addEventListener('fullscreenchange', exitHandler, false);
        document.addEventListener('mozfullscreenchange', exitHandler, false);
        document.addEventListener('MSFullscreenChange', exitHandler, false);
        document.addEventListener('webkitfullscreenchange', exitHandler, false);
    }

    //poskrbi, da se okno ob izhodu iz fullscreen spet zmanjša (da ni 100% visine)
    function exitHandler() {
        if (!document.fullscreenElement && !document.webkitFullscreenElement && !document.mozFullScreen && !document.msFullscreenElement) {
            console.log("exited fs");
            let editor = document.querySelector("div.editor_atto");
            let editor_content_wrap = document.querySelector("div.editor_atto_content_wrap");
            let editor_input = document.querySelector("div#id_introeditoreditable");
            let toolbarHeight = document.querySelector(".editor_atto_toolbar").offsetHeight;
            let row = document.querySelector("div#fitem_id_introeditor");

            row.style.height = '400px';
            editor.style.height = 'calc(400px - ' + toolbarHeight + 'px)';
            editor_content_wrap.style.height = '100%';
            editor_input.style.height = '100%';
        }
    }

    //ustvari se gumb za full width
    let fullWidthGumb = $('<button>').attr('id', 'full_width_edit').text('Toggle full width editor');
    fullScreenGumb.insertAfter(fullscreen_button_sibling);

    fullWidthGumb.click((e) => {
        console.log("clicked");
        e.preventDefault();
        toggleFullWidth();
    });
});

function toggleFullScreen() {
    let editor = document.querySelector("div.editor_atto");
    let editor_content_wrap = document.querySelector("div.editor_atto_content_wrap");
    let editor_input = document.querySelector("div#id_introeditoreditable");
    let toolbarHeight = document.querySelector(".editor_atto_toolbar").offsetHeight;

    if (!document.fullscreenElement && !document.webkitFullscreenElement && !document.mozFullScreen && !document.msFullscreenElement) {
        // If not in fullscreen, enter fullscreen
        if (editor.requestFullscreen) {
            editor.requestFullscreen();
        } else if (editor.mozRequestFullScreen) { /* Firefox */
            editor.mozRequestFullScreen();
        } else if (editor.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
            editor.webkitRequestFullscreen();
        } else if (editor.msRequestFullscreen) { /* IE/Edge */
            editor.msRequestFullscreen();
        }

        editor.style.height = 'calc(100% - ' + toolbarHeight + 'px)';
        editor_content_wrap.style.height = 'calc(100% - 50px)';
        editor_input.style.height = '100%';

    } else {
        // If already in fullscreen, exit fullscreen
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) { /* Firefox */
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { /* IE/Edge */
            document.msExitFullscreen();
        }
    }
}

function toggleFullWidth() {
    let sidebar = document.querySelector("div#fitem_id_introeditor").children[0];
    let editor = sidebar.nextElementSibling;

    sidebar.style.setProperty('display', 'none', 'important');
    editor.style.width = '100%';
    editor.style.maxWidth = '100%';
    editor.style.display = 'block';
}
