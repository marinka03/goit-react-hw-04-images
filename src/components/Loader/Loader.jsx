import React from 'react';
import { ThreeDots } from 'react-loader-spinner';

function Loader() {
  return (
    <ThreeDots
      height="80"
      width="80"
      radius="9"
      color="#C52745"
      ariaLabel="three-dots-loading"
      wrapperStyle={{
        margin: "0 auto"
      }}
      wrapperClassName=""
      visible={true}
    />
  );
}
export default Loader;
