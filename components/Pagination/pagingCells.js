// Taken from: https://github.com/palantir/blueprint/issues/1029
// See also: https://github.com/CyberCRI/learn-ext/blob/master/src/components/resources/pagination.js

export default function pagingCells(n, pos, maxCells = CELL_COUNT) {
  // Consider an array of pages with length `n`. Let `p` be cursor position.
  //  [1, 2, 3, ..., n-1, n]
  //
  // Requirements:
  // - In all cases we want to keep `1` and `n` visible.
  // - We cant render more than CELL_COUNT items.
  // - If the cells exceed CELL_COUNT, insert `...` wherever appropriate.
  const offset = n - pos;
  const pivot = ~~(maxCells / 2);

  let cells = [];

  if (n > maxCells) {
    // Fill in first and last positions
    cells[0] = { nr: 1 };
    cells[1] = { nr: 2 };
    cells[maxCells - 2] = { nr: n - 1 };
    cells[maxCells - 1] = { nr: n };

    if (pos <= pivot) {
      // last ellipse is enabled and the rest of the array is filled
      cells[maxCells - 2].ellipsis = true;
      for (let i = 2; i < maxCells - 2; i++) {
        cells[i] = { nr: i + 1 };
      }
    } else if (offset < pivot) {
      // a ellipsis is enabled and the later part of array is filled
      cells[1].ellipsis = true;
      for (let i = 2; i < maxCells - 2; i++) {
        cells[i] = { nr: n - maxCells + i + 1 };
      }
    } else {
      // Current selected is put in centre
      cells[pivot] = { nr: pos };
      // Fill next and prev to mid-point
      // CELL_COUNT - 5 := n{MID, FIRST, SECOND, LAST, SECONDLAST}
      for (let i = 1; i < maxCells - 5; i++) {
        cells[pivot + i] = { nr: pos + i };
        cells[pivot - i] = { nr: pos - i };
      }

      // both a and b ellipsis are enabled
      cells[1].ellipsis = true;
      cells[maxCells - 2].ellipsis = true;
    }
  } else {
    for (let i = 0; i < n; i++) {
      cells[i] = { nr: i + 1, ellipsis: false };
    }
  }
  return cells;
}
