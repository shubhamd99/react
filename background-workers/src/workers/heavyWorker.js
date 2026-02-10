/* eslint-disable no-restricted-globals */
self.onmessage = function (e) {
  const { type, payload } = e.data;

  if (type === "HEAVY_CALCULATION") {
    const start = performance.now();
    let result = 0;
    // Simulate heavy work
    for (let i = 0; i < payload; i++) {
      result += Math.sqrt(i) * Math.sin(i);
    }
    const end = performance.now();

    self.postMessage({
      type: "CALCULATION_DONE",
      result: result.toFixed(2),
      time: (end - start).toFixed(2),
    });
  }
};
