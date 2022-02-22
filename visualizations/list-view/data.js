import { NrqlQuery } from 'nr1';
import tmpl8 from './tmpl8';

export const runQuery = async (accountId, query, showDebug = false) => {
  if (!accountId || !query) return;

  const { data: resp, error } = await NrqlQuery.query({ query, accountId });
  if (error) return { data: [], attributes: [] };
  if (showDebug) console.log('<<', resp); // eslint-disable-line no-console

  const attribs = new Set();

  const out = resp.reduce((acc, row) => {
    const { data, metadata } = row || {};
    if (Array.isArray(data)) {
      acc = acc.concat(
        data.map((d) => {
          const { groups } = metadata;
          const meta = groups.reduce((m, group) => {
            if (group.type === 'function') {
              m[group.value.split(' ').pop()] = d[group.value];
            } else if (group.type === 'facet') {
              m[group.name] = group.value;
            }
            return m;
          }, {});
          const rowData = { ...meta, ...d };
          Object.keys(rowData).forEach(attribs.add, attribs);
          return rowData;
        })
      );
    } else {
      Object.keys(data).forEach(attribs.add, attribs);
      acc.push(data);
    }
    return acc;
  }, []);

  if (showDebug) console.log('>>', out); // eslint-disable-line no-console

  return { data: out, attributes: Array.from(attribs) };
};

export const toList = (queryData, templateString) => {
  const { data, attributes } = queryData;
  if (!data) return;

  let template;
  // eslint-disable-next-line no-useless-catch
  try {
    template = tmpl8(templateString || '', attributes || []);
  } catch (e) {
    throw e;
  }

  const list = data.reduce((acc, row) => {
    const t = template(row);
    if (t) acc.push(t);
    return acc;
  }, []);

  return list;
};
