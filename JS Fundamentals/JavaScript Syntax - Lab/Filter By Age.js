function filterByAge(minAge, firstPerson, firstPersonAge, secondPerson, secondPersonAge) {
    let person1 = {name:firstPerson, age:firstPersonAge};
    let person2 = {name:secondPerson, age:secondPersonAge};
    if (person1.age >= minAge) {
        console.log(person1);
    }
    if (person2.age >= minAge){
        console.log(person2);
    }
}