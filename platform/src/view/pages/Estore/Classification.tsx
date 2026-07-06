import React from "react";

function Classification() {
  return (
    <>
      <div className="phone">

        <div className="page-header">
          <div className="page-title">Categories</div>
          <div className="search-row">
            <span className="search-icon">🔍</span>
            <input type="text" placeholder="Search in categories" />
          </div>
        </div>

        <div className="body-split">

          <div className="sidebar">
            <div className="side-item">
              <div className="thumb"><img src="https://loremflickr.com/100/100/clothing,fashion/all?lock=61" alt="Fashion" /></div>
              <span>Fashion</span>
            </div>
            <div className="side-item active">
              <div className="thumb"><img src="https://loremflickr.com/100/100/sneakers,shoes/all?lock=62" alt="Shoes" /></div>
              <span>Shoes</span>
            </div>
            <div className="side-item">
              <div className="thumb"><img src="https://loremflickr.com/100/100/handbag,purse/all?lock=63" alt="Bags" /></div>
              <span>Bags</span>
            </div>
            <div className="side-item">
              <div className="thumb"><img src="https://loremflickr.com/100/100/cosmetics,beauty/all?lock=64" alt="Beauty" /></div>
              <span>Beauty</span>
            </div>
            <div className="side-item">
              <div className="thumb"><img src="https://loremflickr.com/100/100/headphones,electronics/all?lock=65" alt="Electronics" /></div>
              <span>Electronics</span>
            </div>
            <div className="side-item">
              <div className="thumb"><img src="https://loremflickr.com/100/100/livingroom,home/all?lock=66" alt="Home" /></div>
              <span>Home</span>
            </div>
            <div className="side-item">
              <div className="thumb"><img src="https://loremflickr.com/100/100/kids,toys/all?lock=67" alt="Kids" /></div>
              <span>Kids</span>
            </div>
            <div className="side-item">
              <div className="thumb"><img src="https://loremflickr.com/100/100/sports,fitness/all?lock=68" alt="Sports" /></div>
              <span>Sports</span>
            </div>
          </div>

          <div className="content-panel">

            <div className="cat-banner">
              <img src="https://loremflickr.com/700/300/sneakers,shoes/all?lock=70" alt="Shoes banner" />
              <div className="overlay"></div>
              <div className="txt">
                <div className="eyebrow">Category Spotlight</div>
                <div className="name">Shoes</div>
                <div className="off">Up to 50% off</div>
              </div>
            </div>

            <div className="subcat-row">
              <div className="chip active">All</div>
              <div className="chip">Sneakers</div>
              <div className="chip">Sandals</div>
              <div className="chip">Boots</div>
              <div className="chip">Heels</div>
              <div className="chip">Sports</div>
            </div>

            <div className="grid">
              <div className="prod-card">
                <div className="prod-thumb">
                  <img src="https://loremflickr.com/300/300/sneakers,shoes/all?lock=71" alt="Runner sneakers" />
                  <span className="off-tag">-40%</span>
                </div>
                <div className="prod-info">
                  <div className="prod-name">Runner Sneakers</div>
                  <div className="prod-meta">⭐ 4.8 · 1.2k sold</div>
                  <div className="prod-price-row"><span className="prod-price">$48</span><button className="add-btn">+</button></div>
                </div>
              </div>
              <div className="prod-card">
                <div className="prod-thumb">
                  <img src="https://loremflickr.com/300/300/sandals,footwear/all?lock=72" alt="Summer sandals" />
                  <span className="badge">NEW</span>
                </div>
                <div className="prod-info">
                  <div className="prod-name">Summer Sandals</div>
                  <div className="prod-meta">⭐ 4.6 · 430 sold</div>
                  <div className="prod-price-row"><span className="prod-price">$22</span><button className="add-btn">+</button></div>
                </div>
              </div>
              <div className="prod-card">
                <div className="prod-thumb">
                  <img src="https://loremflickr.com/300/300/boots,leather/all?lock=73" alt="Leather boots" />
                </div>
                <div className="prod-info">
                  <div className="prod-name">Leather Boots</div>
                  <div className="prod-meta">⭐ 4.9 · 980 sold</div>
                  <div className="prod-price-row"><span className="prod-price">$74</span><button className="add-btn">+</button></div>
                </div>
              </div>
              <div className="prod-card">
                <div className="prod-thumb">
                  <img src="https://loremflickr.com/300/300/heels,shoes/all?lock=74" alt="Heels" />
                  <span className="off-tag">-25%</span>
                </div>
                <div className="prod-info">
                  <div className="prod-name">Classic Heels</div>
                  <div className="prod-meta">⭐ 4.5 · 210 sold</div>
                  <div className="prod-price-row"><span className="prod-price">$39</span><button className="add-btn">+</button></div>
                </div>
              </div>
              <div className="prod-card">
                <div className="prod-thumb">
                  <img src="https://loremflickr.com/300/300/running,shoes/all?lock=75" alt="Sport trainers" />
                </div>
                <div className="prod-info">
                  <div className="prod-name">Sport Trainers</div>
                  <div className="prod-meta">⭐ 4.7 · 1.5k sold</div>
                  <div className="prod-price-row"><span className="prod-price">$56</span><button className="add-btn">+</button></div>
                </div>
              </div>
              <div className="prod-card">
                <div className="prod-thumb">
                  <img src="https://loremflickr.com/300/300/slippers/all?lock=76" alt="Cozy slippers" />
                  <span className="badge">HOT</span>
                </div>
                <div className="prod-info">
                  <div className="prod-name">Cozy Slippers</div>
                  <div className="prod-meta">⭐ 4.4 · 640 sold</div>
                  <div className="prod-price-row"><span className="prod-price">$16</span><button className="add-btn">+</button></div>
                </div>
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
          --sidebar-bg:#eef2fb;
          --card-bg:#ffffff;
          --grey-text:#6b7590;
          --gold:#ffb020;
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

        /* ---------- Top header ---------- */
        .page-header{
          background:linear-gradient(135deg, var(--blue-deep), var(--blue-bright));
          padding:14px 18px 16px;
          color:#fff;
          flex-shrink:0;
        }
        .page-title{ font-size:19px; font-weight:800; margin-bottom:12px; }
        .search-row{
          display:flex;
          align-items:center;
          gap:10px;
          background:#fff;
          border-radius:14px;
          padding:10px 14px;
        }
        .search-row input{
          border:none; outline:none; flex:1;
          font-size:14px; color:var(--navy); background:transparent;
        }
        .search-row input::placeholder{ color:#9aa4c0; }
        .search-icon{ font-size:16px; color:var(--blue-mid); }

        /* ---------- Body split ---------- */
        .body-split{
          flex:1;
          display:flex;
          overflow:hidden;
        }

        /* Sidebar */
        .sidebar{
          width:96px;
          flex-shrink:0;
          background:var(--sidebar-bg);
          overflow-y:auto;
          scrollbar-width:none;
          padding-bottom:100px;
        }
        .sidebar::-webkit-scrollbar{ display:none; }

        .side-item{
          display:flex;
          flex-direction:column;
          align-items:center;
          gap:6px;
          padding:14px 6px;
          cursor:pointer;
          position:relative;
          color:var(--grey-text);
          font-size:11px;
          font-weight:600;
          text-align:center;
        }
        .side-item .thumb{
          width:44px; height:44px;
          border-radius:12px;
          overflow:hidden;
          border:2px solid transparent;
        }
        .side-item .thumb img{ width:100%; height:100%; object-fit:cover; }

        .side-item.active{
          background:var(--page-bg);
          color:var(--blue-deep);
        }
        .side-item.active::before{
          content:"";
          position:absolute; left:0; top:0; bottom:0;
          width:4px;
          background:linear-gradient(180deg, var(--blue-bright), var(--blue-deep));
          border-radius:0 4px 4px 0;
        }
        .side-item.active .thumb{ border-color:var(--blue-bright); }

        /* Content panel */
        .content-panel{
          flex:1;
          overflow-y:auto;
          scrollbar-width:none;
          padding:16px 14px 110px;
        }
        .content-panel::-webkit-scrollbar{ display:none; }

        .cat-banner{
          position:relative;
          border-radius:18px;
          overflow:hidden;
          height:100px;
          margin-bottom:16px;
          color:#fff;
        }
        .cat-banner img{
          position:absolute; inset:0; width:100%; height:100%; object-fit:cover;
        }
        .cat-banner .overlay{
          position:absolute; inset:0;
          background:linear-gradient(120deg, rgba(11,26,74,0.85), rgba(47,141,255,0.35));
        }
        .cat-banner .txt{
          position:relative;
          padding:14px 16px;
        }
        .cat-banner .eyebrow{ font-size:9px; letter-spacing:2px; text-transform:uppercase; opacity:0.85; }
        .cat-banner .name{ font-size:19px; font-weight:800; margin-top:2px; }
        .cat-banner .off{
          display:inline-block; margin-top:6px;
          background:var(--gold); color:var(--navy);
          font-size:10px; font-weight:800;
          padding:3px 9px; border-radius:8px;
        }

        .subcat-row{
          display:flex;
          gap:8px;
          overflow-x:auto;
          scrollbar-width:none;
          margin-bottom:16px;
        }
        .subcat-row::-webkit-scrollbar{ display:none; }
        .chip{
          flex:0 0 auto;
          font-size:12px;
          font-weight:600;
          padding:8px 14px;
          border-radius:20px;
          background:#fff;
          color:var(--navy);
          box-shadow:0 4px 12px rgba(20,40,100,0.08);
          white-space:nowrap;
        }
        .chip.active{
          background:linear-gradient(135deg, var(--blue-bright), var(--blue-deep));
          color:#fff;
          box-shadow:0 6px 16px rgba(47,141,255,0.4);
        }

        .grid{
          display:grid;
          grid-template-columns:1fr 1fr;
          gap:12px;
        }
        .prod-card{
          background:var(--card-bg);
          border-radius:16px;
          overflow:hidden;
          box-shadow:0 8px 20px rgba(20,40,100,0.08);
        }
        .prod-thumb{ width:100%; height:120px; position:relative; }
        .prod-thumb img{ width:100%; height:100%; object-fit:cover; }
        .prod-thumb .badge{
          position:absolute; top:7px; left:7px;
          background:rgba(14,27,69,0.75); color:#fff; font-size:9px; font-weight:700;
          padding:3px 7px; border-radius:6px;
        }
        .prod-thumb .off-tag{
          position:absolute; top:7px; right:7px;
          background:#ff5470; color:#fff; font-size:9px; font-weight:800;
          padding:3px 6px; border-radius:6px;
        }
        .prod-info{ padding:9px 11px 11px; }
        .prod-name{ font-size:12.5px; font-weight:700; color:var(--navy); line-height:1.3; }
        .prod-meta{ font-size:10.5px; color:var(--grey-text); margin-top:3px; }
        .prod-price-row{ display:flex; justify-content:space-between; align-items:center; margin-top:7px; }
        .prod-price{ font-size:13.5px; font-weight:800; color:var(--blue-deep); }
        .add-btn{
          width:26px; height:26px; border-radius:50%;
          background:linear-gradient(135deg, var(--blue-bright), var(--blue-mid));
          color:#fff; border:none; font-size:15px;
          display:flex; align-items:center; justify-content:center;
          cursor:pointer;
          box-shadow:0 6px 14px rgba(47,141,255,0.4);
        }

      
      `}</style>
    </>
  );
}

export default Classification;
