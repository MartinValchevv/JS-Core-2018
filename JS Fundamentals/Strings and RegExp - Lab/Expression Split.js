function splitByReg(text) {
    let pattern = /[\s()\t\n;.,'' ]+/gm;
    let result = text.split(pattern);
    console.log(result.join("\n"));
}

