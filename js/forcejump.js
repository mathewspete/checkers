var turnCt = 0;
var turn;
var activeSelect;

console.log('hello');

function getLocale() {
    let $val = $(this);
    console.log(`${$val.data('row')}, ${$val.data('col')}`);
}

function active(params) {
    var selection = $(this).find('div').attr('id');
}


function isQueen() {
    if ($(this).data('queen') === true) {
        return true;
    } else {
        return false;
    }
}

function makeQueen(id) {

}

function jump() {

}

function makeMove() {

}

function isTurn() {
    turn = (turnCt % 2 === 0) ? "black" : 'red';
}
function getColor(sqr) {
    var alt = $(this).find('div').attr('class');
    turnCt++;
    alert(`inner div class is ${alt}, and turn #${turnCt}`);
    //let $color = this.find(".checker").data('player');
    //alert(`player ${$color}`);
}

//$(".square").on('click', fu);
$('.square').click(getColor);//, getColor);
$('.square').click(getLocale);

