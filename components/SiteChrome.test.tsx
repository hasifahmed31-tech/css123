import React from 'react';
import { render, screen } from '@testing-library/react';
import { usePathname } from 'next/navigation';
import SiteChrome from './SiteChrome';
import '@testing-library/jest-dom';

// Mocking next/navigation to control the pathname returned during testing
jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

// Mocking sub-components to ensure we only test SiteChrome's logic
jest.mock('@/components/Header', () => () => <header data-testid="header">Header</header>);
jest.mock('@/components/Footer', () => () => <footer data-testid="footer">Footer</footer>);

describe('SiteChrome Component', () => {
  it('should render Header, Footer, and children for standard routes', () => {
    (usePathname as jest.Mock).mockReturnValue('/about');

    render(<SiteChrome>Standard Content</SiteChrome>);

    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
    expect(screen.getByText('Standard Content')).toBeInTheDocument();
  });

  it('should only render children for /admin routes (CMS)', () => {
    (usePathname as jest.Mock).mockReturnValue('/admin/dashboard');

    render(<SiteChrome>Admin Content</SiteChrome>);

    expect(screen.queryByTestId('header')).not.toBeInTheDocument();
    expect(screen.queryByTestId('footer')).not.toBeInTheDocument();
    expect(screen.getByText('Admin Content')).toBeInTheDocument();
  });

  it('should only render children for /login routes', () => {
    (usePathname as jest.Mock).mockReturnValue('/login');

    render(<SiteChrome>Login Content</SiteChrome>);

    expect(screen.queryByTestId('header')).not.toBeInTheDocument();
    expect(screen.queryByTestId('footer')).not.toBeInTheDocument();
    expect(screen.getByText('Login Content')).toBeInTheDocument();
  });
});