import "./searchBar.css";

const SearchBar=(props)=>{
    const {searchHandler,searchButtonHandler,displaySearch}=props;

    return(
        <div>
            <div style={{display:displaySearch}} className="flex align-middle justify-center absolute bg-white py-5 px-8 searchBox">
                <input id="searchBarInput" autoComplete="on"  onChange={searchHandler} type="text" className="border w-full pl-3" placeholder="Search entire store here..."/>
                <button onClick={searchButtonHandler} className="bg-black py-1.5 px-6 text-sm text-white">Search</button>
            </div>
        </div>
    )
}

export default SearchBar;