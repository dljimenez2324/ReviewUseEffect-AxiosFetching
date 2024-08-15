import { useEffect, useRef, useState } from "react"
import ProductList from "./components/ProductList"
import FetchingAxios from "./components/FetchingAxios";


const App = () => {

  // useRef   is used to manipulate the DOM but it will usually only happen once
  const ref = useRef<HTMLInputElement>(null)

  // useState
  const [category, setCategory] = useState('');

  // useEffect  to execute a piece of code AFTER a component is rendered
  // essentially it has side effects after the component is rendered
  useEffect(() => {
    
    // code in here will execute one time when the component is rendered the first time
    
    if(ref.current) ref.current.focus()
    
  }, [])
    // the dependency in the []  -  any time there is a re-render, it will fire the useEffect again, example passing in Props, or setting a state

  useEffect(() => {
    
    document.title = "My Cool Review"
    
  }, [])
  

  // ref.current
  
    return (
      <>
          <h1 className="text-center m-3">Review Axios and useEffect</h1>
          <input ref={ref} type="text" />

          <ProductList category={category}/>
          <select className="form-select" onChange={(e)=> setCategory(e.target.value)}>
            <option value={""}>Pick Catetory</option>
            <option value={"Car"}>Car</option>
            <option value={"Pool"}>Pool</option>
        </select>
          <FetchingAxios/>
      </>
    )

  

}

export default App