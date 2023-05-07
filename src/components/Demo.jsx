import { useEffect, useState } from 'react';
import { linkIcon, copy, loader, tick } from '../assets/index';
import { useLazyGetSummaryQuery } from '../services/article';
const Demo = () => {
  const [article, setArticle] = useState({
    url: '',
    summary: '',
  });
  const [copied, setCopied] = useState('');
  const [allArticle, setAllArticle] = useState([]);
  const [getSummary, { error, isLoading }] = useLazyGetSummaryQuery();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await getSummary({ url: article.url });
    if (data?.summary) {
      const newArticle = { ...article, summary: data.summary };
      setArticle(newArticle);
      const newAllArticle = [...allArticle, newArticle];
      setAllArticle(newAllArticle);
      localStorage.setItem('articles', JSON.stringify(newAllArticle));
      console.log(data.summary);
    } else {
      console.log(error);
    }
  };

  const handleCopy = (copy) => {
    setCopied(copy);
    navigator.clipboard.writeText(copy);
    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  const handleInput = (e) => {
    setArticle({ ...article, url: e.target.value });
  };
  useEffect(() => {
    const articleFromLocalStorage = localStorage.getItem('articles');
    if (articleFromLocalStorage) {
      setAllArticle(JSON.parse(articleFromLocalStorage));
    }
  }, []);
  return (
    <section className="mt-16 w-full max-w-full">
      <div className="flex flex-col w-full gap-2">
        <form
          className="relative flex justify-center items-center"
          onSubmit={handleSubmit}
        >
          <img
            src={linkIcon}
            className="
          absolute left-0 my-2 ml-3 w-5"
          />
          <input
            type="url"
            placeholder="Enter URL"
            className="url_input peer"
            value={article.url}
            onChange={handleInput}
            required
          />
          <button
            type="submit"
            className="submit_btn
          peer-focus:border-gray-700
          peer-focus:text-gray-700"
          >
            »
          </button>
        </form>
        <div className="flex flex-col gap-1 max-h-60 overflow-y-auto">
          {allArticle.map((article, index) => (
            <div
              key={`link-${index}`}
              onClick={() => setArticle(article)}
              className="link_card"
            >
              <p className="flex-1 font-satoshi text-blue-700 font-medium text-sm truncate">
                {article.url}
              </p>
              <div className="copy_btn" onClick={() => handleCopy(article.url)}>
                <img
                  src={copied === article.url ? tick : copy}
                  alt="copy"
                  className="w-[40%] h-[40%] object-contain"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="my-10 max-w-full  flex justify-center items-center">
        {isLoading ? (
          <img src={loader} alt="loader" />
        ) : error ? (
          <div className="flex flex-col gap-3">
            <p className="font-inter font-bold text-black text-center">
              {`Well That wasn't supposed to happen`}
            </p>
            <br />
            <span className="font-satoshi font-normal text-gray-700">
              {error.data?.error}
            </span>
          </div>
        ) : (
          article.summary && (
            <div>
              <h2 className="font-satoshi font-bold text-gray-600 text-xl">
                Article <span className="blue_gradient">Summary</span>
              </h2>
              <div className="summary-box">
                <p className="font-inter font-normal text-gray-700 text-sm">
                  {article.summary}
                </p>
              </div>
            </div>
          )
        )}
      </div>
    </section>
  );
};

export default Demo;
