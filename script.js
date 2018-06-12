// search bar
// zrobic media queries

document.getElementById('myForm').addEventListener('submit', saveBookmark);

function saveBookmark(event) {
    event.preventDefault() // zapobiega wyslaniu przez submit    
    var siteName = document.getElementById('siteName').value;
    var siteUrl = document.getElementById('siteUrl').value;

    if (!validate(siteName, siteUrl)) {
        return false;
    } else {
        document.getElementById("myForm").reset();
    }

    var bookmark = {
        name: siteName,
        url: siteUrl
    }

    if (localStorage.getItem('bookmarks') === null) {
        var bookmarks = [];
        bookmarks.push(bookmark);
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    } else {
        var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        bookmarks.push(bookmark);
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }

    fetchBookmarks();

}


function deleteBookmark(url) {

    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    for (var i = 0; i < bookmarks.length; i++) {
        if (bookmarks[i].url == url) {
            bookmarks.splice(i, 1);
        }
    }
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    fetchBookmarks();
}


function fetchBookmarks() {
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    var bookmarksResults = document.getElementById('bookmarksResults');
    bookmarksResults.innerHTML = '';
    for (let i = 0; i < bookmarks.length; i++) {
        var name = bookmarks[i].name;
        var url = bookmarks[i].url;

        bookmarksResults.innerHTML += '<a target="_blank" class="link" href="' + url + '"><div class="frame">' +
            '<p>' + name +
            '<a onclick="deleteBookmark(\'' + url + '\')" class="close" href="#">&#10006</a> ' +
            '</p>' +
            '</div>';
    }
}

function validate(siteName, siteUrl) {
    if (!siteName) {
        alert('sitename'); // w przyszlosci czerwony napis obok pola wpisz name
        return false;
    } else if (!siteUrl) {
        alert('siteurl'); // w przyszlosci czerwony napis obok pola wpisz url
        return false;
    }

    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);

    if (!siteUrl.match(regex)) {
        alert('Please use a valid URL');
        return false;
    }
    return true;
}

window.onload = fetchBookmarks();