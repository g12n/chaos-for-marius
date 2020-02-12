export const createGridPts = (
    rect = [0, 0, 100, 100],
    cols = 10,
    rows = 10,
    orientation = [0.5, 0.5]
  ) => {
    const [xOffset, yOffset, width, height] = rect;
    const colStep = width / cols;
    const rowStep = height / rows;
    const xOrientation = colStep * orientation[0];
    const yOrientation = rowStep * orientation[1];
    const points = [];
    for (let row = 0; row <= rows - 1; row++) {
      const y = parseInt(yOffset + row * rowStep + yOrientation);
      for (let col = 0; col <= cols - 1; col++) {
        const x = parseInt(xOffset + col * colStep + xOrientation);
        points.push([x, y, 0]);
      }
    }
    return points;
  };
  