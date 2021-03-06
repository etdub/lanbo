import sys
print sys.path

# 3rd party imports
from socketio import socketio_manage
from socketio.namespace import BaseNamespace
from socketio.mixins import RoomsMixin, BroadcastMixin
from werkzeug.exceptions import NotFound
from gevent import monkey

from flask import Flask, Response, request, render_template, url_for, redirect

import lanbo

monkey.patch_all()

app = Flask(__name__)
app.debug = True

# Create a global Lanbo object
car = lanbo.Lanbo(21, 17, 4, 18, 23, 24)

class LanboWeb(BaseNamespace, RoomsMixin, BroadcastMixin):
    def initialize(self):
        self.logger = app.logger
        self.log("Socketio session started")

    def log(self, message):
        self.logger.info("[{0}] {1}".format(self.socket.sessid, message))

    def on_left(self):
        car.left()
        self.log('Left!')

    def on_right(self):
        car.right()
        self.log('Right!')

    def on_straight(self):
        car.straight()
        self.log('Straight!')

    def on_forward(self, speed):
        car.forward(speed)
        self.log('Forward!')

    def on_reverse(self, speed):
        car.reverse(speed)
        self.log('Reverse!')

    def on_stop(self):
        car.stop()
        self.log('Stop!')

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/socket.io/<path:remaining>')
def socketio(remaining):
    try:
        socketio_manage(request.environ, {'/lanbo': LanboWeb}, request)
    except:
        app.logger.error("Exception while handling socketio connection",
                         exc_info=True)
    return Response()
