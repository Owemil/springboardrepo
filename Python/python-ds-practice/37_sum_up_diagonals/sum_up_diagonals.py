def sum_up_diagonals(matrix):
    """Given a matrix [square list of lists], return sum of diagonals.

    Sum of TL-to-BR diagonal along with BL-to-TR diagonal:

        >>> m1 = [
        ...     [1,   2],
        ...     [30, 40],
        ... ]
        >>> sum_up_diagonals(m1)
        73

        >>> m2 = [
        ...    [1, 2, 3],
        ...    [4, 5, 6],
        ...    [7, 8, 9],
        ... ]
        >>> sum_up_diagonals(m2)
        30
    """
    l = len(matrix[0])
    sum_diag = 0
    diag1 = [matrix[i][i] for i in range(l)]             
    diag2 = [matrix[l-1-i][i] for i in range(l-1,-1,-1)]
    for num in diag1:
        sum_diag += num
    for num in diag2:
        sum_diag += num
    return sum_diag

    # matrix_sum = 0
    # for item in matrix: 
    #     for num in item:
    #         matrix_sum += num
    # return matrix_sum
        # m1 = [
        #      [1,   2],
        #      [30, 40],
        #  ]
        # m2 = [
        #     [1, 2, 3],
        #     [4, 5, 6],
        #     [7, 8, 9],
        # ]