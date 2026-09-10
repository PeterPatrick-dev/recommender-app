import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { describe, it, expect } from 'vitest'
import Login from './Login'

function renderLogin() {
  render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  )
}

describe('Login page', () => {
  it('renders email and password fields', () => {
    renderLogin()
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
  })

  it('lets the user type into the email field', () => {
    renderLogin()
    const emailInput = screen.getByLabelText(/email/i)

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })

    expect(emailInput.value).toBe('test@example.com')
  })

  it('renders a link to the sign up page', () => {
    renderLogin()
    const signupLink = screen.getByText(/sign up/i)
    expect(signupLink.closest('a')).toHaveAttribute('href', '/signup')
  })
})