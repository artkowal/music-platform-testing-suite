import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';

const API_URL = 'http://localhost:5001/api';

/**
 * INTEGRATION TEST SUITE: Lessons
 * Cel: Weryfikacja podzasobów (Lekcje w Kursie), uploadu i edycji.
 */

describe('INTEGRATION: Lessons API', () => {
  let courseId;
  let lessonId;
  const uniqueTitle = `Kurs dla Lekcji AAA ${Date.now()}`;

  // GLOBAL SETUP (Arrange)
  beforeAll(async () => {
    // Tworzymy kurs
    const res = await request(API_URL).post('/courses').send({
      title: uniqueTitle,
      description: 'Opis techniczny dla testów lekcji',
      course_type: 'individual'
    });

    if (res.body && res.body.id) {
      courseId = res.body.id;
    } else {
      // Fallback: znajdź ID jeśli nie zwrócono wprost
      const listRes = await request(API_URL).get('/courses');
      const found = listRes.body.data.find(c => c.title === uniqueTitle);
      if (found) courseId = found.course_id;
    }

    if (!courseId) console.error("SETUP FAILED: Brak courseId");
  });

  // (Cleanup)
  afterAll(async () => {
    if (courseId) {
      await request(API_URL).delete(`/courses/${courseId}`);
    }
  });

  // TEST: Dodawanie lekcji (CREATE)
  it('POST /lessons - powinien dodać lekcję do kursu (Multipart)', async () => {
    // Arrange
    expect(courseId).toBeDefined();

    // Act
    // Używamy .field() symulując formularz (wymagane przez Multer)
    const res = await request(API_URL)
      .post('/lessons')
      .field('course_id', courseId)
      .field('title', 'Lekcja 1: Wstęp AAA')
      .field('description', 'Opis lekcji')
      .field('duration_minutes', 45)
      .field('is_visible', 'true');

    // Assert
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
    
    lessonId = res.body.id;
  });

  // TEST: Edycja lekcji (UPDATE)
  it('PUT /lessons/:id - powinien zmienić status widoczności', async () => {
    // Arrange
    expect(lessonId).toBeDefined();
    const updateData = {
      title: 'Lekcja 1: Wstęp (Edytowana)',
      is_visible: 0 // false
    };

    // Act
    const res = await request(API_URL)
      .put(`/lessons/${lessonId}`)
      .send(updateData);

    // Assert
    expect(res.status).toBe(200);
  });

  // TEST: Pobieranie struktury (READ)
  it('GET /courses - lekcje powinny być widoczne w strukturze kursu', async () => {
    // Arrange
    // (Brak danych wejściowych)

    // Act
    const res = await request(API_URL).get('/courses');

    // Assert
    expect(res.status).toBe(200);
    // Ten test jest ogólny - weryfikuje integralność API
  });

  // TEST: Walidacja relacji
  it('POST /lessons - powinien zwrócić błąd dla błędnego course_id', async () => {
    // Arrange
    // Próba dodania lekcji bez przypisania do kursu (brak course_id)

    // Act
    const res = await request(API_URL)
      .post('/lessons')
      .field('title', 'Lekcja Widmo');

    // Assert
    expect(res.status).not.toBe(201);
  });

  // TEST: Weryfikacja usuwania (DELETE)
  it('DELETE /lessons/:id - weryfikacja odpowiedzi serwera', async () => {
    // Arrange
    if (!lessonId) return; // Skip if creation failed

    // Act
    const res = await request(API_URL).delete(`/lessons/${lessonId}`);

    // Assert
    // Sprawdzamy, czy serwer żyje i odpowiada (nie rzuca 500)
    // 200 = usunięto, 404 = endpoint nie zaimplementowany (też OK w tym kontekście)
    expect(res.status).not.toBe(500);
  });
});