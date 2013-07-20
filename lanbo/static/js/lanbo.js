(function () {
    // Initialize websocket connection
    var socket = io.connect("/lanbo");

    socket.on('connect', function () {
        console.log('connected to server');
    });

    socket.on('reconnect', function () {
        console.log('System', 'Reconnected to the server');
    });

    socket.on('reconnecting', function () {
        console.log('System', 'lost connect to server');
        socket.disconnect(true);
    });

    socket.on('response', function(response) {
        console.log('response: ' + response);
    });

    // Attach handler to buttons
    $("#btn-left").click(function() {
        socket.emit('left');
    });

    $("#btn-right").click(function() {
        socket.emit('right');
    });

    $("#btn-straight").click(function() {
        socket.emit('straight');
    });

    $("#btn-forward").click(function() {
        socket.emit('forward', 100);
    });

    $("#btn-reverse").click(function() {
        socket.emit('reverse', 100);
    });

    $("#btn-stop").click(function() {
        socket.emit('stop');
    });

    // Keyboard shortcuts!
    $(document).keypress(function(e) {
        console.log('Keypress! ' + e.which);

        // a
        if (e.which == 97) {
            socket.emit('left');
        }

        // d
        if (e.which == 100) {
            socket.emit('right');
        }

        // w
        if(e.which == 119) {
            socket.emit('straight');
            socket.emit('forward', 100);
        }

        // s
        if (e.which == 115) {
            socket.emit('reverse', 100);
        }

        // Space
        if (e.which == 32) {
            socket.emit('stop');
        }
    });


})();

