import { describe, it, expect } from 'vitest';
import { formatTime } from './LessonTimer'; 

/**
 * UNIT TEST SUITE: Lesson Timer Business Logic
 * Cel: Weryfikacja logiki formatowania czasu wyświetlanego podczas lekcji.
 */

describe('Domain Logic: Lesson Timer Formatting', () => {
  
  // Standardowe formatowanie (poniżej minuty)
  it('powinien formatować sekundy jako 00:SS (padding zerami)', () => {
    // Arrange & Act & Assert
    expect(formatTime(45)).toBe('00:45');
    expect(formatTime(9)).toBe('00:09'); // Weryfikacja paddingu (09 zamiast 9)
  });

  // Standardowe formatowanie (powyżej minuty)
  it('powinien poprawnie przeliczać sekundy na format MM:SS', () => {
    // Assert: 65s -> 1m 05s
    expect(formatTime(65)).toBe('01:05');
    // Assert: 120s -> 2m 00s
    expect(formatTime(120)).toBe('02:00');
  });

  // Test wartości granicznej (Zero)
  it('powinien obsłużyć stan początkowy (0 sekund) zwracając 00:00', () => {
    expect(formatTime(0)).toBe('00:00');
  });

  // Obsługa długich czasów (powyżej godziny)
  it('powinien skalować formatowanie dla bardzo długich lekcji (> 60 min)', () => {
    // Arrange: 3905 sekund = 1h 05m 05s -> w formacie MM:SS to 65:05
    const longDuration = 3905;
    
    // Act
    const result = formatTime(longDuration);
    
    // Assert
    expect(result).toBe('65:05');
  });
});