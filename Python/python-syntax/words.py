words_list = ['dog', 'cat', 'ferret','fish','BANANNA','Crocodile', 'Miss "All Sunday"']


# def print_upper_words(words):
#     for word in words:
#         print(word.upper())

# def print_upper_words(words):
#     for word in words:
#         word.lower()
#         if 'e' in word:
#             print(word.upper())

def print_upper_words(words):
    must_start_with = {'f','c','m'}
    for word in words:
        for letter in must_start_with:
            if letter == word[0].lower():
                print(word.upper())

print(print_upper_words(words_list))