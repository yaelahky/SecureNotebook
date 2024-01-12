import React from 'react';
import {render} from '@testing-library/react-native';
import Button from '../Button';

describe('Button', () => {
  beforeEach(() => {});

  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  test('should render Button default', () => {
    const {toJSON} = render(<Button />);
    expect(toJSON()).toMatchSnapshot();
  });

  test('should render Button with title', () => {
    const {toJSON} = render(<Button title="Press Me" />);
    expect(toJSON()).toMatchSnapshot();
  });
});
