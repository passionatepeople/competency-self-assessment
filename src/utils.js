export const interpolateColor = (c0, c1, f) => {
  c0 = c0.match(/.{1,2}/g).map((oct)=>parseInt(oct, 16) * (1-f))
  c1 = c1.match(/.{1,2}/g).map((oct)=>parseInt(oct, 16) * f)
  let ci = [0,1,2].map(i => Math.min(Math.round(c0[i]+c1[i]), 255))
  return ci.reduce((a,v) => ((a << 8) + v), 0).toString(16).padStart(6, '')
}