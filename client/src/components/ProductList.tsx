import { useEffect, useState } from "react"

interface Props {
    category: string;
}

const ProductList = ({category}:Props) => {

    //useState of products
    // product is our variable and holding an empty array []
    // setProduct is an updater function that will set our product array with whatever changes given to it
    // example setProduct(['car', 'pool'])   this will set product to now hold an array with  car and pool
    const [product, setProduct] = useState<string []>([]);
    
    // moved the category to the app.tsx component
    // const [category, setCategory] = useState('');

    useEffect(() => {
      
        console.log("Fetching data in", category);
        setProduct(['car', 'pool']);
     
    }, [category])
    

  return (
    <>
        <h1 className="text-center m-3">Product List</h1>
        {/* moved to app.tsx */}
        {/* <select className="form-select" onChange={(e)=> setCategory(e.target.value)}>
            <option value={""}>Pick Catetory</option>
            <option value={"Car"}>Car</option>
            <option value={"Pool"}>Pool</option>
        </select> */}
    </>
  )
}

export default ProductList