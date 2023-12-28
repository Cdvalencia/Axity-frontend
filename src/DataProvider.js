import React, { useState, useContext, useEffect } from "react";

const dataContext = React.createContext();

// import { useNavigate } from "react-router-dom";

export function useDataContext() {
    return useContext(dataContext);
}

export function DataProvider(props) {

    const [data, setData] = useState({});
    const [loading, setLoading] = useState(false);

    const function1 = () => {
      setData("");
      return 1
    }

    useEffect(() => {
      if(!(data && data.id)){
        // navigate("/");
      }
      // setEditorHtml(props.editor)
    },[data]);

    return (
        <dataContext.Provider value={
          data,
          loading,
          setLoading,
          function1
        }>
          {props.children}
        </dataContext.Provider>
    );
}
