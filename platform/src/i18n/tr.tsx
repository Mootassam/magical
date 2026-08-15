

import Withdraw from "src/view/pages/withdraw/Withdraw";

const tr = {
  app: {
    title: "Zalando"
  },
  inputs: {
    username: "Kullanıcı Adı",
    password: "Şifre",
    phoneNumber: "Telefon Numarası",
    withdrawPassword: "Çekim Şifresi",
    confirmPassword: "Şifreyi Onayla",
    invitationcode: "Davet Kodu",
    walletaddress: "Cüzdan adresi"


  },



  pages: {
    home: {
      levels: "VIP Seviyeleri",
      chooseLevel: "Kazançlarınızı maksimize etmek için seviyenizi seçin",
      welcome: "Hoş Geldiniz",
      announcement: "Değerli kullanıcılar, E-clicks Digital platformu en iyi ve normal haline geri döndü, platformdan mümkün olduğunca fazla kazanmaya devam edin",

      // Action Buttons
      services: "Hizmetler",
      events: "Etkinlikler",
      about: "Hakkımızda",
      terms: "Şartlar",
      certificate: "Sertifika",
      faqs: "SSS",

      // VIP Level Cards
      currentLevel: "Mevcut",
      upgrade: "Yükselt",
      profitNormal: "normal ürünlerde kâr",
      profitPremium: "premium ürünlerde kâr",
      maxOrders: "Günlük maksimum sipariş",

      // Modal
      modal: {
        levelDetails: "Seviye Detayları",
        levelLimit: "Seviye Limiti",
        dailyOrders: "Günlük Siparişler",
        commissionRate: "Komisyon Oranı",
        cancel: "İptal",
        upgradeNow: "Hemen Yükselt"
      }
    },




    prizeModal: {
      congratulations: "Tebrikler!",
      spinning: "Dönüyor...",
      prizeWon: "Kazandınız!",
      currency: "USD",
      prizeBreakdown: "Ödül Detayları",
      totalAmount: "Toplam Tutar",
      yourWinnings: "Kazancınız",
      claimPrize: "Ödülü Al",
      celebrationMessage: "Ödülünüzün tadını çıkarın!",
    },

    tabBottomNavigator: {
      home: "Ana Sayfa",
      grap: "Yakala",
      records: "Kayıtlar",
      starting: "Başlat"
    },



    transaction: {
      title: "İşlem Geçmişi",
      filters: {
        all: "Tümü",
        withdraw: "Çekim",
        deposit: "Yatırma"
      },
      recentTransactions: "Son İşlemler",
      transactionCount: "{0} işlem",
      types: {
        deposit: "Yatırma",
        withdrawal: "Çekim"
      },
      status: {
        completed: "Tamamlandı",
        processing: "İşleniyor",
        canceled: "İptal Edildi"
      },
      amount: {
        deposit: "+${0}",
        withdraw: "-${0}",
        canceled: "${0}"
      }
    },
    profile: {
      title: "Profil",
      invitationCode: "Davet Kodu",
      creditScore: "Kredi Skoru",
      balance: "Bakiye",
      todayProfit: "Bugünkü Kâr",
      frozenAmount: "Dondurulmuş Miktar",
      usd: "USD",

      // Menu Sections
      myFinancial: "Finansal İşlemlerim",
      myDetails: "Detaylarım",
      other: "Diğer",

      // Financial Items
      recharge: "Yükleme",
      withdraw: "Çekim",

      // Details Items
      contactUs: "Bize Ulaşın",
      profile: "Profil",
      updateWithdrawal: "Çekim detaylarını güncelle",

      // Other Items
      transaction: "İşlem",
      tasksHistory: "Görev Geçmişi",
      security: "Güvenlik",
      notifications: "Bildirimler",
      languages: "Diller",

      // Buttons
      logout: "Çıkış Yap",
      confirm: "Onayla",
      copied: "Kopyalandı",

      // Modals
      rechargeModal: {
        title: "Yükleme",
        text: "Yükleme yapmak için lütfen müşteri hizmetleriyle iletişime geçin"
      },
      withdrawModal: {
        title: "Çekim",
        text: "Çekim işleminize devam etmek için lütfen müşteri hizmetleriyle iletişime geçin."
      }
    },

    team: {
      title: "Profil",
      personalInformation: "Kişisel Bilgiler",
      accountDetails: "Hesap detaylarınız ve kişisel bilgileriniz",

      // Info Items
      fullName: "Tam Adı",
      email: "E-posta",
      phoneNumber: "Telefon Numarası",
      country: "Ülke",
      gender: "Cinsiyet",
      invitationCode: "Davet Kodu",

      // Gender Values
      genderNotSpecified: "Belirtilmemiş",

      // Placeholders
      notAvailable: "—"
    },

    language: {
      title: "Uygulama Dili",
      selectLanguage: "Dil Seçin",
      choosePreferred: "Tercih ettiğiniz dili seçin",
      searchPlaceholder: "Dillerde ara...",
      currentLanguage: "Mevcut Dil",

      // Language names (if needed for dynamic content)
      languages: {
        english: "İngilizce",
        french: "Fransızca",
        russian: "Rusça",
        german: "Almanca",
        spanish: "İspanyolca"
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
      title: "Müşteri Hizmetleri",
      description: "Herhangi bir sorunuz varsa veya sorunlarla karşılaşırsanız, lütfen bize e-posta gönderin veya çevrimiçi müşteri destek ekibimizle sohbet edin.",
      contactWhatsApp: "WhatsApp'tan iletişime geç",
      contactTelegram: "Telegram'dan iletişime geç"
    },

    notifications: {
      title: "Bildirimler",
      filters: {
        all: "Tümü",
        deposit: "Yatırma",
        withdraw: "Çekim"
      },
      unreadCount: "{0} okunmamış",
      emptyState: {
        title: "Bildirim bulunamadı",
        description: "Henüz {0} bildiriminiz yok."
      },

      // Notification Types
      types: {
        deposit_success: "Yatırma Başarılı",
        deposit_canceled: "Yatırma İptal Edildi",
        withdraw_success: "Çekim Başarılı",
        withdraw_canceled: "Çekim İptal Edildi",
        system: "Sistem Bildirimi",
        alert: "Önemli Uyarı",
        default: "Bildirim"
      },

      // Notification Messages
      messages: {
        deposit_success: "${0} tutarındaki yatırma işleminiz başarıyla tamamlandı.",
        deposit_canceled: "${0} tutarındaki yatırma talebiniz iptal edildi.",
        withdraw_success: "${0} tutarındaki çekim işleminiz başarıyla tamamlandı.",
        withdraw_canceled: "${0} tutarındaki çekim talebiniz iptal edildi.",
        system: "Sistem bildirimi",
        alert: "Önemli uyarı bildirimi",
        default: "Bildirim güncellemesi"
      },

      // Status
      status: {
        unread: "okunmamış",
        read: "okundu"
      }
    },

    portfolio: {
      // Status Tabs
      completed: "Tamamlandı",
      pending: "Beklemede",
      canceled: "İptal Edildi",

      // Order Information
      orderTime: "Sipariş Zamanı",
      orderNumber: "Sipariş Numarası",
      totalOrderAmount: "Toplam sipariş tutarı",
      commission: "Komisyon",
      estimatedReturn: "Tahmini getiri",

      // Product Details
      quantity: "X 1",
      currency: "USD",

      // Status Labels
      status: {
        completed: "Tamamlandı",
        pending: "Beklemede",
        canceled: "İptal Edildi"
      }
    },

    changePassword: {
      title: "Şifre Değiştir",
      header: "Şifre Değiştir",
      oldPassword: "Eski Şifre",
      newPassword: "Yeni Şifre",
      confirmPassword: "Şifreyi Onayla",
      submit: "Gönder",
      note: "Lütfen bu bilgileri dikkatlice doldurun",
      requiredField: "*"
    },

    withdraw: {
      title: "Çekim",
      withdrawAmount: "Çekim Miktarı",
      withdrawPassword: "Çekim Şifresi",
      availableBalance: "Kullanılabilir bakiye",
      confirm: "Onayla",
      rulesDescription: "Kural Açıklaması",
      rules: {
        minimum: "(1) Minimum çekim 100 USD'dir",
        paymentTime: "(2) Ödeme, çekim başvurusu onaylandıktan sonraki 1 saat içinde yapılacaktır.",
        orderCompletion: "(3) Eksik günlük sipariş gönderimi çekime tabi değildir, çekim için tüm ürünler gönderilmelidir"
      }
    },

    checkout: {
      title: "Ödeme",
      sectionAddress: "Teslimat Adresi",
      noAddress: "Henüz kayıtlı bir teslimat adresiniz yok",
      addAddress: "+ Teslimat adresi ekle",
      changeAddress: "Değiştir",
      selectAddressTitle: "Teslimat adresi seçin",
      sectionPayment: "Ödeme Yöntemi",
      codLabel: "Kapıda Ödeme",
      codDescription: "Siparişiniz geldiğinde kuryeye doğrudan nakit ödeyin.",
      sectionSummary: "Sipariş Özeti",
      itemsCount: "{0} ürün",
      subtotal: "Ara Toplam",
      deliveryFee: "Teslimat Ücreti",
      free: "Ücretsiz",
      total: "Toplam",
      placeOrder: "Siparişi Ver",
      placingOrder: "Sipariş veriliyor...",
      missingAddress: "Lütfen bir teslimat adresi seçin",
      emptyCart: "Sepetiniz boş",
      successTitle: "Sipariş verildi!",
      successMessage: "Siparişiniz başarıyla verildi. Teslimatta nakit ödeyin.",
      orderNumber: "Sipariş numarası",
      totalToPay: "Teslimatta ödenecek toplam",
      backToHome: "Ana sayfaya dön",
      done: "Tamam",
    },

    applyMerchant: {
      title: "Mağaza Başvurusu",
      intro: "Satıcı olmak için mağaza bilgilerinizi aşağıya girin.",
      storePhoto: "Mağaza Fotoğrafı",
      storeName: "Mağaza Adı",
      storeNamePlaceholder: "Mağaza adını girin",
      contact: "İletişim",
      contactPlaceholder: "Bir iletişim kişisi veya telefon numarası girin",
      idNumber: "Kimlik Numarası",
      idNumberPlaceholder: "Kimlik numaranızı girin",
      invitationCode: "Davet Kodu",
      invitationCodePlaceholder: "Davet kodunuzu girin",
      mainBusiness: "Ana İş Kolu",
      mainBusinessPlaceholder: "Ana iş kolunu seçin",
      idCardFront: "Kimlik ön yüzü fotoğrafı",
      idCardBack: "Kimlik arka yüzü fotoğrafı",
      address: "Detaylı Adres",
      addressPlaceholder: "Detaylı adresi girin",
      submit: "Başvuruyu Gönder",
      submitSuccess: "Mağaza başvurunuz gönderildi ve inceleme bekliyor.",
      missingStoreName: "Mağaza adını girin",
      missingMainBusiness: "Ana iş kolunu seçin",
      missingAddress: "Detaylı adresi girin",
      missingStorePhoto: "Mağazanızın bir fotoğrafını yükleyin",
      missingIdCardFront: "Kimliğinizin ön yüzü fotoğrafını yükleyin",
      missingIdCardBack: "Kimliğinizin arka yüzü fotoğrafını yükleyin",
      editAndResubmit: "Düzenle ve Yeniden Gönder",
      goToDashboard: "Satıcı Paneline Git",
      status: {
        pendingTitle: "Başvuru İnceleniyor",
        pendingText: "Mağaza başvurunuz inceleniyor. Onaylandığında size bildireceğiz.",
        successTitle: "Mağaza Onaylandı",
        successText: "Mağazanız onaylandı. Yönetmek için Satıcı Panelinize gidin.",
        rejectedTitle: "Başvuru Reddedildi",
        rejectedText: "Önceki başvurunuz onaylanmadı. Aşağıdaki ayrıntıları inceleyip tekrar gönderebilirsiniz.",
      },
      enumerators: {
        mainBusiness: {
          fashion_clothing: "Moda ve Giyim",
          electronics: "Elektronik",
          beauty_cosmetics: "Güzellik ve Kozmetik",
          home_living: "Ev Yaşam",
          sports_outdoors: "Spor ve Outdoor",
          toys_hobbies: "Oyuncak ve Hobi",
          food_beverages: "Gıda ve İçecek",
          all: "Tümü",
        },
      },
    },

    deliveryAddress: {
      title: "Teslimat Adresi",
      noAddresses: "Adres bulunamadı",
      addAddress: "Adres ekle",
      modalTitle: "Teslimat adresi ekle",
      editModalTitle: "Teslimat adresini düzenle",
      addressLabel: "Teslimat adresi",
      addressPlaceholder: "Detaylı adresi girin",
      contactNumberLabel: "İletişim Numarası",
      contactNumberPlaceholder: "İletişim numaranızı girin",
      contactLabel: "İletişim",
      contactPlaceholder: "Bir iletişim kişisi girin",
      submit: "Adres ekle",
      saveChanges: "Değişiklikleri kaydet",
      createSuccess: "Teslimat adresi başarıyla eklendi",
      updateSuccess: "Teslimat adresi başarıyla güncellendi",
      destroySuccess: "Teslimat adresi başarıyla silindi",
      missingAddress: "Detaylı adresi girin",
      missingContactNumber: "İletişim numaranızı girin",
      missingContact: "Bir iletişim kişisi girin",
      confirmDeleteTitle: "Bu adres silinsin mi?",
      confirmDeleteText: "Bu işlem geri alınamaz.",
      delete: "Sil",
      cancel: "İptal",
    },

    cart: {
      addedToCart: "Sepete eklendi",
    },

    topup: {
      title: "Bakiye Yükle",
      rechargeMethods: "Yükleme Yöntemleri",
      selectWallet: "Yükleme cüzdanını seçin",
      wallets: {
        eth: "ETH",
        btc: "BTC",
        usdt_trc20: "USDT (TRC-20)",
        usdt_erc20: "USDT (ERC-20)",
      },
      scanHint: "Yüklemek için QR kodu tarayın",
      copyAddress: "Yatırma adresini kopyala",
      addressCopied: "Adres panoya kopyalandı",
      fee: "Ücret",
      amount: "Yükleme tutarı",
      amountPlaceholder: "Yükleme tutarını girin",
      usdtValue: "USDT Değeri",
      fetchingRate: "Güncel kur alınıyor…",
      enterAmountForValue: "USDT değerini görmek için bir tutar girin",
      rateUnavailable: "Güncel kur şu anda alınamıyor - lütfen kısa süre sonra tekrar deneyin",
      uploadVoucher: "Yükleme dekontunu yükle",
      uploadLabel: "Dekont Yükle",
      submit: "Yüklemeyi Gönder",
      noWalletSelected: "Bir cüzdan seçin",
      missingAmount: "Yükleme tutarını girin",
      missingPhoto: "Yükleme dekontunu yükleyin",
    },

    withdrawal: {
      title: "Para Çekme Merkezi",
      withdrawalMethods: "Çekim Yöntemleri",
      selectWallet: "Çekim yöntemini seçin",
      wallets: {
        eth: "ETH",
        btc: "BTC",
        usdt_trc20: "USDT (TRC-20)",
        usdt_erc20: "USDT (ERC-20)",
      },
      availableBalance: "Kullanılabilir bakiye",
      fee: "Ücret",
      withdrawalAddress: "Çekim adresi",
      addressPlaceholder: "Alıcı cüzdan adresinizi girin veya yapıştırın",
      amount: "Çekim tutarı",
      amountPlaceholder: "Çekim tutarını girin",
      withdrawalPassword: "Çekim şifresi",
      passwordPlaceholder: "Çekim şifresini girin",
      submit: "Çekimi Onayla",
      noWalletSelected: "Bir çekim yöntemi seçin",
      missingAddress: "Alıcı cüzdan adresinizi girin",
      missingAmount: "Çekim tutarını girin",
      exceedsBalance: "Çekim tutarı kullanılabilir bakiyenizi aşıyor",
      missingPassword: "Çekim şifrenizi girin",
      youWillReceive: "Alacağınız tutar",
      fetchingRate: "Güncel kur alınıyor…",
      enterAmountToPreview: "Ne alacağınızı görmek için bir tutar girin",
      rateUnavailable: "Güncel kur şu anda alınamıyor - lütfen kısa süre sonra tekrar deneyin",
      belowFeeWarning: "Bu tutar ağ ücretini karşılamak için çok düşük",
      notice1: "Alacaklandırılan tutar, alıcı hesabınızın uyguladığı ücretlere veya gerçek zamanlı döviz kuruna göre hesaplanacaktır.",
      notice2: "Çekiminiz 24 saat içinde hesabınıza yatırılacaktır, lütfen sabırla bekleyin! 24 saat içinde yatırılmazsa lütfen çevrimiçi müşteri desteğiyle iletişime geçin.",
    },

    wallet: {
      title: "Cüzdan",
      withdrawalMethod: "Çekim yöntemi bilgileri",
      username: "Kullanıcı Adı",
      walletName: "Cüzdan Adı",
      choosePreferredCoin: "Tercih edilen coin'i seçin",
      walletAddress: "Cüzdan Adresi",
      withdrawPassword: "Çekim Şifresi",
      submit: "Gönder",
      note: "Bu bilgileri doldururken lütfen dikkatli olun",
      requiredField: "*"
    },

    grab: {
      // Header Section
      greeting: "Merhaba {0} 👏",

      // Stats Cards
      totalAmount: "Toplam Tutar",
      profitsAdded: "Kârlar buraya eklenecek",
      todaysCommission: "Bugünkü Komisyon",
      commissionEarned: "Kazanılan Komisyon",
      currency: "USD",

      // Optimization Section
      startOptimization: "Optimizasyonu Başlat",
      progressCount: "{0}/{1}",

      // Game Section
      commissionRate: "Komisyon Oranı",
      exclusiveChannel: "Özel üyeler için özel kanal",
      startButton: "Başlat",
      processing: "İşleniyor...",

      // Notice Section
      notice: "Uyarı",
      supportHours: "Çevrimiçi Destek Saatleri 10:00 - 22:00",
      contactSupport: "Yardım için lütfen çevrimiçi destekle iletişime geçin!"
    },

    grapModal: {
      orderTime: "Sipariş Zamanı",
      orderNumber: "Sipariş Numarası",
      totalOrderAmount: "Toplam sipariş tutarı",
      commission: "Komisyon",
      estimatedReturn: "Tahmini getiri",
      cancel: "İptal",
      submit: "Gönder",
      quantity: "X 1",
      currency: "USD"
    },

    actions: {
      event: "Etkinlikler",
      tc: "Şartlar ve Koşullar",
      certificate: "Sertifika",
      faq: "Sıkça Sorulan Sorular",
      company: "Şirket"
    },

    auth: {
      signin: {
        welcomeBack: "Tekrar Hoş Geldiniz!",
        signinToAccount: "Pazarlama hesabınıza giriş yapın",
        signinButton: "Giriş Yap",
        noAccount: "Hesabınız yok mu?",
        signupHere: "Buradan kaydolun."
      },
      signup: {
        createAccount: "Hesap Oluştur",
        signupForAccount: "Bir pazarlama hesabı için kaydolun",
        signupButton: "Kaydol",
        alreadyHaveAccount: "Zaten hesabınız var mı?",
        phonePlaceholder: "Telefon numaranızı girin",
        searchCountries: "Ülkelerde ara..."
      }
    },

    csPage: {
      customerSupport: "Müşteri Hizmetleri",
      hereToHelp: "Size yardımcı olmak için buradayız!",
      howCanWeHelp: "Bugün size nasıl yardımcı olabiliriz?",
      platformNames: {
        whatsapp: "WhatsApp",
        telegram: "Telegram"
      }
    },
  },


  entities: {
    record: {
      menu: "Kayıtlar",
      fields: {
        user: "kullanıcı",
        product: "ürün",
        number: "kayıt numarası",
        status: "durum",
      },
      list: {
        title: "Kayıt listesi",
      },
      view: {
        title: "Kayıt Detayı",
      },
      edit: {
        title: "Kaydı Düzenle",
      },
      create: {
        success: "Ürün başarıyla gönderildi.",
      },
      update: {
        success: "Ürün başarıyla gönderildi.",
      },
      destroy: {
        success: "Kayıt başarıyla silindi",
      },
      destroyAll: {
        success: "Kayıt başarıyla silindi",
      },
      enumerators: {
        status: {
          pending: "Beklemede",
          completed: "Tamamlandı",
          canceled: "İptal edildi",
        },
      },
    },

    category: {
      name: "kategori",
      label: "Kategoriler",
      menu: "Kategoriler",
      exporterFileName: "kategori_dışa_aktar",
      list: {
        menu: "Kategoriler",
        title: "Kategoriler",
      },
      create: {
        success: "Kategori başarıyla kaydedildi",
      },
      update: {
        success: "Kategori başarıyla kaydedildi",
      },
      destroy: {
        success: "Kategori başarıyla silindi",
      },
      destroyAll: {
        success: "Kategori(ler) başarıyla silindi",
      },
      edit: {
        title: "Kategoriyi Düzenle",
      },
      fields: {
        id: "Id",
        name: "Ad",
        slug: "Slug",
        photo: "Fotoğraf",
        metaKeywords: "Meta Anahtar Kelimeler",
        metaDescriptions: "Meta Açıklamalar",
        status: "Durum",
        isFeature: "Öne Çıkan",
        serialRange: "Seri",
        serial: "Seri",
        createdAt: "Oluşturulma tarihi",
        updatedAt: "Güncelleme tarihi",
        createdAtRange: "Oluşturulma tarihi",
      },
      enumerators: {
        status: {
          enable: "Etkin",
          disable: "Devre dışı",
        },
      },
      placeholders: {},
      hints: {},
      new: {
        title: "Yeni Kategori",
      },
      view: {
        title: "Kategoriyi Görüntüle",
      },
      importer: {
        title: "Kategorileri İçe Aktar",
        fileName: "kategori_içe_aktarım_şablonu",
        hint: "Dosya/Resim sütunları, dosyaların URL'leri olmalı ve boşlukla ayrılmalıdır.",
      },
    },

    product: {
      name: "ürün",
      label: "Ürünler",
      menu: "Ürünler",
      exporterFileName: "ürün_dışa_aktar",
      list: {
        menu: "Ürünler",
        title: "Ürünler",
      },
      create: {
        success: "Ürün başarıyla kaydedildi",
      },
      update: {
        success: "Ürün başarıyla kaydedildi",
      },
      destroy: {
        success: "Ürün başarıyla silindi",
      },
      destroyAll: {
        success: "Ürün(ler) başarıyla silindi",
      },
      edit: {
        title: "Ürünü Düzenle",
      },
      fields: {
        id: "Id",
        name: "Ad",
        slug: "Slug",
        tags: "Etiketler",
        video: "Video",
        specificationName: "Özellik Adı",
        specificationDesciption: "Özellik Açıklaması",
        isSpecification: "Özellik mi",
        details: "Detaylar",
        photo: "Fotoğraf",
        discountPriceRange: "İndirimli Fiyat",
        discountPrice: "Mevcut Fiyat",
        previousPriceRange: "Önceki Fiyat",
        previousPrice: "Önceki Fiyat",
        stockRange: "Stok",
        stock: "Stok",
        metaKeywords: "Meta Anahtar Kelimeler",
        metaDesctiption: "Kısa Açıklama",
        status: "Durum",
        isType: "Tür",
        dateRange: "Tarih",
        date: "Tarih",
        itemType: "Ürün Türü",
        file: "Dosya",
        link: "Bağlantı",
        fileType: "Dosya Türü",
        taxe: "Vergi",
        category: "Kategori",
        subcategory: "Alt Kategori",
        childcategory: "Alt Alt Kategori",
        brand: "Marka",
        gallery: "Galeri",
        createdAt: "Oluşturulma tarihi",
        updatedAt: "Güncelleme tarihi",
        createdAtRange: "Oluşturulma tarihi",
      },
      enumerators: {
        status: {
          enable: "Etkin",
          disable: "Devre dışı",
        },
        itemType: {
          physical: "Fiziksel",
          digitale: "Dijital",
        },
        fileType: {
          file: "Dosya",
          link: "Bağlantı",
        },
        isType: {
          new_arrival: "Yeni Gelen",
          feature_product: "Öne Çıkan Ürün",
          top_pdroduct: "En İyi Ürün",
          best_product: "En İyi Ürün",
          flash_deal_product: "Fırsat Ürünü",
        },
      },
      placeholders: {},
      hints: {},
      new: {
        title: "Yeni Ürün",
      },
      view: {
        title: "Ürünü Görüntüle",
      },
      importer: {
        title: "Ürünleri İçe Aktar",
        fileName: "ürün_içe_aktarım_şablonu",
        hint: "Dosya/Resim sütunları, dosyaların URL'leri olmalı ve boşlukla ayrılmalıdır.",
      },
    },
    transaction: {
      name: "işlem",
      label: "İşlemler",
      menu: "İşlemler",
      exporterFileName: "işlem_dışa_aktar",
      list: {
        menu: "İşlemler",
        title: "İşlemler",
      },
      create: {
        success: "İşlem başarıyla gönderildi",
      },
      update: {
        success: "İşlem başarıyla kaydedildi",
      },
      destroy: {
        success: "İşlem başarıyla silindi",
      },
      destroyAll: {
        success: "İşlem(ler) başarıyla silindi",
      },
      edit: {
        title: "İşlemi Düzenle",
      },
      fields: {
        id: "Id",
        amountRange: "Tutar",
        amount: "Tutar",
        email: "E-posta",
        tax: "Vergi",
        currencySign: "Para Birimi Sembolü",
        currencyValue: "Para Birimi Değeri",
        orderId: "Sipariş Kimliği",
        createdAt: "Oluşturulma tarihi",
        updatedAt: "Güncelleme tarihi",
        createdAtRange: "Oluşturulma tarihi",
      },
      enumerators: {
        status: {
          pending: "Beklemede",
          completed: "Başarılı",
          canceled: "İptal edildi",
        },
      },
      placeholders: {},
      hints: {},
      new: {
        title: "Yeni İşlem",
      },
      view: {
        title: "İşlemi Görüntüle",
      },
      importer: {
        title: "İşlemleri İçe Aktar",
        fileName: "işlem_içe_aktarım_şablonu",
        hint: "Dosya/Resim sütunları, dosyaların URL'leri olmalı ve boşlukla ayrılmalıdır.",
      },
    },


    order: {
      name: "sipariş",
      label: "Siparişler",
      menu: "Siparişler",
      exporterFileName: "sipariş_dışa_aktar",
      list: {
        menu: "Siparişler",
        title: "Siparişler",
      },
      create: {
        success: "Sipariş başarıyla kaydedildi",
      },
      update: {
        success: "Sipariş başarıyla kaydedildi",
      },
      destroy: {
        success: "Sipariş başarıyla silindi",
      },
      destroyAll: {
        success: "Sipariş(ler) başarıyla silindi",
      },
      edit: {
        title: "Siparişi Düzenle",
      },
      fields: {
        id: "Id",
        userId: "Kullanıcı",
        cart: "Sepet",
        shipping: "Nakliye",
        discountRange: "İndirim",
        discount: "İndirim",
        paymentMethod: "Ödeme Yöntemi",
        taxe: "Vergi",
        transactionNumber: "İşlem Numarası",
        orderStatus: "Sipariş Durumu",
        createdAt: "Oluşturulma tarihi",
        updatedAt: "Güncelleme tarihi",
        createdAtRange: "Oluşturulma tarihi",
      },
      enumerators: {
        orderStatus: {
          pending: "Beklemede",
          in_progress: "İşlemde",
          delivered: "Teslim edildi",
          canceled: "İptal edildi",
        },
      },
      placeholders: {},
      hints: {},
      new: {
        title: "Yeni Sipariş",
      },
      view: {
        title: "Siparişi Görüntüle",
      },
      importer: {
        title: "Siparişleri İçe Aktar",
        fileName: "sipariş_içe_aktarım_şablonu",
        hint: "Dosya/Resim sütunları, dosyaların URL'leri olmalı ve boşlukla ayrılmalıdır.",
      },
    },
  },

  user: {
    fields: {
      genre: "Cinsiyet",
      username: "Kullanıcı Adı",
      walletName: "Cüzdan Adı",
      id: "Id",
      confirmPassword: "Şifreyi Onayla",
      avatars: "Avatar",
      invitationcode: "Davet Kodu",
      email: "E-posta",
      emails: "E-posta(lar)",
      erc20: "ERC20 cüzdan adresi",
      trc20: "TRC20 cüzdan adresi",
      fullName: "Ad",
      balance: "Bakiye",
      firstName: "Ad",
      lastName: "Soyad",
      status: "Durum",
      phoneNumber: "Telefon Numarası",
      withdrawPassword: "Para Çekme Şifresi",
      sector: "Sektör",
      employer: "İşveren",
      profession: "Meslek",
      address: "Adres",
      birthDate: "Doğum Tarihi",
      maritalStatus: "Medeni Durum",
      facebookLink: "Facebook Bağlantısı",
      sponsor: "Sponsor",
      role: "Rol",
      createdAt: "Oluşturulma tarihi",
      updatedAt: "Güncelleme tarihi",
      roleUser: "Rol/Kullanıcı",
      roles: "Roller",
      createdAtRange: "Oluşturulma tarihi",
      password: "Şifre",
      oldPassword: "Eski Şifre",
      newPassword: "Yeni Şifre",
      newPasswordConfirmation: "Yeni Şifre Onayı",
      rememberMe: "Beni hatırla",
    },
    sector: {
      AGRO_ALIMENTAIRE: "Gıda endüstrisi",
      ASSURANCES: "Sigorta",
      AUDIOVISUEL: "Görsel-işitsel",
      BANCAIRE: "Bankacılık",
      CHIMIE: "Kimya",
      COMPOSANTS_AUTOMOBILES: "Otomotiv bileşenleri",
      DISTRIBUTION: "Dağıtım",
      DISTRIBUTION_AUTOMOBILE: "Otomotiv Dağıtımı",
      DIVERS: "Çeşitli",
      FINANCIER: "Finansal",
      HOLDING: "Holding",
      IMMOBILIER: "Gayrimenkul",
      INDUSTRIEL: "Endüstriyel",
      LEASING: "Leasing",
      LOGISTIQUE_TRANSPORT: "Lojistik ve taşımacılık",
      PHARMACEUTIQUE: "İlaç",
      SANTÉ: "Sağlık",
      TOURSIME: "Turizm",
      INFORMATION_TECHNOLOGY: "Bilgi Teknolojisi",
    },
    maritalStatus: {
      célébataire: "Bekar",
      marié: "Evli",
    },
    status: {
      active: "Aktif",
      invited: "Davetli",
      "empty-permissions": "İzin Bekliyor",
      inactive: "Pasif",
    },

    enumerators: {
      status: {
        USDT: "USDT",
        ETH: "ETH",
        BTC: "BTC",
      },
      gender: {
        male: "erkek",
        female: "kadın",
      }
    },
    invite: "Davet Et",
    validations: {
      // eslint-disable-next-line
      email: "E-posta ${value} geçersiz",
    },
    title: "Kullanıcılar",
    menu: "Kullanıcılar",
    doAddSuccess: "Kullanıcı(lar) başarıyla kaydedildi",
    doUpdateSuccess: "Kullanıcı başarıyla kaydedildi",
    exporterFileName: "kullanıcılar_dışa_aktar",
    doDestroySuccess: "Kullanıcı başarıyla silindi",
    doDestroyAllSelectedSuccess: "Kullanıcılar başarıyla silindi",
    edit: {
      title: "Kullanıcıyı Düzenle",
    },
    new: {
      title: "Kullanıcı(lar) Davet Et",
      titleModal: "Kullanıcı Davet Et",
      emailsHint:
        "Birden fazla e-posta adresini virgül karakteri kullanarak ayırın.",
    },
    view: {
      title: "Kullanıcıyı Görüntüle",
      activity: "Aktivite",
    },
    importer: {
      title: "Kullanıcıları İçe Aktar",
      fileName: "kullanıcılar_içe_aktarım_şablonu",
      hint: "Dosya/Resim sütunları, dosyaların URL'leri olmalı ve boşlukla ayrılmalıdır. İlişkiler, referans verilen kayıtların ID'leri olmalı ve boşlukla ayrılmalıdır. Roller, rol id'leri olmalı ve boşlukla ayrılmalıdır.",
    },
    errors: {
      userAlreadyExists: "Bu e-posta ile kullanıcı zaten mevcut",
      userNotFound: "Kullanıcı bulunamadı",
      revokingOwnPermission: `Kendi admin izninizi iptal edemezsiniz`,
    },
  },
  buttons: {
    login: "Giriş Yap",
    registerNow: "Şimdi Kaydol",
    signup: "Kayıt Ol",
    start: "Başla",
    orders: "Siparişler",
    submit: "Gönder",
    backtohome: "Ana Sayfaya Dön",
    confirm: "Onayla",
    logout: "Çıkış Yap",
    getstarted: "Başla",
  },
  text: {
    welcome: "Hoş Geldiniz",
    discover: "Size özel fırsatları keşfedin",
    signin: "Giriş Yap",
    haveaccount: "Zaten bir hesabınız var mı?",
    noaccount: "Hesabınız yok mu?",
    showingnow: "Şu An Gösterimde",
    comingsoon: "Yakında",
    termsconditions: "Şartlar & Koşullar",
    todayearning: "Bugünkü Kazanç",
    accountbalance: "Hesap Bakiyesi",
    freezebalance: "Dondurulmuş Bakiye",
    sumbitInformation: "Bilgileri Gönder",
    order: "Sipariş",
    pending: "Beklemede",
    completed: "Tamamlandı",
    canceled: "İptal Edildi",
    notransaction: "Henüz işlem bulunmamaktadır!",
    createdtime: "Oluşturulma Zamanı",
    creationtime: "Oluşturma zamanı",
    orderNumber: "Sipariş Numarası",
    orderamount: "Sipariş Tutarı",
    income: "Gelir",
    buyerating: "Alıcı Puanı",
    uid: "UID",
    promotioncode: "Promosyon Kodu",
    walletamount: "Cüzdan Bakiyesi",
    creditassesment: "Kredi Değerlendirmesi",
    myfinance: "Finanslarım",
    withdraw: "Para Çek",
    mydetails: "Bilgilerim",
    profile: "Profil",
    wallet: "Cüzdan",
    other: "Diğer",
    customersupport: "Müşteri Desteği",
    transaction: "İşlem",
    taskshistory: "Görev Geçmişi",
    security: "Güvenlik",
    sponsor: `Güvenliğimiz en büyük önceliğimizdir ve sizi 
              potansiyel risklerden korumak istiyoruz. Lütfen unutmayın, 
              asla bilinmeyen bir adrese para göndermenizi istemeyiz. 
              Ödeme yapmadan önce lütfen bilgileri bizimle doğrulayın.`,
  },
  errors: {
    backToHome: "Ana Sayfaya Dön",
    continueShopping: "Alışverişe Devam Et",
    title403: "Erişim Reddedildi",
    title404: "Sayfa Bulunamadı",
    title500: "Bir Şeyler Ters Gitti",
    403: "Üzgünüz, bu sayfaya erişim yetkiniz yok",
    404: "Üzgünüz, ziyaret ettiğiniz sayfa mevcut değil",
    500: "Üzgünüz, sunucu bir hata bildiriyor",
    429: "Çok fazla istek gönderildi. Lütfen daha sonra tekrar deneyin.",
    forbidden: {
      message: "Erişim Engellendi",
    },
    validation: {
      message: "Bir hata oluştu",
    },
    defaultErrorMessage: "Üzgünüz, bir hata oluştu",
  },

  withdraw: {
    withdrawamount: "Çekilecek Tutar",
    Withdrawpassword: "Çekim Şifresi",
    availablebalance: "Mevcut Bakiye",
    rules: "Kurallar Açıklaması",
    rule1: "Minimum çekim tutarı 20$",
    rule2: "Çekim talebi yapıldıktan sonra ödeme 24 saat içinde yapılacaktır",
    rule3: "Günlük siparişlerin tamamı verilmezse çekim yapılamaz, tüm ürünler sunulmalıdır"
  },
  profile: {
    profile: "Profil",
    fullname: "Tam Ad",
    email: "E-Posta",
    phonenumber: "Telefon Numarası",
    country: "Ülke",
    Invitationcode: "Davet Kodu"
  },
  wallet: {
    wallet: "Cüzdan",
    info: "Çekim yöntemi bilgileri",
    username: "Kullanıcı Adı",
    walletname: "Cüzdan Adı",
    walletaddress: "Cüzdan Adresi",
    note: "Not",
    notedesctiption: "Lütfen bu bilgileri doldururken dikkatli olun."
  },

  cs: {
    cs: "Müşteri Hizmetleri",
    note: "Sorularınız veya sorunlarınız varsa, lütfen bize e-posta gönderin veya çevrimiçi müşteri destek ekibimizle sohbet edin.",
    contactnow: "Şimdi İletişime Geç"
  },
  transaction: {
    transaction: "İşlem",
    all: "Tümü",
    withdraw: "Para Çekme",
    dposit: "Para Yatırma",
    notransaction: "Henüz işlem bulunmamaktadır!"
  },
  order: {
    order: "Sipariş",
    completed: "Tamamlandı",
    pending: "Beklemede",
    canceled: "İptal Edildi",
    ordertime: "Sipariş Zamanı",
    ordernumber: "Sipariş Numarası",
    total: "Toplam Sipariş Tutarı",
    commission: "Komisyon",
    return: "Tahmini Getiri"
  },

  security: {
    changepassword: "Şifre Değiştir",
    oldpassword: "Eski Şifre",
    newpassword: "Yeni Şifre",
    confirmpassword: "Şifreyi Onayla",
    note: "Not",
    notedesc: "Lütfen bu bilgileri dikkatlice doldurun"
  },

  auth: {
    tenants: "Çalışma Alanları",
    singindesc: "Giriş yapmak için e-postanızı ve şifrenizi girin",
    signupdesc: "Kaydolmak için e-postanızı ve şifrenizi girin",
    profile: {
      title: "Profil",
      success: "Profil başarıyla güncellendi",
      vip: "Aboneliğiniz için tebrikler",
    },
    createAnAccount: "Hesap Oluştur",
    rememberMe: "Beni Hatırla",
    forgotPassword: "Şifremi Unuttum",
    signin: "Giriş Yap",
    signup: "Kaydol",
    signout: "Çıkış Yap",
    alreadyHaveAnAccount: "Zaten bir hesabınız var mı? Giriş yapın.",
    social: {
      errors: {
        "auth-invalid-provider":
          "Bu e-posta başka bir sağlayıcıda zaten kayıtlı.",
        "auth-no-email": "Bu hesapla ilişkilendirilen e-posta özel veya mevcut değil.",
      },
    },
    signinWithAnotherAccount: "Başka bir hesapla giriş yap",
    emailUnverified: {
      message: `Lütfen devam etmek için e-postanızı <strong>{0}</strong> adresinde onaylayın.`,
      submit: "E-posta Doğrulamasını Tekrar Gönder",
    },
    emptyPermissions: {
      message: "Henüz herhangi bir izniniz yok. Yönetici tarafından yetki verilmesini bekleyin.",
    },
    passwordResetEmail: {
      message: "Şifre sıfırlama e-postası gönder",
      error: "E-posta tanınmıyor",
    },
    passwordReset: {
      message: "Şifreyi Sıfırla",
    },
    passwordChange: {
      title: "Şifreyi Değiştir",
      success: "Şifre başarıyla değiştirildi",
      mustMatch: "Şifreler eşleşmelidir",
    },
    emailAddressVerificationEmail: {
      error: "E-posta tanınmıyor",
    },
    verificationEmailSuccess: "Doğrulama e-postası başarıyla gönderildi",
    passwordResetEmailSuccess: "Şifre sıfırlama e-postası başarıyla gönderildi",
    passwordResetSuccess: "Şifre başarıyla değiştirildi",
    verifyEmail: {
      success: "E-posta başarıyla doğrulandı.",
      message: "Biraz bekleyin, e-postanız doğrulanıyor...",
    },
  },

  tabbarmenue: {
    home: "Ana Sayfa",
    rate: "Değerlendir",
    profile: "Profil"
  },
  validation: {
    mixed: {
      default: "${path} geçersiz",
      required: "${path} zorunludur",
      oneOf: "${path} şu değerlerden biri olmalıdır: ${values}",
      notOneOf: "${path} şu değerlerden biri olmamalıdır: ${values}",
      notType: ({ path, type, value, originalValue }) => {
        return `${path} bir ${type} olmalıdır`;
      },
    },
    string: {
      length: "${path} tam olarak ${length} karakter olmalıdır",
      min: "${path} en az ${min} karakter olmalıdır",
      max: "${path} en fazla ${max} karakter olmalıdır",
      matches: '${path} şu desenle eşleşmelidir: "${regex}"',
      email: "${path} geçerli bir e-posta adresi olmalıdır",
      url: "${path} geçerli bir URL olmalıdır",
      trim: "${path} başında ve sonunda boşluk olmamalıdır",
      lowercase: "${path} küçük harflerden oluşmalıdır",
      uppercase: "${path} büyük harflerden oluşmalıdır",
      selected: "${path} seçilmelidir",
    },
    number: {
      min: "${path} ${min} veya daha büyük olmalıdır",
      max: "${path} ${max} veya daha küçük olmalıdır",
      lessThan: "${path} ${less} değerinden küçük olmalıdır",
      moreThan: "${path} ${more} değerinden büyük olmalıdır",
      notEqual: "${path} ${notEqual} değerine eşit olmamalıdır",
      positive: "${path} pozitif bir sayı olmalıdır",
      negative: "${path} negatif bir sayı olmalıdır",
      integer: "${path} bir tam sayı olmalıdır",
    },
    date: {
      min: "${path} ${min} tarihinden sonra olmalıdır",
      max: "${path} ${max} tarihinden önce olmalıdır",
    },
    boolean: {},
    object: {
      noUnknown:
        "${path} belirtilmeyen anahtarlar içermemelidir",
    },
    array: {
      min: ({ min, path }) =>
        min === 1
          ? `${path} zorunludur`
          : `${path} en az ${min} öğe içermelidir`,
      max: "${path} en fazla ${max} öğe içermelidir",
    },
  },
  /* eslint-disable */
  fileUploader: {
    upload: "Yükle",
    image: "Bir resim yüklemelisiniz",
    size: "Dosya çok büyük. Maksimum izin verilen boyut {0}",
    formats: `Geçersiz format. Şunlardan biri olmalıdır: {0}.`,
  },

  estore: {
    auth: {
      login: {
        title: "Giriş Yap",
        tagline: "Daha fazla alışveriş yapın, daha iyi yaşayın",
        phoneOrEmail: "Telefon / E-posta",
        phoneOrEmailPlaceholder: "Telefon / E-posta",
        password: "Şifreyi girin",
        passwordPlaceholder: "Giriş Şifresi",
        forgotPassword: "Şifremi unuttum",
        noAccount: "Hesabınız yok mu?",
        signUp: "Kayıt ol",
        loginButton: "Giriş Yap",
      },
    },
    header: {
      home: "Ana Sayfa",
      searchPlaceholder: "Ürün, marka ve kategori ara...",
      search: "Ara",
      cart: "Sepet",
      loginRegister: "Giriş / Kayıt",
      myAccount: "Hesabım",
      myOrders: "Siparişlerim",
      signOut: "Çıkış Yap",
      allCategories: "Tüm Kategoriler",
      account: "Hesap",
    },
    categories: {
      "Women Clothing": "Kadın Giyim",
      "Women Shoes": "Kadın Ayakkabı",
      "Women Bags": "Kadın Çanta",
      "Accessories": "Aksesuarlar",
      "Lifestyle": "Yaşam Tarzı",
      "Global Purchase": "Küresel Alışveriş",
      "Girls": "Kız Çocuk",
      "Boys": "Erkek Çocuk",
      "Men Clothing": "Erkek Giyim",
      "Men Shoes": "Erkek Ayakkabı",
      "Men Bags": "Erkek Çanta",
    },
    pc: {
      common: {
        saving: "Kaydediliyor...",
        confirm: "Onayla",
        save: "Kaydet",
        cancel: "İptal",
        loading: "Yükleniyor...",
        edit: "Düzenle",
        delete: "Sil",
        submit: "Gönder",
        update: "Güncelle",
      },
      records: {
        transactions: "İşlemler",
        processing: "İşleniyor",
        completed: "Tamamlandı",
        canceled: "İptal edildi",
        id: "ID",
        time: "Saat",
        viewProof: "Kanıtı görüntüle",
      },
      messages: {
        title: "Mesajlar",
        markAllRead: "Tümünü okundu işaretle",
        loading: "Yükleniyor...",
        empty: "Henüz mesaj yok.",
        today: "Bugün",
        earlier: "Daha önce",
        amount: "Tutar",
        depositSuccess: "Para yatırma başarılı",
        depositCanceled: "Para yatırma iptal edildi",
        withdrawSuccess: "Para çekme başarılı",
        withdrawCanceled: "Para çekme iptal edildi",
        systemNotice: "Sistem bildirimi",
        alert: "Uyarı",
        notification: "Bildirim",
      },
      withdrawal: {
        deductedFromBalance: "Bakiyeden düşüldü",
      },
      myAccount: {
        title: "Hesabım",
        storeId: "Mağaza ID",
        id: "ID",
        copied: "Kopyalandı",
        copy: "Kopyala",
        idCopied: "{0} panoya kopyalandı",
        username: "Kullanıcı adı",
        phoneNumber: "Telefon numarası",
        notBound: "Bağlı değil",
        email: "E-posta",
        loginPassword: "Giriş şifresi",
        change: "Değiştir",
        changeLoginPassword: "Giriş şifresini değiştir",
        currentPassword: "Mevcut şifre",
        currentPasswordPlaceholder: "Mevcut şifrenizi girin",
        newPassword: "Yeni şifre",
        newPasswordPlaceholder: "En az 6 karakter",
        confirmNewPassword: "Yeni şifreyi onayla",
        confirmNewPasswordPlaceholder: "Yeni şifreyi tekrar girin",
        cancel: "İptal",
        saveChanges: "Değişiklikleri kaydet",
        securityHint: "Hesabınızı güvende tutun — şifrenizi veya doğrulama kodlarınızı asla kimseyle paylaşmayın.",
      },
      applyMerchant: {
        loading: "Yükleniyor...",
        idCard: "Kimlik Kartı",
        submitting: "Gönderiliyor...",
      },
      wholesale: {
        title: "Toptan Yönetimi",
        all: "Tümü",
        lowestPrice: "En düşük fiyat",
        highestPrice: "En yüksek fiyat",
        filter: "Filtrele",
        loadingItems: "Ürünler yükleniyor…",
        showing: "Gösteriliyor",
        of: "/",
        item: "ürün",
        items: "ürün",
        inCategory: "{0} içinde",
        emptyTitle: "Bu filtreyle eşleşen ürün yok",
        emptyText: "Farklı bir kategori veya fiyat aralığı deneyin.",
        added: "Eklendi",
        add: "Ekle",
        loadingMore: "Yükleniyor…",
        reachedEnd: "Sona ulaştınız.",
        salesPrice: "Satış fiyatı",
        wholesalePrice: "Toptan fiyat",
        cancel: "İptal",
        confirming: "Onaylanıyor…",
        confirmListing: "İlanı onayla",
        alreadyListed: "Zaten toptan ilanlarınıza eklenmiş.",
        addedToListings: '"{0}" toptan ilanlarınıza eklendi.',
      },
      sellerSetup: {
        title: "Ayarlar",
        loading: "Mağaza ayarları yükleniyor…",
        noStoreTitle: "Bu hesap için mağaza bulunamadı",
        noStoreText: "Mağaza ayarlarını yönetmek için satıcı olmak üzere başvurun.",
        storeInformation: "Mağaza Bilgileri",
        storeInfoSub: "Mağaza detaylarınızı ve işletme bilgilerinizi güncelleyin.",
        storeLogo: "Mağaza Logosu",
        uploadLogoSub: "Mağazanız için bir logo yükleyin",
        store: "Mağaza",
        uploading: "Yükleniyor…",
        uploadLogo: "Logo Yükle",
        storeName: "Mağaza Adı *",
        storeNamePlaceholder: "Mağazanızın adı",
        storeNameRequired: "Mağaza adı gereklidir.",
        storeDescription: "Mağaza Açıklaması",
        storeDescriptionPlaceholder: "Mağazanızı tanımlayın...",
        businessEmail: "İşletme E-postası *",
        businessPhone: "İşletme Telefonu",
        businessPhonePlaceholder: "Telefon numarası",
        saving: "Kaydediliyor…",
        saveChanges: "Değişiklikleri kaydet",
        storeBanner: "Mağaza Afişi",
        storeBannerSub: "Mağaza sayfanızın üstünde gösterilir.",
        noBanner: "Afiş yüklenmedi",
        uploadBanner: "Afiş Yükle",
      },
      productManagement: {
        title: "Ürün Yönetimi",
        addProduct: "+ Ürün Ekle",
        searchPlaceholder: "Ürün ara...",
        loadingProducts: "Ürünleriniz yükleniyor…",
        showing: "Gösteriliyor",
        of: "/",
        products: "ürün",
        emptyTitle: "Henüz listelenmiş ürün yok",
        emptyText: "Burada görmek için Toptan Yönetiminden ürün ekleyin.",
        goToWholesale: "Toptan Yönetimine Git",
        noMatchesTitle: "Eşleşme yok",
        noMatchesText: "Şununla eşleşen ürün yok",
        wholesale: "Toptan",
        sales: "Satış",
      },
      sellerOrders: {
        title: "Mağaza Siparişleri",
        lumpSum: "Toplu tutar",
        salesProfit: "Satış kârı",
        wholesalePrice: "Toptan fiyat",
        actualPayment: "Gerçek ödeme",
        processing: "İşleniyor…",
        goToShipment: "Sevkiyata git",
        profitCredited: "Kâr hesaba yatırıldı",
        refunded: "İade edildi",
        awaitingReview: "İnceleme bekleniyor",
        paid: "Ödendi",
        waitingForDelivery: "Teslimat bekleniyor",
        waitingForReceipt: "Teslim alma bekleniyor",
        completed: "Tamamlandı",
        refundAfterSales: "İade / Satış sonrası",
        emptyTitle: "Henüz burada bir şey yok",
        emptyText: "Bu aşamadaki siparişler burada görünecek.",
      },
      sellerHub: {
        loadingShop: "Mağazanız yükleniyor...",
        storeFrozen: "Mağaza Donduruldu",
        frozenText: "Bir sipariş çok uzun süre teslimatı beklediği için satıcı hesabınız geçici olarak donduruldu. Bu sorun çözülene kadar satıcı paneline erişemezsiniz.",
        contactSupport: "Müşteri Hizmetleriyle İletişime Geç",
        backToBuyer: "Alıcı hesabına dön",
        accountBalance: "Hesap Bakiyesi",
        viewShop: "Mağazayı Görüntüle",
        orderFulfillment: "Sipariş Karşılama",
        waitingForDelivery: "Teslimat bekleniyor",
        waitingForReceipt: "Teslim alma bekleniyor",
        completed: "Tamamlandı",
        refundAfterSales: "İade / Satış sonrası",
        quickActions: "Hızlı İşlemler",
        topUp: "Bakiye Yükle",
        withdrawal: "Para Çekme",
        wholesaleCatalog: "Toptan Katalog",
        manageProducts: "Ürünleri Yönet",
      },
      shopDetails: {
        title: "Mağaza Detayları",
        loading: "Mağaza detayları yükleniyor…",
        noStoreTitle: "Henüz bir mağazanız yok",
        noStoreText: "Mağaza detaylarınızı burada görmek için satıcı olmak üzere başvurun.",
        applyNow: "Şimdi Başvur",
        accountBalance: "Hesap Bakiyesi",
        storeHealth: "Mağaza Durumu",
        creditScore: "Kredi Puanı",
        followers: "Takipçiler",
        todaysOrders: "Bugünkü Siparişler",
        cumulativeOrderQty: "Toplam Sipariş Adedi",
        salesPerformance: "Satış Performansı",
        todaysSales: "Bugünkü Satışlar",
        totalSales: "Toplam Satışlar",
        todaysProfit: "Bugünkü Kâr",
        totalProfit: "Toplam Kâr",
      },
      mineSeller: {
        menu: {
          dashboard: "Panel",
          wholesale: "Toptan Yönetimi",
          shopDetails: "Mağaza Detayları",
          products: "Ürün Yönetimi",
          orders: "Siparişler",
          billing: "Fatura Kayıtları",
          addresses: "Teslimat Adresleri",
          support: "Hizmet Merkezi",
          loginPassword: "Giriş Şifresi",
          paymentPassword: "Ödeme Şifresi",
          settings: "Ayarlar",
        },
        myStore: "Mağazam",
        seller: "Satıcı",
        switchToBuyer: "Alıcı hesabına geç",
        logOut: "Çıkış Yap",
      },
      mineHub: {
        storeFrozen: "Mağaza Donduruldu",
        storeFrozenSub: "Satıcı hesabınız geçici olarak donduruldu.",
        contactSupport: "Müşteri Hizmetleriyle İletişime Geç",
        storeApproved: "Mağaza Başvurusu Onaylandı!",
        storeApprovedSub: "Satıcı hesabınız aktif.",
        goToSellerDashboard: "Satıcı Paneline Git",
        accountBalance: "Hesap Bakiyesi",
        myAccount: "Hesabım",
        myStuff: "Eşyalarım",
        myCollection: "Koleksiyonum",
        myBrowse: "Son Görüntülenenler",
        myOrders: "Siparişlerim",
        viewAll: "Tümünü Gör",
        paymentPending: "Ödeme Bekleniyor",
        inShipping: "Kargoda",
        received: "Teslim Alındı",
        completed: "Tamamlandı",
        refund: "İade",
        quickActions: "Hızlı İşlemler",
        topUp: "Bakiye Yükle",
        withdrawal: "Para Çekme",
        sellerDashboard: "Satıcı Paneli",
        applyMerchant: "Satıcı Ol",
      },
      addresses: {
        title: "Teslimat Adresleri",
        addAddress: "+ Adres Ekle",
        editAddress: "Adresi Düzenle",
        addNewAddress: "Yeni Adres Ekle",
        address: "Adres",
        addressPlaceholder: "Sokak, şehir, eyalet, posta kodu",
        contactName: "İletişim Adı",
        contactNamePlaceholder: "Alıcının adı",
        contactNumber: "İletişim Numarası",
        contactNumberPlaceholder: "Telefon numarası",
        cancel: "İptal",
        saving: "Kaydediliyor...",
        saveAddress: "Adresi Kaydet",
        emptyTitle: "Kayıtlı adres yok",
        emptyText: "Ödeme işlemini hızlandırmak için bir teslimat adresi ekleyin.",
        deleteConfirm: "Bu adres silinsin mi?",
        yesDelete: "Evet, sil",
        edit: "Düzenle",
        delete: "Sil",
      },
      settings: {
        title: "Ayarlar",
        publicProfile: "Genel Profil",
        publicProfileSub: "Bu bilgiler yorumlarınızda ve profilinizde gösterilecektir.",
        uploading: "Yükleniyor…",
        changeAvatar: "Avatarı Değiştir",
        displayName: "Görünen Ad",
        displayNamePlaceholder: "Görünen adınız",
        displayNameRequired: "Görünen ad gereklidir.",
        emailAddress: "E-posta Adresi",
        emailHint: "E-posta adresinizi değiştirmek için destek ile iletişime geçin.",
        saving: "Kaydediliyor…",
        saveChanges: "Değişiklikleri kaydet",
        accountStats: "Hesap İstatistikleri",
        orders: "Siparişler",
        reviews: "Yorumlar",
        wishlist: "İstek Listesi",
        joined: "Katılım Tarihi",
      },
      myOrders: {
        title: "Siparişlerim",
        emptyTitle: "Henüz sipariş yok",
        emptyText: "Verdiğiniz siparişler burada görünecek.",
        startShopping: "Alışverişe Başla",
        order: "Sipariş",
        total: "Toplam",
        statusPending: "Beklemede",
        statusConfirmed: "Onaylandı",
        statusShipped: "Kargoya Verildi",
        statusDelivered: "Teslim Edildi",
        statusCancelled: "İptal Edildi",
      },
      balance: {
        title: "Bakiye",
        totalBalance: "Toplam Bakiye",
        accountBalance: "Hesap Bakiyesi",
        availableBalance: "Kullanılabilir Bakiye",
        deposit: "Bakiye Yükleme",
        withdraw: "Para Çek",
        hint: "Kullanılabilir bakiye alışverişler için kullanılabilir ve bağlı cüzdanınıza çekilebilir.",
      },
      depositRecord: {
        title: "Yükleme Kayıtları",
        totalDeposited: "Toplam Yüklenen",
      },
      withdrawalRecord: {
        title: "Çekim Kayıtları",
        totalWithdrawn: "Toplam Çekilen",
      },
      paymentPassword: {
        title: "Ödeme Şifresi",
        oldPlaceholder: "Mevcut işlem şifrenizi girin",
        newPlaceholder: "Yeni işlem şifrenizi girin",
        confirmPlaceholder: "Yeni işlem şifrenizi onaylayın",
        hint: "İşlem şifreniz para çekme işlemlerini ve diğer hassas hesap değişikliklerini onaylamak için kullanılır. Güvende tutun ve asla kimseyle paylaşmayın.",
      },
      login: {
        brandTitle: "Daha fazla alışveriş yapın, daha iyi yaşayın",
        brandSubtitle: "Binlerce ürün, uygun fiyatlar, kapınıza kadar teslim.",
        title: "Tekrar hoş geldiniz",
        subtitle: "Alışverişe devam etmek için giriş yapın",
        password: "Şifre",
        forgotPassword: "Şifremi unuttum?",
      },
      register: {
        brandTitle: "Bugün Estore'a Katılın",
        brandSubtitle: "Siparişleri takip etmek, adres kaydetmek ve daha hızlı ödeme yapmak için bir hesap oluşturun.",
        title: "Hesabınızı oluşturun",
        subtitle: "Estore'a katılın ve daha akıllıca alışveriş yapın",
        email: "E-posta",
        emailPlaceholder: "E-postanızı girin",
        getOtp: "OTP Al",
        otp: "Doğrulama Kodu",
        otpPlaceholder: "E-postanıza gönderilen kodu girin",
        phoneNumber: "Telefon Numarası",
        phoneNumberPlaceholder: "Telefon numarası",
        password: "Şifre",
        passwordPlaceholder: "Bir şifre oluşturun",
        confirmPassword: "Şifreyi Onayla",
        confirmPasswordPlaceholder: "Şifrenizi tekrar girin",
        registerButton: "Kayıt Ol",
        haveAccount: "Zaten bir hesabınız var mı?",
        logIn: "Giriş Yap",
      },
      checkout: {
        loading: "Yükleniyor...",
        qty: "Adet",
      },
      mine: {
        myBrowse: {
          title: "Son Görüntülenenler",
          emptyTitle: "Henüz görüntüleme geçmişi yok",
          emptyText: "Görüntülediğiniz ürünler, kaldığınız yerden devam edebilmeniz için burada görünecek.",
          startShopping: "Alışverişe Başla",
        },
        myCollection: {
          title: "Koleksiyonum",
          emptyTitle: "Henüz kaydedilmiş ürün yok",
          emptyText: "Kaydettiğiniz ürünler burada görünecek, böylece onları hızlıca bulabilirsiniz.",
          browseProducts: "Ürünlere Göz At",
        },
        support: {
          title: "Canlı Destek",
          emptyTitle: "Destek ekibimiz kısa süre içinde size dönecek",
          emptyText: "Bir sohbet başlatın, en kısa sürede yanıtlayacağız.",
        },
        menu: {
          account: "Hesabım",
          balance: "Bakiye",
          orders: "Siparişlerim",
          deposit: "Bakiye Yükleme",
          depositRecord: "Yükleme Kayıtları",
          withdrawal: "Para Çekme",
          withdrawalRecord: "Çekim Kayıtları",
          paymentPassword: "Ödeme Şifresi",
          addresses: "Teslimat Adresleri",
          collection: "Koleksiyonum",
          browse: "Son Görüntülenenler",
          messages: "Mesajlar",
          settings: "Ayarlar",
          support: "Canlı Destek",
        },
        goToSellerDashboard: "Satıcı Paneline Git",
        applyMerchant: "Satıcı Ol",
        logOut: "Çıkış Yap",
      },
      cart: {
        title: "Sepetim",
        empty: "Sepetiniz boş.",
        continueShopping: "Alışverişe Devam Et",
        product: "Ürün",
        price: "Fiyat",
        quantity: "Adet",
        subtotal: "Ara Toplam",
        remove: "Kaldır",
        orderSummary: "Sipariş Özeti",
        items: "Ürün",
        shipping: "Kargo",
        calculatedAtCheckout: "Ödemede hesaplanır",
        total: "Toplam",
        proceedToCheckout: "Ödemeye Geç",
        continueShoppingArrow: "← Alışverişe Devam Et",
      },
      productDetails: {
        notFound: "Ürün bulunamadı.",
        noImage: "Görsel yok",
        description: "Açıklama",
        quantity: "Adet",
        addToCart: "Sepete Ekle",
        buyNow: "Şimdi Satın Al",
      },
      classification: {
        searchPlaceholder: "Kategorilerde ara",
        categories: "Kategoriler",
        loading: "Yükleniyor...",
        noCategories: "Kategori yok",
        category: "Kategori",
        noProducts: "Bu kategoride ürün bulunamadı.",
        loadingMore: "Yükleniyor...",
        reachedEnd: "Sona ulaştınız.",
      },
      home: {
        allCategories: "Tüm Kategoriler",
        loading: "Yükleniyor...",
        noCategories: "Henüz kategori yok.",
        browseAll: "Tüm kategorilere göz atın",
        aboutSection: "E-store Fashion Hakkında",
        aboutUs: "Hakkımızda",
        joinUs: "Bize Katılın",
        contactUs: "Bize Ulaşın",
        exchangeCooperation: "Değişim ve İşbirliği",
        merchantAgreement: "Satıcı Anlaşması",
        supplierCooperation: "Tedarikçi İşbirliği",
        strategicManagementHeading: "Stratejik Yönetim",
        strategicManagement: "Stratejik Yönetim",
        precisionOperation: "Hassas Operasyon",
        courseDriven: "Kurs Odaklı",
        faq: "Sıkça Sorulan Sorular",
        downloadApp: "Uygulamayı İndir",
        globalPurchase: "Küresel Alışveriş",
        heroWelcomeBack: "Tekrar hoş geldiniz",
        heroWelcomeGuest: "Hoş geldiniz, güzelim",
        heroGreeting: "Merhaba, {0} 👋",
        heroDefaultTitle: "Her Kadın İçin Stil",
        heroSlide1Text: "Parlamayı seven kadınlar için özenle seçilmiş elbiseler, ayakkabılar ve aksesuarlar.",
        heroSlide1Cta: "Kadın Ürünlerine Git",
        heroSlide2Eyebrow: "Sınırlı süre",
        heroSlide2Title: "Kadın Modasında %50'ye Varan İndirim",
        heroSlide2Text: "Gardırobunuzu bu sezonun favorileriyle yenileyin.",
        heroSlide2Cta: "İndirime Git",
        heroSlide3Eyebrow: "Yeni Gelenler",
        heroSlide3Title: "Seveceğiniz Mücevherler",
        heroSlide3Text: "Zarif kolyelerden dikkat çekici çantalara — her kombini şıklıkla tamamlayın.",
        heroSlide3Cta: "Aksesuarları Keşfet",
        heroSlide4Eyebrow: "Sadece bu hafta",
        heroSlide4Title: "50$ ve Üzeri Siparişlerde Ücretsiz Kargo",
        heroSlide4Text: "Kod gerekmez — indirim ödeme sırasında otomatik olarak uygulanır.",
        heroSlide4Cta: "Alışverişe Başla",
        trustShippingTitle: "Ücretsiz Kargo",
        trustShippingText: "50$ üzeri siparişlerde",
        trustReturnsTitle: "Kolay İade",
        trustReturnsText: "30 günlük iade süresi",
        trustCheckoutTitle: "Güvenli Ödeme",
        trustCheckoutText: "Verileriniz korunur",
        trustSupportTitle: "7/24 Destek",
        trustSupportText: "İhtiyacınız olduğunda buradayız",
        flashDeals: "Flaş Fırsatlar",
        limitedTime: "Sınırlı süre",
        justForYou: "Sadece Sizin İçin",
        seeAll: "Tümünü Gör",
        noMoreProducts: "Şu anda gösterilecek başka ürün yok.",
        add: "Ekle",
        previousSlide: "Önceki slayt",
        nextSlide: "Sonraki slayt",
        close: "Kapat",
        infoEmpty: "Bu içerik henüz eklenmedi. Lütfen daha sonra tekrar kontrol edin.",
      },
      footer: {
        blurb: "İhtiyacınız olan her şey, kapınıza teslim edilir.",
        shopHeading: "Mağaza",
        accountHeading: "Hesap",
        supportHeading: "Destek",
        helpCenter: "Yardım Merkezi",
        shipping: "Kargo ve Teslimat",
        returns: "İadeler",
        deliveryAddresses: "Teslimat Adresleri",
        login: "Giriş Yap",
        createAccount: "Hesap Oluştur",
        rights: "© {0} Estore. Tüm hakları saklıdır.",
      },
    },
  },

};

export default tr;
