function parsingDoc(text) {
    let surveyFound = /.*<svg>.+<\/svg>.*/g;
    let textOut = '';
    let count = 0;
    let votes = 0;
    let toPrintOrNot = true;
    if (surveyFound.test(text)) {
        for (let i = 0; i < 2; i++) {
            let formatFound = /<cat>.+<\/cat>/g;
            if (formatFound.test(text)) {
                let textFound = /<text>.+\[(.+)\]<\/text>/g;
                if (i === 0) {
                    if (textFound.test(text)) {
                        let newTextFound = /<text>.+\[(.+)\]<\/text>/g;
                        let match = newTextFound.exec(text);
                        textOut = match[1];
                    } else {
                        console.log('Invalid format');
                        toPrintOrNot = false;
                        break;
                    }
                }else{
                    let votingFound =/<g><val>(1|2|3|4|5|6|7|8|9|10)<\/val>([0-9][0-9]*)<\/g>/g;
                    if(votingFound.test(text)){
                        let newReg = /<g><val>(1|2|3|4|5|6|7|8|9|10)<\/val>([0-9][0-9]*)<\/g>/g;
                        let matches = newReg.exec(text);
                        while(matches){
                            let currentVote = Number(matches[1]);
                            let currentCount = Number(matches[2]);
                            count+=currentCount;
                            votes+=currentVote*currentCount;
                            matches = newReg.exec(text);
                        }
                    }else {
                        console.log('Invalid format');
                        toPrintOrNot = false;
                        break;
                    }
                }


            } else {

                console.log('Invalid format');
                toPrintOrNot = false;
                break;
            }
        }
    } else {
        console.log('No survey found');
        toPrintOrNot = false;
    }
    if(toPrintOrNot === true) {
        let sum = votes/count;
        console.log(`${textOut}: ${Math.round(sum * 100)/100}`)
    }
}