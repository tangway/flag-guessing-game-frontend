import React from 'react';
import SingleQuestion from './SingleQuestion';
import MultiQuestion from './MultiQuestion';

const App = () => {
  // to determine which game flow to use
  // const shouldUseSingleQuestionGameFlow = true;
  const shouldUseSingleQuestionGameFlow = false;

  return (
    <div>
      {shouldUseSingleQuestionGameFlow ? <SingleQuestion /> : <MultiQuestion />}
    </div>
  );
};

export default App;
