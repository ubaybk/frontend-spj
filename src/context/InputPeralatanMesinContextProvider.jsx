import { collection, getDocs } from "firebase/firestore";
import { createContext, useEffect, useState } from "react";
import db from "../../firebaseConfig";

export const inputPeralatanMesinContext = createContext()

export const InputPeralatanMesinContextProvider = ({children}) => {
    const [dataInputPeralatanMesin, setDataInputPeralatanMesin] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(()=> {
        const fetchData = async () => {
            try {
                const querySnapshot = await getDocs(collection(db,"inputPeralatanMesin"))
                const fetchedData = querySnapshot.docs.map((doc => ({
                    id: doc.id,
                    ...doc.data()
                })))
                setDataInputPeralatanMesin(fetchedData)
            } catch (error) {
                console.error("ERROR AMBIL DATA INPUT PeralatanMesin COOY",error)
                
            } finally{
                setLoading(false)
            }
        }
        fetchData(false)
    },[])

    return(
        <inputPeralatanMesinContext.Provider value={{dataInputPeralatanMesin, loading}}>
            {children}
        </inputPeralatanMesinContext.Provider>
    )
}