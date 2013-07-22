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
    var KEY_CODE_A = 65,
        KEY_CODE_D = 68,
        KEY_CODE_S = 83,
        KEY_CODE_SPACE = 32,
        KEY_CODE_W = 87;

    var forward_or_reverse = 'stop',
        left_or_right = 'straight';

    var logKeyboard = function(act_type, key_val) {
      $('#keyboard_log').prepend('<p>'+ act_type + ': ' + key_val +'</p>');
    };

    $(document).keydown(function(e) {
        if (e.which == KEY_CODE_A) {
            if (left_or_right !== 'left') {
                logKeyboard('keydown', 'a');
                socket.emit('left');
                left_or_right = 'left';
            }
        }
        if (e.which == KEY_CODE_D) {
            if (left_or_right !== 'right') {
                logKeyboard('keydown', 'd');
                socket.emit('right');
                left_or_right = 'right';
            }
        }
        if(e.which == KEY_CODE_W) {
          if (forward_or_reverse !== 'forward') {
              logKeyboard('keydown', 'w');
              socket.emit('forward', 100);
              forward_or_reverse = 'forward';
          }
        }
        if (e.which == KEY_CODE_S) {
          if (forward_or_reverse !== 'reverse') {
              logKeyboard('keydown', 's');
              socket.emit('reverse', 100);
              forward_or_reverse = 'reverse';
          }
        }
        if (e.which == KEY_CODE_SPACE) {
            logKeyboard('keydown', 'space');
            socket.emit('stop');
            forward_or_reverse = 'stop';
        }
    });
    $(document).keyup(function(e) {
        if (e.which == KEY_CODE_A || e.which == KEY_CODE_D) {
            socket.emit('straight');
            left_or_right = 'straight';
        }
        if(e.which == KEY_CODE_W || e.which == KEY_CODE_S) {
            socket.emit('stop');
            forward_or_reverse = 'stop';
        }
    });
})();

