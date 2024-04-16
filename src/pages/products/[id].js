import { useRouter } from 'next/router';
import products from '../../../public/data/products.json';
import 'tailwindcss/tailwind.css'
import { useState } from 'react';

const ProductPage = ({ product }) => {
  const router = useRouter();
  const { id } = router.query;
  const [selectdColor, setSelectedColor] = useState(product.colors[0].image)

  const handleColorChange = (colorImage) => {
    setSelectedColor(colorImage);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 bg-gray-50 py-12 md:px-20 h-screen">
      {/* Imagem do Produto */}
      <div className="px-10">
        <img src={`../${selectdColor}`} alt={product.name} className="w-full object-cover" />       
      </div>

      {/* Detalhes do Produto */}
      <div className="px-10">
        <h1 className="text-2xl font-semibold mb-4">{product.name}</h1>
        <p className="text-lg mb-2">R$ {product.price}</p>
        <div className="flex flex-wrap gap-2">
          {product.sizes.map((size) => (
            <span key={size} className="px-2 py-1 bg-gray-200 rounded-md text-sm">{size}</span>
          ))}
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          {product.colors.map((color) => (
            <div
              key={color.hexa}
              className="w-6 h-6 rounded-full  border border-slate-300 cursor-pointer"
              style={{ backgroundColor: color.hexa }}
              title={color.hexa}
              onClick={() => handleColorChange(color.image)}>

            </div>
          ))}
        </div>
        <h3 className="text-2xl">Caracteristicas</h3>
        <p className="text-lg mb-2">{product.brand}</p>
        <p className="text-lg mb-2">Descrição: {product.description}</p>
        <p className="text-lg mb-2">Material: {product.material}</p>
      </div>
    </div>


  );
};

export async function getStaticPaths() {
  const paths = products.map((product) => ({
    params: { id: product.id.toString() },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const product = products.find((product) => product.id.toString() === params.id);
  return { props: { product } };
}

export default ProductPage;
