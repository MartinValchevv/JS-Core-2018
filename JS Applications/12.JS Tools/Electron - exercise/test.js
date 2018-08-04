module.exports = function () {
    let b = 5
    for (let i = 0; i < 5; i++) {
        b += i
    }
    document.getElementsByTagName('body')[0].textContent += 'Hello webpack change ' + b
}