import React from "react";
import { Link } from "react-router-dom";
import { i18n } from "../../../i18n";
import useIsDesktop from "src/view/shared/hooks/useIsDesktop";

type ErrorPageProps = {
  code: "403" | "404" | "500";
  icon: string;
};

function ErrorPage({ code, icon }: ErrorPageProps) {
  const isDesktop = useIsDesktop();
  const homePath = isDesktop ? "/pc" : "/";
  const shopPath = isDesktop ? "/pc/classification" : "/classification";

  return (
    <>
      <div className="error-page">
        <div className="error-page__card">
          <div className="error-page__badge">
            <span className="error-page__badge-icon">{icon}</span>
            <span className="error-page__badge-code">{code}</span>
          </div>

          <h1 className="error-page__title">{i18n(`errors.title${code}`)}</h1>
          <p className="error-page__desc">{i18n(`errors.${code}`)}</p>

          <div className="error-page__actions">
            <Link to={homePath} className="error-page__btn error-page__btn--primary">
              {i18n("errors.backToHome")}
            </Link>
            <Link to={shopPath} className="error-page__btn error-page__btn--outline">
              {i18n("errors.continueShopping")}
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        .error-page {
          min-height: 100dvh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          font-family: 'Segoe UI', Roboto, Arial, sans-serif;
          background: radial-gradient(circle at 30% 15%, #F3E4DC 0%, #FAFAFA 55%, #E7E7E7 100%);
        }

        @keyframes errorCardIn {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .error-page__card {
          width: 100%;
          max-width: 440px;
          background: #FFFFFF;
          border: 1px solid #E7E7E7;
          border-radius: 24px;
          padding: 44px 32px 36px;
          text-align: center;
          box-shadow: 0 24px 60px rgba(127, 43, 21, 0.12);
          animation: errorCardIn 0.5s ease both;
        }

        .error-page__badge {
          position: relative;
          width: 132px;
          height: 132px;
          margin: 0 auto 26px;
          border-radius: 50%;
          background: linear-gradient(150deg, #D1451F, #7F2B15);
          box-shadow: 0 14px 30px rgba(209, 69, 31, 0.35);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .error-page__badge-icon {
          font-size: 52px;
          line-height: 1;
        }

        .error-page__badge-code {
          position: absolute;
          bottom: -10px;
          left: 50%;
          transform: translateX(-50%);
          background: #111111;
          color: #FFFFFF;
          font-size: 13px;
          font-weight: 800;
          letter-spacing: 1px;
          padding: 5px 14px;
          border-radius: 999px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.25);
        }

        .error-page__title {
          font-size: 24px;
          font-weight: 800;
          color: #111111;
          margin: 8px 0 10px;
        }

        .error-page__desc {
          font-size: 14.5px;
          line-height: 1.6;
          color: #555555;
          margin: 0 0 30px;
        }

        .error-page__actions {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .error-page__btn {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 14px 20px;
          border-radius: 14px;
          font-size: 14.5px;
          font-weight: 700;
          text-decoration: none;
          transition: transform 0.15s ease, box-shadow 0.15s ease, background-color 0.15s ease;
        }

        .error-page__btn--primary {
          background: linear-gradient(135deg, #D1451F, #B93C1A);
          color: #FFFFFF;
          box-shadow: 0 10px 25px rgba(209, 69, 31, 0.35);
        }

        .error-page__btn--primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 14px 30px rgba(209, 69, 31, 0.45);
        }

        .error-page__btn--outline {
          background: #FAFAFA;
          color: #111111;
          border: 1px solid #E7E7E7;
        }

        .error-page__btn--outline:hover {
          background: #F0F0F0;
        }

        @media (min-width: 480px) {
          .error-page__actions {
            flex-direction: row;
          }
          .error-page__btn {
            flex: 1;
          }
        }
      `}</style>
    </>
  );
}

export default ErrorPage;
