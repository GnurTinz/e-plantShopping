
export default function AboutUs({ setPage }) {
  return (
    <section className="hero">
      <div className="hero-content">
        <p className="eyebrow">BRING NATURE HOME</p>

        <h1>Find Your Little Piece of Paradise</h1>

        <p className="hero-description">
          Discover beautiful houseplants that bring life,
          freshness, and happiness into your home.
          Whether you are a beginner or a plant lover,
          we have the perfect green companion for you.
        </p>

        <button
          className="primary-button"
          onClick={() => setPage("plants")}
        >
          Get Started
        </button>
      </div>
    </section>
  );
}
