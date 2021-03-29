let debuggy = {};
let reds = ["r-1", "r-2", "r-3", "r-4", "r-5", "r-6", "r-7", "r-8", "r-9", "r-10", "r-11", "r-12"];
let blacks = ["b-1", "b-2", "b-3", "b-4", "b-5", "b-6", "b-7", "b-8", "b-9", "b-10", "b-11", "b-12"];
var teamRed = 12;
var teamBlack = 12;
var turnCt = 0;
var coords = {};
let nonPlayer,
    color,
    turn = "black";
    
let abs1 = -1, abs2 = -2;
let mustJump = {};
mustJump.list = [];
mustJump.available = [];
let theList = mustJump.list;
//let avial = mustJump.available;


/*

while (teamRed>0 && teamBlack>0)
click a square
check if square has a piece
toggle an "active" class to highlight the selected piece
wait the next click
if click has checker same as turn, set that square to active
if click = +/- 1 rc && square is open, move active piece.
if click = +/- 2 rc && rc +/- 1 is opp color, clear the opp piece teamOpp-- and move active piece.
if +/- 2 is open and +/- 1 is opp color, keep square active.
else, end turn
*/

mustJump.status = "open";

const winner = () => {
    alert((`${turn} wins!!`).toUpperCase());
}

const isBlack = () => {
    abs1 = -1; abs2 = -2; nonPlayer = "red"; return "black"
};

const isRed = () => {
    abs1 = 1; abs2 = 2; nonPlayer = "black"; return "red";
};

const isTurn = () => {
    turn = (turnCt % 2 === 0) ? isBlack() : isRed();
}


const mustJumpLocked = (sqrId, isQ) => {
    let sqr = {};
    sqr.row = parseInt(sqrId.getAttribute('data-row'));
    sqr.col = parseInt(sqrId.getAttribute('data-col'));

    let res = [];

    let direction1 = abs1;
    let direction2 = abs2;

    const checkMid = (plusMinus, landingId) => {
        if (document.getElementById(`${sqr.row + direction1}-${sqr.col + plusMinus}`).getAttribute('data-status') === nonPlayer) {
            theList.push(landingId);
            console.log(`${landingId} added to theList`);
            return true;
        } else { return false; }
    }
    //let checkA, checkB;

    const tryA = () => {
        try {
            let landingId = `${sqr.row + direction2}-${sqr.col + 2}`;
            checkA = (document.getElementById(landingId).getAttribute('data-status') === "open") ? checkMid(1, landingId) : false;
        }
        catch (err) {
            console.warn(err.message);
            checkA = false;
        }
        res.push(checkA);
    };
    const tryB = () => {
        try {
            let landingId = `${sqr.row + direction2}-${sqr.col - 2}`;
            checkB = (document.getElementById(landingId).getAttribute('data-status') === "open") ? checkMid(-1, landingId) : false;
        } catch (err) {
            console.warn(err.message);
            checkB = false;
        }
        res.push(checkB);
    }

    tryA();
    tryB();

    if (isQ) {
        direction1 = -abs1;
        direction2 = -abs2;
        //------console.log(`-abs1 & -abs2: ${-abs1} & ${-abs2}`);
        tryA();
        tryB();
    }

    //------console.log(res);
    return res.includes(true);
}


const makeActive = (clicked) => {
    coords.row = (clicked.getAttribute('data-row'));
    coords.column = (clicked.getAttribute('data-col'));
    clicked.classList.toggle('active');
    //    console.log(coords);
}

const piece2sqr = (id) => {
    let piece = document.getElementById(id);
    let parent = piece.parentElement;
    let isQ = (isQueen(piece));
    mustJumpLocked(parent.id, isQ);
}

const mustJumpPending = () => {
    color = (turn === "black") ? blacks : reds;
    color.forEach(piece2sqr);
}

const limitedCheck = (clicked, id) => {
    //------console.log(`limited`);
    if (theList.includes(id)) {
        checkMove(clicked, id);
    }
}

const openCheck = (clicked, id) => {
    let status = clicked.getAttribute('data-status');
    $("div").removeClass("active");
    //------console.log(`openCheck id = ${id}`);
    active(clicked, id, status);
}

const checkClick = (clicked, id) => {
    //------console.log(`checkClick id = ${id}`);
    let check = (theList.length > 0) ? limitedCheck(clicked, id) : openCheck(clicked, id);
}

const checkMove = (clicked, id) => {
    //------console.log(`checkMove id = ${id}`);
    let q = document.getElementById(`${coords.row}-${coords.column}`).firstElementChild;
    let rOffset = clicked.getAttribute('data-row') - coords.row;
    let cOffset = clicked.getAttribute('data-col') - coords.column;
    columnOffsetNoJump = (cOffset === -1 || cOffset === 1);

    switch (rOffset) {
        case abs1:
            //------console.log(`case abs1`);
            if (columnOffsetNoJump && (mustJump.status === "open")) {
                makeMove(clicked, id)
            }
            break;
        case abs2:
            //------console.log(`case abs2`);
            if (checkJump(cOffset, 1)) {
                makeMove(clicked, id);
            }
            break;
        case -abs2:
            //------console.log(`case -abs2`);
            if (isQueen(q)) {
                if (checkJump(cOffset, -1)) {
                    makeMove(clicked, id);
                }
                //------console.log(checkJump(cOffset));
            }
            break;
        case -abs1:
            //------console.log(`case -abs1`);
            if (isQueen(q)) {
                if (columnOffsetNoJump && (mustJump.status === "open")) {
                    makeMove(clicked, id)
                }
            }
            break;
        default:
            //------console.log(`case`);
            break;
    }
}

const active = (clicked, id, status) => {
    //------console.log(`active clicked = ${clicked}, id = ${id}, status = ${status}, turn = ${turn}`);
    switch (status) {
        case turn:
            makeActive(clicked);
            break;
        default:
            checkMove(clicked, id);
            break;
    }
}

const checkJump = (column, multiplier) => {
    //console.log(multiplier);
    let jumpCol = parseInt(coords.column) + (column/2);
    //console.log(`(coords.column) + (column/2) = ${coords.column} + ${column / 2} = ${jumpCol}`); /////////////////////////
    let jumpRow = parseInt(coords.row) + (abs1 * multiplier);
    //console.log(`jumpRow = coords.row+abs1; = ${jumpRow} = ${parseInt(coords.row)} + ${abs1 * multiplier}`) /////////////////////////
    let jumpeeId = document.getElementById(`${jumpRow}-${jumpCol}`);
    let jumpeeStatus = jumpeeId.getAttribute('data-status');
    let allowed = (jumpeeStatus === nonPlayer && (column === -2 || column === 2)) ? makeJump(jumpeeId) : false;
    return allowed;
};

const makeJump = (jumpeeId) => {
    let pieceId = jumpeeId.firstElementChild.id;
    jumpeeId.innerHTML = "";
    if (nonPlayer === "red") {
        reds.splice(reds.indexOf(pieceId), 1);
    } else {
        blacks.splice(blacks.indexOf(pieceId), 1);
    }
    if (color.length == undefined) { winner(); }
    jumpeeId.setAttribute('data-status', "open");
    mustJump.status = "locked"; //------console.log('189');
    return true;
};

const makeMove = (clicked, id) => {
    // can add some animation here at some point.
    let moveToId = document.getElementById(id);
    let moveFromId = document.getElementById(`${coords.row}-${coords.column}`);
    let piece = moveFromId.innerHTML;
    moveFromId.innerHTML = "";
    moveToId.innerHTML = piece;
    moveFromId.setAttribute('data-status', "open");
    moveToId.setAttribute('data-status', turn);
    let moveToRow = moveToId.getAttribute("data-row");
    let queen = clicked.firstElementChild;
    if ((moveToRow === "1" || moveToRow === "8") && isQueen(queen) === false) {
        makeQueen(queen);
    }
    if (mustJump.status === "locked") {
        if (!(mustJumpLocked(moveToId, isQueen(queen)))) {
            finalizeTurn();
        } else {
            coords.row = moveToId.getAttribute('data-row');
            coords.column = moveToId.getAttribute('data-col');
        }
    } else {
        finalizeTurn();
    }
}

const finalizeTurn = () => {
    turnCt++
    coords = {};
    theList = [];
    mustJump.status = "open";
    $("div").removeClass("active");
    isTurn();
    mustJumpPending();
    //console.log(`turnCt = ${turnCt}`);
}

function isQueen(clicked) {
    if (clicked.getAttribute('data-queen') === "true") {
        return true;
    } else {
        return false;
    }
}

function makeQueen(queen) {
    queen.setAttribute('data-queen', "true");
    queen.firstElementChild.classList.add('queen');

}

function click() {
    let id = $(this).attr("id");
    let clicked = document.getElementById(id);
    //console.log(`clicked ${id}`);
    checkClick(clicked, id);
}

$('.dark').on("click", click);

