function templateFormat(input) {
    let XML = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n" +
        "<quiz>\n";

    XML += collectQuestions(input);

    return XML += "</quiz>";

    function collectQuestions(input) {
        let XML = "";
        for (let i = 0; i < input.length; i += 2) {
            let question = input[i];
            let answer = input[i + 1];

            XML += `  <question>\n    ${question}\n  </question>\n  <answer>\n    ${answer}\n  </answer>\n`;
        }
        return XML;
    }
}
