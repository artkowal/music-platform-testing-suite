import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Badge } from './badge';
import { cn } from '@/lib/utils';

/**
 * UNIT TEST SUITE: Badge Component & Utils
 * Cel: Testowanie warstwy prezentacyjnej (Badge) oraz helperów CSS (cn).
 */

// Grupa 1: Testy narzędzia do łączenia klas
describe('Utility: cn() Class Merger', () => {
    it('powinien poprawnie łączyć wiele klas CSS w jeden string', () => {
        const result = cn('class1', 'class2');
        expect(result).toContain('class1');
        expect(result).toContain('class2');
    });

    // Testowanie odrzucania wartości fałszywych
    it('powinien ignorować wartości warunkowe (false/undefined/null)', () => {
        const isHidden = false; // Symulacja warunku logicznego
        const result = cn('visible', isHidden && 'hidden', undefined);
        
        // Oczekujemy tylko klasy 'visible'
        expect(result).toBe('visible');
    });
});

// Grupa 2: Testy wizualne komponentu
describe('Component: UI/Badge', () => {
    it('powinien renderować przekazany tekst (children)', () => {
        render(<Badge>Status Aktywny</Badge>);
        expect(screen.getByText('Status Aktywny')).toBeInTheDocument();
    });

    // Testowanie wariantów stylistycznych (Tailwind classes)
    it('powinien aplikować klasę CSS właściwą dla wariantu "destructive"', () => {
        // Arrange
        render(<Badge variant="destructive">Usuń</Badge>);
        
        // Act
        const badge = screen.getByText('Usuń');
        
        // Assert: Sprawdzamy obecność kluczowej klasy stylizującej
        expect(badge.className).toContain('bg-destructive');
    });
});