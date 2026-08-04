import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { i18n } from "../../../i18n";
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

const WALLET_TYPES = [
  { key: "eth", addressField: "ethAddress", feeField: "ethFee", symbol: "ETH" },
  { key: "btc", addressField: "btcAddress", feeField: "btcFee", symbol: "BTC" },
  {
    key: "usdt_trc20",
    addressField: "usdtTrc20Address",
    feeField: "usdtTrc20Fee",
    symbol: "USDT",
  },
  {
    key: "usdt_erc20",
    addressField: "usdtErc20Address",
    feeField: "usdtErc20Fee",
    symbol: "USDT",
  },
];

// USDT wallets are pegged 1:1 to USD, so only ETH/BTC need a live rate.
function rateForWallet(walletKey, rates) {
  if (walletKey === "eth") {
    return rates?.eth;
  }

  if (walletKey === "btc") {
    return rates?.btc;
  }

  return 1;
}

function qrCodeUrl(address) {
  if (!address) {
    return undefined;
  }

  return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
    address,
  )}`;
}

function Topup() {
  const dispatch = useDispatch();
  const currentUser = useSelector(authSelectors.selectCurrentUser);
  const walletSettings = useSelector(
    walletSettingsSelectors.selectWalletSettings,
  );
  const initLoading = useSelector(
    walletSettingsSelectors.selectInitLoading,
  );
  const saveLoading = useSelector(
    transactionFormSelectors.selectSaveLoading,
  );

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

        if (mounted) {
          setRates(data);
        }
      } catch (error) {
        // The conversion is a convenience preview - a failed rate fetch
        // shouldn't block the rest of the deposit form.
      } finally {
        if (mounted) {
          setRatesLoading(false);
        }
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  const currentWallet =
    WALLET_TYPES.find((wallet) => wallet.key === selectedWallet) ||
    WALLET_TYPES[0];

  const address =
    (walletSettings && walletSettings[currentWallet.addressField]) || "";
  const fee = (walletSettings && walletSettings[currentWallet.feeField]) || 0;
  const isCrypto = currentWallet.key === "eth" || currentWallet.key === "btc";
  const rate = rateForWallet(currentWallet.key, rates);
  const amountUsdt =
    isCrypto && rate && amount && Number(amount) > 0
      ? Number(amount) * rate
      : null;
  const feeUsdt = isCrypto && rate ? Number(fee) * rate : null;

  const doCopyAddress = () => {
    if (!address) {
      return;
    }

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(address)
        .then(() => Message.success(i18n("pages.topup.addressCopied")))
        .catch((error) => console.error("Error copying to clipboard:", error));
    } else {
      const textArea = document.createElement("textarea");
      textArea.value = address;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      Message.success(i18n("pages.topup.addressCopied"));
    }
  };

  const doUploadPhoto = async (event) => {
    try {
      const files = event.target.files;

      if (!files || !files.length) {
        return;
      }

      const file = files[0];

      setUploading(true);

      const uploaded = await FileUploader.upload(file, {
        storage: Storage.values.transactionPhoto,
        image: true,
      });

      setPhoto(uploaded);
      setUploading(false);
    } catch (error) {
      setUploading(false);
      Errors.showMessage(error);
    } finally {
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
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
      amount: amount,
      photo: [photo],
    };

    await dispatch(transactionFormActions.doCreateTopup(values));
  };

  return (
    <>
      <div className="phone">

        <div className="page-header">
          <button className="back-btn" onClick={() => window.history.back()}>←</button>
          <span className="page-title">{i18n("pages.topup.title")}</span>
        </div>

        <div className="scroll-area">
          <div className="form-card">

            <span className="field-label">{i18n("pages.topup.rechargeMethods")}</span>
            <div className="select-box">
              <select
                value={selectedWallet}
                onChange={(event) => setSelectedWallet(event.target.value)}
                className="wallet-select"
                disabled={initLoading}
              >
                {WALLET_TYPES.map((wallet) => (
                  <option key={wallet.key} value={wallet.key}>
                    {i18n(`pages.topup.wallets.${wallet.key}`)}
                  </option>
                ))}
              </select>
            </div>

            <div className="qr-block">
              <div className="qr-code">
                {address ? (
                  <img src={qrCodeUrl(address)} alt="QR code" />
                ) : (
                  <div className="qr-placeholder" />
                )}
              </div>
              <div className="qr-text">
                <div className="qr-hint">{i18n("pages.topup.scanHint")}</div>
                <div className="qr-address">
                  {address || (initLoading ? "..." : "-")}
                </div>
                <div className="fee-hint">
                  {i18n("pages.topup.fee")}: {fee} {currentWallet.symbol}
                  {feeUsdt !== null && (
                    <span className="fee-usdt"> (≈ ${feeUsdt.toFixed(2)} USDT)</span>
                  )}
                </div>
                <div className="copy-link" onClick={doCopyAddress}>
                  📋 {i18n("pages.topup.copyAddress")}
                </div>
              </div>
            </div>

            <span className="field-label sp">
              {i18n("pages.topup.amount")} <span className="unit-tag">({currentWallet.symbol})</span>
            </span>
            <input
              type="number"
              className="text-input"
              placeholder={i18n("pages.topup.amountPlaceholder")}
              value={amount}
              onChange={(event) => setAmount(event.target.value)}
            />

            {isCrypto && (
              <div className="conversion-hint">
                {ratesLoading && !rates
                  ? i18n("pages.topup.fetchingRate")
                  : amountUsdt !== null
                  ? `≈ $${amountUsdt.toFixed(2)} USDT`
                  : !rates
                  ? i18n("pages.topup.rateUnavailable")
                  : i18n("pages.topup.enterAmountForValue")}
              </div>
            )}

            <span className="field-label sp">{i18n("pages.topup.uploadVoucher")}</span>
            <div className="upload-wrap">
              <label className="upload-box">
                {photo ? (
                  <img
                    src={photo.downloadUrl}
                    alt={photo.name}
                    className="upload-preview"
                  />
                ) : (
                  <>
                    <span className="plus">{uploading ? "…" : "+"}</span>
                    <span className="lbl">{i18n("pages.topup.uploadLabel")}</span>
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
            </div>

            <button
              className="submit-btn"
              disabled={saveLoading || uploading}
              onClick={doSubmit}
            >
              {i18n("pages.topup.submit")}
            </button>

          </div>
        </div>

      </div>

      <style>{`
  :root{
    --navy:#111111;
    --blue-bright:#D1451F;
    --blue-mid:#B93C1A;
    --blue-deep:#7F2B15;
    --white:#FFFFFF;
    --page-bg:#FAFAFA;
    --card-bg:#FFFFFF;
    --grey-text:#555555;
    --grey-light:#F4F4F4;
    --field-border:#E7E7E7;
  }

  *{box-sizing:border-box; margin:0; padding:0;}

  body{
    font-family:'Segoe UI', Roboto, Arial, sans-serif;
    background:var(--page-bg);
    margin:0;
  }

  .phone{
    width:390px;
    max-width:390px;
    height:100vh;
    background:var(--page-bg);
    overflow:hidden;
    position:relative;
    display:flex;
    flex-direction:column;
    margin:0 auto;
  }

  /* ---------- Header ---------- */
  .page-header{
    background:linear-gradient(135deg, var(--blue-deep), var(--blue-bright));
    padding:14px 18px 16px;
    color:#fff;
    flex-shrink:0;
    display:flex;
    align-items:center;
    gap:12px;
  }
  .back-btn{
    width:34px; height:34px;
    border-radius:50%;
    background:rgba(255,255,255,0.18);
    display:flex; align-items:center; justify-content:center;
    font-size:16px;
    cursor:pointer;
    border:none;
    color:#fff;
  }
  .page-title{ font-size:17px; font-weight:800; }

  /* ---------- Scroll body ---------- */
  .scroll-area{
    flex:1;
    overflow-y:auto;
    scrollbar-width:none;
    padding:16px 16px 30px;
  }
  .scroll-area::-webkit-scrollbar{ display:none; }

  .form-card{
    background:var(--card-bg);
    border-radius:18px;
    box-shadow:0 8px 20px rgba(0,0,0,0.07);
    padding:18px 16px;
  }

  .field-label{
    font-size:12.5px;
    font-weight:700;
    color:var(--navy);
    margin-bottom:8px;
    display:block;
  }
  .field-label.sp{ margin-top:18px; }

  .select-box{
    display:flex;
    align-items:center;
    justify-content:space-between;
    background:#fff;
    border:1.5px solid var(--field-border);
    border-radius:12px;
    padding:4px 6px;
    font-size:13.5px;
    color:var(--navy);
    font-weight:600;
  }
  .wallet-select{
    width:100%;
    border:none;
    outline:none;
    background:transparent;
    padding:9px 8px;
    font-size:13.5px;
    color:var(--navy);
    font-weight:600;
  }

  /* ---------- QR block ---------- */
  .qr-block{
    display:flex;
    gap:14px;
    align-items:flex-start;
    margin-top:20px;
    background:var(--grey-light);
    border-radius:14px;
    padding:14px;
  }
  .qr-code{
    width:96px; height:96px;
    border-radius:8px;
    overflow:hidden;
    flex-shrink:0;
    background:#fff;
    border:1px solid var(--field-border);
  }
  .qr-code img{ width:100%; height:100%; display:block; object-fit:contain; }
  .qr-placeholder{ width:100%; height:100%; background:var(--grey-light); }

  .qr-text{ flex:1; min-width:0; }
  .qr-hint{ font-size:11px; color:var(--grey-text); margin-bottom:6px; }
  .qr-address{
    font-size:11.5px;
    font-weight:700;
    color:var(--navy);
    word-break:break-all;
    line-height:1.4;
  }
  .fee-hint{
    font-size:11px;
    color:var(--grey-text);
    margin-top:6px;
  }
  .fee-usdt{
    color:#888888;
  }
  .unit-tag{
    color:var(--grey-text);
    font-weight:600;
  }
  .conversion-hint{
    margin-top:8px;
    font-size:12.5px;
    font-weight:700;
    color:var(--blue-mid);
  }
  .copy-link{
    display:inline-flex;
    align-items:center;
    gap:5px;
    font-size:12px;
    font-weight:700;
    color:var(--blue-mid);
    margin-top:8px;
    cursor:pointer;
  }

  /* ---------- Inputs ---------- */
  .text-input{
    width:100%;
    border:1.5px solid var(--blue-bright);
    border-radius:12px;
    padding:13px 14px;
    font-size:13.5px;
    color:var(--navy);
    outline:none;
  }
  .text-input::placeholder{ color:#888888; }

  /* ---------- Upload box ---------- */
  .upload-wrap{
    display:flex;
    justify-content:center;
    margin-top:10px;
  }
  .upload-box{
    width:130px; height:130px;
    border:1.6px dashed #E7E7E7;
    border-radius:14px;
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    gap:8px;
    color:var(--grey-text);
    background:#FAFAFA;
    cursor:pointer;
    overflow:hidden;
  }
  .upload-box .plus{ font-size:28px; color:#888888; }
  .upload-box .lbl{ font-size:12px; font-weight:600; text-align:center; color:var(--navy); }
  .upload-preview{ width:100%; height:100%; object-fit:cover; }

  .submit-btn{
    width:100%;
    margin-top:22px;
    border:none;
    border-radius:14px;
    padding:14px;
    background:linear-gradient(135deg, var(--blue-bright), var(--blue-deep));
    color:#fff;
    font-size:15px;
    font-weight:800;
    letter-spacing:0.3px;
    cursor:pointer;
    box-shadow:0 10px 22px rgba(209,69,31,0.4);
  }
  .submit-btn:disabled{
    opacity:0.6;
    cursor:not-allowed;
  }
      `}</style>
    </>
  );
}

export default Topup;
