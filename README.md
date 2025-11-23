# Nazwa kursu: Testowanie i Jakość Oprogramowania

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
*(Ta sekcja zostanie uzupełniona w II etapie projektu. Planowane jest pokrycie testami jednostkowymi, integracyjnymi oraz manualnymi.)*

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