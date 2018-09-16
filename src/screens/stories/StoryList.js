import React from 'react';

import Story from 'screens/stories/storylist/Story';

export const StoryList = ({ items }) => {
  const itemsAr = Object.entries(items);
  const listItems = itemsAr.map(item => <Story item={item} key={item[1].title} />);

  return (
    <div className="tile is-ancestor">
      <div className="tile is-10 is-vertical is-parent">{listItems}</div>
    </div>
  );
};

export default StoryList;
