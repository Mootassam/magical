import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { i18n } from 'src/i18n';
import authActions from 'src/modules/auth/authActions';
import authSelectors from 'src/modules/auth/authSelectors';
import layoutActions from 'src/modules/layout/layoutActions';
import { getHistory } from 'src/modules/store';
import I18nSelect from 'src/view/layout/I18nSelect';
import HeaderWrapper from 'src/view/layout/styles/HeaderWrapper';
import Avatar from 'src/view/shared/Avatar';
import config from 'src/config';
import { Link } from 'react-router-dom';
import userSelectors from 'src/modules/user/userSelectors';
import adminPendingCountsActions from 'src/modules/adminPendingCounts/adminPendingCountsActions';
import adminPendingCountsSelectors from 'src/modules/adminPendingCounts/adminPendingCountsSelectors';

function Header(props) {
  const dispatch = useDispatch();

  const pendingCounts = useSelector(
    adminPendingCountsSelectors.selectCounts,
  );

  useEffect(() => {
    dispatch(adminPendingCountsActions.doInit());
  }, [dispatch]);

  const doToggleMenu = () => {
    dispatch(layoutActions.doToggleMenu());
  };

  const userText = useSelector(
    authSelectors.selectCurrentUserNameOrEmailPrefix,
  );
  const userAvatar = useSelector(
    authSelectors.selectCurrentUserAvatar,
  );
  const currentTenant = useSelector(
    authSelectors.selectCurrentTenant,
  );

  const doSignout = () => {
    dispatch(authActions.doSignout());
  };

  const doNavigateToProfile = () => {
    getHistory().push('/profile');
  };
  const doNavigateToAuditLog = () => {
    getHistory().push('/audit-logs');
  };
  const doNavigateToSettings = () => {
    getHistory().push('/settings');
  };

  const doNavigateToPasswordChange = () => {
    getHistory().push('/password-change');
  };

  const doNavigateToTenants = () => {
    getHistory().push('/tenant');
  };

  const hasPermissionToEdit = useSelector(
    userSelectors.selectPermissionToAgent,
  );

  return (
    <HeaderWrapper className="navbar sticky-top navbar-light bg-white border-bottom">
      <button
        type="button"
        onClick={doToggleMenu}
        className="menu-toggle-button"
      >
        <i className="fas fa-bars" />
      </button>
      {hasPermissionToEdit && (
        <div className="menu-links">
          <Link to="/customer">My Customer</Link>
          <Link to="/transaction">Transaction</Link>
          <Link to="/record">Records</Link>
          <Link to="/product">Products</Link>
        </div>)}

      <div className="pending-badges">
        {[
          { key: 'deposit', label: 'Deposit', path: '/transaction/deposit' },
          { key: 'withdraw', label: 'Withdraw', path: '/transaction/withdraw' },
          { key: 'store', label: 'Store', path: '/store' },
          { key: 'orderShipment', label: 'Order Shipments', path: '/order-shipment' },
        ].map((item) => {
          const count = pendingCounts[item.key] || 0;

          return (
            <button
              key={item.key}
              type="button"
              className={`pending-badge${count > 0 ? ' has-pending' : ''}`}
              onClick={() => getHistory().push(item.path)}
            >
              <span className="pending-badge-label">{item.label}</span>
              <span className="pending-badge-count">{count}</span>
            </button>
          );
        })}
      </div>

      <div>

        <div className="dropdown">
          <span
            className="user-dropdown"
            data-toggle="dropdown"
          >
            <div className="user-dropdown-content">
              <span className="user-dropdown-avatar">
                <Avatar
                  size="small"
                  src={userAvatar || undefined}
                  alt="avatar"
                />
              </span>
              <span className="user-dropdown-text">
                <span>{userText}</span>
                {['multi', 'multi-with-subdomain'].includes(
                  config.tenantMode,
                ) && (
                    <span className="user-dropdown-text-tenant">
                      {currentTenant && currentTenant.name}
                    </span>
                  )}
              </span>
            </div>
          </span>


          <div className="dropdown-menu dropdown-menu-right">
            <button
              onClick={doNavigateToProfile}
              className="dropdown-item"
              type="button"
            >
              <i className="fas fa-user" />
              {i18n('auth.profile.title')}
            </button>
            <button
              onClick={doNavigateToPasswordChange}
              className="dropdown-item"
              type="button"
            >
              <i className="fas fa-lock" />
              {i18n('auth.passwordChange.title')}
            </button>
            {['multi', 'multi-with-subdomain'].includes(
              config.tenantMode,
            ) && (
                <button
                  onClick={doNavigateToTenants}
                  className="dropdown-item"
                  type="button"
                >
                  <i className="fas fa-th-large" />
                  {i18n('auth.tenants')}
                </button>
              )}

            {/* <button
              onClick={doNavigateToSettings}
              className="dropdown-item"
              type="button"
            >
              <i className="fas fa-wrench" />
              {i18n('settings.menu')}
            </button> */}

            <button
              onClick={doNavigateToAuditLog}
              className="dropdown-item"
              type="button"
            >
              <i className="fas fa-book" />
              {i18n('auditLog.menu')}
            </button>

            <button
              onClick={doSignout}
              className="dropdown-item"
              type="button"
            >
              <i className="fas fa-sign-out-alt" />
              {i18n('auth.signout')}
            </button>
          </div>
        </div>
      </div>

      <style>{`
  .menu-links {
    display: flex;
    gap: 25px;
    align-items: center;
    margin-left: 30px;
  }

  .menu-links a {
    text-decoration: none;
    font-size: 15px;
    font-weight: 500;
    color: #444;
    padding: 8px 12px;
    border-radius: 8px;
    transition: all 0.25s ease;
  }

  .menu-links a:hover {
    background-color: #e9f2ff;
    color: #1677ff;
  }

  .menu-links a:active {
    transform: scale(0.95);
  }

  .pending-badges {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-left: auto;
    margin-right: 16px;
    flex-wrap: wrap;
  }

  .pending-badge {
    display: flex;
    align-items: center;
    gap: 7px;
    border: 1px solid #e2e8f0;
    background: #f8fafc;
    color: #475569;
    border-radius: 20px;
    padding: 6px 8px 6px 14px;
    font-size: 12.5px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .pending-badge:hover {
    background: #eef2fa;
    transform: translateY(-1px);
  }

  .pending-badge-count {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 22px;
    height: 22px;
    padding: 0 6px;
    border-radius: 11px;
    background: #cbd5e1;
    color: #fff;
    font-size: 11.5px;
    font-weight: 700;
    transition: background-color 0.2s ease;
  }

  .pending-badge.has-pending {
    border-color: #fecaca;
    background: #fef2f2;
    color: #b91c1c;
  }

  .pending-badge.has-pending .pending-badge-count {
    background: linear-gradient(135deg, #f56565 0%, #e53e3e 100%);
    animation: pendingPulse 1.8s ease-in-out infinite;
  }

  @keyframes pendingPulse {
    0%, 100% { box-shadow: 0 0 0 0 rgba(229,62,62,0.35); }
    50% { box-shadow: 0 0 0 5px rgba(229,62,62,0); }
  }

  @media (max-width: 900px) {
    .pending-badges {
      margin-left: 12px;
    }
    .pending-badge-label {
      display: none;
    }
    .pending-badge {
      padding: 6px 8px;
    }
  }
`}</style>
    </HeaderWrapper>
  );
}

export default Header;
