function search() {
    let target = $('#searchText').val()
    if (target.trim() !== "") {
        $('#towns li').css('font-weight', '');
      let arr = $(`#towns li:contains('${target}')`);
      arr.css('font-weight', 'bold');
        $('#result').text(arr.length + ' matches found.')
    }
}