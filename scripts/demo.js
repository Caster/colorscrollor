(function(window) {

    var cs = new window.ColorScrollor(
            window.document.getElementsByClassName('scrollor').item(0)
        );

    window.document.getElementById('cntrl-rnd').addEventListener('click', function() {
        cs.addRandom();
    });

}(window));
