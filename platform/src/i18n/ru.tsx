import Withdraw from "src/view/pages/withdraw/Withdraw";

const ru = {
  app: {
    title: "Zalando"
  },




  pages: {
    home: {
      levels: "VIP Уровни",
      chooseLevel: "Выберите свой уровень, чтобы максимизировать доход",
      welcome: "Добро пожаловать",
      announcement: "Уважаемые пользователи, платформа E-clicks Digital вернулась к лучшему и нормальному состоянию, продолжайте зарабатывать как можно больше с платформы",

      // Action Buttons
      services: "Сервисы",
      events: "События",
      about: "О нас",
      terms: "Условия",
      certificate: "Сертификат",
      faqs: "ЧаВО",

      // VIP Level Cards
      currentLevel: "Текущий",
      upgrade: "Обновить",
      profitNormal: "прибыль с обычных продуктов",
      profitPremium: "прибыль с премиум продуктов",
      maxOrders: "Макс. заказов в день",

      // Modal
      modal: {
        levelDetails: "Детали Уровня",
        levelLimit: "Лимит Уровня",
        dailyOrders: "Ежедневные Заказы",
        commissionRate: "Ставка Комиссии",
        cancel: "Отмена",
        upgradeNow: "Обновить Сейчас"
      }
    },
    tabBottomNavigator: {
      home: "Главная",
      grap: "Захват",
      records: "Записи",
      starting: "Старт"
    },


    prizeModal: {
      congratulations: "Поздравляем!",
      spinning: "Крутим...",
      prizeWon: "Вы выиграли!",
      currency: "USD",
      prizeBreakdown: "Разбивка Приза",
      totalAmount: "Общая сумма",
      yourWinnings: "Ваш выигрыш",
      claimPrize: "Получить Приз",
      celebrationMessage: "Наслаждайтесь наградой!",
    },
    transaction: {
      title: "История Транзакций",
      filters: {
        all: "Все",
        withdraw: "Вывод",
        deposit: "Пополнение"
      },
      recentTransactions: "Недавние Транзакции",
      transactionCount: "{0} транзакций",
      types: {
        deposit: "Пополнение",
        withdrawal: "Вывод"
      },
      status: {
        completed: "Завершено",
        processing: "В обработке",
        canceled: "Отменено"
      },
      amount: {
        deposit: "+${0}",
        withdraw: "-${0}",
        canceled: "${0}"
      }
    },

    profile: {
      title: "Профиль",
      invitationCode: "Код Приглашения",
      creditScore: "Кредитный Рейтинг",
      balance: "Баланс",
      todayProfit: "Сегодняшняя Прибыль",
      frozenAmount: "Замороженная Сумма",
      usd: "USD",

      // Menu Sections
      myFinancial: "Мои Финансы",
      myDetails: "Мои Данные",
      other: "Другое",

      // Financial Items
      recharge: "Пополнить",
      withdraw: "Вывести",

      // Details Items
      contactUs: "Связаться с нами",
      profile: "Профиль",
      updateWithdrawal: "Обновить данные вывода",

      // Other Items
      transaction: "Транзакция",
      tasksHistory: "История Задач",
      security: "Безопасность",
      notifications: "Уведомления",
      languages: "Языки",

      // Buttons
      logout: "Выйти",
      confirm: "Подтвердить",
      copied: "Скопировано",

      // Modals
      rechargeModal: {
        title: "Пополнение",
        text: "Пожалуйста, свяжитесь со службой поддержки для пополнения"
      },
      withdrawModal: {
        title: "Вывод",
        text: "Пожалуйста, свяжитесь со службой поддержки для продолжения вывода."
      }
    },

    team: {
      title: "Профиль",
      personalInformation: "Личная Информация",
      accountDetails: "Ваши данные аккаунта и личная информация",

      // Info Items
      fullName: "Полное Имя",
      email: "Электронная почта",
      phoneNumber: "Номер Телефона",
      country: "Страна",
      gender: "Пол",
      invitationCode: "Код Приглашения",

      // Gender Values
      genderNotSpecified: "Не указано",

      // Placeholders
      notAvailable: "—"
    },

    language: {
      title: "Язык Приложения",
      selectLanguage: "Выбрать Язык",
      choosePreferred: "Выберите предпочитаемый язык",
      searchPlaceholder: "Поиск языков...",
      currentLanguage: "Текущий Язык",

      // Language names (if needed for dynamic content)
      languages: {
        english: "Английский",
        french: "Французский",
        russian: "Русский",
        german: "Немецкий",
        spanish: "Испанский"
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
      title: "Служба Поддержки",
      description: "Если у вас есть вопросы или возникли проблемы, пожалуйста, напишите нам или пообщайтесь с нашей онлайн-службой поддержки.",
      contactWhatsApp: "Связаться в WhatsApp",
      contactTelegram: "Связаться в Telegram"
    },

    notifications: {
      title: "Уведомления",
      filters: {
        all: "Все",
        deposit: "Пополнение",
        withdraw: "Вывод"
      },
      unreadCount: "{0} непрочитанных",
      emptyState: {
        title: "Уведомления не найдены",
        description: "У вас пока нет {0} уведомлений."
      },

      // Notification Types
      types: {
        deposit_success: "Пополнение Успешно",
        deposit_canceled: "Пополнение Отменено",
        withdraw_success: "Вывод Успешен",
        withdraw_canceled: "Вывод Отменен",
        system: "Системное Уведомление",
        alert: "Важное Оповещение",
        default: "Уведомление"
      },

      // Notification Messages
      messages: {
        deposit_success: "Ваше пополнение на ${0} успешно завершено.",
        deposit_canceled: "Ваш запрос на пополнение ${0} отменен.",
        withdraw_success: "Ваш вывод ${0} успешно завершен.",
        withdraw_canceled: "Ваш запрос на вывод ${0} отменен.",
        system: "Системное уведомление",
        alert: "Важное оповещение",
        default: "Обновление уведомления"
      },

      // Status
      status: {
        unread: "непрочитано",
        read: "прочитано"
      }
    },

    portfolio: {
      // Status Tabs
      completed: "Завершены",
      pending: "В Ожидании",
      canceled: "Отменены",

      // Order Information
      orderTime: "Время Заказа",
      orderNumber: "Номер Заказа",
      totalOrderAmount: "Общая сумма заказа",
      commission: "Комиссия",
      estimatedReturn: "Ожидаемый доход",

      // Product Details
      quantity: "X 1",
      currency: "USD",

      // Status Labels
      status: {
        completed: "Завершен",
        pending: "В Ожидании",
        canceled: "Отменен"
      }
    },

    changePassword: {
      title: "Сменить Пароль",
      header: "Сменить Пароль",
      oldPassword: "Старый Пароль",
      newPassword: "Новый Пароль",
      confirmPassword: "Подтвердить Пароль",
      submit: "Отправить",
      note: "Пожалуйста, внимательно заполните эту информацию",
      requiredField: "*"
    },

    withdraw: {
      title: "Вывод",
      withdrawAmount: "Сумма Вывода",
      withdrawPassword: "Пароль Вывода",
      availableBalance: "Доступный баланс",
      confirm: "Подтвердить",
      rulesDescription: "Описание Правил",
      rules: {
        minimum: "(1) Минимальный вывод составляет 100 USD",
        paymentTime: "(2) Платеж будет произведен в течение следующего часа после одобрения заявки на вывод.",
        orderCompletion: "(3) Неполное выполнение ежедневных заказов приводит к отсутствию вывода, все продукты должны быть отправлены для вывода"
      }
    },

    checkout: {
      title: "Оформление заказа",
      sectionAddress: "Адрес доставки",
      noAddress: "У вас пока нет сохранённого адреса доставки",
      addAddress: "+ Добавить адрес доставки",
      changeAddress: "Изменить",
      selectAddressTitle: "Выберите адрес доставки",
      sectionPayment: "Способ оплаты",
      codLabel: "Оплата при получении",
      codDescription: "Оплатите наличными курьеру при получении заказа.",
      sectionSummary: "Сводка заказа",
      itemsCount: "{0} товар(ов)",
      subtotal: "Промежуточный итог",
      deliveryFee: "Стоимость доставки",
      free: "Бесплатно",
      total: "Итого",
      placeOrder: "Оформить заказ",
      placingOrder: "Оформление заказа...",
      missingAddress: "Пожалуйста, выберите адрес доставки",
      emptyCart: "Ваша корзина пуста",
      successTitle: "Заказ оформлен!",
      successMessage: "Ваш заказ успешно оформлен. Оплатите наличными при получении.",
      orderNumber: "Номер заказа",
      totalToPay: "Сумма к оплате при получении",
      backToHome: "Вернуться на главную",
      done: "Готово",
    },

    applyMerchant: {
      title: "Подать заявку на магазин",
      intro: "Заполните данные вашего магазина ниже, чтобы подать заявку на продавца.",
      storePhoto: "Фото магазина",
      storeName: "Название магазина",
      storeNamePlaceholder: "Введите название магазина",
      contact: "Контакт",
      contactPlaceholder: "Введите контактное лицо или номер телефона",
      idNumber: "Номер документа",
      idNumberPlaceholder: "Введите номер вашего документа",
      invitationCode: "Код приглашения",
      invitationCodePlaceholder: "Введите ваш код приглашения",
      mainBusiness: "Основной вид деятельности",
      mainBusinessPlaceholder: "Выберите основной вид деятельности",
      idCardFront: "Фото документа (лицевая сторона)",
      idCardBack: "Фото документа (обратная сторона)",
      address: "Подробный адрес",
      addressPlaceholder: "Введите подробный адрес",
      submit: "Отправить заявку",
      submitSuccess: "Ваша заявка на магазин отправлена и находится на рассмотрении.",
      missingStoreName: "Введите название магазина",
      missingMainBusiness: "Выберите основной вид деятельности",
      missingAddress: "Введите подробный адрес",
      missingStorePhoto: "Загрузите фото вашего магазина",
      missingIdCardFront: "Загрузите лицевую сторону документа",
      missingIdCardBack: "Загрузите обратную сторону документа",
      editAndResubmit: "Изменить и отправить снова",
      goToDashboard: "Перейти в панель продавца",
      status: {
        pendingTitle: "Заявка на рассмотрении",
        pendingText: "Ваша заявка на магазин рассматривается. Мы уведомим вас, как только она будет одобрена.",
        successTitle: "Магазин одобрен",
        successText: "Ваш магазин одобрен. Перейдите в панель продавца, чтобы управлять им.",
        rejectedTitle: "Заявка отклонена",
        rejectedText: "Ваша предыдущая заявка не была одобрена. Вы можете просмотреть детали ниже и отправить её снова.",
      },
      enumerators: {
        mainBusiness: {
          fashion_clothing: "Мода и одежда",
          electronics: "Электроника",
          beauty_cosmetics: "Красота и косметика",
          home_living: "Дом и быт",
          sports_outdoors: "Спорт и отдых",
          toys_hobbies: "Игрушки и хобби",
          food_beverages: "Еда и напитки",
          all: "Все",
        },
      },
    },

    deliveryAddress: {
      title: "Адрес доставки",
      noAddresses: "Адреса не найдены",
      addAddress: "Добавить адрес",
      modalTitle: "Добавить адрес доставки",
      editModalTitle: "Изменить адрес доставки",
      addressLabel: "Адрес доставки",
      addressPlaceholder: "Введите подробный адрес",
      contactNumberLabel: "Контактный номер",
      contactNumberPlaceholder: "Введите ваш контактный номер",
      contactLabel: "Контакт",
      contactPlaceholder: "Введите контактное лицо",
      submit: "Добавить адрес",
      saveChanges: "Сохранить изменения",
      createSuccess: "Адрес доставки успешно добавлен",
      updateSuccess: "Адрес доставки успешно обновлён",
      destroySuccess: "Адрес доставки успешно удалён",
      missingAddress: "Введите подробный адрес",
      missingContactNumber: "Введите ваш контактный номер",
      missingContact: "Введите контактное лицо",
      confirmDeleteTitle: "Удалить этот адрес?",
      confirmDeleteText: "Это действие нельзя отменить.",
      delete: "Удалить",
      cancel: "Отмена",
    },

    cart: {
      addedToCart: "Добавлено в корзину",
    },

    topup: {
      title: "Пополнение",
      rechargeMethods: "Способы пополнения",
      selectWallet: "Выберите кошелёк для пополнения",
      wallets: {
        eth: "ETH",
        btc: "BTC",
        usdt_trc20: "USDT (TRC-20)",
        usdt_erc20: "USDT (ERC-20)",
      },
      scanHint: "Отсканируйте QR-код для пополнения",
      copyAddress: "Скопировать адрес депозита",
      addressCopied: "Адрес скопирован в буфер обмена",
      fee: "Комиссия",
      amount: "Сумма пополнения",
      amountPlaceholder: "Введите сумму пополнения",
      usdtValue: "Стоимость в USDT",
      fetchingRate: "Получение актуального курса…",
      enterAmountForValue: "Введите сумму, чтобы увидеть стоимость в USDT",
      rateUnavailable: "Актуальный курс недоступен - попробуйте позже",
      uploadVoucher: "Загрузить чек пополнения",
      uploadLabel: "Загрузить чек",
      submit: "Отправить заявку на пополнение",
      noWalletSelected: "Выберите кошелёк",
      missingAmount: "Введите сумму пополнения",
      missingPhoto: "Загрузите чек пополнения",
    },

    withdrawal: {
      title: "Центр вывода средств",
      withdrawalMethods: "Способы вывода",
      selectWallet: "Выберите способ вывода",
      wallets: {
        eth: "ETH",
        btc: "BTC",
        usdt_trc20: "USDT (TRC-20)",
        usdt_erc20: "USDT (ERC-20)",
      },
      availableBalance: "Доступный баланс",
      fee: "Комиссия",
      withdrawalAddress: "Адрес для вывода",
      addressPlaceholder: "Введите или вставьте адрес вашего кошелька для получения",
      amount: "Сумма вывода",
      amountPlaceholder: "Введите сумму вывода",
      withdrawalPassword: "Пароль для вывода",
      passwordPlaceholder: "Введите пароль для вывода",
      submit: "Подтвердить вывод",
      noWalletSelected: "Выберите способ вывода",
      missingAddress: "Введите адрес вашего кошелька для получения",
      missingAmount: "Введите сумму вывода",
      exceedsBalance: "Сумма вывода превышает доступный баланс",
      missingPassword: "Введите пароль для вывода",
      youWillReceive: "Вы получите",
      fetchingRate: "Получение актуального курса…",
      enterAmountToPreview: "Введите сумму, чтобы увидеть, сколько вы получите",
      rateUnavailable: "Актуальный курс недоступен - попробуйте позже",
      belowFeeWarning: "Эта сумма слишком мала для покрытия комиссии сети",
      notice1: "Зачисленная сумма будет рассчитана с учётом комиссий вашего счёта получения или курса обмена в реальном времени.",
      notice2: "Ваш вывод будет зачислен в течение 24 часов, пожалуйста, ожидайте! Если сумма не зачислена в течение 24 часов, обратитесь в онлайн-поддержку.",
    },

    wallet: {
      title: "Кошелек",
      withdrawalMethod: "Информация о методе вывода",
      username: "Имя Пользователя",
      walletName: "Название Кошелька",
      choosePreferredCoin: "Выберите предпочтительную монету",
      walletAddress: "Адрес Кошелька",
      withdrawPassword: "Пароль Вывода",
      submit: "Отправить",
      note: "Пожалуйста, будьте внимательны при заполнении этой информации",
      requiredField: "*"
    },

    grab: {
      // Header Section
      greeting: "Привет {0} 👏",

      // Stats Cards
      totalAmount: "Общая Сумма",
      profitsAdded: "Прибыль будет добавлена сюда",
      todaysCommission: "Сегодняшняя Комиссия",
      commissionEarned: "Заработанная Комиссия",
      currency: "USD",

      // Optimization Section
      startOptimization: "Начать Оптимизацию",
      progressCount: "{0}/{1}",

      // Game Section
      commissionRate: "Ставка Комиссии",
      exclusiveChannel: "Эксклюзивный канал для эксклюзивных участников",
      startButton: "Начать",
      processing: "Обработка...",

      // Notice Section
      notice: "Уведомление",
      supportHours: "Время работы поддержки 10:00 - 22:00",
      contactSupport: "Пожалуйста, свяжитесь с онлайн-поддержкой для получения помощи!"
    },

    grapModal: {
      orderTime: "Время Заказа",
      orderNumber: "Номер Заказа",
      totalOrderAmount: "Общая сумма заказа",
      commission: "Комиссия",
      estimatedReturn: "Ожидаемый доход",
      cancel: "Отмена",
      submit: "Отправить",
      quantity: "X 1",
      currency: "USD"
    },

    actions: {
      event: "События",
      tc: "Условия и Положения",
      certificate: "Сертификат",
      faq: "Часто Задаваемые Вопросы",
      company: "Компания"
    },

    auth: {
      signin: {
        welcomeBack: "С возвращением!",
        signinToAccount: "Войдите в свой маркетинговый аккаунт",
        signinButton: "Войти",
        noAccount: "Нет аккаунта?",
        signupHere: "Зарегистрируйтесь здесь."
      },
      signup: {
        createAccount: "Создать Аккаунт",
        signupForAccount: "Зарегистрируйтесь для маркетингового аккаунта",
        signupButton: "Зарегистрироваться",
        alreadyHaveAccount: "Уже есть аккаунт?",
        phonePlaceholder: "Введите ваш номер телефона",
        searchCountries: "Поиск стран..."
      }
    },

    csPage: {
      customerSupport: "Служба Поддержки",
      hereToHelp: "Мы здесь, чтобы помочь вам!",
      howCanWeHelp: "Как мы можем помочь вам сегодня?",
      platformNames: {
        whatsapp: "WhatsApp",

        telegram: "Telegram"
      }
    },
  },




  entities: {
    record: {
      menu: "Записи",
      fields: {
        user: "пользователь",
        product: "продукт",
        number: "номер записи",
        status: "статус",
      },
      list: {
        title: "Список записей",
      },
      view: {
        title: "Детали записи",
      },
      edit: {
        title: "Редактировать запись",
      },
      create: {
        success: "Продукт успешно отправлен.",
      },
      update: {
        success: "Продукт успешно отправлен.",
      },
      destroy: {
        success: "Запись успешно удалена",
      },
      destroyAll: {
        success: "Запись успешно удалена",
      },
      enumerators: {
        status: {
          pending: "В ожидании",
          completed: "Завершено",
          canceled: "Отменено",
        },
      },
    },

    category: {
      name: "категория",
      label: "Категории",
      menu: "Категории",
      exporterFileName: "категория_экспорт",
      list: {
        menu: "Категории",
        title: "Категории",
      },
      create: {
        success: "Категория успешно сохранена",
      },
      update: {
        success: "Категория успешно сохранена",
      },
      destroy: {
        success: "Категория успешно удалена",
      },
      destroyAll: {
        success: "Категория(и) успешно удалены",
      },
      edit: {
        title: "Редактировать категорию",
      },
      fields: {
        id: "Id",
        name: "Название",
        slug: "Слаг",
        photo: "Фото",
        metaKeywords: "Мета-ключевые слова",
        metaDescriptions: "Мета-описания",
        status: "Статус",
        isFeature: "Рекомендуемая",
        serialRange: "Серийный номер",
        serial: "Серийный номер",
        createdAt: "Создано в",
        updatedAt: "Обновлено в",
        createdAtRange: "Создано в",
      },
      enumerators: {
        status: {
          enable: "Включено",
          disable: "Выключено",
        },
      },
      placeholders: {},
      hints: {},
      new: {
        title: "Новая категория",
      },
      view: {
        title: "Просмотр категории",
      },
      importer: {
        title: "Импорт категорий",
        fileName: "шаблон_импорта_категорий",
        hint: "Столбцы Файлы/Изображения должны содержать URL-адреса файлов, разделенные пробелом.",
      },
    },

    product: {
      name: "продукт",
      label: "Продукты",
      menu: "Продукты",
      exporterFileName: "продукт_экспорт",
      list: {
        menu: "Продукты",
        title: "Продукты",
      },
      create: {
        success: "Продукт успешно сохранен",
      },
      update: {
        success: "Продукт успешно сохранен",
      },
      destroy: {
        success: "Продукт успешно удален",
      },
      destroyAll: {
        success: "Продукт(ы) успешно удалены",
      },
      edit: {
        title: "Редактировать продукт",
      },
      fields: {
        id: "Id",
        name: "Название",
        slug: "Слаг",
        tags: "Теги",
        video: "Видео",
        specificationName: "Название характеристики",
        specificationDesciption: "Описание характеристики",
        isSpecification: "Является характеристикой",
        details: "Детали",
        photo: "Фото",
        discountPriceRange: "Цена со скидкой",
        discountPrice: "Текущая цена",
        previousPriceRange: "Предыдущая цена",
        previousPrice: "Предыдущая цена",
        stockRange: "Запас",
        stock: "Запас",
        metaKeywords: "Мета-ключевые слова",
        metaDesctiption: "Краткое описание",
        status: "Статус",
        isType: "Тип",
        dateRange: "Дата",
        date: "Дата",
        itemType: "Тип товара",
        file: "Файл",
        link: "Ссылка",
        fileType: "Тип файла",
        taxe: "Налог",
        category: "Категория",
        subcategory: "Подкатегория",
        childcategory: "Дочерняя категория",
        brand: "Бренд",
        gallery: "Галерея",
        createdAt: "Создано в",
        updatedAt: "Обновлено в",
        createdAtRange: "Создано в",
      },
      enumerators: {
        status: {
          enable: "Включено",
          disable: "Выключено",
        },
        itemType: {
          physical: "Физический",
          digitale: "Цифровой",
        },
        fileType: {
          file: "Файл",
          link: "Ссылка",
        },
        isType: {
          new_arrival: "Новое поступление",
          feature_product: "Рекомендуемый товар",
          top_pdroduct: "Топ товар",
          best_product: "Лучший товар",
          flash_deal_product: "Товар по акции",
        },
      },
      placeholders: {},
      hints: {},
      new: {
        title: "Новый продукт",
      },
      view: {
        title: "Просмотр продукта",
      },
      importer: {
        title: "Импорт продуктов",
        fileName: "шаблон_импорта_продуктов",
        hint: "Столбцы Файлы/Изображения должны содержать URL-адреса файлов, разделенные пробелом.",
      },
    },
    transaction: {
      name: "транзакция",
      label: "Транзакции",
      menu: "Транзакции",
      exporterFileName: "транзакция_экспорт",
      list: {
        menu: "Транзакции",
        title: "Транзакции",
      },
      create: {
        success: "Транзакция успешно отправлена",
      },
      update: {
        success: "Транзакция успешно сохранена",
      },
      destroy: {
        success: "Транзакция успешно удалена",
      },
      destroyAll: {
        success: "Транзакция(и) успешно удалены",
      },
      edit: {
        title: "Редактировать транзакцию",
      },
      fields: {
        id: "Id",
        amountRange: "Сумма",
        amount: "Сумма",
        email: "Email",
        tax: "Налог",
        currencySign: "Знак валюты",
        currencyValue: "Значение валюты",
        orderId: "ID заказа",
        createdAt: "Создано в",
        updatedAt: "Обновлено в",
        createdAtRange: "Создано в",
      },
      enumerators: {
        status: {
          pending: "В ожидании",
          completed: "Успешно",
          canceled: "Отменено",
        },
      },
      placeholders: {},
      hints: {},
      new: {
        title: "Новая транзакция",
      },
      view: {
        title: "Просмотр транзакции",
      },
      importer: {
        title: "Импорт транзакций",
        fileName: "шаблон_импорта_транзакций",
        hint: "Столбцы Файлы/Изображения должны содержать URL-адреса файлов, разделенные пробелом.",
      },
    },


    order: {
      name: "заказ",
      label: "Заказы",
      menu: "Заказы",
      exporterFileName: "заказ_экспорт",
      list: {
        menu: "Заказы",
        title: "Заказы",
      },
      create: {
        success: "Заказ успешно сохранен",
      },
      update: {
        success: "Заказ успешно сохранен",
      },
      destroy: {
        success: "Заказ успешно удален",
      },
      destroyAll: {
        success: "Заказ(ы) успешно удалены",
      },
      edit: {
        title: "Редактировать заказ",
      },
      fields: {
        id: "Id",
        userId: "Пользователь",
        cart: "Корзина",
        shipping: "Доставка",
        discountRange: "Скидка",
        discount: "Скидка",
        paymentMethod: "Метод оплаты",
        taxe: "Налог",
        transactionNumber: "Номер транзакции",
        orderStatus: "Статус заказа",
        createdAt: "Создано в",
        updatedAt: "Обновлено в",
        createdAtRange: "Создано в",
      },
      enumerators: {
        orderStatus: {
          pending: "В ожидании",
          in_progress: "В процессе",
          delivered: "Доставлено",
          canceled: "Отменено",
        },
      },
      placeholders: {},
      hints: {},
      new: {
        title: "Новый заказ",
      },
      view: {
        title: "Просмотр заказа",
      },
      importer: {
        title: "Импорт заказов",
        fileName: "шаблон_импорта_заказов",
        hint: "Столбцы Файлы/Изображения должны содержать URL-адреса файлов, разделенные пробелом.",
      },
    },
  },

  inputs: {
    username: "Имя пользователя",
    password: "Пароль",
    phoneNumber: "Номер телефона",
    withdrawPassword: "Пароль для вывода",
    confirmPassword: "Подтвердите пароль",
    invitationcode: "Код приглашения",
    walletaddress: "Адрес кошелька"
  },

  user: {
    fields: {
      genre: "Пол",
      username: "Имя пользователя",
      walletName: "Название кошелька",
      id: "ID",
      confirmPassword: "Подтвердите пароль",
      avatars: "Аватар",
      invitationcode: "Пригласительный код",
      email: "Электронная почта",
      emails: "Электронная почта(ы)",
      erc20: "Адрес кошелька ERC20",
      trc20: "Адрес кошелька TRC20",
      fullName: "Имя",
      balance: "Баланс",
      firstName: "Имя",
      lastName: "Фамилия",
      status: "Статус",
      phoneNumber: "Номер телефона",
      withdrawPassword: "Пароль для вывода",
      sector: "Сектор",
      employer: "Работодатель",
      profession: "Профессия",
      address: "Адрес",
      birthDate: "Дата рождения",
      maritalStatus: "Семейное положение",
      facebookLink: "Ссылка на Facebook",
      sponsor: "Спонсор",
      role: "Роль",
      createdAt: "Создано",
      updatedAt: "Обновлено",
      roleUser: "Роль/Пользователь",
      roles: "Роли",
      createdAtRange: "Создано",
      password: "Пароль",
      oldPassword: "Старый пароль",
      newPassword: "Новый пароль",
      newPasswordConfirmation: "Подтверждение нового пароля",
      rememberMe: "Запомнить меня",
    },
    sector: {
      AGRO_ALIMENTAIRE: "Пищевая промышленность",
      ASSURANCES: "Страхование",
      AUDIOVISUEL: "Аудиовизуальный",
      BANCAIRE: "Банковское дело",
      CHIMIE: "Химия",
      COMPOSANTS_AUTOMOBILES: "Автомобильные компоненты",
      DISTRIBUTION: "Дистрибуция",
      DISTRIBUTION_AUTOMOBILE: "Автомобильная дистрибуция",
      DIVERS: "Разное",
      FINANCIER: "Финансовый",
      HOLDING: "Холдинг",
      IMMOBILIER: "Недвижимость",
      INDUSTRIEL: "Промышленный",
      LEASING: "Лизинг",
      LOGISTIQUE_TRANSPORT: "Логистика и транспорт",
      PHARMACEUTIQUE: "Фармацевтика",
      SANTÉ: "Здоровье",
      TOURSIME: "Туризм",
      INFORMATION_TECHNOLOGY: "Информационные технологии",
    },
    maritalStatus: {
      célébataire: "Холост",
      marié: "Женат/Замужем",
    },
    status: {
      active: "Активный",
      invited: "Приглашенный",
      "empty-permissions": "Ожидание разрешений",
      inactive: "Неактивный",
    },

    enumerators: {
      status: {
        USDT: "USDT",
        ETH: "ETH",
        BTC: "BTC",
      },
      gender: {
        male: "мужской",
        female: "женский",
      }
    },
    invite: "Пригласить",
    validations: {
      // eslint-disable-next-line
      email: "Электронная почта ${value} недействительна",
    },
    title: "Пользователи",
    menu: "Пользователи",
    doAddSuccess: "Пользователь(и) успешно сохранены",
    doUpdateSuccess: "Пользователь успешно сохранен",
    exporterFileName: "экспорт_пользователей",
    doDestroySuccess: "Пользователь успешно удален",
    doDestroyAllSelectedSuccess: "Пользователи успешно удалены",
    edit: {
      title: "Редактировать пользователя",
    },
    new: {
      title: "Пригласить пользователя(ей)",
      titleModal: "Пригласить пользователя",
      emailsHint:
        "Разделите несколько адресов электронной почты с помощью запятой.",
    },
    view: {
      title: "Просмотр пользователя",
      activity: "Активность",
    },
    importer: {
      title: "Импорт пользователей",
      fileName: "шаблон_импорта_пользователей",
      hint: "Столбцы Файлы/Изображения должны содержать URL-адреса файлов, разделенные пробелом. Отношения должны быть ID ссылочных записей, разделенные пробелом. Роли должны быть ID ролей, разделенные пробелом.",
    },
    errors: {
      userAlreadyExists: "Пользователь с таким email уже существует",
      userNotFound: "Пользователь не найден",
      revokingOwnPermission: `Вы не можете отозвать свои собственные права администратора`,
    },
  },

  buttons: {
    login: "Войти",
    registerNow: "Зарегистрироваться сейчас",
    signup: "Регистрация",
    start: "Начать",
    orders: "Заказы",
    submit: "Отправить",
    backtohome: "Вернуться на главную",
    confirm: "Подтвердить",
    logout: "Выйти",
    getstarted: "Начать",
  },
  text: {
    welcome: "Добро пожаловать",
    discover: "Откройте для себя эксклюзивные предложения специально для вас",
    signin: "Войти",
    haveaccount: "Уже есть аккаунт?",
    noaccount: "Нет аккаунта?",
    showingnow: "Сейчас в прокате",
    comingsoon: "Скоро в кино",
    termsconditions: "Условия и положения",
    todayearning: "Заработок за сегодня",
    accountbalance: "Баланс счета",
    freezebalance: "Замороженный баланс",
    sumbitInformation: "Отправить информацию",
    order: "Заказ",
    pending: "В ожидании",
    completed: "Завершено",
    canceled: "Отменено",
    notransaction: "Транзакций пока нет!",
    createdtime: "Время создания",
    creationtime: "Время создания",

    orderNumber: "Номер заказа",
    orderamount: "Сумма заказа",
    income: "Доход",
    buyerating: "Рейтинг покупателя",
    uid: "UID",
    promotioncode: "Промокод",
    walletamount: "Сумма в кошельке",
    creditassesment: "Кредитная оценка",
    myfinance: "Мои финансы",
    withdraw: "Вывести",
    mydetails: "Мои данные",
    profile: "Профиль",
    wallet: "Кошелек",
    other: "Другое",
    customersupport: "Поддержка клиентов",
    transaction: "Транзакция",
    taskshistory: "История задач",
    security: "Безопасность",
    sponsor: `Наша безопасность - наш главный приоритет, и мы хотим убедиться, что
              вы защищены от любых потенциальных рисков. Имейте в виду, что
              мы никогда не попросим вас отправить деньги на неизвестный адрес. Перед
              совершением платежей, пожалуйста, проверьте детали у нас.`,
  },
  errors: {
    backToHome: "Вернуться на главную",
    continueShopping: "Продолжить покупки",
    title403: "Доступ запрещён",
    title404: "Страница не найдена",
    title500: "Что-то пошло не так",
    403: "Извините, у вас нет доступа к этой странице",
    404: "Извините, страница, которую вы посетили, не существует",
    500: "Извините, сервер сообщает об ошибке",
    429: "Слишком много запросов. Пожалуйста, попробуйте позже.",
    forbidden: {
      message: "Доступ запрещен",
    },
    validation: {
      message: "Произошла ошибка",
    },
    defaultErrorMessage: "Ой, произошла ошибка",
  },

  withdraw: {
    withdrawamount: "Сумма вывода",
    Withdrawpassword: "Пароль для вывода",
    availablebalance: "Доступный баланс",
    rules: "Описание правил",
    rule1: "Минимальная сумма вывода $20",
    rule2: "Платеж будет выполнен в течение 24 часов после запроса на вывод",
    rule3: "Незавершенные ежедневные заказы не подлежат выводу, все товары должны быть отправлены для вывода"
  },
  profile: {
    profile: "Профиль",
    fullname: "Полное имя",
    email: "Электронная почта",
    phonenumber: "Номер телефона",
    country: "Страна",
    Invitationcode: "Код приглашения"
  },
  wallet: {
    wallet: "Кошелек",
    info: "Информация о способе вывода",
    username: "Имя пользователя",
    walletname: "Название кошелька",
    walletaddress: "Адрес кошелька",
    note: "Примечание",
    notedesctiption: "Пожалуйста, будьте осторожны при заполнении этой информации."
  },

  cs: {
    cs: "Служба поддержки",
    note: "Если у вас есть вопросы или возникли проблемы, напишите нам на почту или свяжитесь с нашей онлайн-службой поддержки.",
    contactnow: "Связаться сейчас"
  },
  transaction: {
    transaction: "Транзакция",
    all: "Все",
    withdraw: "Вывод",
    dposit: "Депозит",
    notransaction: "Транзакций пока нет!"
  },
  order: {
    order: "Заказ",
    completed: "Завершено",
    pending: "В ожидании",
    canceled: "Отменено",
    ordertime: "Время заказа",
    ordernumber: "Номер заказа",
    total: "Общая сумма заказа",
    commission: "Комиссия",
    return: "Ожидаемая прибыль"
  },

  security: {
    changepassword: "Сменить пароль",
    oldpassword: "Старый пароль",
    newpassword: "Новый пароль",
    confirmpassword: "Подтвердите пароль",
    note: "Примечание",
    notedesc: "Пожалуйста, внимательно заполните эту информацию"
  },

  auth: {
    tenants: "Рабочие пространства",
    singindesc: "Введите ваш email и пароль для входа",
    signupdesc: "Введите ваш email и пароль для регистрации",
    profile: {
      title: "Профиль",
      success: "Профиль успешно обновлен",
      vip: "Поздравляем с подпиской",
    },
    createAnAccount: "Создать аккаунт",
    rememberMe: "Запомнить меня",
    forgotPassword: "Забыли пароль?",
    signin: "Войти",
    signup: "Регистрация",
    signout: "Выйти",
    alreadyHaveAnAccount: "Уже есть аккаунт? Войти.",
    social: {
      errors: {
        "auth-invalid-provider":
          "Этот email уже зарегистрирован у другого провайдера.",
        "auth-no-email": "Email, связанный с этой учетной записью, скрыт или не существует.",
      },
    },
    signinWithAnotherAccount: "Войти с другой учетной записью",
    emailUnverified: {
      message: `Пожалуйста, подтвердите вашу почту на <strong>{0}</strong>, чтобы продолжить.`,
      submit: "Отправить повторное подтверждение",
    },
    emptyPermissions: {
      message: "У вас пока нет разрешений. Дождитесь их предоставления администратором.",
    },
    passwordResetEmail: {
      message: "Отправить письмо для сброса пароля",
      error: "Email не распознан",
    },
    passwordReset: {
      message: "Сбросить пароль",
    },
    passwordChange: {
      title: "Смена пароля",
      success: "Пароль успешно изменен",
      mustMatch: "Пароли должны совпадать",
    },
    emailAddressVerificationEmail: {
      error: "Email не распознан",
    },
    verificationEmailSuccess: "Письмо для подтверждения успешно отправлено",
    passwordResetEmailSuccess: "Письмо для сброса пароля успешно отправлено",
    passwordResetSuccess: "Пароль успешно изменен",
    verifyEmail: {
      success: "Email успешно подтвержден.",
      message: "Подождите немного, ваш email проверяется...",
    },
  },

  tabbarmenue: {
    home: "Главная",
    rate: "Оценить",
    profile: "Профиль"
  },

  validation: {
    mixed: {
      default: "${path} недопустимо",
      required: "${path} обязательно для заполнения",
      oneOf: "${path} должно быть одним из следующих значений: ${values}",
      notOneOf: "${path} не должно быть одним из следующих значений: ${values}",
      notType: ({ path, type, value, originalValue }) => {
        return `${path} должно быть типа ${type}`;
      },
    },
    string: {
      length: "${path} должно содержать ровно ${length} символов",
      min: "${path} должно содержать минимум ${min} символов",
      max: "${path} должно содержать максимум ${max} символов",
      matches: '${path} должно соответствовать следующему шаблону: "${regex}"',
      email: "${path} должно быть действительным адресом электронной почты",
      url: "${path} должен быть действительным URL",
      trim: "${path} должно быть строкой без пробелов в начале и конце",
      lowercase: "${path} должно быть строкой в нижнем регистре",
      uppercase: "${path} должно быть строкой в верхнем регистре",
      selected: "${path} должно быть выбрано",
    },
    number: {
      min: "${path} должно быть больше или равно ${min}",
      max: "${path} должно быть меньше или равно ${max}",
      lessThan: "${path} должно быть меньше ${less}",
      moreThan: "${path} должно быть больше ${more}",
      notEqual: "${path} не должно быть равно ${notEqual}",
      positive: "${path} должно быть положительным числом",
      negative: "${path} должно быть отрицательным числом",
      integer: "${path} должно быть целым числом",
    },
    date: {
      min: "${path} должно быть позже ${min}",
      max: "${path} должно быть раньше ${max}",
    },
    boolean: {},
    object: {
      noUnknown:
        "${path} не должно содержать неизвестные ключи, не указанные в объекте",
    },
    array: {
      min: ({ min, path }) =>
        min === 1
          ? `${path} обязательно для заполнения`
          : `${path} должно содержать не менее ${min} элементов`,
      max: "${path} должно содержать не более ${max} элементов",
    },
  },
  /* eslint-disable */
  fileUploader: {
    upload: "Загрузить",
    image: "Вы должны загрузить изображение",
    size: "Файл слишком большой. Максимально допустимый размер: {0}",
    formats: `Недопустимый формат. Должен быть одним из: {0}.`,
  },

  estore: {
    auth: {
      login: {
        title: "Вход",
        tagline: "Покупайте больше, живите лучше",
        phoneOrEmail: "Телефон / Эл. почта",
        phoneOrEmailPlaceholder: "Телефон / Эл. почта",
        password: "Введите пароль",
        passwordPlaceholder: "Пароль",
        forgotPassword: "Забыли пароль",
        noAccount: "Нет аккаунта?",
        signUp: "Зарегистрироваться",
        loginButton: "Войти",
      },
    },
    header: {
      home: "Главная",
      searchPlaceholder: "Поиск товаров, брендов и категорий...",
      search: "Поиск",
      cart: "Корзина",
      loginRegister: "Вход / Регистрация",
      myAccount: "Мой аккаунт",
      myOrders: "Мои заказы",
      signOut: "Выйти",
      allCategories: "Все категории",
      account: "Аккаунт",
    },
    categories: {
      "Women Clothing": "Женская одежда",
      "Women Shoes": "Женская обувь",
      "Women Bags": "Женские сумки",
      "Accessories": "Аксессуары",
      "Lifestyle": "Стиль жизни",
      "Global Purchase": "Международные покупки",
      "Girls": "Девочки",
      "Boys": "Мальчики",
      "Men Clothing": "Мужская одежда",
      "Men Shoes": "Мужская обувь",
      "Men Bags": "Мужские сумки",
    },
    pc: {
      common: {
        saving: "Сохранение...",
        confirm: "Подтвердить",
        save: "Сохранить",
        cancel: "Отмена",
        loading: "Загрузка...",
        edit: "Изменить",
        delete: "Удалить",
        submit: "Отправить",
        update: "Обновить",
      },
      records: {
        transactions: "Транзакции",
        processing: "В обработке",
        completed: "Завершено",
        canceled: "Отменено",
        id: "ID",
        time: "Время",
        viewProof: "Посмотреть подтверждение",
      },
      messages: {
        title: "Сообщения",
        markAllRead: "Отметить все как прочитанные",
        loading: "Загрузка...",
        empty: "Пока нет сообщений.",
        today: "Сегодня",
        earlier: "Ранее",
        amount: "Сумма",
        depositSuccess: "Пополнение выполнено",
        depositCanceled: "Пополнение отменено",
        withdrawSuccess: "Вывод выполнен",
        withdrawCanceled: "Вывод отменён",
        systemNotice: "Системное уведомление",
        alert: "Предупреждение",
        notification: "Уведомление",
      },
      withdrawal: {
        deductedFromBalance: "Списано с баланса",
      },
      myAccount: {
        title: "Мой аккаунт",
        storeId: "ID магазина",
        id: "ID",
        copied: "Скопировано",
        copy: "Копировать",
        idCopied: "{0} скопировано в буфер обмена",
        username: "Имя пользователя",
        phoneNumber: "Номер телефона",
        notBound: "Не привязано",
        email: "Эл. почта",
        loginPassword: "Пароль для входа",
        change: "Изменить",
        changeLoginPassword: "Изменить пароль для входа",
        currentPassword: "Текущий пароль",
        currentPasswordPlaceholder: "Введите текущий пароль",
        newPassword: "Новый пароль",
        newPasswordPlaceholder: "Не менее 6 символов",
        confirmNewPassword: "Подтвердите новый пароль",
        confirmNewPasswordPlaceholder: "Введите новый пароль ещё раз",
        cancel: "Отмена",
        saveChanges: "Сохранить изменения",
        securityHint: "Обеспечьте безопасность своего аккаунта — никогда никому не сообщайте свой пароль или коды подтверждения.",
      },
      applyMerchant: {
        loading: "Загрузка...",
        idCard: "Документ, удостоверяющий личность",
        submitting: "Отправка...",
      },
      wholesale: {
        title: "Управление оптом",
        all: "Все",
        lowestPrice: "Минимальная цена",
        highestPrice: "Максимальная цена",
        filter: "Фильтр",
        loadingItems: "Загрузка товаров…",
        showing: "Показано",
        of: "из",
        item: "товар",
        items: "товаров",
        inCategory: "в {0}",
        emptyTitle: "Нет товаров, соответствующих этому фильтру",
        emptyText: "Попробуйте другую категорию или ценовой диапазон.",
        added: "Добавлено",
        add: "Добавить",
        loadingMore: "Загрузка…",
        reachedEnd: "Вы достигли конца списка.",
        salesPrice: "Розничная цена",
        wholesalePrice: "Оптовая цена",
        cancel: "Отмена",
        confirming: "Подтверждение…",
        confirmListing: "Подтвердить размещение",
        alreadyListed: "Уже добавлено в ваши оптовые предложения.",
        addedToListings: '"{0}" добавлено в ваши оптовые предложения.',
      },
      sellerSetup: {
        title: "Настройки",
        loading: "Загрузка настроек магазина…",
        noStoreTitle: "Для этого аккаунта магазин не найден",
        noStoreText: "Подайте заявку на продавца, чтобы управлять настройками магазина.",
        storeInformation: "Информация о магазине",
        storeInfoSub: "Обновите данные вашего магазина и информацию о компании.",
        storeLogo: "Логотип магазина",
        uploadLogoSub: "Загрузите логотип для вашего магазина",
        store: "Магазин",
        uploading: "Загрузка…",
        uploadLogo: "Загрузить логотип",
        storeName: "Название магазина *",
        storeNamePlaceholder: "Название вашего магазина",
        storeNameRequired: "Название магазина обязательно.",
        storeDescription: "Описание магазина",
        storeDescriptionPlaceholder: "Опишите ваш магазин...",
        businessEmail: "Рабочая эл. почта *",
        businessPhone: "Рабочий телефон",
        businessPhonePlaceholder: "Номер телефона",
        saving: "Сохранение…",
        saveChanges: "Сохранить изменения",
        storeBanner: "Баннер магазина",
        storeBannerSub: "Отображается вверху страницы вашего магазина.",
        noBanner: "Баннер не загружен",
        uploadBanner: "Загрузить баннер",
      },
      productManagement: {
        title: "Управление товарами",
        addProduct: "+ Добавить товар",
        searchPlaceholder: "Поиск товаров...",
        loadingProducts: "Загрузка ваших товаров…",
        showing: "Показано",
        of: "из",
        products: "товаров",
        emptyTitle: "Пока нет товаров в списке",
        emptyText: "Добавьте товары из раздела «Управление оптом», чтобы увидеть их здесь.",
        goToWholesale: "Перейти к управлению оптом",
        noMatchesTitle: "Нет совпадений",
        noMatchesText: "Нет товаров, соответствующих",
        wholesale: "Опт",
        sales: "Розница",
      },
      sellerOrders: {
        title: "Заказы магазина",
        lumpSum: "Общая сумма",
        salesProfit: "Прибыль с продажи",
        wholesalePrice: "Оптовая цена",
        actualPayment: "Фактический платёж",
        processing: "Обработка…",
        goToShipment: "Перейти к отправке",
        profitCredited: "Прибыль зачислена",
        refunded: "Возвращено",
        awaitingReview: "Ожидает проверки",
        paid: "Оплачено",
        waitingForDelivery: "Ожидает доставки",
        waitingForReceipt: "Ожидает получения",
        completed: "Завершено",
        refundAfterSales: "Возврат / Послепродажное обслуживание",
        emptyTitle: "Здесь пока ничего нет",
        emptyText: "Заказы на этом этапе будут отображаться здесь.",
      },
      sellerHub: {
        loadingShop: "Загрузка вашего магазина...",
        storeFrozen: "Магазин заморожен",
        frozenText: "Ваш аккаунт продавца был временно заморожен, так как заказ слишком долго ожидал доставки. Вы не сможете получить доступ к панели продавца, пока это не будет решено.",
        contactSupport: "Связаться со службой поддержки",
        backToBuyer: "Вернуться в аккаунт покупателя",
        accountBalance: "Баланс аккаунта",
        viewShop: "Посмотреть магазин",
        orderFulfillment: "Выполнение заказов",
        waitingForDelivery: "Ожидает доставки",
        waitingForReceipt: "Ожидает получения",
        completed: "Завершено",
        refundAfterSales: "Возврат / Послепродажное обслуживание",
        quickActions: "Быстрые действия",
        topUp: "Пополнить",
        withdrawal: "Вывод",
        wholesaleCatalog: "Оптовый каталог",
        manageProducts: "Управление товарами",
      },
      shopDetails: {
        title: "Информация о магазине",
        loading: "Загрузка информации о магазине…",
        noStoreTitle: "У вас пока нет магазина",
        noStoreText: "Подайте заявку на продавца, чтобы увидеть здесь информацию о вашем магазине.",
        applyNow: "Подать заявку",
        accountBalance: "Баланс аккаунта",
        storeHealth: "Состояние магазина",
        creditScore: "Кредитный рейтинг",
        followers: "Подписчики",
        todaysOrders: "Заказы за сегодня",
        cumulativeOrderQty: "Общее количество заказов",
        salesPerformance: "Показатели продаж",
        todaysSales: "Продажи за сегодня",
        totalSales: "Общие продажи",
        todaysProfit: "Прибыль за сегодня",
        totalProfit: "Общая прибыль",
      },
      mineSeller: {
        menu: {
          dashboard: "Панель управления",
          wholesale: "Управление оптом",
          shopDetails: "Информация о магазине",
          products: "Управление товарами",
          orders: "Заказы",
          billing: "История платежей",
          addresses: "Адреса доставки",
          support: "Центр обслуживания",
          loginPassword: "Пароль для входа",
          paymentPassword: "Платёжный пароль",
          settings: "Настройки",
        },
        myStore: "Мой магазин",
        seller: "Продавец",
        switchToBuyer: "Переключиться на аккаунт покупателя",
        logOut: "Выйти",
      },
      mineHub: {
        storeFrozen: "Магазин заморожен",
        storeFrozenSub: "Ваш аккаунт продавца был временно заморожен.",
        contactSupport: "Связаться со службой поддержки",
        storeApproved: "Заявка на магазин одобрена!",
        storeApprovedSub: "Ваш аккаунт продавца активен.",
        goToSellerDashboard: "Перейти в панель продавца",
        accountBalance: "Баланс аккаунта",
        myAccount: "Мой аккаунт",
        myStuff: "Мои вещи",
        myCollection: "Моя коллекция",
        myBrowse: "Недавно просмотренные",
        myOrders: "Мои заказы",
        viewAll: "Смотреть все",
        paymentPending: "Ожидает оплаты",
        inShipping: "В доставке",
        received: "Получено",
        completed: "Завершено",
        refund: "Возврат",
        quickActions: "Быстрые действия",
        topUp: "Пополнить",
        withdrawal: "Вывод",
        sellerDashboard: "Панель продавца",
        applyMerchant: "Стать продавцом",
      },
      addresses: {
        title: "Адреса доставки",
        addAddress: "+ Добавить адрес",
        editAddress: "Изменить адрес",
        addNewAddress: "Добавить новый адрес",
        address: "Адрес",
        addressPlaceholder: "Улица, город, область, индекс",
        contactName: "Имя контакта",
        contactNamePlaceholder: "Имя получателя",
        contactNumber: "Контактный номер",
        contactNumberPlaceholder: "Номер телефона",
        cancel: "Отмена",
        saving: "Сохранение...",
        saveAddress: "Сохранить адрес",
        emptyTitle: "Нет сохранённых адресов",
        emptyText: "Добавьте адрес доставки, чтобы ускорить оформление заказа.",
        deleteConfirm: "Удалить этот адрес?",
        yesDelete: "Да, удалить",
        edit: "Изменить",
        delete: "Удалить",
      },
      settings: {
        title: "Настройки",
        publicProfile: "Публичный профиль",
        publicProfileSub: "Эта информация будет отображаться в ваших отзывах и профиле.",
        uploading: "Загрузка…",
        changeAvatar: "Изменить аватар",
        displayName: "Отображаемое имя",
        displayNamePlaceholder: "Ваше отображаемое имя",
        displayNameRequired: "Отображаемое имя обязательно.",
        emailAddress: "Адрес эл. почты",
        emailHint: "Обратитесь в поддержку, чтобы изменить адрес эл. почты.",
        saving: "Сохранение…",
        saveChanges: "Сохранить изменения",
        accountStats: "Статистика аккаунта",
        orders: "Заказы",
        reviews: "Отзывы",
        wishlist: "Список желаний",
        joined: "Дата регистрации",
      },
      myOrders: {
        title: "Мои заказы",
        emptyTitle: "Пока нет заказов",
        emptyText: "Заказы, которые вы оформите, появятся здесь.",
        startShopping: "Начать покупки",
        order: "Заказ",
        total: "Итого",
        statusPending: "В ожидании",
        statusConfirmed: "Подтверждён",
        statusShipped: "Отправлен",
        statusDelivered: "Доставлен",
        statusCancelled: "Отменён",
      },
      balance: {
        title: "Баланс",
        totalBalance: "Общий баланс",
        accountBalance: "Баланс аккаунта",
        availableBalance: "Доступный баланс",
        deposit: "Пополнение",
        withdraw: "Вывести",
        hint: "Доступный баланс можно использовать для покупок и выводить на привязанный кошелёк.",
      },
      depositRecord: {
        title: "История пополнений",
        totalDeposited: "Всего пополнено",
      },
      withdrawalRecord: {
        title: "История выводов",
        totalWithdrawn: "Всего выведено",
      },
      paymentPassword: {
        title: "Платёжный пароль",
        oldPlaceholder: "Введите текущий пароль транзакции",
        newPlaceholder: "Введите новый пароль транзакции",
        confirmPlaceholder: "Подтвердите новый пароль транзакции",
        hint: "Пароль транзакции используется для подтверждения выводов средств и других важных изменений аккаунта. Храните его в безопасности и никогда никому не сообщайте.",
      },
      login: {
        brandTitle: "Покупайте больше, живите лучше",
        brandSubtitle: "Тысячи товаров, непревзойдённые цены, доставка до двери.",
        title: "С возвращением",
        subtitle: "Войдите, чтобы продолжить покупки",
        password: "Пароль",
        forgotPassword: "Забыли пароль?",
      },
      register: {
        brandTitle: "Присоединяйтесь к Estore уже сегодня",
        brandSubtitle: "Создайте аккаунт, чтобы отслеживать заказы, сохранять адреса и быстрее оформлять покупки.",
        title: "Создайте аккаунт",
        subtitle: "Присоединяйтесь к Estore и делайте покупки умнее",
        email: "Эл. почта",
        emailPlaceholder: "Введите вашу эл. почту",
        getOtp: "Получить код",
        otp: "Код подтверждения",
        otpPlaceholder: "Введите код, отправленный на вашу эл. почту",
        phoneNumber: "Номер телефона",
        phoneNumberPlaceholder: "Номер телефона",
        password: "Пароль",
        passwordPlaceholder: "Придумайте пароль",
        confirmPassword: "Подтвердите пароль",
        confirmPasswordPlaceholder: "Введите пароль ещё раз",
        registerButton: "Зарегистрироваться",
        haveAccount: "Уже есть аккаунт?",
        logIn: "Войти",
      },
      checkout: {
        loading: "Загрузка...",
        qty: "Кол-во",
      },
      mine: {
        myBrowse: {
          title: "Недавно просмотренные",
          emptyTitle: "Пока нет истории просмотров",
          emptyText: "Просмотренные товары будут отображаться здесь, чтобы вы могли продолжить с того места, где остановились.",
          startShopping: "Начать покупки",
        },
        myCollection: {
          title: "Моя коллекция",
          emptyTitle: "Пока нет сохранённых товаров",
          emptyText: "Сохранённые товары будут отображаться здесь, чтобы вы могли быстро их найти.",
          browseProducts: "Просмотреть товары",
        },
        support: {
          title: "Онлайн-чат",
          emptyTitle: "Наша служба поддержки скоро ответит вам",
          emptyText: "Начните разговор, и мы ответим как можно скорее.",
        },
        menu: {
          account: "Мой аккаунт",
          balance: "Баланс",
          orders: "Мои заказы",
          deposit: "Пополнение",
          depositRecord: "История пополнений",
          withdrawal: "Вывод",
          withdrawalRecord: "История выводов",
          paymentPassword: "Платёжный пароль",
          addresses: "Адреса доставки",
          collection: "Моя коллекция",
          browse: "Недавно просмотренные",
          messages: "Сообщения",
          settings: "Настройки",
          support: "Онлайн-чат",
        },
        goToSellerDashboard: "Перейти в панель продавца",
        applyMerchant: "Стать продавцом",
        logOut: "Выйти",
      },
      cart: {
        title: "Моя корзина",
        empty: "Ваша корзина пуста.",
        continueShopping: "Продолжить покупки",
        product: "Товар",
        price: "Цена",
        quantity: "Количество",
        subtotal: "Промежуточный итог",
        remove: "Удалить",
        orderSummary: "Сводка заказа",
        items: "Товары",
        shipping: "Доставка",
        calculatedAtCheckout: "Рассчитывается при оформлении",
        total: "Итого",
        proceedToCheckout: "Оформить заказ",
        continueShoppingArrow: "← Продолжить покупки",
      },
      productDetails: {
        notFound: "Товар не найден.",
        noImage: "Нет изображения",
        description: "Описание",
        quantity: "Количество",
        addToCart: "В корзину",
        buyNow: "Купить сейчас",
      },
      classification: {
        searchPlaceholder: "Поиск по категориям",
        categories: "Категории",
        loading: "Загрузка...",
        noCategories: "Нет категорий",
        category: "Категория",
        noProducts: "В этой категории товары не найдены.",
        loadingMore: "Загрузка...",
        reachedEnd: "Вы достигли конца списка.",
      },
      home: {
        allCategories: "Все категории",
        loading: "Загрузка...",
        noCategories: "Пока нет категорий.",
        browseAll: "Просмотреть все категории",
        aboutSection: "О E-store Fashion",
        aboutUs: "О нас",
        joinUs: "Присоединиться",
        contactUs: "Связаться с нами",
        exchangeCooperation: "Обмен и сотрудничество",
        merchantAgreement: "Соглашение с продавцом",
        supplierCooperation: "Сотрудничество с поставщиками",
        strategicManagementHeading: "Стратегическое управление",
        strategicManagement: "Стратегическое управление",
        precisionOperation: "Точная операция",
        courseDriven: "На основе курсов",
        faq: "Частые вопросы",
        downloadApp: "Скачать приложение",
        globalPurchase: "Международные покупки",
        heroWelcomeBack: "С возвращением",
        heroWelcomeGuest: "Добро пожаловать, красавица",
        heroGreeting: "Привет, {0} 👋",
        heroDefaultTitle: "Стильно для каждой женщины",
        heroSlide1Text: "Отобранные платья, обувь и аксессуары для женщин, которые любят сиять.",
        heroSlide1Cta: "Купить женское",
        heroSlide2Eyebrow: "Ограниченное время",
        heroSlide2Title: "Скидки до 50% на женскую моду",
        heroSlide2Text: "Обновите гардероб главными вещами сезона.",
        heroSlide2Cta: "Смотреть распродажу",
        heroSlide3Eyebrow: "Новинки",
        heroSlide3Title: "Украшения, которые вы полюбите",
        heroSlide3Text: "От изящных цепочек до статусных сумок — завершите любой образ со стилем.",
        heroSlide3Cta: "Смотреть аксессуары",
        heroSlide4Eyebrow: "Только на этой неделе",
        heroSlide4Title: "Бесплатная доставка при заказе от $50",
        heroSlide4Text: "Код не нужен — скидка применяется автоматически при оформлении заказа.",
        heroSlide4Cta: "Начать покупки",
        trustShippingTitle: "Бесплатная доставка",
        trustShippingText: "При заказе от $50",
        trustReturnsTitle: "Лёгкий возврат",
        trustReturnsText: "30 дней на возврат",
        trustCheckoutTitle: "Безопасная оплата",
        trustCheckoutText: "Ваши данные защищены",
        trustSupportTitle: "Поддержка 24/7",
        trustSupportText: "Мы здесь, когда бы вам ни понадобилась помощь",
        flashDeals: "Быстрые распродажи",
        limitedTime: "Ограниченное время",
        justForYou: "Специально для вас",
        seeAll: "Смотреть все",
        noMoreProducts: "Сейчас больше нет товаров для показа.",
        add: "Добавить",
        previousSlide: "Предыдущий слайд",
        nextSlide: "Следующий слайд",
        close: "Закрыть",
        infoEmpty: "Этот контент ещё не добавлен. Загляните позже.",
      },
      footer: {
        blurb: "Всё, что вам нужно, с доставкой до двери.",
        shopHeading: "Магазин",
        accountHeading: "Аккаунт",
        supportHeading: "Поддержка",
        helpCenter: "Центр помощи",
        shipping: "Доставка",
        returns: "Возвраты",
        deliveryAddresses: "Адреса доставки",
        login: "Вход",
        createAccount: "Создать аккаунт",
        rights: "© {0} Estore. Все права защищены.",
      },
    },
  },

};

export default ru;
