import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { describe, it, expect } from 'vitest'
import Home from './Home'

describe('Home page', () => {
  it('renders the main heading', () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    )

    expect(screen.getByText(/discover books that actually fit your mood/i)).toBeInTheDocument()
  })

  it('renders a link to the recommendation page', () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    )

    const link = screen.getByText(/get recommendations/i)
    expect(link).toBeInTheDocument()
    expect(link.closest('a')).toHaveAttribute('href', '/recommend')
  })
})