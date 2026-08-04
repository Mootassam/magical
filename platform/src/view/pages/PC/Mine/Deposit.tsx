import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { i18n } from "../../../../i18n";
import authSelectors from "src/modules/auth/authSelectors";
import walletSettingsActions from "src/modules/walletSettings/walletSettingsActions";
import walletSettingsSelectors from "src/modules/walletSettings/walletSettingsSelectors";
import transactionFormActions from "src/modules/transaction/form/transactionFormActions";
import transactionFormSelectors from "src/modules/transaction/form/transactionFormSelectors";
import CryptoRatesService from "src/modules/cryptoRates/cryptoRatesService";
import FileUploader from "src/modules/shared/fileUpload/fileUploader";
import Storage from "src/security/storage";
import Message from "src/view/shared/message";
import Errors from "src/modules/shared/error/errors";
import MineShell from "./MineShell";
import { sharedMineStyles } from "./MyAccount";

const WALLET_TYPES = [
  { key: "eth", addressField: "ethAddress", feeField: "ethFee", symbol: "ETH" },
  { key: "btc", addressField: "btcAddress", feeField: "btcFee", symbol: "BTC" },
  { key: "usdt_trc20", addressField: "usdtTrc20Address", feeField: "usdtTrc20Fee", symbol: "USDT" },
  { key: "usdt_erc20", addressField: "usdtErc20Address", feeField: "usdtErc20Fee", symbol: "USDT" },
];

function rateForWallet(walletKey, rates) {
  if (walletKey === "eth") return rates?.eth;
  if (walletKey === "btc") return rates?.btc;
  return 1;
}

function qrCodeUrl(address) {
  if (!address) return undefined;
  return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(address)}`;
}

function Deposit() {
  const dispatch = useDispatch();
  const currentUser = useSelector(authSelectors.selectCurrentUser);
  const walletSettings = useSelector(walletSettingsSelectors.selectWalletSettings);
  const initLoading = useSelector(walletSettingsSelectors.selectInitLoading);
  const saveLoading = useSelector(transactionFormSelectors.selectSaveLoading);

  const [selectedWallet, setSelectedWallet] = useState(WALLET_TYPES[0].key);
  const [amount, setAmount] = useState("");
  const [photo, setPhoto] = useState<any>(null);
  const [uploading, setUploading] = useState(false);
  const [rates, setRates] = useState<{ btc: number; eth: number } | null>(null);
  const [ratesLoading, setRatesLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    dispatch(walletSettingsActions.doInit());
  }, [dispatch]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setRatesLoading(true);
        const data = await CryptoRatesService.find();
        if (mounted) setRates(data);
      } catch (error) {
        // preview only - non-blocking
      } finally {
        if (mounted) setRatesLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const currentWallet = WALLET_TYPES.find((wallet) => wallet.key === selectedWallet) || WALLET_TYPES[0];
  const address = (walletSettings && walletSettings[currentWallet.addressField]) || "";
  const fee = (walletSettings && walletSettings[currentWallet.feeField]) || 0;
  const isCrypto = currentWallet.key === "eth" || currentWallet.key === "btc";
  const rate = rateForWallet(currentWallet.key, rates);
  const amountUsdt = isCrypto && rate && amount && Number(amount) > 0 ? Number(amount) * rate : null;
  const feeUsdt = isCrypto && rate ? Number(fee) * rate : null;

  const doCopyAddress = () => {
    if (!address) return;
    navigator.clipboard?.writeText(address);
    Message.success(i18n("pages.topup.addressCopied"));
  };

  const doUploadPhoto = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const files = event.target.files;
      if (!files || !files.length) return;
      setUploading(true);
      const uploaded = await FileUploader.upload(files[0], {
        storage: Storage.values.transactionPhoto,
        image: true,
      });
      setPhoto(uploaded);
    } catch (error) {
      Errors.showMessage(error);
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const doSubmit = async () => {
    if (!address) {
      Message.error(i18n("pages.topup.noWalletSelected"));
      return;
    }
    if (!amount || Number(amount) <= 0) {
      Message.error(i18n("pages.topup.missingAmount"));
      return;
    }
    if (!photo) {
      Message.error(i18n("pages.topup.missingPhoto"));
      return;
    }

    const values = {
      status: "pending",
      datetransaction: new Date(),
      user: currentUser ? currentUser.id : null,
      type: "deposit",
      wallet: selectedWallet,
      amount,
      photo: [photo],
    };

    await dispatch(transactionFormActions.doCreateTopup(values) as any);
    setAmount("");
    setPhoto(null);
  };

  return (
    <MineShell active="deposit">
      <h1 className="pc-mine__page-title">{i18n("pages.topup.title")}</h1>

      <div className="pc-mine__deposit-layout">
        <div className="pc-card pc-mine__panel pc-mine__deposit-left">
          <label className="pc-mine__field-label">{i18n("pages.topup.rechargeMethods")}</label>
          <select
            className="pc-input"
            value={selectedWallet}
            onChange={(event) => setSelectedWallet(event.target.value)}
            disabled={initLoading}
          >
            {WALLET_TYPES.map((wallet) => (
              <option key={wallet.key} value={wallet.key}>
                {i18n(`pages.topup.wallets.${wallet.key}`)}
              </option>
            ))}
          </select>

          <div className="pc-mine__qr-block">
            <div className="pc-mine__qr-code">
              {address ? <img src={qrCodeUrl(address)} alt="QR code" /> : <div className="pc-mine__qr-placeholder" />}
            </div>
            <div className="pc-mine__qr-text">
              <div className="pc-mine__qr-hint">{i18n("pages.topup.scanHint")}</div>
              <div className="pc-mine__qr-address">{address || (initLoading ? "..." : "-")}</div>
              <div className="pc-mine__fee-hint">
                {i18n("pages.topup.fee")}: {fee} {currentWallet.symbol}
                {feeUsdt !== null && <span> (≈ ${feeUsdt.toFixed(2)} USDT)</span>}
              </div>
              <button type="button" className="pc-mine__link-btn" onClick={doCopyAddress}>
                📋 {i18n("pages.topup.copyAddress")}
              </button>
            </div>
          </div>
        </div>

        <div className="pc-card pc-mine__panel pc-mine__deposit-right">
          <label className="pc-mine__field-label">
            {i18n("pages.topup.amount")} ({currentWallet.symbol})
          </label>
          <input
            type="number"
            className="pc-input"
            placeholder={i18n("pages.topup.amountPlaceholder")}
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
          />

          {isCrypto && (
            <div className="pc-mine__conversion-hint">
              {ratesLoading && !rates
                ? i18n("pages.topup.fetchingRate")
                : amountUsdt !== null
                ? `≈ $${amountUsdt.toFixed(2)} USDT`
                : !rates
                ? i18n("pages.topup.rateUnavailable")
                : i18n("pages.topup.enterAmountForValue")}
            </div>
          )}

          <label className="pc-mine__field-label pc-mine__field-label--sp">
            {i18n("pages.topup.uploadVoucher")}
          </label>
          <label className="pc-mine__upload-box">
            {photo ? (
              <img src={photo.downloadUrl} alt={photo.name} />
            ) : (
              <>
                <span className="pc-mine__upload-plus">{uploading ? "…" : "+"}</span>
                <span>{i18n("pages.topup.uploadLabel")}</span>
              </>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={doUploadPhoto}
              disabled={uploading}
            />
          </label>

          <button
            className="pc-btn pc-btn-primary pc-mine__deposit-submit"
            disabled={saveLoading || uploading}
            onClick={doSubmit}
          >
            {i18n("pages.topup.submit")}
          </button>
        </div>
      </div>

      <style>{sharedMineStyles}</style>
      <style>{depositWithdrawalStyles}</style>
    </MineShell>
  );
}

export const depositWithdrawalStyles = `
  .pc-mine__deposit-layout {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    align-items: start;
  }

  .pc-mine__deposit-left,
  .pc-mine__deposit-right {
    padding: 24px;
  }

  .pc-mine__deposit-layout select {
    margin-bottom: 20px;
  }

  .pc-mine__qr-block {
    display: flex;
    gap: 16px;
    align-items: center;
  }

  .pc-mine__qr-code {
    width: 96px;
    height: 96px;
    border-radius: var(--pc-radius-sm);
    border: 1px solid var(--pc-border);
    overflow: hidden;
    flex-shrink: 0;
  }

  .pc-mine__qr-code img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .pc-mine__qr-placeholder {
    width: 100%;
    height: 100%;
    background: var(--pc-secondary);
  }

  .pc-mine__qr-text {
    min-width: 0;
  }

  .pc-mine__qr-hint {
    font-size: 12px;
    color: var(--pc-text-muted);
    margin-bottom: 4px;
  }

  .pc-mine__qr-address {
    font-size: 12.5px;
    font-weight: 700;
    color: var(--pc-text);
    word-break: break-all;
    margin-bottom: 6px;
  }

  .pc-mine__fee-hint {
    font-size: 12px;
    color: var(--pc-text-secondary);
    margin-bottom: 6px;
  }

  .pc-mine__deposit-right .pc-input {
    margin-bottom: 12px;
  }

  .pc-mine__conversion-hint {
    font-size: 12.5px;
    color: var(--pc-text-secondary);
    margin-bottom: 16px;
  }

  .pc-mine__field-label--sp {
    margin-top: 4px;
  }

  .pc-mine__upload-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 6px;
    width: 100%;
    height: 120px;
    border: 1.5px dashed var(--pc-border);
    border-radius: var(--pc-radius-sm);
    cursor: pointer;
    font-size: 12.5px;
    color: var(--pc-text-muted);
    margin-bottom: 20px;
    overflow: hidden;
  }

  .pc-mine__upload-box img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .pc-mine__upload-plus {
    font-size: 24px;
    color: var(--pc-primary);
  }

  .pc-mine__deposit-submit {
    width: 100%;
    padding: 14px;
  }

  @media (max-width: 900px) {
    .pc-mine__deposit-layout {
      grid-template-columns: 1fr;
    }
  }
`;

export default Deposit;
