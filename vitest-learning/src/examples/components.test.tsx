import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { FeedbackForm } from './components'

describe('FeedbackForm Component', () => {
  it('should render the form with all fields', () => {
    render(<FeedbackForm onSubmit={vi.fn()} />)
    
    // Check elements
    expect(screen.getByRole('heading', { name: /submit feedback/i })).toBeInTheDocument()
    expect(screen.getByText('Rating')).toBeInTheDocument()
    expect(screen.getByLabelText(/comment/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /submit feedback/i })).toBeInTheDocument()
  });

  it('should have the submit button disabled initially', () => {
    render(<FeedbackForm onSubmit={vi.fn()} />)
    
    const submitBtn = screen.getByRole('button', { name: /submit feedback/i })
    expect(submitBtn).toBeDisabled()
  });

  it('should enable the submit button when a rating is selected', () => {
    render(<FeedbackForm onSubmit={vi.fn()} />)
    
    const rating3Btn = screen.getByLabelText('Rate 3 stars')
    const submitBtn = screen.getByRole('button', { name: /submit feedback/i })
    
    // Click rating button
    fireEvent.click(rating3Btn)
    
    expect(submitBtn).toBeEnabled()
  });

  it('should show error when submitting empty comment or short comment (<10 chars)', () => {
    render(<FeedbackForm onSubmit={vi.fn()} />)
    
    // Select rating
    fireEvent.click(screen.getByLabelText('Rate 4 stars'))
    
    // Type a short comment
    const commentInput = screen.getByLabelText(/comment/i)
    fireEvent.change(commentInput, { target: { value: 'Good' } })
    
    // Submit
    fireEvent.click(screen.getByRole('button', { name: /submit feedback/i }))
    
    // Expect error to show
    expect(screen.getByRole('alert')).toHaveTextContent('Comment must be at least 10 characters long')
  });

  it('should successfully submit form and trigger callback', () => {
    const handleSubmitMock = vi.fn()
    render(<FeedbackForm onSubmit={handleSubmitMock} />)
    
    // Select rating
    fireEvent.click(screen.getByLabelText('Rate 5 stars'))
    
    // Type valid comment
    fireEvent.change(screen.getByLabelText(/comment/i), { 
      target: { value: 'This product is absolutely amazing!' } 
    })
    
    // Submit
    fireEvent.click(screen.getByRole('button', { name: /submit feedback/i }))
    
    // Assert callback was called with correct data
    expect(handleSubmitMock).toHaveBeenCalledTimes(1)
    expect(handleSubmitMock).toHaveBeenCalledWith({
      rating: 5,
      comment: 'This product is absolutely amazing!'
    })
    
    // Assert success screen is shown
    expect(screen.getByTestId('success-container')).toBeInTheDocument()
    expect(screen.getByText(/thank you for your feedback/i)).toBeInTheDocument()
  });
});
