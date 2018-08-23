function findWinnerArmy(kingdomsInput, battle) {
    let kingdoms = new Map();

    let kingdomWins = new Map();
    let kingdomDefeats = new Map();

    let generalWins = new Map();
    let generalDefeat = new Map();

    for (let i = 0; i < kingdomsInput.length; i++) {

        let kingdom = kingdomsInput[i].kingdom;
        let general = kingdomsInput[i].general;
        let army = Number(kingdomsInput[i].army);

        if (!kingdoms.has(kingdom)) {
            kingdoms.set(kingdom, new Map());
            kingdoms.get(kingdom).set(general, army);

            kingdomWins.set(kingdom, 0);
            kingdomDefeats.set(kingdom, 0);
        } else {
            if (!kingdoms.get(kingdom).has(general)) {
                kingdoms.get(kingdom).set(general, army);
            } else {
                kingdoms.get(kingdom).set(general, kingdoms.get(kingdom).get(general) + army)
            }
        }
        if(!generalWins.has(general) && !generalDefeat.has(general)){
            generalWins.set(general, 0);
            generalDefeat.set(general, 0);
        }
    }

    for (let i = 0; i < battle.length; i++) {
        let attackingKingdom = battle[i][0];
        let attackingGeneral = battle[i][1];
        let defendingKingdom = battle[i][2];
        let defendingGeneral = battle[i][3];

        if (attackingKingdom !== defendingKingdom) {

            let attackingArmy = kingdoms.get(attackingKingdom).get(attackingGeneral);
            let defendingArmy = kingdoms.get(defendingKingdom).get(defendingGeneral);

            if (attackingArmy !== defendingArmy) {
                if (attackingArmy > defendingArmy) {

                    kingdomWins.set(attackingKingdom, kingdomWins.get(attackingKingdom) + 1);
                    kingdomDefeats.set(defendingKingdom, kingdomDefeats.get(defendingKingdom) + 1);

                    generalWins.set(attackingGeneral, generalWins.get(attackingGeneral) + 1);
                    generalDefeat.set(defendingGeneral, generalDefeat.get(defendingGeneral) + 1);

                    attackingArmy = Math.floor(attackingArmy + (attackingArmy * 10) / 100);
                    defendingArmy = Math.floor(defendingArmy - (defendingArmy * 10) / 100);

                    kingdoms.get(attackingKingdom).set(attackingGeneral, attackingArmy);
                    kingdoms.get(defendingKingdom).set(defendingGeneral, defendingArmy);

                } else {

                    kingdomWins.set(defendingKingdom, kingdomWins.get(defendingKingdom) + 1);
                    kingdomDefeats.set(attackingKingdom, kingdomDefeats.get(attackingKingdom) + 1);

                    generalWins.set(defendingGeneral, generalWins.get(defendingGeneral) + 1);
                    generalDefeat.set(attackingGeneral, generalDefeat.get(attackingGeneral) + 1);

                    attackingArmy = Math.floor(attackingArmy - (attackingArmy * 10) / 100);
                    defendingArmy = Math.floor(defendingArmy + (defendingArmy * 10) / 100);

                    kingdoms.get(attackingKingdom).set(attackingGeneral, attackingArmy);
                    kingdoms.get(defendingKingdom).set(defendingGeneral, defendingArmy);

                }
            }

        }

    }
    let sortKingdoms = Array.from(kingdoms.keys())
        .sort(function (a, b) {
            if (kingdomWins.get(b) !== kingdomWins.get(a)) {
                return kingdomWins.get(b) - kingdomWins.get(a);
            } else {
                if (kingdomDefeats.get(a) !== kingdomWins.get(b)) {
                    return kingdomDefeats.get(a) - kingdomDefeats.get(b);
                } else {
                    return a.localeCompare(b);
                }


            }
        });
    for(let kingdom of sortKingdoms){
        console.log(`Winner: ${kingdom}`);
        let sortGenerals = Array.from(kingdoms.get(kingdom)).sort((a, b)=> b[1] - a[1]);
        for(let general of sortGenerals){
            console.log(`/\\general: ${general[0]}`);
            console.log(`---army: ${kingdoms.get(kingdom).get(general[0])}`);
            console.log(`---wins: ${generalWins.get(general[0])}`);
            console.log(`---losses: ${generalDefeat.get(general[0])}`)
        }
        break;
    }

}