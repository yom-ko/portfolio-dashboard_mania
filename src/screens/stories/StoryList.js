import React from 'react';
import Story from 'screens/stories/storylist/Story';

export const StoryList = ({ items }) => {
  const itemsAr = Object.entries(items);

  const listItems = (() => {
    function createListItem(item) {
      const mediaObj = item[1].multimedia[1];
      const withSubsection = typeof item[1].subsection !== 'undefined' && item[1].subsection !== '';

      return (
        <Story
          item={item}
          key={item[1].title}
          mediaObj={mediaObj}
          withSubsection={withSubsection}
        />
      );
    }
    return itemsAr.map(createListItem);
  })();

  return (
    <div className="tile is-ancestor">
      <div className="tile is-10 is-vertical is-parent">{listItems}</div>
    </div>
  );
};

export default StoryList;
