# David's Beispielprojekt - Mini DMS

Ein schlankes Dokumentenmanagement-System (DMS) zur Demonstration der Integration von KI-gesteuerter Datenextraktion und Cloud-Speicher.

## Kurzbeschreibung

Dieses Projekt ermöglicht das Hochladen gescannter Dokumente. Mithilfe der OpenAI Vision API werden vordefinierte Daten aus den Dokumenten extrahiert. Sowohl die Originaldokumente als auch die extrahierten JSON-Daten werden sicher im Vercel Blob Storage gespeichert.

## Technologien

- **Next.js:** Full-Stack Framework für schnelle Entwicklung und API-Routen.
- **OpenAI Vision API:** Für intelligente Text- und Datenextraktion aus Bildern/PDFs.
- **Vercel Blob Storage & SDK:** Zuverlässige und einfache Cloud-Speicherung.

## Funktionen

- Hochladen von Dokumenten (PDF, JPEG, PNG).
- Automatische Datenextraktion basierend auf einem vordefinierten Schema.
- Speicherung von Dokument und extrahierten Daten im Vercel Blob Storage.

## Setup und Ausführung (Lokal)

1.  **Repository klonen:**

    ```bash
    git clone DEIN_REPO_URL
    cd davids-beispielprojekt
    ```

2.  **Umgebungsvariablen konfigurieren:**
    Erstelle eine `.env.local` Datei und füge deine API-Schlüssel und Tokens hinzu:

    ```dotenv
    BLOB_READ_WRITE_TOKEN=dein_vercel_blob_token
    OPENAI_API_KEY=dein_openai_api_schlüssel
    NEXT_PUBLIC_BASE_URL=http://localhost:3000
    ```

3.  **Abhängigkeiten installieren:**

    ```bash
    npm install
    ```

4.  **Projekt starten:**
    ```bash
    npm run dev
    ```
    Die Anwendung ist danach unter `http://localhost:3000` erreichbar.

## Datenextraktionsschema

Das Schema für die Datenextraktion ist in der Datei `src/utils/extractionSchema.js` definiert und kann dort angepasst werden.

## Deployment

Das Projekt ist für das Deployment auf Vercel optimiert. Stelle sicher, dass die Umgebungsvariablen in den Vercel Projekt-Einstellungen konfiguriert sind.

## Lizenz

Dieses Projekt steht unter der MIT-Lizenz.

---

_Ersetze `DEIN_REPO_URL`, `dein_vercel_blob_token`, `dein_openai_api_schlüssel` und gegebenenfalls den Pfad zur Schema-Datei durch die tatsächlichen Werte deines Projekts._
