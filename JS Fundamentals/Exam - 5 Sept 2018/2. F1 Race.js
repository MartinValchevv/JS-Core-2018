function race(input) {
    let current = input.shift().split(" ");
    for (let str of input) {
        let [comand, name] = str.split(" ");
        switch (comand) {
            case "Join":
                if (!current.includes(name)) {
                    current.push(name);
                }
                break;
            case "Crash":
                let index = current.indexOf(name);
                if (index > -1) {
                    current.splice(index, 1);
                }
                break;
            case "Pit":
                if (current.includes(name)) {
                    let indexOfPilot = current.indexOf(name);
                    if (indexOfPilot !== current.length - 1) {
                        let nextPilot = current[indexOfPilot + 1];
                        current[indexOfPilot] = nextPilot;
                        current[indexOfPilot + 1] = name;
                    }
                }
                break;
            case "Overtake":
                if (current.includes(name)) {
                    let indexOfPilot = current.indexOf(name);
                    if (indexOfPilot !== 0) {
                        let prevPilot = current[indexOfPilot - 1];
                        current[indexOfPilot] = prevPilot;
                        current[indexOfPilot - 1] = name;
                    }
                    break
                }
        }
    }
    console.log(current.join(' ~ '));
}

race(["Vetel Hamilton Slavi",
    "Pit Hamilton",
    "Overtake Vetel",
    "Crash Slavi"]
)

race(["Vetel Hamilton Raikonnen Botas Slavi",
    "Pit Hamilton",
    "Overtake LeClerc",
    "Join Ricardo",
    "Crash Botas",
    "Overtake Ricardo",
    "Overtake Ricardo",
    "Overtake Ricardo",
    "Crash Slavi"]
)