def mode(nums):
    """Return most-common number in list.

    For this function, there will always be a single-most-common value;
    you do not need to worry about handling cases where more than one item
    occurs the same number of times.

        >>> mode([1, 2, 1])
        1

        >>> mode([2, 2, 3, 3, 2])
        2
    """
    counter = 0
    num = nums[0]
     
    for number in nums:
        curr_frequency = nums.count(number)
        if(curr_frequency> counter):
            counter = curr_frequency
            num = number
 
    return num
    
