const cmFn = {
  cvNum: (value, short) => {
    const MOD = 1000;
    const UNIT = ["", "k", "m", "g", "t"];
    const parts = [];
    let v = value;
    while (true) {
      const remain = v % MOD;
      parts.push(remain);
      v = Math.floor(v / MOD);
      if (v === 0) break;
    }

    if (!short) {
      return parts.reduce((pV, cV, cI) => {
        if (cI === parts.length - 1) {
          return pV === "" ? cV : `${cV}.${pV}`;
        }

        if (cV >= 100) {
          return cI !== 0 ? `${cV}.${pV}` : cV;
        } else if (cV >= 10) {
          return cI !== 0 ? `0${cV}.${pV}` : `0${cV}`;
        } else {
          return cI !== 0 ? `00${cV}.${pV}` : `00${cV}`;
        }
      }, "");
    }

    return `${(value / Math.pow(10, 3 * (parts.length - 1))).toFixed(2)}${UNIT[parts.length - 1]}`;
  },
};

export default cmFn;
