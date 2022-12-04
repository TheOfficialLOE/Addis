describe("Matrix", () => {
  const matrixA = [[1, 5], [6, 7]];
  const matrixB = [[4, 3], [2, 5]];

  it("should calculate the sum of matrices", () => {
    const sum = matrixA.reduce((p, c, i) => (p[i] = c.reduce((f, s, j) => (f[j] += s , f), p[i]) , p), matrixB.slice());
    console.log(sum);
    expect(sum[0][0]).toBe(5);
    expect(sum[1][0]).toBe(8);
  });
});
