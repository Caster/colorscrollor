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
            ];

        // constructor
        container.style.width = n + 'em';

        this.addRandom = function() {
            var i = 0,
                li = w.document.createElement('li');
            for (; i < n; ++i) {
                var b = w.document.createElement('span'),
                    r = Math.floor(Math.random() * c);
                b.classList.add('block');
                b.style.backgroundColor = rgbToHex(
                    colors[0][0] + (colors[1][0] - colors[0][0]) / (c - 1) * r,
                    colors[0][1] + (colors[1][1] - colors[0][1]) / (c - 1) * r,
                    colors[0][2] + (colors[1][2] - colors[0][2]) / (c - 1) * r
                );
                li.appendChild(b);
            }
            container.appendChild(li);
        };

    };

    w.ColorScrollor = cs;

}(window));
