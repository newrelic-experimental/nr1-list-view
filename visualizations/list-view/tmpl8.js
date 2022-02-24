const tmpl8 = (templateString, attributesList) => {
  try {
    let fnStr = `const D=(e,t)=>{const s=new Date(e);if(!t)return s.toString();const r=s.getFullYear(),i=s.getMonth(),n=s.getDate(),y=s.getDay(),d=s.getHours(),c=s.getMinutes(),g=s.getSeconds(),M=s.getMilliseconds(),a=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],l=["January","February","March","April","May","June","July","August","September","October","November","December"],u={yy:String(r).slice(-2),yyy:String(r).slice(-2)+"y",yyyy:String(r),M:String(i+1),MM:("0"+(i+1)).slice(-2),MMM:l[i].slice(0,3),MMMM:l[i],d:String(n),dd:("0"+n).slice(-2),ddd:a[y].slice(0,3),dddd:a[y],H:String(d),HH:("0"+d).slice(-2),h:String(d%12||12),hh:("0"+(d%12||12)).slice(-2),t:d<12?"A":"P",tt:d<12?"AM":"PM",m:String(c),mm:("0"+c).slice(-2),s:String(g),ss:("0"+g).slice(-2),sss:("00"+M).slice(-3)};return t.replace(/\\[([^\\]]+)]|y{2,4}|M{1,4}|d{1,4}|H{1,2}|h{1,2}|t{1,2}|m{1,2}|s{1,3}/g,((e,t)=>t||u[e]))};`;
    fnStr += `const N=(t,i)=>{if(!t&&0!==t)return"";if(!i)return new Intl.NumberFormat("default").format(t);const m=i.split(">").map((t=>t.trim())),r=m.length>1?m[1]:"default",[e,n]=m[0].split("."),s={};if(e){const[t,i,m]=e.match(/[ ]*(\\+?)[ ]*(\\d*)/);i&&(s.signDisplay="always");const r=Number(m);Number.isInteger(r)&&r>0&&r<22&&(s.minimumIntegerDigits=r)}if(n){const[t,i]=n.split(",").map(Number);Number.isInteger(t)&&t>-1&&t<21&&(s.minimumFractionDigits=t),Number.isInteger(i)&&i>-1&&i<21&&(s.maximumFractionDigits=i)}return new Intl.NumberFormat(r,s).format(t)};`;
    fnStr += `const B=(t,e)=>{if(t=Number(t),!e)return t;const r=["byte","kilobyte","megabyte","gigabyte","terabyte","petabyte"],a=r.reduce(((t,e,r)=>({...t,[r?e.charAt(0)+"b":"b"]:Math.pow(1024,r)})),{}),[b,n,o]=e.match(/[ ]*([kmgtp]?b)[ ]*>?[ ]*([kmgtp]?b)?[ ]*/i),m=(o||n).toLowerCase(),u=o?Math.floor(t*a[n]):t,c=r[r.findIndex((t=>t.charAt(0)===m.charAt(0)))];return new Intl.NumberFormat("default",{style:"unit",unit:c}).format(u/a[m])};`;
    fnStr += `const {${attributesList
      .filter((a) => !/[\W_]+/g.test(a))
      .join(',')}} = data;let str='`;

    fnStr += templateString
      .replace(/[^a-z0-9 ~!@#$%^&*\-+={}|\\:,>.?/]/gi, '')
      .replace(/\{\{\?\s*([\s\S]*?)\s*\}\}/g, (_match, arg) =>
        arg ? `';if (${arg}){str+='` : `';}str+='`
      )
      .replace(/\{\{([\s\S]+?)\}\}/g, (_match, arg) => {
        const parts = arg.match(/^[ ]*([~!@#])[ ]*([\S\s]*)/);
        if (!parts) return `';str+=data['${arg}'];str+='`;
        const [, type, rest] = parts;
        const [attr, format] = rest.split(/\s*\|\s*/);
        if (type === '~' && format)
          return `';str+=B(data['${attr}'],'${format}');str+='`;
        if (type === '~') return `';str+=B(data['${attr}']);str+='`;
        if (type === '!')
          return `';str+=Boolean(data['${attr}']).toString();str+='`;
        if (type === '@' && format)
          return `';str+=D(data['${attr}'],'${format}');str+='`;
        if (type === '@') return `';str+=D(data['${attr}']);str+='`;
        if (type === '#' && format)
          return `';str+=N(data['${attr}'],'${format}');str+='`;
        if (type === '#') return `';str+=N(data['${attr}']);str+='`;
      })
      .replace(/\n/g, '\\n')
      .replace(/\t/g, '\\t')
      .replace(/\r/g, '\\r');

    fnStr += `'; return str;`;

    return new Function('data', fnStr); // eslint-disable-line no-new-func
  } catch (e) {
    throw new Error(`Templating Error: ${e.message}`);
  }
};

export default tmpl8;
