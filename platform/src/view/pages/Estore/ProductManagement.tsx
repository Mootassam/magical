import React from "react";

function ProductManagement() {
  return (
    <>
      <div className="phone">

        <div className="page-header">
          <div className="left">
            <button className="back-btn" onClick={() => window.history.back()}>←</button>
            <span className="page-title">Product Management</span>
          </div>
          <button className="add-btn">＋</button>
        </div>

        <div className="toolbar">
          <div className="search-row">
            <span className="search-icon">🔍</span>
            <input type="text" placeholder="Search products..." />
          </div>
          <div className="cat-scroll">
            <div className="cat-chip active">All</div>
            <div className="cat-chip">Men Shoes</div>
            <div className="cat-chip">Women Makeup</div>
            <div className="cat-chip">Women Bags</div>
            <div className="cat-chip">Men Clothing</div>
            <div className="cat-chip">Accessories</div>
          </div>
        </div>

        <div className="scroll-area">

          <div className="result-count">Showing <b>8</b> of <b>554</b> products</div>

          <div className="prod-row">
            <div className="prod-thumb"><img src="https://loremflickr.com/150/150/loafers,shoes/all?lock=401" alt="Maison Margiela Tabi Slip-On Loafer" /></div>
            <div className="prod-body">
              <div className="prod-name">Maison Margiela Tabi Slip-On Loafer</div>
              <div className="prod-cat">Men Shoes</div>
              <div className="price-row">
                <div className="price-block"><span className="price-lbl">Purchase</span><span className="price-val">$1053.37</span></div>
                <div className="price-block"><span className="price-lbl">Sales</span><span className="price-val">$1316.71</span></div>
                <div className="stock-block" style={{ marginLeft: 'auto' }}><span className="stock-lbl">Stock</span><span className="stock-val">50</span></div>
              </div>
            </div>
          </div>

          <div className="prod-row">
            <div className="prod-thumb"><img src="https://loremflickr.com/150/150/sneakers,menshoes/all?lock=402" alt="Maison Mihara Yasuhiro Keith OG Sole" /></div>
            <div className="prod-body">
              <div className="prod-name">Maison Mihara Yasuhiro Keith OG Sole</div>
              <div className="prod-cat">Men Shoes</div>
              <div className="price-row">
                <div className="price-block"><span className="price-lbl">Purchase</span><span className="price-val">$1256.94</span></div>
                <div className="price-block"><span className="price-lbl">Sales</span><span className="price-val">$1571.18</span></div>
                <div className="stock-block" style={{ marginLeft: 'auto' }}><span className="stock-lbl">Stock</span><span className="stock-val">50</span></div>
              </div>
            </div>
          </div>

          <div className="prod-row">
            <div className="prod-thumb"><img src="https://loremflickr.com/150/150/boots,leathershoes/all?lock=403" alt="Thom Browne Wingtip Almond Toe Boot" /></div>
            <div className="prod-body">
              <div className="prod-name">Thom Browne Wingtip Almond Toe Boot</div>
              <div className="prod-cat">Men Shoes</div>
              <div className="price-row">
                <div className="price-block"><span className="price-lbl">Purchase</span><span className="price-val">$1066.10</span></div>
                <div className="price-block"><span className="price-lbl">Sales</span><span className="price-val">$1332.63</span></div>
                <div className="stock-block" style={{ marginLeft: 'auto' }}><span className="stock-lbl">Stock</span><span className="stock-val">50</span></div>
              </div>
            </div>
          </div>

          <div className="prod-row">
            <div className="prod-thumb"><img src="https://loremflickr.com/150/150/makeup,cosmetics/all?lock=404" alt="Facial makeup pack" /></div>
            <div className="prod-body">
              <div className="prod-name">Facial Makeup Pack</div>
              <div className="prod-cat">Women Makeup</div>
              <div className="price-row">
                <div className="price-block"><span className="price-lbl">Purchase</span><span className="price-val">$179.00</span></div>
                <div className="price-block"><span className="price-lbl">Sales</span><span className="price-val">$223.75</span></div>
                <div className="stock-block" style={{ marginLeft: 'auto' }}><span className="stock-lbl">Stock</span><span className="stock-val">50</span></div>
              </div>
            </div>
          </div>

          <div className="prod-row">
            <div className="prod-thumb"><img src="https://loremflickr.com/150/150/lipstick,beauty/all?lock=405" alt="SHISEIDO Ultimune Power Infusing" /></div>
            <div className="prod-body">
              <div className="prod-name">SHISEIDO Ultimune Power Infusing S...</div>
              <div className="prod-cat">Women Makeup</div>
              <div className="price-row">
                <div className="price-block"><span className="price-lbl">Purchase</span><span className="price-val">$199.00</span></div>
                <div className="price-block"><span className="price-lbl">Sales</span><span className="price-val">$248.75</span></div>
                <div className="stock-block" style={{ marginLeft: 'auto' }}><span className="stock-lbl">Stock</span><span className="stock-val">50</span></div>
              </div>
            </div>
          </div>

          <div className="prod-row">
            <div className="prod-thumb"><img src="https://loremflickr.com/150/150/serum,skincare/all?lock=406" alt="Shiseido Ultimune Power Infusing Concentrate" /></div>
            <div className="prod-body">
              <div className="prod-name">Shiseido Ultimune Power Infusing Co...</div>
              <div className="prod-cat">Women Makeup</div>
              <div className="price-row">
                <div className="price-block"><span className="price-lbl">Purchase</span><span className="price-val">$249.00</span></div>
                <div className="price-block"><span className="price-lbl">Sales</span><span className="price-val">$311.25</span></div>
                <div className="stock-block" style={{ marginLeft: 'auto' }}><span className="stock-lbl">Stock</span><span className="stock-val">50</span></div>
              </div>
            </div>
          </div>

          <div className="prod-row">
            <div className="prod-thumb"><img src="https://loremflickr.com/150/150/eyebrowkit,makeup/all?lock=407" alt="2in1 Eyebrow Stamp powder + Gel" /></div>
            <div className="prod-body">
              <div className="prod-name">2in1 Eyebrow Stamp Powder + Gel Ey...</div>
              <div className="prod-cat">Women Makeup</div>
              <div className="price-row">
                <div className="price-block"><span className="price-lbl">Purchase</span><span className="price-val">$437.00</span></div>
                <div className="price-block"><span className="price-lbl">Sales</span><span className="price-val">$546.25</span></div>
                <div className="stock-block" style={{ marginLeft: 'auto' }}><span className="stock-lbl">Stock</span><span className="stock-val">50</span></div>
              </div>
            </div>
          </div>

          <div className="prod-row">
            <div className="prod-thumb"><img src="https://loremflickr.com/150/150/handbag,designerbag/all?lock=408" alt="Burberry Check Printed Buckle-Detail bag" /></div>
            <div className="prod-body">
              <div className="prod-name">Burberry Check Printed Buckle-Deta...</div>
              <div className="prod-cat">Women Bags</div>
              <div className="price-row">
                <div className="price-block"><span className="price-lbl">Purchase</span><span className="price-val">$149.00</span></div>
                <div className="price-block"><span className="price-lbl">Sales</span><span className="price-val">$186.25</span></div>
                <div className="stock-block" style={{ marginLeft: 'auto' }}><span className="stock-lbl">Stock</span><span className="stock-val">50</span></div>
              </div>
            </div>
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
          --red:#ff3b30;
          --green:#12b886;
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
        .add-btn{
          width:34px; height:34px;
          border-radius:10px;
          background:rgba(255,255,255,0.2);
          display:flex; align-items:center; justify-content:center;
          font-size:18px;
          color:#fff;
          border:none;
          cursor:pointer;
        }

        /* ---------- Search + filter bar ---------- */
        .toolbar{
          background:#fff;
          flex-shrink:0;
          box-shadow:0 4px 12px rgba(20,40,100,0.05);
          padding:12px 14px;
        }
        .search-row{
          display:flex;
          align-items:center;
          gap:8px;
          background:var(--grey-light);
          border-radius:12px;
          padding:10px 12px;
        }
        .search-row input{
          border:none; outline:none; flex:1; background:transparent;
          font-size:13.5px; color:var(--navy);
        }
        .search-row input::placeholder{ color:#9aa4c0; }
        .search-icon{ color:var(--grey-text); font-size:14px; }

        .cat-scroll{
          display:flex;
          gap:6px;
          overflow-x:auto;
          scrollbar-width:none;
          margin-top:10px;
        }
        .cat-scroll::-webkit-scrollbar{ display:none; }
        .cat-chip{
          flex:0 0 auto;
          font-size:11.5px;
          font-weight:600;
          color:var(--grey-text);
          background:var(--grey-light);
          padding:6px 12px;
          border-radius:14px;
          white-space:nowrap;
        }
        .cat-chip.active{
          background:linear-gradient(135deg, var(--blue-bright), var(--blue-deep));
          color:#fff;
        }

        /* ---------- Scroll body ---------- */
        .scroll-area{
          flex:1;
          overflow-y:auto;
          scrollbar-width:none;
          padding:12px 14px 24px;
        }
        .scroll-area::-webkit-scrollbar{ display:none; }

        .result-count{
          font-size:11.5px;
          color:var(--grey-text);
          margin-bottom:10px;
        }
        .result-count b{ color:var(--navy); }

        .prod-row{
          display:flex;
          gap:12px;
          background:var(--card-bg);
          border-radius:14px;
          box-shadow:0 8px 18px rgba(20,40,100,0.06);
          padding:12px;
          margin-bottom:10px;
          align-items:center;
        }
        .prod-thumb{
          width:58px; height:58px;
          border-radius:10px;
          overflow:hidden;
          flex-shrink:0;
          background:#f3f6fc;
        }
        .prod-thumb img{ width:100%; height:100%; object-fit:cover; }

        .prod-body{ flex:1; min-width:0; }
        .prod-name{
          font-size:12.5px;
          font-weight:700;
          color:var(--navy);
          white-space:nowrap;
          overflow:hidden;
          text-overflow:ellipsis;
        }
        .prod-cat{
          font-size:10.5px;
          color:var(--grey-text);
          margin-top:3px;
        }
        .price-row{
          display:flex;
          gap:10px;
          margin-top:6px;
          align-items:baseline;
        }
        .price-block{ display:flex; flex-direction:column; }
        .price-lbl{ font-size:8.5px; color:#a6afc8; text-transform:uppercase; letter-spacing:0.3px; }
        .price-val{ font-size:12px; font-weight:800; color:var(--red); }
        .stock-block{ display:flex; flex-direction:column; align-items:flex-end; }
        .stock-lbl{ font-size:8.5px; color:#a6afc8; text-transform:uppercase; }
        .stock-val{ font-size:12px; font-weight:700; color:var(--green); }
      `}</style>
    </>
  );
}

export default ProductManagement;
