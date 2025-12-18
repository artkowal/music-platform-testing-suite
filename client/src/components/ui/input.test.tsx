import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Input } from './input';

/**
 * UNIT TEST SUITE: Input Component
 * Cel: Weryfikacja poprawnego renderowania atrybutów HTML w polu tekstowym.
 */

describe('Component: UI/Input', () => {
    
    // Weryfikacja tekstu pomocniczego
    it('powinien poprawnie renderować atrybut placeholder w DOM', () => {
        // Arrange
        const placeholderText = "Wpisz swój email";
        render(<Input placeholder={placeholderText} />);
        
        // Assert: Query by Placeholder jest dobrą praktyką
        expect(screen.getByPlaceholderText(placeholderText)).toBeInTheDocument();
    });

    // Weryfikacja typu pola
    it('powinien wspierać typ "password" dla bezpiecznego wprowadzania danych', () => {
        // Arrange
        render(<Input type="password" placeholder="Hasło" />);
        
        // Act
        const inputElement = screen.getByPlaceholderText('Hasło');
        
        // Assert: Upewniamy się, że przeglądarka ukryje znaki
        expect(inputElement).toHaveAttribute('type', 'password');
    });
});