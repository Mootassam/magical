import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { i18n } from "../../../i18n";
import authSelectors from "src/modules/auth/authSelectors";
import authActions from "src/modules/auth/authActions";
import walletSettingsActions from "src/modules/walletSettings/walletSettingsActions";
import walletSettingsSelectors from "src/modules/walletSettings/walletSettingsSelectors";
import transactionFormActions from "src/modules/transaction/form/transactionFormActions";
import transactionFormSelectors from "src/modules/transaction/form/transactionFormSelectors";
import Message from "src/view/shared/message";

const WALLET_TYPES = [
  { key: "eth", addressField: "ethAddress", feeField: "ethFee" },
  { key: "btc", addressField: "btcAddress", feeField: "btcFee" },
  {
    key: "usdt_trc20",
    addressField: "usdtTrc20Address",
    feeField: "usdtTrc20Fee",
  },
  {
    key: "usdt_erc20",
    addressField: "usdtErc20Address",
    feeField: "usdtErc20Fee",
  },
];

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

  useEffect(() => {
    dispatch(walletSettingsActions.doInit());
  }, [dispatch]);

  const currentWallet =
    WALLET_TYPES.find((wallet) => wallet.key === selectedWallet) ||
    WALLET_TYPES[0];

  const fee =
    (walletSettings && walletSettings[currentWallet.feeField]) || 0;

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

    if (currentUser?.balance !== undefined && Number(amount) > currentUser.balance) {
      Message.error(i18n("pages.withdrawal.exceedsBalance"));
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
              <span className="info-value">{fee}</span>
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
              {i18n("pages.withdrawal.amount")}
            </span>
            <input
              type="number"
              className="text-input"
              placeholder={i18n("pages.withdrawal.amountPlaceholder")}
              value={amount}
              onChange={(event) => setAmount(event.target.value)}
            />

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
              disabled={saveLoading}
              onClick={doSubmit}
            >
              {i18n("pages.withdrawal.submit")}
            </button>

          </div>
        </div>

      </div>

      <style>{`
  :root{
    --navy:#0e1b45;
    --blue-bright:#2f8dff;
    --blue-mid:#1656c9;
    --blue-deep:#0b3fae;
    --white:#ffffff;
    --page-bg:#f4f7fd;
    --card-bg:#ffffff;
    --grey-text:#6b7590;
    --grey-light:#eef2fa;
    --field-border:#dde4f2;
    --red:#ff5470;
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
    box-shadow:0 8px 20px rgba(20,40,100,0.07);
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
  .text-input::placeholder{ color:#a9b3cf; }
  .text-input:focus{ border-color:var(--blue-bright); box-shadow:0 0 0 3px rgba(47,141,255,0.12); }

  .balance-line{
    margin-top:16px;
    font-size:12.5px;
    color:var(--grey-text);
  }
  .balance-line b{ color:var(--navy); }

  .notice{
    margin-top:14px;
    background:#f6f9ff;
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
    box-shadow:0 10px 22px rgba(47,141,255,0.4);
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
