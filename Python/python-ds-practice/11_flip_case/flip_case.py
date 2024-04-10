def flip_case(phrase, to_swap):
    """Flip [to_swap] case each time it appears in phrase.

        >>> flip_case('Aaaahhh', 'a')
        'aAAAhhh'

        >>> flip_case('Aaaahhh', 'A')
        'aAAAhhh'

        >>> flip_case('Aaaahhh', 'h')
        'AaaaHHH'

    """
    for letter in phrase:
        if letter == to_swap.upper():
            new_phrase = phrase.replace(to_swap.upper(), to_swap.lower())
            return new_phrase
        elif letter == to_swap:
           new_phrase2 = phrase.replace(to_swap, to_swap.upper())
           return new_phrase2
        


