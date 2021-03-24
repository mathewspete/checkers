var turnCt = 0;
var turn;
var color;
var activeSelect;
var teamRed = 12;
var teamBlack = 12;
var fromTo = [];
var turnToggle = false;

/*

while (teamRed>0 && teamBlack>0)
    // no must jump, but must complete double jumps.
        click a square
        check if square has a piece
        if it the piece is the color for turn, set turnToggle to TRUE
        toggle an "active" class to highlight the selected piece
        wait the next click
            if click has checker same as turn, set that square to active
            if click = +/- 1 rc && square is open, move active piece.
            if click = +/- 2 rc && rc +/- 1 is opp color, clear the opp piece teamOpp-- and move active piece.
                if +/- 2 is open and +/- 1 is opp color, keep square active.
                else, end turn
*/


function active(params) {
    var square = [];

    $("div").removeClass("active");
    var player = (turn === 'black') ? 'red' : 'black';
    if ($(this).data('status') === turn) {
        turnToggle = true;
        square.push($(this).data('row'));
        square.push($(this).data('col'));
        fromTo[0] = square;
        var activeSelect = $(this).find('div').attr('id');
        $(this).toggleClass('active');
        console.log(fromTo);
    } if ($(this).data('status') === player) {
        alert(`Nice try!\n. . .But it's not ${player}'s turn!`);
        turnToggle = false;
    } else {
        if (turnToggle === true) {
            if ($(this).data('row') === fromTo[0])
        }
        turnToggle = false;
    }
}









console.log('hello');

function getLocale() {
    let $val = $(this);
    console.log(`${$val.data('row')}, ${$val.data('col')}`);
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
    turnCt++;
}

function isTurn() {
    turn = (turnCt % 2 === 0) ? "black" : 'red';
}
function getColor(sqr) {
    var alt = $(this).find('div').attr('class');
    //console.log(alt.includes('black'));
    color = alt;
    alert(`inner div class is ${alt}, and turn #${turnCt}`);
    //let $color = this.find(".checker").data('player');
    //alert(`player ${$color}`);
}

/*
$(".square").on('click', fu);
$('.square').click(getColor);//, getColor);
*/
$('.dark').click(isTurn);
//$('div').click($("div").removeClass("active"));
$('.dark').click(active);