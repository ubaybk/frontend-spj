import { collection, getDocs } from "firebase/firestore";
import { createContext, useEffect, useState } from "react";
import db from "../../firebaseConfig";

export const rukDataContext = createContext()

export const RukDataContextProvider = ({children}) => {
    const [dataRuk, setDataRuk] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(()=> {
        const fetchData = async () => {
            try {
                const querySnapshot = await getDocs (collection(db, "ruk_data"))
                const fetchedData = querySnapshot.docs.map((doc => ({
                    id: doc.id,
                    ...doc.data()
                })))
                setDataRuk(fetchedData)
            } catch (error) {
                console.error('ERROR AMBIL DATA RUK', error)
                
            } finally{
                setLoading(false)
            }
        }
        fetchData(false)
    },[])
    return (
        <rukDataContext.Provider value={{dataRuk, loading}}>
            {children}
        </rukDataContext.Provider>
    )
}