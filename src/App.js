import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [getEmoji, setGetEmoji] = useState([]);
  const [search, setSearch] = useState("");
  useEffect(() => {
    fetch(
      "https://emoji-api.com/emojis?access_key=f9f498a03c63f1b589a097de520ca773d1f86b61"
    )
      .then((res) => res.json())
      .then((res) => setGetEmoji(res));
  }, [search]);
  const hendlerChange = (e) => {
    setSearch(e.target.value);
  };
  const submitFun = () => {
    if (search !== "") {
      fetch(
        `https://emoji-api.com/emojis?search=${search}&access_key=f9f498a03c63f1b589a097de520ca773d1f86b61`
      )
        .then((res) => res.json())
        .then((res) => {
          if (res) {
            setGetEmoji(res);
          }
          else{
            setGetEmoji([])
          }
        });
    }
  };

  return (
    <>
      <header className="header">
        <h1>Emoji Search</h1>
        <p>A simple emoji search with React</p>
      </header>
      <div className="search__box">
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={hendlerChange}
        />
        <button type="submit" onClick={submitFun}>
          Search
        </button>
      </div>

      <div className="emoji__box">
        {getEmoji.map((emoji) => (
          <div className="emoji__item" key={emoji.slug}>
            <h3>{emoji.character}</h3>
            <p>{emoji.unicodeName}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
