function AboutUs({ setPage }) {
  return (
    <section className="about-us-container background-image">
      <div className="hero-content">
        <p className="eyebrow">WELCOME TO YOUR GREEN SPACE</p>

        <h1>Welcome to Paradise Nursery</h1>

        <p>
          Paradise Nursery is an online plant shop dedicated to bringing
          the beauty of nature into your home. We offer a variety of
          houseplants to help you create a greener and more relaxing space.
        </p>

        <p>
          Our mission is to make plant shopping simple and enjoyable by
          providing quality plants, helpful product information, and a
          convenient shopping experience for plant lovers of all levels.
        </p>

        <button
          type="button"
          className="primary-button"
          onClick={() => setPage("plants")}
        >
          Get Started
        </button>
      </div>
    </section>
  );
}

export default AboutUs;