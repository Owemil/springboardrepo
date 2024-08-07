const timeWord = require('./timeWord.js');

describe('#timeword', () => {
  test('it is a function', () => {
    expect(typeof timeWord).toBe('function');
  });
  test("works: midnight", () => {
    expect(timeWord("00:00")).toEqual("midnight")
  })
  test("works: twelve twelve AM", () => {
    expect(timeWord("00:12")).toEqual("Twelve Twelve AM")
  })
  test("works: one o'clock AM", () => {
    expect(timeWord("01:00")).toEqual("One o'clock AM")
  })
  test("works: six oh one AM", () => {
    expect(timeWord("06:01")).toEqual("Six oh One AM")
  })
  test("works: six ten AM", () => {
    expect(timeWord("06:10")).toEqual("Six Ten AM")
  })
  test("works: six eighteen AM", () => {
    expect(timeWord("06:18")).toEqual("Six Eighteen AM")
  })
  test("works: six thirty AM", () => {
    expect(timeWord("06:30")).toEqual("Six Thirty AM")
  })
  test("works: ten thirty four AM", () => {
    expect(timeWord("10:34")).toEqual("Ten Thirty Four AM")
  })
  test("works: noon", () => {
    expect(timeWord("12:00")).toEqual("noon")
  })
  test("works: twelve oh nine PM", () => {
    expect(timeWord("12:09")).toEqual("Twelve oh Nine PM")
  })
  test("works: eleven twenty three PM", () => {
    expect(timeWord("23:23")).toEqual("Eleven Twenty Three PM")
  })
});