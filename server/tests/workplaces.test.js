import { describe, it, expect } from 'vitest';
import request from 'supertest';

const API_URL = 'http://localhost:5001/api';

/**
 * INTEGRATION TEST SUITE: Workplaces
 * Cel: Weryfikacja cyklu życia placówki (CRUD).
 */

describe('INTEGRATION: Workplaces API', () => {
  // Zmienna do przechowywania ID utworzonego zasobu między testami
  let createdWorkplaceId;
  const uniqueName = `Szkoła Testowa AAA ${Date.now()}`;

  // TEST: Tworzenie (CREATE)
  it('POST /workplaces - powinien utworzyć nową placówkę', async () => {
    // Arrange
    const newWorkplace = {
      name: uniqueName,
      color_hex: '#ff0000',
      payment_type: 'none'
    };

    // Act
    const res = await request(API_URL)
      .post('/workplaces')
      .send(newWorkplace);

    // Assert
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
    
    createdWorkplaceId = res.body.id;
  });

  // TEST: Pobieranie i Weryfikacja (READ)
  it('GET /workplaces - powinien zwrócić listę zawierającą nową placówkę', async () => {
    // Arrange
    // (Brak danych wejściowych)

    // Act
    const res = await request(API_URL).get('/workplaces');

    // Assert
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);

    const found = res.body.data.find(w => w.workplace_id === createdWorkplaceId);
    expect(found).toBeDefined();
    expect(found.name).toBe(uniqueName);
  });

  // TEST: Aktualizacja (UPDATE)
  it('PUT /workplaces/:id - powinien zaktualizować nazwę', async () => {
    // Arrange
    const updateData = {
      name: `${uniqueName} (Zaktualizowana)`
    };

    // Act
    const res = await request(API_URL)
      .put(`/workplaces/${createdWorkplaceId}`)
      .send(updateData);

    // Assert
    expect(res.status).toBe(200);
    expect(res.body.message).toMatch(/zaktualizowano/i);
  });

  // TEST: Walidacja błędów
  it('POST /workplaces - powinien odrzucić placówkę bez wymaganej nazwy', async () => {
    // Arrange
    const invalidData = {
      color_hex: '#ffffff'
    };

    // Act
    const res = await request(API_URL)
      .post('/workplaces')
      .send(invalidData);

    // Assert
    expect(res.status).toBeGreaterThanOrEqual(400); // Oczekuje 400 Bad Request
  });

  // TEST: Usuwanie (DELETE)
  it('DELETE /workplaces/:id - powinien usunąć placówkę', async () => {
    // Arrange
    const resourceUrl = `/workplaces/${createdWorkplaceId}`;

    // Act
    const res = await request(API_URL).delete(resourceUrl);

    // Assert
    expect(res.status).toBe(200);
  });
});