import { Link } from 'react-router-dom'
export default function Categoria({ categorie, handleClickCat, currentCat }) {

    const { icono, id, nombre, url } = categorie;
    const {handleClickCategory} = handleClickCat
    const {currentCategory} = currentCat
    //operador ternario para asignar clases de resaltado en el sidebar
    const highlightcurrentcategory = () => currentCategory.id === id ? 'bg-customColor' : 'bg-white'

    return (
        <div>
            <Link 
                to={url}
                className={`${highlightcurrentcategory()} flex items-center gap-4 border w-full p-3 hover:bg-customColor cursor-pointer`}
                onClick={() => handleClickCategory(id)}
            >
                <img 
                    src={`/img/icono_${icono}.svg`} 
                    alt="Image icon" 
                    className='w-12'
                />
                <button
                    className='text-lg font-bold cursor-pointer truncate'
                    type='button'
                >
                    {nombre}
                </button>
            </Link>
        </div>
    )
}
