# David's Beispielprojekt - Mini DMS

Ein schlankes Dokumentenmanagement-System (DMS) zur Demonstration der Integration von KI-gesteuerter Datenextraktion und Cloud-Speicher.

## Kurzbeschreibung

Dieses Projekt ermöglicht das Hochladen gescannter Dokumente. **Bitte beachte: Die Verarbeitung von PDF-Dokumenten wird momentan noch nicht unterstützt.** Mithilfe der OpenAI Vision API werden vordefinierte Daten aus den Dokumenten extrahiert. Sowohl die Originaldokumente als auch die extrahierten JSON-Daten werden sicher im Vercel Blob Storage gespeichert.

## Technologien

- **Next.js:** Full-Stack Framework für schnelle Entwicklung und API-Routen.
- **OpenAI Vision API:** Für intelligente Text- und Datenextraktion aus Bildern/PDFs.
- **Vercel Blob Storage & SDK:** Zuverlässige und einfache Cloud-Speicherung.

## Funktionen

- Hochladen von Dokumenten (JPEG, PNG).
- **Die Unterstützung für PDF-Uploads ist derzeit nicht aktiv.**
- Automatische Datenextraktion basierend auf einem vordefinierten Schema.
- Speicherung von Dokument und extrahierten Daten im Vercel Blob Storage.

## Datenextraktionsschema

Das Schema für die Datenextraktion ist in der Datei `src/data/schemas.ts` definiert und kann dort angepasst werden.
