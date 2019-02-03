var canvas;
var oldPt = { x: 0, y: 0 };
var oldMidPt = { x: 0, y: 0 };
var color = "#ff0000";
var width = 15;
var stage;
var drawingCanvas;
var cont;

document.addEventListener('DOMContentLoaded', setupCanvas);

function setupCanvas(){
    canvas = document.getElementById("drawing-canvas");
    stage = new createjs.Stage(canvas);
    stage.autoClear = false;
    stage.enableDOMEvents(true);

    // createjs.Touch.enable(stage);
    // createjs.Ticker.framerate = 24;

    drawingCanvas = new createjs.Shape();

    stage.addEventListener("stagemousedown", handleMouseDown);
    stage.addEventListener("stagemouseup", handleMouseUp);

    // stage.addChild(drawingCanvas);
    cont = new createjs.Container();
    cont.addChild(drawingCanvas);
    stage.addChild(cont);
    stage.update();
}


function handleMouseDown(event) {
    if (!event.primary) {
        return;
    }
    oldPt = new createjs.Point(stage.mouseX, stage.mouseY);
    oldMidPt = oldPt.clone();
    stage.addEventListener("stagemousemove", handleMouseMove);
}

function handleMouseMove(event) {
    if (!event.primary) {
        return;
    }
    var midPt = new createjs.Point(oldPt.x + stage.mouseX >> 1, oldPt.y + stage.mouseY >> 1);

    drawingCanvas.graphics.clear().setStrokeStyle(width, 'round', 'round').beginStroke(color).moveTo(midPt.x, midPt.y).curveTo(oldPt.x, oldPt.y, oldMidPt.x, oldMidPt.y);

    oldPt.x = stage.mouseX;
    oldPt.y = stage.mouseY;

    oldMidPt.x = midPt.x;
    oldMidPt.y = midPt.y;

    stage.update();
}

function handleMouseUp(event) {
    if (!event.primary) {
        return;
    }
    stage.removeEventListener("stagemousemove", handleMouseMove);
}

function changeWidth(size){
    width = size;
    var cursor = "url(assets/cursors/cursor" + size.toString() + ".png) " + (size/2).toString() + " " + (size/2).toString() + ", auto";
    document.getElementById('drawing-canvas').style.cursor = cursor;
}

function changeColor(newColor){
    color = newColor;
    document.getElementById('color-circle').style.background = color;
}

function clearCanvas(){
    drawingCanvas.graphics.beginStroke("white").beginFill('white').drawRect(0, 0, 2000, 2000);
    stage.update();
}

function fillCanvas(){
    drawingCanvas.graphics.beginStroke(color).beginFill(color).drawRect(0, 0, 2000, 2000);
    stage.update();
}

