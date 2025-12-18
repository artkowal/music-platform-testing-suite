import { describe, it, expect } from 'vitest';
import request from 'supertest';

const API_URL = 'http://localhost:5001/api';

/**
 * INTEGRATION TEST SUITE: Courses
 * Cel: Weryfikacja zarządzania kursami i generowania kodów zaproszeń.
 */

describe('INTEGRATION: Courses API', () => {
  let createdCourseId;
  const uniqueTitle = `Kurs Pianina AAA ${Date.now()}`;

  // TEST: Tworzenie (CREATE)
  it('POST /courses - powinien utworzyć nowy kurs', async () => {
    // Arrange
    const newCourse = {
      title: uniqueTitle,
      description: 'Opis testowy dla AAA',
      course_type: 'individual',
      workplace_id: null
    };

    // Act
    const res = await request(API_URL)
      .post('/courses')
      .send(newCourse);

    // Assert
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
    
    createdCourseId = res.body.id;
  });

  // TEST: Weryfikacja danych (READ)
  it('GET /courses - kurs powinien zostać zapisany i posiadać invite_code', async () => {
    // Arrange
    // (Brak danych wejściowych)

    // Act
    const res = await request(API_URL).get('/courses');

    // Assert
    expect(res.status).toBe(200);
    
    const myCourse = res.body.data.find(c => c.course_id === createdCourseId);
    expect(myCourse).toBeDefined();
    expect(myCourse.title).toBe(uniqueTitle);
    expect(myCourse.invite_code).toBeTruthy();
  });

  // TEST: Walidacja typów
  it('POST /courses - powinien zwrócić błąd przy nieprawidłowym typie kursu', async () => {
    // Arrange
    const invalidCourse = {
      title: 'Zły Kurs',
      course_type: 'unknown_type' // Wartość spoza ENUM
    };

    // Act
    const res = await request(API_URL)
      .post('/courses')
      .send(invalidCourse);

    // Assert
    // Baza danych lub walidator API powinien odrzucić to żądanie
    expect(res.status).toBeGreaterThanOrEqual(400);
  });

  // TEST: Edycja (UPDATE)
  it('PUT /courses/:id - powinien zaktualizować opis kursu', async () => {
    // Arrange
    const updateData = {
      description: 'Zaktualizowany opis kursu AAA'
    };

    // Act
    const res = await request(API_URL)
      .put(`/courses/${createdCourseId}`)
      .send(updateData);

    // Assert
    expect(res.status).toBe(200);
  });

  // TEST: Usuwanie (DELETE)
  it('DELETE /courses/:id - powinien usunąć kurs', async () => {
    // Arrange
    const resourceUrl = `/courses/${createdCourseId}`;

    // Act
    const res = await request(API_URL).delete(resourceUrl);

    // Assert
    expect(res.status).toBe(200);
  });
});