# 101515982 — Harry Potter API (COMP 3133 Lab Test 2b)

**Author:** Gozde Baran  
**Student ID:** 101515982  
**Course:** COMP 3133 — Lab Test 2 (Option 2b, Harry Potter)

Angular app that reads the public [Harry Potter API](https://hp-api.onrender.com/) (`HttpClient`). Layout and responsibilities are similar to a typical course submission (list → filter → detail, dedicated service, typed models, Angular Material), but **this codebase was written independently** for your own repository—do not copy another student’s project file-for-file.

## Features

| Area                  | What it does                                                                                                                                                                      |
| --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **characterlist**     | Loads `/api/characters`, shows `name`, `house`, `image` (+ actor). Uses `@for`, `@if`, `@switch`, **signals**, and a **template-driven** name search (`FormsModule` + `ngModel`). |
| **characterfilter**   | `mat-select` + **`ReactiveFormsModule`** / `FormControl`. Calls `/api/characters/house/:house` or, for **No house**, filters the full list client-side.                           |
| **characterdetails**  | Route param `id`, loads `/api/character/:id` (array → first row). Shows required fields including nested **wand**.                                                                |
| **PotterDataService** | All HTTP calls in one injectable service (standalone-app equivalent of centralizing `HttpClient` usage).                                                                          |
| **Models**            | `PotterCharacter`, `PotterWand` in `src/app/models/`.                                                                                                                             |
| **Pipe**              | `WandSummaryPipe` formats wand data for the detail view.                                                                                                                          |
| **Material**          | Toolbar, cards, buttons, form field, select, spinner, divider.                                                                                                                    |
| **Styling**           | Global dark layout + prebuilt Material theme in `src/styles.css`.                                                                                                                 |

> **Note:** The lab mentions `HttpClientModule`. In current Angular, `provideHttpClient()` in `app.config.ts` is the supported way to register the same HTTP client APIs.
