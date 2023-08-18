import IconButton, { IconButtonProps } from './IconButton';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';

describe('If IconButton works properly', () => {
  test('If snapshot matches', () => {
    const iconButtonProps: IconButtonProps = {
      text: 'Testing...'
    };

    const element = render(<IconButton {...iconButtonProps} />);

    expect(element).toMatchSnapshot();
  });

  test('If text rendered correclty', () => {
    const iconButtonProps: IconButtonProps = {
      text: 'Testing...'
    };

    render(<IconButton {...iconButtonProps} />);

    const element = screen.getByTestId('iconButtonTextTestId');

    expect(element).toHaveTextContent('Testing...');
  });

  test('If icon rendered correclty', () => {
    const iconButtonProps: IconButtonProps = {
      text: 'Text',
      icon: '/assets/icons/edit.svg'
    };

    render(<IconButton {...iconButtonProps} />);

    const element = screen.getByTestId('iconButtonIconTestId');

    expect(element.getAttribute('src')).toBe('/assets/icons/edit.svg');
  });

  test('If img alt rendered correclty', () => {
    const iconButtonProps: IconButtonProps = {
      text: 'Text',
      icon: '/assets/icons/edit.svg'
    };

    render(<IconButton {...iconButtonProps} />);

    const element = screen.getByTestId('iconButtonIconTestId');

    expect(element.getAttribute('alt')).toBe('Text icon button');
  });

  test('If img alt rendered correclty', () => {
    const iconButtonProps: IconButtonProps = {
      text: 'Text',
      icon: '/assets/icons/edit.svg'
    };

    render(<IconButton {...iconButtonProps} />);

    const element = screen.getByTestId('iconButtonIconTestId');

    expect(element.getAttribute('alt')).toBe('Text icon button');
  });

  test('If onclick triggered correclty', () => {
    const onClick = jest.fn();
    const iconButtonProps: IconButtonProps = {
      text: 'Text',
      onClick
    };

    render(<IconButton {...iconButtonProps} />);

    const element = screen.getByTestId('iconButtonTestId');

    fireEvent.click(element);
    expect(onClick).toBeCalledTimes(1);
  });
});
