import * as React from 'react';
import { useParams } from 'react-router-dom';
import Header from '../Header/Header';
import { getProductById } from '../../Recoil/Atoms/products';
import '../../assets/scss/productdetail.css';
import IamportPayment from '../../IamportPayment/IamportPayment';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  imageUrl: string;
}

const ProductDetail: React.FC = () => {
  const [product, setProduct] = React.useState<Product | null>(null);
  const { id: productId } = useParams<{ id: string }>();

  const fetchProductDetail = async (id: number) => {
    const productData = await getProductById(id);
    setProduct(productData);
  };

  React.useEffect(() => {
    fetchProductDetail(Number(productId));
  }, [productId]);

  return (
    <div className='mainContainer'>
      <Header textColor={'#4caf50'}></Header>
      {product ? (
        <>
          <div className="productDetail">
            <img
              src={process.env.PUBLIC_URL + product.imageUrl}
              alt={product.name}
              style={{ width: '300px', height: '300px' }}
            ></img>
            <div className="productInfo">
              <h2>{product.name}</h2>
              <p>{product.description}</p>
              <p className="productPrice">${product.price}</p>
              <IamportPayment product={product} pg={"kakaopay.TC0ONETIME"} />
              <IamportPayment product={product} pg={"html5_inicis.INIBillTst"} />
            </div>
          </div>
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default ProductDetail;