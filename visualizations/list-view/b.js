const B = (num, opts) => {
  num = Number(num);
  if (!opts) return num;
  const units = ['byte', 'kilobyte', 'megabyte', 'gigabyte', 'terabyte', 'petabyte'];
  const vals = units.reduce((acc, unit, u) => ({...acc, [u ?unit.charAt(0) + 'b' : 'b']: Math.pow(1024, u)}) , {});
  const [_m, u1, u2] = opts.match(/[ ]*([kmgtp]?b)[ ]*>?[ ]*([kmgtp]?b)?[ ]*/i);
  const u = (u2 || u1).toLowerCase();
  const bytes = u2 ? Math.floor(num*vals[u1]) : num;
  const unit = units[units.findIndex(uu => uu.charAt(0) === u.charAt(0))];
  return new Intl.NumberFormat('default', {style: 'unit', unit}).format(bytes/vals[u]);
}