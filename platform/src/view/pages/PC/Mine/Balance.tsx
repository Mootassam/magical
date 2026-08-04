import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import authSelectors from "src/modules/auth/authSelectors";
import MineShell from "./MineShell";
import { sharedMineStyles } from "./MyAccount";

function Balance() {
  const currentUser = useSelector(authSelectors.selectCurrentUser);
  const [hidden, setHidden] = useState(false);

  const totalBalance = currentUser?.balance || 0;
  const frozenBalance = currentUser?.freezeblance || 0;
  const availableBalance = totalBalance - frozenBalance;

  const format = (value) => (hidden ? "••••••" : `$${value.toFixed(2)}`);

  return (
    <MineShell active="balance">
      <h1 className="pc-mine__page-title">Balance</h1>

      <div className="pc-card pc-mine__balance-card">
        <div className="pc-mine__balance-head">
          <span>Total Balance</span>
          <button type="button" className="pc-mine__eye-toggle" onClick={() => setHidden(!hidden)}>
            {hidden ? "🙈" : "👁"}
          </button>
        </div>

        <div className="pc-mine__balance-split">
          <div>
            <div className="pc-mine__balance-label">Account Balance</div>
            <div className="pc-mine__balance-value">{format(totalBalance)}</div>
          </div>
          <div>
            <div className="pc-mine__balance-label">Available Balance</div>
            <div className="pc-mine__balance-value">{format(availableBalance)}</div>
          </div>
        </div>

        <div className="pc-mine__balance-actions">
          <Link to="/pc/mine/deposit" className="pc-btn pc-btn-primary">⬆ Deposit</Link>
          <Link to="/pc/mine/withdrawal" className="pc-btn pc-btn-outline pc-mine__balance-outline">⬇ Withdraw</Link>
        </div>
      </div>

      <div className="pc-mine__quick-grid">
        <Link to="/pc/mine/deposit-record" className="pc-card pc-mine__quick-item">
          <div className="pc-mine__quick-icon" style={{ background: "#E9F9EF" }}>🧾</div>
          <span>Deposit Record</span>
        </Link>
        <Link to="/pc/mine/withdrawal-record" className="pc-card pc-mine__quick-item">
          <div className="pc-mine__quick-icon" style={{ background: "#FEF5E7" }}>📤</div>
          <span>Withdrawal Record</span>
        </Link>
        <Link to="/pc/mine/payment-password" className="pc-card pc-mine__quick-item">
          <div className="pc-mine__quick-icon" style={{ background: "#E9EFFD" }}>🔒</div>
          <span>Payment Password</span>
        </Link>
      </div>

      <p className="pc-mine__hint">
        Available balance can be used for purchases and withdrawn to your linked wallet.
      </p>

      <style>{sharedMineStyles}</style>
      <style>{`
        .pc-mine__balance-card {
          padding: 28px;
          margin-bottom: 20px;
          background: linear-gradient(150deg, var(--pc-primary), var(--pc-primary-dark));
          color: #fff;
        }

        .pc-mine__balance-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 13.5px;
          font-weight: 700;
          opacity: 0.9;
          margin-bottom: 20px;
        }

        .pc-mine__eye-toggle {
          border: none;
          background: rgba(255, 255, 255, 0.15);
          width: 30px;
          height: 30px;
          border-radius: 50%;
          color: #fff;
          cursor: pointer;
          font-size: 13px;
        }

        .pc-mine__balance-split {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          margin-bottom: 24px;
        }

        .pc-mine__balance-label {
          font-size: 12px;
          opacity: 0.85;
          margin-bottom: 6px;
        }

        .pc-mine__balance-value {
          font-size: 24px;
          font-weight: 800;
        }

        .pc-mine__balance-actions {
          display: flex;
          gap: 12px;
          max-width: 320px;
        }

        .pc-mine__balance-actions .pc-btn {
          flex: 1;
        }

        .pc-mine__balance-outline {
          background: rgba(255, 255, 255, 0.12);
          border-color: rgba(255, 255, 255, 0.5);
          color: #fff;
        }

        .pc-mine__balance-outline:hover {
          background: rgba(255, 255, 255, 0.2) !important;
        }

        .pc-mine__quick-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 16px;
          margin-bottom: 20px;
        }

        .pc-mine__quick-item {
          padding: 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          text-align: center;
          font-size: 13px;
          font-weight: 600;
          color: var(--pc-text);
          transition: box-shadow 0.15s ease, transform 0.1s ease;
        }

        .pc-mine__quick-item:hover {
          box-shadow: 0 10px 22px var(--pc-shadow);
          transform: translateY(-2px);
        }

        .pc-mine__quick-icon {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
        }

        @media (max-width: 700px) {
          .pc-mine__quick-grid {
            grid-template-columns: 1fr 1fr;
          }
        }
      `}</style>
    </MineShell>
  );
}

export default Balance;
