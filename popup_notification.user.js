// ==UserScript==
// @name         popup_notification
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  If a red dot appears on the menu, it will also be displayed at the bottom right of the window.
// @author       nagao
// @match        https://minesweeper.online/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=minesweeper.online
// @grant        none
// ==/UserScript==

{
    'use strict';

    const element = document.createElement('div');
    element.classList.add('sidebar-nav');
    element.style.position = 'fixed';
    element.style.bottom = '-12px';
    element.style.right = '0';
    element.style.backgroundColor = 'transparent';
    element.style.zIndex = '2147483647';
    document.body.appendChild(element);

    const ul = document.createElement('ul');
    element.appendChild(ul);

    const targetNode = document.getElementsByClassName('left-column')[0];

    const notify = () => {
        ul.innerHTML = '';
        const icons = targetNode.getElementsByClassName('new-quest-icon');
        for (let i = 0; i < icons.length; i++) {
            const li = icons[i].closest('li').cloneNode(true);
            li.removeChild(li.getElementsByTagName('i')[0]);
            ul.appendChild(li);
        }
    }

    const observer = new MutationObserver(notify);

    const config = { childList: true, subtree: true };

    observer.observe(targetNode, config);
}
