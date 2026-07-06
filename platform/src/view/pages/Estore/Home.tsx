import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <div className="phone">

        <div className="scroll-area">

          <div className="app-header">
            <div className="header-top">
              <div className="greeting">
                <div className="title">Hi, welcome back 👋</div>
                <div className="sub">Find everything you need today</div>
              </div>
              <div className="right-cluster">
                <div className="sale-pill">WEEKEND<br />SALE</div>
                <Link to="/site-message" className="bell">🔔</Link>
              </div>
            </div>
            <div className="search-row">
              <span className="search-icon">🔍</span>
              <input type="text" placeholder="What are you looking for today?" />
              <span className="cart-icon">🛒<span className="dot"></span></span>
            </div>
          </div>

          <div className="hero-wrap">
            <div className="hero-banner">
              <img src="https://loremflickr.com/800/500/shopping,fashion/all?lock=12" alt="Sale banner" />
              <div className="overlay"></div>
              <div className="hero-content">
                <div className="hero-eyebrow">Estore Exclusive</div>
                <div className="hero-title">Payday<br />Mega Sale</div>
                <div className="hero-sub">1 – 7 August · While stocks last</div>
                <div className="hero-badge">UP TO <span className="big">70%</span> OFF</div>
              </div>
            </div>
            <div className="hero-dots">
              <span className="active"></span><span></span><span></span>
            </div>
          </div>

          <div className="categories">
            <div className="cat-item">
              <div className="cat-icon"><img src="https://loremflickr.com/120/120/clothing,fashion/all?lock=21" alt="Fashion" /></div>
              <div className="cat-label">Fashion</div>
            </div>
            <div className="cat-item">
              <div className="cat-icon"><img src="https://loremflickr.com/120/120/sneakers,shoes/all?lock=22" alt="Shoes" /></div>
              <div className="cat-label">Shoes</div>
            </div>
            <div className="cat-item">
              <div className="cat-icon"><img src="https://loremflickr.com/120/120/cosmetics,beauty/all?lock=23" alt="Beauty" /></div>
              <div className="cat-label">Beauty</div>
            </div>
            <div className="cat-item">
              <div className="cat-icon"><img src="https://loremflickr.com/120/120/headphones,electronics/all?lock=24" alt="Electronics" /></div>
              <div className="cat-label">Electronics</div>
            </div>
          </div>

          <div className="section">
            <div className="section-head">
              <h2>Flash Deals</h2>
              <span className="timer">⏱ ends in 03:12:40</span>
            </div>
            <div className="deal-scroll">
              <div className="deal-card">
                <div className="deal-thumb">
                  <img src="https://loremflickr.com/260/220/totebag,handbag/all?lock=31" alt="Tote bag" />
                  <span className="off-tag">-40%</span>
                </div>
                <div className="deal-info">
                  <div className="deal-name">Mini Tote Bag</div>
                  <div className="deal-price-row"><span className="deal-price">$24</span><span className="deal-old">$40</span></div>
                </div>
              </div>
              <div className="deal-card">
                <div className="deal-thumb">
                  <img src="https://loremflickr.com/260/220/earbuds,wireless/all?lock=32" alt="Wireless earbuds" />
                  <span className="off-tag">-45%</span>
                </div>
                <div className="deal-info">
                  <div className="deal-name">Wireless Buds</div>
                  <div className="deal-price-row"><span className="deal-price">$32</span><span className="deal-old">$59</span></div>
                </div>
              </div>
              <div className="deal-card">
                <div className="deal-thumb">
                  <img src="https://loremflickr.com/260/220/sunglasses/all?lock=33" alt="Sunglasses" />
                  <span className="off-tag">-36%</span>
                </div>
                <div className="deal-info">
                  <div className="deal-name">Classic Sunnies</div>
                  <div className="deal-price-row"><span className="deal-price">$14</span><span className="deal-old">$22</span></div>
                </div>
              </div>
              <div className="deal-card">
                <div className="deal-thumb">
                  <img src="https://loremflickr.com/260/220/sneakers,shoes/all?lock=34" alt="Sneakers" />
                  <span className="off-tag">-40%</span>
                </div>
                <div className="deal-info">
                  <div className="deal-name">Runner Sneakers</div>
                  <div className="deal-price-row"><span className="deal-price">$48</span><span className="deal-old">$80</span></div>
                </div>
              </div>
            </div>
          </div>

          <div className="section" style={{ paddingTop: '22px' }}>
            <div className="section-head">
              <h2>Just For You</h2>
              <span className="see-all">See all ›</span>
            </div>
          </div>

          <div className="grid">
            <div className="prod-card">
              <div className="prod-thumb">
                <img src="https://loremflickr.com/300/300/jacket,fashion/all?lock=41" alt="Jacket" />
                <span className="badge">NEW</span>
              </div>
              <div className="prod-info">
                <div className="prod-name">Oversized Jacket</div>
                <div className="prod-meta">⭐ 4.8 · 1.2k sold</div>
                <div className="prod-price-row"><span className="prod-price">$56</span><button className="add-btn">+</button></div>
              </div>
            </div>
            <div className="prod-card">
              <div className="prod-thumb">
                <img src="https://loremflickr.com/300/300/handbag,purse/all?lock=42" alt="Handbag" />
                <span className="badge">HOT</span>
              </div>
              <div className="prod-info">
                <div className="prod-name">Woven Handbag</div>
                <div className="prod-meta">⭐ 4.9 · 860 sold</div>
                <div className="prod-price-row"><span className="prod-price">$38</span><button className="add-btn">+</button></div>
              </div>
            </div>
            <div className="prod-card">
              <div className="prod-thumb">
                <img src="https://loremflickr.com/300/300/wristwatch/all?lock=43" alt="Watch" />
              </div>
              <div className="prod-info">
                <div className="prod-name">Minimal Watch</div>
                <div className="prod-meta">⭐ 4.7 · 2.1k sold</div>
                <div className="prod-price-row"><span className="prod-price">$65</span><button className="add-btn">+</button></div>
              </div>
            </div>
            <div className="prod-card">
              <div className="prod-thumb">
                <img src="https://loremflickr.com/300/300/skincare,cosmetics/all?lock=44" alt="Skincare set" />
              </div>
              <div className="prod-info">
                <div className="prod-name">Skincare Set</div>
                <div className="prod-meta">⭐ 4.6 · 540 sold</div>
                <div className="prod-price-row"><span className="prod-price">$29</span><button className="add-btn">+</button></div>
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

        .scroll-area{
          flex:1;
          overflow-y:auto;
          -webkit-overflow-scrolling:touch;
          scrollbar-width:none;
          padding-bottom:96px;
        }
        .scroll-area::-webkit-scrollbar{ display:none; }

        .app-header{
          background:linear-gradient(135deg, var(--blue-deep), var(--blue-bright));
          padding:14px 18px 22px;
          color:#fff;
        }

        .header-top{
          display:flex;
          justify-content:space-between;
          align-items:flex-start;
          margin-bottom:14px;
        }

        .greeting .title{ font-size:16px; font-weight:700; }
        .greeting .sub{ font-size:12px; opacity:0.85; margin-top:2px; }

        .sale-pill{
          background:var(--gold);
          color:var(--navy);
          font-size:11px;
          font-weight:800;
          text-align:center;
          line-height:1.25;
          padding:6px 12px;
          border-radius:12px;
          box-shadow:0 6px 14px rgba(0,0,0,0.15);
        }

        .bell{
          width:34px; height:34px;
          border-radius:50%;
          background:rgba(255,255,255,0.15);
          display:flex; align-items:center; justify-content:center;
          margin-left:10px;
          font-size:16px;
          position:relative;
          text-decoration:none;
        }
        .bell::after{
          content:"";
          position:absolute; top:6px; right:7px;
          width:7px; height:7px;
          background:#ff4d4f; border-radius:50%;
          border:1.5px solid var(--blue-deep);
        }

        .header-top .right-cluster{ display:flex; align-items:flex-start; }

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
        .search-icon, .cart-icon{ font-size:16px; color:var(--blue-mid); }
        .cart-icon{ position:relative; }
        .cart-icon .dot{
          position:absolute; top:-4px; right:-6px;
          width:7px; height:7px; background:#ff4d4f; border-radius:50%;
        }

        .hero-wrap{ padding:16px 18px 4px; }

        .hero-banner{
          position:relative;
          border-radius:22px;
          overflow:hidden;
          min-height:180px;
          color:#fff;
        }
        .hero-banner img{
          position:absolute;
          inset:0;
          width:100%; height:100%;
          object-fit:cover;
        }
        .hero-banner .overlay{
          position:absolute; inset:0;
          background:linear-gradient(120deg, rgba(11,26,74,0.88) 20%, rgba(22,86,201,0.55) 70%, rgba(47,141,255,0.25) 100%);
        }
        .hero-content{ position:relative; padding:22px 18px; }

        .hero-eyebrow{
          font-size:10px; letter-spacing:3px; text-transform:uppercase;
          opacity:0.8; margin-bottom:6px;
        }
        .hero-title{ font-size:26px; font-weight:800; line-height:1.15; max-width:62%; }
        .hero-sub{ font-size:12px; opacity:0.9; margin-top:8px; max-width:60%; }
        .hero-badge{
          display:inline-flex; align-items:baseline; gap:4px;
          background:var(--gold); color:var(--navy); font-weight:800;
          border-radius:10px; padding:6px 12px; margin-top:14px; font-size:13px;
        }
        .hero-badge .big{ font-size:20px; }

        .hero-dots{ display:flex; justify-content:center; gap:6px; margin-top:14px; }
        .hero-dots span{ width:6px; height:6px; border-radius:50%; background:rgba(120,140,190,0.4); }
        .hero-dots span.active{ background:var(--blue-deep); width:16px; border-radius:4px; }

        .categories{ display:flex; justify-content:space-between; padding:20px 18px 6px; }
        .cat-item{ display:flex; flex-direction:column; align-items:center; gap:8px; width:22%; }
        .cat-icon{
          width:60px; height:60px; border-radius:18px;
          overflow:hidden;
          box-shadow:0 8px 18px rgba(20,40,100,0.12);
          border:2px solid #fff;
        }
        .cat-icon img{ width:100%; height:100%; object-fit:cover; }
        .cat-label{ font-size:11px; color:var(--navy); font-weight:600; text-align:center; }

        .section{ padding:22px 18px 6px; }
        .section-head{ display:flex; justify-content:space-between; align-items:center; margin-bottom:14px; }
        .section-head h2{ font-size:16px; color:var(--navy); font-weight:800; }
        .section-head .timer{
          font-size:11px; color:#ff5470; font-weight:700;
          background:#ffeaee; padding:4px 10px; border-radius:10px;
        }
        .section-head .see-all{ font-size:12px; color:var(--blue-mid); font-weight:600; }

        .deal-scroll{
          display:flex; gap:12px; overflow-x:auto; padding-bottom:6px; scrollbar-width:none;
        }
        .deal-scroll::-webkit-scrollbar{ display:none; }

        .deal-card{
          flex:0 0 auto; width:126px;
          background:var(--card-bg); border-radius:16px; overflow:hidden;
          box-shadow:0 8px 20px rgba(20,40,100,0.08);
        }
        .deal-thumb{ width:100%; height:110px; position:relative; }
        .deal-thumb img{ width:100%; height:100%; object-fit:cover; }
        .deal-thumb .off-tag{
          position:absolute; top:6px; left:6px;
          background:#ff5470; color:#fff; font-size:9px; font-weight:800;
          padding:3px 6px; border-radius:6px;
        }
        .deal-info{ padding:9px 10px 11px; }
        .deal-name{ font-size:12px; font-weight:700; color:var(--navy); }
        .deal-price-row{ display:flex; align-items:baseline; gap:6px; margin-top:4px; }
        .deal-price{ font-size:13px; font-weight:800; color:var(--blue-deep); }
        .deal-old{ font-size:10px; color:#b7c0d8; text-decoration:line-through; }

        .grid{ display:grid; grid-template-columns:1fr 1fr; gap:12px; padding:6px 18px 24px; }
        .prod-card{
          background:var(--card-bg); border-radius:16px; overflow:hidden;
          box-shadow:0 8px 20px rgba(20,40,100,0.08);
        }
        .prod-thumb{ width:100%; height:140px; position:relative; }
        .prod-thumb img{ width:100%; height:100%; object-fit:cover; }
        .prod-thumb .badge{
          position:absolute; top:8px; left:8px;
          background:rgba(14,27,69,0.75); color:#fff; font-size:9px; font-weight:700;
          padding:3px 7px; border-radius:6px;
        }
        .prod-info{ padding:10px 12px 12px; }
        .prod-name{ font-size:13px; font-weight:700; color:var(--navy); }
        .prod-meta{ font-size:11px; color:var(--grey-text); margin-top:2px; }
        .prod-price-row{ display:flex; justify-content:space-between; align-items:center; margin-top:8px; }
        .prod-price{ font-size:14px; font-weight:800; color:var(--blue-deep); }
        .add-btn{
          width:28px; height:28px; border-radius:50%;
          background:linear-gradient(135deg, var(--blue-bright), var(--blue-mid));
          color:#fff; border:none; font-size:16px;
          display:flex; align-items:center; justify-content:center;
          cursor:pointer;
          box-shadow:0 6px 14px rgba(47,141,255,0.4);
        }

  
      `}</style>
    </>
  );
}

export default Home;
