import Withdraw from "src/view/pages/withdraw/Withdraw";

const fr = {
  app: {
    title: "Zalando"
  },
  
  pages: {
    home: {
      levels: "Niveaux VIP",
      chooseLevel: "Choisissez votre niveau pour maximiser vos gains",
      welcome: "Bienvenue",
      announcement: "Chers utilisateurs, la plateforme E-clicks Digital est de retour au meilleur et normal, continuez à gagner autant que possible depuis la plateforme",

      // Action Buttons
      services: "Services",
      events: "Événements",
      about: "À propos",
      terms: "CG",
      certificate: "Certificat",
      faqs: "FAQ",

      // VIP Level Cards
      currentLevel: "Actuel",
      upgrade: "Mettre à niveau",
      profitNormal: "de profit sur les produits normaux",
      profitPremium: "de profit sur les produits premium",
      maxOrders: "Commandes max par jour",

      // Modal
      modal: {
        levelDetails: "Détails du niveau",
        levelLimit: "Limite de niveau",
        dailyOrders: "Commandes quotidiennes",
        commissionRate: "Taux de commission",
        cancel: "Annuler",
        upgradeNow: "Mettre à niveau maintenant"
      }
    },

tabBottomNavigator: {
    home: "Accueil",
    grap: "Saisir",
    records: "Enregistrements",
    starting: "Démarrer"
  },
    transaction: {
      title: "Historique des Transactions",
      filters: {
        all: "Toutes",
        withdraw: "Retrait",
        deposit: "Dépôt"
      },
      recentTransactions: "Transactions Récentes",
      transactionCount: "{0} transactions",
      types: {
        deposit: "Dépôt",
        withdrawal: "Retrait"
      },
      status: {
        completed: "Terminé",
        processing: "En traitement",
        canceled: "Annulé"
      },
      amount: {
        deposit: "+${0}",
        withdraw: "-${0}",
        canceled: "${0}"
      }
    },


    profile: {
      title: "Profil",
      invitationCode: "Code d'invitation",
      creditScore: "Score de crédit",
      balance: "Solde",
      todayProfit: "Profit du jour",
      frozenAmount: "Montant gelé",
      usd: "USD",

      // Menu Sections
      myFinancial: "Mes finances",
      myDetails: "Mes détails",
      other: "Autre",

      // Financial Items
      recharge: "Recharger",
      withdraw: "Retirer",

      // Details Items
      contactUs: "Nous contacter",
      profile: "Profil",
      updateWithdrawal: "Mettre à jour les détails de retrait",

      // Other Items
      transaction: "Transaction",
      tasksHistory: "Historique des tâches",
      security: "Sécurité",
      notifications: "Notifications",
      languages: "Langues",

      // Buttons
      logout: "Déconnexion",
      confirm: "Confirmer",
      copied: "Copié",

      // Modals
      rechargeModal: {
        title: "Rechargement",
        text: "Veuillez contacter le service client pour recharger"
      },
      withdrawModal: {
        title: "Retrait",
        text: "Veuillez contacter le service client pour procéder à votre retrait."
      }
    },

    team: {
      title: "Profil",
      personalInformation: "Informations personnelles",
      accountDetails: "Vos détails de compte et informations personnelles",

      // Info Items
      fullName: "Nom complet",
      email: "Email",
      phoneNumber: "Numéro de téléphone",
      country: "Pays",
      gender: "Genre",
      invitationCode: "Code d'invitation",

      // Gender Values
      genderNotSpecified: "Non spécifié",

      // Placeholders
      notAvailable: "—"
    },

    language: {
      title: "Langue de l'application",
      selectLanguage: "Sélectionner la langue",
      choosePreferred: "Choisissez votre langue préférée",
      searchPlaceholder: "Rechercher des langues...",
      currentLanguage: "Langue actuelle",

      // Language names (if needed for dynamic content)
      languages: {
        english: "Anglais",
        french: "Français",
        russian: "Russe",
        german: "Allemand",
        spanish: "Espagnol"
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
      title: "Service client",
      description: "Si vous avez des questions ou rencontrez des problèmes, veuillez nous envoyer un email ou discuter avec notre équipe de support client en ligne.",
      contactWhatsApp: "Contacter sur WhatsApp",
      contactTelegram: "Contacter sur Telegram"
    },

    notifications: {
      title: "Notifications",
      filters: {
        all: "Toutes",
        deposit: "Dépôt",
        withdraw: "Retrait"
      },
      unreadCount: "{0} non lues",
      emptyState: {
        title: "Aucune notification trouvée",
        description: "Vous n'avez pas encore de notifications {0}."
      },

      // Notification Types
      types: {
        deposit_success: "Dépôt réussi",
        deposit_canceled: "Dépôt annulé",
        withdraw_success: "Retrait réussi",
        withdraw_canceled: "Retrait annulé",
        system: "Notification système",
        alert: "Alerte importante",
        default: "Notification"
      },

      // Notification Messages
      messages: {
        deposit_success: "Votre dépôt de ${0} a été complété avec succès.",
        deposit_canceled: "Votre demande de dépôt de ${0} a été annulée.",
        withdraw_success: "Votre retrait de ${0} a été complété avec succès.",
        withdraw_canceled: "Votre demande de retrait de ${0} a été annulée.",
        system: "Notification système",
        alert: "Notification d'alerte importante",
        default: "Mise à jour de notification"
      },

      // Status
      status: {
        unread: "non lue",
        read: "lue"
      }
    },

    portfolio: {
      // Status Tabs
      completed: "Terminées",
      pending: "En attente",
      canceled: "Annulées",

      // Order Information
      orderTime: "Heure de commande",
      orderNumber: "Numéro de commande",
      totalOrderAmount: "Montant total de la commande",
      commission: "Commission",
      estimatedReturn: "Retour estimé",

      // Product Details
      quantity: "X 1",
      currency: "USD",

      // Status Labels
      status: {
        completed: "Terminée",
        pending: "En attente",
        canceled: "Annulée"
      }
    },

    changePassword: {
      title: "Changer le mot de passe",
      header: "Changer le mot de passe",
      oldPassword: "Ancien mot de passe",
      newPassword: "Nouveau mot de passe",
      confirmPassword: "Confirmer le mot de passe",
      submit: "Soumettre",
      note: "Veuillez remplir ces informations soigneusement",
      requiredField: "*"
    },

    withdraw: {
      title: "Retrait",
      withdrawAmount: "Montant du retrait",
      withdrawPassword: "Mot de passe de retrait",
      availableBalance: "Solde disponible",
      confirm: "Confirmer",
      rulesDescription: "Description des règles",
      rules: {
        minimum: "(1) Le retrait minimum est de 100 USD",
        paymentTime: "(2) Le paiement sera effectué dans l'heure suivante, après l'approbation de la demande de retrait.",
        orderCompletion: "(3) La soumission incomplète des commandes quotidiennes est soumise à aucun retrait, tous les produits doivent être soumis pour le retrait"
      }
    },

    checkout: {
      title: "Paiement",
      sectionAddress: "Adresse de livraison",
      noAddress: "Vous n'avez pas encore d'adresse de livraison enregistrée",
      addAddress: "+ Ajouter une adresse de livraison",
      changeAddress: "Modifier",
      selectAddressTitle: "Sélectionner l'adresse de livraison",
      sectionPayment: "Mode de paiement",
      codLabel: "Paiement à la livraison",
      codDescription: "Payez en espèces directement au livreur à la réception de votre commande.",
      sectionSummary: "Récapitulatif de la commande",
      itemsCount: "{0} article(s)",
      subtotal: "Sous-total",
      deliveryFee: "Frais de livraison",
      free: "Gratuit",
      total: "Total",
      placeOrder: "Passer la commande",
      placingOrder: "Commande en cours...",
      missingAddress: "Veuillez sélectionner une adresse de livraison",
      emptyCart: "Votre panier est vide",
      successTitle: "Commande passée !",
      successMessage: "Votre commande a été passée avec succès. Payez en espèces à la livraison.",
      orderNumber: "Numéro de commande",
      totalToPay: "Total à payer à la livraison",
      backToHome: "Retour à l'accueil",
      done: "Terminé",
    },

    applyMerchant: {
      title: "Postuler pour une boutique",
      intro: "Renseignez les informations de votre boutique ci-dessous pour devenir vendeur.",
      storePhoto: "Photo de la boutique",
      storeName: "Nom de la boutique",
      storeNamePlaceholder: "Veuillez saisir le nom de la boutique",
      contact: "Contact",
      contactPlaceholder: "Veuillez saisir un contact ou un numéro de téléphone",
      idNumber: "Numéro de pièce d'identité",
      idNumberPlaceholder: "Veuillez saisir votre numéro de pièce d'identité",
      invitationCode: "Code d'invitation",
      invitationCodePlaceholder: "Veuillez saisir votre code d'invitation",
      mainBusiness: "Activité principale",
      mainBusinessPlaceholder: "Sélectionnez l'activité principale",
      idCardFront: "Photo recto de la pièce d'identité",
      idCardBack: "Photo verso de la pièce d'identité",
      address: "Adresse détaillée",
      addressPlaceholder: "Veuillez saisir l'adresse détaillée",
      submit: "Soumettre la demande",
      submitSuccess: "Votre demande de boutique a été soumise et est en attente d'examen.",
      missingStoreName: "Veuillez saisir le nom de la boutique",
      missingMainBusiness: "Veuillez sélectionner l'activité principale",
      missingAddress: "Veuillez saisir l'adresse détaillée",
      missingStorePhoto: "Veuillez téléverser une photo de votre boutique",
      missingIdCardFront: "Veuillez téléverser la photo recto de votre pièce d'identité",
      missingIdCardBack: "Veuillez téléverser la photo verso de votre pièce d'identité",
      editAndResubmit: "Modifier et resoumettre",
      goToDashboard: "Accéder au tableau de bord vendeur",
      status: {
        pendingTitle: "Demande en cours d'examen",
        pendingText: "Votre demande de boutique est en cours d'examen. Nous vous informerons dès qu'elle sera approuvée.",
        successTitle: "Boutique approuvée",
        successText: "Votre boutique a été approuvée. Accédez à votre tableau de bord vendeur pour la gérer.",
        rejectedTitle: "Demande rejetée",
        rejectedText: "Votre demande précédente n'a pas été approuvée. Vous pouvez revoir les détails ci-dessous et la soumettre à nouveau.",
      },
      enumerators: {
        mainBusiness: {
          fashion_clothing: "Mode et vêtements",
          electronics: "Électronique",
          beauty_cosmetics: "Beauté et cosmétiques",
          home_living: "Maison et art de vivre",
          sports_outdoors: "Sport et plein air",
          toys_hobbies: "Jouets et loisirs",
          food_beverages: "Alimentation et boissons",
          all: "Tout",
        },
      },
    },

    deliveryAddress: {
      title: "Adresse de livraison",
      noAddresses: "Aucune adresse trouvée",
      addAddress: "Ajouter une adresse",
      modalTitle: "Ajouter une adresse de livraison",
      editModalTitle: "Modifier l'adresse de livraison",
      addressLabel: "Adresse de livraison",
      addressPlaceholder: "Veuillez saisir l'adresse détaillée",
      contactNumberLabel: "Numéro de contact",
      contactNumberPlaceholder: "Veuillez saisir votre numéro de contact",
      contactLabel: "Contact",
      contactPlaceholder: "Veuillez saisir un contact",
      submit: "Ajouter une adresse",
      saveChanges: "Enregistrer les modifications",
      createSuccess: "Adresse de livraison ajoutée avec succès",
      updateSuccess: "Adresse de livraison mise à jour avec succès",
      destroySuccess: "Adresse de livraison supprimée avec succès",
      missingAddress: "Veuillez saisir l'adresse détaillée",
      missingContactNumber: "Veuillez saisir votre numéro de contact",
      missingContact: "Veuillez saisir un contact",
      confirmDeleteTitle: "Supprimer cette adresse ?",
      confirmDeleteText: "Cette action est irréversible.",
      delete: "Supprimer",
      cancel: "Annuler",
    },

    cart: {
      addedToCart: "Ajouté au panier",
    },

    topup: {
      title: "Recharge",
      rechargeMethods: "Méthodes de recharge",
      selectWallet: "Veuillez sélectionner le portefeuille de recharge",
      wallets: {
        eth: "ETH",
        btc: "BTC",
        usdt_trc20: "USDT (TRC-20)",
        usdt_erc20: "USDT (ERC-20)",
      },
      scanHint: "Scannez le QR code pour recharger",
      copyAddress: "Copier l'adresse de dépôt",
      addressCopied: "Adresse copiée dans le presse-papiers",
      fee: "Frais",
      amount: "Montant de la recharge",
      amountPlaceholder: "Veuillez saisir le montant de la recharge",
      usdtValue: "Valeur en USDT",
      fetchingRate: "Récupération du taux en direct…",
      enterAmountForValue: "Saisissez un montant pour voir la valeur en USDT",
      rateUnavailable: "Taux en direct indisponible - veuillez réessayer bientôt",
      uploadVoucher: "Téléverser le justificatif de recharge",
      uploadLabel: "Téléverser le justificatif",
      submit: "Soumettre la recharge",
      noWalletSelected: "Veuillez sélectionner un portefeuille",
      missingAmount: "Veuillez saisir le montant de la recharge",
      missingPhoto: "Veuillez téléverser le justificatif de recharge",
    },

    withdrawal: {
      title: "Centre de retrait",
      withdrawalMethods: "Méthodes de retrait",
      selectWallet: "Veuillez sélectionner la méthode de retrait",
      wallets: {
        eth: "ETH",
        btc: "BTC",
        usdt_trc20: "USDT (TRC-20)",
        usdt_erc20: "USDT (ERC-20)",
      },
      availableBalance: "Solde disponible",
      fee: "Frais",
      withdrawalAddress: "Adresse de retrait",
      addressPlaceholder: "Veuillez saisir ou coller l'adresse de votre portefeuille de réception",
      amount: "Montant du retrait",
      amountPlaceholder: "Veuillez saisir le montant du retrait",
      withdrawalPassword: "Mot de passe de retrait",
      passwordPlaceholder: "Veuillez saisir le mot de passe de retrait",
      submit: "Confirmer le retrait",
      noWalletSelected: "Veuillez sélectionner une méthode de retrait",
      missingAddress: "Veuillez saisir l'adresse de votre portefeuille de réception",
      missingAmount: "Veuillez saisir le montant du retrait",
      exceedsBalance: "Le montant du retrait dépasse votre solde disponible",
      missingPassword: "Veuillez saisir votre mot de passe de retrait",
      youWillReceive: "Vous recevrez",
      fetchingRate: "Récupération du taux en direct…",
      enterAmountToPreview: "Saisissez un montant pour voir ce que vous recevrez",
      rateUnavailable: "Taux en direct indisponible - veuillez réessayer bientôt",
      belowFeeWarning: "Ce montant est trop faible pour couvrir les frais de réseau",
      notice1: "Le montant crédité sera calculé selon les frais appliqués par votre compte de réception ou le taux de change en temps réel.",
      notice2: "Votre retrait sera crédité sous 24 heures, merci de patienter ! S'il n'est pas crédité sous 24 heures, veuillez contacter le support client en ligne.",
    },

    wallet: {
      title: "Portefeuille",
      withdrawalMethod: "Informations sur la méthode de retrait",
      username: "Nom d'utilisateur",
      walletName: "Nom du portefeuille",
      choosePreferredCoin: "Choisir la pièce préférée",
      walletAddress: "Adresse du portefeuille",
      withdrawPassword: "Mot de passe de retrait",
      submit: "Soumettre",
      note: "Veuillez être prudent lors du remplissage de ces informations",
      requiredField: "*"
    },

    grab: {
      // Header Section
      greeting: "Salut {0} 👏",

      // Stats Cards
      totalAmount: "Montant total",
      profitsAdded: "Les profits seront ajoutés ici",
      todaysCommission: "Commission du jour",
      commissionEarned: "Commission gagnée",
      currency: "USD",

      // Optimization Section
      startOptimization: "Démarrer l'optimisation",
      progressCount: "{0}/{1}",

      // Game Section
      commissionRate: "Taux de commission",
      exclusiveChannel: "Canal exclusif pour les membres exclusifs",
      startButton: "Démarrer",
      processing: "Traitement en cours...",

      // Notice Section
      notice: "Avis",
      supportHours: "Heures de support en ligne 10:00 - 22:00",
      contactSupport: "Veuillez contacter le support en ligne pour votre assistance!"
    },

    grapModal: {
      orderTime: "Heure de commande",
      orderNumber: "Numéro de commande",
      totalOrderAmount: "Montant total de la commande",
      commission: "Commission",
      estimatedReturn: "Retour estimé",
      cancel: "Annuler",
      submit: "Soumettre",
      quantity: "X 1",
      currency: "USD"
    },

    actions: {
      event: "Événements",
      tc: "Conditions générales",
      certificate: "Certificat",
      faq: "Foire aux questions",
      company: "Entreprise"
    },

    auth: {
      signin: {
        welcomeBack: "Content de vous revoir!",
        signinToAccount: "Connectez-vous à votre compte marketing",
        signinButton: "Se connecter",
        noAccount: "Vous n'avez pas de compte?",
        signupHere: "Inscrivez-vous ici."
      },
      signup: {
        createAccount: "Créer un compte",
        signupForAccount: "Inscrivez-vous pour un compte marketing",
        signupButton: "S'inscrire",
        alreadyHaveAccount: "Vous avez déjà un compte?",
        phonePlaceholder: "Entrez votre numéro de téléphone",
        searchCountries: "Rechercher des pays..."
      }
    },

    csPage: {
      customerSupport: "Service client",
      hereToHelp: "Nous sommes là pour vous aider!",
      howCanWeHelp: "Comment pouvons-nous vous aider aujourd'hui?",
      platformNames: {
        whatsapp: "WhatsApp",
        telegram: "Telegram"
      }
    },
  },


  entities: {
    record: {
      menu: "Enregistrements",
      fields: {
        user: "utilisateur",
        product: "produit",
        number: "numéro d'enregistrement",
        status: "statut",
      },
      list: {
        title: "Liste des enregistrements",
      },
      view: {
        title: "Détail de l'enregistrement",
      },
      edit: {
        title: "Modifier l'enregistrement",
      },
      create: {
        success: "Produit soumis avec succès.",
      },
      update: {
        success: "Produit soumis avec succès.",
      },
      destroy: {
        success: "Enregistrement supprimé avec succès",
      },
      destroyAll: {
        success: "Enregistrement supprimé avec succès",
      },
      enumerators: {
        status: {
          pending: "En attente",
          completed: "Terminé",
          canceled: "Annulé",
        },
      },
    },

    category: {
      name: "catégorie",
      label: "Catégories",
      menu: "Catégories",
      exporterFileName: "export_categorie",
      list: {
        menu: "Catégories",
        title: "Catégories",
      },
      create: {
        success: "Catégorie enregistrée avec succès",
      },
      update: {
        success: "Catégorie enregistrée avec succès",
      },
      destroy: {
        success: "Catégorie supprimée avec succès",
      },
      destroyAll: {
        success: "Catégorie(s) supprimée(s) avec succès",
      },
      edit: {
        title: "Modifier la catégorie",
      },
      fields: {
        id: "Id",
        name: "Nom",
        slug: "Slug",
        photo: "Photo",
        metaKeywords: "Mots-clés Meta",
        metaDescriptions: "Descriptions Meta",
        status: "Statut",
        isFeature: "Est en vedette",
        serialRange: "Série",
        serial: "Série",
        createdAt: "Créé à",
        updatedAt: "Mis à jour à",
        createdAtRange: "Créé à",
      },
      enumerators: {
        status: {
          enable: "Activer",
          disable: "Désactiver",
        },
      },
      placeholders: {},
      hints: {},
      new: {
        title: "Nouvelle catégorie",
      },
      view: {
        title: "Voir la catégorie",
      },
      importer: {
        title: "Importer des catégories",
        fileName: "modèle_import_categorie",
        hint: "Les colonnes Fichiers/Images doivent être les URL des fichiers séparés par un espace.",
      },
    },

    product: {
      name: "produit",
      label: "Produits",
      menu: "Produits",
      exporterFileName: "export_produit",
      list: {
        menu: "Produits",
        title: "Produits",
      },
      create: {
        success: "Produit enregistré avec succès",
      },
      update: {
        success: "Produit enregistré avec succès",
      },
      destroy: {
        success: "Produit supprimé avec succès",
      },
      destroyAll: {
        success: "Produit(s) supprimé(s) avec succès",
      },
      edit: {
        title: "Modifier le produit",
      },
      fields: {
        id: "Id",
        name: "Nom",
        slug: "Slug",
        tags: "Tags",
        video: "Vidéo",
        specificationName: "Nom de la spécification",
        specificationDesciption: "Description de la spécification",
        isSpecification: "Est une spécification",
        details: "Détails",
        photo: "Photo",
        discountPriceRange: "Prix remisé",
        discountPrice: "Prix actuel",
        previousPriceRange: "Prix précédent",
        previousPrice: "Prix précédent",
        stockRange: "Stock",
        stock: "Stock",
        metaKeywords: "Mots-clés Meta",
        metaDesctiption: "Description courte",
        status: "Statut",
        isType: "Type",
        dateRange: "Date",
        date: "Date",
        itemType: "Type d'article",
        file: "Fichier",
        link: "Lien",
        fileType: "Type de fichier",
        taxe: "Taxe",
        category: "Catégorie",
        subcategory: "Sous-catégorie",
        childcategory: "Sous-sous-catégorie",
        brand: "Marque",
        gallery: "Galerie",
        createdAt: "Créé à",
        updatedAt: "Mis à jour à",
        createdAtRange: "Créé à",
      },
      enumerators: {
        status: {
          enable: "Activer",
          disable: "Désactiver",
        },
        itemType: {
          physical: "physique",
          digitale: "Numérique",
        },
        fileType: {
          file: "Fichier",
          link: "Lien",
        },
        isType: {
          new_arrival: "Nouvelle arrivée",
          feature_product: "Produit vedette",
          top_pdroduct: "Produit populaire",
          best_product: "Meilleur produit",
          flash_deal_product: "Produit en promotion flash",
        },
      },
      placeholders: {},
      hints: {},
      new: {
        title: "Nouveau produit",
      },
      view: {
        title: "Voir le produit",
      },
      importer: {
        title: "Importer des produits",
        fileName: "modèle_import_produit",
        hint: "Les colonnes Fichiers/Images doivent être les URL des fichiers séparés par un espace.",
      },
    },
    transaction: {
      name: "transaction",
      label: "Transactions",
      menu: "Transactions",
      exporterFileName: "export_transaction",
      list: {
        menu: "Transactions",
        title: "Transactions",
      },
      create: {
        success: "Transaction envoyée avec succès",
      },
      update: {
        success: "Transaction enregistrée avec succès",
      },
      destroy: {
        success: "Transaction supprimée avec succès",
      },
      destroyAll: {
        success: "Transaction(s) supprimée(s) avec succès",
      },
      edit: {
        title: "Modifier la transaction",
      },
      fields: {
        id: "Id",
        amountRange: "Montant",
        amount: "Montant",
        email: "Email",
        tax: "Taxe",
        currencySign: "Signe monétaire",
        currencyValue: "Valeur monétaire",
        orderId: "ID de commande",
        createdAt: "Créé à",
        updatedAt: "Mis à jour à",
        createdAtRange: "Créé à",
      },
      enumerators: {
        status: {
          pending: "En attente",
          completed: "Succès",
          canceled: "Annulé",
        },
      },
      placeholders: {},
      hints: {},
      new: {
        title: "Nouvelle transaction",
      },
      view: {
        title: "Voir la transaction",
      },
      importer: {
        title: "Importer des transactions",
        fileName: "modèle_import_transaction",
        hint: "Les colonnes Fichiers/Images doivent être les URL des fichiers séparés par un espace.",
      },
    },

    order: {
      name: "commande",
      label: "Commandes",
      menu: "Commandes",
      exporterFileName: "export_commande",
      list: {
        menu: "Commandes",
        title: "Commandes",
      },
      create: {
        success: "Commande enregistrée avec succès",
      },
      update: {
        success: "Commande enregistrée avec succès",
      },
      destroy: {
        success: "Commande supprimée avec succès",
      },
      destroyAll: {
        success: "Commande(s) supprimée(s) avec succès",
      },
      edit: {
        title: "Modifier la commande",
      },
      fields: {
        id: "Id",
        userId: "Utilisateur",
        cart: "Panier",
        shipping: "Livraison",
        discountRange: "Remise",
        discount: "Remise",
        paymentMethod: "Méthode de paiement",
        taxe: "Taxe",
        transactionNumber: "Numéro de transaction",
        orderStatus: "Statut de commande",
        createdAt: "Créé à",
        updatedAt: "Mis à jour à",
        createdAtRange: "Créé à",
      },
      enumerators: {
        orderStatus: {
          pending: "En attente",
          in_progress: "En cours",
          delivered: "Livré",
          canceled: "Annulé",
        },
      },
      placeholders: {},
      hints: {},
      new: {
        title: "Nouvelle commande",
      },
      view: {
        title: "Voir la commande",
      },
      importer: {
        title: "Importer des commandes",
        fileName: "modèle_import_commande",
        hint: "Les colonnes Fichiers/Images doivent être les URL des fichiers séparés par un espace.",
      },
    },
  },


  user: {
    fields: {
      genre: "Genre",
      username: "Nom d'utilisateur",
      walletName: "Nom du portefeuille",
      id: "Id",
      confirmPassword: "Confirmer le mot de passe",
      avatars: "Avatar",
      invitationcode: "Code d'invitation",
      email: "E-mail",
      emails: "E-mail(s)",
      erc20: "Adresse du portefeuille ERC20",
      trc20: "Adresse du portefeuille TRC20",
      fullName: "Nom",
      balance: "Solde",
      firstName: "Prénom",
      lastName: "Nom de famille",
      status: "Statut",
      phoneNumber: "Numéro de téléphone",
      withdrawPassword: "Mot de passe de retrait",
      sector: "Secteur",
      employer: "Employeur",
      profession: "Profession",
      address: "Adresse",
      birthDate: "Date de naissance",
      maritalStatus: "Statut matrimonial",
      facebookLink: "Lien Facebook",
      sponsor: "Sponsor",
      role: "Rôle",
      createdAt: "Créé le",
      updatedAt: "Mis à jour le",
      roleUser: "Rôle/Utilisateur",
      roles: "Rôles",
      createdAtRange: "Créé le",
      password: "Mot de passe",
      oldPassword: "Ancien mot de passe",
      newPassword: "Nouveau mot de passe",
      newPasswordConfirmation: "Confirmation du nouveau mot de passe",
      rememberMe: "Se souvenir de moi",
    },
    sector: {
      AGRO_ALIMENTAIRE: "Industrie alimentaire",
      ASSURANCES: "Assurance",
      AUDIOVISUEL: "Audiovisuel",
      BANCAIRE: "Bancaire",
      CHIMIE: "Chimie",
      COMPOSANTS_AUTOMOBILES: "Composants automobiles",
      DISTRIBUTION: "Distribution",
      DISTRIBUTION_AUTOMOBILE: "Distribution automobile",
      DIVERS: "Divers",
      FINANCIER: "Financier",
      HOLDING: "Holding",
      IMMOBILIER: "Immobilier",
      INDUSTRIEL: "Industriel",
      LEASING: "Leasing",
      LOGISTIQUE_TRANSPORT: "Logistique et transport",
      PHARMACEUTIQUE: "Pharmaceutique",
      SANTÉ: "Santé",
      TOURSIME: "Tourisme",
      INFORMATION_TECHNOLOGY: "Technologie de l'information",
    },
    maritalStatus: {
      célébataire: "Célibataire",
      marié: "Marié",
    },
    status: {
      active: "Actif",
      invited: "Invité",
      "empty-permissions": "En attente des autorisations",
      inactive: "Inactif",
    },

    enumerators: {
      status: {
        USDT: "USDT",
        ETH: "ETH",
        BTC: "BTC",
      },
      gender: {
        male: "masculin",
        female: "féminin",
      }
    },
    invite: "Inviter",
    validations: {
      // eslint-disable-next-line
      email: "L'e-mail ${value} est invalide",
    },
    title: "Utilisateurs",
    menu: "Utilisateurs",
    doAddSuccess: "Utilisateur(s) enregistré(s) avec succès",
    doUpdateSuccess: "Utilisateur enregistré avec succès",
    exporterFileName: "utilisateurs_export",
    doDestroySuccess: "Utilisateur supprimé avec succès",
    doDestroyAllSelectedSuccess: "Utilisateurs supprimés avec succès",
    edit: {
      title: "Modifier l'utilisateur",
    },
    new: {
      title: "Inviter un ou des utilisateur(s)",
      titleModal: "Inviter un utilisateur",
      emailsHint:
        "Séparez les adresses e-mail multiples par une virgule.",
    },
    view: {
      title: "Voir l'utilisateur",
      activity: "Activité",
    },
    importer: {
      title: "Importer des utilisateurs",
      fileName: "modèle_import_utilisateurs",
      hint: "Les colonnes Fichiers/Images doivent être les URL des fichiers séparées par un espace. Les relations doivent être l'ID des enregistrements référencés séparés par un espace. Les rôles doivent être les identifiants de rôles séparés par un espace.",
    },
    errors: {
      userAlreadyExists: "Un utilisateur avec cet e-mail existe déjà",
      userNotFound: "Utilisateur non trouvé",
      revokingOwnPermission: `Vous ne pouvez pas révoquer votre propre permission d'administrateur`,
    },
  },

  errors: {
    backToHome: "Retour à l'accueil",
    continueShopping: "Continuer vos achats",
    title403: "Accès refusé",
    title404: "Page introuvable",
    title500: "Une erreur est survenue",
    403: `Désolé, vous n'avez pas accès à cette page`,
    404: "Désolé, la page que vous avez visitée n'existe pas",
    500: "Désolé, le serveur signale une erreur",
    429: "Trop de requêtes. Veuillez réessayer plus tard.",
    forbidden: {
      message: "Interdit",
    },
    validation: {
      message: "Une erreur s'est produite",
    },
    defaultErrorMessage: "Oups, une erreur s'est produite",
  },

  withdraw: {
    withdrawamount: "Montant du retrait",
    Withdrawpassword: "Mot de passe de retrait",
    availablebalance: "Solde disponible",
    rules: "Description des règles",
    rule1: "Le retrait minimum est de 20 $",
    rule2: "Le paiement sera effectué dans les 24 heures suivant la demande de retrait",
    rule3: "L'absence de soumission des commandes quotidiennes entraîne l'impossibilité de retrait, tous les produits doivent être soumis pour retrait"
  },
  profile: {
    profile: "Profil",
    fullname: "Nom complet",
    email: "Email",
    phonenumber: "Numéro de téléphone",
    country: "Pays",
    Invitationcode: "Code d’invitation"
  },
  wallet: {
    wallet: "Portefeuille",
    info: "Informations sur la méthode de retrait",
    username: "Nom d'utilisateur",
    walletname: 'Nom du portefeuille',
    walletaddress: 'Adresse du portefeuille',
    note: "Remarque",
    notedesctiption: "Veuillez remplir ces informations avec précaution."
  },


  cs: {
    cs: "Service client",
    note: "Si vous avez des questions ou rencontrez des problèmes, veuillez nous envoyer un email ou discuter avec notre équipe de support client en ligne.",
    contactnow: "Contacter maintenant"
  },
  transaction: {
    transaction: "Transaction",
    all: "Tout",
    withdraw: "Retrait",
    dposit: "Dépôt",
    notransaction: "Aucune transaction pour le moment !"
  },
  order: {
    order: "Commande",
    completed: "Complété",
    pending: "En attente",
    canceled: "Annulé",
    ordertime: "Heure de la commande",
    ordernumber: "Numéro de commande",
    total: "Montant total de la commande",
    commission: "Commission",
    return: "Retour estimé"
  },

  security: {
    changepassword: "Changer le mot de passe",
    oldpassword: "Ancien mot de passe",
    newpassword: "Nouveau mot de passe",
    confirmpassword: "Confirmer le mot de passe",
    note: "Remarque",
    notedesc: "Veuillez remplir ces informations avec précaution"
  },

  auth: {
    tenants: "Espaces de travail",
    singindesc: "Entrez votre email et votre mot de passe pour vous connecter",
    signupdesc: "Entrez votre email et votre mot de passe pour vous inscrire",
    profile: {
      title: "Profil",
      success: "Profil mis à jour avec succès",
      vip: "Félicitations pour votre abonnement",
    },
    createAnAccount: "Créer un compte",
    rememberMe: "Se souvenir de moi",
    forgotPassword: "Mot de passe oublié",
    signin: "Se connecter",
    signup: "S'inscrire",
    signout: "Se déconnecter",
    alreadyHaveAnAccount: "Vous avez déjà un compte ? Connectez-vous.",
    social: {
      errors: {
        "auth-invalid-provider":
          "Cet email est déjà enregistré avec un autre fournisseur.",
        "auth-no-email": `L'email associé à ce compte est privé ou inexistant.`,
      },
    },
    signinWithAnotherAccount: "Se connecter avec un autre compte",
    emailUnverified: {
      message: `Veuillez confirmer votre email à <strong>{0}</strong> pour continuer.`,
      submit: `Renvoyer l'email de vérification`,
    },
    emptyPermissions: {
      message: `Vous n'avez encore aucune permission. Attendez que l'administrateur vous accorde des privilèges.`,
    },
    passwordResetEmail: {
      message: "Envoyer un email de réinitialisation du mot de passe",
      error: `Email non reconnu`,
    },
    passwordReset: {
      message: "Réinitialiser le mot de passe",
    },
    passwordChange: {
      title: "Changer le mot de passe",
      success: "Mot de passe changé avec succès",
      mustMatch: "Les mots de passe doivent correspondre",
    },
    emailAddressVerificationEmail: {
      error: `Email non reconnu`,
    },
    verificationEmailSuccess: `Email de vérification envoyé avec succès`,
    passwordResetEmailSuccess: `Email de réinitialisation du mot de passe envoyé avec succès`,
    passwordResetSuccess: `Mot de passe changé avec succès`,
    verifyEmail: {
      success: "Email vérifié avec succès.",
      message: "Un instant, votre email est en cours de vérification...",
    },
  },

  tabbarmenue: {
    home: "Accueil",
    rate: "Évaluer",
    profile: "Profil"
  },


  validation: {
    mixed: {
      default: "${path} est invalide",
      required: "${path} est requis",
      oneOf: "${path} doit être l'une des valeurs suivantes : ${values}",
      notOneOf: "${path} ne doit pas être l'une des valeurs suivantes : ${values}",
      notType: ({ path, type, value, originalValue }) => {
        return `${path} doit être un(e) ${type}`;
      },
    },
    string: {
      length: "${path} doit contenir exactement ${length} caractères",
      min: "${path} doit contenir au moins ${min} caractères",
      max: "${path} doit contenir au maximum ${max} caractères",
      matches: '${path} doit correspondre au format suivant : "${regex}"',
      email: "${path} doit être une adresse e-mail valide",
      url: "${path} doit être une URL valide",
      trim: "${path} doit être une chaîne sans espaces au début et à la fin",
      lowercase: "${path} doit être en minuscules",
      uppercase: "${path} doit être en majuscules",
      selected: "${path} doit être sélectionné",
    },
    number: {
      min: "${path} doit être supérieur ou égal à ${min}",
      max: "${path} doit être inférieur ou égal à ${max}",
      lessThan: "${path} doit être inférieur à ${less}",
      moreThan: "${path} doit être supérieur à ${more}",
      notEqual: "${path} ne doit pas être égal à ${notEqual}",
      positive: "${path} doit être un nombre positif",
      negative: "${path} doit être un nombre négatif",
      integer: "${path} doit être un nombre entier",
    },
    date: {
      min: "${path} doit être postérieur à ${min}",
      max: "${path} doit être antérieur à ${max}",
    },
    boolean: {},
    object: {
      noUnknown:
        "${path} ne doit pas contenir de clés non spécifiées dans l'objet",
    },
    array: {
      min: ({ min, path }) =>
        min === 1
          ? `${path} est requis`
          : `${path} doit contenir au moins ${min} éléments`,
      max: "${path} doit contenir au maximum ${max} éléments",
    },
  },
  /* eslint-disable */
  fileUploader: {
    upload: "Téléverser",
    image: "Vous devez téléverser une image",
    size: "Le fichier est trop volumineux. La taille maximale autorisée est de {0}",
    formats: `Format invalide. Doit être l'un des suivants : {0}.`,
  },

  estore: {
    auth: {
      login: {
        title: "Connexion",
        tagline: "Achetez plus, vivez mieux",
        phoneOrEmail: "Téléphone / E-mail",
        phoneOrEmailPlaceholder: "Téléphone / E-mail",
        password: "Entrez le mot de passe",
        passwordPlaceholder: "Mot de passe",
        forgotPassword: "Mot de passe oublié",
        noAccount: "Pas de compte ?",
        signUp: "S'inscrire",
        loginButton: "Connexion",
      },
    },
    header: {
      home: "Accueil",
      searchPlaceholder: "Rechercher des produits, marques et catégories...",
      search: "Rechercher",
      cart: "Panier",
      loginRegister: "Connexion / Inscription",
      myAccount: "Mon compte",
      myOrders: "Mes commandes",
      signOut: "Déconnexion",
      allCategories: "Toutes les catégories",
      account: "Compte",
    },
    categories: {
      "Women Clothing": "Vêtements Femme",
      "Women Shoes": "Chaussures Femme",
      "Women Bags": "Sacs Femme",
      "Accessories": "Accessoires",
      "Lifestyle": "Style de vie",
      "Global Purchase": "Achat international",
      "Girls": "Filles",
      "Boys": "Garçons",
      "Men Clothing": "Vêtements Homme",
      "Men Shoes": "Chaussures Homme",
      "Men Bags": "Sacs Homme",
    },
    pc: {
      common: {
        saving: "Enregistrement...",
        confirm: "Confirmer",
        save: "Enregistrer",
        cancel: "Annuler",
        loading: "Chargement...",
        edit: "Modifier",
        delete: "Supprimer",
        submit: "Envoyer",
        update: "Mettre à jour",
      },
      records: {
        transactions: "Transactions",
        processing: "En cours",
        completed: "Terminé",
        canceled: "Annulé",
        id: "ID",
        time: "Heure",
        viewProof: "Voir le justificatif",
      },
      messages: {
        title: "Messages",
        markAllRead: "Tout marquer comme lu",
        loading: "Chargement...",
        empty: "Aucun message pour le moment.",
        today: "Aujourd'hui",
        earlier: "Plus tôt",
        amount: "Montant",
        depositSuccess: "Dépôt réussi",
        depositCanceled: "Dépôt annulé",
        withdrawSuccess: "Retrait réussi",
        withdrawCanceled: "Retrait annulé",
        systemNotice: "Avis système",
        alert: "Alerte",
        notification: "Notification",
      },
      withdrawal: {
        deductedFromBalance: "Déduit du solde",
      },
      myAccount: {
        title: "Mon compte",
        storeId: "ID de la boutique",
        id: "ID",
        copied: "Copié",
        copy: "Copier",
        idCopied: "{0} copié dans le presse-papiers",
        username: "Nom d'utilisateur",
        phoneNumber: "Numéro de téléphone",
        notBound: "Non associé",
        email: "E-mail",
        loginPassword: "Mot de passe de connexion",
        change: "Modifier",
        changeLoginPassword: "Changer le mot de passe de connexion",
        currentPassword: "Mot de passe actuel",
        currentPasswordPlaceholder: "Entrez votre mot de passe actuel",
        newPassword: "Nouveau mot de passe",
        newPasswordPlaceholder: "Au moins 6 caractères",
        confirmNewPassword: "Confirmer le nouveau mot de passe",
        confirmNewPasswordPlaceholder: "Ressaisissez le nouveau mot de passe",
        cancel: "Annuler",
        saveChanges: "Enregistrer les modifications",
        securityHint: "Gardez votre compte sécurisé — ne partagez jamais votre mot de passe ou vos codes de vérification avec qui que ce soit.",
      },
      applyMerchant: {
        loading: "Chargement...",
        idCard: "Carte d'identité",
        submitting: "Envoi en cours...",
      },
      wholesale: {
        title: "Gestion du gros",
        all: "Tout",
        lowestPrice: "Prix le plus bas",
        highestPrice: "Prix le plus élevé",
        filter: "Filtrer",
        loadingItems: "Chargement des articles…",
        showing: "Affichage de",
        of: "sur",
        item: "article",
        items: "articles",
        inCategory: "dans {0}",
        emptyTitle: "Aucun produit ne correspond à ce filtre",
        emptyText: "Essayez une autre catégorie ou une autre fourchette de prix.",
        added: "Ajouté",
        add: "Ajouter",
        loadingMore: "Chargement…",
        reachedEnd: "Vous avez atteint la fin.",
        salesPrice: "Prix de vente",
        wholesalePrice: "Prix de gros",
        cancel: "Annuler",
        confirming: "Confirmation…",
        confirmListing: "Confirmer l'ajout",
        alreadyListed: "Déjà ajouté à vos annonces de gros.",
        addedToListings: '"{0}" ajouté à vos annonces de gros.',
      },
      sellerSetup: {
        title: "Configuration",
        loading: "Chargement des paramètres de la boutique…",
        noStoreTitle: "Aucune boutique trouvée pour ce compte",
        noStoreText: "Postulez pour devenir vendeur afin de gérer les paramètres de la boutique.",
        storeInformation: "Informations sur la boutique",
        storeInfoSub: "Mettez à jour les détails de votre boutique et vos informations professionnelles.",
        storeLogo: "Logo de la boutique",
        uploadLogoSub: "Téléversez un logo pour votre boutique",
        store: "Boutique",
        uploading: "Téléversement…",
        uploadLogo: "Téléverser le logo",
        storeName: "Nom de la boutique *",
        storeNamePlaceholder: "Nom de votre boutique",
        storeNameRequired: "Le nom de la boutique est requis.",
        storeDescription: "Description de la boutique",
        storeDescriptionPlaceholder: "Décrivez votre boutique...",
        businessEmail: "E-mail professionnel *",
        businessPhone: "Téléphone professionnel",
        businessPhonePlaceholder: "Numéro de téléphone",
        saving: "Enregistrement…",
        saveChanges: "Enregistrer les modifications",
        storeBanner: "Bannière de la boutique",
        storeBannerSub: "Affichée en haut de la page de votre boutique.",
        noBanner: "Aucune bannière téléversée",
        uploadBanner: "Téléverser la bannière",
      },
      productManagement: {
        title: "Gestion des produits",
        addProduct: "+ Ajouter un produit",
        searchPlaceholder: "Rechercher des produits...",
        loadingProducts: "Chargement de vos produits…",
        showing: "Affichage de",
        of: "sur",
        products: "produits",
        emptyTitle: "Aucun produit répertorié pour le moment",
        emptyText: "Ajoutez des produits depuis la Gestion du gros pour les voir ici.",
        goToWholesale: "Aller à la Gestion du gros",
        noMatchesTitle: "Aucun résultat",
        noMatchesText: "Aucun produit ne correspond à",
        wholesale: "Gros",
        sales: "Vente",
      },
      sellerOrders: {
        title: "Commandes de la boutique",
        lumpSum: "Montant forfaitaire",
        salesProfit: "Bénéfice sur vente",
        wholesalePrice: "Prix de gros",
        actualPayment: "Paiement réel",
        processing: "Traitement en cours…",
        goToShipment: "Aller à l'expédition",
        profitCredited: "Bénéfice crédité",
        refunded: "Remboursé",
        awaitingReview: "En attente d'examen",
        paid: "Payé",
        waitingForDelivery: "En attente de livraison",
        waitingForReceipt: "En attente de réception",
        completed: "Terminé",
        refundAfterSales: "Remboursement / Service après-vente",
        emptyTitle: "Rien ici pour le moment",
        emptyText: "Les commandes à cette étape apparaîtront ici.",
      },
      sellerHub: {
        loadingShop: "Chargement de votre boutique...",
        storeFrozen: "Boutique gelée",
        frozenText: "Votre compte vendeur a été temporairement gelé car une commande est restée en attente de livraison trop longtemps. Vous ne pouvez pas accéder au tableau de bord vendeur tant que cela n'est pas résolu.",
        contactSupport: "Contacter le service client",
        backToBuyer: "Retour au compte acheteur",
        accountBalance: "Solde du compte",
        viewShop: "Voir la boutique",
        orderFulfillment: "Traitement des commandes",
        waitingForDelivery: "En attente de livraison",
        waitingForReceipt: "En attente de réception",
        completed: "Terminé",
        refundAfterSales: "Remboursement / Service après-vente",
        quickActions: "Actions rapides",
        topUp: "Recharger",
        withdrawal: "Retrait",
        wholesaleCatalog: "Catalogue de gros",
        manageProducts: "Gérer les produits",
      },
      shopDetails: {
        title: "Détails de la boutique",
        loading: "Chargement des détails de la boutique…",
        noStoreTitle: "Vous n'avez pas encore de boutique",
        noStoreText: "Postulez pour devenir vendeur pour voir les détails de votre boutique ici.",
        applyNow: "Postuler maintenant",
        accountBalance: "Solde du compte",
        storeHealth: "Santé de la boutique",
        creditScore: "Score de crédit",
        followers: "Abonnés",
        todaysOrders: "Commandes du jour",
        cumulativeOrderQty: "Quantité cumulée de commandes",
        salesPerformance: "Performance des ventes",
        todaysSales: "Ventes du jour",
        totalSales: "Ventes totales",
        todaysProfit: "Bénéfice du jour",
        totalProfit: "Bénéfice total",
      },
      mineSeller: {
        menu: {
          dashboard: "Tableau de bord",
          wholesale: "Gestion du gros",
          shopDetails: "Détails de la boutique",
          products: "Gestion des produits",
          orders: "Commandes",
          billing: "Historique de facturation",
          addresses: "Adresses de livraison",
          support: "Centre de services",
          loginPassword: "Mot de passe de connexion",
          paymentPassword: "Mot de passe de paiement",
          settings: "Configuration",
        },
        myStore: "Ma boutique",
        seller: "Vendeur",
        switchToBuyer: "Passer au compte acheteur",
        logOut: "Déconnexion",
      },
      mineHub: {
        storeFrozen: "Boutique gelée",
        storeFrozenSub: "Votre compte vendeur a été temporairement gelé.",
        contactSupport: "Contacter le service client",
        storeApproved: "Demande de boutique approuvée !",
        storeApprovedSub: "Votre compte vendeur est actif.",
        goToSellerDashboard: "Aller au tableau de bord vendeur",
        accountBalance: "Solde du compte",
        myAccount: "Mon compte",
        myStuff: "Mes affaires",
        myCollection: "Ma collection",
        myBrowse: "Mes vues récentes",
        myOrders: "Mes commandes",
        viewAll: "Tout voir",
        paymentPending: "Paiement en attente",
        inShipping: "En cours d'expédition",
        received: "Reçu",
        completed: "Terminé",
        refund: "Remboursement",
        quickActions: "Actions rapides",
        topUp: "Recharger",
        withdrawal: "Retrait",
        sellerDashboard: "Tableau de bord vendeur",
        applyMerchant: "Devenir vendeur",
      },
      addresses: {
        title: "Adresses de livraison",
        addAddress: "+ Ajouter une adresse",
        editAddress: "Modifier l'adresse",
        addNewAddress: "Ajouter une nouvelle adresse",
        address: "Adresse",
        addressPlaceholder: "Rue, ville, région, code postal",
        contactName: "Nom du contact",
        contactNamePlaceholder: "Nom du destinataire",
        contactNumber: "Numéro de contact",
        contactNumberPlaceholder: "Numéro de téléphone",
        cancel: "Annuler",
        saving: "Enregistrement...",
        saveAddress: "Enregistrer l'adresse",
        emptyTitle: "Aucune adresse enregistrée",
        emptyText: "Ajoutez une adresse de livraison pour accélérer le paiement.",
        deleteConfirm: "Supprimer cette adresse ?",
        yesDelete: "Oui, supprimer",
        edit: "Modifier",
        delete: "Supprimer",
      },
      settings: {
        title: "Configuration",
        publicProfile: "Profil public",
        publicProfileSub: "Ces informations seront affichées sur vos avis et votre profil.",
        uploading: "Téléversement…",
        changeAvatar: "Changer l'avatar",
        displayName: "Nom d'affichage",
        displayNamePlaceholder: "Votre nom d'affichage",
        displayNameRequired: "Le nom d'affichage est requis.",
        emailAddress: "Adresse e-mail",
        emailHint: "Contactez le support pour changer votre adresse e-mail.",
        saving: "Enregistrement…",
        saveChanges: "Enregistrer les modifications",
        accountStats: "Statistiques du compte",
        orders: "Commandes",
        reviews: "Avis",
        wishlist: "Liste de souhaits",
        joined: "Inscrit le",
      },
      myOrders: {
        title: "Mes commandes",
        emptyTitle: "Aucune commande pour le moment",
        emptyText: "Les commandes que vous passez apparaîtront ici.",
        startShopping: "Commencer les achats",
        order: "Commande",
        total: "Total",
        statusPending: "En attente",
        statusConfirmed: "Confirmée",
        statusShipped: "Expédiée",
        statusDelivered: "Livrée",
        statusCancelled: "Annulée",
      },
      balance: {
        title: "Solde",
        totalBalance: "Solde total",
        accountBalance: "Solde du compte",
        availableBalance: "Solde disponible",
        deposit: "Dépôt",
        withdraw: "Retirer",
        hint: "Le solde disponible peut être utilisé pour des achats et retiré vers votre portefeuille lié.",
      },
      depositRecord: {
        title: "Historique des dépôts",
        totalDeposited: "Total déposé",
      },
      withdrawalRecord: {
        title: "Historique des retraits",
        totalWithdrawn: "Total retiré",
      },
      paymentPassword: {
        title: "Mot de passe de paiement",
        oldPlaceholder: "Entrez votre mot de passe de transaction actuel",
        newPlaceholder: "Entrez votre nouveau mot de passe de transaction",
        confirmPlaceholder: "Confirmez votre nouveau mot de passe de transaction",
        hint: "Votre mot de passe de transaction est utilisé pour confirmer les retraits et autres modifications sensibles du compte. Gardez-le sécurisé et ne le partagez jamais avec qui que ce soit.",
      },
      login: {
        brandTitle: "Achetez plus, vivez mieux",
        brandSubtitle: "Des milliers de produits, des prix imbattables, livrés à votre porte.",
        title: "Content de vous revoir",
        subtitle: "Connectez-vous pour continuer vos achats",
        password: "Mot de passe",
        forgotPassword: "Mot de passe oublié ?",
      },
      register: {
        brandTitle: "Rejoignez Estore dès aujourd'hui",
        brandSubtitle: "Créez un compte pour suivre vos commandes, enregistrer des adresses et payer plus rapidement.",
        title: "Créez votre compte",
        subtitle: "Rejoignez Estore et achetez plus intelligemment",
        email: "E-mail",
        emailPlaceholder: "Entrez votre e-mail",
        getOtp: "Obtenir le code",
        otp: "Code de vérification",
        otpPlaceholder: "Entrez le code envoyé à votre e-mail",
        phoneNumber: "Numéro de téléphone",
        phoneNumberPlaceholder: "Numéro de téléphone",
        password: "Mot de passe",
        passwordPlaceholder: "Créez un mot de passe",
        confirmPassword: "Confirmer le mot de passe",
        confirmPasswordPlaceholder: "Ressaisissez votre mot de passe",
        registerButton: "S'inscrire",
        haveAccount: "Vous avez déjà un compte ?",
        logIn: "Se connecter",
      },
      checkout: {
        loading: "Chargement...",
        qty: "Qté",
      },
      mine: {
        myBrowse: {
          title: "Mes vues récentes",
          emptyTitle: "Aucun historique de navigation pour le moment",
          emptyText: "Les produits que vous consultez apparaîtront ici pour reprendre où vous en étiez.",
          startShopping: "Commencer les achats",
        },
        myCollection: {
          title: "Ma collection",
          emptyTitle: "Aucun article enregistré pour le moment",
          emptyText: "Les produits que vous enregistrez apparaîtront ici pour les retrouver rapidement.",
          browseProducts: "Parcourir les produits",
        },
        support: {
          title: "Chat en direct",
          emptyTitle: "Notre équipe support vous répondra bientôt",
          emptyText: "Démarrez une conversation et nous répondrons dès que possible.",
        },
        menu: {
          account: "Mon compte",
          balance: "Solde",
          orders: "Mes commandes",
          deposit: "Dépôt",
          depositRecord: "Historique des dépôts",
          withdrawal: "Retrait",
          withdrawalRecord: "Historique des retraits",
          paymentPassword: "Mot de passe de paiement",
          addresses: "Adresses de livraison",
          collection: "Ma collection",
          browse: "Mes vues récentes",
          messages: "Messages",
          settings: "Configuration",
          support: "Chat en direct",
        },
        goToSellerDashboard: "Aller au tableau de bord vendeur",
        applyMerchant: "Devenir vendeur",
        logOut: "Déconnexion",
      },
      cart: {
        title: "Mon panier",
        empty: "Votre panier est vide.",
        continueShopping: "Continuer vos achats",
        product: "Produit",
        price: "Prix",
        quantity: "Quantité",
        subtotal: "Sous-total",
        remove: "Retirer",
        orderSummary: "Récapitulatif de la commande",
        items: "Articles",
        shipping: "Livraison",
        calculatedAtCheckout: "Calculé au paiement",
        total: "Total",
        proceedToCheckout: "Passer au paiement",
        continueShoppingArrow: "← Continuer vos achats",
      },
      productDetails: {
        notFound: "Produit introuvable.",
        noImage: "Aucune image",
        description: "Description",
        quantity: "Quantité",
        addToCart: "Ajouter au panier",
        buyNow: "Acheter maintenant",
      },
      classification: {
        searchPlaceholder: "Rechercher dans les catégories",
        categories: "Catégories",
        loading: "Chargement...",
        noCategories: "Aucune catégorie",
        category: "Catégorie",
        noProducts: "Aucun produit trouvé dans cette catégorie.",
        loadingMore: "Chargement...",
        reachedEnd: "Vous avez atteint la fin.",
      },
      home: {
        allCategories: "Toutes les catégories",
        loading: "Chargement...",
        noCategories: "Aucune catégorie pour le moment.",
        browseAll: "Parcourir toutes les catégories",
        aboutSection: "À propos d'E-store Fashion",
        aboutUs: "À propos de nous",
        joinUs: "Rejoignez-nous",
        contactUs: "Contactez-nous",
        exchangeCooperation: "Échange et coopération",
        merchantAgreement: "Accord vendeur",
        supplierCooperation: "Coopération fournisseur",
        strategicManagementHeading: "Gestion stratégique",
        strategicManagement: "Gestion stratégique",
        precisionOperation: "Opération de précision",
        courseDriven: "Piloté par les cours",
        faq: "FAQ",
        downloadApp: "Télécharger l'application",
        globalPurchase: "Achat international",
        heroWelcomeBack: "Content de vous revoir",
        heroWelcomeGuest: "Bienvenue, magnifique",
        heroGreeting: "Bonjour, {0} 👋",
        heroDefaultTitle: "Stylée pour chaque femme",
        heroSlide1Text: "Robes, chaussures et accessoires sélectionnés pour les femmes qui aiment briller.",
        heroSlide1Cta: "Acheter Femme",
        heroSlide2Eyebrow: "Durée limitée",
        heroSlide2Title: "Jusqu'à 50% de réduction sur la mode femme",
        heroSlide2Text: "Renouvelez votre garde-robe avec les indispensables de la saison.",
        heroSlide2Cta: "Voir les soldes",
        heroSlide3Eyebrow: "Nouveautés",
        heroSlide3Title: "Des bijoux à aimer",
        heroSlide3Text: "Des colliers délicats aux sacs statement — sublimez chaque tenue.",
        heroSlide3Cta: "Découvrir les accessoires",
        heroSlide4Eyebrow: "Cette semaine seulement",
        heroSlide4Title: "Livraison gratuite dès 50$ d'achat",
        heroSlide4Text: "Aucun code nécessaire — la réduction est appliquée automatiquement au paiement.",
        heroSlide4Cta: "Commencer vos achats",
        trustShippingTitle: "Livraison gratuite",
        trustShippingText: "Pour les commandes de plus de 50$",
        trustReturnsTitle: "Retours faciles",
        trustReturnsText: "Délai de retour de 30 jours",
        trustCheckoutTitle: "Paiement sécurisé",
        trustCheckoutText: "Vos données restent protégées",
        trustSupportTitle: "Support 24/7",
        trustSupportText: "Nous sommes là quand vous avez besoin de nous",
        flashDeals: "Ventes flash",
        limitedTime: "Durée limitée",
        justForYou: "Rien que pour vous",
        seeAll: "Tout voir",
        noMoreProducts: "Plus aucun produit à afficher pour le moment.",
        add: "Ajouter",
        previousSlide: "Diapositive précédente",
        nextSlide: "Diapositive suivante",
        close: "Fermer",
        infoEmpty: "Ce contenu n'a pas encore été ajouté. Revenez bientôt.",
      },
      footer: {
        blurb: "Tout ce dont vous avez besoin, livré à votre porte.",
        shopHeading: "Boutique",
        accountHeading: "Compte",
        supportHeading: "Support",
        helpCenter: "Centre d'aide",
        shipping: "Livraison",
        returns: "Retours",
        deliveryAddresses: "Adresses de livraison",
        login: "Connexion",
        createAccount: "Créer un compte",
        rights: "© {0} Estore. Tous droits réservés.",
      },
    },
  },

};

export default fr;
