console.log(sudokune([["5","3",".",".","7",".",".",".","."],
                      ["6",".",".","1","9","5",".",".","."],
                      [".","9","8",".",".",".",".","6","."],
                      ["8",".",".",".","6",".",".",".","3"],
                      ["4",".",".","8",".","3",".",".","1"],
                      ["7",".",".",".","2",".",".",".","6"],
                      [".","6",".",".",".",".","2","8","."],
                      [".",".",".","4","1","9",".",".","5"],
                      [".",".",".",".","8",".",".","7","9"]]))

function sudokune(board) {

    //check board is valid Array
    if (board.length === 9) {
        let valids = ["1","2","3","4","5","6","7","8","9","."]
        // Build a set of all values in board
        let set = new Set()
        for (let i=0; i<9; i++) {
            set = new Set([...set, ...new Set(board[i])])
        }
        //compare is above set contains values not in valids.
        if (Array.from(set).every(elem => valids.includes(elem)) === false) {
            console.log("Input contains invalid values and/or characters.")
            return
        } 
    }
/*    

    function containsOnly(array1, array2){
        return array2.every(elem => array1.includes(elem))
      }
      console.log(containsOnly([1, 2, 3], [2,1,2,3,5]));
      console.log(containsOnly([1, 2], [2,1,2,1,1]));
*/
    // loop for rows. This is easy, just use the array in array position i for check.
    console.log('--------------------loop for rows')
    for (let i=0; i<9; i++) {
        if (checkArray(board[i]) === false) {
            console.log("failed on row " + i)
            return false
        }
    }
    //loop for columns. Build a check array by looping through the columns i and appending correct row j for the check.
    console.log("--------------------loop for cols")
    for (let i=0; i<9; i++) {
        //build column array'
        let colArray = []
        for (let j=0; j<9; j++) {
            colArray.push(board[j][i])
        }
        if (checkArray(colArray) === false) {
            console.log("failed on column " + i)
            return false
        }
    }
    //loop for squares. Build correct arrays by limiting arrays with x<3 (1st row/col) and x>5 (3rd row/col)
    console.log("--------------------loop for sqrs")
    let squareArrays = [[],[],[],[],[],[],[],[],[]]
    for (let i=0; i<9; i++) {
        for (let j=0; j<9; j++) {
            if (i<3) {
                if (j<3) {
                    squareArrays[0].push(board[i][j])
                } else if (j>5) {
                    squareArrays[2].push(board[i][j])
                } else {
                    squareArrays[1].push(board[i][j])
                }
            } else if (i>5) {
                if (j<3) {
                    squareArrays[6].push(board[i][j])
                } else if (j>5) {
                    squareArrays[8].push(board[i][j])
                } else {
                    squareArrays[7].push(board[i][j])
                }
            } else {
                if (j<3) {
                    squareArrays[3].push(board[i][j])
                } else if (j>5) {
                    squareArrays[5].push(board[i][j])
                } else {
                    squareArrays[4].push(board[i][j])
                }
            }
        }
    }
    // loop through build arrays to check for failures.
    for (let i=0; i<9; i++) {
        if (checkArray(squareArrays[i]) === false) {
            console.log("failed on square " + i)
            return false
        }
    }
    // if no check returned false, the sudoku is valid
    console.log("Passed. No flaws found.")
    return true

}

// Checking function.
function checkArray(origArray) {
    let cleanArray = []
    for (i=0;i<origArray.length;i++)
    {
        // check that value is valid 0-9 number.
        if (!isNaN(origArray[i]) && origArray[i] < 10) {
            cleanArray.push(origArray[i])
        }
    }
    // Set removes duplicates, comparing leght of original and set built array gives a failed condition.
    let checkArray = Array.from(new Set(cleanArray))
    if (cleanArray.length === checkArray.length)
    {
        return true;
    }
    else
    {
        return false;
    }

}