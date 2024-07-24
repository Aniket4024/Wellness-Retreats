import style from '../CSS/Hero.module.css'

const Hero = () => {
  return <section id={style.Hero}>

    {/* hero image */}
    <div id={style.heroImage}></div>

    {/* Hero title & description */}
    <h2>Discover Your Inner Peace</h2>
    <p>Join us for a series of wellness retreats designed to help you find tranquility and rejuvenation.</p>

  </section>
}

export default Hero
