
(function(w) {

    var cs = new w.ColorScrollor(
            w.document.getElementsByClassName('scrollor').item(0)
        ),
        // buttons
        add = w.document.getElementById('cntrl-add'),
        rnd = w.document.getElementById('cntrl-rnd'),
        ply = w.document.getElementById('cntrl-ply'),
        del = w.document.getElementById('cntrl-del');

    // initialize with 10 random rows to have some content
    for (let i = 0; i < 10; ++i) {
        cs.addRandom();
    }

    // add specified list of blocks
    add.addEventListener('click', function() {
        cs.addFromList(w.prompt('Please provide categories, separated by ' +
            'commas. Example: "3,2,5,1,1,0,4".'));
    });

    // add randomly generated list
    rnd.addEventListener('click', cs.addRandom);

    // play/pause the scrolling
    ply.addEventListener('click', function() {
        var plyIcon = ply.children.item(0);
        plyIcon.classList.toggle('fa-play');
        plyIcon.classList.toggle('fa-pause');
        if (cs.playing) {
            cs.pause();
        } else {
            cs.play();
        }
    });

    // reset/refresh/erase (delete all strips)
    del.addEventListener('click', cs.reset);

}(window));
