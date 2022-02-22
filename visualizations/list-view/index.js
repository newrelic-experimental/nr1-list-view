import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { AutoSizer } from 'nr1';

import { runQuery, toList } from './data';
import EmptyState from '../../library/components/EmptyState';

const ListViewVisualization = ({
  accountId,
  query,
  templateString,
  showDebug,
}) => {
  if (!accountId || !query) return <EmptyState />;

  const [list, setList] = useState([]);
  const [queryData, setQueryData] = useState();
  const [filterText, setFilterText] = useState('');

  useEffect(() => loadData(), [accountId, query]);
  useEffect(() => generateList(), [queryData, templateString]);

  const generateList = async () => {
    let list;
    try {
      list = toList(queryData || {}, templateString || '');
    } catch (e) {
      if (e.message.includes('Templating Error:')) {
        /* eslint-disable no-console */
        if (showDebug) {
          console.group('Template Error');
          console.error(e.message);
          console.groupEnd();
        } else {
          console.log('Please check the Template String!');
        }
        /* eslint-enable no-console */
        return;
      }
    }

    if (list) setList(list);
  };

  const loadData = async () => {
    const queryData = await runQuery(accountId, query, showDebug);
    setQueryData(queryData);
    setList([]);
  };

  const filterHandler = (evt) => setFilterText(evt.target.value);

  if (!accountId || !query) return null;

  let regex;
  try {
    if (filterText) regex = new RegExp(filterText, 'i');
  } catch (e) {
    /* eslint-disable no-console */
    if (showDebug) {
      console.group(`Cannot filter on ${filterText}`);
      console.error(e.message);
      console.groupEnd();
    } else {
      console.log(`Cannot filter on ${filterText}`);
    }
    /* eslint-enable no-console */
  }

  const filteredList =
    filterText && regex ? list.filter((item) => regex.test(item)) : list;

  return (
    <AutoSizer>
      {({ width, height }) => (
        <div className="list-container" style={{ width, height }}>
          <div className="filter">
            <input
              type="search"
              placeholder="filter..."
              className="u-unstyledInput filter-field"
              value={filterText}
              onChange={filterHandler}
            />
          </div>
          <ul className="list-view">
            {filteredList.map((item, i) => (
              <li className="list-item" key={i}>
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </AutoSizer>
  );
};

ListViewVisualization.propTypes = {
  accountId: PropTypes.number,
  query: PropTypes.string,
  templateString: PropTypes.string,
  showDebug: PropTypes.bool,
};

export default ListViewVisualization;
