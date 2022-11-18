import { calculatePoints } from "./App";

test("calculatePoints returns the expected values", () => {
  const pointsForlessThan50 = calculatePoints(45);
  expect(pointsForlessThan50).toBe(0);

  const pointsForbetween50And100 = calculatePoints(51);
  expect(pointsForbetween50And100).toBe(1);

  const pointsForMore100 = calculatePoints(120);
  expect(pointsForMore100).toBe(90);
});
