function gladiatorInventory(arr) {
    let inventory = arr.shift().split(" ");
    for (let str of arr) {
        let [comand, item] = str.split(" ");
        switch (comand) {
            case "Buy":
                if (!inventory.includes(item)) {
                    inventory.push(item);
                }
                break;
            case "Trash":
                let index = inventory.indexOf(item);
                if (index > -1){
                    inventory.splice(index, 1);
                }
                break;
            case "Repair":
                let index1 = inventory.indexOf(item);
                if (index1 > -1) {
                    let element = inventory.splice(index1, 1);
                    inventory.push(element[0]);
                }
                break;
            case "Upgrade":
                let [realItem, upgrade] = item.split("-");
                let index2  = inventory.indexOf(realItem);
                if (index2 > -1){
                    inventory.splice(index2 + 1, 0, realItem + ":" + upgrade);
                }
                break;
            case "Fight!":
                console.log(inventory.join(" "))
                break;
        }
    }
}

gladiatorInventory(['SWORD Shield Spear',
    'Buy Bag', 'Trash Shield', 'Repair Spear', 'Upgrade SWORD-Steel', 'Fight!'])
gladiatorInventory(['SWORD Shield Spear',
    'Trash Bow', 'Repair Shield', 'Upgrade Helmet-V', 'Fight!'])