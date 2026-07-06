import React from "react";

function WholesaleManagement() {
  return (
    <>
      <div className="phone">

        <div className="page-header">
          <button className="back-btn" onClick={() => window.history.back()}>←</button>
          <span className="page-title">Wholesale Management</span>
        </div>

        <div className="tabs-wrap">
          <div className="tabs-scroll">
            <div className="tab-chip active">All</div>
            <div className="tab-chip">Lifestyle</div>
            <div className="tab-chip">Men Shoes</div>
            <div className="tab-chip">Women Shoes</div>
            <div className="tab-chip">Accessories</div>
            <div className="tab-chip">Men Clothing</div>
            <div className="tab-chip">Women Bags</div>
            <div className="tab-chip">Men Bags</div>
            <div className="tab-chip">Women Clothing</div>
            <div className="tab-chip">Girls</div>
            <div className="tab-chip">Boys</div>
          </div>
          <div className="filter-row">
            <input type="text" className="price-input" placeholder="Lowest Price" />
            <span className="dash">–</span>
            <input type="text" className="price-input" placeholder="Highest Price" />
            <button className="filter-btn">Filter</button>
          </div>
        </div>

        <div className="scroll-area">

          <div className="result-count">Showing <b>128</b> items in Accessories</div>

          <div className="grid">
            <div className="prod-card">
              <div className="prod-thumb"><img src="https://loremflickr.com/300/300/luxurywatch/all?lock=301" alt="Land-Dweller 40 watch" /></div>
              <div className="prod-info">
                <div className="prod-name">Land-Dweller 40</div>
                <div className="prod-bottom">
                  <span className="prod-price">$17,400.00</span>
                  <button className="add-store-btn">＋</button>
                </div>
              </div>
            </div>

            <div className="prod-card">
              <div className="prod-thumb"><img src="https://loremflickr.com/300/300/necklace,gold/all?lock=302" alt="Long necklace" /></div>
              <div className="prod-info">
                <div className="prod-name">Long Necklace White Gold</div>
                <div className="prod-bottom">
                  <span className="prod-price">$35,090.00</span>
                  <button className="add-store-btn">＋</button>
                </div>
              </div>
            </div>

            <div className="prod-card">
              <div className="prod-thumb"><img src="https://loremflickr.com/300/300/diamond,necklace/all?lock=303" alt="Diamond necklace" /></div>
              <div className="prod-info">
                <div className="prod-name">Pink Gold Diamond Necklace</div>
                <div className="prod-bottom">
                  <span className="prod-price">$15,530.00</span>
                  <button className="add-store-btn">＋</button>
                </div>
              </div>
            </div>

            <div className="prod-card">
              <div className="prod-thumb"><img src="https://loremflickr.com/300/300/earrings,jewelry/all?lock=304" alt="Pendant earrings" /></div>
              <div className="prod-info">
                <div className="prod-name">Pendant Earrings White Gold</div>
                <div className="prod-bottom">
                  <span className="prod-price">$3,810.00</span>
                  <button className="add-store-btn">＋</button>
                </div>
              </div>
            </div>

            <div className="prod-card">
              <div className="prod-thumb"><img src="https://loremflickr.com/300/300/bracelet,silver/all?lock=305" alt="Ankle bracelet" /></div>
              <div className="prod-info">
                <div className="prod-name">Ankle Bracelet Pavé Silver</div>
                <div className="prod-bottom">
                  <span className="prod-price">$3,470.00</span>
                  <button className="add-store-btn">＋</button>
                </div>
              </div>
            </div>

            <div className="prod-card">
              <div className="prod-thumb"><img src="https://loremflickr.com/300/300/bracelet,gold/all?lock=306" alt="Pink gold bracelet" /></div>
              <div className="prod-info">
                <div className="prod-name">Ankle Bracelet Pink Gold</div>
                <div className="prod-bottom">
                  <span className="prod-price">$2,690.00</span>
                  <button className="add-store-btn">＋</button>
                </div>
              </div>
            </div>

            <div className="prod-card">
              <div className="prod-thumb"><img src="https://loremflickr.com/300/300/hoopearrings/all?lock=307" alt="Large hoop earrings" /></div>
              <div className="prod-info">
                <div className="prod-name">Large Hoop Earrings Gold</div>
                <div className="prod-bottom">
                  <span className="prod-price">$7,020.00</span>
                  <button className="add-store-btn">＋</button>
                </div>
              </div>
            </div>

            <div className="prod-card">
              <div className="prod-thumb"><img src="https://loremflickr.com/300/300/silverearrings/all?lock=308" alt="Small hoop earrings" /></div>
              <div className="prod-info">
                <div className="prod-name">Small Hoop Earrings Silver</div>
                <div className="prod-bottom">
                  <span className="prod-price">$3,810.00</span>
                  <button className="add-store-btn">＋</button>
                </div>
              </div>
            </div>

            <div className="prod-card">
              <div className="prod-thumb"><img src="https://loremflickr.com/300/300/goldring/all?lock=309" alt="Double yellow gold ring" /></div>
              <div className="prod-info">
                <div className="prod-name">Double Yellow Gold Diamond Ring</div>
                <div className="prod-bottom">
                  <span className="prod-price">$7,870.00</span>
                  <button className="add-store-btn">＋</button>
                </div>
              </div>
            </div>

            <div className="prod-card">
              <div className="prod-thumb"><img src="https://loremflickr.com/300/300/whitegoldnecklace/all?lock=310" alt="White gold necklace rows" /></div>
              <div className="prod-info">
                <div className="prod-name">2 Rows White Gold Necklace</div>
                <div className="prod-bottom">
                  <span className="prod-price">$4,060.00</span>
                  <button className="add-store-btn">＋</button>
                </div>
              </div>
            </div>

            <div className="prod-card">
              <div className="prod-thumb"><img src="https://loremflickr.com/300/300/pinkgoldbracelet/all?lock=311" alt="Hand bracelet pink gold" /></div>
              <div className="prod-info">
                <div className="prod-name">Hand Bracelet Pink Gold</div>
                <div className="prod-bottom">
                  <span className="prod-price">$3,670.00</span>
                  <button className="add-store-btn">＋</button>
                </div>
              </div>
            </div>

            <div className="prod-card">
              <div className="prod-thumb"><img src="https://loremflickr.com/300/300/monoearring/all?lock=312" alt="Pavé mono earring" /></div>
              <div className="prod-info">
                <div className="prod-name">Pavé Mono Earring White Gold</div>
                <div className="prod-bottom">
                  <span className="prod-price">$1,600.00</span>
                  <button className="add-store-btn">＋</button>
                </div>
              </div>
            </div>
          </div>

        </div>

        <div className="assistant-fab">💬</div>

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
          --red:#ff3b30;
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

        /* ---------- Category tabs ---------- */
        .tabs-wrap{
          background:#fff;
          flex-shrink:0;
          box-shadow:0 4px 12px rgba(20,40,100,0.05);
        }
        .tabs-scroll{
          display:flex;
          gap:6px;
          overflow-x:auto;
          scrollbar-width:none;
          padding:12px 12px 10px;
        }
        .tabs-scroll::-webkit-scrollbar{ display:none; }
        .tab-chip{
          flex:0 0 auto;
          font-size:12px;
          font-weight:600;
          color:var(--grey-text);
          padding:7px 13px;
          border-radius:16px;
          white-space:nowrap;
        }
        .tab-chip.active{
          background:linear-gradient(135deg, var(--blue-bright), var(--blue-deep));
          color:#fff;
          font-weight:700;
        }

        /* ---------- Price filter ---------- */
        .filter-row{
          display:flex;
          align-items:center;
          gap:8px;
          padding:0 12px 12px;
        }
        .price-input{
          flex:1;
          min-width:0;
          border:1.4px solid var(--field-border);
          border-radius:10px;
          padding:9px 10px;
          font-size:12px;
          color:var(--navy);
          outline:none;
        }
        .price-input::placeholder{ color:#a9b3cf; }
        .dash{ color:var(--grey-text); font-size:12px; }
        .filter-btn{
          flex-shrink:0;
          background:linear-gradient(135deg, var(--blue-bright), var(--blue-deep));
          color:#fff;
          font-size:12px;
          font-weight:700;
          border:none;
          border-radius:10px;
          padding:9px 16px;
          box-shadow:0 6px 14px rgba(47,141,255,0.35);
        }

        /* ---------- Scroll body / grid ---------- */
        .scroll-area{
          flex:1;
          overflow-y:auto;
          scrollbar-width:none;
          padding:14px 12px 30px;
          position:relative;
        }
        .scroll-area::-webkit-scrollbar{ display:none; }

        .result-count{
          font-size:11.5px;
          color:var(--grey-text);
          margin-bottom:10px;
        }
        .result-count b{ color:var(--navy); }

        .grid{
          display:grid;
          grid-template-columns:1fr 1fr;
          gap:12px;
        }
        .prod-card{
          background:var(--card-bg);
          border-radius:14px;
          overflow:hidden;
          box-shadow:0 8px 18px rgba(20,40,100,0.07);
        }
        .prod-thumb{ width:100%; height:130px; background:#f6f8fd; }
        .prod-thumb img{ width:100%; height:100%; object-fit:cover; }
        .prod-info{ padding:10px 10px 12px; }
        .prod-name{
          font-size:12px;
          font-weight:700;
          color:var(--navy);
          line-height:1.35;
          display:-webkit-box;
          -webkit-line-clamp:1;
          -webkit-box-orient:vertical;
          overflow:hidden;
        }
        .prod-bottom{
          display:flex;
          justify-content:space-between;
          align-items:center;
          margin-top:9px;
        }
        .prod-price{ font-size:13.5px; font-weight:800; color:var(--red); }
        .add-store-btn{
          width:30px; height:30px;
          border-radius:9px;
          border:1.4px solid var(--blue-bright);
          background:#eef5ff;
          color:var(--blue-mid);
          display:flex; align-items:center; justify-content:center;
          font-size:14px;
          cursor:pointer;
          flex-shrink:0;
        }

        /* ---------- Assistant floating button ---------- */
        .assistant-fab{
          position:absolute;
          right:16px; bottom:20px;
          width:50px; height:50px; border-radius:50%;
          background:linear-gradient(135deg, var(--blue-bright), var(--blue-deep));
          display:flex; align-items:center; justify-content:center;
          color:#fff; font-size:20px;
          box-shadow:0 10px 24px rgba(47,141,255,0.45);
          z-index:15;
        }
      `}</style>
    </>
  );
}

export default WholesaleManagement;
