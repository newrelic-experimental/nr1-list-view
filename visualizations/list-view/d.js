const D = (datetime, format) => {
  const dt = new Date(datetime);
  if (!format) return dt.toString();

  const y = dt.getFullYear();
  const mo = dt.getMonth();
  const d = dt.getDate();
  const w = dt.getDay();
  const h = dt.getHours();
  const m = dt.getMinutes();
  const s = dt.getSeconds();
  const ms = dt.getMilliseconds();

  const weekdays = [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const formatter = {
    yy: String(y).slice(-2),
    yyyy: String(y),
    M: String(mo + 1),
    MM: ('0' + (mo + 1)).slice(-2),
    MMM: months[mo].slice(0, 3),
    MMMM: months[mo],
    d: String(d),
    dd: ('0' + d).slice(-2),
    ddd: weekdays[w].slice(0, 3),
    dddd: weekdays[w],
    H: String(h),
    HH: ('0' + h).slice(-2),
    h: String(h % 12 || 12),
    hh: ('0' + (h % 12 || 12)).slice(-2),
    t: h < 12 ? 'A' : 'P',
    tt: h < 12 ? 'AM' : 'PM',
    m: String(m),
    mm: ('0' + m).slice(-2),
    s: String(s),
    ss: ('0' + s).slice(-2),
    sss: ('00' + ms).slice(-3)
  }

  return format.replace(/\[([^\]]+)]|y{2,4}|M{1,4}|d{1,4}|H{1,2}|h{1,2}|t{1,2}|m{1,2}|s{1,3}/g, (match, p1) => p1 || formatter[match]);
}