/*jslint es6:true*/
function validate(siteName, siteUrl) {
    var urlText = document.getElementById('url'),
        siteText = document.getElementById('site'),
        expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi,
        regex = new RegExp(expression);

    function inputBorder(id, col) {
        var change = document.getElementById(id).style.borderColor = col,
            siteName = document.getElementById('siteName').value;
        return change;
    }

    if (!siteName) {
        inputBorder('siteName', '#ff0000');
        siteText.innerHTML = 'Incorrect value';
        return false;
    }

    if (!siteUrl.match(regex)) {
        urlText.innerHTML = 'Wrong URL, type again';
        siteText.innerHTML = '';
        inputBorder('siteUrl', '#ff0000');
        inputBorder('siteName', '#ccc');
        return false;
    } else {
        urlText.innerHTML = '';
        inputBorder('siteUrl', '#ccc');
        return true;
    }
}

function saveBookmark(event) {
    //    prevent from submitting
    event.preventDefault();
    var siteName = document.getElementById('siteName').value,
        siteUrl = document.getElementById('siteUrl').value,
        prefix = 'http://',
        bookmark,
        bookmarks;
    //    add http prefix
    if (siteUrl.substr(0, prefix.length) !== prefix) {
        siteUrl = prefix + siteUrl;
    }
    if (!validate(siteName, siteUrl)) {
        return false;
    } else {
        //        clear form
        document.getElementById("myForm").reset();
    };
    bookmark = {
        name: siteName,
        url: siteUrl
    };

    //    creating an empty array when bookmarks are null
    if (localStorage.getItem('bookmarks') === null) {
        bookmarks = [];
        //    add to local storage
        bookmarks.push(bookmark);
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    } else {
        //     get bookmarks from local storage and add new
        bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        bookmarks.push(bookmark);
        //     set again to local storage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }
    //    re-fetch
    fetchBookmarks();
}

function deleteBookmark(url) {
    "use strict";
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    // Loop through the bookmarks and remove from array
    for (var i = 0; i < bookmarks.length; i++) {
        if (bookmarks[i].url == url) {
            bookmarks.splice(i, 1);
         }
    }
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    fetchBookmarks();
}

function fetchBookmarks() {
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks')),
        bookmarksResults;
    if (localStorage.getItem('bookmarks') === null) {
        bookmarks = [];
    } else {
        // Get output
        bookmarksResults = document.getElementById('bookmarksResults');
        //        old code for emptying:
        //        bookmarksResults.innerHTML = '';
        while (bookmarksResults.firstChild) bookmarksResults.removeChild(bookmarksResults.firstChild);
        // Build output
        for (var i = 0; i < bookmarks.length; i++) {
            var name = bookmarks[i].name;
            var url = bookmarks[i].url;
            bookmarksResults.innerHTML += '<a target="_blank" class="link" href="' + url + '"><div class="frame">' +
                '<p>' + name +
                '<a onclick="deleteBookmark(\'' + url + '\')" class="close" href="#">&#10006</a> ' +
                '</p>' +
                '</div>';
        }
    }
}

window.onload = fetchBookmarks();
document.getElementById('myForm').addEventListener('submit', saveBookmark);