function attachAllEvents() {
   //Bind the navigation menu links
    $("form").on('submit', function (event) { event.preventDefault() })
    $('#btnRegister').on('click', registerUser)
    $('#btnLogin').on('click', loginUser)
    $('#logoutBtn').on('click', logoutUser)
    $('#linkCatalog').on('click', listPosts)
    $('#linkViewSubmit').on('click', () => showView('viewSubmit'))
    $('#btnSubmitPost').on('click', viewSubmit)
    $('#btnEditPost').on('click', editPost)
    $('#linkMyPosts').on('click', viewMyPosts)
    $('#btnPostComment').on('click', addComment)
    $("form").on('submit', function (event) { event.preventDefault() })


}