function getSortedList() {
    return {
        list: [],
        size: 0,
        add: function (element) {
            this.list.push(element)
            this.size++
            this.list.sort((a, b) => a - b)
        },
        remove: function (index) {
            if (index >= 0 && index < this.list.length) {
                this.list.splice(index, 1)
                this.size--
            }
        },
        get: function (index) {
            if (index >= 0 && index < this.list.length) {
                return this.list[index]
            }
        }
    }
}

let sortedList = getSortedList()
sortedList.add(3)
sortedList.add(7)
sortedList.add(6)
sortedList.add(4)