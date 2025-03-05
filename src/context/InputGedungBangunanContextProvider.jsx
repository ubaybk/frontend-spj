import { collection, getDocs } from "firebase/firestore";
import { createContext, useEffect, useState } from "react";
import db from "../../firebaseConfig";

export const inputGedungBangunanContext = createContext()

export const InputGedungBangunanContextProvider = ({children}) => {
    const [dataInputGedungBangunan, setDataInputGedungBangunan] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(()=> {
        const fetchData = async () => {
            try {
                const querySnapshot = await getDocs(collection(db,"inputGedungBangunan"))
                const fetchedData = querySnapshot.docs.map((doc => ({
                    id: doc.id,
                    ...doc.data()
                })))
                setDataInputGedungBangunan(fetchedData)
            } catch (error) {
                console.error("ERROR AMBIL DATA INPUT GedungBangunan COOY",error)
                
            } finally{
                setLoading(false)
            }
        }
        fetchData(false)
    },[])

    return(
        <inputGedungBangunanContext.Provider value={{dataInputGedungBangunan, loading}}>
            {children}
        </inputGedungBangunanContext.Provider>
    )
}