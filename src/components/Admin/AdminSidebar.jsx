import useSWR from "swr";
import Button from "../Button";
import AdminCategorie from './AdminCategorie';
import {fetcher} from "../../hooks/Fetcher";
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
export default function AdminSidebar() {
    let categories;
    let token = localStorage.getItem('AUTH_TOKEN');

    const [currentCategory, setcurrentCategory] = useState({id:1})

    const { user, logout } = useAuth({});

    const { data: availableCategoriesData, error: availableCategoriesError } = useSWR(
        token ? 'api/admin-categories' : null, fetcher
    );
    categories = availableCategoriesData ? availableCategoriesData.data : [];
    //take the id of the category where clicked on
    const handleClickCategory = id => {
        const categorie = categories.filter(categorie => categorie.id === id)[0]
        setcurrentCategory(categorie)
    }
    
    return (
        <aside className="md:w-72">
            <div className="p-4 text-center">
                <img
                    className="w-40 mx-auto"
                    src="../img/AmorPorTi.jpg"
                    alt="imagen empresa"
                />
            </div>
            <div className="flex justify-center items-center relative">
                <p className="text-xl">Hola: {user?.name}</p>
            </div>

            <div className="mt-10">
                {categories.map(categorie => (
                    <AdminCategorie
                        key={categorie.id}
                        categorie={categorie}
                        handleClickCat={{handleClickCategory}}
                        currentCat={{currentCategory}}
                    />
                ))}
            </div>

            <div className="text-center mt-4">
                <Button onClick={logout}>
                    Salir
                </Button>
            </div>
        </aside>
    )
}
