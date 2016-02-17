(function(w) {

    function pad(s, l) {
        if (typeof(l) === 'undefined')  l = 2;
        while (s.length < l)  s = '0' + s;
        return s;
    }

    function rgbToHex(r, g, b) {
        return '#' + pad(Math.floor(r).toString(16))
                   + pad(Math.floor(g).toString(16))
                   + pad(Math.floor(b).toString(16));
    }

    var cs = function(container) {

        var n = 50, // number of items per row
            c = 15, // number of classes
            colors = [ // light and dark colors as RGB (colorbrewer Blues 9)
                [247, 251, 255], // light
                [  8,  48, 107] // dark
            ],
            newLi = null,
            playInterval = null,
            self = this;

        // constructor
        container.style.width = n + 'em';
        self.playing = false;


        self._addStrip = function(n, callback) {
            for (let i = 0; i <= n; ++i) {
                var b = w.document.createElement('span');
                b.classList.add('block');
                if (i > 0) {
                    b.style.backgroundColor = callback(i - 1);
                } else {
                    // extra dummy block for playing animation
                    b.style.backgroundColor = 'red';
                    b.style.marginLeft = '-1em';
                }
                newLi.appendChild(b);
            }
        };

        self._newLi = function() {
            newLi = w.document.createElement('li');
        };

        self._newLiDone = function() {
            container.appendChild(newLi);
            newLi = null;
        };


        self.addFromList = function(categories) {
            self._newLi();
            var lines = categories.split('\n');
            for (let l = lines.length, i = 0; i < l; ++i) {
                var blocks = lines[i].split(',');
                self._addStrip(blocks.length, function(i) {
                    var b = parseInt(blocks[i]);
                    b = Math.max(0, Math.min(b, c - 1)); // clip to [0, c)
                    return rgbToHex(
                        colors[0][0] + (colors[1][0] - colors[0][0]) / (c - 1) * b,
                        colors[0][1] + (colors[1][1] - colors[0][1]) / (c - 1) * b,
                        colors[0][2] + (colors[1][2] - colors[0][2]) / (c - 1) * b
                    );
                });
            }
            self._newLiDone();
        };

        self.addRandom = function() {
            self._newLi();
            self._addStrip(n, function(i) {
                var r = Math.floor(Math.random() * c);
                return rgbToHex(
                    colors[0][0] + (colors[1][0] - colors[0][0]) / (c - 1) * r,
                    colors[0][1] + (colors[1][1] - colors[0][1]) / (c - 1) * r,
                    colors[0][2] + (colors[1][2] - colors[0][2]) / (c - 1) * r
                );
            });
            self._newLiDone();
        };

        self.play = function() {
            if (self.playing)  return;
            self.playing = true;
            self.shift();
            playInterval = w.setInterval(function() {
                if (self.playing) {
                    self.shift();
                } else {
                    w.clearInterval(playInterval);
                    playInterval = null;
                }
            }, 400);
        };

        self.pause = function() {
            self.playing = false;
        };

        self.reset = function() {
            while (container.lastChild) {
                container.removeChild(container.lastChild);
            }
        };

        self.shift = function() {
            var lis = container.children, li;
            for (let i = 0; i < lis.length; ++i) {
                li = lis.item(i);
                // copy color of first block to dummy
                li.children.item(0).style.backgroundColor =
                    li.children.item(1).style.backgroundColor;
                li.children.item(0).style.marginLeft = '';
                li.appendChild(li.children.item(0)); // move dummy to back
                // do actual shift
                li.children.item(0).style.marginLeft = '-1em';
            }
        };

    };

    w.ColorScrollor = cs;

}(window));
