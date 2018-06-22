function validate() {
    let username = $('#username')
    let email = $('#email')
    let password = $('#password')
    let confirmPass = $('#confirm-password')
    let company = $('#company')
    let companyInfo = $('#companyInfo')
    let companyNumber = $('#companyNumber')
    let submitBtn = $('#submit')
    let validation = $('#valid')
    let isValid = true

    company.on('change', function () {
        if (company.is(':checked')) {
            companyInfo.css('display', 'block')
        } else {
            companyInfo.css('display', 'none')
        }
    })
    submitBtn.on('click', function (ev) {
        ev.preventDefault()
        validationForm()
        validation.css('display', isValid ? 'block' : 'none')
        validation = true
    })

    function validationForm() {
        validateInputRegex(username, /^[A-Za-z\d]{3,20}$/g)
        validateInputRegex(email, /^.*?@.*?\..*$/g)
        if (confirmPass.val() === password.val()) {
            validateInputRegex(password,  /^\w{5,15}$/g)
            validateInputRegex(confirmPass,  /^\w{5,15}$/g)
        } else {
            password.css('border', 'solid red')
            confirmPass.css('border', 'solid red')
            isValid = false
        }

        if (company.is(':checked')) {
            validateCompanyInfo()
        }
        
        function validateInputRegex(input, pattern) {
            if (pattern.test(input.val())) {
                input.css('border', 'none')
            } else {
                input.css('border', 'solid red')
                isValid = false
            }
        }
        function validateCompanyInfo() {
            let numValue = Number(companyNumber.val())
            if (numValue >= 1000 && numValue <= 9999) {
                companyNumber.css('border', 'none')
            } else {
                companyNumber.css('border', 'solid red')
                isValid = false
            }
        }
    }
}
