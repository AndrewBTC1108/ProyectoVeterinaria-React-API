export default function NotFound() {
  return (
    <div className="flex flex-col items-center my-32">
        <img 
          src="../img/AmorPorTi.jpg" 
          alt="imagen logotipo" 
          className='max-w-xs'
        />
        <h1 className="text-4xl font-black">Error 404</h1>
        <p className="text-slate-500">La página que estás buscando no se encontró.</p>
        {/* Puedes agregar un enlace de regreso a la página de inicio u otra página */}
        <a className="text-customColor" href="/">Volver al inicio</a>
    </div>
    );
}
