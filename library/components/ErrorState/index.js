import React from 'react';
import PropTypes from 'prop-types';
import { AutoSizer, Card, CardBody, HeadingText } from 'nr1';

const ErrorState = ({ errorMessage }) => {
  return (
    <AutoSizer>
      {({width, height}) => (
        <div className="list-container" style={{width, height}}>
          <Card className="ErrorState">
            <CardBody className="ErrorState-cardBody">
              <HeadingText
                  className="ErrorState-headingText"
                  spacingType={[HeadingText.SPACING_TYPE.LARGE]}
                  type={HeadingText.TYPE.HEADING_3}
              >
                {errorMessage ? errorMessage : "Oops! Something went wrong."}
              </HeadingText>
            </CardBody>
          </Card>
        </div>
      )}
    </AutoSizer>
  );
};

ErrorState.propTypes = {
  errorMessage: PropTypes.string,
};

export default ErrorState;