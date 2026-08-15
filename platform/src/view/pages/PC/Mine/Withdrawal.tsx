import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { i18n } from "../../../../i18n";
import authSelectors from "src/modules/auth/authSelectors";
import authActions from "src/modules/auth/authActions";
import walletSettingsActions from "src/modules/walletSettings/walletSettingsActions";
import walletSettingsSelectors from "src/modules/walletSettings/walletSettingsSelectors";
import transactionFormActions from "src/modules/transaction/form/transactionFormActions";
import transactionFormSelectors from "src/modules/transaction/form/transactionFormSelectors";
import CryptoRatesService from "src/modules/cryptoRates/cryptoRatesService";
import Message from "src/view/shared/message";
import MineShell from "./MineShell";
import { sharedMineStyles } from "./MyAccount";
import { depositWithdrawalStyles } from "./Deposit";

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

function Withdrawal() {
  const dispatch = useDispatch();
  const currentUser = useSelector(authSelectors.selectCurrentUser);
  const walletSettings = useSelector(walletSettingsSelectors.selectWalletSettings);
  const initLoading = useSelector(walletSettingsSelectors.selectInitLoading);
  const saveLoading = useSelector(transactionFormSelectors.selectSaveLoading);

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
  const fee = (walletSettings && walletSettings[currentWallet.feeField]) || 0;
  const isCrypto = currentWallet.key === "eth" || currentWallet.key === "btc";
  const rate = rateForWallet(currentWallet.key, rates);

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
    if (currentUser?.balance !== undefined && grossUsd !== null && grossUsd > currentUser.balance) {
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
      amount,
      withdrawPassword,
    };

    await dispatch(transactionFormActions.doCreateWithdrawal(values) as any);
    await dispatch(authActions.doRefreshCurrentUser() as any);
    setAddress("");
    setAmount("");
    setWithdrawPassword("");
  };

  return (
    <MineShell active="withdrawal">
      <h1 className="pc-mine__page-title">{i18n("pages.withdrawal.title")}</h1>

      <div className="pc-card pc-mine__panel pc-mine__withdraw-panel">
        <label className="pc-mine__field-label">{i18n("pages.withdrawal.withdrawalMethods")}</label>
        <select
          className="pc-input"
          value={selectedWallet}
          onChange={(event) => setSelectedWallet(event.target.value)}
          disabled={initLoading}
        >
          {WALLET_TYPES.map((wallet) => (
            <option key={wallet.key} value={wallet.key}>
              {i18n(`pages.withdrawal.wallets.${wallet.key}`)}
            </option>
          ))}
        </select>

        <div className="pc-mine__info-row">
          <span>{i18n("pages.withdrawal.fee")}</span>
          <span>
            {fee} {currentWallet.symbol}
            {feeUsdt !== null && <span> (≈ ${feeUsdt.toFixed(2)})</span>}
          </span>
        </div>

        <label className="pc-mine__field-label pc-mine__field-label--sp">
          {i18n("pages.withdrawal.withdrawalAddress")}
        </label>
        <input
          type="text"
          className="pc-input"
          placeholder={i18n("pages.withdrawal.addressPlaceholder")}
          value={address}
          onChange={(event) => setAddress(event.target.value)}
        />

        <label className="pc-mine__field-label pc-mine__field-label--sp">
          {i18n("pages.withdrawal.amount")} ({currentWallet.symbol})
        </label>
        <input
          type="number"
          className="pc-input"
          placeholder={i18n("pages.withdrawal.amountPlaceholder")}
          value={amount}
          onChange={(event) => setAmount(event.target.value)}
        />

        <div className={`pc-mine__receive-summary${belowFee ? " danger" : ""}`}>
          <div className="pc-mine__receive-row">
            <span>{i18n("pages.withdrawal.youWillReceive")}</span>
            <span>
              {belowFee
                ? i18n("pages.withdrawal.belowFeeWarning")
                : netCoin !== null
                ? `≈ ${netCoin.toFixed(isCrypto ? 8 : 2)} ${currentWallet.symbol}`
                : i18n("pages.withdrawal.enterAmountToPreview")}
            </span>
          </div>
          {!belowFee && isCrypto && amountNum !== null && (
            <div className="pc-mine__receive-row pc-mine__receive-row--sub">
              <span>{i18n("estore.pc.withdrawal.deductedFromBalance")}</span>
              <span>
                {ratesLoading && !rates
                  ? i18n("pages.withdrawal.fetchingRate")
                  : grossUsd !== null
                  ? `≈ $${grossUsd.toFixed(2)}`
                  : i18n("pages.withdrawal.rateUnavailable")}
              </span>
            </div>
          )}
        </div>

        <label className="pc-mine__field-label pc-mine__field-label--sp">
          {i18n("pages.withdrawal.withdrawalPassword")}
        </label>
        <input
          type="password"
          className="pc-input"
          placeholder={i18n("pages.withdrawal.passwordPlaceholder")}
          value={withdrawPassword}
          onChange={(event) => setWithdrawPassword(event.target.value)}
        />

        <div className="pc-mine__balance-line">
          {i18n("pages.withdrawal.availableBalance")}: <b>${balance}</b>
        </div>

        <div className="pc-mine__notice">
          <p>{i18n("pages.withdrawal.notice1")}</p>
          <p>{i18n("pages.withdrawal.notice2")}</p>
        </div>

        <button
          className="pc-btn pc-btn-primary pc-mine__deposit-submit"
          disabled={saveLoading || belowFee}
          onClick={doSubmit}
        >
          {i18n("pages.withdrawal.submit")}
        </button>
      </div>

      <style>{sharedMineStyles}</style>
      <style>{depositWithdrawalStyles}</style>
      <style>{`
        .pc-mine__withdraw-panel {
          padding: 28px;
          max-width: 520px;
        }

        .pc-mine__withdraw-panel select,
        .pc-mine__withdraw-panel input {
          margin-bottom: 4px;
        }

        .pc-mine__info-row {
          display: flex;
          justify-content: space-between;
          font-size: 13px;
          color: var(--pc-text-secondary);
          padding: 10px 0 18px;
        }

        .pc-mine__receive-summary {
          background: var(--pc-secondary);
          border-radius: var(--pc-radius-sm);
          padding: 14px 16px;
          margin: 16px 0 4px;
        }

        .pc-mine__receive-summary.danger {
          background: #FCE9E9;
        }

        .pc-mine__receive-row {
          display: flex;
          justify-content: space-between;
          font-size: 13px;
          font-weight: 700;
          color: var(--pc-text);
        }

        .pc-mine__receive-row--sub {
          font-weight: 400;
          font-size: 12px;
          color: var(--pc-text-muted);
          margin-top: 6px;
        }

        .pc-mine__balance-line {
          font-size: 13px;
          color: var(--pc-text-secondary);
          margin: 16px 0 12px;
        }

        .pc-mine__notice {
          font-size: 11.5px;
          color: var(--pc-text-muted);
          line-height: 1.6;
          margin-bottom: 20px;
        }

        .pc-mine__notice p {
          margin: 0 0 4px;
        }
      `}</style>
    </MineShell>
  );
}

export default Withdrawal;
