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
            playInterval = null,
            self = this;

        // constructor
        container.style.width = n + 'em';
        self.playing = false;

        self.addRandom = function() {
            var li = w.document.createElement('li');
            for (let i = 0; i <= n; ++i) {
                var b = w.document.createElement('span'),
                    r = Math.floor(Math.random() * c);
                b.classList.add('block');
                if (i > 0) {
                    b.style.backgroundColor = rgbToHex(
                        colors[0][0] + (colors[1][0] - colors[0][0]) / (c - 1) * r,
                        colors[0][1] + (colors[1][1] - colors[0][1]) / (c - 1) * r,
                        colors[0][2] + (colors[1][2] - colors[0][2]) / (c - 1) * r
                    );
                } else {
                    // extra dummy block for playing animation
                    b.style.backgroundColor = 'red';
                    b.style.marginLeft = '-1em';
                }
                li.appendChild(b);
            }
            container.appendChild(li);
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
        }

        self.pause = function() {
            self.playing = false;
        }

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
        }

    };

    w.ColorScrollor = cs;

}(window));
