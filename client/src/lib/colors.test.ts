import { describe, it, expect } from 'vitest';
import { hexToHsl, hexToRgba } from './colors';

/**
 * UNIT TEST SUITE: Color Utilities
 * Cel: Weryfikacja poprawności algorytmów konwersji kolorów.
 * Zakres: Testy funkcji czystych bez efektów ubocznych.
 */

describe('Utility: Color Conversion Logic', () => {
  
  // Grupa testowa: Konwersja HEX -> HSL
  describe('hexToHsl()', () => {
    // Standardowy przypadek dla wartości skrajnej (Biel)
    it('powinien poprawnie konwertować biały kolor (#FFFFFF) na format HSL', () => {
      // Arrange & Act
      const result = hexToHsl('#FFFFFF');
      // Assert: Oczekujemy pełnej jasności (100%)
      expect(result).toBe('0.0 0.0% 100.0%'); 
    });

    // Standardowy przypadek dla wartości skrajnej (Czerń)
    it('powinien poprawnie konwertować czarny kolor (#000000) na format HSL', () => {
      // Arrange & Act
      const result = hexToHsl('#000000');
      // Assert: Oczekujemy zerowej jasności (0%)
      expect(result).toBe('0.0 0.0% 0.0%');
    });
  });

  // Grupa testowa: Konwersja HEX -> RGBA
  describe('hexToRgba()', () => {
    // Sprawdzenie poprawności parsowania kanału Alpha
    it('powinien konwertować HEX na RGBA uwzględniając zadaną przezroczystość (Alpha)', () => {
      // Arrange
      const hex = '#FF0000'; // Czerwony
      const alpha = 0.5;
      
      // Act
      const result = hexToRgba(hex, alpha);
      
      // Assert
      expect(result).toBe('rgba(255, 0, 0, 0.5)');
    });
  });
});