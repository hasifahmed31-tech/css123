import React from 'react';
import { render, screen } from '@testing-library/react';
import SiteChrome from './SiteChrome';
import '@testing-library/jest-dom';

// Mocking sub-components to ensure we only test SiteChrome's logic
jest.mock('@/components/Header', () => () => <header data-testid="header">Header</header>);
jest.mock('@/components/Footer', () => () => <footer data-testid="footer">Footer</footer>);

describe('SiteChrome Component', () => {
  it('should render Header, Footer, and children for standard routes', () => {
    render(<SiteChrome>Standard Content</SiteChrome>);

    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
    expect(screen.getByText('Standard Content')).toBeInTheDocument();
  });

});
