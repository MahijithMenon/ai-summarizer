import logo from '../assets/logo.svg';
const Hero = () => {
  return (
    <header className="w-full flex justify-center items-center flex-col">
      <nav className="flex justify-between items-end w-full">
        <img src={logo} alt="sumz logo" className="w-28 object-contain"></img>
        <button
          type="button"
          onClick={() => window.open('')}
          className="black_btn"
        >
          Github
        </button>
      </nav>
      <h1 className="head_text">
        Summarize Articles with <br />
        <span className="orange_gradient">OpenAI</span>
      </h1>
      <h2 className="desc">
        Simplify your reading experience with Summize,an open-source tool
        article summarization tool powered by OpenAI&pos; s GPT-3.
      </h2>
    </header>
  );
};

export default Hero;
