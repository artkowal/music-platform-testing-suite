# Testowanie i Jakość Oprogramowania II 

## Autor
**Adrian Kowal**

## Temat projektu
**MusicDesk Core** – Platforma do zarządzania lekcjami muzyki (Moduł Zarządzania).

## Opis projektu
Aplikacja webowa służąca do organizacji pracy nauczycieli muzyki. Projekt stanowi funkcjonalny wycinek większego systemu, skupiający się na kluczowej logice biznesowej (*Core Domain*).

Główne funkcjonalności zawarte w tym module:
1.  **Zarządzanie Placówkami:** Tworzenie, edycja, usuwanie i sortowanie (*Drag & Drop*) miejsc pracy nauczyciela.
2.  **Zarządzanie Kursami:** Tworzenie kursów indywidualnych i grupowych, przypisywanie ich do placówek.
3.  **Organizacja Lekcji:** Planowanie lekcji, zarządzanie ich widocznością oraz statusami.
4.  **Materiały Dydaktyczne:** Upload i zarządzanie plikami (nuty, nagrania) przypisanymi do lekcji.
5.  **Relacje:** Zapraszanie uczniów do kursów (symulacja bazy użytkowników).

Aplikacja posiada w pełni funkcjonalny interfejs użytkownika (**Frontend**) oraz API (**Backend**) połączone z bazą danych. Ze względu na cel projektu (testowanie logiki biznesowej), moduł autoryzacji został zastąpiony mechanizmem mockowania użytkownika ("Jan Nauczyciel").

## Uruchomienie projektu
Projekt jest w pełni skonteneryzowany. Wymagane jest środowisko **Docker Desktop**.

1.  W terminalu w głównym katalogu projektu wpisz:
    ```bash
    docker-compose up --build
    ```
2.  Aplikacja Frontendowa dostępna jest pod adresem:
    [http://localhost:5173](http://localhost:5173)
3.  Aplikacja Backendowa działa na porcie:
    [http://localhost:5001](http://localhost:5001)

## Testy

**Testy Jednostkowe (Unit Tests)** 

#### 1. Algorytmy i Funkcje Pomocnicze (Helpers)
* 📄 **[`colors.test.ts`](./client/src/lib/colors.test.ts)**
    * **Opis:** Weryfikacja czystych funkcji (Pure Functions) odpowiedzialnych za konwersję kolorów (Hex → HSL/RGBA).

#### 2. Logika Biznesowa (Core Domain)
* 📄 **[`LessonTimer.test.ts`](./client/src/pages/dashboard/dashboardLessonPage/components/LessonTimer.test.ts)**
    * **Opis:** Testy formatowania czasu w liczniku lekcji. Kluczowa funkcja dla UX ucznia.

#### 3. Komponenty Interfejsu (UI Kit & Interaction)
* 📄 **[`button.test.tsx`](./client/src/components/ui/button.test.tsx)**
    * **Opis:** Testy interaktywności przycisków.
* 📄 **[`input.test.tsx`](./client/src/components/ui/input.test.tsx)**
    * **Opis:** Weryfikacja poprawnego renderowania atrybutów HTML i bezpieczeństwa.
* 📄 **[`badge.test.tsx`](./client/src/components/ui/badge.test.tsx)**
    * **Opis:** Testy warstwy prezentacyjnej i logiki warunkowej.

### Testy Integracyjne (API Integration Tests)

* 📄 **[`workplaces.test.js`](./server/tests/workplaces.test.js)**
    * **Opis:** Pełny cykl życia placówki (CRUD). Weryfikacja tworzenia, pobierania listy, edycji i usuwania zasobów.
* 📄 **[`courses.test.js`](./server/tests/courses.test.js)**
    * **Opis:** Zarządzanie kursami i logiką biznesową (np. generowanie unikalnych kodów zaproszeń `invite_code`). Walidacja typów danych (Enum).
* 📄 **[`lessons.test.js`](./server/tests/lessons.test.js)**
    * **Opis:** Testy zagnieżdżonych zasobów i przesyłania danych formularzy (**Multipart/Form-data**).

## Jak uruchomić testy?

Aby uruchomić wszystkie testy jednostkowe lub integracyjne wykonaj komendę w katalogu `client` bądź `server`:

```bash
cd client
npm run test
```

```bash
cd server
npm run test
```

## Dokumentacja API
Dokumentacja endpointów (**Swagger/OpenAPI**) jest generowana automatycznie i dostępna po uruchomieniu projektu pod adresem:
**[http://localhost:5001/api-docs](http://localhost:5001/api-docs)**

## Przypadki testowe dla testera manualnego (TestCase)
*(Szczegółowe scenariusze zostaną dodane w II etapie projektu.)*

## Technologie użyte w projekcie

### Frontend
* **React 19**
* **TypeScript**
* **Tailwind CSS**
* **Shadcn/UI** (komponenty interfejsu)
* **Vite** (build tool)

### Backend
* **Node.js**
* **Express.js**
* **Multer** (obsługa przesyłania plików)

### Baza Danych
* **MySQL 8.0**

### Środowisko
* **Docker** & **Docker Compose**

### Inne
* **Swagger** (automatyczna dokumentacja API)
* **Dnd-kit** (obsługa "przeciągnij i upuść")
* **Axios** (klient HTTP)