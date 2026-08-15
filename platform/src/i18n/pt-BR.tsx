

const ptBR = {
  app: {
    title: "Zalando"
  },
  inputs: {
    username: "Nome de Usuário",
    password: "Senha",
    phoneNumber: "Número de Telefone",
    withdrawPassword: "Senha de Saque",
    confirmPassword: "Confirmar Senha",
    invitationcode: "Código de Convite",
    walletaddress: "Endereço da carteira"

  },




  pages: {
    home: {
      levels: "Níveis VIP",
      chooseLevel: "Escolha seu nível para maximizar seus ganhos",
      welcome: "Bem-vindo",
      announcement: "Caros usuários, a plataforma E-clicks Digital está de volta ao melhor e normal, continuem a ganhar o máximo possível da plataforma",

      // Action Buttons
      services: "Serviços",
      events: "Eventos",
      about: "Sobre",
      terms: "T&C",
      certificate: "Certificado",
      faqs: "FAQ",

      // VIP Level Cards
      currentLevel: "Atual",
      upgrade: "Atualizar",
      profitNormal: "lucro em produtos normais",
      profitPremium: "lucro em produtos premium",
      maxOrders: "Máximo de pedidos por dia",

      // Modal
      modal: {
        levelDetails: "Detalhes do Nível",
        levelLimit: "Limite do Nível",
        dailyOrders: "Pedidos Diários",
        commissionRate: "Taxa de Comissão",
        cancel: "Cancelar",
        upgradeNow: "Atualizar Agora"
      }
    },


    prizeModal: {
      congratulations: "Parabéns!",
      spinning: "Girando...",
      prizeWon: "Você ganhou!",
      currency: "USD",
      prizeBreakdown: "Detalhes do Prêmio",
      totalAmount: "Valor Total",
      yourWinnings: "Seu Ganho",
      claimPrize: "Resgatar Prêmio",
      celebrationMessage: "Aproveite sua recompensa!",
    },

    tabBottomNavigator: {
      home: "Início",
      grap: "Capturar",
      records: "Registros",
      starting: "Iniciar"
    },
    transaction: {
      title: "Histórico de Transações",
      filters: {
        all: "Todas",
        withdraw: "Saque",
        deposit: "Depósito"
      },
      recentTransactions: "Transações Recentes",
      transactionCount: "{0} transações",
      types: {
        deposit: "Depósito",
        withdrawal: "Saque"
      },
      status: {
        completed: "Concluído",
        processing: "Processando",
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
      invitationCode: "Código de Convite",
      creditScore: "Pontuação de Crédito",
      balance: "Saldo",
      todayProfit: "Lucro de Hoje",
      frozenAmount: "Valor Congelado",
      usd: "USD",

      // Menu Sections
      myFinancial: "Minhas Finanças",
      myDetails: "Meus Detalhes",
      other: "Outro",

      // Financial Items
      recharge: "Recarregar",
      withdraw: "Sacar",

      // Details Items
      contactUs: "Contate-nos",
      profile: "Perfil",
      updateWithdrawal: "Atualizar detalhes de saque",

      // Other Items
      transaction: "Transação",
      tasksHistory: "Histórico de Tarefas",
      security: "Segurança",
      notifications: "Notificações",
      languages: "Idiomas",

      // Buttons
      logout: "Sair",
      confirm: "Confirmar",
      copied: "Copiado",

      // Modals
      rechargeModal: {
        title: "Recarregar",
        text: "Por favor, entre em contato com o serviço ao cliente para recarregar"
      },
      withdrawModal: {
        title: "Saque",
        text: "Por favor, entre em contato com o serviço ao cliente para proceder com seu saque."
      }
    },

    team: {
      title: "Perfil",
      personalInformation: "Informações Pessoais",
      accountDetails: "Seus detalhes da conta e informações pessoais",

      // Info Items
      fullName: "Nome Completo",
      email: "E-mail",
      phoneNumber: "Número de Telefone",
      country: "País",
      gender: "Gênero",
      invitationCode: "Código de Convite",

      // Gender Values
      genderNotSpecified: "Não especificado",

      // Placeholders
      notAvailable: "—"
    },

    language: {
      title: "Idioma do App",
      selectLanguage: "Selecionar Idioma",
      choosePreferred: "Escolha seu idioma preferido",
      searchPlaceholder: "Pesquisar idiomas...",
      currentLanguage: "Idioma Atual",

      // Language names (if needed for dynamic content)
      languages: {
        english: "Inglês",
        french: "Francês",
        russian: "Russo",
        german: "Alemão",
        spanish: "Espanhol"
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
      title: "Serviço ao Cliente",
      description: "Se você tiver alguma dúvida ou encontrar problemas, por favor envie-nos um e-mail ou converse com nossa equipe de suporte ao cliente online.",
      contactWhatsApp: "Contatar no WhatsApp",
      contactTelegram: "Contatar no Telegram"
    },

    notifications: {
      title: "Notificações",
      filters: {
        all: "Todas",
        deposit: "Depósito",
        withdraw: "Saque"
      },
      unreadCount: "{0} não lidas",
      emptyState: {
        title: "Nenhuma notificação encontrada",
        description: "Você ainda não tem notificações {0}."
      },

      // Notification Types
      types: {
        deposit_success: "Depósito Bem-sucedido",
        deposit_canceled: "Depósito Cancelado",
        withdraw_success: "Saque Bem-sucedido",
        withdraw_canceled: "Saque Cancelado",
        system: "Notificação do Sistema",
        alert: "Alerta Importante",
        default: "Notificação"
      },

      // Notification Messages
      messages: {
        deposit_success: "Seu depósito de ${0} foi concluído com sucesso.",
        deposit_canceled: "Sua solicitação de depósito de ${0} foi cancelada.",
        withdraw_success: "Seu saque de ${0} foi concluído com sucesso.",
        withdraw_canceled: "Sua solicitação de saque de ${0} foi cancelada.",
        system: "Notificação do sistema",
        alert: "Notificação de alerta importante",
        default: "Atualização de notificação"
      },

      // Status
      status: {
        unread: "não lida",
        read: "lida"
      }
    },

    portfolio: {
      // Status Tabs
      completed: "Concluídos",
      pending: "Pendentes",
      canceled: "Cancelados",

      // Order Information
      orderTime: "Hora do Pedido",
      orderNumber: "Número do Pedido",
      totalOrderAmount: "Valor total do pedido",
      commission: "Comissão",
      estimatedReturn: "Retorno estimado",

      // Product Details
      quantity: "X 1",
      currency: "USD",

      // Status Labels
      status: {
        completed: "Concluído",
        pending: "Pendente",
        canceled: "Cancelado"
      }
    },

    changePassword: {
      title: "Alterar Senha",
      header: "Alterar Senha",
      oldPassword: "Senha Antiga",
      newPassword: "Nova Senha",
      confirmPassword: "Confirmar Senha",
      submit: "Enviar",
      note: "Por favor, preencha estas informações com cuidado",
      requiredField: "*"
    },

    withdraw: {
      title: "Saque",
      withdrawAmount: "Valor do Saque",
      withdrawPassword: "Senha de Saque",
      availableBalance: "Saldo disponível",
      confirm: "Confirmar",
      rulesDescription: "Descrição das Regras",
      rules: {
        minimum: "(1) O saque mínimo é de 100 USD",
        paymentTime: "(2) O pagamento será feito dentro da próxima hora, após a aprovação do pedido de saque.",
        orderCompletion: "(3) O envio incompleto de pedidos diários está sujeito a nenhum saque, todos os produtos devem ser enviados para saque"
      }
    },

    checkout: {
      title: "Finalizar compra",
      sectionAddress: "Endereço de entrega",
      noAddress: "Você ainda não tem um endereço de entrega salvo",
      addAddress: "+ Adicionar endereço de entrega",
      changeAddress: "Alterar",
      selectAddressTitle: "Selecionar endereço de entrega",
      sectionPayment: "Método de pagamento",
      codLabel: "Pagamento na entrega",
      codDescription: "Pague em dinheiro diretamente ao entregador quando seu pedido chegar.",
      sectionSummary: "Resumo do pedido",
      itemsCount: "{0} item(ns)",
      subtotal: "Subtotal",
      deliveryFee: "Taxa de entrega",
      free: "Grátis",
      total: "Total",
      placeOrder: "Fazer pedido",
      placingOrder: "Fazendo pedido...",
      missingAddress: "Selecione um endereço de entrega",
      emptyCart: "Seu carrinho está vazio",
      successTitle: "Pedido realizado!",
      successMessage: "Seu pedido foi realizado com sucesso. Pague em dinheiro na entrega.",
      orderNumber: "Número do pedido",
      totalToPay: "Total a pagar na entrega",
      backToHome: "Voltar ao início",
      done: "Concluído",
    },

    applyMerchant: {
      title: "Solicitar uma loja",
      intro: "Preencha os dados da sua loja abaixo para solicitar ser vendedor.",
      storePhoto: "Foto da loja",
      storeName: "Nome da loja",
      storeNamePlaceholder: "Digite o nome da loja",
      contact: "Contato",
      contactPlaceholder: "Digite um contato ou número de telefone",
      idNumber: "Número de identidade",
      idNumberPlaceholder: "Digite seu número de identidade",
      invitationCode: "Código de convite",
      invitationCodePlaceholder: "Digite seu código de convite",
      mainBusiness: "Ramo principal",
      mainBusinessPlaceholder: "Selecione o ramo principal",
      idCardFront: "Foto frente do documento",
      idCardBack: "Foto verso do documento",
      address: "Endereço detalhado",
      addressPlaceholder: "Digite o endereço detalhado",
      submit: "Enviar solicitação",
      submitSuccess: "Sua solicitação de loja foi enviada e está aguardando análise.",
      missingStoreName: "Digite o nome da loja",
      missingMainBusiness: "Selecione o ramo principal",
      missingAddress: "Digite o endereço detalhado",
      missingStorePhoto: "Envie uma foto da sua loja",
      missingIdCardFront: "Envie a foto da frente do seu documento",
      missingIdCardBack: "Envie a foto do verso do seu documento",
      editAndResubmit: "Editar e reenviar",
      goToDashboard: "Ir para o Painel do Vendedor",
      status: {
        pendingTitle: "Solicitação em análise",
        pendingText: "Sua solicitação de loja está sendo analisada. Avisaremos assim que for aprovada.",
        successTitle: "Loja aprovada",
        successText: "Sua loja foi aprovada. Acesse seu Painel do Vendedor para gerenciá-la.",
        rejectedTitle: "Solicitação rejeitada",
        rejectedText: "Sua solicitação anterior não foi aprovada. Você pode revisar os detalhes abaixo e enviar novamente.",
      },
      enumerators: {
        mainBusiness: {
          fashion_clothing: "Moda e roupas",
          electronics: "Eletrônicos",
          beauty_cosmetics: "Beleza e cosméticos",
          home_living: "Casa",
          sports_outdoors: "Esportes e ar livre",
          toys_hobbies: "Brinquedos e hobbies",
          food_beverages: "Alimentos e bebidas",
          all: "Tudo",
        },
      },
    },

    deliveryAddress: {
      title: "Endereço de entrega",
      noAddresses: "Nenhum endereço encontrado",
      addAddress: "Adicionar um endereço",
      modalTitle: "Adicionar endereço de entrega",
      editModalTitle: "Editar endereço de entrega",
      addressLabel: "Endereço de entrega",
      addressPlaceholder: "Digite o endereço detalhado",
      contactNumberLabel: "Número de contato",
      contactNumberPlaceholder: "Digite seu número de contato",
      contactLabel: "Contato",
      contactPlaceholder: "Digite um contato",
      submit: "Adicionar um endereço",
      saveChanges: "Salvar alterações",
      createSuccess: "Endereço de entrega adicionado com sucesso",
      updateSuccess: "Endereço de entrega atualizado com sucesso",
      destroySuccess: "Endereço de entrega excluído com sucesso",
      missingAddress: "Digite o endereço detalhado",
      missingContactNumber: "Digite seu número de contato",
      missingContact: "Digite um contato",
      confirmDeleteTitle: "Excluir este endereço?",
      confirmDeleteText: "Esta ação não pode ser desfeita.",
      delete: "Excluir",
      cancel: "Cancelar",
    },

    cart: {
      addedToCart: "Adicionado ao carrinho",
    },

    topup: {
      title: "Recarga",
      rechargeMethods: "Métodos de recarga",
      selectWallet: "Selecione a carteira de recarga",
      wallets: {
        eth: "ETH",
        btc: "BTC",
        usdt_trc20: "USDT (TRC-20)",
        usdt_erc20: "USDT (ERC-20)",
      },
      scanHint: "Escaneie o código QR para recarregar",
      copyAddress: "Copiar endereço de depósito",
      addressCopied: "Endereço copiado para a área de transferência",
      fee: "Taxa",
      amount: "Valor da recarga",
      amountPlaceholder: "Digite o valor da recarga",
      usdtValue: "Valor em USDT",
      fetchingRate: "Buscando taxa em tempo real…",
      enterAmountForValue: "Digite um valor para ver o valor em USDT",
      rateUnavailable: "Taxa em tempo real indisponível - tente novamente em breve",
      uploadVoucher: "Enviar comprovante de recarga",
      uploadLabel: "Enviar comprovante",
      submit: "Enviar recarga",
      noWalletSelected: "Selecione uma carteira",
      missingAmount: "Digite o valor da recarga",
      missingPhoto: "Envie o comprovante de recarga",
    },

    withdrawal: {
      title: "Central de saques",
      withdrawalMethods: "Métodos de saque",
      selectWallet: "Selecione o método de saque",
      wallets: {
        eth: "ETH",
        btc: "BTC",
        usdt_trc20: "USDT (TRC-20)",
        usdt_erc20: "USDT (ERC-20)",
      },
      availableBalance: "Saldo disponível",
      fee: "Taxa",
      withdrawalAddress: "Endereço de saque",
      addressPlaceholder: "Digite ou cole o endereço da sua carteira de recebimento",
      amount: "Valor do saque",
      amountPlaceholder: "Digite o valor do saque",
      withdrawalPassword: "Senha de saque",
      passwordPlaceholder: "Digite a senha de saque",
      submit: "Confirmar saque",
      noWalletSelected: "Selecione um método de saque",
      missingAddress: "Digite o endereço da sua carteira de recebimento",
      missingAmount: "Digite o valor do saque",
      exceedsBalance: "O valor do saque excede seu saldo disponível",
      missingPassword: "Digite sua senha de saque",
      youWillReceive: "Você receberá",
      fetchingRate: "Buscando taxa em tempo real…",
      enterAmountToPreview: "Digite um valor para ver o que você receberá",
      rateUnavailable: "Taxa em tempo real indisponível - tente novamente em breve",
      belowFeeWarning: "Este valor é muito baixo para cobrir a taxa de rede",
      notice1: "O valor creditado será calculado de acordo com as taxas cobradas pela sua conta de recebimento ou pela taxa de câmbio em tempo real.",
      notice2: "Seu saque será creditado em até 24 horas, aguarde com paciência! Se não for creditado em 24 horas, entre em contato com o suporte online.",
    },

    wallet: {
      title: "Carteira",
      withdrawalMethod: "Informações do método de saque",
      username: "Nome de Usuário",
      walletName: "Nome da Carteira",
      choosePreferredCoin: "Escolha a moeda preferida",
      walletAddress: "Endereço da Carteira",
      withdrawPassword: "Senha de Saque",
      submit: "Enviar",
      note: "Por favor, tenha cuidado ao preencher estas informações",
      requiredField: "*"
    },

    grab: {
      // Header Section
      greeting: "Olá {0} 👏",

      // Stats Cards
      totalAmount: "Valor Total",
      profitsAdded: "Os lucros serão adicionados aqui",
      todaysCommission: "Comissão de Hoje",
      commissionEarned: "Comissão Ganha",
      currency: "USD",

      // Optimization Section
      startOptimization: "Iniciar Otimização",
      progressCount: "{0}/{1}",

      // Game Section
      commissionRate: "Taxa de Comissão",
      exclusiveChannel: "Canal exclusivo para membros exclusivos",
      startButton: "Iniciar",
      processing: "Processando...",

      // Notice Section
      notice: "Aviso",
      supportHours: "Horário de Suporte Online 10:00 - 22:00",
      contactSupport: "Por favor, entre em contato com o suporte online para sua assistência!"
    },

    grapModal: {
      orderTime: "Hora do Pedido",
      orderNumber: "Número do Pedido",
      totalOrderAmount: "Valor total do pedido",
      commission: "Comissão",
      estimatedReturn: "Retorno estimado",
      cancel: "Cancelar",
      submit: "Enviar",
      quantity: "X 1",
      currency: "USD"
    },

    actions: {
      event: "Eventos",
      tc: "Termos e Condições",
      certificate: "Certificado",
      faq: "Perguntas Frequentes",
      company: "Empresa"
    },

    auth: {
      signin: {
        welcomeBack: "Bem-vindo de volta!",
        signinToAccount: "Entre na sua conta de marketing",
        signinButton: "Entrar",
        noAccount: "Não tem uma conta?",
        signupHere: "Cadastre-se aqui."
      },
      signup: {
        createAccount: "Criar Conta",
        signupForAccount: "Cadastre-se para uma conta de marketing",
        signupButton: "Cadastrar",
        alreadyHaveAccount: "Já tem uma conta?",
        phonePlaceholder: "Digite seu número de telefone",
        searchCountries: "Pesquisar países..."
      }
    },

    csPage: {
      customerSupport: "Serviço ao Cliente",
      hereToHelp: "Estamos aqui para ajudá-lo!",
      howCanWeHelp: "Como podemos ajudá-lo hoje?",
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
        user: "usuário",
        product: "produto",
        number: "número do registro",
        status: "status",
      },
      list: {
        title: "Lista de registros",
      },
      view: {
        title: "Detalhe do Registro",
      },
      edit: {
        title: "Editar Registro",
      },
      create: {
        success: "Produto enviado com sucesso.",
      },
      update: {
        success: "Produto enviado com sucesso.",
      },
      destroy: {
        success: "Registro excluído com sucesso",
      },
      destroyAll: {
        success: "Registro excluído com sucesso",
      },
      enumerators: {
        status: {
          pending: "Pendente",
          completed: "Concluído",
          canceled: "Cancelado",
        },
      },
    },

    category: {
      name: "categoria",
      label: "Categorias",
      menu: "Categorias",
      exporterFileName: "exportacao_categoria",
      list: {
        menu: "Categorias",
        title: "Categorias",
      },
      create: {
        success: "Categoria salva com sucesso",
      },
      update: {
        success: "Categoria salva com sucesso",
      },
      destroy: {
        success: "Categoria excluída com sucesso",
      },
      destroyAll: {
        success: "Categoria(s) excluída(s) com sucesso",
      },
      edit: {
        title: "Editar Categoria",
      },
      fields: {
        id: "Id",
        name: "Nome",
        slug: "Slug",
        photo: "Foto",
        metaKeywords: "Palavras-chave Meta",
        metaDescriptions: "Descrições Meta",
        status: "Status",
        isFeature: "É Destaque",
        serialRange: "Serial",
        serial: "Serial",
        createdAt: "Criado em",
        updatedAt: "Atualizado em",
        createdAtRange: "Criado em",
      },
      enumerators: {
        status: {
          enable: "Ativar",
          disable: "Desativar",
        },
      },
      placeholders: {},
      hints: {},
      new: {
        title: "Nova Categoria",
      },
      view: {
        title: "Ver Categoria",
      },
      importer: {
        title: "Importar Categorias",
        fileName: "modelo_importacao_categoria",
        hint: "As colunas Arquivos/Imagens devem ser os URLs dos arquivos separados por espaço.",
      },
    },

    product: {
      name: "produto",
      label: "Produtos",
      menu: "Produtos",
      exporterFileName: "exportacao_produto",
      list: {
        menu: "Produtos",
        title: "Produtos",
      },
      create: {
        success: "Produto salvo com sucesso",
      },
      update: {
        success: "Produto salvo com sucesso",
      },
      destroy: {
        success: "Produto excluído com sucesso",
      },
      destroyAll: {
        success: "Produto(s) excluído(s) com sucesso",
      },
      edit: {
        title: "Editar Produto",
      },
      fields: {
        id: "Id",
        name: "Nome",
        slug: "Slug",
        tags: "Tags",
        video: "Vídeo",
        specificationName: "Nome da Especificação",
        specificationDesciption: "Descrição da Especificação",
        isSpecification: "É Especificação",
        details: "Detalhes",
        photo: "Foto",
        discountPriceRange: "Preço com Desconto",
        discountPrice: "Preço Atual",
        previousPriceRange: "Preço Anterior",
        previousPrice: "Preço Anterior",
        stockRange: "Estoque",
        stock: "Estoque",
        metaKeywords: "Palavras-chave Meta",
        metaDesctiption: "Descrição Curta",
        status: "Status",
        isType: "Tipo",
        dateRange: "Data",
        date: "Data",
        itemType: "Tipo de Item",
        file: "Arquivo",
        link: "Link",
        fileType: "Tipo de Arquivo",
        taxe: "Imposto",
        category: "Categoria",
        subcategory: "Subcategoria",
        childcategory: "Sub-subcategoria",
        brand: "Marca",
        gallery: "Galeria",
        createdAt: "Criado em",
        updatedAt: "Atualizado em",
        createdAtRange: "Criado em",
      },
      enumerators: {
        status: {
          enable: "Ativar",
          disable: "Desativar",
        },
        itemType: {
          physical: "físico",
          digitale: "Digital",
        },
        fileType: {
          file: "Arquivo",
          link: "Link",
        },
        isType: {
          new_arrival: "Novo Lançamento",
          feature_product: "Produto em Destaque",
          top_pdroduct: "Produto Popular",
          best_product: "Melhor Produto",
          flash_deal_product: "Produto em Promoção Relâmpago",
        },
      },
      placeholders: {},
      hints: {},
      new: {
        title: "Novo Produto",
      },
      view: {
        title: "Ver Produto",
      },
      importer: {
        title: "Importar Produtos",
        fileName: "modelo_importacao_produto",
        hint: "As colunas Arquivos/Imagens devem ser os URLs dos arquivos separados por espaço.",
      },
    },
    transaction: {
      name: "transação",
      label: "Transações",
      menu: "Transações",
      exporterFileName: "exportacao_transacao",
      list: {
        menu: "Transações",
        title: "Transações",
      },
      create: {
        success: "Transação enviada com sucesso",
      },
      update: {
        success: "Transação salva com sucesso",
      },
      destroy: {
        success: "Transação excluída com sucesso",
      },
      destroyAll: {
        success: "Transação(ões) excluída(s) com sucesso",
      },
      edit: {
        title: "Editar Transação",
      },
      fields: {
        id: "Id",
        amountRange: "Valor",
        amount: "Valor",
        email: "Email",
        tax: "Imposto",
        currencySign: "Símbolo da Moeda",
        currencyValue: "Valor da Moeda",
        orderId: "ID do Pedido",
        createdAt: "Criado em",
        updatedAt: "Atualizado em",
        createdAtRange: "Criado em",
      },
      enumerators: {
        status: {
          pending: "Pendente",
          completed: "Sucesso",
          canceled: "Cancelado",
        },
      },
      placeholders: {},
      hints: {},
      new: {
        title: "Nova Transação",
      },
      view: {
        title: "Ver Transação",
      },
      importer: {
        title: "Importar Transações",
        fileName: "modelo_importacao_transacao",
        hint: "As colunas Arquivos/Imagens devem ser os URLs dos arquivos separados por espaço.",
      },
    },

    order: {
      name: "pedido",
      label: "Pedidos",
      menu: "Pedidos",
      exporterFileName: "exportacao_pedido",
      list: {
        menu: "Pedidos",
        title: "Pedidos",
      },
      create: {
        success: "Pedido salvo com sucesso",
      },
      update: {
        success: "Pedido salvo com sucesso",
      },
      destroy: {
        success: "Pedido excluído com sucesso",
      },
      destroyAll: {
        success: "Pedido(s) excluído(s) com sucesso",
      },
      edit: {
        title: "Editar Pedido",
      },
      fields: {
        id: "Id",
        userId: "Usuário",
        cart: "Carrinho",
        shipping: "Envio",
        discountRange: "Desconto",
        discount: "Desconto",
        paymentMethod: "Método de Pagamento",
        taxe: "Imposto",
        transactionNumber: "Número da Transação",
        orderStatus: "Status do Pedido",
        createdAt: "Criado em",
        updatedAt: "Atualizado em",
        createdAtRange: "Criado em",
      },
      enumerators: {
        orderStatus: {
          pending: "Pendente",
          in_progress: "Em Andamento",
          delivered: "Entregue",
          canceled: "Cancelado",
        },
      },
      placeholders: {},
      hints: {},
      new: {
        title: "Novo Pedido",
      },
      view: {
        title: "Ver Pedido",
      },
      importer: {
        title: "Importar Pedidos",
        fileName: "modelo_importacao_pedido",
        hint: "As colunas Arquivos/Imagens devem ser os URLs dos arquivos separados por espaço.",
      },
    },
  },


  user: {
    fields: {
      genre: "Gênero",
      username: "Nome de usuário",
      walletName: "Nome da carteira",
      id: "Id",
      confirmPassword: "Confirmar senha",
      avatars: "Avatar",
      invitationcode: "Código de convite",
      email: "E-mail",
      emails: "E-mail(s)",
      erc20: "Endereço da carteira ERC20",
      trc20: "Endereço da carteira TRC20",
      fullName: "Nome",
      balance: "Saldo",
      firstName: "Primeiro nome",
      lastName: "Sobrenome",
      status: "Status",
      phoneNumber: "Número de telefone",
      withdrawPassword: "Senha de saque",
      sector: "Setor",
      employer: "Empregador",
      profession: "Profissão",
      address: "Endereço",
      birthDate: "Data de nascimento",
      maritalStatus: "Estado civil",
      facebookLink: "Link do Facebook",
      sponsor: "Patrocinador",
      role: "Função",
      createdAt: "Criado em",
      updatedAt: "Atualizado em",
      roleUser: "Função/Usuário",
      roles: "Funções",
      createdAtRange: "Criado em",
      password: "Senha",
      oldPassword: "Senha antiga",
      newPassword: "Nova senha",
      newPasswordConfirmation: "Confirmação da nova senha",
      rememberMe: "Lembrar de mim",
    },
    sector: {
      AGRO_ALIMENTAIRE: "Indústria alimentícia",
      ASSURANCES: "Seguros",
      AUDIOVISUEL: "Audiovisual",
      BANCAIRE: "Bancário",
      CHIMIE: "Química",
      COMPOSANTS_AUTOMOBILES: "Componentes automotivos",
      DISTRIBUTION: "Distribuição",
      DISTRIBUTION_AUTOMOBILE: "Distribuição automotiva",
      DIVERS: "Diversos",
      FINANCIER: "Financeiro",
      HOLDING: "Holding",
      IMMOBILIER: "Imobiliário",
      INDUSTRIEL: "Industrial",
      LEASING: "Leasing",
      LOGISTIQUE_TRANSPORT: "Logística e transporte",
      PHARMACEUTIQUE: "Farmacêutico",
      SANTÉ: "Saúde",
      TOURSIME: "Turismo",
      INFORMATION_TECHNOLOGY: "Tecnologia da informação",
    },
    maritalStatus: {
      célébataire: "Solteiro",
      marié: "Casado",
    },
    status: {
      active: "Ativo",
      invited: "Convidado",
      "empty-permissions": "Aguardando permissões",
      inactive: "Inativo",
    },

    enumerators: {
      status: {
        USDT: "USDT",
        ETH: "ETH",
        BTC: "BTC",
      },
      gender: {
        male: "masculino",
        female: "feminino",
      }
    },
    invite: "Convidar",
    validations: {
      // eslint-disable-next-line
      email: "O e-mail ${value} é inválido",
    },
    title: "Usuários",
    menu: "Usuários",
    doAddSuccess: "Usuário(s) salvo(s) com sucesso",
    doUpdateSuccess: "Usuário salvo com sucesso",
    exporterFileName: "usuarios_exportacao",
    doDestroySuccess: "Usuário excluído com sucesso",
    doDestroyAllSelectedSuccess: "Usuários excluídos com sucesso",
    edit: {
      title: "Editar Usuário",
    },
    new: {
      title: "Convidar Usuário(s)",
      titleModal: "Convidar Usuário",
      emailsHint:
        "Separe múltiplos endereços de e-mail usando o caractere de vírgula.",
    },
    view: {
      title: "Visualizar Usuário",
      activity: "Atividade",
    },
    importer: {
      title: "Importar Usuários",
      fileName: "modelo_importacao_usuarios",
      hint: "As colunas de Arquivos/Imagens devem ser os URLs dos arquivos separados por espaço. Os relacionamentos devem ser o ID dos registros referenciados separados por espaço. As funções devem ser os ids de funções separados por espaço.",
    },
    errors: {
      userAlreadyExists: "Já existe um usuário com este e-mail",
      userNotFound: "Usuário não encontrado",
      revokingOwnPermission: `Você não pode revogar sua própria permissão de administrador`,
    },
  },
  buttons: {
    login: "Entrar",
    registerNow: "Registrar Agora",
    signup: "Cadastrar-se",
    start: "Iniciar",
    orders: "Pedidos",
    submit: "Enviar",
    backtohome: "Voltar para a Página Inicial",
    confirm: "Confirmar",
    logout: "Sair",
    getstarted: "Começar",
  },
  text: {
    welcome: "Bem-vindo",
    discover: "Descubra ofertas exclusivas para você",
    signin: "Entrar",
    haveaccount: "Já tem uma conta?",
    noaccount: "Não tem uma conta?",
    showingnow: "Em Exibição",
    comingsoon: "Em Breve",
    termsconditions: "Termos & Condições",
    todayearning: "Ganhos de Hoje",
    accountbalance: "Saldo da Conta",
    freezebalance: "Saldo Congelado",
    sumbitInformation: "Enviar Informações",
    order: "Pedido",
    pending: "Pendente",
    completed: "Concluído",
    canceled: "Cancelado",
    notransaction: "Nenhuma transação até agora!",
    createdtime: "Data de Criação",
    creationtime: "Hora de criação",
    orderNumber: "Número do Pedido",
    orderamount: "Valor do Pedido",
    income: "Rendimento",
    buyerating: "Avaliação do Comprador",
    uid: "UID",
    promotioncode: "Código Promocional",
    walletamount: "Saldo da Carteira",
    creditassesment: "Avaliação de Crédito",
    myfinance: "Minhas Finanças",
    withdraw: "Saque",
    mydetails: "Meus Dados",
    profile: "Perfil",
    wallet: "Carteira",
    other: "Outros",
    customersupport: "Atendimento ao Cliente",
    transaction: "Transação",
    taskshistory: "Histórico de Tarefas",
    security: "Segurança",
    sponsor: `Nossa segurança é nossa maior prioridade e queremos garantir que 
              você esteja protegido contra qualquer risco potencial. Lembre-se 
              de que nunca pediremos para enviar dinheiro para um endereço desconhecido. 
              Antes de fazer qualquer pagamento, pedimos que verifique as informações conosco.`,
  },
  errors: {
    backToHome: "Voltar para a Página Inicial",
    continueShopping: "Continuar Comprando",
    title403: "Acesso Negado",
    title404: "Página Não Encontrada",
    title500: "Algo Deu Errado",
    403: "Desculpe, você não tem acesso a esta página",
    404: "Desculpe, a página que você visitou não existe",
    500: "Desculpe, o servidor está reportando um erro",
    429: "Muitas solicitações. Tente novamente mais tarde.",
    forbidden: {
      message: "Acesso Negado",
    },
    validation: {
      message: "Ocorreu um erro",
    },
    defaultErrorMessage: "Ops, ocorreu um erro",
  },

  withdraw: {
    withdrawamount: "Valor do Saque",
    Withdrawpassword: "Senha de Saque",
    availablebalance: "Saldo Disponível",
    rules: "Descrição das Regras",
    rule1: "O saque mínimo é de $20",
    rule2: "O pagamento será feito dentro de 24 horas após a solicitação de saque",
    rule3: "A submissão incompleta dos pedidos diários impede o saque; todos os produtos devem ser enviados para retirada"
  },
  profile: {
    profile: "Perfil",
    fullname: "Nome Completo",
    email: "E-mail",
    phonenumber: "Número de Telefone",
    country: "País",
    Invitationcode: "Código de Convite"
  },
  wallet: {
    wallet: "Carteira",
    info: "Informações sobre o método de saque",
    username: "Nome de Usuário",
    walletname: "Nome da Carteira",
    walletaddress: "Endereço da Carteira",
    note: "Nota",
    notedesctiption: "Por favor, preencha estas informações com cuidado."
  },

  cs: {
    cs: "Atendimento ao Cliente",
    note: "Se tiver alguma dúvida ou encontrar problemas, envie-nos um e-mail ou converse com nossa equipe de suporte online.",
    contactnow: "Entre em Contato Agora"
  },
  transaction: {
    transaction: "Transação",
    all: "Todos",
    withdraw: "Saque",
    dposit: "Depósito",
    notransaction: "Nenhuma transação até agora!"
  },
  order: {
    order: "Pedido",
    completed: "Concluído",
    pending: "Pendente",
    canceled: "Cancelado",
    ordertime: "Hora do Pedido",
    ordernumber: "Número do Pedido",
    total: "Valor Total do Pedido",
    commission: "Comissão",
    return: "Retorno Estimado"
  },

  security: {
    changepassword: "Alterar Senha",
    oldpassword: "Senha Antiga",
    newpassword: "Nova Senha",
    confirmpassword: "Confirmar Senha",
    note: "Nota",
    notedesc: "Por favor, preencha estas informações com cuidado"
  },

  auth: {
    tenants: "Espaços de Trabalho",
    singindesc: "Digite seu e-mail e senha para entrar",
    signupdesc: "Digite seu e-mail e senha para se cadastrar",
    profile: {
      title: "Perfil",
      success: "Perfil atualizado com sucesso",
      vip: "Parabéns por sua assinatura",
    },
    createAnAccount: "Criar uma Conta",
    rememberMe: "Lembrar-me",
    forgotPassword: "Esqueceu a Senha",
    signin: "Entrar",
    signup: "Cadastrar-se",
    signout: "Sair",
    alreadyHaveAnAccount: "Já tem uma conta? Faça login.",
    social: {
      errors: {
        "auth-invalid-provider":
          "Este e-mail já está registrado em outro provedor.",
        "auth-no-email": "O e-mail associado a esta conta é privado ou inexistente.",
      },
    },
    signinWithAnotherAccount: "Entrar com outra conta",
    emailUnverified: {
      message: `Por favor, confirme seu e-mail em <strong>{0}</strong> para continuar.`,
      submit: "Reenviar e-mail de verificação",
    },
    emptyPermissions: {
      message: "Você ainda não tem permissões. Aguarde a concessão de privilégios pelo administrador.",
    },
    passwordResetEmail: {
      message: "Enviar e-mail para redefinição de senha",
      error: "E-mail não reconhecido",
    },
    passwordReset: {
      message: "Redefinir Senha",
    },
    passwordChange: {
      title: "Alterar Senha",
      success: "Senha alterada com sucesso",
      mustMatch: "As senhas devem coincidir",
    },
    emailAddressVerificationEmail: {
      error: "E-mail não reconhecido",
    },
    verificationEmailSuccess: "E-mail de verificação enviado com sucesso",
    passwordResetEmailSuccess: "E-mail de redefinição de senha enviado com sucesso",
    passwordResetSuccess: "Senha alterada com sucesso",
    verifyEmail: {
      success: "E-mail verificado com sucesso.",
      message: "Aguarde um momento, seu e-mail está sendo verificado...",
    },
  },

  tabbarmenue: {
    home: "Início",
    rate: "Avaliar",
    profile: "Perfil"
  },
  validation: {
    mixed: {
      default: "${path} é inválido",
      required: "${path} é obrigatório",
      oneOf: "${path} deve ser um dos seguintes valores: ${values}",
      notOneOf: "${path} não deve ser um dos seguintes valores: ${values}",
      notType: ({ path, type, value, originalValue }) => {
        return `${path} deve ser um ${type}`;
      },
    },
    string: {
      length: "${path} deve ter exatamente ${length} caracteres",
      min: "${path} deve ter pelo menos ${min} caracteres",
      max: "${path} deve ter no máximo ${max} caracteres",
      matches: '${path} deve corresponder ao seguinte padrão: "${regex}"',
      email: "${path} deve ser um e-mail válido",
      url: "${path} deve ser um URL válido",
      trim: "${path} deve ser uma string sem espaços extras",
      lowercase: "${path} deve estar em letras minúsculas",
      uppercase: "${path} deve estar em letras maiúsculas",
      selected: "${path} deve ser selecionado",
    },
    number: {
      min: "${path} deve ser maior ou igual a ${min}",
      max: "${path} deve ser menor ou igual a ${max}",
      lessThan: "${path} deve ser menor que ${less}",
      moreThan: "${path} deve ser maior que ${more}",
      notEqual: "${path} não deve ser igual a ${notEqual}",
      positive: "${path} deve ser um número positivo",
      negative: "${path} deve ser um número negativo",
      integer: "${path} deve ser um número inteiro",
    },
    date: {
      min: "${path} deve ser posterior a ${min}",
      max: "${path} deve ser anterior a ${max}",
    },
    boolean: {},
    object: {
      noUnknown:
        "${path} não pode conter chaves não especificadas na estrutura do objeto",
    },
    array: {
      min: ({ min, path }) =>
        min === 1
          ? `${path} é obrigatório`
          : `${path} deve ter pelo menos ${min} itens`,
      max: "${path} deve ter no máximo ${max} itens",
    },
  },
  /* eslint-disable */
  fileUploader: {
    upload: "Enviar",
    image: "Você deve enviar uma imagem",
    size: "O arquivo é muito grande. O tamanho máximo permitido é {0}",
    formats: `Formato inválido. Deve ser um dos seguintes: {0}.`,
  },

  estore: {
    auth: {
      login: {
        title: "Entrar",
        tagline: "Compre mais, viva melhor",
        phoneOrEmail: "Telefone / E-mail",
        phoneOrEmailPlaceholder: "Telefone / E-mail",
        password: "Digite a senha",
        passwordPlaceholder: "Senha de login",
        forgotPassword: "Esqueci a senha",
        noAccount: "Não tem conta?",
        signUp: "Cadastre-se",
        loginButton: "Entrar",
      },
    },
    header: {
      home: "Início",
      searchPlaceholder: "Buscar produtos, marcas e categorias...",
      search: "Buscar",
      cart: "Carrinho",
      loginRegister: "Entrar / Cadastrar",
      myAccount: "Minha conta",
      myOrders: "Meus pedidos",
      signOut: "Sair",
      allCategories: "Todas as categorias",
      account: "Conta",
    },
    categories: {
      "Women Clothing": "Roupas Femininas",
      "Women Shoes": "Sapatos Femininos",
      "Women Bags": "Bolsas Femininas",
      "Accessories": "Acessórios",
      "Lifestyle": "Estilo de vida",
      "Global Purchase": "Compra global",
      "Girls": "Meninas",
      "Boys": "Meninos",
      "Men Clothing": "Roupas Masculinas",
      "Men Shoes": "Sapatos Masculinos",
      "Men Bags": "Bolsas Masculinas",
    },
    pc: {
      common: {
        saving: "Salvando...",
        confirm: "Confirmar",
        save: "Salvar",
        cancel: "Cancelar",
        loading: "Carregando...",
        edit: "Editar",
        delete: "Excluir",
        submit: "Enviar",
        update: "Atualizar",
      },
      records: {
        transactions: "Transações",
        processing: "Processando",
        completed: "Concluído",
        canceled: "Cancelado",
        id: "ID",
        time: "Hora",
        viewProof: "Ver comprovante",
      },
      messages: {
        title: "Mensagens",
        markAllRead: "Marcar tudo como lido",
        loading: "Carregando...",
        empty: "Ainda não há mensagens.",
        today: "Hoje",
        earlier: "Anteriores",
        amount: "Valor",
        depositSuccess: "Depósito bem-sucedido",
        depositCanceled: "Depósito cancelado",
        withdrawSuccess: "Saque bem-sucedido",
        withdrawCanceled: "Saque cancelado",
        systemNotice: "Aviso do sistema",
        alert: "Alerta",
        notification: "Notificação",
      },
      withdrawal: {
        deductedFromBalance: "Deduzido do saldo",
      },
      myAccount: {
        title: "Minha conta",
        storeId: "ID da loja",
        id: "ID",
        copied: "Copiado",
        copy: "Copiar",
        idCopied: "{0} copiado para a área de transferência",
        username: "Nome de usuário",
        phoneNumber: "Número de telefone",
        notBound: "Não vinculado",
        email: "E-mail",
        loginPassword: "Senha de login",
        change: "Alterar",
        changeLoginPassword: "Alterar senha de login",
        currentPassword: "Senha atual",
        currentPasswordPlaceholder: "Digite sua senha atual",
        newPassword: "Nova senha",
        newPasswordPlaceholder: "Pelo menos 6 caracteres",
        confirmNewPassword: "Confirmar nova senha",
        confirmNewPasswordPlaceholder: "Digite a nova senha novamente",
        cancel: "Cancelar",
        saveChanges: "Salvar alterações",
        securityHint: "Mantenha sua conta segura — nunca compartilhe sua senha ou códigos de verificação com ninguém.",
      },
      applyMerchant: {
        loading: "Carregando...",
        idCard: "Documento de identidade",
        submitting: "Enviando...",
      },
      wholesale: {
        title: "Gestão de atacado",
        all: "Todos",
        lowestPrice: "Menor preço",
        highestPrice: "Maior preço",
        filter: "Filtrar",
        loadingItems: "Carregando itens…",
        showing: "Mostrando",
        of: "de",
        item: "item",
        items: "itens",
        inCategory: "em {0}",
        emptyTitle: "Nenhum produto corresponde a este filtro",
        emptyText: "Tente outra categoria ou faixa de preço.",
        added: "Adicionado",
        add: "Adicionar",
        loadingMore: "Carregando…",
        reachedEnd: "Você chegou ao fim.",
        salesPrice: "Preço de venda",
        wholesalePrice: "Preço de atacado",
        cancel: "Cancelar",
        confirming: "Confirmando…",
        confirmListing: "Confirmar anúncio",
        alreadyListed: "Já adicionado aos seus anúncios de atacado.",
        addedToListings: '"{0}" adicionado aos seus anúncios de atacado.',
      },
      sellerSetup: {
        title: "Configurações",
        loading: "Carregando configurações da loja…",
        noStoreTitle: "Nenhuma loja encontrada para esta conta",
        noStoreText: "Solicite ser vendedor para gerenciar as configurações da loja.",
        storeInformation: "Informações da loja",
        storeInfoSub: "Atualize os detalhes da sua loja e informações comerciais.",
        storeLogo: "Logo da loja",
        uploadLogoSub: "Envie um logo para sua loja",
        store: "Loja",
        uploading: "Enviando…",
        uploadLogo: "Enviar logo",
        storeName: "Nome da loja *",
        storeNamePlaceholder: "Nome da sua loja",
        storeNameRequired: "O nome da loja é obrigatório.",
        storeDescription: "Descrição da loja",
        storeDescriptionPlaceholder: "Descreva sua loja...",
        businessEmail: "E-mail comercial *",
        businessPhone: "Telefone comercial",
        businessPhonePlaceholder: "Número de telefone",
        saving: "Salvando…",
        saveChanges: "Salvar alterações",
        storeBanner: "Banner da loja",
        storeBannerSub: "Exibido no topo da página da sua loja.",
        noBanner: "Nenhum banner enviado",
        uploadBanner: "Enviar banner",
      },
      productManagement: {
        title: "Gestão de produtos",
        addProduct: "+ Adicionar produto",
        searchPlaceholder: "Buscar produtos...",
        loadingProducts: "Carregando seus produtos…",
        showing: "Mostrando",
        of: "de",
        products: "produtos",
        emptyTitle: "Nenhum produto listado ainda",
        emptyText: "Adicione produtos na Gestão de Atacado para vê-los aqui.",
        goToWholesale: "Ir para Gestão de Atacado",
        noMatchesTitle: "Nenhum resultado",
        noMatchesText: "Nenhum produto corresponde a",
        wholesale: "Atacado",
        sales: "Venda",
      },
      sellerOrders: {
        title: "Pedidos da loja",
        lumpSum: "Valor total",
        salesProfit: "Lucro de venda",
        wholesalePrice: "Preço de atacado",
        actualPayment: "Pagamento real",
        processing: "Processando…",
        goToShipment: "Ir para envio",
        profitCredited: "Lucro creditado",
        refunded: "Reembolsado",
        awaitingReview: "Aguardando análise",
        paid: "Pago",
        waitingForDelivery: "Aguardando entrega",
        waitingForReceipt: "Aguardando recebimento",
        completed: "Concluído",
        refundAfterSales: "Reembolso / Pós-venda",
        emptyTitle: "Ainda não há nada aqui",
        emptyText: "Os pedidos nesta etapa aparecerão aqui.",
      },
      sellerHub: {
        loadingShop: "Carregando sua loja...",
        storeFrozen: "Loja congelada",
        frozenText: "Sua conta de vendedor foi temporariamente congelada porque um pedido ficou esperando entrega por muito tempo. Você não pode acessar o painel do vendedor até que isso seja resolvido.",
        contactSupport: "Contatar atendimento ao cliente",
        backToBuyer: "Voltar para a conta de comprador",
        accountBalance: "Saldo da conta",
        viewShop: "Ver loja",
        orderFulfillment: "Cumprimento de pedidos",
        waitingForDelivery: "Aguardando entrega",
        waitingForReceipt: "Aguardando recebimento",
        completed: "Concluído",
        refundAfterSales: "Reembolso / Pós-venda",
        quickActions: "Ações rápidas",
        topUp: "Recarregar",
        withdrawal: "Saque",
        wholesaleCatalog: "Catálogo de atacado",
        manageProducts: "Gerenciar produtos",
      },
      shopDetails: {
        title: "Detalhes da loja",
        loading: "Carregando detalhes da loja…",
        noStoreTitle: "Você ainda não tem uma loja",
        noStoreText: "Solicite ser vendedor para ver os detalhes da sua loja aqui.",
        applyNow: "Solicitar agora",
        accountBalance: "Saldo da conta",
        storeHealth: "Saúde da loja",
        creditScore: "Pontuação de crédito",
        followers: "Seguidores",
        todaysOrders: "Pedidos de hoje",
        cumulativeOrderQty: "Quantidade acumulada de pedidos",
        salesPerformance: "Desempenho de vendas",
        todaysSales: "Vendas de hoje",
        totalSales: "Vendas totais",
        todaysProfit: "Lucro de hoje",
        totalProfit: "Lucro total",
      },
      mineSeller: {
        menu: {
          dashboard: "Painel",
          wholesale: "Gestão de atacado",
          shopDetails: "Detalhes da loja",
          products: "Gestão de produtos",
          orders: "Pedidos",
          billing: "Histórico de faturamento",
          addresses: "Endereços de entrega",
          support: "Central de serviços",
          loginPassword: "Senha de login",
          paymentPassword: "Senha de pagamento",
          settings: "Configurações",
        },
        myStore: "Minha loja",
        seller: "Vendedor",
        switchToBuyer: "Mudar para conta de comprador",
        logOut: "Sair",
      },
      mineHub: {
        storeFrozen: "Loja congelada",
        storeFrozenSub: "Sua conta de vendedor foi temporariamente congelada.",
        contactSupport: "Contatar atendimento ao cliente",
        storeApproved: "Solicitação de loja aprovada!",
        storeApprovedSub: "Sua conta de vendedor está ativa.",
        goToSellerDashboard: "Ir para o painel do vendedor",
        accountBalance: "Saldo da conta",
        myAccount: "Minha conta",
        myStuff: "Minhas coisas",
        myCollection: "Minha coleção",
        myBrowse: "Vistos recentemente",
        myOrders: "Meus pedidos",
        viewAll: "Ver tudo",
        paymentPending: "Pagamento pendente",
        inShipping: "Em envio",
        received: "Recebido",
        completed: "Concluído",
        refund: "Reembolso",
        quickActions: "Ações rápidas",
        topUp: "Recarregar",
        withdrawal: "Saque",
        sellerDashboard: "Painel do vendedor",
        applyMerchant: "Solicitar ser vendedor",
      },
      addresses: {
        title: "Endereços de entrega",
        addAddress: "+ Adicionar endereço",
        editAddress: "Editar endereço",
        addNewAddress: "Adicionar novo endereço",
        address: "Endereço",
        addressPlaceholder: "Rua, cidade, estado, CEP",
        contactName: "Nome do contato",
        contactNamePlaceholder: "Nome do destinatário",
        contactNumber: "Número de contato",
        contactNumberPlaceholder: "Número de telefone",
        cancel: "Cancelar",
        saving: "Salvando...",
        saveAddress: "Salvar endereço",
        emptyTitle: "Nenhum endereço salvo",
        emptyText: "Adicione um endereço de entrega para agilizar o checkout.",
        deleteConfirm: "Excluir este endereço?",
        yesDelete: "Sim, excluir",
        edit: "Editar",
        delete: "Excluir",
      },
      settings: {
        title: "Configurações",
        publicProfile: "Perfil público",
        publicProfileSub: "Essas informações serão exibidas em suas avaliações e perfil.",
        uploading: "Enviando…",
        changeAvatar: "Alterar avatar",
        displayName: "Nome de exibição",
        displayNamePlaceholder: "Seu nome de exibição",
        displayNameRequired: "O nome de exibição é obrigatório.",
        emailAddress: "Endereço de e-mail",
        emailHint: "Entre em contato com o suporte para alterar seu endereço de e-mail.",
        saving: "Salvando…",
        saveChanges: "Salvar alterações",
        accountStats: "Estatísticas da conta",
        orders: "Pedidos",
        reviews: "Avaliações",
        wishlist: "Lista de desejos",
        joined: "Cadastrado em",
      },
      myOrders: {
        title: "Meus pedidos",
        emptyTitle: "Ainda não há pedidos",
        emptyText: "Os pedidos que você fizer aparecerão aqui.",
        startShopping: "Começar a comprar",
        order: "Pedido",
        total: "Total",
        statusPending: "Pendente",
        statusConfirmed: "Confirmado",
        statusShipped: "Enviado",
        statusDelivered: "Entregue",
        statusCancelled: "Cancelado",
      },
      balance: {
        title: "Saldo",
        totalBalance: "Saldo total",
        accountBalance: "Saldo da conta",
        availableBalance: "Saldo disponível",
        deposit: "Depósito",
        withdraw: "Sacar",
        hint: "O saldo disponível pode ser usado para compras e sacado para sua carteira vinculada.",
      },
      depositRecord: {
        title: "Histórico de depósitos",
        totalDeposited: "Total depositado",
      },
      withdrawalRecord: {
        title: "Histórico de saques",
        totalWithdrawn: "Total sacado",
      },
      paymentPassword: {
        title: "Senha de pagamento",
        oldPlaceholder: "Digite sua senha de transação atual",
        newPlaceholder: "Digite sua nova senha de transação",
        confirmPlaceholder: "Confirme sua nova senha de transação",
        hint: "Sua senha de transação é usada para confirmar saques e outras alterações sensíveis da conta. Mantenha-a segura e nunca a compartilhe com ninguém.",
      },
      login: {
        brandTitle: "Compre mais, viva melhor",
        brandSubtitle: "Milhares de produtos, preços imbatíveis, entregues na sua porta.",
        title: "Bem-vindo de volta",
        subtitle: "Entre para continuar comprando",
        password: "Senha",
        forgotPassword: "Esqueceu a senha?",
      },
      register: {
        brandTitle: "Junte-se à Estore hoje",
        brandSubtitle: "Crie uma conta para rastrear pedidos, salvar endereços e finalizar a compra mais rápido.",
        title: "Crie sua conta",
        subtitle: "Junte-se à Estore e compre com mais inteligência",
        email: "E-mail",
        emailPlaceholder: "Digite seu e-mail",
        getOtp: "Obter código",
        otp: "Código de verificação",
        otpPlaceholder: "Digite o código enviado ao seu e-mail",
        phoneNumber: "Número de telefone",
        phoneNumberPlaceholder: "Número de telefone",
        password: "Senha",
        passwordPlaceholder: "Crie uma senha",
        confirmPassword: "Confirmar senha",
        confirmPasswordPlaceholder: "Digite sua senha novamente",
        registerButton: "Cadastrar",
        haveAccount: "Já tem uma conta?",
        logIn: "Entrar",
      },
      checkout: {
        loading: "Carregando...",
        qty: "Qtd.",
      },
      mine: {
        myBrowse: {
          title: "Vistos recentemente",
          emptyTitle: "Ainda não há histórico de navegação",
          emptyText: "Os produtos que você visualizar aparecerão aqui para continuar de onde parou.",
          startShopping: "Começar a comprar",
        },
        myCollection: {
          title: "Minha coleção",
          emptyTitle: "Ainda não há itens salvos",
          emptyText: "Os produtos que você salvar aparecerão aqui para você encontrá-los rapidamente.",
          browseProducts: "Explorar produtos",
        },
        support: {
          title: "Chat ao vivo",
          emptyTitle: "Nossa equipe de suporte responderá em breve",
          emptyText: "Inicie uma conversa e responderemos o mais rápido possível.",
        },
        menu: {
          account: "Minha conta",
          balance: "Saldo",
          orders: "Meus pedidos",
          deposit: "Depósito",
          depositRecord: "Histórico de depósitos",
          withdrawal: "Saque",
          withdrawalRecord: "Histórico de saques",
          paymentPassword: "Senha de pagamento",
          addresses: "Endereços de entrega",
          collection: "Minha coleção",
          browse: "Vistos recentemente",
          messages: "Mensagens",
          settings: "Configurações",
          support: "Chat ao vivo",
        },
        goToSellerDashboard: "Ir para o painel do vendedor",
        applyMerchant: "Solicitar ser vendedor",
        logOut: "Sair",
      },
      cart: {
        title: "Meu carrinho",
        empty: "Seu carrinho está vazio.",
        continueShopping: "Continuar comprando",
        product: "Produto",
        price: "Preço",
        quantity: "Quantidade",
        subtotal: "Subtotal",
        remove: "Remover",
        orderSummary: "Resumo do pedido",
        items: "Itens",
        shipping: "Frete",
        calculatedAtCheckout: "Calculado no checkout",
        total: "Total",
        proceedToCheckout: "Ir para o checkout",
        continueShoppingArrow: "← Continuar comprando",
      },
      productDetails: {
        notFound: "Produto não encontrado.",
        noImage: "Sem imagem",
        description: "Descrição",
        quantity: "Quantidade",
        addToCart: "Adicionar ao carrinho",
        buyNow: "Comprar agora",
      },
      classification: {
        searchPlaceholder: "Buscar em categorias",
        categories: "Categorias",
        loading: "Carregando...",
        noCategories: "Nenhuma categoria",
        category: "Categoria",
        noProducts: "Nenhum produto encontrado nesta categoria.",
        loadingMore: "Carregando...",
        reachedEnd: "Você chegou ao fim.",
      },
      home: {
        allCategories: "Todas as categorias",
        loading: "Carregando...",
        noCategories: "Ainda não há categorias.",
        browseAll: "Ver todas as categorias",
        aboutSection: "Sobre a E-store Fashion",
        aboutUs: "Sobre nós",
        joinUs: "Junte-se a nós",
        contactUs: "Fale conosco",
        exchangeCooperation: "Intercâmbio e cooperação",
        merchantAgreement: "Acordo do vendedor",
        supplierCooperation: "Cooperação com fornecedores",
        strategicManagementHeading: "Gestão estratégica",
        strategicManagement: "Gestão estratégica",
        precisionOperation: "Operação de precisão",
        courseDriven: "Guiado por cursos",
        faq: "Perguntas frequentes",
        downloadApp: "Baixar o aplicativo",
        globalPurchase: "Compra global",
        heroWelcomeBack: "Bem-vinda de volta",
        heroWelcomeGuest: "Bem-vinda, linda",
        heroGreeting: "Olá, {0} 👋",
        heroDefaultTitle: "Estilo para toda mulher",
        heroSlide1Text: "Vestidos, sapatos e acessórios selecionados para mulheres que amam brilhar.",
        heroSlide1Cta: "Comprar feminino",
        heroSlide2Eyebrow: "Tempo limitado",
        heroSlide2Title: "Até 50% de desconto na moda feminina",
        heroSlide2Text: "Renove seu guarda-roupa com os essenciais da temporada.",
        heroSlide2Cta: "Ver a liquidação",
        heroSlide3Eyebrow: "Novidades",
        heroSlide3Title: "Joias que você vai amar",
        heroSlide3Text: "De colares delicados a bolsas statement — finalize cada visual com estilo.",
        heroSlide3Cta: "Explorar acessórios",
        heroSlide4Eyebrow: "Só esta semana",
        heroSlide4Title: "Frete grátis em pedidos acima de $50",
        heroSlide4Text: "Nenhum código necessário — o desconto é aplicado automaticamente no checkout.",
        heroSlide4Cta: "Começar a comprar",
        trustShippingTitle: "Frete grátis",
        trustShippingText: "Em pedidos acima de $50",
        trustReturnsTitle: "Devoluções fáceis",
        trustReturnsText: "Prazo de devolução de 30 dias",
        trustCheckoutTitle: "Checkout seguro",
        trustCheckoutText: "Seus dados permanecem protegidos",
        trustSupportTitle: "Suporte 24/7",
        trustSupportText: "Estamos aqui sempre que precisar",
        flashDeals: "Ofertas relâmpago",
        limitedTime: "Tempo limitado",
        justForYou: "Só para você",
        seeAll: "Ver tudo",
        noMoreProducts: "Nenhum produto a mais para mostrar no momento.",
        add: "Adicionar",
        previousSlide: "Slide anterior",
        nextSlide: "Próximo slide",
        close: "Fechar",
        infoEmpty: "Este conteúdo ainda não foi adicionado. Volte em breve.",
      },
      footer: {
        blurb: "Tudo o que você precisa, entregue na sua porta.",
        shopHeading: "Loja",
        accountHeading: "Conta",
        supportHeading: "Suporte",
        helpCenter: "Central de ajuda",
        shipping: "Envio e entrega",
        returns: "Devoluções",
        deliveryAddresses: "Endereços de entrega",
        login: "Entrar",
        createAccount: "Criar conta",
        rights: "© {0} Estore. Todos os direitos reservados.",
      },
    },
  },



};

export default ptBR;
