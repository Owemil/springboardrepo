def multiply_even_numbers(nums):
    """Multiply the even numbers.
    
        >>> multiply_even_numbers([2, 3, 4, 5, 6])
        48
        
        >>> multiply_even_numbers([3, 4, 5])
        4
        
    If there are no even numbers, return 1.
    
        >>> multiply_even_numbers([1, 3, 5])
        1
    """
    curr_val = None
    evens = [num for num in nums if num % 2 == 0]
    if evens == []:
        return 1
    for num in evens:
        # print(num)
        if len(evens) == 1:
            return num
        elif curr_val == None:
            curr_val = num
        elif isinstance(curr_val, int):
            curr_val *= num
