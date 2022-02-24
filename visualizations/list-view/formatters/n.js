// eslint-disable-next-line no-unused-vars
const N = (num, opts) => {
  if (!num && num !== 0) return '';
  if (!opts) return new Intl.NumberFormat('default').format(num);
  const parts = opts.split('>').map((o) => o.trim());
  const locale = parts.length > 1 ? parts[1] : 'default';
  const [intOpts, fracOpts] = parts[0].split('.');
  const options = {};
  if (intOpts) {
    const [_m, sign, mi] = intOpts.match(/[ ]*(\+?)[ ]*(\d*)/); // eslint-disable-line no-unused-vars
    if (sign) options.signDisplay = 'always';
    const minInt = Number(mi);
    if (Number.isInteger(minInt) && minInt > 0 && minInt < 22)
      options.minimumIntegerDigits = minInt;
  }
  if (fracOpts) {
    const [minFrac, maxFrac] = fracOpts.split(',').map(Number);
    if (Number.isInteger(minFrac) && minFrac > -1 && minFrac < 21)
      options.minimumFractionDigits = minFrac;
    if (Number.isInteger(maxFrac) && maxFrac > -1 && maxFrac < 21)
      options.maximumFractionDigits = maxFrac;
  }
  return new Intl.NumberFormat(locale, options).format(num);
};
