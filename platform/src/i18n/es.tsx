
import Withdraw from "src/view/pages/withdraw/Withdraw";


const es = {
  app: {
    title: "Zalando"
  },
  inputs: {
    username: "Nombre de usuario",
    password: "Contraseña",
    phoneNumber: "Número de teléfono",
    withdrawPassword: "Contraseña de retiro",
    confirmPassword: "Confirmar contraseña",
    invitationcode: "Código de invitación",
    walletaddress: "Dirección de billetera"
  },

  pages: {
    home: {
      levels: "Niveles VIP",
      chooseLevel: "Elige tu nivel para maximizar tus ganancias",
      welcome: "Bienvenido",
      announcement: "Estimados usuarios, la plataforma E-clicks Digital ha vuelto a la normalidad y a su mejor estado, continúen ganando tanto como puedan desde la plataforma",

      // Action Buttons
      services: "Servicios",
      events: "Eventos",
      about: "Acerca de",
      terms: "Términos",
      certificate: "Certificado",
      faqs: "Preguntas Frecuentes",

      // VIP Level Cards
      currentLevel: "Actual",
      upgrade: "Actualizar",
      profitNormal: "ganancia en productos normales",
      profitPremium: "ganancia en productos premium",
      maxOrders: "Máximo de pedidos por día",

      // Modal
      modal: {
        levelDetails: "Detalles del Nivel",
        levelLimit: "Límite del Nivel",
        dailyOrders: "Pedidos Diarios",
        commissionRate: "Tasa de Comisión",
        cancel: "Cancelar",
        upgradeNow: "Actualizar Ahora"
      }
    },

    prizeModal: {
      congratulations: "¡Felicidades!",
      spinning: "Girando...",
      prizeWon: "¡Has ganado!",
      currency: "USD",
      prizeBreakdown: "Desglose del Premio",
      totalAmount: "Cantidad Total",
      yourWinnings: "Tus Ganancias",
      claimPrize: "Reclamar Premio",
      celebrationMessage: "¡Disfruta tu recompensa!",
    },

    tabBottomNavigator: {
      home: "Inicio",
      grap: "Capturar",
      records: "Registros",
      starting: "Comenzar"
    },
    transaction: {
      title: "Historial de Transacciones",
      filters: {
        all: "Todas",
        withdraw: "Retiro",
        deposit: "Depósito"
      },
      recentTransactions: "Transacciones Recientes",
      transactionCount: "{0} transacciones",
      types: {
        deposit: "Depósito",
        withdrawal: "Retiro"
      },
      status: {
        completed: "Completado",
        processing: "Procesando",
        canceled: "Cancelado"
      },
      amount: {
        deposit: "+${0}",
        withdraw: "-${0}",
        canceled: "${0}"
      }
    },

    profile: {
      title: "Perfil",
      invitationCode: "Código de Invitación",
      creditScore: "Puntuación de Crédito",
      balance: "Saldo",
      todayProfit: "Ganancia de Hoy",
      frozenAmount: "Monto Congelado",
      usd: "USD",

      // Menu Sections
      myFinancial: "Mis Finanzas",
      myDetails: "Mis Detalles",
      other: "Otro",

      // Financial Items
      recharge: "Recargar",
      withdraw: "Retirar",

      // Details Items
      contactUs: "Contáctenos",
      profile: "Perfil",
      updateWithdrawal: "Actualizar detalles de retiro",

      // Other Items
      transaction: "Transacción",
      tasksHistory: "Historial de Tareas",
      security: "Seguridad",
      notifications: "Notificaciones",
      languages: "Idiomas",

      // Buttons
      logout: "Cerrar Sesión",
      confirm: "Confirmar",
      copied: "Copiado",

      // Modals
      rechargeModal: {
        title: "Recarga",
        text: "Por favor contacte al servicio al cliente para recargar"
      },
      withdrawModal: {
        title: "Retiro",
        text: "Por favor contacte al servicio al cliente para proceder con su retiro."
      }
    },

    team: {
      title: "Perfil",
      personalInformation: "Información Personal",
      accountDetails: "Los detalles de tu cuenta e información personal",

      // Info Items
      fullName: "Nombre Completo",
      email: "Correo Electrónico",
      phoneNumber: "Número de Teléfono",
      country: "País",
      gender: "Género",
      invitationCode: "Código de Invitación",

      // Gender Values
      genderNotSpecified: "No especificado",

      // Placeholders
      notAvailable: "—"
    },

    language: {
      title: "Idioma de la App",
      selectLanguage: "Seleccionar Idioma",
      choosePreferred: "Elige tu idioma preferido",
      searchPlaceholder: "Buscar idiomas...",
      currentLanguage: "Idioma Actual",

      // Language names (if needed for dynamic content)
      languages: {
        english: "Inglés",
        french: "Francés",
        russian: "Ruso",
        german: "Alemán",
        spanish: "Español"
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
      title: "Servicio al Cliente",
      description: "Si tienes alguna pregunta o encuentras problemas, por favor envíanos un correo electrónico o chatea con nuestro equipo de soporte al cliente en línea.",
      contactWhatsApp: "Contactar por WhatsApp",
      contactTelegram: "Contactar por Telegram"
    },

    notifications: {
      title: "Notificaciones",
      filters: {
        all: "Todas",
        deposit: "Depósito",
        withdraw: "Retiro"
      },
      unreadCount: "{0} no leídas",
      emptyState: {
        title: "No se encontraron notificaciones",
        description: "Aún no tienes notificaciones {0}."
      },

      // Notification Types
      types: {
        deposit_success: "Depósito Exitoso",
        deposit_canceled: "Depósito Cancelado",
        withdraw_success: "Retiro Exitoso",
        withdraw_canceled: "Retiro Cancelado",
        system: "Notificación del Sistema",
        alert: "Alerta Importante",
        default: "Notificación"
      },

      // Notification Messages
      messages: {
        deposit_success: "Tu depósito de ${0} se ha completado exitosamente.",
        deposit_canceled: "Tu solicitud de depósito de ${0} ha sido cancelada.",
        withdraw_success: "Tu retiro de ${0} se ha completado exitosamente.",
        withdraw_canceled: "Tu solicitud de retiro de ${0} ha sido cancelada.",
        system: "Notificación del sistema",
        alert: "Notificación de alerta importante",
        default: "Actualización de notificación"
      },

      // Status
      status: {
        unread: "no leída",
        read: "leída"
      }
    },

    portfolio: {
      // Status Tabs
      completed: "Completados",
      pending: "Pendientes",
      canceled: "Cancelados",

      // Order Information
      orderTime: "Hora del Pedido",
      orderNumber: "Número de Pedido",
      totalOrderAmount: "Monto total del pedido",
      commission: "Comisión",
      estimatedReturn: "Retorno estimado",

      // Product Details
      quantity: "X 1",
      currency: "USD",

      // Status Labels
      status: {
        completed: "Completado",
        pending: "Pendiente",
        canceled: "Cancelado"
      }
    },

    changePassword: {
      title: "Cambiar Contraseña",
      header: "Cambiar Contraseña",
      oldPassword: "Contraseña Antigua",
      newPassword: "Nueva Contraseña",
      confirmPassword: "Confirmar Contraseña",
      submit: "Enviar",
      note: "Por favor completa esta información cuidadosamente",
      requiredField: "*"
    },

    withdraw: {
      title: "Retiro",
      withdrawAmount: "Monto del Retiro",
      withdrawPassword: "Contraseña de Retiro",
      availableBalance: "Saldo disponible",
      confirm: "Confirmar",
      rulesDescription: "Descripción de Reglas",
      rules: {
        minimum: "(1) El retiro mínimo es de 100 USD",
        paymentTime: "(2) El pago se realizará dentro de la próxima hora, después de que se apruebe la solicitud de retiro.",
        orderCompletion: "(3) El envío incompleto de pedidos diarios está sujeto a ningún retiro, todos los productos deben enviarse para retiro"
      }
    },

    checkout: {
      title: "Pago",
      sectionAddress: "Dirección de entrega",
      noAddress: "Aún no tienes una dirección de entrega guardada",
      addAddress: "+ Agregar dirección de entrega",
      changeAddress: "Cambiar",
      selectAddressTitle: "Seleccionar dirección de entrega",
      sectionPayment: "Método de pago",
      codLabel: "Pago contra entrega",
      codDescription: "Paga en efectivo directamente al repartidor cuando llegue tu pedido.",
      sectionSummary: "Resumen del pedido",
      itemsCount: "{0} artículo(s)",
      subtotal: "Subtotal",
      deliveryFee: "Costo de envío",
      free: "Gratis",
      total: "Total",
      placeOrder: "Realizar pedido",
      placingOrder: "Realizando pedido...",
      missingAddress: "Por favor selecciona una dirección de entrega",
      emptyCart: "Tu carrito está vacío",
      successTitle: "¡Pedido realizado!",
      successMessage: "Tu pedido se realizó con éxito. Paga en efectivo cuando llegue.",
      orderNumber: "Número de pedido",
      totalToPay: "Total a pagar en la entrega",
      backToHome: "Volver al inicio",
      done: "Listo",
    },

    applyMerchant: {
      title: "Solicitar una tienda",
      intro: "Completa los datos de tu tienda a continuación para solicitar ser vendedor.",
      storePhoto: "Foto de la tienda",
      storeName: "Nombre de la tienda",
      storeNamePlaceholder: "Ingresa el nombre de la tienda",
      contact: "Contacto",
      contactPlaceholder: "Ingresa una persona de contacto o número de teléfono",
      idNumber: "Número de identificación",
      idNumberPlaceholder: "Ingresa tu número de identificación",
      invitationCode: "Código de invitación",
      invitationCodePlaceholder: "Ingresa tu código de invitación",
      mainBusiness: "Giro principal",
      mainBusinessPlaceholder: "Selecciona el giro principal",
      idCardFront: "Foto frontal de la identificación",
      idCardBack: "Foto trasera de la identificación",
      address: "Dirección detallada",
      addressPlaceholder: "Ingresa la dirección detallada",
      submit: "Enviar solicitud",
      submitSuccess: "Tu solicitud de tienda ha sido enviada y está pendiente de revisión.",
      missingStoreName: "Ingresa el nombre de la tienda",
      missingMainBusiness: "Selecciona el giro principal",
      missingAddress: "Ingresa la dirección detallada",
      missingStorePhoto: "Sube una foto de tu tienda",
      missingIdCardFront: "Sube la foto frontal de tu identificación",
      missingIdCardBack: "Sube la foto trasera de tu identificación",
      editAndResubmit: "Editar y reenviar",
      goToDashboard: "Ir al panel de vendedor",
      status: {
        pendingTitle: "Solicitud en revisión",
        pendingText: "Tu solicitud de tienda está siendo revisada. Te avisaremos cuando sea aprobada.",
        successTitle: "Tienda aprobada",
        successText: "Tu tienda ha sido aprobada. Ve a tu panel de vendedor para administrarla.",
        rejectedTitle: "Solicitud rechazada",
        rejectedText: "Tu solicitud anterior no fue aprobada. Puedes revisar los detalles a continuación y enviarla de nuevo.",
      },
      enumerators: {
        mainBusiness: {
          fashion_clothing: "Moda y ropa",
          electronics: "Electrónica",
          beauty_cosmetics: "Belleza y cosméticos",
          home_living: "Hogar",
          sports_outdoors: "Deportes y aire libre",
          toys_hobbies: "Juguetes y pasatiempos",
          food_beverages: "Alimentos y bebidas",
          all: "Todo",
        },
      },
    },

    deliveryAddress: {
      title: "Dirección de entrega",
      noAddresses: "No se encontraron direcciones",
      addAddress: "Agregar una dirección",
      modalTitle: "Agregar dirección de entrega",
      editModalTitle: "Editar dirección de entrega",
      addressLabel: "Dirección de entrega",
      addressPlaceholder: "Ingresa la dirección detallada",
      contactNumberLabel: "Número de contacto",
      contactNumberPlaceholder: "Ingresa tu número de contacto",
      contactLabel: "Contacto",
      contactPlaceholder: "Ingresa una persona de contacto",
      submit: "Agregar una dirección",
      saveChanges: "Guardar cambios",
      createSuccess: "Dirección de entrega agregada con éxito",
      updateSuccess: "Dirección de entrega actualizada con éxito",
      destroySuccess: "Dirección de entrega eliminada con éxito",
      missingAddress: "Ingresa la dirección detallada",
      missingContactNumber: "Ingresa tu número de contacto",
      missingContact: "Ingresa una persona de contacto",
      confirmDeleteTitle: "¿Eliminar esta dirección?",
      confirmDeleteText: "Esta acción no se puede deshacer.",
      delete: "Eliminar",
      cancel: "Cancelar",
    },

    cart: {
      addedToCart: "Añadido al carrito",
    },

    topup: {
      title: "Recargar",
      rechargeMethods: "Métodos de recarga",
      selectWallet: "Selecciona la billetera de recarga",
      wallets: {
        eth: "ETH",
        btc: "BTC",
        usdt_trc20: "USDT (TRC-20)",
        usdt_erc20: "USDT (ERC-20)",
      },
      scanHint: "Escanea el código QR para recargar",
      copyAddress: "Copiar dirección de depósito",
      addressCopied: "Dirección copiada al portapapeles",
      fee: "Comisión",
      amount: "Monto de recarga",
      amountPlaceholder: "Ingresa el monto de recarga",
      usdtValue: "Valor en USDT",
      fetchingRate: "Obteniendo tasa en vivo…",
      enterAmountForValue: "Ingresa un monto para ver el valor en USDT",
      rateUnavailable: "Tasa en vivo no disponible; inténtalo de nuevo en breve",
      uploadVoucher: "Subir comprobante de recarga",
      uploadLabel: "Subir comprobante",
      submit: "Enviar recarga",
      noWalletSelected: "Selecciona una billetera",
      missingAmount: "Ingresa el monto de recarga",
      missingPhoto: "Sube el comprobante de recarga",
    },

    withdrawal: {
      title: "Centro de retiros",
      withdrawalMethods: "Métodos de retiro",
      selectWallet: "Selecciona el método de retiro",
      wallets: {
        eth: "ETH",
        btc: "BTC",
        usdt_trc20: "USDT (TRC-20)",
        usdt_erc20: "USDT (ERC-20)",
      },
      availableBalance: "Saldo disponible",
      fee: "Comisión",
      withdrawalAddress: "Dirección de retiro",
      addressPlaceholder: "Ingresa o pega la dirección de tu billetera de recepción",
      amount: "Monto de retiro",
      amountPlaceholder: "Ingresa el monto de retiro",
      withdrawalPassword: "Contraseña de retiro",
      passwordPlaceholder: "Ingresa la contraseña de retiro",
      submit: "Confirmar retiro",
      noWalletSelected: "Selecciona un método de retiro",
      missingAddress: "Ingresa la dirección de tu billetera de recepción",
      missingAmount: "Ingresa el monto de retiro",
      exceedsBalance: "El monto de retiro excede tu saldo disponible",
      missingPassword: "Ingresa tu contraseña de retiro",
      youWillReceive: "Recibirás",
      fetchingRate: "Obteniendo tasa en vivo…",
      enterAmountToPreview: "Ingresa un monto para ver lo que recibirás",
      rateUnavailable: "Tasa en vivo no disponible; inténtalo de nuevo en breve",
      belowFeeWarning: "Este monto es demasiado bajo para cubrir la comisión de red",
      notice1: "El monto acreditado se liquidará según las comisiones de tu cuenta receptora o el tipo de cambio en tiempo real.",
      notice2: "Tu retiro se acreditará en un plazo de 24 horas, ¡por favor espera con paciencia! Si no se acredita en 24 horas, contacta con atención al cliente en línea.",
    },

    wallet: {
      title: "Billetera",
      withdrawalMethod: "Información del método de retiro",
      username: "Nombre de Usuario",
      walletName: "Nombre de Billetera",
      choosePreferredCoin: "Elige la moneda preferida",
      walletAddress: "Dirección de Billetera",
      withdrawPassword: "Contraseña de Retiro",
      submit: "Enviar",
      note: "Por favor ten cuidado al completar esta información",
      requiredField: "*"
    },

    grab: {
      // Header Section
      greeting: "Hola {0} 👏",

      // Stats Cards
      totalAmount: "Monto Total",
      profitsAdded: "Las ganancias se agregarán aquí",
      todaysCommission: "Comisión de Hoy",
      commissionEarned: "Comisión Ganada",
      currency: "USD",

      // Optimization Section
      startOptimization: "Iniciar Optimización",
      progressCount: "{0}/{1}",

      // Game Section
      commissionRate: "Tasa de Comisión",
      exclusiveChannel: "Canal exclusivo para miembros exclusivos",
      startButton: "Iniciar",
      processing: "Procesando...",

      // Notice Section
      notice: "Aviso",
      supportHours: "Horario de Soporte en Línea 10:00 - 22:00",
      contactSupport: "¡Por favor contacta al soporte en línea para tu asistencia!"
    },

    grapModal: {
      orderTime: "Hora del Pedido",
      orderNumber: "Número de Pedido",
      totalOrderAmount: "Monto total del pedido",
      commission: "Comisión",
      estimatedReturn: "Retorno estimado",
      cancel: "Cancelar",
      submit: "Enviar",
      quantity: "X 1",
      currency: "USD"
    },

    actions: {
      event: "Eventos",
      tc: "Términos y Condiciones",
      certificate: "Certificado",
      faq: "Preguntas Frecuentes",
      company: "Empresa"
    },

    auth: {
      signin: {
        welcomeBack: "¡Bienvenido de nuevo!",
        signinToAccount: "Inicia sesión en tu cuenta de marketing",
        signinButton: "Iniciar Sesión",
        noAccount: "¿No tienes una cuenta?",
        signupHere: "Regístrate aquí."
      },
      signup: {
        createAccount: "Crear Cuenta",
        signupForAccount: "Regístrate para una cuenta de marketing",
        signupButton: "Registrarse",
        alreadyHaveAccount: "¿Ya tienes una cuenta?",
        phonePlaceholder: "Ingresa tu número de teléfono",
        searchCountries: "Buscar países..."
      }
    },

    csPage: {
      customerSupport: "Servicio al Cliente",
      hereToHelp: "¡Estamos aquí para ayudarte!",
      howCanWeHelp: "¿Cómo podemos ayudarte hoy?",
      platformNames: {
        whatsapp: "WhatsApp",
        telegram: "Telegram"
      }
    },
  },

  entities: {
    record: {
      menu: "Registros",
      fields: {
        user: "usuario",
        product: "producto",
        number: "Número de registro",
        status: "estado",
      },
      list: {
        title: "Lista de registros",
      },
      view: {
        title: "Detalle del Registro",
      },
      edit: {
        title: "Editar Registro",
      },
      create: {
        success: "Producto enviado exitosamente.",
      },
      update: {
        success: "Producto enviado exitosamente.",
      },
      destroy: {
        success: "Registro eliminado exitosamente",
      },
      destroyAll: {
        success: "Registro eliminado exitosamente",
      },
      enumerators: {
        status: {
          pending: "Pendiente",
          completed: "Completado",
          canceled: "Cancelado",
        },
      },
    },

    category: {
      name: "categoría",
      label: "Categorías",
      menu: "Categorías",
      exporterFileName: "categoria_exportacion",
      list: {
        menu: "Categorías",
        title: "Categorías",
      },
      create: {
        success: "Categoría guardada exitosamente",
      },
      update: {
        success: "Categoría guardada exitosamente",
      },
      destroy: {
        success: "Categoría eliminada exitosamente",
      },
      destroyAll: {
        success: "Categoría(s) eliminada(s) exitosamente",
      },
      edit: {
        title: "Editar Categoría",
      },
      fields: {
        id: "Id",
        name: "Nombre",
        slug: "Slug",
        photo: "Foto",
        metaKeywords: "MetaKeywords",
        metaDescriptions: "MetaDescriptions",
        status: "Estado",
        isFeature: "Es Destacado",
        serialRange: "Serial",
        serial: "Serial",
        createdAt: "Creado en",
        updatedAt: "Actualizado en",
        createdAtRange: "Creado en",
      },
      enumerators: {
        status: {
          enable: "Habilitar",
          disable: "Deshabilitar",
        },
      },
      placeholders: {},
      hints: {},
      new: {
        title: "Nueva Categoría",
      },
      view: {
        title: "Ver Categoría",
      },
      importer: {
        title: "Importar Categorías",
        fileName: "plantilla_importacion_categoria",
        hint: "Las columnas de Archivos/Imágenes deben ser las URL de los archivos separadas por espacio.",
      },
    },

    product: {
      name: "producto",
      label: "Productos",
      menu: "Productos",
      exporterFileName: "producto_exportacion",
      list: {
        menu: "Productos",
        title: "Productos",
      },
      create: {
        success: "Producto guardado exitosamente",
      },
      update: {
        success: "Producto guardado exitosamente",
      },
      destroy: {
        success: "Producto eliminado exitosamente",
      },
      destroyAll: {
        success: "Producto(s) eliminado(s) exitosamente",
      },
      edit: {
        title: "Editar Producto",
      },
      fields: {
        id: "Id",
        name: "Nombre",
        slug: "Slug",
        tags: "Etiquetas",
        video: "Video",
        specificationName: "Nombre de Especificación",
        specificationDesciption: "Descripción de Especificación",
        isSpecification: "Es Especificación",
        details: "Detalles",
        photo: "Foto",
        discountPriceRange: "Precio de Descuento",
        discountPrice: "Precio Actual",
        previousPriceRange: "Precio Anterior",
        previousPrice: "Precio Anterior",
        stockRange: "Inventario",
        stock: "Inventario",
        metaKeywords: "MetaKeywords",
        metaDesctiption: "Descripción Corta",
        status: "Estado",
        isType: "Tipo",
        dateRange: "Fecha",
        date: "Fecha",
        itemType: "Tipo de Artículo",
        file: "Archivo",
        link: "Enlace",
        fileType: "Tipo de Archivo",
        taxe: "Impuesto",
        category: "Categoría",
        subcategory: "Sub Categoría",
        childcategory: "Categoría Infantil",
        brand: "Marca",
        gallery: "Galería",
        createdAt: "Creado en",
        updatedAt: "Actualizado en",
        createdAtRange: "Creado en",
      },
      enumerators: {
        status: {
          enable: "Habilitar",
          disable: "Deshabilitar",
        },
        itemType: {
          physical: "Físico",
          digitale: "Digital",
        },
        fileType: {
          file: "Archivo",
          link: "Enlace",
        },
        isType: {
          new_arrival: "Nueva Llegada",
          feature_product: "Producto Destacado",
          top_pdroduct: "Producto Principal",
          best_product: "Mejor Producto",
          flash_deal_product: "Producto de Oferta Flash",
        },
      },
      placeholders: {},
      hints: {},
      new: {
        title: "Nuevo Producto",
      },
      view: {
        title: "Ver Producto",
      },
      importer: {
        title: "Importar Productos",
        fileName: "plantilla_importacion_producto",
        hint: "Las columnas de Archivos/Imágenes deben ser las URL de los archivos separadas por espacio.",
      },
    },
    transaction: {
      name: "transacción",
      label: "Transacciones",
      menu: "Transacciones",
      exporterFileName: "transaccion_exportacion",
      list: {
        menu: "Transacciones",
        title: "Transacciones",
      },
      create: {
        success: "Transacción enviada exitosamente",
      },
      update: {
        success: "Transacción guardada exitosamente",
      },
      destroy: {
        success: "Transacción eliminada exitosamente",
      },
      destroyAll: {
        success: "Transacción(es) eliminada(s) exitosamente",
      },
      edit: {
        title: "Editar Transacción",
      },
      fields: {
        id: "Id",
        amountRange: "Monto",
        amount: "Monto",
        email: "Correo Electrónico",
        tax: "Impuesto",
        currencySign: "Signo de Moneda",
        currencyValue: "Valor de Moneda",
        orderId: "Id de Pedido",
        createdAt: "Creado en",
        updatedAt: "Actualizado en",
        createdAtRange: "Creado en",
      },
      enumerators: {
        status: {
          pending: "Pendiente",
          completed: "Éxito",
          canceled: "Cancelado",
        },
      },
      placeholders: {},
      hints: {},
      new: {
        title: "Nueva Transacción",
      },
      view: {
        title: "Ver Transacción",
      },
      importer: {
        title: "Importar Transacciones",
        fileName: "plantilla_importacion_transaccion",
        hint: "Las columnas de Archivos/Imágenes deben ser las URL de los archivos separadas por espacio.",
      },
    },

    order: {
      name: "pedido",
      label: "Pedidos",
      menu: "Pedidos",
      exporterFileName: "pedido_exportacion",
      list: {
        menu: "Pedidos",
        title: "Pedidos",
      },
      create: {
        success: "Pedido guardado exitosamente",
      },
      update: {
        success: "Pedido guardado exitosamente",
      },
      destroy: {
        success: "Pedido eliminado exitosamente",
      },
      destroyAll: {
        success: "Pedido(s) eliminado(s) exitosamente",
      },
      edit: {
        title: "Editar Pedido",
      },
      fields: {
        id: "Id",
        userId: "Usuario",
        cart: "Carrito",
        shipping: "Envío",
        discountRange: "Descuento",
        discount: "Descuento",
        paymentMethod: "Método de Pago",
        taxe: "Impuesto",
        transactionNumber: "Número de Transacción",
        orderStatus: "Estado del Pedido",
        createdAt: "Creado en",
        updatedAt: "Actualizado en",
        createdAtRange: "Creado en",
      },
      enumerators: {
        orderStatus: {
          pending: "Pendiente",
          in_progress: "En Progreso",
          delivered: "Entregado",
          canceled: "Cancelado",
        },
      },
      placeholders: {},
      hints: {},
      new: {
        title: "Nuevo Pedido",
      },
      view: {
        title: "Ver Pedido",
      },
      importer: {
        title: "Importar Pedidos",
        fileName: "plantilla_importacion_pedido",
        hint: "Las columnas de Archivos/Imágenes deben ser las URL de los archivos separadas por espacio.",
      },
    },
  },

  user: {
    fields: {
      genre: "Género",
      username: "Nombre de usuario",
      walletName: "Nombre de billetera",
      id: "Id",
      confirmPassword: "Confirmar contraseña",
      avatars: "Avatar",
      invitationcode: "Código de invitación",
      email: "Correo electrónico",
      emails: "Correo(s) electrónico(s)",
      erc20: "Dirección de billetera ERC20",
      trc20: "Dirección de billetera TRC20",
      fullName: "Nombre",
      balance: "Saldo",
      firstName: "Nombre",
      lastName: "Apellido",
      status: "Estado",
      phoneNumber: "Número de teléfono",
      withdrawPassword: "Contraseña de retiro",
      sector: "Sector",
      employer: "Empleador",
      profession: "Profesión",
      address: "Dirección",
      birthDate: "Fecha de nacimiento",
      maritalStatus: "Estado civil",
      facebookLink: "Enlace de Facebook",
      sponsor: "Patrocinador",
      role: "Rol",
      createdAt: "Creado en",
      updatedAt: "Actualizado en",
      roleUser: "Rol/Usuario",
      roles: "Roles",
      createdAtRange: "Creado en",
      password: "Contraseña",
      oldPassword: "Contraseña anterior",
      newPassword: "Nueva contraseña",
      newPasswordConfirmation: "Confirmación de nueva contraseña",
      rememberMe: "Recordarme",
    },
    sector: {
      AGRO_ALIMENTAIRE: "Industria alimentaria",
      ASSURANCES: "Seguros",
      AUDIOVISUEL: "Audiovisual",
      BANCAIRE: "Bancario",
      CHIMIE: "Química",
      COMPOSANTS_AUTOMOBILES: "Componentes automotrices",
      DISTRIBUTION: "Distribución",
      DISTRIBUTION_AUTOMOBILE: "Distribución automotriz",
      DIVERS: "Varios",
      FINANCIER: "Financiero",
      HOLDING: "Holding",
      IMMOBILIER: "Bienes raíces",
      INDUSTRIEL: "Industrial",
      LEASING: "Arrendamiento",
      LOGISTIQUE_TRANSPORT: "Logística y transporte",
      PHARMACEUTIQUE: "Farmacéutico",
      SANTÉ: "Salud",
      TOURSIME: "Turismo",
      INFORMATION_TECHNOLOGY: "Tecnología de la información",
    },
    maritalStatus: {
      célébataire: "Soltero",
      marié: "Casado",
    },
    status: {
      active: "Activo",
      invited: "Invitado",
      "empty-permissions": "Esperando permisos",
      inactive: "Inactivo",
    },

    enumerators: {
      status: {
        USDT: "USDT",
        ETH: "ETH",
        BTC: "BTC",
      },
      gender: {
        male: "masculino",
        female: "femenino",
      }
    },
    invite: "Invitar",
    validations: {
      // eslint-disable-next-line
      email: "El correo electrónico ${value} no es válido",
    },
    title: "Usuarios",
    menu: "Usuarios",
    doAddSuccess: "Usuario(s) guardado(s) exitosamente",
    doUpdateSuccess: "Usuario guardado exitosamente",
    exporterFileName: "usuarios_exportacion",
    doDestroySuccess: "Usuario eliminado exitosamente",
    doDestroyAllSelectedSuccess: "Usuarios eliminados exitosamente",
    edit: {
      title: "Editar Usuario",
    },
    new: {
      title: "Invitar Usuario(s)",
      titleModal: "Invitar Usuario",
      emailsHint:
        "Separe múltiples direcciones de correo electrónico usando el carácter coma.",
    },
    view: {
      title: "Ver Usuario",
      activity: "Actividad",
    },
    importer: {
      title: "Importar Usuarios",
      fileName: "plantilla_importacion_usuarios",
      hint: "Las columnas de Archivos/Imágenes deben ser las URL de los archivos separadas por espacio. Las relaciones deben ser el ID de los registros referenciados separados por espacio. Los roles deben ser los ids de roles separados por espacio.",
    },
    errors: {
      userAlreadyExists: "Ya existe un usuario con este correo electrónico",
      userNotFound: "Usuario no encontrado",
      revokingOwnPermission: `No puede revocar su propio permiso de administrador`,
    },
  },

  buttons: {
    login: "Iniciar sesión",
    registerNow: "Regístrate ahora",
    signup: "Registrarse",
    start: "Comenzar",
    orders: "Pedidos",
    submit: "Enviar",
    backtohome: "Volver a inicio",
    confirm: "Confirmar",
    logout: "Cerrar sesión",
    getstarted: "Empezar",
  },
  text: {
    welcome: "Bienvenido",
    discover: "Descubre ofertas exclusivas solo para ti",
    signin: "Iniciar sesión",
    haveaccount: "¿Ya tienes una cuenta?",
    noaccount: "¿No tienes una cuenta?",
    showingnow: "En cartelera",
    comingsoon: "Próximamente",
    termsconditions: "Términos y condiciones",
    todayearning: "Ganancias de hoy",
    accountbalance: "Saldo de la cuenta",
    freezebalance: "Saldo congelado",
    sumbitInformation: "Enviar información",
    order: "Pedido",
    pending: "Pendiente",
    completed: "Completado",
    canceled: "Cancelado",
    notransaction: "¡No hay transacciones hasta ahora!",
    createdtime: "Hora de creación",
    creationtime: "Hora de creación",
    orderNumber: "Número de pedido",
    orderamount: "Monto del pedido",
    income: "Ingresos",
    buyerating: "Calificación del comprador",
    uid: "UID",
    promotioncode: "Código de promoción",
    walletamount: "Monto de la billetera",
    creditassesment: "Evaluación de crédito",
    myfinance: "Mis finanzas",
    withdraw: "Retirar",
    mydetails: "Mis detalles",
    profile: "Perfil",
    wallet: "Billetera",
    other: "Otro",
    customersupport: "Atención al cliente",
    transaction: "Transacción",
    taskshistory: "Historial de tareas",
    security: "Seguridad",
    sponsor: `Nuestra seguridad es nuestra máxima prioridad y queremos asegurarnos de que
              estés protegido contra cualquier posible riesgo. Ten en cuenta que
              nunca te pediremos que envíes dinero a una dirección desconocida. Antes
              de realizar cualquier pago, te pedimos que verifiques los detalles con nosotros.`,
  },
  errors: {
    backToHome: "Volver a inicio",
    continueShopping: "Seguir comprando",
    title403: "Acceso denegado",
    title404: "Página no encontrada",
    title500: "Algo salió mal",
    403: "Lo sentimos, no tienes acceso a esta página",
    404: "Lo sentimos, la página que visitaste no existe",
    500: "Lo sentimos, el servidor está reportando un error",
    429: "Demasiadas solicitudes. Por favor, inténtalo más tarde.",
    forbidden: {
      message: "Prohibido",
    },
    validation: {
      message: "Ocurrió un error",
    },
    defaultErrorMessage: "Ups, ocurrió un error",
  },

  withdraw: {
    withdrawamount: "Monto de retiro",
    Withdrawpassword: "Contraseña de retiro",
    availablebalance: "Saldo disponible",
    rules: "Descripción de las reglas",
    rule1: "El retiro mínimo es de $20",
    rule2: "El pago se realizará dentro de las 24 horas posteriores a la solicitud de retiro",
    rule3: "La falta de envío de pedidos diarios completos impide el retiro, todos los productos deben ser enviados para su retiro"
  },
  profile: {
    profile: "Perfil",
    fullname: "Nombre completo",
    email: "Correo electrónico",
    phonenumber: "Número de teléfono",
    country: "País",
    Invitationcode: "Código de invitación"
  },
  wallet: {
    wallet: "Billetera",
    info: "Información del método de retiro",
    username: "Nombre de usuario",
    walletname: "Nombre de la billetera",
    walletaddress: "Dirección de la billetera",
    note: "Nota",
    notedesctiption: "Por favor, ten cuidado al completar esta información."
  },

  cs: {
    cs: "Atención al cliente",
    note: "Si tienes alguna pregunta o encuentras algún problema, envíanos un correo electrónico o chatea con nuestro equipo de soporte en línea.",
    contactnow: "Contactar ahora"
  },
  transaction: {
    transaction: "Transacción",
    all: "Todo",
    withdraw: "Retiro",
    dposit: "Depósito",
    notransaction: "¡No hay transacciones hasta ahora!"
  },
  order: {
    order: "Pedido",
    completed: "Completado",
    pending: "Pendiente",
    canceled: "Cancelado",
    ordertime: "Hora del pedido",
    ordernumber: "Número de pedido",
    total: "Monto total del pedido",
    commission: "Comisión",
    return: "Retorno estimado"
  },

  security: {
    changepassword: "Cambiar contraseña",
    oldpassword: "Contraseña antigua",
    newpassword: "Nueva contraseña",
    confirmpassword: "Confirmar contraseña",
    note: "Nota",
    notedesc: "Por favor, completa esta información con cuidado"
  },

  auth: {
    tenants: "Espacios de trabajo",
    singindesc: "Ingresa tu correo electrónico y contraseña para iniciar sesión",
    signupdesc: "Ingresa tu correo electrónico y contraseña para registrarte",
    profile: {
      title: "Perfil",
      success: "Perfil actualizado con éxito",
      vip: "Felicidades por tu suscripción",
    },
    createAnAccount: "Crear una cuenta",
    rememberMe: "Recuérdame",
    forgotPassword: "Olvidé mi contraseña",
    signin: "Iniciar sesión",
    signup: "Registrarse",
    signout: "Cerrar sesión",
    alreadyHaveAnAccount: "¿Ya tienes una cuenta? Inicia sesión.",
    social: {
      errors: {
        "auth-invalid-provider":
          "Este correo ya está registrado con otro proveedor.",
        "auth-no-email": "El correo asociado a esta cuenta es privado o inexistente.",
      },
    },
    signinWithAnotherAccount: "Iniciar sesión con otra cuenta",
    emailUnverified: {
      message: `Por favor, confirma tu correo en <strong>{0}</strong> para continuar.`,
      submit: "Reenviar correo de verificación",
    },
    emptyPermissions: {
      message: "Aún no tienes permisos. Espera a que el administrador te los otorgue.",
    },
    passwordResetEmail: {
      message: "Enviar correo de restablecimiento de contraseña",
      error: "Correo no reconocido",
    },
    passwordReset: {
      message: "Restablecer contraseña",
    },
    passwordChange: {
      title: "Cambiar contraseña",
      success: "Contraseña cambiada con éxito",
      mustMatch: "Las contraseñas deben coincidir",
    },
    emailAddressVerificationEmail: {
      error: "Correo no reconocido",
    },
    verificationEmailSuccess: "Correo de verificación enviado con éxito",
    passwordResetEmailSuccess: "Correo de restablecimiento de contraseña enviado con éxito",
    passwordResetSuccess: "Contraseña cambiada con éxito",
    verifyEmail: {
      success: "Correo verificado con éxito.",
      message: "Un momento, estamos verificando tu correo...",
    },
  },

  tabbarmenue: {
    home: "Inicio",
    rate: "Calificar",
    profile: "Perfil"
  },

  validation: {
    mixed: {
      default: "${path} no es válido",
      required: "${path} es obligatorio",
      oneOf: "${path} debe ser uno de los siguientes valores: ${values}",
      notOneOf: "${path} no debe ser uno de los siguientes valores: ${values}",
      notType: ({ path, type, value, originalValue }) => {
        return `${path} debe ser un ${type}`;
      },
    },
    string: {
      length: "${path} debe tener exactamente ${length} caracteres",
      min: "${path} debe tener al menos ${min} caracteres",
      max: "${path} debe tener como máximo ${max} caracteres",
      matches: '${path} debe coincidir con el siguiente formato: "${regex}"',
      email: "${path} debe ser un correo electrónico válido",
      url: "${path} debe ser una URL válida",
      trim: "${path} debe ser una cadena sin espacios al inicio y al final",
      lowercase: "${path} debe estar en minúsculas",
      uppercase: "${path} debe estar en mayúsculas",
      selected: "${path} debe ser seleccionado",
    },
    number: {
      min: "${path} debe ser mayor o igual a ${min}",
      max: "${path} debe ser menor o igual a ${max}",
      lessThan: "${path} debe ser menor que ${less}",
      moreThan: "${path} debe ser mayor que ${more}",
      notEqual: "${path} no debe ser igual a ${notEqual}",
      positive: "${path} debe ser un número positivo",
      negative: "${path} debe ser un número negativo",
      integer: "${path} debe ser un número entero",
    },
    date: {
      min: "${path} debe ser posterior a ${min}",
      max: "${path} debe ser anterior a ${max}",
    },
    boolean: {},
    object: {
      noUnknown:
        "${path} no debe contener claves no especificadas en el objeto",
    },
    array: {
      min: ({ min, path }) =>
        min === 1
          ? `${path} es obligatorio`
          : `${path} debe contener al menos ${min} elementos`,
      max: "${path} debe contener como máximo ${max} elementos",
    },
  },
  /* eslint-disable */
  fileUploader: {
    upload: "Subir",
    image: "Debe subir una imagen",
    size: "El archivo es demasiado grande. El tamaño máximo permitido es {0}",
    formats: `Formato no válido. Debe ser uno de los siguientes: {0}.`,
  },

  estore: {
    auth: {
      login: {
        title: "Iniciar sesión",
        tagline: "Compra más, vive mejor",
        phoneOrEmail: "Teléfono / Correo electrónico",
        phoneOrEmailPlaceholder: "Teléfono / Correo electrónico",
        password: "Ingresa la contraseña",
        passwordPlaceholder: "Contraseña",
        forgotPassword: "Olvidé mi contraseña",
        noAccount: "¿No tienes cuenta?",
        signUp: "Regístrate",
        loginButton: "Iniciar sesión",
      },
    },
    header: {
      home: "Inicio",
      searchPlaceholder: "Buscar productos, marcas y categorías...",
      search: "Buscar",
      cart: "Carrito",
      loginRegister: "Iniciar sesión / Registrarse",
      myAccount: "Mi cuenta",
      myOrders: "Mis pedidos",
      signOut: "Cerrar sesión",
      allCategories: "Todas las categorías",
      account: "Cuenta",
    },
    categories: {
      "Women Clothing": "Ropa de Mujer",
      "Women Shoes": "Zapatos de Mujer",
      "Women Bags": "Bolsos de Mujer",
      "Accessories": "Accesorios",
      "Lifestyle": "Estilo de vida",
      "Global Purchase": "Compra global",
      "Girls": "Niñas",
      "Boys": "Niños",
      "Men Clothing": "Ropa de Hombre",
      "Men Shoes": "Zapatos de Hombre",
      "Men Bags": "Bolsos de Hombre",
    },
    pc: {
      common: {
        saving: "Guardando...",
        confirm: "Confirmar",
        save: "Guardar",
        cancel: "Cancelar",
        loading: "Cargando...",
        edit: "Editar",
        delete: "Eliminar",
        submit: "Enviar",
        update: "Actualizar",
      },
      records: {
        transactions: "Transacciones",
        processing: "Procesando",
        completed: "Completado",
        canceled: "Cancelado",
        id: "ID",
        time: "Hora",
        viewProof: "Ver comprobante",
      },
      messages: {
        title: "Mensajes",
        markAllRead: "Marcar todo como leído",
        loading: "Cargando...",
        empty: "Aún no hay mensajes.",
        today: "Hoy",
        earlier: "Anteriores",
        amount: "Monto",
        depositSuccess: "Depósito exitoso",
        depositCanceled: "Depósito cancelado",
        withdrawSuccess: "Retiro exitoso",
        withdrawCanceled: "Retiro cancelado",
        systemNotice: "Aviso del sistema",
        alert: "Alerta",
        notification: "Notificación",
      },
      withdrawal: {
        deductedFromBalance: "Deducido del saldo",
      },
      myAccount: {
        title: "Mi cuenta",
        storeId: "ID de la tienda",
        id: "ID",
        copied: "Copiado",
        copy: "Copiar",
        idCopied: "{0} copiado al portapapeles",
        username: "Nombre de usuario",
        phoneNumber: "Número de teléfono",
        notBound: "No vinculado",
        email: "Correo electrónico",
        loginPassword: "Contraseña de inicio de sesión",
        change: "Cambiar",
        changeLoginPassword: "Cambiar contraseña de inicio de sesión",
        currentPassword: "Contraseña actual",
        currentPasswordPlaceholder: "Ingresa tu contraseña actual",
        newPassword: "Nueva contraseña",
        newPasswordPlaceholder: "Al menos 6 caracteres",
        confirmNewPassword: "Confirmar nueva contraseña",
        confirmNewPasswordPlaceholder: "Vuelve a ingresar la nueva contraseña",
        cancel: "Cancelar",
        saveChanges: "Guardar cambios",
        securityHint: "Mantén tu cuenta segura — nunca compartas tu contraseña ni tus códigos de verificación con nadie.",
      },
      applyMerchant: {
        loading: "Cargando...",
        idCard: "Identificación",
        submitting: "Enviando...",
      },
      wholesale: {
        title: "Gestión de mayoreo",
        all: "Todo",
        lowestPrice: "Precio más bajo",
        highestPrice: "Precio más alto",
        filter: "Filtrar",
        loadingItems: "Cargando artículos…",
        showing: "Mostrando",
        of: "de",
        item: "artículo",
        items: "artículos",
        inCategory: "en {0}",
        emptyTitle: "Ningún producto coincide con este filtro",
        emptyText: "Prueba con otra categoría o rango de precio.",
        added: "Agregado",
        add: "Agregar",
        loadingMore: "Cargando…",
        reachedEnd: "Has llegado al final.",
        salesPrice: "Precio de venta",
        wholesalePrice: "Precio de mayoreo",
        cancel: "Cancelar",
        confirming: "Confirmando…",
        confirmListing: "Confirmar publicación",
        alreadyListed: "Ya agregado a tus publicaciones de mayoreo.",
        addedToListings: '"{0}" agregado a tus publicaciones de mayoreo.',
      },
      sellerSetup: {
        title: "Configuración",
        loading: "Cargando configuración de la tienda…",
        noStoreTitle: "No se encontró ninguna tienda para esta cuenta",
        noStoreText: "Solicita ser vendedor para administrar la configuración de la tienda.",
        storeInformation: "Información de la tienda",
        storeInfoSub: "Actualiza los detalles de tu tienda e información comercial.",
        storeLogo: "Logo de la tienda",
        uploadLogoSub: "Sube un logo para tu tienda",
        store: "Tienda",
        uploading: "Subiendo…",
        uploadLogo: "Subir logo",
        storeName: "Nombre de la tienda *",
        storeNamePlaceholder: "Nombre de tu tienda",
        storeNameRequired: "El nombre de la tienda es obligatorio.",
        storeDescription: "Descripción de la tienda",
        storeDescriptionPlaceholder: "Describe tu tienda...",
        businessEmail: "Correo electrónico comercial *",
        businessPhone: "Teléfono comercial",
        businessPhonePlaceholder: "Número de teléfono",
        saving: "Guardando…",
        saveChanges: "Guardar cambios",
        storeBanner: "Banner de la tienda",
        storeBannerSub: "Se muestra en la parte superior de la página de tu tienda.",
        noBanner: "Ningún banner subido",
        uploadBanner: "Subir banner",
      },
      productManagement: {
        title: "Gestión de productos",
        addProduct: "+ Agregar producto",
        searchPlaceholder: "Buscar productos...",
        loadingProducts: "Cargando tus productos…",
        showing: "Mostrando",
        of: "de",
        products: "productos",
        emptyTitle: "Aún no hay productos listados",
        emptyText: "Agrega productos desde la Gestión de mayoreo para verlos aquí.",
        goToWholesale: "Ir a Gestión de mayoreo",
        noMatchesTitle: "Sin coincidencias",
        noMatchesText: "Ningún producto coincide con",
        wholesale: "Mayoreo",
        sales: "Venta",
      },
      sellerOrders: {
        title: "Pedidos de la tienda",
        lumpSum: "Monto total",
        salesProfit: "Ganancia de venta",
        wholesalePrice: "Precio de mayoreo",
        actualPayment: "Pago real",
        processing: "Procesando…",
        goToShipment: "Ir al envío",
        profitCredited: "Ganancia acreditada",
        refunded: "Reembolsado",
        awaitingReview: "Esperando revisión",
        paid: "Pagado",
        waitingForDelivery: "Esperando entrega",
        waitingForReceipt: "Esperando recepción",
        completed: "Completado",
        refundAfterSales: "Reembolso / Posventa",
        emptyTitle: "Nada aquí todavía",
        emptyText: "Los pedidos en esta etapa aparecerán aquí.",
      },
      sellerHub: {
        loadingShop: "Cargando tu tienda...",
        storeFrozen: "Tienda congelada",
        frozenText: "Tu cuenta de vendedor ha sido congelada temporalmente porque un pedido quedó esperando entrega demasiado tiempo. No podrás acceder al panel de vendedor hasta que esto se resuelva.",
        contactSupport: "Contactar atención al cliente",
        backToBuyer: "Volver a la cuenta de comprador",
        accountBalance: "Saldo de la cuenta",
        viewShop: "Ver tienda",
        orderFulfillment: "Cumplimiento de pedidos",
        waitingForDelivery: "Esperando entrega",
        waitingForReceipt: "Esperando recepción",
        completed: "Completado",
        refundAfterSales: "Reembolso / Posventa",
        quickActions: "Acciones rápidas",
        topUp: "Recargar",
        withdrawal: "Retiro",
        wholesaleCatalog: "Catálogo de mayoreo",
        manageProducts: "Administrar productos",
      },
      shopDetails: {
        title: "Detalles de la tienda",
        loading: "Cargando detalles de la tienda…",
        noStoreTitle: "Aún no tienes una tienda",
        noStoreText: "Solicita ser vendedor para ver los detalles de tu tienda aquí.",
        applyNow: "Solicitar ahora",
        accountBalance: "Saldo de la cuenta",
        storeHealth: "Salud de la tienda",
        creditScore: "Puntaje de crédito",
        followers: "Seguidores",
        todaysOrders: "Pedidos de hoy",
        cumulativeOrderQty: "Cantidad acumulada de pedidos",
        salesPerformance: "Rendimiento de ventas",
        todaysSales: "Ventas de hoy",
        totalSales: "Ventas totales",
        todaysProfit: "Ganancia de hoy",
        totalProfit: "Ganancia total",
      },
      mineSeller: {
        menu: {
          dashboard: "Panel",
          wholesale: "Gestión de mayoreo",
          shopDetails: "Detalles de la tienda",
          products: "Gestión de productos",
          orders: "Pedidos",
          billing: "Historial de facturación",
          addresses: "Direcciones de entrega",
          support: "Centro de servicio",
          loginPassword: "Contraseña de inicio de sesión",
          paymentPassword: "Contraseña de pago",
          settings: "Configuración",
        },
        myStore: "Mi tienda",
        seller: "Vendedor",
        switchToBuyer: "Cambiar a cuenta de comprador",
        logOut: "Cerrar sesión",
      },
      mineHub: {
        storeFrozen: "Tienda congelada",
        storeFrozenSub: "Tu cuenta de vendedor ha sido congelada temporalmente.",
        contactSupport: "Contactar atención al cliente",
        storeApproved: "¡Solicitud de tienda aprobada!",
        storeApprovedSub: "Tu cuenta de vendedor está activa.",
        goToSellerDashboard: "Ir al panel de vendedor",
        accountBalance: "Saldo de la cuenta",
        myAccount: "Mi cuenta",
        myStuff: "Mis cosas",
        myCollection: "Mi colección",
        myBrowse: "Vistos recientemente",
        myOrders: "Mis pedidos",
        viewAll: "Ver todo",
        paymentPending: "Pago pendiente",
        inShipping: "En envío",
        received: "Recibido",
        completed: "Completado",
        refund: "Reembolso",
        quickActions: "Acciones rápidas",
        topUp: "Recargar",
        withdrawal: "Retiro",
        sellerDashboard: "Panel de vendedor",
        applyMerchant: "Solicitar ser vendedor",
      },
      addresses: {
        title: "Direcciones de entrega",
        addAddress: "+ Agregar dirección",
        editAddress: "Editar dirección",
        addNewAddress: "Agregar nueva dirección",
        address: "Dirección",
        addressPlaceholder: "Calle, ciudad, estado, código postal",
        contactName: "Nombre de contacto",
        contactNamePlaceholder: "Nombre del destinatario",
        contactNumber: "Número de contacto",
        contactNumberPlaceholder: "Número de teléfono",
        cancel: "Cancelar",
        saving: "Guardando...",
        saveAddress: "Guardar dirección",
        emptyTitle: "No hay direcciones guardadas",
        emptyText: "Agrega una dirección de entrega para agilizar el pago.",
        deleteConfirm: "¿Eliminar esta dirección?",
        yesDelete: "Sí, eliminar",
        edit: "Editar",
        delete: "Eliminar",
      },
      settings: {
        title: "Configuración",
        publicProfile: "Perfil público",
        publicProfileSub: "Esta información se mostrará en tus reseñas y perfil.",
        uploading: "Subiendo…",
        changeAvatar: "Cambiar avatar",
        displayName: "Nombre para mostrar",
        displayNamePlaceholder: "Tu nombre para mostrar",
        displayNameRequired: "El nombre para mostrar es obligatorio.",
        emailAddress: "Correo electrónico",
        emailHint: "Contacta a soporte para cambiar tu correo electrónico.",
        saving: "Guardando…",
        saveChanges: "Guardar cambios",
        accountStats: "Estadísticas de la cuenta",
        orders: "Pedidos",
        reviews: "Reseñas",
        wishlist: "Lista de deseos",
        joined: "Se unió",
      },
      myOrders: {
        title: "Mis pedidos",
        emptyTitle: "Aún no hay pedidos",
        emptyText: "Los pedidos que realices aparecerán aquí.",
        startShopping: "Empezar a comprar",
        order: "Pedido",
        total: "Total",
        statusPending: "Pendiente",
        statusConfirmed: "Confirmado",
        statusShipped: "Enviado",
        statusDelivered: "Entregado",
        statusCancelled: "Cancelado",
      },
      balance: {
        title: "Saldo",
        totalBalance: "Saldo total",
        accountBalance: "Saldo de la cuenta",
        availableBalance: "Saldo disponible",
        deposit: "Depósito",
        withdraw: "Retirar",
        hint: "El saldo disponible se puede usar para compras y retirar a tu billetera vinculada.",
      },
      depositRecord: {
        title: "Historial de depósitos",
        totalDeposited: "Total depositado",
      },
      withdrawalRecord: {
        title: "Historial de retiros",
        totalWithdrawn: "Total retirado",
      },
      paymentPassword: {
        title: "Contraseña de pago",
        oldPlaceholder: "Ingresa tu contraseña de transacción actual",
        newPlaceholder: "Ingresa tu nueva contraseña de transacción",
        confirmPlaceholder: "Confirma tu nueva contraseña de transacción",
        hint: "Tu contraseña de transacción se usa para confirmar retiros y otros cambios sensibles de la cuenta. Mantenla segura y nunca la compartas con nadie.",
      },
      login: {
        brandTitle: "Compra más, vive mejor",
        brandSubtitle: "Miles de productos, precios inmejorables, entregados a tu puerta.",
        title: "Bienvenido de nuevo",
        subtitle: "Inicia sesión para seguir comprando",
        password: "Contraseña",
        forgotPassword: "¿Olvidaste tu contraseña?",
      },
      register: {
        brandTitle: "Únete a Estore hoy",
        brandSubtitle: "Crea una cuenta para rastrear pedidos, guardar direcciones y pagar más rápido.",
        title: "Crea tu cuenta",
        subtitle: "Únete a Estore y compra de forma más inteligente",
        email: "Correo electrónico",
        emailPlaceholder: "Ingresa tu correo electrónico",
        getOtp: "Obtener OTP",
        otp: "Código de verificación",
        otpPlaceholder: "Ingresa el código enviado a tu correo electrónico",
        phoneNumber: "Número de teléfono",
        phoneNumberPlaceholder: "Número de teléfono",
        password: "Contraseña",
        passwordPlaceholder: "Crea una contraseña",
        confirmPassword: "Confirmar contraseña",
        confirmPasswordPlaceholder: "Vuelve a ingresar tu contraseña",
        registerButton: "Registrarse",
        haveAccount: "¿Ya tienes una cuenta?",
        logIn: "Iniciar sesión",
      },
      checkout: {
        loading: "Cargando...",
        qty: "Cant.",
      },
      mine: {
        myBrowse: {
          title: "Vistos recientemente",
          emptyTitle: "Aún no hay historial de navegación",
          emptyText: "Los productos que veas aparecerán aquí para que puedas continuar donde lo dejaste.",
          startShopping: "Empezar a comprar",
        },
        myCollection: {
          title: "Mi colección",
          emptyTitle: "Aún no hay artículos guardados",
          emptyText: "Los productos que guardes aparecerán aquí para que los encuentres rápidamente.",
          browseProducts: "Explorar productos",
        },
        support: {
          title: "Chat en vivo",
          emptyTitle: "Nuestro equipo de soporte te responderá pronto",
          emptyText: "Inicia una conversación y responderemos lo antes posible.",
        },
        menu: {
          account: "Mi cuenta",
          balance: "Saldo",
          orders: "Mis pedidos",
          deposit: "Depósito",
          depositRecord: "Historial de depósitos",
          withdrawal: "Retiro",
          withdrawalRecord: "Historial de retiros",
          paymentPassword: "Contraseña de pago",
          addresses: "Direcciones de entrega",
          collection: "Mi colección",
          browse: "Vistos recientemente",
          messages: "Mensajes",
          settings: "Configuración",
          support: "Chat en vivo",
        },
        goToSellerDashboard: "Ir al panel de vendedor",
        applyMerchant: "Solicitar ser vendedor",
        logOut: "Cerrar sesión",
      },
      cart: {
        title: "Mi carrito",
        empty: "Tu carrito está vacío.",
        continueShopping: "Seguir comprando",
        product: "Producto",
        price: "Precio",
        quantity: "Cantidad",
        subtotal: "Subtotal",
        remove: "Quitar",
        orderSummary: "Resumen del pedido",
        items: "Artículos",
        shipping: "Envío",
        calculatedAtCheckout: "Calculado al pagar",
        total: "Total",
        proceedToCheckout: "Proceder al pago",
        continueShoppingArrow: "← Seguir comprando",
      },
      productDetails: {
        notFound: "Producto no encontrado.",
        noImage: "Sin imagen",
        description: "Descripción",
        quantity: "Cantidad",
        addToCart: "Agregar al carrito",
        buyNow: "Comprar ahora",
      },
      classification: {
        searchPlaceholder: "Buscar en categorías",
        categories: "Categorías",
        loading: "Cargando...",
        noCategories: "Sin categorías",
        category: "Categoría",
        noProducts: "No se encontraron productos en esta categoría.",
        loadingMore: "Cargando...",
        reachedEnd: "Has llegado al final.",
      },
      home: {
        allCategories: "Todas las categorías",
        loading: "Cargando...",
        noCategories: "Aún no hay categorías.",
        browseAll: "Explorar todas las categorías",
        aboutSection: "Sobre E-store Fashion",
        aboutUs: "Sobre nosotros",
        joinUs: "Únete a nosotros",
        contactUs: "Contáctanos",
        exchangeCooperation: "Intercambio y cooperación",
        merchantAgreement: "Acuerdo de vendedor",
        supplierCooperation: "Cooperación de proveedores",
        strategicManagementHeading: "Gestión estratégica",
        strategicManagement: "Gestión estratégica",
        precisionOperation: "Operación de precisión",
        courseDriven: "Impulsado por cursos",
        faq: "Preguntas frecuentes",
        downloadApp: "Descargar la app",
        globalPurchase: "Compra global",
        heroWelcomeBack: "Bienvenido de nuevo",
        heroWelcomeGuest: "Bienvenida, hermosa",
        heroGreeting: "Hola, {0} 👋",
        heroDefaultTitle: "Con estilo para cada mujer",
        heroSlide1Text: "Vestidos, zapatos y accesorios seleccionados para mujeres que aman brillar.",
        heroSlide1Cta: "Comprar mujer",
        heroSlide2Eyebrow: "Tiempo limitado",
        heroSlide2Title: "Hasta 50% de descuento en moda femenina",
        heroSlide2Text: "Renueva tu guardarropa con los imprescindibles de la temporada.",
        heroSlide2Cta: "Ver ofertas",
        heroSlide3Eyebrow: "Nuevos ingresos",
        heroSlide3Title: "Joyería que amarás",
        heroSlide3Text: "Desde collares delicados hasta bolsos statement — completa cada look con estilo.",
        heroSlide3Cta: "Explorar accesorios",
        heroSlide4Eyebrow: "Solo esta semana",
        heroSlide4Title: "Envío gratis en pedidos de $50+",
        heroSlide4Text: "No se necesita código — el descuento se aplica automáticamente al pagar.",
        heroSlide4Cta: "Empezar a comprar",
        trustShippingTitle: "Envío gratis",
        trustShippingText: "En pedidos superiores a $50",
        trustReturnsTitle: "Devoluciones fáciles",
        trustReturnsText: "30 días para devoluciones",
        trustCheckoutTitle: "Pago seguro",
        trustCheckoutText: "Tus datos permanecen protegidos",
        trustSupportTitle: "Soporte 24/7",
        trustSupportText: "Estamos aquí cuando nos necesites",
        flashDeals: "Ofertas flash",
        limitedTime: "Tiempo limitado",
        justForYou: "Solo para ti",
        seeAll: "Ver todo",
        noMoreProducts: "No hay más productos para mostrar en este momento.",
        add: "Agregar",
        previousSlide: "Diapositiva anterior",
        nextSlide: "Siguiente diapositiva",
        close: "Cerrar",
        infoEmpty: "Este contenido aún no se ha agregado. Vuelve pronto.",
      },
      footer: {
        blurb: "Todo lo que necesitas, entregado a tu puerta.",
        shopHeading: "Tienda",
        accountHeading: "Cuenta",
        supportHeading: "Soporte",
        helpCenter: "Centro de ayuda",
        shipping: "Envío y entrega",
        returns: "Devoluciones",
        deliveryAddresses: "Direcciones de entrega",
        login: "Iniciar sesión",
        createAccount: "Crear cuenta",
        rights: "© {0} Estore. Todos los derechos reservados.",
      },
    },
  },

};

export default es;
