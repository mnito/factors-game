function Block(value, position, size) {
   this.value = value;
   this.position = position;
   this.size = size;
}

Block.prototype.setPosition = function(position) {
   this.position = position;
}

Block.prototype.transform = function( block, goal ) {
   var newValue = block.value;
   if( goal.current === goal.divide ) {
      newValue = block.value % this.value === 0 ? block.value / this.value : block.value * this.value;
   } else {
      //need to adjust this
      newValue = this.value % block.value === 0 ? block.value * this.value : this.value / block.value;
   }
   block.value = newValue;
}
