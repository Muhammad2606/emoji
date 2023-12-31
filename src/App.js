import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [getEmoji, setGetEmoji] = useState([]);
  const [search, setSearch] = useState("");
  useEffect(() => {
    try{
      fetch(
        "https://emoji-api.com/emojis?access_key=d97548a32324eac82d7a85b6a1268cc0cb840b87"
      )
        .then((res) => res.json())
        .then((res) => setGetEmoji(res));
    } catch(error){
      console.log(error);
    }
  }, [search]);
  const hendlerChange = (e) => {
    setSearch(e.target.value);
  };

  const submitFun = () => {
    if (search !== "") {
      fetch(
        `https://emoji-api.com/emojis?search=${search}&access_key=d97548a32324eac82d7a85b6a1268cc0cb840b87`
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
