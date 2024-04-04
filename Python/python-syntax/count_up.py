def count_up(start, stop):
    """Print all numbers from start up to and including stop.

    For example:

        count_up(5, 7)

   should print:

        5
        6
        7
    """

    start_num = start
    stop_num = stop
    while start_num < stop_num + 1:
        print(start_num)
        start_num += 1


count_up(5, 7)        
