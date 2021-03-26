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
let debuggy = {};

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

function active() {
    status = "";
    status = $(this).attr('data-status');
    console.log(`status = ${status}`);

    $("div").removeClass("active");
    player = (turn === 'black') ? 'red' : 'black';

    switch (status) {
        case turn:
            debuggy.trigger = "status.player"
            debuggy.status = status;
            debuggy.turn = turn;
            debuggy.turnToggle = turnToggle;
            debuggy.coords = coords;
            debuggy.player = player;
            debuggy.class = $(this).attr("class");
            debuggy.id = activeSelect;
            console.log(debuggy);
            turnToggle = true;
            coords.row = ($(this).attr('data-row'));
            coords.column = ($(this).attr('data-col'));
            activeSelect = $(this).find('div').attr('id');
            $(this).toggleClass('active');
            console.log(`coords = ${coords}`);
            break;
        case player:
            debuggy.trigger = "status.player"
            debuggy.status = status;
            debuggy.turn = turn;
            debuggy.turnToggle = turnToggle;
            debuggy.coords = coords;
            debuggy.player = player;
            debuggy.class = $(this).attr("class");
            debuggy.id = activeSelect;
            console.log(debuggy);
            console(`Nice try!\n. . .But it's not ${player}'s turn!`);
            turnToggle = false;
            break;

        default:
            debuggy.trigger = "status.default"
            debuggy.status = status;
            debuggy.turn = turn;
            debuggy.turnToggle = turnToggle;
            debuggy.coords = coords;
            debuggy.player = player;
            debuggy.class = $(this).attr("class");
            debuggy.id = activeSelect;
            console.log(debuggy);
            let rOffset = $(this).attr('data-row') - coords.row;
            let cOffset = $(this).attr('data-col') - coords.column;
            columnOffsetNotJump = (cOffset === -1 || cOffset === 1);
            let jumpCol = coords.column+(cOffset/2);
            let jumpee = document.getElementById(`${coords.row-1}-${jumpCol}`);


            switch (turn) {
                case "black":
                    switch (rOffset) {
                        case -1:
                            if (columnOffsetNotJump) {
                                makeMove($(this).attr('data-row'), $(this).attr('data-col'))
                            }
                            break;
                        case -2:
                            if (checkJump(cOffset)) {
                                makeMove($(this).attr('data-row'), $(this).attr('data-col'));
                            }
                            break;

                        default:
                            break;
                    }
                    break;

                case "red":
                    switch (rOffset) {
                        case 1:
                            if (columnOffsetNotJump) {
                                makeMove($(this).attr('data-row'), $(this).attr('data-col'))
                            }
                            break;
                        case 2:
                            if (checkJump(cOffset)) {
                                makeMove($(this).attr('data-row'), $(this).attr('data-col'));
                            }
                            break;

                        default:
                            break;
                    }
                    break;
                default:
                    break;
            }
            break;
    }
}

const checkJump = (column) => {
    let jumpCol = parseInt(coords.column) + (column/2);
    console.log(`${coords.row-1}-${coords.column}-${column}`);
    let jumpee = document.getElementById(`${coords.row-1}-${jumpCol}`);
    console.log(`${coords.row-1}-${jumpCol}`);
    let jumpeeId = jumpee.getAttribute('data-status');
    return (jumpeeId === player && (column === -2 || column === 2));
}

const makeMove = (row, column) => {
    // can add some animation here at some point.
    let moveToId = document.getElementById(`${row}-${column}`);
    let moveFromId = document.getElementById(`${coords.row}-${coords.column}`);
    let piece = moveFromId.innerHTML;
    moveFromId.innerHTML = "";
    moveToId.innerHTML = piece;
    turnToggle = false;
    turnCt++ // will delete
    moveFromId.setAttribute('data-status', "open");
    moveToId.setAttribute('data-status', turn);
    coords = {};
    activeSelect = "";
}




console.log('hello');

function getLocale() {
    let $val = $(this);
    console.log(`${$val.attr('data-row')}, ${$val.attr('data-col')}`);
}



function isQueen() {
    if ($(this).attr('data-queen') === true) {
        return true;
    } else {
        return false;
    }
}

function makeQueen(id) {

}


function getColor(sqr) {
    var alt = $(this).find('div').attr('class');
    //console.log(alt.includes('black'));
    color = alt;
    alert(`inner div class is ${alt}, and turn #${turnCt}`);
    //let $color = this.find(".checker").attr('data-player');
    //alert(`player ${$color}`);
}

/*
$(".square").on('click', fu);
$('.square').click(getColor);//, getColor);
*/
$('.dark').click(isTurn);
//$('div').click($("div").removeClass("active"));
$('.dark').on("click", active);

const click = (id) => {

}