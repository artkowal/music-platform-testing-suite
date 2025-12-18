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

### Moduł 1: Zarządzanie Placówkami (Workplaces)

#### TC-01
| Cecha | Opis |
| :--- | :--- |
| **ID** | TC-01 |
| **Tytuł** | Dodanie nowej placówki |
| **Warunki wstępne** | Użytkownik zalogowany, widok "Ustawienia placówek". |
| **Kroki testowe** | 1. Kliknij przycisk "Dodaj placówkę".<br>2. Wpisz nazwę: "Szkoła Muzyczna A".<br>3. Wybierz kolor z palety.<br>4. Kliknij przycisk "Zapisz". |
| **Oczekiwany rezultat** | Modal zamyka się. Nowa placówka pojawia się na końcu listy. Wyświetla się komunikat sukcesu ("Toast"). |

#### TC-02
| Cecha | Opis |
| :--- | :--- |
| **ID** | TC-02 |
| **Tytuł** | Weryfikacja blokady zapisu bez nazwy |
| **Warunki wstępne** | Użytkownik zalogowany, widok "Ustawienia placówek". |
| **Kroki testowe** | 1. Kliknij "Dodaj placówkę".<br>2. Pozostaw pole "Nazwa" puste.<br>3. Sprawdź stan przycisku "Zapisz". |
| **Oczekiwany rezultat** | Przycisk "Zapisz" jest nieaktywny (zablokowany/disabled). Nie ma możliwości wysłania formularza. |

#### TC-03
| Cecha | Opis |
| :--- | :--- |
| **ID** | TC-03 |
| **Tytuł** | Edycja nazwy istniejącej placówki |
| **Warunki wstępne** | Na liście istnieje placówka o nazwie "Szkoła A". |
| **Kroki testowe** | 1. Kliknij ikonę ołówka (Edytuj) przy "Szkoła A".<br>2. Zmień nazwę na "Szkoła B".<br>3. Kliknij "Zapisz". |
| **Oczekiwany rezultat** | Nazwa na liście zmienia się natychmiast na "Szkoła B". |

#### TC-04
| Cecha | Opis |
| :--- | :--- |
| **ID** | TC-04 |
| **Tytuł** | Zmiana kolejności placówek (Drag & Drop) |
| **Warunki wstępne** | Na liście znajdują się minimum 2 placówki. |
| **Kroki testowe** | 1. Chwyć myszką pierwszą placówkę na liście.<br>2. Przeciągnij ją poniżej drugiej placówki.<br>3. Upuść element. |
| **Oczekiwany rezultat** | Kolejność elementów ulega zmianie wizualnie. Po odświeżeniu strony (F5) nowa kolejność jest zachowana. |

#### TC-05
| Cecha | Opis |
| :--- | :--- |
| **ID** | TC-05 |
| **Tytuł** | Usunięcie placówki |
| **Warunki wstępne** | Istnieje placówka przeznaczona do usunięcia. |
| **Kroki testowe** | 1. Kliknij ikonę kosza (Usuń) przy placówce.<br>2. W oknie potwierdzenia kliknij "Tak, usuń". |
| **Oczekiwany rezultat** | Placówka znika z listy. Wyświetla się komunikat potwierdzający usunięcie. |

---

### Moduł 2: Zarządzanie Kursami (Courses)

#### TC-06
| Cecha | Opis |
| :--- | :--- |
| **ID** | TC-06 |
| **Tytuł** | Utworzenie Kursu Indywidualnego |
| **Warunki wstępne** | Widok placówki (istnieje min. 1 placówka) |
| **Kroki testowe** | 1. Kliknij przycisk "Nowy Kurs".<br>2. Wpisz tytuł: "Pianino Podstawy".<br>3. Wybierz rodzaj zajęć: "Indywidualny".<br/>5. Kliknij "Utwórz kurs". |
| **Oczekiwany rezultat** | Kurs pojawia się na liście. Komunikat potwierdzający utworzenie kursu. |

#### TC-07
| Cecha | Opis |
| :--- | :--- |
| **ID** | TC-07 |
| **Tytuł** | Walidacja tworzenia kursu (Brak tytułu) |
| **Warunki wstępne** | Otwarty modal tworzenia kursu. |
| **Kroki testowe** | 1. Pozostaw pole "Tytuł" puste.<br>2. Wybierz typ kursu.<br>3. Kliknij "Utwórz kurs". |
| **Oczekiwany rezultat** | Akcja nieudana. Komunikat o braku wymaganego pola |

#### TC-08
| Cecha | Opis |
| :--- | :--- |
| **ID** | TC-08 |
| **Tytuł** | Edycja opisu kursu |
| **Warunki wstępne** | Istnieje kurs "Pianino". |
| **Kroki testowe** | 1. Wejdź w Ustawienia kursu.<br>2. W polu opis wpisz "Zajęcia odbywają się we wtorki".<br>3. Kliknij "Zapisz zmiany". |
| **Oczekiwany rezultat** | Komunikat "Zaktualizowano kurs". Opis jest widoczny w szczegółach kursu. |

#### TC-09
| Cecha | Opis |
| :--- | :--- |
| **ID** | TC-09 |
| **Tytuł** | Usunięcie Kursu |
| **Warunki wstępne** | Widok Placówki.Istnieje kurs testowy. |
| **Kroki testowe** | 1. Kliknij trzy kropki w prawym górnym rogu karty kursu<br>2. Kliknij "Usuń kurs" i potwierdź w modalu. |
| **Oczekiwany rezultat** | Kurs znika z listy kursów. Komunikat kurs usunięty |

---

### Moduł 3: Lekcje i Materiały

#### TC-10
| Cecha | Opis |
| :--- | :--- |
| **ID** | TC-10 |
| **Tytuł** | Dodanie nowej lekcji do planu |
| **Warunki wstępne** | Użytkownik w widoku Kursu. |
| **Kroki testowe** | 1. Kliknij "Dodaj lekcję".<br>2. Wpisz temat: "Lekcja 1: Wprowadzenie".<br>3. Ustaw czas trwania: 45 min.<br>4. Kliknij "Dodaj". |
| **Oczekiwany rezultat** | Nowa lekcja pojawia się na liście lekcji. Komunikat potwierdzający dodanie lekcji. |

#### TC-11
| Cecha | Opis |
| :--- | :--- |
| **ID** | TC-11 |
| **Tytuł** | Upload materiałów dydaktycznych (PDF/MP3) |
| **Warunki wstępne** | Utworzona lekcja "Lekcja 1". |
| **Kroki testowe** | 1. Kliknij przycisk "Edytuj treść".<br>2. W sekcji "Materiały do lekjcji" kliknij "Przeglądaj".<br>3. Wybierz plik PDF lub MP3 z dysku.<br>4. Zatwierdź upload. |
| **Oczekiwany rezultat** | Plik przesyła się na serwer. Po chwili pojawia się na liście materiałów w danej lekcji. |

#### TC-12
| Cecha | Opis |
| :--- | :--- |
| **ID** | TC-12 |
| **Tytuł** | Zmiana widoczności lekcji (Ukrywanie) |
| **Warunki wstępne** | Lekcja jest widoczna (ikona oka). |
| **Kroki testowe** | 1. Wejdź w edycję lekcji.<br>2. Odznacz switch "Widoczna".<br>3. Zapisz zmiany. |
| **Oczekiwany rezultat** | Ikona przy lekcji zmienia się na "Przekreślone oko". Lekcja jest wyszarzona na liście. |

#### TC-13
| Cecha | Opis |
| :--- | :--- |
| **ID** | TC-13 |
| **Tytuł** | Obsługa Licznika Czasu |
| **Warunki wstępne** | Użytkownik w widoku aktywnej Lekcji. |
| **Kroki testowe** | 1. Kliknij przycisk "Start" (Play).<br>2. Odczekaj 5 sekund.<br>3. Kliknij "Pauza". |
| **Oczekiwany rezultat** | Licznik rusza od 00:00. Czas upływa poprawnie. Po kliknięciu pauzy licznik zatrzymuje się, a stan jest zapamiętany. |

#### TC-14
| Cecha | Opis |
| :--- | :--- |
| **ID** | TC-14 |
| **Tytuł** | Usunięcie materiału z lekcji |
| **Warunki wstępne** | Lekcja posiada przypisany plik. Widok "Edycja treści" |
| **Kroki testowe** | 1. Najedź na plik w liście materiałów.<br>2. Kliknij ikonę kosza.<br>3. Potwierdź usunięcie. |
| **Oczekiwany rezultat** | Plik znika z listy materiałów lekcji. Komunikat potwierdzający akcję |

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