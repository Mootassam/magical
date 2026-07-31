/**
 * I18n dictionary for the en.
 */

const en = {
  app: {
    title: 'Nowspeed',
  },

  validation: {

    noPendingRecord: 'No pending record found',
    inValidWithdrawPassword: 'Your withdraw Password is not correct please check again',
    exceedsBalance: 'It looks like your withdrawal amount exceeds your balance',
    withdrawalBelowFee: 'The withdrawal amount must be greater than the network fee',
    missingWalletAddress: 'Please go to the "Wallet" section to bind your USDT (TRC20) or ERC20 address before submitting a withdrawal request.',
    requiredAmount: 'Please write amount',
    notFoundTransaction: 'Transaction not found',
    permissoin: "Please try to contact the customer Support for help",
    duplicateSubsctription: 'You have already subscribed to this plan',
    InsufficientBalance: 'Insufficient balance',
    requiredSubscription: 'Please select a subscription plan',
    moretasks: 'This is your limit. Please contact customer support for more tasks',
    deposit:"Insufficient balance please contact the customer support",
    submitPendingProducts:"Please, submit the pending products ",
    emptyCart: "Your cart is empty",
    missingDeliveryAddress: "Please provide a delivery address",
    notificationUser: "Please select a recipient",
    notificationContent: "Please write a subject and a message",
  },


  auth: {
    userNotFound: `Sorry, we don't recognize your credentials`,
    wrongPassword: `Sorry, we don't recognize your credentials`,
    weakPassword: 'This password is too weak',
    emailAlreadyInUse: 'Username is already in use',
    invitationCode: 'please write a correct invitationCode',
    invalidEmail: 'Please provide a valid email',
    passwordReset: {
      invalidToken:
        'Password reset link is invalid or has expired',
      error: `Email not recognized`,
    },
    emailAddressVerificationEmail: {
      invalidToken:
        'Email verification link is invalid or has expired.',
      error: `Email not recognized.`,
      signedInAsWrongUser: `This email confirmation was sent to {0} but you're signed in as {1}.`,
    },
    passwordChange: {
      invalidPassword: 'The old password is invalid',
    },
  },

  store: {
    errors: {
      alreadySubmitted: 'You already have a store application pending review or already approved',
      notFound: 'Store application not found',
    },
  },

  storeListing: {
    errors: {
      noApprovedStore: 'You need an approved store to list products. Please apply and wait for approval first.',
      storeFrozen: 'Your store is currently frozen. Please contact customer service.',
    },
  },

  automatOrder: {
    errors: {
      emptyRows: 'Please add at least one order row',
      missingFields: 'Please fill in store, customer name, product, quantity and start time for every row',
      invalidStore: 'One of the selected stores could not be found',
      invalidProduct: 'One of the selected products could not be found',
      productNotInStore: 'The selected product is not listed in the selected store',
    },
  },

  orderShipment: {
    errors: {
      noApprovedStore: 'You need an approved store to process shipments',
      storeFrozen: 'Your store is currently frozen. Please contact customer service.',
      notYourOrder: 'This order does not belong to your store',
      notPending: 'This order is no longer waiting for delivery',
      alreadyShipped: 'This order has already been sent for shipment',
      insufficientBalance: 'You do not have enough balance to process this request',
      invalidStatus: 'Invalid shipment status',
      alreadyResolved: 'This shipment has already been resolved',
    },
  },

  product: {
    errors: {
      noVipForImport: 'Please create at least one VIP level before importing products, so imported products can be assigned to a level.',
    },
  },

  user: {
    errors: {
      userAlreadyExists:
        'User with this email already exists.',
      userNotFound: 'User not found.',
      destroyingHimself: `You can't delete yourself.`,
      revokingOwnPermission: `You can't revoke your own admin permission.`,
      revokingPlanUser: `You can't revoke the admin permission of the plan manager.`,
      destroyingPlanUser: `You can't delete the plan manager.`,
    },
  },

  tenant: {
    exists:
      'There is already a workspace on this application.',
    url: {
      exists: 'This workspace URL is already in use.',
    },
    invitation: {
      notSameEmail: `This invitation was sent to {0} but you're signed in as {1}.`,
    },
    planActive: `There is a plan active for this workspace. Please cancel the plan first.`,
    stripeNotConfigured: 'Stripe is not configured.',
  },

  importer: {
    errors: {
      invalidFileEmpty: 'The file is empty',
      invalidFileExcel:
        'Only excel (.xlsx) files are allowed',
      invalidFileUpload:
        'Invalid file. Make sure you are using the last version of the template.',
      importHashRequired: 'Import hash is required',
      importHashExistent: 'Data has already been imported',
    },
  },

  errors: {
    notFound: {
      message: 'Not Found',
    },
    forbidden: {
      message: 'Forbidden',
    },
    validation: {
      message: 'An error occurred',
    },
  },

  email: {
    error: `Email provider is not configured.`,
  },

  preview: {
    error:
      'Sorry, this operation is not allowed in preview mode.',
  },


};

export default en;
