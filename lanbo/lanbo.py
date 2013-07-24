try:
  import RPi.GPIO as io
except RuntimeError:
  # we are not on pi, so skip the error
  io = None


class PiLanbo(object):
    """
    Simple class to control speed and direction of car using L293D motor controller

    en1, out1, out2 pins control rear motor with forward and reverse direction

    en2, out3, out4 pins control front motor with left and right direction
    """

    def __init__(self, en1, in1, in2, en2, in3, in4):
        io.cleanup()
        io.setmode(io.BCM)
        print en1, in1, in2, en2, in3, in4

        # Front motor output
        self.in1 = in1
        self.in2 = in2
        self.en1 = en1

        # Rear motor output
        self.in3 = in3
        self.in4 = in4
        self.en2 = en2

        io.setup(self.in1, io.OUT)
        io.setup(self.in2, io.OUT)
        io.setup(self.en1, io.OUT)
        io.setup(self.in3, io.OUT)
        io.setup(self.in4, io.OUT)
        io.setup(self.en2, io.OUT)

        self.stop()
        self.straight()

        # Set PWM
        io.output(self.en1, 1)
        io.output(self.en2, 1)
        self.pwm_en1 = io.PWM(self.en1, 500)
        self.pwm_en2 = io.PWM(self.en2, 500)

        # Start PWM
        self.pwm_en1.start(100)
        self.pwm_en2.start(100)

    def forward(self, speed):
        io.output(self.in1, 0)
        io.output(self.in2, 1)

        self.pwm_en1.ChangeDutyCycle(100-speed)

    def reverse(self, speed):
        io.output(self.in1, 1)
        io.output(self.in2, 0)

        self.pwm_en1.ChangeDutyCycle(100-speed)

    def right(self, speed=None):
        io.output(self.in3, 1)
        io.output(self.in4, 0)

    def left(self, speed=None):
        io.output(self.in3, 0)
        io.output(self.in4, 1)

    def stop(self):
        io.output(self.in1, 0)
        io.output(self.in2, 0)

    def straight(self):
        io.output(self.in3, 0)
        io.output(self.in4, 0)

    def shutdown(self):
        self.pwm_en1.stop()
        self.pwm_en2.stop()
        io.cleanup()


class MockLanbo():
    def __init__(self, en1, in1, in2, en2, in3, in4):
        pass

    def forward(self, speed):
        pass

    def reverse(self, speed):
        pass

    def right(self, speed=None):
        pass

    def left(self, speed=None):
        pass

    def stop(self):
        pass

    def straight(self):
        pass

    def shutdown(self):
        pass

if not io:
  Lanbo = MockLanbo
else:
  Lanbo = PiLanbo

