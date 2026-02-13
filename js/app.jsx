const { useState, useEffect, useRef } = React;

function PhoneStatusBar() {
  const [dayStr, setDayStr] = useState('');
  useEffect(() => {
    setDayStr(new Date().toLocaleDateString('en-US', { weekday: 'short' }));
  }, []);
  return (
    <div className="phone-status-bar">
      <div className="phone-status-left">
        <span className="phone-status-time">9:41</span>
        <span className="phone-status-date">{dayStr || 'Fri'}</span>
      </div>
      <div className="phone-dynamic-island" />
      <div className="phone-status-right">
        <span className="phone-status-battery">100%</span>
        <span className="phone-status-battery-icon" aria-hidden="true">
          <svg width="22" height="12" viewBox="0 0 22 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="0.5" y="0.5" width="19" height="11" rx="2.5" stroke="currentColor" strokeWidth="1.2" fill="none"/>
            <rect x="2" y="2" width="16" height="8" rx="1" fill="currentColor"/>
            <path d="M20 4v4a1.5 1.5 0 001.5 1.5h0" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
          </svg>
        </span>
      </div>
    </div>
  );
}

function App() {
  const [headerScrolled, setHeaderScrolled] = useState(false);
  const [activeScreen, setActiveScreen] = useState(0);
  const sectionRefs = useRef([]);

  useEffect(() => {
    const onScroll = () => setHeaderScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setActiveScreen((s) => (s + 1) % 6), 3200);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );
    sectionRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const screenSections = [
    {
      id: 'home',
      title: 'Home',
      copy: 'Start with a quick greeting and one-tap access to shop all products. See deals and promotions, frequently bought reminders, and AI-style recommendations so you never forget the essentials.',
      screenshot: 'assets/screens/home.png',
      mockup: (
        <div className="mockup-home app-content">
          <img src="assets/logo.png" alt="" className="mockup-logo" />
          <div className="mockup-greeting">Hi, Guest!</div>
          <div className="mockup-location">DHA Phase 2, Islamabad</div>
          <div className="mockup-shop-btn">Shop all products</div>
          <div className="mockup-section-label">Deals & Promotions</div>
          <div className="mockup-deal" />
          <div className="mockup-deal" />
          <div className="mockup-section-label">Recommended for you</div>
          <div className="mockup-cards">
            <div className="mockup-product-card" />
            <div className="mockup-product-card" />
          </div>
        </div>
      ),
    },
    {
      id: 'shop',
      title: 'Shop all products',
      copy: 'Browse 125+ products with search and category filters. Tap a product for details, nutrition tips, and healthier alternatives. Add to cart in one tap and checkout with cash on delivery.',
      screenshot: 'assets/screens/shop.png',
      mockup: (
        <div className="mockup-shop app-content">
          <div className="mockup-search" />
          <div className="mockup-chips">
            <span className="mockup-chip active">All</span>
            <span className="mockup-chip">Grains</span>
            <span className="mockup-chip">Oils</span>
            <span className="mockup-chip">Dairy</span>
          </div>
          <div className="mockup-product-grid">
            <div className="mockup-product-tile" />
            <div className="mockup-product-tile" />
            <div className="mockup-product-tile" />
            <div className="mockup-product-tile" />
          </div>
        </div>
      ),
    },
    {
      id: 'cart',
      title: 'Cart & checkout',
      copy: 'Search or type to add items to your list. Check off as you shop, see live total, and place your order with cash on delivery. Simple list view and one-tap checkout.',
      screenshot: 'assets/screens/cart.png',
      mockup: (
        <div className="mockup-cart app-content">
          <div className="mockup-input" />
          <div className="mockup-list-row">
            <div className="mockup-checkbox" />
            <span>Basmati Rice 5kg · Rs 1250</span>
          </div>
          <div className="mockup-list-row">
            <div className="mockup-checkbox" />
            <span>Milk 1L · Rs 220</span>
          </div>
          <div className="mockup-list-row">
            <div className="mockup-checkbox" />
            <span>Eggs 12 pcs · Rs 320</span>
          </div>
          <div className="mockup-total">Total: Rs 1,790</div>
          <div className="mockup-checkout">Proceed to checkout (COD)</div>
        </div>
      ),
    },
    {
      id: 'recipes',
      title: 'Recipes & suggestions',
      screenshot: 'assets/screens/recipes.png',
      copy: 'Get recipe ideas based on what’s on your list. Suggested from your list and full recipe list with prep time and ingredients. Premium members unlock exclusive recipes.',
      mockup: (
        <div className="mockup-recipes app-content">
          <div className="mockup-label">Suggested from your list</div>
          <div className="mockup-recipe-card" />
          <div className="mockup-recipe-card" />
          <div className="mockup-label">All recipes</div>
          <div className="mockup-recipe-card" />
        </div>
      ),
    },
    {
      id: 'deals',
      title: 'Deals',
      screenshot: 'assets/screens/deals.png',
      copy: 'See current deals and promotions in one place. Tap a deal to add items to your cart. Updated regularly so you never miss a discount.',
      mockup: (
        <div className="mockup-deals app-content">
          <div className="mockup-section-label">Deals & Promotions</div>
          <div className="mockup-deal" />
          <div className="mockup-deal" />
          <div className="mockup-deal" />
          <div className="mockup-section-label">This week</div>
          <div className="mockup-deal wide" />
        </div>
      ),
    },
    {
      id: 'voice',
      title: 'Voice Add',
      screenshot: 'assets/screens/voice.png',
      copy: 'Add items by voice or type. Say "Add milk and basmati rice" – we match from 125+ products or add as custom. Try the demo or use example phrases, then hear confirmation with speech feedback.',
      mockup: (
        <div className="mockup-voice app-content">
          <div className="mockup-voice-title">Add items by voice</div>
          <div className="mockup-voice-hint">Type or speak: "Add milk and rice". We match from 125+ products.</div>
          <div className="mockup-voice-mic">Try demo (adds milk & basmati rice)</div>
          <div className="mockup-voice-examples">Add milk and rice · I need eggs · Get olive oil</div>
          <div className="mockup-voice-input" />
        </div>
      ),
    },
  ];

  return (
    <>
      <header className={`landing-header ${headerScrolled ? 'scrolled' : ''}`}>
        <div className="header-inner">
          <img src="assets/logo.png" alt="Punjab Cash & Carry" className="header-logo" />
          <a href="/app.apk" className="cta-header" download="Punjab-Cash-Carry.apk">
            Download App
          </a>
        </div>
      </header>

      <section className="hero">
        <div className="hero-inner">
          <div>
            <div className="hero-brand">
              <div className="hero-badge">📍 DHA Phase 2 · Islamabad</div>
              <img src="assets/logo.png" alt="Punjab Cash & Carry" className="hero-logo" />
            </div>
            <h1 className="hero-title">
              Grocery shopping, <span className="accent">simplified.</span>
            </h1>
            <p className="hero-sub">
              Lists, deals, recipes, and voice add – all in one app for your local grocery run.
            </p>
            <div className="hero-stats">
              <span>125+ products</span>
              <span>Cash on delivery</span>
              <span>Recipes & deals</span>
            </div>
            <div className="hero-buttons">
              <a href="/app.apk" className="btn btn-primary" download="Punjab-Cash-Carry.apk">
                Download APK
              </a>
              <a href="#screens" className="btn btn-secondary">See app screens</a>
            </div>
          </div>
          <div className="phone-wrap">
            <div className="phone-frame iphone-mockup">
              <div className="phone-screen">
                <PhoneStatusBar />
                <div className="phone-hero-body">
                  {screenSections.map((section, i) => (
                    <div key={section.id} className={`screen-slide ${i === activeScreen ? 'active' : i < activeScreen ? 'prev' : ''}`}>
                      <div className="screen-shot-wrap">
                        <img src={section.screenshot} alt={section.title} className="screen-shot-img" onError={(e) => { e.target.style.display = 'none'; e.target.nextElementSibling.style.display = 'block'; }} />
                        <div className="screen-shot-fallback" style={{ display: 'none' }}>{section.mockup}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="phone-home-indicator" aria-hidden="true" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="banner-strip">
        <div className="banner-strip-inner">
          <span className="banner-item">125+ Products</span>
          <span className="banner-item">Cash on Delivery</span>
          <span className="banner-item">Recipes & Deals</span>
          <span className="banner-item">Voice Add</span>
        </div>
      </section>

      <section id="screens" className="screens-intro">
        <h2 className="section-title">App screens</h2>
        <p className="section-sub">See how the app works – home, shop, cart, recipes, deals, and voice add.</p>
      </section>

      {screenSections.map((section, i) => (
        <div
          key={section.id}
          className="screen-section"
          ref={(el) => (sectionRefs.current[i] = el)}
        >
          <div className="screen-mockup-wrap">
            <div className="phone-frame iphone-mockup">
              <div className="phone-screen">
                <PhoneStatusBar />
                <div className="screen-shot-wrap">
                  <img src={section.screenshot} alt={section.title} className="screen-shot-img" onError={(e) => { e.target.style.display = 'none'; e.target.nextElementSibling.style.display = 'block'; }} />
                  <div className="screen-shot-fallback" style={{ display: 'none' }}>{section.mockup}</div>
                </div>
                <div className="phone-home-indicator" aria-hidden="true" />
              </div>
            </div>
          </div>
          <div className="screen-copy">
            <h3>{section.title}</h3>
            <p>{section.copy}</p>
          </div>
        </div>
      ))}

      <section className="cta-section">
        <h2 className="section-title">Ready to shop smarter?</h2>
        <p className="section-sub">
          Download the app and get started with lists, deals, and COD checkout.
        </p>
        <a href="/app.apk" className="btn btn-primary" download="Punjab-Cash-Carry.apk">
          Download APK for Android
        </a>
      </section>

      <footer className="footer">
        <p className="footer-brand">Punjab Cash & Carry</p>
        <p>DHA Phase 2, Islamabad</p>
        <div className="footer-links">
          <a href="https://punjabcashandcarry.com.pk" target="_blank" rel="noopener noreferrer">Website</a>
          <a href="/app.apk" download="Punjab-Cash-Carry.apk">Download APK</a>
        </div>
      </footer>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
