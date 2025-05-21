const rechnungSchema = {
  title: "Rechnung",
  description: "Schema für ein einfaches Rechnungsdokument",
  type: "object",
  properties: {
    rechnungsnummer: {
      type: "string",
      description: "Eindeutige Kennung der Rechnung",
    },
    rechnungsdatum: {
      type: "string",
      description: "Datum der Rechnungsstellung (JJJJ-MM-TT)",
    },
    faelligkeitsdatum: {
      type: "string",
      description: "Datum, bis zu dem die Zahlung fällig ist (JJJJ-MM-TT)",
    },
    verkaeufer: {
      type: "object",
      properties: {
        name: {
          type: "string",
          description: "Name des Verkäufers oder Dienstleisters",
        },
        adresse: {
          type: "string",
          description: "Adresse des Verkäufers",
        },
        steuer_id: {
          type: "string",
          description: "Steueridentifikationsnummer des Verkäufers",
        },
      },
      required: ["name", "adresse"],
    },
    kunde: {
      type: "object",
      properties: {
        name: {
          type: "string",
          description: "Name des Kunden oder Auftraggebers",
        },
        adresse: {
          type: "string",
          description: "Adresse des Kunden",
        },
        kunden_id: {
          type: "string",
          description: "Interne Kundenkennung (optional)",
        },
      },
      required: ["name", "adresse"],
    },
    positionen: {
      type: "array",
      description: "Liste der Artikel oder Dienstleistungen auf der Rechnung",
      items: {
        type: "object",
        properties: {
          beschreibung: {
            type: "string",
            description: "Beschreibung des Artikels oder der Dienstleistung",
          },
          menge: {
            type: "number",
            description: "Menge des Artikels",
          },
          einzelpreis: {
            type: "number",
            description: "Preis pro Einheit",
          },
          zeilen_gesamt: {
            type: "number",
            description:
              "Gesamtbetrag für diese Position (Menge * Einzelpreis)",
          },
        },
        required: ["beschreibung", "menge", "einzelpreis", "zeilen_gesamt"],
      },
    },
    zwischensumme: {
      type: "number",
      description: "Zwischensumme vor Steuern und Rabatten",
    },
    steuerbetrag: {
      type: "number",
      description: "Gesamtsteuerbetrag",
    },
    gesamtbetrag: {
      type: "number",
      description: "Gesamtbetrag der Rechnung",
    },
    waehrung: {
      type: "string",
      description: "Währung der Rechnung (z. B. USD, EUR)",
    },
    zahlungsbedingungen: {
      type: "string",
      description: "Beschreibung der Zahlungsbedingungen (z. B. Netto 30 Tage)",
    },
    anmerkungen: {
      type: "string",
      description: "Zusätzliche Anmerkungen auf der Rechnung",
    },
  },
  required: [
    "rechnungsnummer",
    "rechnungsdatum",
    "verkaeufer",
    "kunde",
    "positionen",
    "zwischensumme",
    "gesamtbetrag",
    "waehrung",
  ],
};

export const schemas = {
  rechnung: rechnungSchema,
};
