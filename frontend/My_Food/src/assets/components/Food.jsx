import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Food = () => {
    const [food, setFood] = useState([]);
    const [loading, setLoadning] = useState(true);
    const [error, setError] = useState(null);

    useEffect(()=>{
        const laodFood = async ()=>{
            try{
                const res = await axios.get('http://127.0.0.1:8000/api/food/');
                setFood(res.data);
                setError(null);
            }catch(err){
                setError(err || 'something went wrong');
                console.log(err);
            }finally{
                setLoadning(false);
            }
        };

        laodFood();
    },[]);

    if (loading) {
    return (
        <div className="flex flex-col items-center justify-center h-64">
            <p className="text-lg text-gray-600 mb-4">Loading food data...</p>
            <div className="w-10 h-10 border-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
        </div>
    );
}



  return (
    <div>
        <p>{food.map((item)=>(item.name))}</p>
        <p>this is food components</p>
        <p>this is food components</p>
    </div>
  )
}

export default Food