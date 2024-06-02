import React from 'react'

const TextComponent = ({ text, name }) => {
  const truncateText = (str, maxLength) => {
    return str?.length > maxLength ? str.substring(0, maxLength) + '...' : str;
  };

  return (
    <div>
      <h3 className='font-semibold text-lg'>{name}</h3>
      <p>{truncateText(text, 25)}</p>
    </div>
  );
};

export default TextComponent;
