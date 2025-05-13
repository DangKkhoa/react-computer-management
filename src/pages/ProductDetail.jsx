import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'


const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleValueChange = (e) => {
    const { name, value } = e.target;
    setProduct(prev => ({
      ...prev, 
      [name]: value
    }))
  }

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
            <table className='table-fixed'>
              <tbody>
                <tr className='p-4'>
                  <td className='p-2 w-[200px] font-semibold'>ID</td>
                  <td className='p-2 w-3/4'>
                    <input 
                      type="text" 
                      name='id'
                      value={product.id} 
                      className='w-full text-right px-2' 
                      onChange={handleValueChange}/>
                  </td>
                </tr>
                <tr className='p-4'>
                  <td className='p-2 w-[200px] font-semibold'>Tên sản phẩm</td>
                  <td className='p-2 w-3/4'>
                    <input 
                      type="text" 
                      name="name" 
                      value={product.name} 
                      className='w-full px-2 text-right'
                      onChange={handleValueChange}/>
                  </td>
                </tr>
                <tr className='p-4'>
                  <td className='p-2 font-semibold'>Ngày nhập</td>
                  <td className='px-4 py-2 w-3/4 text-right '>{new Date(product.created_at).toLocaleString()}</td>
                </tr>
                <tr className='p-4'>
                  <td className='p-2 font-semibold'>Giá nhập</td>
                  <td className='p-2 w-3/4'>
                    <input 
                      type="text" 
                      name='imported_price'
                      value={product.imported_price.toLocaleString()} 
                      className='w-full text-right px-2' 
                      onChange={handleValueChange}/>
                  </td>
                </tr>
                <tr className='p-4'>
                  <td className='p-2 font-semibold'>Giá bán</td>
                  <td className='p-2'>
                    <input 
                      type="text" 
                      name='retailed_price'
                      value={product.retailed_price.toLocaleString()} 
                      className='w-full text-right px-2' 
                      onChange={handleValueChange}/>
                  </td>
                </tr>
                <tr className='p-4'>
                  <td className='p-2 font-semibold'>Danh mục</td>
                  <td className='px-4 py-2 w-3/4 text-right'>{product.category}</td>
                </tr>
                <tr className='p-4'>
                  <td className='p-2 font-semibold'>CPU</td>
                  <td className='p-2 w-3/4'>
                    <input 
                      type="text" 
                      name='cpu'
                      value={product.cpu} 
                      className='w-full text-right px-2' 
                      onChange={handleValueChange}/>
                  </td>
                </tr>
                <tr className='p-4'>
                  <td className='p-2 font-semibold'>RAM</td>
                  <td className='p-2 w-3/4'>
                    <input 
                      type="text" 
                      name='ram'
                      value={product.ram} 
                      className='w-full text-right px-2' 
                      onChange={handleValueChange}/>
                  </td>
                </tr>
                <tr className='p-4'>
                  <td className='p-2 font-semibold'>Bộ nhớ</td>
                  <td className='p-2 w-3/4'>
                    <input 
                      type="text" 
                      name='storage'
                      value={product.storage} 
                      className='w-full text-right px-2'  
                      onChange={handleValueChange}/>
                  </td>
                </tr>
                <tr className='p-4'>
                  <td className='p-2 w-[200px] font-semibold'>Màn hình</td>
                  <td className='p-2'>
                    <input 
                      type="text" 
                      name="screen"
                      value={product.screen} 
                      className='w-full px-2 text-right' 
                      onChange={handleValueChange}/>
                  </td>
                </tr>
                <tr className='p-4'>
                  <td className='p-2 w-[200px] font-semibold'>Card đồ họa</td>
                  <td className='p-2'>
                    <input 
                      type="text" 
                      value={product.gpu}
                      name="gpu"
                      className='w-full px-2 text-right'
                      onChange={handleValueChange}/>
                  </td>
                </tr>

              </tbody>
            </table>
          </div>

          <div className='col-span-full mt-4'>
            <p className='text-lg font-semibold text-amber-500'>Đặc điểm nổi bật</p>
            <textarea 
              name="description" 
              id="description" 
              rows={6} 
              value={product.description} 
              className='w-full p-2 border-2' 
              onChange={handleValueChange}/>
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