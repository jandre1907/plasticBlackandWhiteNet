/**
* plastic tom alpha 0.0
*/

/**
 *  TEST1
 *  create a cell A which is connected to all entry
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
var PT = {};

(function(PT){
    var Brain = function(){
        this.summits = [];
        this.higherActiveCells = {};
        this.inputsLocations = [];// table of inputs for each byte of the test corresponding at the first stage of cells
        this.cellsHaveToProcess = [];//FIFO table of cells
        this.test = 0;
    }

    PT.Brain = Brain;
    
    Brain.prototype.learnStep = function () {
        this.processEntries(); // commit activity from byte of the test to first stage(bottom to top)
        this.processCells(); // commti activity until summit
        recognized = checkCellsActivity();// check summit (activity at top)
        if (!recognized) {
            this.createCell();// create new cell and merge common inputs (plastic creation)
        //TODO: or associate summit
        } else {
            this.reverseSignal(); // commit activity from summit to bottom (top to bottom)
        }
    }

    Brain.prototype.processEntries = function () {
        this.test++;
        for (var i = 0; i < this.image.length; i++){
            this.modifyInputsActivity(this.inputsLocation[i], this.image[i] > 0);
        }
    }

    Brain.prototype.modifyInputsActivity = function (inputs, activity) {
        for (var i = 0; i < inputs; i++){
            inputs[i].modifyActivity(activity);
        }
    }

    Brain.prototype.processCells = function () {
        while(cellsHaveToProcess.length > 0) {
            cellsHaveToProcess.shift().process();
        }
    }
    Brain.prototype.checkCellsActivity = function () {
        var res = false;
        for (var i = 0; i < this.summitCells; i++){
            if (summitCells[i].activity){
                res = summitCells[i];
                break;
            }
        }
        return res;
    }
    Brain.prototype.createCell = function () {

        this.input1 = this.getHigherActiveCells();
        this.input2 =  this.getActiveFreeLocation();
        this.primal = new Cell(input1, input2);
        this.summits.push(primal);
    }

    Brain.prototype.checkCellsActivity = function () {
    }
})(PT);

(function(PT){
    /**
    * Cells
    */
    var Cells = function(number) {
        this.inputs =[];
        this.activity = false;
        this.outputs = [];
        this.number = number;
    };

    Cells.prototype.modificationCondition  = function(processedInputs) {
        return processedInputs == this.inputs.length;
    }

    Cells.prototype.getInputs  = function() {
        return this.inputs;
    }

    Cells.prototype.process = function() {
        var res = this.processInputs();
        if (this.modificationCondition(res)) {
            this.increaseActivity();
        } else {
            this.decreaseActivity();
        }
    }

    Cells.prototype.increaseActivity = function() {
        this.activity = true;
        if (this.output) {
            this.output.activate();
            this.promote();
        } else {
            this.unpromote();
        }
    }

    Cells.prototype.decreaseActivity = function() {
        this.activity = false;
    }

    Cells.prototype.promote = function() {
        Brain.higherActiveCells[this.id] = this;
        for (var i = 0; i < this.inputs.length; i++){
            this.inputs[i].inside.unpromote();//unpromote lower cells
        }
    }
    Cells.prototype.unpromote = function() {
        if (Brain.higherActiveCells[this.id]) {
            delete Brain.higherActiveCells[this.id];
        }
    }

    Cells.prototype.processInputs = function() {
        var res = 0;
        for (var i = 0; i < this.inputs.length; i++){
            res += inputs[i].activity;
        }

        return res;
    }

    Cells.prototype.haveToProcess = function() {
        Brain.haveToProcess.push(this);
    }


    Cells.prototype.toString = function() {
        var res = "";
        res += "output: " + output.toString();
        res +=  "inputs.length" + inputs.length;
        for (var i = 0; i < this.inputs.length; i++){
            res += inputs[i].toString;
            res += ",";
        }

        return res;
    }
})(PT);


(function(PT){
        /**
    * Input
    */
    var Input = function(){
        this.outside = null;
        this.inside = null;
        this.activity = false;
    }

    Input.prototype.getInside = function() {
        return this.inside;
    }

    Input.prototype.getOutside = function() {
        return this.outside;
    }

    Input.prototype.modifyActivity = function(activity) {
        this.activity = activity;
        notifyOutside();
    }

    Input.prototype.increaseActivity = function() {
        this.activity = true;
        notifyOutside();
    }

    Input.prototype.decreaseActivity = function() {
        this.activity = false;
        notifyOutside();
    }

    Input.prototype.notifyOutside = function() {
        this.outside.haveToProcess();
    }
})(PT);
