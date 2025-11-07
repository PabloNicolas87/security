import { render, screen } from '@testing-library/react'
import App from './App'

test('muestra el mensaje principal', () => {
  render(<App />)
  expect(screen.getByText(/Tecnologías del Proyecto/i)).toBeInTheDocument()
})
