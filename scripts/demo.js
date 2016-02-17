
(function(window) {

    var cs = new window.ColorScrollor(
            window.document.getElementsByClassName('scrollor').item(0)
        ),
        // buttons
        add = window.document.getElementById('cntrl-add'),
        rnd = window.document.getElementById('cntrl-rnd'),
        ply = window.document.getElementById('cntrl-ply');

    // for testing TODO remove
    for (let i = 0; i < 10; ++i) {
        cs.addRandom();
    }

    // add randomly generated list
    rnd.addEventListener('click', function() {
        cs.addRandom();
    });

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

}(window));
