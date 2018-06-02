function restorantBill(bill) {
    let products = bill.filter((x, i) => i % 2 === 0);
    let price = bill.filter((x, i ) => i % 2 === 1).map(Number).reduce((a, b) => a + b);
    console.log(`You purchased ${products.join(", ")} for a total sum of ${price}`)
}

restorantBill(['Beer Zagorka', '2.65', 'Tripe soup', '7.80','Lasagna', '5.69'])
restorantBill(['Cola', '1.35', 'Pancakes', '2.88'])