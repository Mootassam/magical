

const it = {
    app: {
        title: "Zalando"
    },
    inputs: {
        username: "Nome utente",
        password: "password",
        phoneNumber: "Numero di telefono",
        withdrawPassword: "Password di prelievo",
        confirmPassword: "Conferma password",
        invitationcode: "Codice di invito",
        walletaddress: "Indirizzo del portafoglio"

    },


    pages: {
        home: {
            levels: "Livelli VIP",
            chooseLevel: "Scegli il tuo livello per massimizzare i tuoi guadagni",
            welcome: "Benvenuto",
            announcement: "Cari utenti, la piattaforma E-clicks Digital è tornata al meglio e normale, continuate a guadagnare il più possibile dalla piattaforma",

            // Action Buttons
            services: "Servizi",
            events: "Eventi",
            about: "Chi siamo",
            terms: "T&C",
            certificate: "Certificato",
            faqs: "FAQ",

            // VIP Level Cards
            currentLevel: "Attuale",
            upgrade: "Aggiorna",
            profitNormal: "profitto sui prodotti normali",
            profitPremium: "profitto sui prodotti premium",
            maxOrders: "Ordini massimi al giorno",

            // Modal
            modal: {
                levelDetails: "Dettagli Livello",
                levelLimit: "Limite Livello",
                dailyOrders: "Ordini Giornalieri",
                commissionRate: "Tasso di Commissione",
                cancel: "Annulla",
                upgradeNow: "Aggiorna Ora"
            }
        },



        prizeModal: {
            congratulations: "Congratulazioni!",
            spinning: "Ruotando...",
            prizeWon: "Hai vinto!",
            currency: "USD",
            prizeBreakdown: "Dettaglio Premio",
            totalAmount: "Importo Totale",
            yourWinnings: "Il tuo Guadagno",
            claimPrize: "Riscatta il Premio",
            celebrationMessage: "Goditi la tua ricompensa!",
        },


        tabBottomNavigator: {
            home: "Home",
            grap: "Acquisisci",
            records: "Registri",
            starting: "Avvia"
        },


        transaction: {
            title: "Cronologia Transazioni",
            filters: {
                all: "Tutte",
                withdraw: "Prelievo",
                deposit: "Deposito"
            },
            recentTransactions: "Transazioni Recenti",
            transactionCount: "{0} transazioni",
            types: {
                deposit: "Deposito",
                withdrawal: "Prelievo"
            },
            status: {
                completed: "Completato",
                processing: "In elaborazione",
                canceled: "Annullato"
            },
            amount: {
                deposit: "+${0}",
                withdraw: "-${0}",
                canceled: "${0}"
            }
        },
        profile: {
            title: "Profilo",
            invitationCode: "Codice Invito",
            creditScore: "Punteggio Credito",
            balance: "Saldo",
            todayProfit: "Profitto di Oggi",
            frozenAmount: "Importo Congelato",
            usd: "USD",

            // Menu Sections
            myFinancial: "Le mie Finanze",
            myDetails: "I miei Dettagli",
            other: "Altro",

            // Financial Items
            recharge: "Ricarica",
            withdraw: "Prelievo",

            // Details Items
            contactUs: "Contattaci",
            profile: "Profilo",
            updateWithdrawal: "Aggiorna dettagli prelievo",

            // Other Items
            transaction: "Transazione",
            tasksHistory: "Cronologia Attività",
            security: "Sicurezza",
            notifications: "Notifiche",
            languages: "Lingue",

            // Buttons
            logout: "Disconnetti",
            confirm: "Conferma",
            copied: "Copiato",

            // Modals
            rechargeModal: {
                title: "Ricarica",
                text: "Si prega di contattare il servizio clienti per ricaricare"
            },
            withdrawModal: {
                title: "Prelievo",
                text: "Si prega di contattare il servizio clienti per procedere con il prelievo."
            }
        },

        team: {
            title: "Profilo",
            personalInformation: "Informazioni Personali",
            accountDetails: "I dettagli del tuo account e le informazioni personali",

            // Info Items
            fullName: "Nome Completo",
            email: "Email",
            phoneNumber: "Numero di Telefono",
            country: "Paese",
            gender: "Genere",
            invitationCode: "Codice Invito",

            // Gender Values
            genderNotSpecified: "Non specificato",

            // Placeholders
            notAvailable: "—"
        },

        language: {
            title: "Lingua App",
            selectLanguage: "Seleziona Lingua",
            choosePreferred: "Scegli la tua lingua preferita",
            searchPlaceholder: "Cerca lingue...",
            currentLanguage: "Lingua Corrente",

            // Language names (if needed for dynamic content)
            languages: {
                english: "Inglese",
                french: "Francese",
                russian: "Russo",
                german: "Tedesco",
                spanish: "Spagnolo"
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
            title: "Servizio Clienti",
            description: "Se hai domande o incontri problemi, ti preghiamo di inviarci un'email o chattare con il nostro team di supporto clienti online.",
            contactWhatsApp: "Contatta su WhatsApp",
            contactTelegram: "Contatta su Telegram"
        },

        notifications: {
            title: "Notifiche",
            filters: {
                all: "Tutte",
                deposit: "Deposito",
                withdraw: "Prelievo"
            },
            unreadCount: "{0} non lette",
            emptyState: {
                title: "Nessuna notifica trovata",
                description: "Non hai ancora notifiche {0}."
            },

            // Notification Types
            types: {
                deposit_success: "Deposito Riuscito",
                deposit_canceled: "Deposito Annullato",
                withdraw_success: "Prelievo Riuscito",
                withdraw_canceled: "Prelievo Annullato",
                system: "Notifica Sistema",
                alert: "Avviso Importante",
                default: "Notifica"
            },

            // Notification Messages
            messages: {
                deposit_success: "Il tuo deposito di ${0} è stato completato con successo.",
                deposit_canceled: "La tua richiesta di deposito di ${0} è stata annullata.",
                withdraw_success: "Il tuo prelievo di ${0} è stato completato con successo.",
                withdraw_canceled: "La tua richiesta di prelievo di ${0} è stata annullata.",
                system: "Notifica sistema",
                alert: "Notifica avviso importante",
                default: "Aggiornamento notifica"
            },

            // Status
            status: {
                unread: "non letta",
                read: "letta"
            }
        },

        portfolio: {
            // Status Tabs
            completed: "Completate",
            pending: "In Attesa",
            canceled: "Annullate",

            // Order Information
            orderTime: "Ora Ordine",
            orderNumber: "Numero Ordine",
            totalOrderAmount: "Importo ordine totale",
            commission: "Commissione",
            estimatedReturn: "Ritorno stimato",

            // Product Details
            quantity: "X 1",
            currency: "USD",

            // Status Labels
            status: {
                completed: "Completata",
                pending: "In Attesa",
                canceled: "Annullata"
            }
        },

        changePassword: {
            title: "Cambia Password",
            header: "Cambia Password",
            oldPassword: "Vecchia Password",
            newPassword: "Nuova Password",
            confirmPassword: "Conferma Password",
            submit: "Invia",
            note: "Si prega di compilare queste informazioni con attenzione",
            requiredField: "*"
        },

        withdraw: {
            title: "Prelievo",
            withdrawAmount: "Importo Prelievo",
            withdrawPassword: "Password Prelievo",
            availableBalance: "Saldo disponibile",
            confirm: "Conferma",
            rulesDescription: "Descrizione Regole",
            rules: {
                minimum: "(1) Il prelievo minimo è di 100 USD",
                paymentTime: "(2) Il pagamento verrà effettuato entro l'ora successiva, dopo l'approvazione della richiesta di prelievo.",
                orderCompletion: "(3) L'invio incompleto degli ordini giornalieri è soggetto a nessun prelievo, tutti i prodotti devono essere inviati per il prelievo"
            }
        },

        wallet: {
            title: "Portafoglio",
            withdrawalMethod: "Informazioni metodo prelievo",
            username: "Nome Utente",
            walletName: "Nome Portafoglio",
            choosePreferredCoin: "Scegli coin preferita",
            walletAddress: "Indirizzo Portafoglio",
            withdrawPassword: "Password Prelievo",
            submit: "Invia",
            note: "Si prega di prestare attenzione durante la compilazione di queste informazioni",
            requiredField: "*"
        },

        grab: {
            // Header Section
            greeting: "Ciao {0} 👏",

            // Stats Cards
            totalAmount: "Importo Totale",
            profitsAdded: "I profitti verranno aggiunti qui",
            todaysCommission: "Commissione di Oggi",
            commissionEarned: "Commissione Guadagnata",
            currency: "USD",

            // Optimization Section
            startOptimization: "Avvia Ottimizzazione",
            progressCount: "{0}/{1}",

            // Game Section
            commissionRate: "Tasso di Commissione",
            exclusiveChannel: "Canale esclusivo per membri esclusivi",
            startButton: "Avvia",
            processing: "Elaborazione...",

            // Notice Section
            notice: "Avviso",
            supportHours: "Orari Supporto Online 10:00 - 22:00",
            contactSupport: "Si prega di contattare il supporto online per assistenza!"
        },

        grapModal: {
            orderTime: "Ora Ordine",
            orderNumber: "Numero Ordine",
            totalOrderAmount: "Importo ordine totale",
            commission: "Commissione",
            estimatedReturn: "Ritorno stimato",
            cancel: "Annulla",
            submit: "Invia",
            quantity: "X 1",
            currency: "USD"
        },

        actions: {
            event: "Eventi",
            tc: "Termini e Condizioni",
            certificate: "Certificato",
            faq: "Domande Frequenti",
            company: "Azienda"
        },

        auth: {
            signin: {
                welcomeBack: "Bentornato!",
                signinToAccount: "Accedi al tuo account marketing",
                signinButton: "Accedi",
                noAccount: "Non hai un account?",
                signupHere: "Registrati qui."
            },
            signup: {
                createAccount: "Crea Account",
                signupForAccount: "Registrati per un account marketing",
                signupButton: "Registrati",
                alreadyHaveAccount: "Hai già un account?",
                phonePlaceholder: "Inserisci il tuo numero di telefono",
                searchCountries: "Cerca paesi..."
            }
        },

        csPage: {
            customerSupport: "Servizio Clienti",
            hereToHelp: "Siamo qui per aiutarti!",
            howCanWeHelp: "Come possiamo aiutarti oggi?",
            platformNames: {
                whatsapp: "WhatsApp",
                telegram: "Telegram"
            }
        },
    },
    entities: {
        record: {
            menu: "Registri",
            fields: {
                user: "utente",
                product: "prodotto",
                number: "numero di registro",
                status: "stato",
            },
            list: {
                title: "Elenco dei registri",
            },
            view: {
                title: "Dettaglio Registro",
            },
            edit: {
                title: "Modifica Registro",
            },
            create: {
                success: "Prodotto inviato con successo.",
            },
            update: {
                success: "Prodotto inviato con successo.",
            },
            destroy: {
                success: "Registro eliminato con successo",
            },
            destroyAll: {
                success: "Registro eliminato con successo",
            },
            enumerators: {
                status: {
                    pending: "In attesa",
                    completed: "Completato",
                    canceled: "Annullato",
                },
            },
        },

        category: {
            name: "categoria",
            label: "Categorie",
            menu: "Categorie",
            exporterFileName: "esportazione_categoria",
            list: {
                menu: "Categorie",
                title: "Categorie",
            },
            create: {
                success: "Categoria salvata con successo",
            },
            update: {
                success: "Categoria salvata con successo",
            },
            destroy: {
                success: "Categoria eliminata con successo",
            },
            destroyAll: {
                success: "Categoria/e eliminata/e con successo",
            },
            edit: {
                title: "Modifica Categoria",
            },
            fields: {
                id: "Id",
                name: "Nome",
                slug: "Slug",
                photo: "Foto",
                metaKeywords: "Parole chiave Meta",
                metaDescriptions: "Descrizioni Meta",
                status: "Stato",
                isFeature: "È in evidenza",
                serialRange: "Seriale",
                serial: "Seriale",
                createdAt: "Creato il",
                updatedAt: "Aggiornato il",
                createdAtRange: "Creato il",
            },
            enumerators: {
                status: {
                    enable: "Abilita",
                    disable: "Disabilita",
                },
            },
            placeholders: {},
            hints: {},
            new: {
                title: "Nuova Categoria",
            },
            view: {
                title: "Visualizza Categoria",
            },
            importer: {
                title: "Importa Categorie",
                fileName: "modello_importazione_categoria",
                hint: "Le colonne File/Immagini devono essere gli URL dei file separati da spazio.",
            },
        },

        product: {
            name: "prodotto",
            label: "Prodotti",
            menu: "Prodotti",
            exporterFileName: "esportazione_prodotto",
            list: {
                menu: "Prodotti",
                title: "Prodotti",
            },
            create: {
                success: "Prodotto salvato con successo",
            },
            update: {
                success: "Prodotto salvato con successo",
            },
            destroy: {
                success: "Prodotto eliminato con successo",
            },
            destroyAll: {
                success: "Prodotto/i eliminato/i con successo",
            },
            edit: {
                title: "Modifica Prodotto",
            },
            fields: {
                id: "Id",
                name: "Nome",
                slug: "Slug",
                tags: "Tag",
                video: "Video",
                specificationName: "Nome Specifica",
                specificationDesciption: "Descrizione Specifica",
                isSpecification: "È Specifica",
                details: "Dettagli",
                photo: "Foto",
                discountPriceRange: "Prezzo Scontato",
                discountPrice: "Prezzo Attuale",
                previousPriceRange: "Prezzo Precedente",
                previousPrice: "Prezzo Precedente",
                stockRange: "Scorta",
                stock: "Scorta",
                metaKeywords: "Parole chiave Meta",
                metaDesctiption: "Descrizione Breve",
                status: "Stato",
                isType: "Tipo",
                dateRange: "Data",
                date: "Data",
                itemType: "Tipo Articolo",
                file: "File",
                link: "Link",
                fileType: "Tipo File",
                taxe: "Tassa",
                category: "Categoria",
                subcategory: "Sottocategoria",
                childcategory: "Sotto-sottocategoria",
                brand: "Marca",
                gallery: "Galleria",
                createdAt: "Creato il",
                updatedAt: "Aggiornato il",
                createdAtRange: "Creato il",
            },
            enumerators: {
                status: {
                    enable: "Abilita",
                    disable: "Disabilita",
                },
                itemType: {
                    physical: "fisico",
                    digitale: "Digitale",
                },
                fileType: {
                    file: "File",
                    link: "Link",
                },
                isType: {
                    new_arrival: "Nuovo Arrivo",
                    feature_product: "Prodotto in Evidenza",
                    top_pdroduct: "Prodotto Top",
                    best_product: "Miglior Prodotto",
                    flash_deal_product: "Prodotto Offerta Lampo",
                },
            },
            placeholders: {},
            hints: {},
            new: {
                title: "Nuovo Prodotto",
            },
            view: {
                title: "Visualizza Prodotto",
            },
            importer: {
                title: "Importa Prodotti",
                fileName: "modello_importazione_prodotto",
                hint: "Le colonne File/Immagini devono essere gli URL dei file separati da spazio.",
            },
        },
        transaction: {
            name: "transazione",
            label: "Transazioni",
            menu: "Transazioni",
            exporterFileName: "esportazione_transazione",
            list: {
                menu: "Transazioni",
                title: "Transazioni",
            },
            create: {
                success: "Transazione inviata con successo",
            },
            update: {
                success: "Transazione salvata con successo",
            },
            destroy: {
                success: "Transazione eliminata con successo",
            },
            destroyAll: {
                success: "Transazione/i eliminata/e con successo",
            },
            edit: {
                title: "Modifica Transazione",
            },
            fields: {
                id: "Id",
                amountRange: "Importo",
                amount: "Importo",
                email: "Email",
                tax: "Tassa",
                currencySign: "Simbolo Valuta",
                currencyValue: "Valore Valuta",
                orderId: "ID Ordine",
                createdAt: "Creato il",
                updatedAt: "Aggiornato il",
                createdAtRange: "Creato il",
            },
            enumerators: {
                status: {
                    pending: "In attesa",
                    completed: "Successo",
                    canceled: "Annullato",
                },
            },
            placeholders: {},
            hints: {},
            new: {
                title: "Nuova Transazione",
            },
            view: {
                title: "Visualizza Transazione",
            },
            importer: {
                title: "Importa Transazioni",
                fileName: "modello_importazione_transazione",
                hint: "Le colonne File/Immagini devono essere gli URL dei file separati da spazio.",
            },
        },

        order: {
            name: "ordine",
            label: "Ordini",
            menu: "Ordini",
            exporterFileName: "esportazione_ordine",
            list: {
                menu: "Ordini",
                title: "Ordini",
            },
            create: {
                success: "Ordine salvato con successo",
            },
            update: {
                success: "Ordine salvato con successo",
            },
            destroy: {
                success: "Ordine eliminato con successo",
            },
            destroyAll: {
                success: "Ordine/i eliminato/i con successo",
            },
            edit: {
                title: "Modifica Ordine",
            },
            fields: {
                id: "Id",
                userId: "Utente",
                cart: "Carrello",
                shipping: "Spedizione",
                discountRange: "Sconto",
                discount: "Sconto",
                paymentMethod: "Metodo di Pagamento",
                taxe: "Tassa",
                transactionNumber: "Numero Transazione",
                orderStatus: "Stato Ordine",
                createdAt: "Creato il",
                updatedAt: "Aggiornato il",
                createdAtRange: "Creato il",
            },
            enumerators: {
                orderStatus: {
                    pending: "In attesa",
                    in_progress: "In corso",
                    delivered: "Consegnato",
                    canceled: "Annullato",
                },
            },
            placeholders: {},
            hints: {},
            new: {
                title: "Nuovo Ordine",
            },
            view: {
                title: "Visualizza Ordine",
            },
            importer: {
                title: "Importa Ordini",
                fileName: "modello_importazione_ordine",
                hint: "Le colonne File/Immagini devono essere gli URL dei file separati da spazio.",
            },
        },
    },

    user: {
        fields: {
            genre: "Genere",
            username: "Nome utente",
            walletName: "Nome portafoglio",
            id: "Id",
            confirmPassword: "Conferma password",
            avatars: "Avatar",
            invitationcode: "Codice invito",
            email: "Email",
            emails: "Email",
            erc20: "Indirizzo portafoglio ERC20",
            trc20: "Indirizzo portafoglio TRC20",
            fullName: "Nome",
            balance: "Saldo",
            firstName: "Nome",
            lastName: "Cognome",
            status: "Stato",
            phoneNumber: "Numero di telefono",
            withdrawPassword: "Password prelievo",
            sector: "Settore",
            employer: "Datore di lavoro",
            profession: "Professione",
            address: "Indirizzo",
            birthDate: "Data di nascita",
            maritalStatus: "Stato civile",
            facebookLink: "Link Facebook",
            sponsor: "Sponsor",
            role: "Ruolo",
            createdAt: "Creato il",
            updatedAt: "Aggiornato il",
            roleUser: "Ruolo/Utente",
            roles: "Ruoli",
            createdAtRange: "Creato il",
            password: "Password",
            oldPassword: "Vecchia password",
            newPassword: "Nuova password",
            newPasswordConfirmation: "Conferma nuova password",
            rememberMe: "Ricordami",
        },
        sector: {
            AGRO_ALIMENTAIRE: "Industria alimentare",
            ASSURANCES: "Assicurazioni",
            AUDIOVISUEL: "Audiovisivo",
            BANCAIRE: "Bancario",
            CHIMIE: "Chimica",
            COMPOSANTS_AUTOMOBILES: "Componenti automobilistici",
            DISTRIBUTION: "Distribuzione",
            DISTRIBUTION_AUTOMOBILE: "Distribuzione automobilistica",
            DIVERS: "Varie",
            FINANCIER: "Finanziario",
            HOLDING: "Holding",
            IMMOBILIER: "Immobiliare",
            INDUSTRIEL: "Industriale",
            LEASING: "Leasing",
            LOGISTIQUE_TRANSPORT: "Logistica e trasporti",
            PHARMACEUTIQUE: "Farmaceutico",
            SANTÉ: "Salute",
            TOURSIME: "Turismo",
            INFORMATION_TECHNOLOGY: "Tecnologia informatica",
        },
        maritalStatus: {
            célébataire: "Single",
            marié: "Sposato",
        },
        status: {
            active: "Attivo",
            invited: "Invitato",
            "empty-permissions": "In attesa di permessi",
            inactive: "Inattivo",
        },

        enumerators: {
            status: {
                USDT: "USDT",
                ETH: "ETH",
                BTC: "BTC",
            },
            gender: {
                male: "maschio",
                female: "femmina",
            }
        },
        invite: "Invita",
        validations: {
            // eslint-disable-next-line
            email: "L'email ${value} non è valida",
        },
        title: "Utenti",
        menu: "Utenti",
        doAddSuccess: "Utente(i) salvato(i) con successo",
        doUpdateSuccess: "Utente salvato con successo",
        exporterFileName: "utenti_esportazione",
        doDestroySuccess: "Utente eliminato con successo",
        doDestroyAllSelectedSuccess: "Utenti eliminati con successo",
        edit: {
            title: "Modifica Utente",
        },
        new: {
            title: "Invita Utente(i)",
            titleModal: "Invita Utente",
            emailsHint:
                "Separa più indirizzi email utilizzando il carattere virgola.",
        },
        view: {
            title: "Visualizza Utente",
            activity: "Attività",
        },
        importer: {
            title: "Importa Utenti",
            fileName: "modello_importazione_utenti",
            hint: "Le colonne File/Immagini devono essere gli URL dei file separati da spazio. Le relazioni devono essere l'ID dei record referenziati separati da spazio. I ruoli devono essere gli ID ruolo separati da spazio.",
        },
        errors: {
            userAlreadyExists: "Esiste già un utente con questa email",
            userNotFound: "Utente non trovato",
            revokingOwnPermission: `Non puoi revocare il tuo permesso di amministratore`,
        },
    },
    buttons: {
        login: "Accedi",
        registerNow: "Registrati ora",
        signup: "Iscriviti",
        start: "Inizia",
        orders: "Ordini",
        submit: "Invia",
        backtohome: "Torna alla home",
        confirm: "Conferma",
        logout: "Disconnetti",
        getstarted: "Inizia",
    },
    text: {
        welcome: "Benvenuto",
        discover: "Scopri offerte esclusive solo per te",
        signin: "Accedi",
        haveaccount: "Hai già un account",
        noaccount: "Non hai un account",
        showingnow: "In programmazione",
        comingsoon: "Prossimamente",
        termsconditions: "Termini e condizioni",
        todayearning: "Guadagni di oggi",
        accountbalance: "Saldo del conto",
        freezebalance: "Saldo bloccato",
        sumbitInformation: "Invia informazioni",
        order: "Ordine",
        pending: "In sospeso",
        completed: "Completato",
        canceled: "Annullato",
        notransaction: "Nessuna transazione fino ad ora!",
        createdtime: "Ora di creazione",
        creationtime: "Tempo di creazione",
        orderNumber: "Numero d'ordine",
        orderamount: "Importo dell'ordine",
        income: "Reddito",
        buyerating: "Valutazione dell'acquirente",
        uid: "UID",
        promotioncode: "Codice promozionale",
        walletamount: "Importo portafoglio",
        creditassesment: "Valutazione del credito",
        myfinance: "Le mie finanze",
        withdraw: "Prelievo",
        mydetails: "I miei dettagli",
        profile: "Profilo",
        wallet: "Portafoglio",
        other: "Altro",
        customersupport: "Supporto clienti",
        transaction: "Transazione",
        taskshistory: "Cronologia attività",
        security: "Sicurezza",
        sponsor: "La nostra sicurezza è la nostra massima priorità e vogliamo assicurarci che tu sia protetto da eventuali rischi. Ti informiamo che non ti chiederemo mai di inviare denaro a un indirizzo sconosciuto. Prima di effettuare pagamenti, ti chiediamo gentilmente di verificare i dettagli con noi.",
    },
    errors: {
        backToHome: "Torna alla home",
        continueShopping: "Continua lo shopping",
        title403: "Accesso negato",
        title404: "Pagina non trovata",
        title500: "Qualcosa è andato storto",
        403: "Spiacente, non hai accesso a questa pagina",
        404: "Spiacente, la pagina che hai visitato non esiste",
        500: "Spiacente, il server sta segnalando un errore",
        429: "Troppe richieste. Riprova più tardi.",
        forbidden: {
            message: "Vietato",
        },
        validation: {
            message: "Si è verificato un errore",
        },
        defaultErrorMessage: "Ops, si è verificato un errore",
    },

    withdraw: {
        withdrawamount: "Importo del prelievo",
        Withdrawpassword: "Password di prelievo",
        availablebalance: "Saldo disponibile",
        rules: "Descrizione delle regole",
        rule1: "Il prelievo minimo è di 20$",
        rule2: "Il pagamento verrà effettuato entro 24 ore dalla richiesta di prelievo",
        rule3: "La mancata presentazione dell'ordine giornaliero comporta l'impossibilità di prelevare, tutti i prodotti devono essere presentati per il prelievo"
    },

    profile: {
        profile: "Profilo",
        fullname: "Nome completo",
        email: "Email",
        phonenumber: "Numero di telefono",
        country: "Paese",
        Invitationcode: "Codice di invito"
    },

    checkout: {
        title: "Checkout",
        sectionAddress: "Indirizzo di consegna",
        noAddress: "Non hai ancora un indirizzo di consegna salvato",
        addAddress: "+ Aggiungi indirizzo di consegna",
        changeAddress: "Cambia",
        selectAddressTitle: "Seleziona l'indirizzo di consegna",
        sectionPayment: "Metodo di pagamento",
        codLabel: "Pagamento alla consegna",
        codDescription: "Paga in contanti direttamente al corriere quando arriva il tuo ordine.",
        sectionSummary: "Riepilogo ordine",
        itemsCount: "{0} articolo/i",
        subtotal: "Subtotale",
        deliveryFee: "Costo di consegna",
        free: "Gratis",
        total: "Totale",
        placeOrder: "Effettua l'ordine",
        placingOrder: "Ordine in corso...",
        missingAddress: "Seleziona un indirizzo di consegna",
        emptyCart: "Il tuo carrello è vuoto",
        successTitle: "Ordine effettuato!",
        successMessage: "Il tuo ordine è stato effettuato con successo. Paga in contanti alla consegna.",
        orderNumber: "Numero ordine",
        totalToPay: "Totale da pagare alla consegna",
        backToHome: "Torna alla home",
        done: "Fatto",
    },

    applyMerchant: {
        title: "Richiedi un negozio",
        intro: "Inserisci qui sotto i dettagli del tuo negozio per candidarti come venditore.",
        storePhoto: "Foto del negozio",
        storeName: "Nome del negozio",
        storeNamePlaceholder: "Inserisci il nome del negozio",
        contact: "Contatto",
        contactPlaceholder: "Inserisci un referente o un numero di telefono",
        idNumber: "Numero documento",
        idNumberPlaceholder: "Inserisci il numero del tuo documento",
        invitationCode: "Codice di invito",
        invitationCodePlaceholder: "Inserisci il tuo codice di invito",
        mainBusiness: "Attività principale",
        mainBusinessPlaceholder: "Seleziona l'attività principale",
        idCardFront: "Foto fronte documento",
        idCardBack: "Foto retro documento",
        address: "Indirizzo dettagliato",
        addressPlaceholder: "Inserisci l'indirizzo dettagliato",
        submit: "Invia richiesta",
        submitSuccess: "La tua richiesta per il negozio è stata inviata ed è ora in fase di revisione.",
        missingStoreName: "Inserisci il nome del negozio",
        missingMainBusiness: "Seleziona l'attività principale",
        missingAddress: "Inserisci l'indirizzo dettagliato",
        missingStorePhoto: "Carica una foto del tuo negozio",
        missingIdCardFront: "Carica la foto fronte del tuo documento",
        missingIdCardBack: "Carica la foto retro del tuo documento",
        editAndResubmit: "Modifica e reinvia",
        goToDashboard: "Vai alla Dashboard Venditore",
        status: {
            pendingTitle: "Richiesta in revisione",
            pendingText: "La tua richiesta per il negozio è in fase di revisione. Ti avviseremo non appena sarà approvata.",
            successTitle: "Negozio approvato",
            successText: "Il tuo negozio è stato approvato. Vai alla tua Dashboard Venditore per gestirlo.",
            rejectedTitle: "Richiesta rifiutata",
            rejectedText: "La tua richiesta precedente non è stata approvata. Puoi rivedere i dettagli qui sotto e inviarla di nuovo.",
        },
        enumerators: {
            mainBusiness: {
                fashion_clothing: "Moda e abbigliamento",
                electronics: "Elettronica",
                beauty_cosmetics: "Bellezza e cosmetici",
                home_living: "Casa",
                sports_outdoors: "Sport e outdoor",
                toys_hobbies: "Giocattoli e hobby",
                food_beverages: "Cibo e bevande",
                all: "Tutto",
            },
        },
    },

    deliveryAddress: {
        title: "Indirizzo di consegna",
        noAddresses: "Nessun indirizzo trovato",
        addAddress: "Aggiungi un indirizzo",
        modalTitle: "Aggiungi indirizzo di consegna",
        editModalTitle: "Modifica indirizzo di consegna",
        addressLabel: "Indirizzo di consegna",
        addressPlaceholder: "Inserisci l'indirizzo dettagliato",
        contactNumberLabel: "Numero di contatto",
        contactNumberPlaceholder: "Inserisci il tuo numero di contatto",
        contactLabel: "Contatto",
        contactPlaceholder: "Inserisci un referente",
        submit: "Aggiungi un indirizzo",
        saveChanges: "Salva modifiche",
        createSuccess: "Indirizzo di consegna aggiunto con successo",
        updateSuccess: "Indirizzo di consegna aggiornato con successo",
        destroySuccess: "Indirizzo di consegna eliminato con successo",
        missingAddress: "Inserisci l'indirizzo dettagliato",
        missingContactNumber: "Inserisci il tuo numero di contatto",
        missingContact: "Inserisci un referente",
        confirmDeleteTitle: "Eliminare questo indirizzo?",
        confirmDeleteText: "Questa azione non può essere annullata.",
        delete: "Elimina",
        cancel: "Annulla",
    },

    cart: {
        addedToCart: "Aggiunto al carrello",
    },

    topup: {
        title: "Ricarica",
        rechargeMethods: "Metodi di ricarica",
        selectWallet: "Seleziona il wallet di ricarica",
        wallets: {
            eth: "ETH",
            btc: "BTC",
            usdt_trc20: "USDT (TRC-20)",
            usdt_erc20: "USDT (ERC-20)",
        },
        scanHint: "Scansiona il codice QR per ricaricare",
        copyAddress: "Copia indirizzo di deposito",
        addressCopied: "Indirizzo copiato negli appunti",
        fee: "Commissione",
        amount: "Importo ricarica",
        amountPlaceholder: "Inserisci l'importo della ricarica",
        usdtValue: "Valore in USDT",
        fetchingRate: "Recupero tasso in tempo reale…",
        enterAmountForValue: "Inserisci un importo per vedere il valore in USDT",
        rateUnavailable: "Tasso in tempo reale non disponibile: riprova a breve",
        uploadVoucher: "Carica la ricevuta di ricarica",
        uploadLabel: "Carica ricevuta",
        submit: "Invia ricarica",
        noWalletSelected: "Seleziona un wallet",
        missingAmount: "Inserisci l'importo della ricarica",
        missingPhoto: "Carica la ricevuta di ricarica",
    },

    withdrawal: {
        title: "Centro prelievi",
        withdrawalMethods: "Metodi di prelievo",
        selectWallet: "Seleziona il metodo di prelievo",
        wallets: {
            eth: "ETH",
            btc: "BTC",
            usdt_trc20: "USDT (TRC-20)",
            usdt_erc20: "USDT (ERC-20)",
        },
        availableBalance: "Saldo disponibile",
        fee: "Commissione",
        withdrawalAddress: "Indirizzo di prelievo",
        addressPlaceholder: "Inserisci o incolla l'indirizzo del tuo wallet di ricezione",
        amount: "Importo prelievo",
        amountPlaceholder: "Inserisci l'importo del prelievo",
        withdrawalPassword: "Password di prelievo",
        passwordPlaceholder: "Inserisci la password di prelievo",
        submit: "Conferma prelievo",
        noWalletSelected: "Seleziona un metodo di prelievo",
        missingAddress: "Inserisci l'indirizzo del tuo wallet di ricezione",
        missingAmount: "Inserisci l'importo del prelievo",
        exceedsBalance: "L'importo del prelievo supera il tuo saldo disponibile",
        missingPassword: "Inserisci la tua password di prelievo",
        youWillReceive: "Riceverai",
        fetchingRate: "Recupero tasso in tempo reale…",
        enterAmountToPreview: "Inserisci un importo per vedere cosa riceverai",
        rateUnavailable: "Tasso in tempo reale non disponibile: riprova a breve",
        belowFeeWarning: "Questo importo è troppo basso per coprire la commissione di rete",
        notice1: "L'importo accreditato sarà calcolato in base alle commissioni applicate dal tuo conto di ricezione o al tasso di cambio in tempo reale.",
        notice2: "Il tuo prelievo sarà accreditato entro 24 ore, attendi con pazienza! Se non viene accreditato entro 24 ore, contatta l'assistenza clienti online.",
    },

    wallet: {
        wallet: "Portafoglio",
        info: "Informazioni sul metodo di prelievo",
        username: "Nome utente",
        walletname: "Nome del portafoglio",
        walletaddress: "Indirizzo del portafoglio",
        note: "Nota",
        notedesctiption: "Si prega di prestare attenzione nella compilazione di queste informazioni."
    },

    cs: {
        cs: "Servizio clienti",
        note: "Se hai domande o riscontri problemi, inviaci un'email o chatta con il nostro team di supporto online.",
        contactnow: "Contatta ora"
    },

    transaction: {
        transaction: "Transazione",
        all: "Tutti",
        withdraw: "Prelievo",
        dposit: "Deposito",
        notransaction: "Nessuna transazione fino ad ora!"
    },

    tabbarmenue: {
        home: "Home",
        rate: "Valutazione",
        profile: "Profilo"
    },

    validation: {
        mixed: {
            default: "${path} non è valido",
            required: "${path} è obbligatorio",
            oneOf: "${path} deve essere uno dei seguenti valori: ${values}",
            notOneOf: "${path} non deve essere uno dei seguenti valori: ${values}",
            notType: ({ path, type }) => `${path} deve essere un ${type}`,
        },
        string: {
            length: "${path} deve essere esattamente di ${length} caratteri",
            min: "${path} deve avere almeno ${min} caratteri",
            max: "${path} deve avere al massimo ${max} caratteri",
            matches: "${path} deve corrispondere a: \"${regex}\"",
            email: "${path} deve essere un'email valida",
            url: "${path} deve essere un URL valido",
        },
    },

    fileUploader: {
        upload: "Carica",
        image: "Devi caricare un'immagine",
        size: "Il file è troppo grande. La dimensione massima consentita è {0}",
        formats: "Formato non valido. Deve essere uno di: {0}."
    },

    estore: {
      auth: {
        login: {
          title: "Accedi",
          tagline: "Compra di più, vivi meglio",
          phoneOrEmail: "Telefono / Email",
          phoneOrEmailPlaceholder: "Telefono / Email",
          password: "Inserisci la password",
          passwordPlaceholder: "Password di accesso",
          forgotPassword: "Password dimenticata",
          noAccount: "Non hai un account?",
          signUp: "Registrati",
          loginButton: "Accedi",
        },
      },
      header: {
        home: "Home",
        searchPlaceholder: "Cerca prodotti, marchi e categorie...",
        search: "Cerca",
        cart: "Carrello",
        loginRegister: "Accedi / Registrati",
        myAccount: "Il mio account",
        myOrders: "I miei ordini",
        signOut: "Esci",
        allCategories: "Tutte le categorie",
        account: "Account",
      },
      categories: {
        "Women Clothing": "Abbigliamento Donna",
        "Women Shoes": "Scarpe Donna",
        "Women Bags": "Borse Donna",
        "Accessories": "Accessori",
        "Lifestyle": "Lifestyle",
        "Global Purchase": "Acquisto globale",
        "Girls": "Bambine",
        "Boys": "Bambini",
        "Men Clothing": "Abbigliamento Uomo",
        "Men Shoes": "Scarpe Uomo",
        "Men Bags": "Borse Uomo",
      },
      pc: {
        common: {
          saving: "Salvataggio...",
          confirm: "Conferma",
          save: "Salva",
          cancel: "Annulla",
          loading: "Caricamento...",
          edit: "Modifica",
          delete: "Elimina",
          submit: "Invia",
          update: "Aggiorna",
        },
        records: {
          transactions: "Transazioni",
          processing: "In elaborazione",
          completed: "Completato",
          canceled: "Annullato",
          id: "ID",
          time: "Ora",
          viewProof: "Visualizza ricevuta",
        },
        messages: {
          title: "Messaggi",
          markAllRead: "Segna tutti come letti",
          loading: "Caricamento...",
          empty: "Ancora nessun messaggio.",
          today: "Oggi",
          earlier: "Precedenti",
          amount: "Importo",
          depositSuccess: "Deposito riuscito",
          depositCanceled: "Deposito annullato",
          withdrawSuccess: "Prelievo riuscito",
          withdrawCanceled: "Prelievo annullato",
          systemNotice: "Avviso di sistema",
          alert: "Avviso",
          notification: "Notifica",
        },
        withdrawal: {
          deductedFromBalance: "Detratto dal saldo",
        },
        myAccount: {
          title: "Il mio account",
          storeId: "ID negozio",
          id: "ID",
          copied: "Copiato",
          copy: "Copia",
          idCopied: "{0} copiato negli appunti",
          username: "Nome utente",
          phoneNumber: "Numero di telefono",
          notBound: "Non collegato",
          email: "Email",
          loginPassword: "Password di accesso",
          change: "Cambia",
          changeLoginPassword: "Cambia password di accesso",
          currentPassword: "Password attuale",
          currentPasswordPlaceholder: "Inserisci la tua password attuale",
          newPassword: "Nuova password",
          newPasswordPlaceholder: "Almeno 6 caratteri",
          confirmNewPassword: "Conferma nuova password",
          confirmNewPasswordPlaceholder: "Reinserisci la nuova password",
          cancel: "Annulla",
          saveChanges: "Salva modifiche",
          securityHint: "Mantieni sicuro il tuo account — non condividere mai la password o i codici di verifica con nessuno.",
        },
        applyMerchant: {
          loading: "Caricamento...",
          idCard: "Carta d'identità",
          submitting: "Invio in corso...",
        },
        wholesale: {
          title: "Gestione all'ingrosso",
          all: "Tutto",
          lowestPrice: "Prezzo più basso",
          highestPrice: "Prezzo più alto",
          filter: "Filtra",
          loadingItems: "Caricamento articoli…",
          showing: "Visualizzazione di",
          of: "di",
          item: "articolo",
          items: "articoli",
          inCategory: "in {0}",
          emptyTitle: "Nessun prodotto corrisponde a questo filtro",
          emptyText: "Prova una categoria o una fascia di prezzo diversa.",
          added: "Aggiunto",
          add: "Aggiungi",
          loadingMore: "Caricamento…",
          reachedEnd: "Hai raggiunto la fine.",
          salesPrice: "Prezzo di vendita",
          wholesalePrice: "Prezzo all'ingrosso",
          cancel: "Annulla",
          confirming: "Conferma in corso…",
          confirmListing: "Conferma inserzione",
          alreadyListed: "Già aggiunto alle tue inserzioni all'ingrosso.",
          addedToListings: '"{0}" aggiunto alle tue inserzioni all\'ingrosso.',
        },
        sellerSetup: {
          title: "Impostazioni",
          loading: "Caricamento impostazioni negozio…",
          noStoreTitle: "Nessun negozio trovato per questo account",
          noStoreText: "Candidati per diventare venditore per gestire le impostazioni del negozio.",
          storeInformation: "Informazioni sul negozio",
          storeInfoSub: "Aggiorna i dettagli del tuo negozio e le informazioni aziendali.",
          storeLogo: "Logo del negozio",
          uploadLogoSub: "Carica un logo per il tuo negozio",
          store: "Negozio",
          uploading: "Caricamento…",
          uploadLogo: "Carica logo",
          storeName: "Nome del negozio *",
          storeNamePlaceholder: "Nome del tuo negozio",
          storeNameRequired: "Il nome del negozio è obbligatorio.",
          storeDescription: "Descrizione del negozio",
          storeDescriptionPlaceholder: "Descrivi il tuo negozio...",
          businessEmail: "Email aziendale *",
          businessPhone: "Telefono aziendale",
          businessPhonePlaceholder: "Numero di telefono",
          saving: "Salvataggio…",
          saveChanges: "Salva modifiche",
          storeBanner: "Banner del negozio",
          storeBannerSub: "Mostrato in cima alla pagina del tuo negozio.",
          noBanner: "Nessun banner caricato",
          uploadBanner: "Carica banner",
        },
        productManagement: {
          title: "Gestione prodotti",
          addProduct: "+ Aggiungi prodotto",
          searchPlaceholder: "Cerca prodotti...",
          loadingProducts: "Caricamento dei tuoi prodotti…",
          showing: "Visualizzazione di",
          of: "di",
          products: "prodotti",
          emptyTitle: "Nessun prodotto ancora elencato",
          emptyText: "Aggiungi prodotti dalla Gestione all'ingrosso per vederli qui.",
          goToWholesale: "Vai a Gestione all'ingrosso",
          noMatchesTitle: "Nessun risultato",
          noMatchesText: "Nessun prodotto corrisponde a",
          wholesale: "Ingrosso",
          sales: "Vendita",
        },
        sellerOrders: {
          title: "Ordini del negozio",
          lumpSum: "Importo forfettario",
          salesProfit: "Profitto di vendita",
          wholesalePrice: "Prezzo all'ingrosso",
          actualPayment: "Pagamento effettivo",
          processing: "Elaborazione…",
          goToShipment: "Vai alla spedizione",
          profitCredited: "Profitto accreditato",
          refunded: "Rimborsato",
          awaitingReview: "In attesa di revisione",
          paid: "Pagato",
          waitingForDelivery: "In attesa di consegna",
          waitingForReceipt: "In attesa di ricezione",
          completed: "Completato",
          refundAfterSales: "Rimborso / Post-vendita",
          emptyTitle: "Ancora niente qui",
          emptyText: "Gli ordini in questa fase appariranno qui.",
        },
        sellerHub: {
          loadingShop: "Caricamento del tuo negozio...",
          storeFrozen: "Negozio bloccato",
          frozenText: "Il tuo account venditore è stato temporaneamente bloccato perché un ordine è rimasto in attesa di consegna troppo a lungo. Non puoi accedere alla dashboard venditore finché questo non viene risolto.",
          contactSupport: "Contatta l'assistenza clienti",
          backToBuyer: "Torna all'account acquirente",
          accountBalance: "Saldo account",
          viewShop: "Visualizza negozio",
          orderFulfillment: "Evasione ordini",
          waitingForDelivery: "In attesa di consegna",
          waitingForReceipt: "In attesa di ricezione",
          completed: "Completato",
          refundAfterSales: "Rimborso / Post-vendita",
          quickActions: "Azioni rapide",
          topUp: "Ricarica",
          withdrawal: "Prelievo",
          wholesaleCatalog: "Catalogo all'ingrosso",
          manageProducts: "Gestisci prodotti",
        },
        shopDetails: {
          title: "Dettagli negozio",
          loading: "Caricamento dettagli negozio…",
          noStoreTitle: "Non hai ancora un negozio",
          noStoreText: "Candidati per diventare venditore per vedere qui i dettagli del tuo negozio.",
          applyNow: "Candidati ora",
          accountBalance: "Saldo account",
          storeHealth: "Salute del negozio",
          creditScore: "Punteggio di credito",
          followers: "Follower",
          todaysOrders: "Ordini di oggi",
          cumulativeOrderQty: "Quantità cumulativa ordini",
          salesPerformance: "Prestazioni di vendita",
          todaysSales: "Vendite di oggi",
          totalSales: "Vendite totali",
          todaysProfit: "Profitto di oggi",
          totalProfit: "Profitto totale",
        },
        mineSeller: {
          menu: {
            dashboard: "Dashboard",
            wholesale: "Gestione all'ingrosso",
            shopDetails: "Dettagli negozio",
            products: "Gestione prodotti",
            orders: "Ordini",
            billing: "Registro fatturazione",
            addresses: "Indirizzi di consegna",
            support: "Centro servizi",
            loginPassword: "Password di accesso",
            paymentPassword: "Password di pagamento",
            settings: "Impostazioni",
          },
          myStore: "Il mio negozio",
          seller: "Venditore",
          switchToBuyer: "Passa all'account acquirente",
          logOut: "Esci",
        },
        mineHub: {
          storeFrozen: "Negozio bloccato",
          storeFrozenSub: "Il tuo account venditore è stato temporaneamente bloccato.",
          contactSupport: "Contatta l'assistenza clienti",
          storeApproved: "Richiesta negozio approvata!",
          storeApprovedSub: "Il tuo account venditore è attivo.",
          goToSellerDashboard: "Vai alla dashboard venditore",
          accountBalance: "Saldo account",
          myAccount: "Il mio account",
          myStuff: "Le mie cose",
          myCollection: "La mia collezione",
          myBrowse: "Visti di recente",
          myOrders: "I miei ordini",
          viewAll: "Vedi tutto",
          paymentPending: "Pagamento in sospeso",
          inShipping: "In spedizione",
          received: "Ricevuto",
          completed: "Completato",
          refund: "Rimborso",
          quickActions: "Azioni rapide",
          topUp: "Ricarica",
          withdrawal: "Prelievo",
          sellerDashboard: "Dashboard venditore",
          applyMerchant: "Candidati come venditore",
        },
        addresses: {
          title: "Indirizzi di consegna",
          addAddress: "+ Aggiungi indirizzo",
          editAddress: "Modifica indirizzo",
          addNewAddress: "Aggiungi nuovo indirizzo",
          address: "Indirizzo",
          addressPlaceholder: "Via, città, provincia, CAP",
          contactName: "Nome contatto",
          contactNamePlaceholder: "Nome del destinatario",
          contactNumber: "Numero di contatto",
          contactNumberPlaceholder: "Numero di telefono",
          cancel: "Annulla",
          saving: "Salvataggio...",
          saveAddress: "Salva indirizzo",
          emptyTitle: "Nessun indirizzo salvato",
          emptyText: "Aggiungi un indirizzo di consegna per velocizzare il checkout.",
          deleteConfirm: "Eliminare questo indirizzo?",
          yesDelete: "Sì, elimina",
          edit: "Modifica",
          delete: "Elimina",
        },
        settings: {
          title: "Impostazioni",
          publicProfile: "Profilo pubblico",
          publicProfileSub: "Queste informazioni saranno mostrate nelle tue recensioni e nel tuo profilo.",
          uploading: "Caricamento…",
          changeAvatar: "Cambia avatar",
          displayName: "Nome visualizzato",
          displayNamePlaceholder: "Il tuo nome visualizzato",
          displayNameRequired: "Il nome visualizzato è obbligatorio.",
          emailAddress: "Indirizzo email",
          emailHint: "Contatta l'assistenza per cambiare il tuo indirizzo email.",
          saving: "Salvataggio…",
          saveChanges: "Salva modifiche",
          accountStats: "Statistiche account",
          orders: "Ordini",
          reviews: "Recensioni",
          wishlist: "Lista desideri",
          joined: "Iscritto",
        },
        myOrders: {
          title: "I miei ordini",
          emptyTitle: "Ancora nessun ordine",
          emptyText: "Gli ordini che effettui appariranno qui.",
          startShopping: "Inizia lo shopping",
          order: "Ordine",
          total: "Totale",
          statusPending: "In attesa",
          statusConfirmed: "Confermato",
          statusShipped: "Spedito",
          statusDelivered: "Consegnato",
          statusCancelled: "Annullato",
        },
        balance: {
          title: "Saldo",
          totalBalance: "Saldo totale",
          accountBalance: "Saldo account",
          availableBalance: "Saldo disponibile",
          deposit: "Deposito",
          withdraw: "Preleva",
          hint: "Il saldo disponibile può essere usato per gli acquisti e prelevato sul tuo wallet collegato.",
        },
        depositRecord: {
          title: "Registro depositi",
          totalDeposited: "Totale depositato",
        },
        withdrawalRecord: {
          title: "Registro prelievi",
          totalWithdrawn: "Totale prelevato",
        },
        paymentPassword: {
          title: "Password di pagamento",
          oldPlaceholder: "Inserisci la tua password di transazione attuale",
          newPlaceholder: "Inserisci la tua nuova password di transazione",
          confirmPlaceholder: "Conferma la tua nuova password di transazione",
          hint: "La tua password di transazione viene usata per confermare i prelievi e altre modifiche sensibili dell'account. Tienila al sicuro e non condividerla mai con nessuno.",
        },
        login: {
          brandTitle: "Compra di più, vivi meglio",
          brandSubtitle: "Migliaia di prodotti, prezzi imbattibili, consegnati a casa tua.",
          title: "Bentornato",
          subtitle: "Accedi per continuare lo shopping",
          password: "Password",
          forgotPassword: "Password dimenticata?",
        },
        register: {
          brandTitle: "Unisciti a Estore oggi",
          brandSubtitle: "Crea un account per tracciare gli ordini, salvare indirizzi e fare il checkout più velocemente.",
          title: "Crea il tuo account",
          subtitle: "Unisciti a Estore e fai acquisti in modo più intelligente",
          email: "Email",
          emailPlaceholder: "Inserisci la tua email",
          getOtp: "Ottieni OTP",
          otp: "Codice di verifica",
          otpPlaceholder: "Inserisci il codice inviato alla tua email",
          phoneNumber: "Numero di telefono",
          phoneNumberPlaceholder: "Numero di telefono",
          password: "Password",
          passwordPlaceholder: "Crea una password",
          confirmPassword: "Conferma password",
          confirmPasswordPlaceholder: "Reinserisci la tua password",
          registerButton: "Registrati",
          haveAccount: "Hai già un account?",
          logIn: "Accedi",
        },
        checkout: {
          loading: "Caricamento...",
          qty: "Qtà",
        },
        mine: {
          myBrowse: {
            title: "Visti di recente",
            emptyTitle: "Ancora nessuna cronologia di navigazione",
            emptyText: "I prodotti che visualizzi appariranno qui per riprendere da dove hai lasciato.",
            startShopping: "Inizia lo shopping",
          },
          myCollection: {
            title: "La mia collezione",
            emptyTitle: "Ancora nessun articolo salvato",
            emptyText: "I prodotti che salvi appariranno qui per ritrovarli rapidamente.",
            browseProducts: "Sfoglia prodotti",
          },
          support: {
            title: "Chat dal vivo",
            emptyTitle: "Il nostro team di assistenza ti risponderà a breve",
            emptyText: "Avvia una conversazione e risponderemo il prima possibile.",
          },
          menu: {
            account: "Il mio account",
            balance: "Saldo",
            orders: "I miei ordini",
            deposit: "Deposito",
            depositRecord: "Registro depositi",
            withdrawal: "Prelievo",
            withdrawalRecord: "Registro prelievi",
            paymentPassword: "Password di pagamento",
            addresses: "Indirizzi di consegna",
            collection: "La mia collezione",
            browse: "Visti di recente",
            messages: "Messaggi",
            settings: "Impostazioni",
            support: "Chat dal vivo",
          },
          goToSellerDashboard: "Vai alla dashboard venditore",
          applyMerchant: "Candidati come venditore",
          logOut: "Esci",
        },
        cart: {
          title: "Il mio carrello",
          empty: "Il tuo carrello è vuoto.",
          continueShopping: "Continua lo shopping",
          product: "Prodotto",
          price: "Prezzo",
          quantity: "Quantità",
          subtotal: "Subtotale",
          remove: "Rimuovi",
          orderSummary: "Riepilogo ordine",
          items: "Articoli",
          shipping: "Spedizione",
          calculatedAtCheckout: "Calcolato al checkout",
          total: "Totale",
          proceedToCheckout: "Procedi al checkout",
          continueShoppingArrow: "← Continua lo shopping",
        },
        productDetails: {
          notFound: "Prodotto non trovato.",
          noImage: "Nessuna immagine",
          description: "Descrizione",
          quantity: "Quantità",
          addToCart: "Aggiungi al carrello",
          buyNow: "Acquista ora",
        },
        classification: {
          searchPlaceholder: "Cerca nelle categorie",
          categories: "Categorie",
          loading: "Caricamento...",
          noCategories: "Nessuna categoria",
          category: "Categoria",
          noProducts: "Nessun prodotto trovato in questa categoria.",
          loadingMore: "Caricamento...",
          reachedEnd: "Hai raggiunto la fine.",
        },
        home: {
          allCategories: "Tutte le categorie",
          loading: "Caricamento...",
          noCategories: "Ancora nessuna categoria.",
          browseAll: "Sfoglia tutte le categorie",
          aboutSection: "Informazioni su E-store Fashion",
          aboutUs: "Chi siamo",
          joinUs: "Unisciti a noi",
          contactUs: "Contattaci",
          exchangeCooperation: "Scambio e cooperazione",
          merchantAgreement: "Accordo venditore",
          supplierCooperation: "Cooperazione fornitori",
          strategicManagementHeading: "Gestione strategica",
          strategicManagement: "Gestione strategica",
          precisionOperation: "Operazione di precisione",
          courseDriven: "Guidato dai corsi",
          faq: "FAQ",
          downloadApp: "Scarica l'app",
          globalPurchase: "Acquisto globale",
          heroWelcomeBack: "Bentornata",
          heroWelcomeGuest: "Benvenuta, splendida",
          heroGreeting: "Ciao, {0} 👋",
          heroDefaultTitle: "Stile per ogni lei",
          heroSlide1Text: "Abiti, scarpe e accessori selezionati per le donne che amano brillare.",
          heroSlide1Cta: "Acquista donna",
          heroSlide2Eyebrow: "Tempo limitato",
          heroSlide2Title: "Fino al 50% di sconto sulla moda donna",
          heroSlide2Text: "Rinnova il tuo guardaroba con i must-have della stagione.",
          heroSlide2Cta: "Vai ai saldi",
          heroSlide3Eyebrow: "Nuovi arrivi",
          heroSlide3Title: "Gioielli che amerai",
          heroSlide3Text: "Da delicate collane a borse statement — completa ogni look con stile.",
          heroSlide3Cta: "Esplora gli accessori",
          heroSlide4Eyebrow: "Solo questa settimana",
          heroSlide4Title: "Spedizione gratuita per ordini oltre 50$",
          heroSlide4Text: "Nessun codice necessario — lo sconto viene applicato automaticamente al checkout.",
          heroSlide4Cta: "Inizia lo shopping",
          trustShippingTitle: "Spedizione gratuita",
          trustShippingText: "Per ordini superiori a 50$",
          trustReturnsTitle: "Resi facili",
          trustReturnsText: "30 giorni per il reso",
          trustCheckoutTitle: "Checkout sicuro",
          trustCheckoutText: "I tuoi dati restano protetti",
          trustSupportTitle: "Assistenza 24/7",
          trustSupportText: "Siamo qui ogni volta che hai bisogno",
          flashDeals: "Offerte lampo",
          limitedTime: "Tempo limitato",
          justForYou: "Solo per te",
          seeAll: "Vedi tutto",
          noMoreProducts: "Al momento non ci sono altri prodotti da mostrare.",
          add: "Aggiungi",
          previousSlide: "Slide precedente",
          nextSlide: "Slide successiva",
          close: "Chiudi",
          infoEmpty: "Questo contenuto non è ancora stato aggiunto. Torna presto a controllare.",
        },
        footer: {
          blurb: "Tutto ciò di cui hai bisogno, consegnato a casa tua.",
          shopHeading: "Shop",
          accountHeading: "Account",
          supportHeading: "Assistenza",
          helpCenter: "Centro assistenza",
          shipping: "Spedizione e consegna",
          returns: "Resi",
          deliveryAddresses: "Indirizzi di consegna",
          login: "Accedi",
          createAccount: "Crea account",
          rights: "© {0} Estore. Tutti i diritti riservati.",
        },
      },
    },
};

export default it;
