var Key = {
    _pressed: {},
  
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
    
    isDown: function(keyCode: any) {
      return this._pressed[keyCode];
    },
    
    onKeydown: function(event: any) {
      this._pressed[event.keyCode] = true;
    },
    
    onKeyup: function(event: any) {
      delete this._pressed[event.keyCode];
    }
  };