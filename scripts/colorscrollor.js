(function(w) {
    'use strict';

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
            rows = 0,
            rowsSeen = 0, // for transitionend event listener
            self = this;

        // constructor
        self.playing = false;
        container.addEventListener('transitionend', function(e) {
            // hide element when it was moved out of view
            e.target.style.visibility = 'hidden';

            // only respond to the event from the last child, to make sure we
            // respond precisely once per shift, instead of once per row
            if (++rowsSeen < rows) {
                return;
            }

            // continue shifting if the animation was not paused
            if (self.playing) {
                self.shift();
            }
        });


        self._addStrip = function(n, callback) {
            var newLi = w.document.createElement('li');
            // adjust container width?
            if (container.children.length === 0) {
                container.style.width = n + 'em';
            }
            // add actual strip
            for (let i = 0; i <= n; ++i) {
                var b = w.document.createElement('span');
                b.classList.add('block');
                if (i > 0) {
                    b.style.backgroundColor = callback(i - 1);
                } else {
                    // extra dummy block for playing animation
                    b.style.visibility = 'hidden';
                    b.style.marginLeft = '-1em';
                }
                newLi.appendChild(b);
            }
            container.appendChild(newLi);
            rows++;
        };


        self.addFromList = function(categories) {
            if (self.playing)  return;
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
        };

        self.addRandom = function() {
            if (self.playing)  return;
            self._addStrip(n, function(i) {
                var r = Math.floor(Math.random() * c);
                return rgbToHex(
                    colors[0][0] + (colors[1][0] - colors[0][0]) / (c - 1) * r,
                    colors[0][1] + (colors[1][1] - colors[0][1]) / (c - 1) * r,
                    colors[0][2] + (colors[1][2] - colors[0][2]) / (c - 1) * r
                );
            });
        };

        self.play = function() {
            if (self.playing)  return;
            self.playing = true;
            self.shift();
        };

        self.pause = function() {
            self.playing = false;
        };

        self.reset = function() {
            while (container.lastChild) {
                container.removeChild(container.lastChild);
            }
            rows = 0;
        };

        self.shift = function() {
            rowsSeen = 0;
            var lis = container.children, li;
            for (let i = 0; i < lis.length; ++i) {
                li = lis.item(i);
                // copy color of first block to dummy
                li.firstChild.style.backgroundColor =
                    li.children.item(1).style.backgroundColor;
                li.firstChild.style.marginLeft = '';
                li.appendChild(li.firstChild); // move dummy to back
                // update visibility
                li.lastChild.style.visibility = '';
                // do actual shift
                li.firstChild.style.marginLeft = '-1em';
            }
        };

    };

    w.ColorScrollor = cs;

}(window));
