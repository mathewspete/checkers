var turnCt = 0;
var teamRed = 12;
var teamBlack = 12;
var coords = {};
var turnToggle = false;
let player,
status,
color,
turn,
activeSelect;


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

function isTurn(){
    turn = (turnCt % 2 === 0) ? "black" : 'red';
}

function active(params) {
    let square = [];
    let status = $(this).data('status')

    $("div").removeClass("active");
    player = (turn === 'black') ? 'red' : 'black';

    switch (status) {
        case turn:
            turnToggle = true;
            coords.row = ($(this).data('row'));
            coords.column = ($(this).data('col'));
            var activeSelect = $(this).find('div').attr('id');
            $(this).toggleClass('active');
            console.log(coords);
            break;
        case player:
            alert(`Nice try!\n. . .But it's not ${player}'s turn!`);
            turnToggle = false;
            break;

        default:
            console.log('default');
            let rOffset = $(this).data('row') - coords.row;
            let cOffset = $(this).data('col') - coords.column;
            console.log('rOffset ' + rOffset + ' | cOffset ' + cOffset);
            switch (turn) {
                case "black":
                    switch (rOffset) {
                        case -1:
                            if (cOffset === -1 || cOffset === 1) {
                                makeMove($(this).data('row'), $(this).data('col'))
                            }
                            break;

                        default:
                            break;
                    }
            }
            break;
    }
}



function makeMove(row, column) {
    // can add some animation here at some point.
    let moveToId = document.getElementById(`${row}-${column}`);
    let moveFromId = document.getElementById(`${coords.row}-${coords.column}`);
    let piece = moveFromId.innerHTML;
    moveFromId.innerHTML = "";
    moveToId.innerHTML = piece;
    turnToggle = false;
}

const makeMove = (selectedRow, selectedCol) => {
    console.log(`sqr = ${selectedRow}, ${selectedCol}`);
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