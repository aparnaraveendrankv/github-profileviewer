import React, { useState, useEffect } from "react";
import Loading from "./Loading";
import Profile from "./Profile";

function App() {
  const [items, setItems] = useState([]);
  const [user] = useState("aparnaraveendrankv");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchRepos = async () => {
      const res = await fetch(
        `https://api.github.com/users/${user}/repos?per_page=6&sort=updated`
      );
      const data = await res.json();
      setItems(data);
    };

    fetchRepos();
  }, [user]);

  // Function to handle changes in the search input
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Filter repositories based on search query
  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-gray-200">
      <div className="max-w-7xl mx-auto px-3 py-3 flex justify-between items-center">
        <a
          href={`https://github.com/${user}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="https://cdn.pixabay.com/photo/2022/01/30/13/33/github-6980894_1280.png"
            alt="GitHub Logo"
            className="w-10 h-10 mr-2 ml-2"
          />
        </a>
        <h1 className="text-black text-2xl font-bold">{user}'s Repositories</h1>
        <div className="flex">
          <input
            type="text"
            placeholder="Search repositories..."
            className="px-4 py-2 rounded-md mr-2"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <button className="px-4 py-2 bg-emerald-800 text-white rounded-md">
            Search
          </button>
        </div>
      </div>
      <div className="pt-10">
        <hr className="border-white solid 2px" />
      </div>
      {!items ? (
        <Loading />
      ) : (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 pb-20 px-6">
          {filteredItems.map((item) => (
            <Profile key={item.id} {...item} />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;