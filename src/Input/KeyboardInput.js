function KeyboardInput(inputController) {
  this.inputController = inputController;
};

KeyboardInput.prototype.listen = function() {
  var inputController = this.inputController;
  document.addEventListener('keydown', function(e) {
     switch(e.keyCode) {
       case 37 :
       case 65 :
         inputController.left();
         break;
       case 40 :
       case 83 :
         inputController.down();
         break;
       case 39 :
       case 68 :
         inputController.right();
         break;
     }
  });
};
