function listProcessor(commands) {
    let metods = (() => {
        let list = [];

        function add(word) {
            list.push(word)
        }
        function remove(word) {
            list = list.filter(e => e !== word);
        }
        function print() {
            console.log(list.toString())
        }
        return {add, remove, print};
    })();

    for (let line of commands) {
        let [command, word] = line.split(/ /);
        metods[command](word)
    }
}

listProcessor(['add pesho', 'add gosho', 'add pesho', 'remove pesho', 'print']);