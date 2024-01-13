import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../src/App';
import questions from '../src/questions';

test('should display CORRECT when correct answer is selected', async () => {
  const { getByText } = render(<App />);
  const correctAnswerButton = getByText(questions[0].answer);
  fireEvent.click(correctAnswerButton);
  expect(await screen.findByText(/CORRECT/)).toBeInTheDocument();
  // screen.debug();
  // await waitFor(() => {
  //   expect(screen.getByText(/STATUS: CORRECT/).toBeInTheDocument());
  // });
});

test('should display WRONG when wrong answer is selected', async () => {
  const { getByText } = render(<App />);
  const correctAnswerButton = getByText('Belize');
  fireEvent.click(correctAnswerButton);
  expect(await screen.findByText(/WRONG/)).toBeInTheDocument();
});
