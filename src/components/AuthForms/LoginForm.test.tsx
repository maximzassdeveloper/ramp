import { renderTestApp } from '@/tests/helpers/renderTestApp'
import { fireEvent, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { LoginForm } from './LoginForm'

describe('Login Form', () => {

  test("Should show email error", async () => {
    renderTestApp(<LoginForm />, { showRoutes: false })

    const emailInput = screen.getByRole('textbox', { name: /email/i })
    const submitButton = screen.getByRole('button', { name: 'Submit' })
    expect(emailInput).toBeInTheDocument()

    userEvent.type(emailInput, 'test-email')
    expect(emailInput).toHaveValue('test-email')

    // expect(emailInput).not.toHaveFocus()
    // userEvent.click(submitButton)
    // expect(emailInput).toHaveFocus()

    


    // const emailInput: HTMLInputElement = screen.getByTestId('email-input')
    // // const emailError = screen.queryByText(/Incorrect email/i)
    // const submitButton = screen.getByText(/Submit/i)

    // expect(emailInput).toBeInTheDocument()
    // // expect(emailError).toBeNull()

    // // fireEvent.focusIn(emailInput)
    // fireEvent.change(emailInput, { target: { value: 'vbxfb' } })
    // expect(emailInput.value).toBe('vbxfb')
    // fireEvent.click(screen.getByRole('button'))
    // // fireEvent.focusOut(emailInput)

    // expect(screen.queryByText('Incorrect email')).toBeInTheDocument()
  })

})