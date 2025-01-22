import { collection, doc, getDocs } from "firebase/firestore";
import { createContext, useEffect, useState } from "react";
import db from "../../firebaseConfig";

export const poaContext = createContext()

export const PoaContextProvider = ({children}) => {
    const [dataPoa, setDataPoa] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(()=> {
        const fetchData = async ()=> {
            try {
                const querySnapshot = await getDocs(collection(db, "poa_data"))
                const fetchedData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()

                }))
                setDataPoa(fetchedData)
            } catch (error) {
                console.error("ERROR FETCHING DATA DARI FIREBASE COOYY:", error)
                
            } finally{
                setLoading(false)
            }
        }

        fetchData()
    }, [])

    return (
            <poaContext.Provider value={{dataPoa, loading}}>
            {children}
            </poaContext.Provider>
    )
}