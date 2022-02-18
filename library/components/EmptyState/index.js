import React from 'react';
import PropTypes from 'prop-types';
import { AutoSizer, Card, CardBody, HeadingText } from 'nr1';

const EmptyState = () => {
  return (
    <AutoSizer>
      {({width, height}) => (
        <div className="list-container" style={{width, height}}>
          <Card className="EmptyState">
            <CardBody className="EmptyState-cardBody">
                <HeadingText
                  spacingType={[HeadingText.SPACING_TYPE.LARGE]}
                  type={HeadingText.TYPE.HEADING_3}
                >
                  NRQL query & account ID are required
                </HeadingText>
            </CardBody>
          </Card>
        </div>
      )}
    </AutoSizer>
  );
};

export default EmptyState;