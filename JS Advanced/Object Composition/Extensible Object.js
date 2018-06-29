function extensibleObject() {
    return {
        extend: function (template) {
            for (let prop in template) {
                if (template.hasOwnProperty(prop)) {
                    if (typeof template[prop] === "function") {
                        this.__proto__[prop] = template[prop];
                    } else {
                        this[prop] = template[prop];
                    }
                }
            }
        }
    };
}

let template = {
    name: "mario",
    age: 1,
    sex: "djendar",
    myFunc: function () {
        return true;
    }
};

let obj = extensibleObject();
obj.extend(template);
console.log(obj);
console.log(obj.__proto__);