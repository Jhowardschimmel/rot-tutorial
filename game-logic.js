const Game = {
    display: null,
    map: {},

    init: function() {
        this.display = new ROT.Display();
        document.body.appendChild(this.display.getContainer());

        this._generateMap();
    },

    _generateMap: function() {
        var digger = new ROT.Map.Digger();

        var digCallback = function(x, y, value) {
            if (value) { return; } /* do not store walls */
            // var key = x+","+y;
            const key = `${x},${y}`
            this.map[key] = ".";
        }
        // .bind(this) ensures that our callback is called within a correct context 
        digger.create(digCallback.bind(this));
        this._drawWholeMap()
    },

    _drawWholeMap: function() {
        for (let key in this.map) {
            const parts = key.split(",");
            const x = parseInt(parts[0]);
            const y = parseInt(parts[1]);
            this.display.draw(x, y, this.map[key]);
        }
    }
}
