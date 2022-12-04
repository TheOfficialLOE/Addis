
describe("Sort", () => {
  let array = [45, 467, 221, 999, 32];

  afterEach(() => {
    array = [45, 467, 221, 999, 32];
  })

  it("should sort the array in a selection way", () => {
    for (let i = 0; i < array.length - 1; i++) {
      let minPos = i;
      for (let j = i + 1; j < array.length; j++) {
        if (array[j] < array[minPos]) {
          minPos = j;
        }
      }
      if (i !== minPos) {
        [array[i], array[minPos]] = [array[minPos], array[i]];
      }
    }
    expect(array[0]).toBe(32);
    expect(array[4]).toBe(999);
  });

  it("should sort the array in an insertion way", () => {
    for (let i = 1; i < array.length; i++) {
      let j = i - 1;
      const temp = array[i];
      while (j >= 0 && array[j] > temp) {
        array[j + 1] = array[j];
        j--;
      }
      array[j+1] = temp;
    }
    expect(array[0]).toBe(32);
    expect(array[4]).toBe(999);
  });

  it("should sort the array in a bubble way", () => {
    for (let i = 1; i < array.length; i++) {
      for (let j = 0; j < array.length - i; j++) {
        if (array[j] > array[j + 1]) {
          [array[j], array[j + 1]] = [array[j + 1], array[j]];
        }
      }
    }
    expect(array[0]).toBe(32);
    expect(array[4]).toBe(999);
  });
});
