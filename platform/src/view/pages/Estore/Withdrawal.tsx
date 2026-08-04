import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { i18n } from "../../../i18n";
import authSelectors from "src/modules/auth/authSelectors";
import authActions from "src/modules/auth/authActions";
import walletSettingsActions from "src/modules/walletSettings/walletSettingsActions";
import walletSettingsSelectors from "src/modules/walletSettings/walletSettingsSelectors";
import transactionFormActions from "src/modules/transaction/form/transactionFormActions";
import transactionFormSelectors from "src/modules/transaction/form/transactionFormSelectors";
import CryptoRatesService from "src/modules/cryptoRates/cryptoRatesService";
import Message from "src/view/shared/message";

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

function Withdrawal() {
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
  const [address, setAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [withdrawPassword, setWithdrawPassword] = useState("");
  const [rates, setRates] = useState<{ btc: number; eth: number } | null>(null);
  const [ratesLoading, setRatesLoading] = useState(false);

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
        // shouldn't block the rest of the withdrawal form.
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

  const fee =
    (walletSettings && walletSettings[currentWallet.feeField]) || 0;

  const isCrypto = currentWallet.key === "eth" || currentWallet.key === "btc";
  const rate = rateForWallet(currentWallet.key, rates);

  // `amount` is entered in the wallet's own coin (same unit the fee is
  // shown in) - matching the deposit form and matching what's on screen,
  // rather than USD, which is what previously made a tiny-looking number
  // like 0.00005 ETH read as "$0.00005" and fail against the fee.
  const amountNum = amount && Number(amount) > 0 ? Number(amount) : null;
  const feeNum = Number(fee) || 0;
  const feeUsdt = rate ? feeNum * rate : null;
  const netCoin = amountNum !== null ? amountNum - feeNum : null;
  const belowFee = netCoin !== null && netCoin <= 0;
  const grossUsd = amountNum !== null && rate ? amountNum * rate : null;

  const balance = currentUser?.balance?.toFixed(2) || "0.00";

  const doSubmit = async () => {
    if (!address.trim()) {
      Message.error(i18n("pages.withdrawal.missingAddress"));
      return;
    }

    if (!amount || Number(amount) <= 0) {
      Message.error(i18n("pages.withdrawal.missingAmount"));
      return;
    }

    if (
      currentUser?.balance !== undefined &&
      grossUsd !== null &&
      grossUsd > currentUser.balance
    ) {
      Message.error(i18n("pages.withdrawal.exceedsBalance"));
      return;
    }

    if (belowFee) {
      Message.error(i18n("pages.withdrawal.belowFeeWarning"));
      return;
    }

    if (!withdrawPassword) {
      Message.error(i18n("pages.withdrawal.missingPassword"));
      return;
    }

    const values = {
      status: "pending",
      datetransaction: new Date(),
      user: currentUser ? currentUser.id : null,
      type: "withdraw",
      wallet: selectedWallet,
      walletAddress: address.trim(),
      amount: amount,
      withdrawPassword: withdrawPassword,
    };

    await dispatch(transactionFormActions.doCreateWithdrawal(values));
    await dispatch(authActions.doRefreshCurrentUser());
  };

  return (
    <>
      <div className="phone">

        <div className="page-header">
          <div className="left">
            <button className="back-btn" onClick={() => window.history.back()}>←</button>
            <span className="page-title">{i18n("pages.withdrawal.title")}</span>
          </div>
        </div>

        <div className="scroll-area">
          <div className="form-card">

            <span className="field-label">{i18n("pages.withdrawal.withdrawalMethods")}</span>
            <div className="select-box">
              <select
                value={selectedWallet}
                onChange={(event) => setSelectedWallet(event.target.value)}
                className="wallet-select"
                disabled={initLoading}
              >
                {WALLET_TYPES.map((wallet) => (
                  <option key={wallet.key} value={wallet.key}>
                    {i18n(`pages.withdrawal.wallets.${wallet.key}`)}
                  </option>
                ))}
              </select>
            </div>

            <div className="info-row">
              <span className="info-label">{i18n("pages.withdrawal.fee")}</span>
              <span className="info-value">
                {fee} {currentWallet.symbol}
                {feeUsdt !== null && (
                  <span className="fee-usdt-inline"> (≈ ${feeUsdt.toFixed(2)})</span>
                )}
              </span>
            </div>

            <span className="field-label sp">
              <span className="required">*</span>
              {i18n("pages.withdrawal.withdrawalAddress")}
            </span>
            <input
              type="text"
              className="text-input"
              placeholder={i18n("pages.withdrawal.addressPlaceholder")}
              value={address}
              onChange={(event) => setAddress(event.target.value)}
            />

            <span className="field-label sp">
              <span className="required">*</span>
              {i18n("pages.withdrawal.amount")} <span className="unit-tag">({currentWallet.symbol})</span>
            </span>
            <input
              type="number"
              className="text-input"
              placeholder={i18n("pages.withdrawal.amountPlaceholder")}
              value={amount}
              onChange={(event) => setAmount(event.target.value)}
            />

            <div className={`receive-summary${belowFee ? " danger" : ""}`}>
              <div className="summary-row">
                <span className="receive-label">{i18n("pages.withdrawal.youWillReceive")}</span>
                <span className="receive-value">
                  {belowFee
                    ? i18n("pages.withdrawal.belowFeeWarning")
                    : netCoin !== null
                    ? `≈ ${netCoin.toFixed(isCrypto ? 8 : 2)} ${currentWallet.symbol}`
                    : i18n("pages.withdrawal.enterAmountToPreview")}
                </span>
              </div>
              {!belowFee && isCrypto && amountNum !== null && (
                <div className="summary-row sub">
                  <span className="summary-sub-label">Deducted from balance</span>
                  <span className="summary-sub-value">
                    {ratesLoading && !rates
                      ? i18n("pages.withdrawal.fetchingRate")
                      : grossUsd !== null
                      ? `≈ $${grossUsd.toFixed(2)}`
                      : i18n("pages.withdrawal.rateUnavailable")}
                  </span>
                </div>
              )}
            </div>

            <span className="field-label sp">
              <span className="required">*</span>
              {i18n("pages.withdrawal.withdrawalPassword")}
            </span>
            <input
              type="password"
              className="text-input"
              placeholder={i18n("pages.withdrawal.passwordPlaceholder")}
              value={withdrawPassword}
              onChange={(event) => setWithdrawPassword(event.target.value)}
            />

            <div className="balance-line">
              {i18n("pages.withdrawal.availableBalance")}: <b>${balance}</b>
            </div>

            <div className="notice">
              <p>{i18n("pages.withdrawal.notice1")}</p>
              <p>{i18n("pages.withdrawal.notice2")}</p>
            </div>

            <button
              className="submit-btn"
              disabled={saveLoading || belowFee}
              onClick={doSubmit}
            >
              {i18n("pages.withdrawal.submit")}
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
    --red:#DC2626;
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
    justify-content:space-between;
  }
  .page-header .left{ display:flex; align-items:center; gap:12px; }
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
  .required{ color:var(--red); margin-right:2px; }

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

  /* ---------- Info rows ---------- */
  .info-row{
    display:flex;
    justify-content:space-between;
    align-items:center;
    padding:12px 2px;
    border-top:1px solid var(--grey-light);
  }
  .info-label{ font-size:13px; color:var(--navy); font-weight:600; }
  .info-value{ font-size:14px; font-weight:800; color:var(--navy); }
  .fee-usdt-inline{ font-size:11.5px; font-weight:600; color:var(--grey-text); }
  .unit-tag{ color:var(--grey-text); font-weight:600; }

  /* ---------- Receive summary ---------- */
  .receive-summary{
    margin-top:12px;
    display:flex;
    flex-direction:column;
    gap:8px;
    background:#FAFAFA;
    border:1px solid #E7E7E7;
    border-radius:12px;
    padding:12px 14px;
  }
  .receive-summary.danger{
    background:#FCE9E9;
    border-color:#FCE9E9;
  }
  .summary-row{
    display:flex;
    justify-content:space-between;
    align-items:center;
    gap:10px;
  }
  .summary-row.sub{
    padding-top:8px;
    border-top:1px dashed #E7E7E7;
  }
  .receive-summary.danger .summary-row.sub{ border-top-color:#FCE9E9; }
  .receive-label{ font-size:12.5px; font-weight:700; color:var(--navy); }
  .receive-value{ font-size:13px; font-weight:800; color:var(--blue-mid); text-align:right; }
  .receive-summary.danger .receive-value{ color:var(--red); }
  .summary-sub-label{ font-size:11.5px; color:var(--grey-text); }
  .summary-sub-value{ font-size:11.5px; font-weight:700; color:var(--grey-text); text-align:right; }

  /* ---------- Inputs ---------- */
  .text-input{
    width:100%;
    border:1.5px solid var(--field-border);
    border-radius:12px;
    padding:13px 14px;
    font-size:13.5px;
    color:var(--navy);
    outline:none;
  }
  .text-input::placeholder{ color:#888888; }
  .text-input:focus{ border-color:var(--blue-bright); box-shadow:0 0 0 3px rgba(209,69,31,0.12); }

  .balance-line{
    margin-top:16px;
    font-size:12.5px;
    color:var(--grey-text);
  }
  .balance-line b{ color:var(--navy); }

  .notice{
    margin-top:14px;
    background:#FAFAFA;
    border-radius:12px;
    padding:12px 14px;
    font-size:11.5px;
    line-height:1.6;
    color:var(--grey-text);
  }
  .notice p + p{ margin-top:8px; }

  .submit-btn{
    width:100%;
    margin-top:20px;
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

export default Withdrawal;
