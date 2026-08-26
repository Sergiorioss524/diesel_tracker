export function fmtUSD(n: number): string {
  if (!isFinite(n)) n = 0;
  const sign = n < 0 ? "-" : "";
  return (
    sign +
    "$" +
    Math.abs(n).toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  );
}

export function fmtUSD4(n: number): string {
  if (!isFinite(n)) n = 0;
  const sign = n < 0 ? "-" : "";
  return (
    sign +
    "$" +
    Math.abs(n).toLocaleString("en-US", {
      minimumFractionDigits: 3,
      maximumFractionDigits: 4,
    })
  );
}

export function fmtNum(n: number, d: number): string {
  if (!isFinite(n)) n = 0;
  return n.toLocaleString("en-US", {
    minimumFractionDigits: d,
    maximumFractionDigits: d,
  });
}
