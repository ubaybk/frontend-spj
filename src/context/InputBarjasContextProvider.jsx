import { collection, getDocs } from "firebase/firestore";
import { createContext, useEffect, useState } from "react";
import db from "../../firebaseConfig";

export const inputBarjasContext = createContext()

export const InputBarjasContextProvider = ({children}) => {
    const [dataInputBarjas, setDataInputBarjas] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(()=> {
        const fetchData = async () => {
            try {
                const querySnapshot = await getDocs(collection(db,"inputBarjas"))
                const fetchedData = querySnapshot.docs.map((doc => ({
                    id: doc.id,
                    ...doc.data()
                })))
                setDataInputBarjas(fetchedData)
            } catch (error) {
                console.error("ERROR AMBIL DATA INPUT BARJAS COOY",error)
                
            } finally{
                setLoading(false)
            }
        }
        fetchData(false)
    },[])

    return(
        <inputBarjasContext.Provider value={{dataInputBarjas, loading}}>
            {children}
        </inputBarjasContext.Provider>
    )
}