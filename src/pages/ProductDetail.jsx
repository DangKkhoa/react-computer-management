import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'


const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchProductDetail = async () => { 
      const res = await axios.get(`http://localhost:3000/api/v1/products/${id}`, {
        withCredentials: true
      });

      console.log(res.data);

      if(res.status === 200) {
        setProduct(res.data.data);
      }
      else if(res.status === 404) {
        setErrorMessage(res.data.message);
      }
      else {
        setErrorMessage("Error while fetching product detail");
      }
    }

    fetchProductDetail();

  }, [])
  return (
    <>
      {product ? <main className='mt-2 p-6 w-full'>
        <div className='grid grid-cols-2'>
          <div>
            <h2 className='text-xl font-semibold'>{product.name} {product.id}</h2>
            <img src={`http://localhost:3000/uploads/${product.image}`} alt="" className='w-64'/>
            <input type="file" />
          </div>
          <div className='shadow-lg p-2'>
            <p className='text-lg font-semibold mb-4'>Thông số kỹ thuật</p>
            <table>
              <tbody>
                {Object.entries(product)
                .filter(([key]) => key != 'description')
                .map(([key, value]) => (
                  <tr key={key} className='p-4'>
                    <td className='p-2'>{key}</td>
                    <td className='p-2'>
                      <input 
                        className='w-full pl-2 float-right'
                        type="text" 
                        value={value}/>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className='col-span-full mt-4'>
            <p className='text-lg font-semibold text-amber-500'>Đặc điểm nổi bật</p>
            <textarea name="description" id="description" rows={6} value={product.description} className='w-full p-2 border-2 h-fit '></textarea>
          </div>

        </div>
      </main>
      :
      <div>{errorMessage}</div>
      }
    </>
  )
}

export default ProductDetail