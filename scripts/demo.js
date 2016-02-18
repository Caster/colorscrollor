
(function(w) {

    var cs = new w.ColorScrollor(
            w.document.getElementsByClassName('scrollor').item(0)
        ),
        $scrollor = $('.scrollor'),
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
        var modal = w.document.createElement('textarea'),
            modalBg = w.document.createElement('div'),
            button = w.document.createElement('button');
        modal.classList.add('modal');
        modal.placeholder = 'Please provide categories, separated by ' +
            'commas. Example: "3,2,5,1,1,0,4". You can add more ' +
            'than one strip by putting every strip on a new line.';
        modal.style.minWidth = '30em';
        modal.style.minHeight = '8em';
        modalBg.classList.add('modal-bg');
        button.innerHTML = 'Add strip(s)';

        modalBg.appendChild(modal);
        modalBg.appendChild(button);
        w.document.body.appendChild(modalBg);
        button.addEventListener('click', function() {
            cs.addFromList(modal.value);
            w.document.body.removeChild(modalBg);
        });
    });

    // add randomly generated list
    rnd.addEventListener('click', cs.addRandom);

    // play/pause the scrolling
    ply.addEventListener('click', function() {
        // disable sorting while scrollor is playing (note that cs.playing is
        // about to be inverted, hence the seemingly inverted order)
        $scrollor.sortable(cs.playing ? 'enable' : 'disable');

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

    // make strips sortable
    $scrollor.sortable();

}(window));
