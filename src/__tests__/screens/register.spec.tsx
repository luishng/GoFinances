import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Register } from '../../screens/Register';

import theme from '../../global/styles/theme';
import { ThemeProvider } from 'styled-components/native';

jest.mock('@react-navigation/native', () => {
  return {
    useNavigation: jest.fn(),
  }
})

const Providers: React.FC = ({ children }) => (
  <ThemeProvider theme={theme}>
    {children}
  </ThemeProvider>
)

describe('Register Screen', () => {
  it('should be open category modal when user click on button', async () => {
    const { getByTestId } = render(
      <Register />, {
      wrapper: Providers
    });

    const categoryModal = getByTestId('modal-category');
    const categoryButton = getByTestId('button-category');

    expect(categoryModal.props.visible).toBeFalsy();

    fireEvent.press(categoryButton);

    await waitFor(() => {
      expect(categoryModal.props.visible).toBeTruthy();
    })
  })
})