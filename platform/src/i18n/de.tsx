
import Withdraw from "src/view/pages/withdraw/Withdraw";

const de = {
  app: {
    title: "Zalando"
  },
  inputs: {
    username: "Benutzername",
    password: "Passwort",
    phoneNumber: "Telefonnummer",
    withdrawPassword: "Auszahlungs-Passwort",
    confirmPassword: "Passwort bestätigen",
    invitationcode: "Einladungscode",
    walletaddress: "Wallet-Adresse"
  },



  pages: {
    home: {
      levels: "VIP-Stufen",
      chooseLevel: "Wählen Sie Ihre Stufe, um Ihre Einnahmen zu maximieren",
      welcome: "Willkommen",
      announcement: "Liebe Benutzer, die E-clicks Digital-Plattform ist wieder im besten und normalen Zustand, verdienen Sie weiterhin so viel wie möglich von der Plattform",

      // Action Buttons
      services: "Dienstleistungen",
      events: "Veranstaltungen",
      about: "Über uns",
      terms: "AGB",
      certificate: "Zertifikat",
      faqs: "FAQ",

      // VIP Level Cards
      currentLevel: "Aktuell",
      upgrade: "Upgrade",
      profitNormal: "Gewinn auf normale Produkte",
      profitPremium: "Gewinn auf Premium-Produkte",
      maxOrders: "Max. Bestellungen pro Tag",

      // Modal
      modal: {
        levelDetails: "Stufendetails",
        levelLimit: "Stufenlimit",
        dailyOrders: "Tägliche Bestellungen",
        commissionRate: "Provisionssatz",
        cancel: "Abbrechen",
        upgradeNow: "Jetzt upgraden"
      }
    },

    prizeModal: {
      congratulations: "Herzlichen Glückwunsch!",
      spinning: "Dreht sich...",
      prizeWon: "Sie haben gewonnen!",
      currency: "USD",
      prizeBreakdown: "Preisaufstellung",
      totalAmount: "Gesamtbetrag",
      yourWinnings: "Ihr Gewinn",
      claimPrize: "Preis beanspruchen",
      celebrationMessage: "Genießen Sie Ihre Belohnung!",
    },

    
    tabBottomNavigator: {
      home: "Startseite",
      grap: "Erfassen",
      records: "Aufzeichnungen",
      starting: "Starten"
    },

    transaction: {
      title: "Transaktionsverlauf",
      filters: {
        all: "Alle",
        withdraw: "Auszahlung",
        deposit: "Einzahlung"
      },
      recentTransactions: "Letzte Transaktionen",
      transactionCount: "{0} Transaktionen",
      types: {
        deposit: "Einzahlung",
        withdrawal: "Auszahlung"
      },
      status: {
        completed: "Abgeschlossen",
        processing: "In Bearbeitung",
        canceled: "Storniert"
      },
      amount: {
        deposit: "+${0}",
        withdraw: "-${0}",
        canceled: "${0}"
      }
    },

    profile: {
      title: "Profil",
      invitationCode: "Einladungscode",
      creditScore: "Kredit-Score",
      balance: "Guthaben",
      todayProfit: "Heutiger Gewinn",
      frozenAmount: "Eingefrorener Betrag",
      usd: "USD",

      // Menu Sections
      myFinancial: "Meine Finanzen",
      myDetails: "Meine Details",
      other: "Andere",

      // Financial Items
      recharge: "Aufladen",
      withdraw: "Auszahlen",

      // Details Items
      contactUs: "Kontaktieren Sie uns",
      profile: "Profil",
      updateWithdrawal: "Auszahlungsdetails aktualisieren",

      // Other Items
      transaction: "Transaktion",
      tasksHistory: "Aufgabenverlauf",
      security: "Sicherheit",
      notifications: "Benachrichtigungen",
      languages: "Sprachen",

      // Buttons
      logout: "Abmelden",
      confirm: "Bestätigen",
      copied: "Kopiert",

      // Modals
      rechargeModal: {
        title: "Aufladen",
        text: "Bitte kontaktieren Sie den Kundenservice zum Aufladen"
      },
      withdrawModal: {
        title: "Auszahlung",
        text: "Bitte kontaktieren Sie den Kundenservice, um mit Ihrer Auszahlung fortzufahren."
      }
    },

    team: {
      title: "Profil",
      personalInformation: "Persönliche Informationen",
      accountDetails: "Ihre Kontodetails und persönlichen Informationen",

      // Info Items
      fullName: "Vollständiger Name",
      email: "E-Mail",
      phoneNumber: "Telefonnummer",
      country: "Land",
      gender: "Geschlecht",
      invitationCode: "Einladungscode",

      // Gender Values
      genderNotSpecified: "Nicht angegeben",

      // Placeholders
      notAvailable: "—"
    },

    language: {
      title: "App-Sprache",
      selectLanguage: "Sprache auswählen",
      choosePreferred: "Wählen Sie Ihre bevorzugte Sprache",
      searchPlaceholder: "Sprachen suchen...",
      currentLanguage: "Aktuelle Sprache",

      // Language names (if needed for dynamic content)
      languages: {
        english: "Englisch",
        french: "Französisch",
        russian: "Russisch",
        german: "Deutsch",
        spanish: "Spanisch"
      },
      nativeNames: {
        english: "English",
        french: "Français",
        russian: "Русский",
        german: "Deutsch",
        spanish: "Español"
      }
    },

    online: {
      title: "Kundenservice",
      description: "Wenn Sie Fragen haben oder auf Probleme stoßen, senden Sie uns bitte eine E-Mail oder chatten Sie mit unserem Online-Kundensupport-Team.",
      contactWhatsApp: "Auf WhatsApp kontaktieren",
      contactTelegram: "Auf Telegram kontaktieren"
    },

    notifications: {
      title: "Benachrichtigungen",
      filters: {
        all: "Alle",
        deposit: "Einzahlung",
        withdraw: "Auszahlung"
      },
      unreadCount: "{0} ungelesen",
      emptyState: {
        title: "Keine Benachrichtigungen gefunden",
        description: "Sie haben noch keine {0} Benachrichtigungen."
      },

      // Notification Types
      types: {
        deposit_success: "Einzahlung erfolgreich",
        deposit_canceled: "Einzahlung storniert",
        withdraw_success: "Auszahlung erfolgreich",
        withdraw_canceled: "Auszahlung storniert",
        system: "Systembenachrichtigung",
        alert: "Wichtige Warnung",
        default: "Benachrichtigung"
      },

      // Notification Messages
      messages: {
        deposit_success: "Ihre Einzahlung von ${0} wurde erfolgreich abgeschlossen.",
        deposit_canceled: "Ihre Einzahlungsanfrage für ${0} wurde storniert.",
        withdraw_success: "Ihre Auszahlung von ${0} wurde erfolgreich abgeschlossen.",
        withdraw_canceled: "Ihre Auszahlungsanfrage für ${0} wurde storniert.",
        system: "Systembenachrichtigung",
        alert: "Wichtige Warnbenachrichtigung",
        default: "Benachrichtigungsupdate"
      },

      // Status
      status: {
        unread: "ungelesen",
        read: "gelesen"
      }
    },

    portfolio: {
      // Status Tabs
      completed: "Abgeschlossen",
      pending: "Ausstehend",
      canceled: "Storniert",

      // Order Information
      orderTime: "Bestellzeit",
      orderNumber: "Bestellnummer",
      totalOrderAmount: "Gesamtbestellbetrag",
      commission: "Provision",
      estimatedReturn: "Voraussichtliche Rendite",

      // Product Details
      quantity: "X 1",
      currency: "USD",

      // Status Labels
      status: {
        completed: "Abgeschlossen",
        pending: "Ausstehend",
        canceled: "Storniert"
      }
    },

    changePassword: {
      title: "Passwort ändern",
      header: "Passwort ändern",
      oldPassword: "Altes Passwort",
      newPassword: "Neues Passwort",
      confirmPassword: "Passwort bestätigen",
      submit: "Absenden",
      note: "Bitte füllen Sie diese Informationen sorgfältig aus",
      requiredField: "*"
    },

    withdraw: {
      title: "Auszahlung",
      withdrawAmount: "Auszahlungsbetrag",
      withdrawPassword: "Auszahlungspasswort",
      availableBalance: "Verfügbares Guthaben",
      confirm: "Bestätigen",
      rulesDescription: "Regelbeschreibung",
      rules: {
        minimum: "(1) Mindestauszahlung beträgt 100 USD",
        paymentTime: "(2) Die Zahlung wird innerhalb der nächsten Stunde nach Genehmigung des Auszahlungsantrags getätigt.",
        orderCompletion: "(3) Unvollständige tägliche Auftragserfüllung führt zu keiner Auszahlung, alle Produkte müssen für die Auszahlung eingereicht werden"
      }
    },

    checkout: {
      title: "Kasse",
      sectionAddress: "Lieferadresse",
      noAddress: "Sie haben noch keine gespeicherte Lieferadresse",
      addAddress: "+ Lieferadresse hinzufügen",
      changeAddress: "Ändern",
      selectAddressTitle: "Lieferadresse auswählen",
      sectionPayment: "Zahlungsmethode",
      codLabel: "Barzahlung bei Lieferung",
      codDescription: "Zahlen Sie bar direkt an den Kurier, wenn Ihre Bestellung ankommt.",
      sectionSummary: "Bestellübersicht",
      itemsCount: "{0} Artikel",
      subtotal: "Zwischensumme",
      deliveryFee: "Liefergebühr",
      free: "Kostenlos",
      total: "Gesamt",
      placeOrder: "Bestellung aufgeben",
      placingOrder: "Bestellung wird aufgegeben...",
      missingAddress: "Bitte wählen Sie eine Lieferadresse aus",
      emptyCart: "Ihr Warenkorb ist leer",
      successTitle: "Bestellung aufgegeben!",
      successMessage: "Ihre Bestellung wurde erfolgreich aufgegeben. Zahlen Sie bar bei Ankunft.",
      orderNumber: "Bestellnummer",
      totalToPay: "Gesamtbetrag bei Lieferung",
      backToHome: "Zurück zur Startseite",
      done: "Fertig",
    },

    applyMerchant: {
      title: "Für einen Shop bewerben",
      intro: "Geben Sie unten Ihre Shop-Daten ein, um sich als Verkäufer zu bewerben.",
      storePhoto: "Shop-Foto",
      storeName: "Shop-Name",
      storeNamePlaceholder: "Bitte geben Sie den Shop-Namen ein",
      contact: "Kontakt",
      contactPlaceholder: "Bitte geben Sie eine Kontaktperson oder Telefonnummer ein",
      idNumber: "Ausweisnummer",
      idNumberPlaceholder: "Bitte geben Sie Ihre Ausweisnummer ein",
      invitationCode: "Einladungscode",
      invitationCodePlaceholder: "Bitte geben Sie Ihren Einladungscode ein",
      mainBusiness: "Haupttätigkeit",
      mainBusinessPlaceholder: "Haupttätigkeit auswählen",
      idCardFront: "Ausweis Vorderseite",
      idCardBack: "Ausweis Rückseite",
      address: "Vollständige Adresse",
      addressPlaceholder: "Bitte geben Sie die vollständige Adresse ein",
      submit: "Antrag einreichen",
      submitSuccess: "Ihr Shop-Antrag wurde eingereicht und wird nun geprüft.",
      missingStoreName: "Bitte geben Sie den Shop-Namen ein",
      missingMainBusiness: "Bitte wählen Sie die Haupttätigkeit aus",
      missingAddress: "Bitte geben Sie die vollständige Adresse ein",
      missingStorePhoto: "Bitte laden Sie ein Foto Ihres Shops hoch",
      missingIdCardFront: "Bitte laden Sie die Vorderseite Ihres Ausweises hoch",
      missingIdCardBack: "Bitte laden Sie die Rückseite Ihres Ausweises hoch",
      editAndResubmit: "Bearbeiten & erneut einreichen",
      goToDashboard: "Zum Verkäufer-Dashboard",
      status: {
        pendingTitle: "Antrag wird geprüft",
        pendingText: "Ihr Shop-Antrag wird derzeit geprüft. Wir benachrichtigen Sie, sobald er genehmigt wurde.",
        successTitle: "Shop genehmigt",
        successText: "Ihr Shop wurde genehmigt. Gehen Sie zu Ihrem Verkäufer-Dashboard, um ihn zu verwalten.",
        rejectedTitle: "Antrag abgelehnt",
        rejectedText: "Ihr vorheriger Antrag wurde nicht genehmigt. Sie können die Details unten prüfen und erneut einreichen.",
      },
      enumerators: {
        mainBusiness: {
          fashion_clothing: "Mode & Bekleidung",
          electronics: "Elektronik",
          beauty_cosmetics: "Beauty & Kosmetik",
          home_living: "Haus & Wohnen",
          sports_outdoors: "Sport & Outdoor",
          toys_hobbies: "Spielzeug & Hobbys",
          food_beverages: "Lebensmittel & Getränke",
          all: "Alle",
        },
      },
    },

    deliveryAddress: {
      title: "Lieferadresse",
      noAddresses: "Keine Adressen gefunden",
      addAddress: "Adresse hinzufügen",
      modalTitle: "Lieferadresse hinzufügen",
      editModalTitle: "Lieferadresse bearbeiten",
      addressLabel: "Lieferadresse",
      addressPlaceholder: "Bitte geben Sie die vollständige Adresse ein",
      contactNumberLabel: "Kontaktnummer",
      contactNumberPlaceholder: "Bitte geben Sie Ihre Kontaktnummer ein",
      contactLabel: "Kontakt",
      contactPlaceholder: "Bitte geben Sie eine Kontaktperson ein",
      submit: "Adresse hinzufügen",
      saveChanges: "Änderungen speichern",
      createSuccess: "Lieferadresse erfolgreich hinzugefügt",
      updateSuccess: "Lieferadresse erfolgreich aktualisiert",
      destroySuccess: "Lieferadresse erfolgreich gelöscht",
      missingAddress: "Bitte geben Sie die vollständige Adresse ein",
      missingContactNumber: "Bitte geben Sie Ihre Kontaktnummer ein",
      missingContact: "Bitte geben Sie eine Kontaktperson ein",
      confirmDeleteTitle: "Diese Adresse löschen?",
      confirmDeleteText: "Diese Aktion kann nicht rückgängig gemacht werden.",
      delete: "Löschen",
      cancel: "Abbrechen",
    },

    cart: {
      addedToCart: "In den Warenkorb gelegt",
    },

    topup: {
      title: "Aufladen",
      rechargeMethods: "Aufladungsmethoden",
      selectWallet: "Bitte wählen Sie das Aufladungs-Wallet aus",
      wallets: {
        eth: "ETH",
        btc: "BTC",
        usdt_trc20: "USDT (TRC-20)",
        usdt_erc20: "USDT (ERC-20)",
      },
      scanHint: "QR-Code zum Aufladen scannen",
      copyAddress: "Einzahlungsadresse kopieren",
      addressCopied: "Adresse in die Zwischenablage kopiert",
      fee: "Gebühr",
      amount: "Aufladebetrag",
      amountPlaceholder: "Bitte geben Sie den Aufladebetrag ein",
      usdtValue: "USDT-Wert",
      fetchingRate: "Live-Kurs wird abgerufen…",
      enterAmountForValue: "Geben Sie einen Betrag ein, um den USDT-Wert zu sehen",
      rateUnavailable: "Live-Kurs nicht verfügbar - bitte versuchen Sie es in Kürze erneut",
      uploadVoucher: "Aufladebeleg hochladen",
      uploadLabel: "Beleg hochladen",
      submit: "Aufladung einreichen",
      noWalletSelected: "Bitte wählen Sie ein Wallet aus",
      missingAmount: "Bitte geben Sie den Aufladebetrag ein",
      missingPhoto: "Bitte laden Sie den Aufladebeleg hoch",
    },

    withdrawal: {
      title: "Auszahlungszentrum",
      withdrawalMethods: "Auszahlungsmethoden",
      selectWallet: "Bitte wählen Sie die Auszahlungsmethode aus",
      wallets: {
        eth: "ETH",
        btc: "BTC",
        usdt_trc20: "USDT (TRC-20)",
        usdt_erc20: "USDT (ERC-20)",
      },
      availableBalance: "Verfügbares Guthaben",
      fee: "Gebühr",
      withdrawalAddress: "Auszahlungsadresse",
      addressPlaceholder: "Bitte geben Sie die Adresse Ihres Empfangswallets ein oder fügen Sie sie ein",
      amount: "Auszahlungsbetrag",
      amountPlaceholder: "Bitte geben Sie den Auszahlungsbetrag ein",
      withdrawalPassword: "Auszahlungspasswort",
      passwordPlaceholder: "Bitte geben Sie das Auszahlungspasswort ein",
      submit: "Auszahlung bestätigen",
      noWalletSelected: "Bitte wählen Sie eine Auszahlungsmethode aus",
      missingAddress: "Bitte geben Sie die Adresse Ihres Empfangswallets ein",
      missingAmount: "Bitte geben Sie den Auszahlungsbetrag ein",
      exceedsBalance: "Der Auszahlungsbetrag übersteigt Ihr verfügbares Guthaben",
      missingPassword: "Bitte geben Sie Ihr Auszahlungspasswort ein",
      youWillReceive: "Sie erhalten",
      fetchingRate: "Live-Kurs wird abgerufen…",
      enterAmountToPreview: "Geben Sie einen Betrag ein, um zu sehen, was Sie erhalten",
      rateUnavailable: "Live-Kurs nicht verfügbar - bitte versuchen Sie es in Kürze erneut",
      belowFeeWarning: "Dieser Betrag ist zu niedrig, um die Netzwerkgebühr zu decken",
      notice1: "Der gutgeschriebene Betrag richtet sich nach den Gebühren Ihres Empfangskontos oder dem Echtzeit-Wechselkurs.",
      notice2: "Ihre Auszahlung wird innerhalb von 24 Stunden gutgeschrieben, bitte haben Sie etwas Geduld! Falls sie nicht innerhalb von 24 Stunden gutgeschrieben wird, wenden Sie sich bitte an den Online-Kundensupport.",
    },

    wallet: {
      title: "Wallet",
      withdrawalMethod: "Informationen zur Auszahlungsmethode",
      username: "Benutzername",
      walletName: "Wallet-Name",
      choosePreferredCoin: "Bevorzugte Münze wählen",
      walletAddress: "Wallet-Adresse",
      withdrawPassword: "Auszahlungspasswort",
      submit: "Absenden",
      note: "Bitte seien Sie vorsichtig beim Ausfüllen dieser Informationen",
      requiredField: "*"
    },

    grab: {
      // Header Section
      greeting: "Hallo {0} 👏",

      // Stats Cards
      totalAmount: "Gesamtbetrag",
      profitsAdded: "Gewinne werden hier hinzugefügt",
      todaysCommission: "Heutige Provision",
      commissionEarned: "Verdiente Provision",
      currency: "USD",

      // Optimization Section
      startOptimization: "Optimierung starten",
      progressCount: "{0}/{1}",

      // Game Section
      commissionRate: "Provisionssatz",
      exclusiveChannel: "Exklusiver Kanal für exklusive Mitglieder",
      startButton: "Starten",
      processing: "Wird verarbeitet...",

      // Notice Section
      notice: "Hinweis",
      supportHours: "Online-Supportzeiten 10:00 - 22:00",
      contactSupport: "Bitte kontaktieren Sie den Online-Support für Ihre Unterstützung!"
    },

    grapModal: {
      orderTime: "Bestellzeit",
      orderNumber: "Bestellnummer",
      totalOrderAmount: "Gesamtbestellbetrag",
      commission: "Provision",
      estimatedReturn: "Voraussichtliche Rendite",
      cancel: "Abbrechen",
      submit: "Absenden",
      quantity: "X 1",
      currency: "USD"
    },

    actions: {
      event: "Veranstaltungen",
      tc: "Geschäftsbedingungen",
      certificate: "Zertifikat",
      faq: "Häufig gestellte Fragen",
      company: "Unternehmen"
    },

    auth: {
      signin: {
        welcomeBack: "Willkommen zurück!",
        signinToAccount: "Melden Sie sich bei Ihrem Marketing-Konto an",
        signinButton: "Anmelden",
        noAccount: "Noch kein Konto?",
        signupHere: "Hier registrieren."
      },
      signup: {
        createAccount: "Konto erstellen",
        signupForAccount: "Registrieren Sie sich für ein Marketing-Konto",
        signupButton: "Registrieren",
        alreadyHaveAccount: "Haben Sie bereits ein Konto?",
        phonePlaceholder: "Geben Sie Ihre Telefonnummer ein",
        searchCountries: "Länder suchen..."
      }
    },

    csPage: {
      customerSupport: "Kundenservice",
      hereToHelp: "Wir sind hier, um Ihnen zu helfen!",
      howCanWeHelp: "Wie können wir Ihnen heute helfen?",
      platformNames: {
        whatsapp: "WhatsApp",
        telegram: "Telegram"
      }
    },
  },
  entities: {
    record: {
      menu: "Records",
      fields: {
        user: "Benutzer",
        product: "Produkt",
        number: "Record Nummer",
        status: "Status",
      },
      list: {
        title: "Liste der Records",
      },
      view: {
        title: "Record Details",
      },
      edit: {
        title: "Record bearbeiten",
      },
      create: {
        success: "Produkt erfolgreich eingereicht.",
      },
      update: {
        success: "Produkt erfolgreich eingereicht.",
      },
      destroy: {
        success: "Record erfolgreich gelöscht",
      },
      destroyAll: {
        success: "Record erfolgreich gelöscht",
      },
      enumerators: {
        status: {
          pending: "Ausstehend",
          completed: "Abgeschlossen",
          canceled: "Storniert",
        },
      },
    },

    category: {
      name: "Kategorie",
      label: "Kategorien",
      menu: "Kategorien",
      exporterFileName: "kategorie_export",
      list: {
        menu: "Kategorien",
        title: "Kategorien",
      },
      create: {
        success: "Kategorie erfolgreich gespeichert",
      },
      update: {
        success: "Kategorie erfolgreich gespeichert",
      },
      destroy: {
        success: "Kategorie erfolgreich gelöscht",
      },
      destroyAll: {
        success: "Kategorie(n) erfolgreich gelöscht",
      },
      edit: {
        title: "Kategorie bearbeiten",
      },
      fields: {
        id: "Id",
        name: "Name",
        slug: "Slug",
        photo: "Foto",
        metaKeywords: "Meta-Keywords",
        metaDescriptions: "Meta-Beschreibungen",
        status: "Status",
        isFeature: "Ist Feature",
        serialRange: "Seriennummer",
        serial: "Seriennummer",
        createdAt: "Erstellt am",
        updatedAt: "Aktualisiert am",
        createdAtRange: "Erstellt am",
      },
      enumerators: {
        status: {
          enable: "Aktivieren",
          disable: "Deaktivieren",
        },
      },
      placeholders: {},
      hints: {},
      new: {
        title: "Neue Kategorie",
      },
      view: {
        title: "Kategorie anzeigen",
      },
      importer: {
        title: "Kategorien importieren",
        fileName: "kategorie_import_vorlage",
        hint: "Datei-/Bildspalten müssen die URLs der Dateien sein, getrennt durch Leerzeichen.",
      },
    },

    product: {
      name: "produkt",
      label: "Produkte",
      menu: "Produkte",
      exporterFileName: "produkt_export",
      list: {
        menu: "Produkte",
        title: "Produkte",
      },
      create: {
        success: "Produkt erfolgreich gespeichert",
      },
      update: {
        success: "Produkt erfolgreich gespeichert",
      },
      destroy: {
        success: "Produkt erfolgreich gelöscht",
      },
      destroyAll: {
        success: "Produkt(e) erfolgreich gelöscht",
      },
      edit: {
        title: "Produkt bearbeiten",
      },
      fields: {
        id: "Id",
        name: "Name",
        slug: "Slug",
        tags: "Tags",
        video: "Video",
        specificationName: "Spezifikationsname",
        specificationDesciption: "Spezifikationsbeschreibung",
        isSpecification: "Ist Spezifikation",
        details: "Details",
        photo: "Foto",
        discountPriceRange: "Rabattpreis",
        discountPrice: "Aktueller Preis",
        previousPriceRange: "Vorheriger Preis",
        previousPrice: "Vorheriger Preis",
        stockRange: "Lagerbestand",
        stock: "Lagerbestand",
        metaKeywords: "Meta-Keywords",
        metaDesctiption: "Kurze Beschreibung",
        status: "Status",
        isType: "Typ",
        dateRange: "Datum",
        date: "Datum",
        itemType: "Artikeltyp",
        file: "Datei",
        link: "Link",
        fileType: "Dateityp",
        taxe: "Steuer",
        category: "Kategorie",
        subcategory: "Unterkategorie",
        childcategory: "Untergeordnete Kategorie",
        brand: "Marke",
        gallery: "Galerie",
        createdAt: "Erstellt am",
        updatedAt: "Aktualisiert am",
        createdAtRange: "Erstellt am",
      },
      enumerators: {
        status: {
          enable: "Aktivieren",
          disable: "Deaktivieren",
        },
        itemType: {
          physical: "Physisch",
          digitale: "Digital",
        },
        fileType: {
          file: "Datei",
          link: "Link",
        },
        isType: {
          new_arrival: "Neuankömmling",
          feature_product: "Feature-Produkt",
          top_pdroduct: "Top-Produkt",
          best_product: "Bestes Produkt",
          flash_deal_product: "Flash-Deal-Produkt",
        },
      },
      placeholders: {},
      hints: {},
      new: {
        title: "Neues Produkt",
      },
      view: {
        title: "Produkt anzeigen",
      },
      importer: {
        title: "Produkte importieren",
        fileName: "produkt_import_vorlage",
        hint: "Datei-/Bildspalten müssen die URLs der Dateien sein, getrennt durch Leerzeichen.",
      },
    },
    transaction: {
      name: "transaktion",
      label: "Transaktionen",
      menu: "Transaktionen",
      exporterFileName: "transaktion_export",
      list: {
        menu: "Transaktionen",
        title: "Transaktionen",
      },
      create: {
        success: "Transaktion erfolgreich gesendet",
      },
      update: {
        success: "Transaktion erfolgreich gespeichert",
      },
      destroy: {
        success: "Transaktion erfolgreich gelöscht",
      },
      destroyAll: {
        success: "Transaktion(en) erfolgreich gelöscht",
      },
      edit: {
        title: "Transaktion bearbeiten",
      },
      fields: {
        id: "Id",
        amountRange: "Betrag",
        amount: "Betrag",
        email: "E-Mail",
        tax: "Steuer",
        currencySign: "Währungssymbol",
        currencyValue: "Währungswert",
        orderId: "Bestell-ID",
        createdAt: "Erstellt am",
        updatedAt: "Aktualisiert am",
        createdAtRange: "Erstellt am",
      },
      enumerators: {
        status: {
          pending: "Ausstehend",
          completed: "Erfolg",
          canceled: "Storniert",
        },
      },
      placeholders: {},
      hints: {},
      new: {
        title: "Neue Transaktion",
      },
      view: {
        title: "Transaktion anzeigen",
      },
      importer: {
        title: "Transaktionen importieren",
        fileName: "transaktion_import_vorlage",
        hint: "Datei-/Bildspalten müssen die URLs der Dateien sein, getrennt durch Leerzeichen.",
      },
    },

    order: {
      name: "bestellung",
      label: "Bestellungen",
      menu: "Bestellungen",
      exporterFileName: "bestellung_export",
      list: {
        menu: "Bestellungen",
        title: "Bestellungen",
      },
      create: {
        success: "Bestellung erfolgreich gespeichert",
      },
      update: {
        success: "Bestellung erfolgreich gespeichert",
      },
      destroy: {
        success: "Bestellung erfolgreich gelöscht",
      },
      destroyAll: {
        success: "Bestellung(en) erfolgreich gelöscht",
      },
      edit: {
        title: "Bestellung bearbeiten",
      },
      fields: {
        id: "Id",
        userId: "Benutzer",
        cart: "Warenkorb",
        shipping: "Versand",
        discountRange: "Rabatt",
        discount: "Rabatt",
        paymentMethod: "Zahlungsmethode",
        taxe: "Steuer",
        transactionNumber: "Transaktionsnummer",
        orderStatus: "Bestellstatus",
        createdAt: "Erstellt am",
        updatedAt: "Aktualisiert am",
        createdAtRange: "Erstellt am",
      },
      enumerators: {
        orderStatus: {
          pending: "Ausstehend",
          in_progress: "In Bearbeitung",
          delivered: "Geliefert",
          canceled: "Storniert",
        },
      },
      placeholders: {},
      hints: {},
      new: {
        title: "Neue Bestellung",
      },
      view: {
        title: "Bestellung anzeigen",
      },
      importer: {
        title: "Bestellungen importieren",
        fileName: "bestellung_import_vorlage",
        hint: "Datei-/Bildspalten müssen die URLs der Dateien sein, getrennt durch Leerzeichen.",
      },
    },
  },


  user: {
    fields: {
      genre: "Geschlecht",
      username: "Benutzername",
      walletName: "Wallet-Name",
      id: "ID",
      confirmPassword: "Passwort bestätigen",
      avatars: "Avatar",
      invitationcode: "Einladungscode",
      email: "E-Mail",
      emails: "E-Mail(s)",
      erc20: "ERC20-Wallet-Adresse",
      trc20: "TRC20-Wallet-Adresse",
      fullName: "Name",
      balance: "Kontostand",
      firstName: "Vorname",
      lastName: "Nachname",
      status: "Status",
      phoneNumber: "Telefonnummer",
      withdrawPassword: "Auszahlungspasswort",
      sector: "Branche",
      employer: "Arbeitgeber",
      profession: "Beruf",
      address: "Adresse",
      birthDate: "Geburtsdatum",
      maritalStatus: "Familienstand",
      facebookLink: "Facebook-Link",
      sponsor: "Sponsor",
      role: "Rolle",
      createdAt: "Erstellt am",
      updatedAt: "Aktualisiert am",
      roleUser: "Rolle/Benutzer",
      roles: "Rollen",
      createdAtRange: "Erstellt am",
      password: "Passwort",
      oldPassword: "Altes Passwort",
      newPassword: "Neues Passwort",
      newPasswordConfirmation: "Neues Passwort bestätigen",
      rememberMe: "Angemeldet bleiben",
    },
    sector: {
      AGRO_ALIMENTAIRE: "Lebensmittelindustrie",
      ASSURANCES: "Versicherung",
      AUDIOVISUEL: "Audiovisuell",
      BANCAIRE: "Bankwesen",
      CHIMIE: "Chemie",
      COMPOSANTS_AUTOMOBILES: "Automobilkomponenten",
      DISTRIBUTION: "Vertrieb",
      DISTRIBUTION_AUTOMOBILE: "Automobilvertrieb",
      DIVERS: "Verschiedenes",
      FINANCIER: "Finanzen",
      HOLDING: "Holding",
      IMMOBILIER: "Immobilien",
      INDUSTRIEL: "Industrie",
      LEASING: "Leasing",
      LOGISTIQUE_TRANSPORT: "Logistik und Transport",
      PHARMACEUTIQUE: "Pharmazeutisch",
      SANTÉ: "Gesundheit",
      TOURSIME: "Tourismus",
      INFORMATION_TECHNOLOGY: "Informationstechnologie",
    },
    maritalStatus: {
      célébataire: "Ledig",
      marié: "Verheiratet",
    },
    status: {
      active: "Aktiv",
      invited: "Eingeladen",
      "empty-permissions": "Warte auf Berechtigungen",
      inactive: "Inaktiv",
    },

    enumerators: {
      status: {
        USDT: "USDT",
        ETH: "ETH",
        BTC: "BTC",
      },
      gender: {
        male: "männlich",
        female: "weiblich",
      }
    },
    invite: "Einladen",
    validations: {
      // eslint-disable-next-line
      email: "E-Mail ${value} ist ungültig",
    },
    title: "Benutzer",
    menu: "Benutzer",
    doAddSuccess: "Benutzer erfolgreich gespeichert",
    doUpdateSuccess: "Benutzer erfolgreich gespeichert",
    exporterFileName: "benutzer_export",
    doDestroySuccess: "Benutzer erfolgreich gelöscht",
    doDestroyAllSelectedSuccess: "Benutzer erfolgreich gelöscht",
    edit: {
      title: "Benutzer bearbeiten",
    },
    new: {
      title: "Benutzer einladen",
      titleModal: "Benutzer einladen",
      emailsHint:
        "Trennen Sie mehrere E-Mail-Adressen durch Kommas.",
    },
    view: {
      title: "Benutzer anzeigen",
      activity: "Aktivität",
    },
    importer: {
      title: "Benutzer importieren",
      fileName: "benutzer_import_vorlage",
      hint: "Datei-/Bildspalten müssen die URLs der Dateien sein, getrennt durch Leerzeichen. Beziehungen müssen die IDs der referenzierten Datensätze sein, getrennt durch Leerzeichen. Rollen müssen die Rollen-IDs sein, getrennt durch Leerzeichen.",
    },
    errors: {
      userAlreadyExists: "Ein Benutzer mit dieser E-Mail existiert bereits",
      userNotFound: "Benutzer nicht gefunden",
      revokingOwnPermission: `Sie können Ihre eigene Administratorberechtigung nicht widerrufen`,
    },
  },


  buttons: {
    login: "Anmelden",
    registerNow: "Jetzt registrieren",
    signup: "Registrieren",
    start: "Start",
    orders: "Bestellungen",
    submit: "Absenden",
    backtohome: "Zurück zur Startseite",
    confirm: "Bestätigen",
    logout: "Abmelden",
    getstarted: "Loslegen",
  },


  text: {
    welcome: "Willkommen",
    discover: "Entdecken Sie exklusive Angebote nur für Sie",
    signin: "Anmelden",
    haveaccount: "Bereits ein Konto?",
    noaccount: "Noch kein Konto?",
    showingnow: "Jetzt im Kino",
    comingsoon: "Demnächst",
    termsconditions: "Allgemeine Geschäftsbedingungen",
    todayearning: "Heutiges Einkommen",
    accountbalance: "Kontostand",
    freezebalance: "Eingefrorenes Guthaben",
    sumbitInformation: "Informationen übermitteln",
    order: "Bestellung",
    pending: "Ausstehend",
    completed: "Abgeschlossen",
    canceled: "Storniert",
    notransaction: "Es gibt noch keine Transaktionen!",
    createdtime: "Erstellungszeit",
    creationtime: "Erstellungszeit",
    orderNumber: "Bestellnummer",
    orderamount: "Bestellbetrag",
    income: "Einkommen",
    buyerating: "Käuferbewertung",
    uid: "UID",
    promotioncode: "Rabattcode",
    walletamount: "Wallet-Betrag",
    creditassesment: "Kreditbewertung",
    myfinance: "Meine Finanzen",
    withdraw: "Auszahlen",
    mydetails: "Meine Daten",
    profile: "Profil",
    wallet: "Wallet",
    other: "Andere",
    customersupport: "Kundensupport",
    transaction: "Transaktion",
    taskshistory: "Aufgabenverlauf",
    security: "Sicherheit",
    sponsor: `Unsere Sicherheit hat oberste Priorität, und wir möchten sicherstellen, dass
              Sie vor potenziellen Risiken geschützt sind. Bitte beachten Sie, dass wir
              Sie niemals auffordern werden, Geld an eine unbekannte Adresse zu senden. Bevor
              Sie Zahlungen tätigen, überprüfen Sie bitte die Details bei uns.`,
  },
  errors: {
    backToHome: "Zurück zur Startseite",
    continueShopping: "Weiter einkaufen",
    title403: "Zugriff verweigert",
    title404: "Seite nicht gefunden",
    title500: "Etwas ist schiefgelaufen",
    403: "Entschuldigung, Sie haben keinen Zugriff auf diese Seite",
    404: "Entschuldigung, die von Ihnen besuchte Seite existiert nicht",
    500: "Entschuldigung, der Server meldet einen Fehler",
    429: "Zu viele Anfragen. Bitte versuchen Sie es später erneut.",
    forbidden: {
      message: "Zugriff verweigert",
    },
    validation: {
      message: "Ein Fehler ist aufgetreten",
    },
    defaultErrorMessage: "Hoppla, ein Fehler ist aufgetreten",
  },

  withdraw: {
    withdrawamount: "Auszahlungsbetrag",
    Withdrawpassword: "Auszahlungs-Passwort",
    availablebalance: "Verfügbares Guthaben",
    rules: "Regelbeschreibung",
    rule1: "Der Mindestbetrag für eine Auszahlung beträgt 20 $",
    rule2: "Die Zahlung erfolgt innerhalb von 24 Stunden nach Beantragung der Auszahlung",
    rule3: "Unvollständige tägliche Bestellungen können nicht ausgezahlt werden, alle Produkte müssen eingereicht werden"
  },
  profile: {
    profile: "Profil",
    fullname: "Vollständiger Name",
    email: "E-Mail",
    phonenumber: "Telefonnummer",
    country: "Land",
    Invitationcode: "Einladungscode"
  },
  wallet: {
    wallet: "Wallet",
    info: "Informationen zur Auszahlungsmethode",
    username: "Benutzername",
    walletname: "Wallet-Name",
    walletaddress: "Wallet-Adresse",
    note: "Hinweis",
    notedesctiption: "Bitte seien Sie vorsichtig beim Ausfüllen dieser Informationen."
  },

  cs: {
    cs: "Kundendienst",
    note: "Wenn Sie Fragen haben oder auf Probleme stoßen, senden Sie uns eine E-Mail oder chatten Sie mit unserem Online-Kundendienstteam.",
    contactnow: "Jetzt kontaktieren"
  },
  transaction: {
    transaction: "Transaktion",
    all: "Alle",
    withdraw: "Auszahlung",
    dposit: "Einzahlung",
    notransaction: "Es gibt noch keine Transaktionen!"
  },
  order: {
    order: "Bestellung",
    completed: "Abgeschlossen",
    pending: "Ausstehend",
    canceled: "Storniert",
    ordertime: "Bestellzeit",
    ordernumber: "Bestellnummer",
    total: "Gesamtbetrag der Bestellung",
    commission: "Provision",
    return: "Geschätzte Rückzahlung"
  },

  security: {
    changepassword: "Passwort ändern",
    oldpassword: "Altes Passwort",
    newpassword: "Neues Passwort",
    confirmpassword: "Passwort bestätigen",
    note: "Hinweis",
    notedesc: "Bitte füllen Sie diese Informationen sorgfältig aus"
  },





  auth: {
    tenants: "Arbeitsbereiche",
    singindesc: "Geben Sie Ihre E-Mail und Ihr Passwort ein, um sich anzumelden",
    signupdesc: "Geben Sie Ihre E-Mail und Ihr Passwort ein, um sich zu registrieren",
    profile: {
      title: "Profil",
      success: "Profil erfolgreich aktualisiert",
      vip: "Herzlichen Glückwunsch zum Abonnement",
    },
    createAnAccount: "Ein Konto erstellen",
    rememberMe: "Angemeldet bleiben",
    forgotPassword: "Passwort vergessen?",
    signin: "Anmelden",
    signup: "Registrieren",
    signout: "Abmelden",
    alreadyHaveAnAccount: "Haben Sie bereits ein Konto? Anmelden.",
    social: {
      errors: {
        "auth-invalid-provider":
          "Diese E-Mail ist bereits bei einem anderen Anbieter registriert.",
        "auth-no-email": "Die mit diesem Konto verknüpfte E-Mail ist privat oder nicht vorhanden.",
      },
    },
    signinWithAnotherAccount: "Mit einem anderen Konto anmelden",
    emailUnverified: {
      message: `Bitte bestätigen Sie Ihre E-Mail unter <strong>{0}</strong>, um fortzufahren.`,
      submit: "E-Mail-Bestätigung erneut senden",
    },
    emptyPermissions: {
      message: "Sie haben noch keine Berechtigungen. Warten Sie, bis der Administrator Ihnen Zugriffsrechte erteilt.",
    },
    passwordResetEmail: {
      message: "E-Mail zum Zurücksetzen des Passworts senden",
      error: "E-Mail nicht erkannt",
    },
    passwordReset: {
      message: "Passwort zurücksetzen",
    },
    passwordChange: {
      title: "Passwort ändern",
      success: "Passwort erfolgreich geändert",
      mustMatch: "Die Passwörter müssen übereinstimmen",
    },
    emailAddressVerificationEmail: {
      error: "E-Mail nicht erkannt",
    },
    verificationEmailSuccess: "Bestätigungs-E-Mail erfolgreich gesendet",
    passwordResetEmailSuccess: "Passwort-Reset-E-Mail erfolgreich gesendet",
    passwordResetSuccess: "Passwort erfolgreich geändert",
    verifyEmail: {
      success: "E-Mail erfolgreich bestätigt.",
      message: "Einen Moment, Ihre E-Mail wird überprüft...",
    },
  },

  tabbarmenue: {
    home: "Startseite",
    rate: "Bewerten",
    profile: "Profil"
  },

  validation: {
    mixed: {
      default: "${path} ist ungültig",
      required: "${path} ist erforderlich",
      oneOf: "${path} muss einer der folgenden Werte sein: ${values}",
      notOneOf: "${path} darf keiner der folgenden Werte sein: ${values}",
      notType: ({ path, type, value, originalValue }) => {
        return `${path} muss ein ${type} sein`;
      },
    },
    string: {
      length: "${path} muss genau ${length} Zeichen lang sein",
      min: "${path} muss mindestens ${min} Zeichen lang sein",
      max: "${path} darf höchstens ${max} Zeichen lang sein",
      matches: '${path} muss folgendem Muster entsprechen: "${regex}"',
      email: "${path} muss eine gültige E-Mail-Adresse sein",
      url: "${path} muss eine gültige URL sein",
      trim: "${path} darf keine führenden oder nachgestellten Leerzeichen enthalten",
      lowercase: "${path} muss in Kleinbuchstaben sein",
      uppercase: "${path} muss in Großbuchstaben sein",
      selected: "${path} muss ausgewählt sein",
    },
    number: {
      min: "${path} muss größer oder gleich ${min} sein",
      max: "${path} muss kleiner oder gleich ${max} sein",
      lessThan: "${path} muss kleiner als ${less} sein",
      moreThan: "${path} muss größer als ${more} sein",
      notEqual: "${path} darf nicht gleich ${notEqual} sein",
      positive: "${path} muss eine positive Zahl sein",
      negative: "${path} muss eine negative Zahl sein",
      integer: "${path} muss eine ganze Zahl sein",
    },
    date: {
      min: "${path} muss nach ${min} liegen",
      max: "${path} muss vor ${max} liegen",
    },
    boolean: {},
    object: {
      noUnknown:
        "${path} darf keine nicht definierten Schlüssel enthalten",
    },
    array: {
      min: ({ min, path }) =>
        min === 1
          ? `${path} ist erforderlich`
          : `${path} muss mindestens ${min} Elemente enthalten`,
      max: "${path} darf höchstens ${max} Elemente enthalten",
    },
  },
  /* eslint-disable */
  fileUploader: {
    upload: "Hochladen",
    image: "Sie müssen ein Bild hochladen",
    size: "Die Datei ist zu groß. Die maximal erlaubte Größe beträgt {0}",
    formats: `Ungültiges Format. Muss eines der folgenden sein: {0}.`,
  },

  estore: {
    auth: {
      login: {
        title: "Anmelden",
        tagline: "Mehr einkaufen, besser leben",
        phoneOrEmail: "Telefonnummer / E-Mail",
        phoneOrEmailPlaceholder: "Telefonnummer / E-Mail",
        password: "Passwort eingeben",
        passwordPlaceholder: "Passwort",
        forgotPassword: "Passwort vergessen",
        noAccount: "Kein Konto?",
        signUp: "Registrieren",
        loginButton: "Anmelden",
      },
    },
    header: {
      home: "Startseite",
      searchPlaceholder: "Produkte, Marken und Kategorien suchen...",
      search: "Suchen",
      cart: "Warenkorb",
      loginRegister: "Anmelden / Registrieren",
      myAccount: "Mein Konto",
      myOrders: "Meine Bestellungen",
      signOut: "Abmelden",
      allCategories: "Alle Kategorien",
      account: "Konto",
    },
    categories: {
      "Women Clothing": "Damenbekleidung",
      "Women Shoes": "Damenschuhe",
      "Women Bags": "Damentaschen",
      "Accessories": "Accessoires",
      "Lifestyle": "Lifestyle",
      "Global Purchase": "Globaler Einkauf",
      "Girls": "Mädchen",
      "Boys": "Jungen",
      "Men Clothing": "Herrenbekleidung",
      "Men Shoes": "Herrenschuhe",
      "Men Bags": "Herrentaschen",
    },
    pc: {
      common: {
        saving: "Wird gespeichert...",
        confirm: "Bestätigen",
        save: "Speichern",
        cancel: "Abbrechen",
        loading: "Wird geladen...",
        edit: "Bearbeiten",
        delete: "Löschen",
        submit: "Absenden",
        update: "Aktualisieren",
      },
      records: {
        transactions: "Transaktionen",
        processing: "In Bearbeitung",
        completed: "Abgeschlossen",
        canceled: "Storniert",
        id: "ID",
        time: "Zeit",
        viewProof: "Beleg ansehen",
      },
      messages: {
        title: "Nachrichten",
        markAllRead: "Alle als gelesen markieren",
        loading: "Wird geladen...",
        empty: "Noch keine Nachrichten.",
        today: "Heute",
        earlier: "Früher",
        amount: "Betrag",
        depositSuccess: "Einzahlung erfolgreich",
        depositCanceled: "Einzahlung storniert",
        withdrawSuccess: "Auszahlung erfolgreich",
        withdrawCanceled: "Auszahlung storniert",
        systemNotice: "Systemmitteilung",
        alert: "Warnung",
        notification: "Benachrichtigung",
      },
      withdrawal: {
        deductedFromBalance: "Vom Guthaben abgezogen",
      },
      myAccount: {
        title: "Mein Konto",
        storeId: "Shop-ID",
        id: "ID",
        copied: "Kopiert",
        copy: "Kopieren",
        idCopied: "{0} in die Zwischenablage kopiert",
        username: "Benutzername",
        phoneNumber: "Telefonnummer",
        notBound: "Nicht verknüpft",
        email: "E-Mail",
        loginPassword: "Anmeldepasswort",
        change: "Ändern",
        changeLoginPassword: "Anmeldepasswort ändern",
        currentPassword: "Aktuelles Passwort",
        currentPasswordPlaceholder: "Geben Sie Ihr aktuelles Passwort ein",
        newPassword: "Neues Passwort",
        newPasswordPlaceholder: "Mindestens 6 Zeichen",
        confirmNewPassword: "Neues Passwort bestätigen",
        confirmNewPasswordPlaceholder: "Neues Passwort erneut eingeben",
        cancel: "Abbrechen",
        saveChanges: "Änderungen speichern",
        securityHint: "Halten Sie Ihr Konto sicher — geben Sie Ihr Passwort oder Verifizierungscodes niemals an andere weiter.",
      },
      applyMerchant: {
        loading: "Wird geladen...",
        idCard: "Ausweis",
        submitting: "Wird gesendet...",
      },
      wholesale: {
        title: "Großhandelsverwaltung",
        all: "Alle",
        lowestPrice: "Niedrigster Preis",
        highestPrice: "Höchster Preis",
        filter: "Filtern",
        loadingItems: "Artikel werden geladen…",
        showing: "Zeige",
        of: "von",
        item: "Artikel",
        items: "Artikel",
        inCategory: "in {0}",
        emptyTitle: "Keine Produkte entsprechen diesem Filter",
        emptyText: "Versuchen Sie eine andere Kategorie oder Preisspanne.",
        added: "Hinzugefügt",
        add: "Hinzufügen",
        loadingMore: "Wird geladen…",
        reachedEnd: "Sie haben das Ende erreicht.",
        salesPrice: "Verkaufspreis",
        wholesalePrice: "Großhandelspreis",
        cancel: "Abbrechen",
        confirming: "Wird bestätigt…",
        confirmListing: "Angebot bestätigen",
        alreadyListed: "Bereits zu Ihren Großhandelsangeboten hinzugefügt.",
        addedToListings: '"{0}" zu Ihren Großhandelsangeboten hinzugefügt.',
      },
      sellerSetup: {
        title: "Einrichtung",
        loading: "Shop-Einstellungen werden geladen…",
        noStoreTitle: "Für dieses Konto wurde kein Shop gefunden",
        noStoreText: "Bewerben Sie sich als Verkäufer, um die Shop-Einstellungen zu verwalten.",
        storeInformation: "Shop-Informationen",
        storeInfoSub: "Aktualisieren Sie Ihre Shop-Details und Geschäftsinformationen.",
        storeLogo: "Shop-Logo",
        uploadLogoSub: "Laden Sie ein Logo für Ihren Shop hoch",
        store: "Shop",
        uploading: "Wird hochgeladen…",
        uploadLogo: "Logo hochladen",
        storeName: "Shop-Name *",
        storeNamePlaceholder: "Name Ihres Shops",
        storeNameRequired: "Der Shop-Name ist erforderlich.",
        storeDescription: "Shop-Beschreibung",
        storeDescriptionPlaceholder: "Beschreiben Sie Ihren Shop...",
        businessEmail: "Geschäfts-E-Mail *",
        businessPhone: "Geschäftstelefon",
        businessPhonePlaceholder: "Telefonnummer",
        saving: "Wird gespeichert…",
        saveChanges: "Änderungen speichern",
        storeBanner: "Shop-Banner",
        storeBannerSub: "Wird oben auf Ihrer Shop-Seite angezeigt.",
        noBanner: "Kein Banner hochgeladen",
        uploadBanner: "Banner hochladen",
      },
      productManagement: {
        title: "Produktverwaltung",
        addProduct: "+ Produkt hinzufügen",
        searchPlaceholder: "Produkte suchen...",
        loadingProducts: "Ihre Produkte werden geladen…",
        showing: "Zeige",
        of: "von",
        products: "Produkte",
        emptyTitle: "Noch keine Produkte gelistet",
        emptyText: "Fügen Sie Produkte über die Großhandelsverwaltung hinzu, um sie hier zu sehen.",
        goToWholesale: "Zur Großhandelsverwaltung",
        noMatchesTitle: "Keine Treffer",
        noMatchesText: "Keine Produkte entsprechen",
        wholesale: "Großhandel",
        sales: "Verkauf",
      },
      sellerOrders: {
        title: "Shop-Bestellungen",
        lumpSum: "Pauschalbetrag",
        salesProfit: "Verkaufsgewinn",
        wholesalePrice: "Großhandelspreis",
        actualPayment: "Tatsächliche Zahlung",
        processing: "Wird bearbeitet…",
        goToShipment: "Zum Versand",
        profitCredited: "Gewinn gutgeschrieben",
        refunded: "Erstattet",
        awaitingReview: "Warten auf Prüfung",
        paid: "Bezahlt",
        waitingForDelivery: "Wartet auf Lieferung",
        waitingForReceipt: "Wartet auf Empfang",
        completed: "Abgeschlossen",
        refundAfterSales: "Erstattung / Kundendienst",
        emptyTitle: "Hier ist noch nichts",
        emptyText: "Bestellungen in dieser Phase werden hier angezeigt.",
      },
      sellerHub: {
        loadingShop: "Ihr Shop wird geladen...",
        storeFrozen: "Shop gesperrt",
        frozenText: "Ihr Verkäuferkonto wurde vorübergehend gesperrt, weil eine Bestellung zu lange auf die Lieferung wartete. Sie können erst wieder auf das Verkäufer-Dashboard zugreifen, wenn dies behoben ist.",
        contactSupport: "Kundenservice kontaktieren",
        backToBuyer: "Zurück zum Käuferkonto",
        accountBalance: "Kontostand",
        viewShop: "Shop ansehen",
        orderFulfillment: "Auftragsabwicklung",
        waitingForDelivery: "Wartet auf Lieferung",
        waitingForReceipt: "Wartet auf Empfang",
        completed: "Abgeschlossen",
        refundAfterSales: "Erstattung / Kundendienst",
        quickActions: "Schnellaktionen",
        topUp: "Aufladen",
        withdrawal: "Auszahlung",
        wholesaleCatalog: "Großhandelskatalog",
        manageProducts: "Produkte verwalten",
      },
      shopDetails: {
        title: "Shop-Details",
        loading: "Shop-Details werden geladen…",
        noStoreTitle: "Sie haben noch keinen Shop",
        noStoreText: "Bewerben Sie sich als Verkäufer, um Ihre Shop-Details hier zu sehen.",
        applyNow: "Jetzt bewerben",
        accountBalance: "Kontostand",
        storeHealth: "Shop-Zustand",
        creditScore: "Kredit-Score",
        followers: "Follower",
        todaysOrders: "Heutige Bestellungen",
        cumulativeOrderQty: "Kumulierte Bestellmenge",
        salesPerformance: "Verkaufsleistung",
        todaysSales: "Heutiger Umsatz",
        totalSales: "Gesamtumsatz",
        todaysProfit: "Heutiger Gewinn",
        totalProfit: "Gesamtgewinn",
      },
      mineSeller: {
        menu: {
          dashboard: "Dashboard",
          wholesale: "Großhandelsverwaltung",
          shopDetails: "Shop-Details",
          products: "Produktverwaltung",
          orders: "Bestellungen",
          billing: "Abrechnungsverlauf",
          addresses: "Lieferadressen",
          support: "Service-Center",
          loginPassword: "Anmeldepasswort",
          paymentPassword: "Zahlungspasswort",
          settings: "Einrichtung",
        },
        myStore: "Mein Shop",
        seller: "Verkäufer",
        switchToBuyer: "Zum Käuferkonto wechseln",
        logOut: "Abmelden",
      },
      mineHub: {
        storeFrozen: "Shop gesperrt",
        storeFrozenSub: "Ihr Verkäuferkonto wurde vorübergehend gesperrt.",
        contactSupport: "Kundenservice kontaktieren",
        storeApproved: "Shop-Antrag genehmigt!",
        storeApprovedSub: "Ihr Verkäuferkonto ist aktiv.",
        goToSellerDashboard: "Zum Verkäufer-Dashboard",
        accountBalance: "Kontostand",
        myAccount: "Mein Konto",
        myStuff: "Meine Sachen",
        myCollection: "Meine Sammlung",
        myBrowse: "Zuletzt angesehen",
        myOrders: "Meine Bestellungen",
        viewAll: "Alle anzeigen",
        paymentPending: "Zahlung ausstehend",
        inShipping: "Im Versand",
        received: "Erhalten",
        completed: "Abgeschlossen",
        refund: "Erstattung",
        quickActions: "Schnellaktionen",
        topUp: "Aufladen",
        withdrawal: "Auszahlung",
        sellerDashboard: "Verkäufer-Dashboard",
        applyMerchant: "Verkäufer werden",
      },
      addresses: {
        title: "Lieferadressen",
        addAddress: "+ Adresse hinzufügen",
        editAddress: "Adresse bearbeiten",
        addNewAddress: "Neue Adresse hinzufügen",
        address: "Adresse",
        addressPlaceholder: "Straße, Stadt, Bundesland, PLZ",
        contactName: "Kontaktname",
        contactNamePlaceholder: "Name des Empfängers",
        contactNumber: "Kontaktnummer",
        contactNumberPlaceholder: "Telefonnummer",
        cancel: "Abbrechen",
        saving: "Wird gespeichert...",
        saveAddress: "Adresse speichern",
        emptyTitle: "Keine gespeicherten Adressen",
        emptyText: "Fügen Sie eine Lieferadresse hinzu, um den Checkout zu beschleunigen.",
        deleteConfirm: "Diese Adresse löschen?",
        yesDelete: "Ja, löschen",
        edit: "Bearbeiten",
        delete: "Löschen",
      },
      settings: {
        title: "Einrichtung",
        publicProfile: "Öffentliches Profil",
        publicProfileSub: "Diese Informationen werden in Ihren Bewertungen und Ihrem Profil angezeigt.",
        uploading: "Wird hochgeladen…",
        changeAvatar: "Avatar ändern",
        displayName: "Anzeigename",
        displayNamePlaceholder: "Ihr Anzeigename",
        displayNameRequired: "Der Anzeigename ist erforderlich.",
        emailAddress: "E-Mail-Adresse",
        emailHint: "Kontaktieren Sie den Support, um Ihre E-Mail-Adresse zu ändern.",
        saving: "Wird gespeichert…",
        saveChanges: "Änderungen speichern",
        accountStats: "Kontostatistiken",
        orders: "Bestellungen",
        reviews: "Bewertungen",
        wishlist: "Wunschliste",
        joined: "Beigetreten",
      },
      myOrders: {
        title: "Meine Bestellungen",
        emptyTitle: "Noch keine Bestellungen",
        emptyText: "Von Ihnen aufgegebene Bestellungen werden hier angezeigt.",
        startShopping: "Jetzt einkaufen",
        order: "Bestellung",
        total: "Gesamt",
        statusPending: "Ausstehend",
        statusConfirmed: "Bestätigt",
        statusShipped: "Versandt",
        statusDelivered: "Zugestellt",
        statusCancelled: "Storniert",
      },
      balance: {
        title: "Guthaben",
        totalBalance: "Gesamtguthaben",
        accountBalance: "Kontostand",
        availableBalance: "Verfügbares Guthaben",
        deposit: "Einzahlung",
        withdraw: "Auszahlen",
        hint: "Das verfügbare Guthaben kann für Einkäufe verwendet oder auf Ihre verknüpfte Wallet ausgezahlt werden.",
      },
      depositRecord: {
        title: "Einzahlungsverlauf",
        totalDeposited: "Gesamt eingezahlt",
      },
      withdrawalRecord: {
        title: "Auszahlungsverlauf",
        totalWithdrawn: "Gesamt ausgezahlt",
      },
      paymentPassword: {
        title: "Zahlungspasswort",
        oldPlaceholder: "Geben Sie Ihr aktuelles Transaktionspasswort ein",
        newPlaceholder: "Geben Sie Ihr neues Transaktionspasswort ein",
        confirmPlaceholder: "Bestätigen Sie Ihr neues Transaktionspasswort",
        hint: "Ihr Transaktionspasswort wird verwendet, um Auszahlungen und andere sensible Kontoänderungen zu bestätigen. Bewahren Sie es sicher auf und teilen Sie es niemals mit anderen.",
      },
      login: {
        brandTitle: "Mehr einkaufen, besser leben",
        brandSubtitle: "Tausende Produkte, unschlagbare Preise, direkt zu Ihnen nach Hause geliefert.",
        title: "Willkommen zurück",
        subtitle: "Melden Sie sich an, um weiter einzukaufen",
        password: "Passwort",
        forgotPassword: "Passwort vergessen?",
      },
      register: {
        brandTitle: "Werden Sie noch heute Teil von Estore",
        brandSubtitle: "Erstellen Sie ein Konto, um Bestellungen zu verfolgen, Adressen zu speichern und schneller zur Kasse zu gehen.",
        title: "Konto erstellen",
        subtitle: "Werden Sie Teil von Estore und kaufen Sie smarter ein",
        email: "E-Mail",
        emailPlaceholder: "Geben Sie Ihre E-Mail ein",
        getOtp: "OTP anfordern",
        otp: "Bestätigungscode",
        otpPlaceholder: "Geben Sie den an Ihre E-Mail gesendeten Code ein",
        phoneNumber: "Telefonnummer",
        phoneNumberPlaceholder: "Telefonnummer",
        password: "Passwort",
        passwordPlaceholder: "Passwort erstellen",
        confirmPassword: "Passwort bestätigen",
        confirmPasswordPlaceholder: "Passwort erneut eingeben",
        registerButton: "Registrieren",
        haveAccount: "Bereits ein Konto?",
        logIn: "Anmelden",
      },
      checkout: {
        loading: "Wird geladen...",
        qty: "Menge",
      },
      mine: {
        myBrowse: {
          title: "Zuletzt angesehen",
          emptyTitle: "Noch kein Browserverlauf",
          emptyText: "Von Ihnen angesehene Produkte werden hier angezeigt, damit Sie dort weitermachen können, wo Sie aufgehört haben.",
          startShopping: "Jetzt einkaufen",
        },
        myCollection: {
          title: "Meine Sammlung",
          emptyTitle: "Noch keine gespeicherten Artikel",
          emptyText: "Von Ihnen gespeicherte Produkte werden hier angezeigt, damit Sie sie schnell wiederfinden.",
          browseProducts: "Produkte durchsuchen",
        },
        support: {
          title: "Live-Chat",
          emptyTitle: "Unser Support-Team meldet sich in Kürze bei Ihnen",
          emptyText: "Starten Sie ein Gespräch, wir antworten so schnell wie möglich.",
        },
        menu: {
          account: "Mein Konto",
          balance: "Guthaben",
          orders: "Meine Bestellungen",
          deposit: "Einzahlung",
          depositRecord: "Einzahlungsverlauf",
          withdrawal: "Auszahlung",
          withdrawalRecord: "Auszahlungsverlauf",
          paymentPassword: "Zahlungspasswort",
          addresses: "Lieferadressen",
          collection: "Meine Sammlung",
          browse: "Zuletzt angesehen",
          messages: "Nachrichten",
          settings: "Einrichtung",
          support: "Live-Chat",
        },
        goToSellerDashboard: "Zum Verkäufer-Dashboard",
        applyMerchant: "Verkäufer werden",
        logOut: "Abmelden",
      },
      cart: {
        title: "Mein Warenkorb",
        empty: "Ihr Warenkorb ist leer.",
        continueShopping: "Weiter einkaufen",
        product: "Produkt",
        price: "Preis",
        quantity: "Menge",
        subtotal: "Zwischensumme",
        remove: "Entfernen",
        orderSummary: "Bestellübersicht",
        items: "Artikel",
        shipping: "Versand",
        calculatedAtCheckout: "Wird beim Checkout berechnet",
        total: "Gesamt",
        proceedToCheckout: "Zur Kasse",
        continueShoppingArrow: "← Weiter einkaufen",
      },
      productDetails: {
        notFound: "Produkt nicht gefunden.",
        noImage: "Kein Bild",
        description: "Beschreibung",
        quantity: "Menge",
        addToCart: "In den Warenkorb",
        buyNow: "Jetzt kaufen",
      },
      classification: {
        searchPlaceholder: "In Kategorien suchen",
        categories: "Kategorien",
        loading: "Wird geladen...",
        noCategories: "Keine Kategorien",
        category: "Kategorie",
        noProducts: "Keine Produkte in dieser Kategorie gefunden.",
        loadingMore: "Wird geladen...",
        reachedEnd: "Sie haben das Ende erreicht.",
      },
      home: {
        allCategories: "Alle Kategorien",
        loading: "Wird geladen...",
        noCategories: "Noch keine Kategorien.",
        browseAll: "Alle Kategorien durchsuchen",
        aboutSection: "Über E-store Fashion",
        aboutUs: "Über uns",
        joinUs: "Werde Teil von uns",
        contactUs: "Kontaktieren Sie uns",
        exchangeCooperation: "Austausch und Kooperation",
        merchantAgreement: "Verkäufervereinbarung",
        supplierCooperation: "Lieferantenkooperation",
        strategicManagementHeading: "Strategisches Management",
        strategicManagement: "Strategisches Management",
        precisionOperation: "Präzisionsbetrieb",
        courseDriven: "Kursgesteuert",
        faq: "FAQ",
        downloadApp: "App herunterladen",
        globalPurchase: "Globaler Einkauf",
        heroWelcomeBack: "Willkommen zurück",
        heroWelcomeGuest: "Willkommen, Wunderschöne",
        heroGreeting: "Hallo, {0} 👋",
        heroDefaultTitle: "Für jede Frau stilvoll",
        heroSlide1Text: "Ausgewählte Kleider, Schuhe und Accessoires für Frauen, die gerne glänzen.",
        heroSlide1Cta: "Damenmode entdecken",
        heroSlide2Eyebrow: "Begrenzte Zeit",
        heroSlide2Title: "Bis zu 50% Rabatt auf Damenmode",
        heroSlide2Text: "Erneuern Sie Ihre Garderobe mit den Must-haves der Saison.",
        heroSlide2Cta: "Zum Sale",
        heroSlide3Eyebrow: "Neuheiten",
        heroSlide3Title: "Schmuck, den Sie lieben werden",
        heroSlide3Text: "Von zarten Ketten bis zu auffälligen Taschen — vollenden Sie jeden Look mit Stil.",
        heroSlide3Cta: "Accessoires entdecken",
        heroSlide4Eyebrow: "Nur diese Woche",
        heroSlide4Title: "Kostenloser Versand ab 50$ Bestellwert",
        heroSlide4Text: "Kein Code nötig — der Rabatt wird automatisch an der Kasse angewendet.",
        heroSlide4Cta: "Jetzt einkaufen",
        trustShippingTitle: "Kostenloser Versand",
        trustShippingText: "Bei Bestellungen über 50$",
        trustReturnsTitle: "Einfache Rückgabe",
        trustReturnsText: "30 Tage Rückgabefrist",
        trustCheckoutTitle: "Sichere Kasse",
        trustCheckoutText: "Ihre Daten bleiben geschützt",
        trustSupportTitle: "24/7 Support",
        trustSupportText: "Wir sind da, wann immer Sie uns brauchen",
        flashDeals: "Blitzangebote",
        limitedTime: "Begrenzte Zeit",
        justForYou: "Nur für Sie",
        seeAll: "Alle ansehen",
        noMoreProducts: "Derzeit keine weiteren Produkte anzuzeigen.",
        add: "Hinzufügen",
        previousSlide: "Vorherige Folie",
        nextSlide: "Nächste Folie",
        close: "Schließen",
        infoEmpty: "Dieser Inhalt wurde noch nicht hinzugefügt. Bitte schauen Sie bald wieder vorbei.",
      },
      footer: {
        blurb: "Alles, was Sie brauchen, direkt vor Ihre Tür geliefert.",
        shopHeading: "Shop",
        accountHeading: "Konto",
        supportHeading: "Support",
        helpCenter: "Hilfe-Center",
        shipping: "Versand & Lieferung",
        returns: "Rückgaben",
        deliveryAddresses: "Lieferadressen",
        login: "Anmelden",
        createAccount: "Konto erstellen",
        rights: "© {0} Estore. Alle Rechte vorbehalten.",
      },
    },
  },

};

export default de;
