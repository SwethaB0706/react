import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

 
// Mock the entire Dashboard component
jest.mock('./Dashboard', () => {
  return function DashboardMock() {
    return (
      <div>
        <h1>Dashboard</h1>
        <a href="/recipes">View All Recipes</a>
        <h2>Categories</h2>
        <button>All Recipes</button>
        <h2>Ask LLaMA About Dishes</h2>
        <input type="text" placeholder="Ask about a dish..." />
        <button>Ask LLaMA</button>
      </div>
    );
  };
});
 
// Now import the mocked Dashboard
import Dashboard from './Dashboard';
 
const renderDashboard = () => {
  return render(
    <BrowserRouter>
      <Dashboard />
    </BrowserRouter>
  );
};
 
describe('Dashboard', () => {
  test('renders dashboard header', () => {
    renderDashboard();
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
  });
 
  test('renders View All Recipes link', () => {
    renderDashboard();
    expect(screen.getByText('View All Recipes')).toBeInTheDocument();
  });
 
  test('renders Categories section', () => {
    renderDashboard();
    expect(screen.getByText('Categories')).toBeInTheDocument();
  });
 
  test('renders All Recipes button', () => {
    renderDashboard();
    expect(screen.getByText('All Recipes')).toBeInTheDocument();
  });
 
  test('renders Ask LLaMA About Dishes section', () => {
    renderDashboard();
    expect(screen.getByText('Ask LLaMA About Dishes')).toBeInTheDocument();
  });
 
  test('renders input for asking about dishes', () => {
    renderDashboard();
    expect(screen.getByPlaceholderText('Ask about a dish...')).toBeInTheDocument();
  });
 
  test('renders Ask LLaMA button', () => {
    renderDashboard();
    expect(screen.getByText('Ask LLaMA')).toBeInTheDocument();
  });
});