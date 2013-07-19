(function () {
    // Initialize websocket connection
    var socket = io.connect("/lanbo");

    socket.on('connect', function () {
        console.log('connected to server');
    });

    socket.on('reconnect', function () {
        message('System', 'Reconnected to the server');
    });

    socket.on('reconnecting', function () {
        message('System', 'lost connect to server');
        socket.disconnect(true);
    });

    socket.on('response', function(resp) {
        console.log('response: ' + response);
    });

    // Attach handler to buttons
    $("#btn-left").click(function() {
        socket.emit('left', {});
    });

    $("#btn-right").click(function() {
        socket.emit('right', {});
    });

    $("#btn-straight").click(function() {
        socket.emit('straight', {});
    });

    $("#btn-forward").click(function() {
        socket.emit('forward', {'speed': 100});
    });

    $("#btn-reverse").click(function() {
        socket.emit('reverse', {'speed': 100});
    });

    $("#btn-stop").click(function() {
        socket.emit('stop', {});
    });
})();

