
it('should calculate the monthly rate correctly', function () {
  const value = {
    amount: 450000,
    years: 30,
    rate: 16.5
  }

  expect(calculateMonthlyPayment(values)).toEqual('6233.17')
});


it("should return a result with 2 decimal places", function () {
  const value = {
    amount: 85000,
    years: 6,
    rate: 5
  }

  expect(calculateMonthlyPayment(values)).toEqual('1368.92')
});

/// etc
