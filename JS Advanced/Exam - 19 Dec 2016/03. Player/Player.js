class Player {
    constructor(nickname) {
        this.nickname = nickname;
        this.scoreList = [];
    }

    get scoreCount() {
        return this.scoreList.length;
    }

    get highestScore() {
        return this.scoreList[0];
    }

    get topFiveScore() {
        return this.scoreList.slice(0, 5);
    }

    get nickname() {
        return this._nickname;
    }

    set nickname(name) {
        this._nickname = name;
    }

    toString() {
        return `${this.nickname}: [${this.scoreList}]`
    }

    addScore(num) {
        if (!isNaN(num) && num !== null) {
            this.scoreList.push(+num);
            this.scoreList.sort((a, b) => b - a);
        }
        return this;
    }
}



let peter = new Player("Peter");
console.log('Highest score: ' + peter.highestScore);
console.log(`Top 5 score: [${peter.topFiveScore}]`);
console.log('' + peter);
console.log('Score count: ' + peter.scoreCount);
peter.addScore(450);
peter.addScore(200);
console.log('Highest score: ' + peter.highestScore);
console.log(`Top 5 score: [${peter.topFiveScore}]`);
console.log('' + peter);
peter.addScore(2000);
peter.addScore(300);
peter.addScore(50);
peter.addScore(700);
peter.addScore(700)
console.log('Highest score: ' + peter.highestScore);
console.log(`Top 5 score: [${peter.topFiveScore}]`);
console.log('' + peter);
console.log('Score count: ' + peter.scoreCount);
console.log();
let maria = new Player("Maria")
    .addScore(350)
    .addScore(779)
    .addScore(180);
console.log('Highest score: ' + maria.highestScore);
console.log(`Top 5 score: [${maria.topFiveScore}]`);
console.log('' + maria);
