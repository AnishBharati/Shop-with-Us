import React from "react";
import { useSearch } from './Search'
import axios from "axios";
import './index.css'
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from "react-router-dom";
import { IconButton } from '@mui/material/IconButton';
import { Button } from "@mui/material";
const SearchInput = () => {
  const [values, setValues] = useSearch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/customers/search/${values.keyword}`
      );
      setValues({ ...values, results: data });
      navigate("/search");
    } catch (error) { 
      console.log(error);
    }
  };
  return (
    <div className="search">
      <form
        role="search"
        onSubmit={handleSubmit}
      >
        <input
          type="search"
          placeholder="Search"
          aria-label="Search"
            style={{
                height: "40px", width: '500px', borderRadius: '10px', fontSize:'15px'
                
            }}
          value={values.keyword}
          onChange={(e) => setValues({ ...values, keyword: e.target.value })}
        />
        <Button type="submit" variant="contained"
        style={{
            height: '40px',width : '100px', marginLeft: '20px', borderRadius:'10px'
        }}
        >
          Search
        </Button>
      </form>
    </div>
  );
};

export default SearchInput;
