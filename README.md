plasticBlackandWhiteNet
=======================

Neuronal network based on bud and blossom idea

// Tests and entry
Tests are B&W images for example.

each bit of the test are under two entries, one white and one black.
one of these two entries is active, the other is inactive.
* If bit is 1 white entry is active and black inactive.
* If bit is 0 black entry is active and white is inactive.

// Cells

Cells have 3 main states
	* 1
	* 0
	* inactive
	
Cells are black or white.

Cells have many input and many output.

// Inputs
Inputs are connected to entries or cells.

* Black or white cells at activity 1 are potential targets to be plugged by inputs of a new white cell
* Black or white cells at activity 0 are potential targets to be plugged by inputs of a new black cell
* Black or white inactive cells aren't targets for nothing

input have an activity depending:
* on his weight
* on his color
* on the activity of the source

black input connected on a 0-state cell or entry is activated to 1

// Bud
If a cell is in 0 state, and output cells are inactive, then a bud cell is created.
* This bud take the inputs in state 1 of his mother cell
* This bud is activated


/**
 *  TEST1
 *  create a a white cell Aw and a black cell Ab which are connected to all entries
	respectively Aw is connected on all white active entries and Ab on the blacks.	
	create a white associative cell Bw connected to Aw and Ab
 *
 *  TEST2
 *  check activity of cell A
 *  if it's not active:
 *      create an active bud with active input (occup entry or cell)
 *      replace active inputs by a single new white input connected on the bud
 *      create a new Cell B white-connected on the bud and on the free entry
 *
 *  else:
 *      check activity level:
 *          low : modify entry factor to have a better activity
 *              i.e.: bright bad black inputs, shadow bad white inputs
 *          high: do nothing
 *
 *  TEST3
 *  check activity of bud, Cell A and Cell B
 *  ie:
 *      commit activity from bottom to top
 *      save the higher active cells
 *      save the lower inactive cells with active inputs
 *  if no one is active:
 *      create a new bud on bud if many entry are active
 *      create a new bud on B if many entry are active
 *      create a new bud on A if many entry are active
 *      create new cell C connected on active cells and free entry
 *
 *
 *  TEST3 necessity:
 *      knowledge of free entry and occuped entry
 *      Entry are free if inputs connected on are not owned by an active cell
 *      knowledge of higher active cells
 *      knowledge of lower inactive cells
 *      Only inputs connected on entries can be black *

 *
 *  Colored inputs:
 *  white:        entry xor 0
 *  black:        entry xor 1
 *  bright grey:  entry xor 0.2
 *  dark grey:    entry xor 0.8
 *  1 xor 0 = 1
 *  1 xor 0.2 = 0.8
 *  0 xor 1 = 1
 *  0 xor 0.8 = 0.8
 *
 *  func is funk abs(value-weightColor)
 *  bright weigthColor - 0.1
 *  shadow weigthColor + 0.1
 *
 */

/**
* Brain
*/