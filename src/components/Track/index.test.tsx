import React from 'react';
import { render } from '@testing-library/react';
import Track from './index';
import data from "../../data/single-sample"

it('Success rendered', async () => {
  const handleSelect = jest.fn();
  render(
    <Track
      key={data.id}
      title={data.name}
      artists={data.artists[0].name}
      image={data.album.images[0].url}
      buttonSelect={handleSelect}
      select={true}
    />
  );
});