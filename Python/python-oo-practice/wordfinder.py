"""Word Finder: finds random words from a dictionary."""
from random import sample, choice

class WordFinder:
    
    def __init__(self,path):
        self.path = path
        self.word_list = []
        self.rand_list = None
        self.fill_list()
        self.fill_rand()
        
        
    
    def __repr__(self):
        return f'{len(self.rand_list)} words read\npath = {self.path}'
     
    def fill_list(self):
        file =  open(self.path)
        for line in file:
            clean_word = line.replace('\n', '')
            self.word_list.append(clean_word)
    
    def fill_rand(self):
        self.rand_list = sample(self.word_list,k=3 )
        return f'{len(self.rand_list)} words read'
    
    def random(self):
        return choice(self.rand_list)
    
    
   
# /home/namurt/code/Python/python-oo-practice/words.txt
# wf = WordFinder("/home/namurt/code/Python/python-oo-practice/words.txt")