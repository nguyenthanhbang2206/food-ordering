import React from 'react'
import { Button } from '@mui/material'
export const Address = ({ address, handleSelectAddress }) => {
  return (
    <div className="flex items-center justify-between border-b pb-4">
      <p>{address}</p>
      <button
        onClick={handleSelectAddress}
        className="text-blue-500 hover:underline"
      >
        Select
      </button>
    </div>
  );
};