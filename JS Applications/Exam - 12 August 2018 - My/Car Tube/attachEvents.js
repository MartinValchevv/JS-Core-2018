function attachAllEvents() {
    //Bind the navigation menu links
    $('#loginBtn').on('click', showLoginView)
    $('#registerBtn').on('click', showRegisterView)
    $('#linkSign').on('click', showLoginView)
    $('#linkSignUp').on('click', showRegisterView)
    $('#homeLink').on('click', showHideMenuLinks)
    $('#logoutBtn').on('click', logoutUser)
    $('#createListingLink').on('click', showCreateView)
    $('#allListingLink').on('click', allCarsView)
    $('#myListingsLink').on('click', displayMyView)
    $('#editBtnForm').on('click', editCar)

    // Bind the form submit buttons
    $('#btnRegister').on('click', registerUser)
    $('#btnLogin').on('click', loginUser)
    $('#btnCreate').on('click', createCar)

    $("form").on('submit', function (event) { event.preventDefault() })
//
}