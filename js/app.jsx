const { useState, useEffect, useRef } = React;

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
    const t = setInterval(() => setActiveScreen((s) => (s + 1) % 4), 3200);
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

  const heroScreens = [
    { bar: 'PUNJAB CASH & CARRY', content: <div className="screen-title">Deals · Shop · Cart · Recipes</div> },
    { bar: 'All Products', content: <div className="screen-title">Search & categories</div> },
    { bar: 'Your Cart', content: <div className="screen-title">List & COD checkout</div> },
    { bar: 'Recipes', content: <div className="screen-title">Suggestions from your list</div> },
  ];

  const screenSections = [
    {
      id: 'home',
      title: 'Home',
      copy: 'Start with a quick greeting and one-tap access to shop all products. See deals and promotions, frequently bought reminders, and AI-style recommendations so you never forget the essentials.',
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
  ];

  return (
    <>
      <header className={`landing-header ${headerScrolled ? 'scrolled' : ''}`}>
        <div className="header-inner">
          <img src="assets/logo.png" alt="Punjab Cash & Carry" className="header-logo" />
          <a href="https://play.google.com/store/apps/details?id=pk.com.punjabcashandcarry.punjab" className="cta-header" target="_blank" rel="noopener noreferrer">
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
              <a href="https://play.google.com/store/apps/details?id=pk.com.punjabcashandcarry.punjab" className="btn btn-primary" target="_blank" rel="noopener noreferrer">
                Get on Google Play
              </a>
              <a href="#screens" className="btn btn-secondary">See app screens</a>
            </div>
          </div>
          <div className="phone-wrap">
            <div className="phone-frame">
              <div className="phone-screen">
                <div className="phone-notch" />
                {heroScreens.map((screen, i) => (
                  <div key={i} className={`screen-slide ${i === activeScreen ? 'active' : i < activeScreen ? 'prev' : ''}`}>
                    <div className="app-bar"><span>{screen.bar}</span></div>
                    <div className="app-content">{screen.content}</div>
                    <div className="dot-row">
                      {heroScreens.map((_, j) => (
                        <div key={j} className={`dot ${j === activeScreen ? 'active' : ''}`} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="screens" className="screens-intro">
        <h2 className="section-title">App screens</h2>
        <p className="section-sub">See how the app works – from home to checkout.</p>
      </section>

      {screenSections.map((section, i) => (
        <div
          key={section.id}
          className="screen-section"
          ref={(el) => (sectionRefs.current[i] = el)}
        >
          <div className="screen-mockup-wrap">
            <div className="phone-frame">
              <div className="phone-screen">
                <div className="phone-notch" />
                {section.mockup}
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
        <a href="https://play.google.com/store/apps/details?id=pk.com.punjabcashandcarry.punjab" className="btn btn-primary" target="_blank" rel="noopener noreferrer">
          Download for Android
        </a>
      </section>

      <footer className="footer">
        <p className="footer-brand">Punjab Cash & Carry</p>
        <p>DHA Phase 2, Islamabad</p>
        <div className="footer-links">
          <a href="https://punjabcashandcarry.com.pk" target="_blank" rel="noopener noreferrer">Website</a>
          <a href="https://play.google.com/store/apps/details?id=pk.com.punjabcashandcarry.punjab" target="_blank" rel="noopener noreferrer">Google Play</a>
        </div>
      </footer>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
