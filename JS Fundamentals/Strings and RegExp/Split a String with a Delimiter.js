function splitDelimeter(text, delimetar) {
   let result =  text.split(delimetar);
    for (let item of result) {
        console.log(item);
    }
}

splitDelimeter('One-Two-Three-Four-Five', '-')
splitDelimeter('http://platform.softuni.bg','.')