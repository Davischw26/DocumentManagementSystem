const rechnungSchema = {
  name: "rechnung",
  schema: {
    type: "object",
    properties: {
      titel: {
        type: "string",
        description:
          "Kurzer, beschreibender Titel der Rechnung (z.B. 'Rechnung #12345 für Büromaterial')",
      },
      rechnungsnummer: {
        type: "string",
      },
      rechnungsdatum: {
        type: "string",
      },
      verkaeufer: {
        type: "object",
        properties: {
          name: {
            type: "string",
          },
          adresse: {
            type: "string",
          },
        },
        required: ["name", "adresse"],
      },
      kunde: {
        type: "object",
        properties: {
          name: {
            type: "string",
          },
          adresse: {
            type: "string",
          },
        },
        required: ["name", "adresse"],
      },
      positionen: {
        type: "array",
        items: {
          type: "object",
          properties: {
            beschreibung: {
              type: "string",
            },
            menge: {
              type: "number",
            },
            einzelpreis: {
              type: "number",
            },
          },
          required: ["beschreibung", "menge", "einzelpreis"],
        },
      },
      gesamtbetrag: {
        type: "number",
      },
      waehrung: {
        type: "string",
      },
    },
    required: [
      "rechnungsnummer",
      "rechnungsdatum",
      "verkaeufer",
      "kunde",
      "positionen",
      "gesamtbetrag",
      "waehrung",
    ],
  },
};

const bewerbungSchema = {
  name: "bewerbung",
  schema: {
    type: "object",
    properties: {
      titel: {
        type: "string",
        description:
          "Kurzer, beschreibender Titel der Bewerbung (z.B. 'Bewerbung als Softwareentwickler')",
      },
      bewerbungs_id: {
        type: "string",
        description: "Eindeutige ID der Bewerbung",
      },
      stellentitel: {
        type: "string",
        description: "Für welche Stelle sich beworben wird",
      },
      bewerber: {
        type: "object",
        properties: {
          vorname: {
            type: "string",
            description: "Vorname des Bewerbers",
          },
          nachname: {
            type: "string",
            description: "Nachname des Bewerbers",
          },
          email: {
            type: "string",
            format: "email",
            description: "E-Mail-Adresse des Bewerbers",
          },
          telefon: {
            type: "string",
            description: "Telefonnummer des Bewerbers (optional)",
          },
        },
        required: ["vorname", "nachname", "email"],
      },
      bewerbungsdatum: {
        type: "string",
        format: "date",
        description: "Datum der Bewerbung (JJJJ-MM-TT)",
      },
      status: {
        type: "string",
        enum: ["eingegangen", "in Bearbeitung", "abgelehnt", "angenommen"],
        description: "Aktueller Status der Bewerbung",
      },
    },
    required: [
      "bewerbungs_id",
      "stellentitel",
      "bewerber",
      "bewerbungsdatum",
      "status",
    ],
  },
};

const krankmeldungSchema = {
  name: "krankmeldung",
  schema: {
    type: "object",
    properties: {
      titel: {
        type: "string",
        description:
          "Kurzer, beschreibender Titel der Krankmeldung (z.B. 'Krankmeldung Max Mustermann')",
      },
      krankmeldung_id: {
        type: "string",
        description: "Eindeutige ID der Krankmeldung",
      },
      mitarbeiter_id: {
        type: "string",
        description: "ID des Mitarbeiters",
      },
      beginn_krankheit: {
        type: "string",
        format: "date",
        description: "Datum, an dem die Krankheit begonnen hat (JJJJ-MM-TT)",
      },
      ende_krankheit: {
        type: "string",
        format: "date",
        description:
          "Voraussichtliches Ende der Krankheit (JJJJ-MM-TT) (optional)",
      },
      eingereicht_am: {
        type: "string",
        format: "date-time",
        description: "Datum und Uhrzeit der Einreichung der Krankmeldung",
      },
      arztliche_bescheinigung_erforderlich: {
        type: "boolean",
        description: "Ist eine ärztliche Bescheinigung erforderlich?",
      },
      status: {
        type: "string",
        enum: ["eingereicht", "genehmigt", "abgelehnt"],
        description: "Status der Krankmeldung",
      },
    },
    required: [
      "krankmeldung_id",
      "mitarbeiter_id",
      "beginn_krankheit",
      "eingereicht_am",
      "arztliche_bescheinigung_erforderlich",
      "status",
    ],
  },
};

export type SchemaType =
  | typeof rechnungSchema
  | typeof bewerbungSchema
  | typeof krankmeldungSchema;

export const schemas: Record<string, SchemaType> = {
  rechnung: rechnungSchema,
  bewerbung: bewerbungSchema,
  krankmeldung: krankmeldungSchema,
};
