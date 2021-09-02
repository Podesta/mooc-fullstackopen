import React from 'react';

const AddMessage = ({ message }) => {
  if (message === null) {
    return <></>;
  }

  return (
    <div style={messageStyle}>
      {message}
    </div>
  );
}

const messageStyle = {
  color: 'green',
  background: 'lightgray',
  borderStyle: 'solid',
  fontSize: 20,
  borderRadius: 5,
  padding: 10,
  marginBottom: 10
}

export default AddMessage;
