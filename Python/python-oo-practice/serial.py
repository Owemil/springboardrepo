"""Python serial number generator."""

class SerialGenerator:
    """Machine to create unique incrementing serial numbers.
    
    >>> serial = SerialGenerator(start=100)

    >>> serial.generate()
    100

    >>> serial.generate()
    101

    >>> serial.generate()
    102

    >>> serial.reset()

    >>> serial.generate()
    100
    """
    
    
    def __init__(self, start):
        self.start = start
        self.start_copy = 0
    def __repr__(self):
        return f'<Initialized at {self.start}>'

    def generate(self):  
        if self.start_copy == 0:
            self.start_copy += self.start
            return self.start_copy
        self.start_copy += 1
        return self.start_copy 
    
    def reset(self):
        self.start_copy = self.start