import { useContext } from "react";
import AmorPorTiContext from "../Context/AmorPorTiProvider";
//para poder comunicar con los componentes
const useAmorPorTi = () => {
    return useContext(AmorPorTiContext)
}

export default useAmorPorTi