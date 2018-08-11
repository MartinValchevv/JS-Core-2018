const BASE_URL = 'https://baas.kinvey.com/'
const APP_KEY = 'kid_S1gmEv2HQ'
const APP_SECRET = 'f5ecc4568b9d4980b23bce92cab70b3f'
const AUTH_HEADERS = { 'Authorization': "Basic " + btoa(APP_KEY + ":" + APP_SECRET) }


function loginUser() {
    let username = $('#loginForm input[name=username]').val()
    let password = $('#loginForm input[name=password]').val()

    if (RegExp('^[a-zA-Z]{3,}$').test(username)) {
        if (RegExp('^[a-zA-Z0-9]{6,}$').test(password)) {

            $.ajax({
                method: 'POST',
                url: BASE_URL + 'user/' + APP_KEY + '/login',
                headers: AUTH_HEADERS,
                data: { username, password }
            }).then(function (res) {
                $('#loginForm').trigger('reset')
                signInUser(res, 'Login successful.')
            }).catch(handleAjaxError)

        } else {
            showError('A password should be at least 6 characters long and should contain only english alphabet letters and digits.')
        }
    } else {
        showError('A username should be at least 3 characters long and should contain only english alphabet letters.')
    }
}

function registerUser() {
    let username = $('#registerForm input[name=username]').val()
    let password = $('#registerForm input[name=password]').val()
    let repeatPass = $('#registerForm input[name=repeatPass]').val()

    if (RegExp('^[a-zA-Z]{3,}$').test(username)) {
        if (RegExp('^[a-zA-Z0-9]{6,}$').test(password)) {
            if (password == repeatPass) {

                $.ajax({
                    method: 'POST',
                    url: BASE_URL + 'user/' + APP_KEY + '/',
                    headers: AUTH_HEADERS,
                    data: { username, password }
                }).then(function (res) {
                    $('#registerForm').trigger('reset')
                    signInUser(res, 'Registration successful.')
                }).catch(handleAjaxError)

            } else {
                showError('Passwords do not match.')
            }
        } else {
            showError('A password should be at least 6 characters long and should contain only english alphabet letters and digits.')
        }
    } else {
        showError('A username should be at least 3 characters long and should contain only english alphabet letters.')
    }

}

function logoutUser() {
    $.ajax({
        method: 'POST',
        url: BASE_URL + 'user/' + APP_KEY + '/_logout',
        headers: { 'Authorization': 'Kinvey ' + sessionStorage.getItem('authToken') }
    }).then(function () {
        sessionStorage.clear()
        showInfo('Logout successful.')
        showHideMenuLinks()
    }).catch(handleAjaxError)

}

function signInUser(res, message) {
    sessionStorage.setItem('username', res.username)
    sessionStorage.setItem('authToken', res._kmd.authtoken)
    sessionStorage.setItem('id', res._id)
    showHideMenuLinks()
    showInfo(message)
}

function listPosts() {
    showView('viewCatalog')
    $('#viewCatalog .posts').empty()
    $.ajax({
        method: 'GET',
        url: BASE_URL + 'appdata/' + APP_KEY + '/posts?query={}&sort={"_kmd.ect": -1}',
        headers: { 'Authorization': 'Kinvey ' + sessionStorage.getItem('authToken') }
    }).then(function (res) {
        displayPosts(res, 'viewCatalog')
    }).catch(handleAjaxError)
}

function displayPosts(res, section) {
    if (res.length != 0) {
        let rank = 1
        for (let post of res) {

            let ul = $('<ul>')
            let article = $('<article>').addClass('post')
                .append($('<div>').addClass('col rank')
                    .append('<span>').text(rank++))
                .append($('<div>').addClass('col thumbnail')
                    .append($('<a>').attr('href', post.url)
                        .append($('<img>').attr('src', post.imageUrl))))
                .append($('<div>').addClass('post-content')
                    .append($('<div>').addClass('title')
                        .append($('<a>').attr('href', post.url).text(post.title)))
                    .append($('<p>').text(post.description))
                    .append($('<div>').addClass('details')
                        .append($('<div>').addClass('info').text(`submited ${calcTime(post._kmd.ect)} ago by ${post.author}`))
                        .append($('<div>').addClass('controls')
                            .append(ul)
                        )
                    )
                )

            let comments = $('<li>').addClass('action').append($('<a>').attr('href', '#').addClass('commentsLink').text('comments').on('click', function () {
                displayComments(post)
                sessionStorage.setItem('postId', post._id)
            }))

            let edit = $('<li>').addClass('action').append($('<a>').attr('href', '#').addClass('editLink').text('edit').on('click', function () {
                loadPostForEdit(post)
                sessionStorage.setItem('postId', post._id)
            }))
            let deleteLink = $('<li>').addClass('action').append($('<a>').attr('href', '#').addClass('deleteLink').text('delete').on('click', function () {
                deletePost(post)
            }))
            $(ul).append(comments)

            if (sessionStorage.getItem('username') == post.author) {
                $(ul).append(edit)
                $(ul).append(deleteLink)
            }

            $(`#${section} .posts`).append($(article))
        }

    } else {
        $(`#${section} .posts`).append($('<p>').text('No posts in database'))
    }
}

function displayComments(post) {
    showView('viewComments')
    $('#postContent').empty()

    if (post.description == '') {
        post.description = 'No description'
    }

    let postContent = $(` <div class="col thumbnail">
    <a href="${post.url}">
        <img src="${post.imageUrl}">
    </a>
</div>
<div class="post-content">
    <div class="title">
        <a href="${post.url}">
            ${post.title}
        </a>
    </div>
    <div class="details">
        <p>${post.description}</p>
        <div class="info">
            submitted ${calcTime(post._kmd.ect)} ago by ${post.author}
        </div>
        <div class="controls">
        </div>
    </div>
</div>
<div class="clear"></div>`)
    $('#postContent').append($(postContent))

    let ul = $('<ul>')
    let edit = $('<li>').addClass('action').append($('<a>').attr('href', '#').addClass('editLink').text('edit').on('click', function () {
        loadPostForEdit(post)
        sessionStorage.setItem('postId', post._id)
        console.log('edit');
    }))
    let deleteLink = $('<li>').addClass('action').append($('<a>').attr('href', '#').addClass('deleteLink').text('delete').on('click', function () {
        deletePost(post)
        console.log('delete');
    }))
    $(`#viewComments .controls`).append(ul)
    if (sessionStorage.getItem('username') == post.author) {
        $(ul).append(edit)
        $(ul).append(deleteLink)
    }
    loadComments(post._id)
}

function loadComments(postId) {
    $('#viewComments article').remove()
    $('#viewComments div h3').remove()

    $.ajax({
        method: 'GET',
        url: BASE_URL + 'appdata/' + APP_KEY + `/comments?query={"postId":"${postId}"}&sort={"_kmd.ect": -1}`,
        headers: { 'Authorization': 'Kinvey ' + sessionStorage.getItem('authToken') }
    }).then(function (res) {
        if (res.length != 0) {
            for (let comment of res) {
                let article = $('<article>').addClass('post post-content')
                $('#viewComments').append($(article)
                    .append($('<p>').text(comment.content))
                    .append($('<div>').addClass('info')
                        .append($('<a>').text(`submitted ${calcTime(comment._kmd.ect)} ago by ${comment.author} `))
                    )
                )
                if (sessionStorage.getItem('username') === comment.author) {
                    $(article).find('div').append($('<a>').addClass('deleteLink').attr('href', '#').text('| delete').on('click', function () {
                        deleteComment(comment)
                    }))
                }
            }
        } else {
            $('#viewComments').append($('<div>').append($('<h3>').html('<center>No comments yet.</center>')))
        }

    }).catch(handleAjaxError)
}

function viewSubmit() {
    let url = $('#submitForm input[name=url]').val()
    let title = $('#submitForm input[name=title]').val()
    let imageUrl = $('#submitForm input[name=image]').val()
    let description = $('#submitForm textarea[name=comment]').val()
    let author = sessionStorage.getItem('username')

    if (RegExp('^([http:]|[https:]).*$').test(url)) {
        if (RegExp('^([a-zA-Z0-9-_]\\s*)+$').test(title)) {
            if (RegExp('^([http:]|[https:]).*([.png]|[.jpg]|[.gif])$').test(imageUrl) || imageUrl == '') {
                $.ajax({
                    method: 'POST',
                    url: BASE_URL + 'appdata/' + APP_KEY + '/posts',
                    headers: { 'Authorization': 'Kinvey ' + sessionStorage.getItem('authToken') },
                    data: { url, title, imageUrl, description, author }
                }).then(function (res) {
                    listPosts()
                    $('#submitForm').trigger('reset')
                    showInfo('Post added.')
                }).catch(handleAjaxError)

            } else {
                showError('Invalid image url.')
            }
        } else {
            showError('Invalid title.')
        }
    } else {
        showError('Invalid url.')
    }


}

function loadPostForEdit(post) {
    showView('viewEdit')
    let url = $('#editPostForm input[name=url]').val(post.url)
    let title = $('#editPostForm input[name=title]').val(post.title)
    let imageUrl = $('#editPostForm input[name=image]').val(post.imageUrl)
    let description = $('#editPostForm textarea[name=description]').val(post.description)
}

function editPost(post) {
    let url = $('#editPostForm input[name=url]').val()
    let title = $('#editPostForm input[name=title]').val()
    let imageUrl = $('#editPostForm input[name=image]').val()
    let description = $('#editPostForm textarea[name=description]').val()
    let author = sessionStorage.getItem('username')
    let postId = sessionStorage.getItem('postId')

    if (RegExp('^([http:]|[https:]).*$').test(url)) {
        if (RegExp('^([a-zA-Z0-9-_]\\s*)+$').test(title)) {
            if (RegExp('^([http:]|[https:]).*([.png]|[.jpg]|[.gif])$').test(imageUrl) || imageUrl == '') {
                $.ajax({
                    method: 'PUT',
                    url: BASE_URL + 'appdata/' + APP_KEY + '/posts/' + postId,
                    headers: { 'Authorization': 'Kinvey ' + sessionStorage.getItem('authToken') },
                    data: { url, title, imageUrl, description, author }
                }).then(function (res) {
                    listPosts()
                    $('#editPostForm').trigger('reset')
                    showInfo('Post edited.')
                }).catch(handleAjaxError)

            } else {
                showError('Invalid image url.')
            }
        } else {
            showError('Invalid title.')
        }
    } else {
        showError('Invalid url.')
    }

}

function deletePost(post) {
    $.ajax({
        method: 'DELETE',
        url: BASE_URL + 'appdata/' + APP_KEY + '/posts/' + post._id,
        headers: { 'Authorization': 'Kinvey ' + sessionStorage.getItem('authToken') }
    }).then(function (res) {
        listPosts()
        showInfo('Post deleted.')
    }).catch(handleAjaxError)
}

function viewMyPosts() {
    showView('viewMyPosts')
    $('#viewMyPosts .posts').empty()
    let username = sessionStorage.getItem('username')

    $.ajax({
        method: 'GET',
        url: BASE_URL + 'appdata/' + APP_KEY + `/posts?query={"author":"${username}"}&sort={"_kmd.ect": -1}`,
        headers: { 'Authorization': 'Kinvey ' + sessionStorage.getItem('authToken') }
    }).then(function (res) {
        $('#viewMyPosts .posts').empty()
        displayPosts(res, 'viewMyPosts')
    }).catch(handleAjaxError)
}

function addComment() {
    let content = $('#commentForm textarea[name=content]').val()
    let author = sessionStorage.getItem('username')
    let postId = sessionStorage.getItem('postId')
    $('#commentForm').trigger('reset')

    if (content.length != 0) {
        $.ajax({
            method: 'POST',
            url: BASE_URL + 'appdata/' + APP_KEY + '/comments',
            headers: { 'Authorization': 'Kinvey ' + sessionStorage.getItem('authToken') },
            data: { content, author, postId }
        }).then(function (res) {
            loadComments(postId)
            showInfo('Comment added.')
        }).catch(handleAjaxError)
    }

}

function deleteComment(post) {
    $.ajax({
        method: 'DELETE',
        url: BASE_URL + 'appdata/' + APP_KEY + '/comments/' + post._id,
        headers: { 'Authorization': 'Kinvey ' + sessionStorage.getItem('authToken') }
    }).then(function (res) {
        loadComments(post.postId)
        showInfo('Comment deleted.')
    }).catch(handleAjaxError)

}

function calcTime(dateIsoFormat) {
    let diff = new Date - (new Date(dateIsoFormat));
    diff = Math.floor(diff / 60000);
    if (diff < 1) return 'less than a minute';
    if (diff < 60) return diff + ' minute' + pluralize(diff);
    diff = Math.floor(diff / 60);
    if (diff < 24) return diff + ' hour' + pluralize(diff);
    diff = Math.floor(diff / 24);
    if (diff < 30) return diff + ' day' + pluralize(diff);
    diff = Math.floor(diff / 30);
    if (diff < 12) return diff + ' month' + pluralize(diff);
    diff = Math.floor(diff / 12);
    return diff + ' year' + pluralize(diff);
    function pluralize(value) {
        if (value !== 1) return 's';
        else return '';
    }
}

function handleAjaxError(response) {
    let errorMsg = JSON.stringify(response)
    if (response.readyState === 0)
        errorMsg = "Cannot connect due to network error."
    if (response.responseJSON && response.responseJSON.description)
        errorMsg = response.responseJSON.description
    showError(errorMsg)
}