import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './button';

/**
 * UNIT TEST SUITE: Button Component
 * Cel: Weryfikacja interaktywności i stanów komponentu UI.
 */

describe('Component: UI/Button', () => {
    
    // Testowanie obsługi zdarzeń
    it('powinien wywołać handler onClick po interakcji użytkownika', () => {
        // Arrange: Tworzymy funkcję szpiegującą
        const handleClickMock = vi.fn();
        render(<Button onClick={handleClickMock}>Kliknij mnie</Button>);
        
        // Act: Symulacja kliknięcia w DOM
        fireEvent.click(screen.getByText('Kliknij mnie'));
        
        // Assert: Sprawdzamy czy funkcja została wywołana dokładnie raz
        expect(handleClickMock).toHaveBeenCalledTimes(1);
    });

    // Testowanie dostępności (Accessibility/State)
    it('powinien respektować atrybut disabled i blokować interakcję', () => {
        // Arrange
        render(<Button disabled>Zablokowany</Button>);
        
        // Act
        const button = screen.getByText('Zablokowany');
        
        // Assert: Sprawdzenie atrybutu HTML oraz semantyki
        expect(button).toBeDisabled();
    });
});