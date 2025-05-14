import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Input from '../components/Input'
import { ChevronLeft, ChevronRight, Eye, PackagePlus, Trash } from 'lucide-react'
import Search from '../components/Search'
import Button from '../components/Button'
import Modal from '../components/Modal'
import axios from 'axios'
import { Navigate, Outlet, useNavigate, useParams } from 'react-router'
import { toast, ToastContainer } from 'react-toastify'

const PRODUCTS = [
  {
    id: 1,
    name: 'Product 1',
    quantity: 10,
    price: 100,
    isInStock: true,
  },
  {
    id: 2,
    name: 'Product 2',
    quantity: 5,
    price: 50,
    isInStock: false,
  },
  {
    id: 3,
    name: 'Product 3',
    quantity: 20,
    price: 200,
    isInStock: true,
  }
  ,
  {
    id: 4,
    name: 'Product 4',
    quantity: 0,
    price: 150,
    isInStock: false,
  },
  {
    id: 5,
    name: 'Product 5',
    quantity: 30,
    price: 300,
    isInStock: true,
  },
  {
    id: 6,
    name: 'Product 6',
    quantity: 15,
    price: 120,
    isInStock: true,
  },
  {
    id: 7,
    name: 'Product 7',
    quantity: 8,
    price: 80,
    isInStock: false,
  },
  {
    id: 8,
    name: 'Product 8',
    quantity: 12,
    price: 90,
    isInStock: true,
  },
  {
    id: 9,
    name: 'Product 9',
    quantity: 25,
    price: 250,
    isInStock: true,
  },
  {
    id: 10,
    name: 'Product 10',
    quantity: 0,
    price: 60,
    isInStock: false,
  }
  ,
  {
    id: 11,
    name: 'Product 11',
    quantity: 18,
    price: 180,
    isInStock: true,
  },
  {
    id: 12,
    name: 'Product 12',
    quantity: 7,
    price: 70,
    isInStock: false,
  },
  {
    id: 13,
    name: 'Product 13',
    quantity: 22,
    price: 220,
    isInStock: true,
  },
  {
    id: 14,
    name: 'Product 14',
    quantity: 3,
    price: 30,
    isInStock: false,
  },
  {
    id: 15,
    name: 'Product 15',
    quantity: 28,
    price: 280,
    isInStock: true,
  }
  ,
  {
    id: 16,
    name: 'Product 16',
    quantity: 11,
    price: 110,
    isInStock: true,
  },
  {
    id: 17,
    name: 'Product 17',
    quantity: 6,
    price: 60,
    isInStock: false,
  },
  {
    id: 18,
    name: 'Product 18',
    quantity: 14,
    price: 140,
    isInStock: true,
  },
  {
    id: 19,
    name: 'Product 19',
    quantity: 9,
    price: 90,
    isInStock: false,
  },
  {
    id: 20,
    name: 'Product 20',
    quantity: 17,
    price: 170,
    isInStock: true,
  }
  ,
  {
    id: 21,
    name: 'Product 21',
    quantity: 4,
    price: 40,
    isInStock: false,
  },
  {
    id: 22,
    name: 'Product 22',
    quantity: 19,
    price: 190,
    isInStock: true,
  },
  {
    id: 23,
    name: 'Product 23',
    quantity: 2,
    price: 20,
    isInStock: false,
  },
  {
    id: 24,
    name: 'Product 24',
    quantity: 26,
    price: 260,
    isInStock: true,
  }
]

const Inventory = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    document.title = "Inventory" ;
    const fetchProducts = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/v1/products', {
          withCredentials: true
        })

        if(res.status === 200) {
          console.log(res.data);
          setProducts(res.data.data);
        }
      }
      catch(err) {
        console.error(err);
        alert("Error fetching products");
      }
    }
    fetchProducts();
  }, [])

  useEffect(() => {
    setFilteredProducts(products);
  }, [products])

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  const [prompt, setPrompt] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  
  
  const searchProducts = (e) => {
    const term = e.target.value.toLowerCase();
    
    console.log(term);
    
    const searchResults =products.filter(product => product.name.toLowerCase().includes(term));
    setFilteredProducts(searchResults);
  }

  const submitPrompt = () => {
    axios.post('http://localhost:3000/api/v1/ai/products', { prompt }, { withCredentials: true })
  }

  const handleDeleteProduct = (id, name) => {
    setSelectedProduct({id, name});
    setIsModalOpen(true);
  }

  const handleConfirmDelete = async () => {

    try {
      const res = await axios.delete(`http://localhost:3000/api/v1/products/${selectedProduct.id}`, {
        withCredentials: true
      });
      console.log(res.data);
      if(res.status === 200) {
        const updatedProducts = products.filter(p => p.id !== selectedProduct.id);
        setFilteredProducts(updatedProducts);
        toast.success('Xóa sản phẩm thành công', {
          hideProgressBar: true,
          autoClose: 2000
        });
      }
      else {
        toast.success('Có lỗi khi xóa sản phẩm. Vui lòng thử lại sau', {
          hideProgressBar: true,
          autoClose: 2000
        });
      }
    }
    catch(err) {
      console.error(err);
      toast.success('Có lỗi khi xóa sản phẩm. Vui lòng thử lại sau', {
          hideProgressBar: true,
          autoClose: 2000
        });
    }
    setIsModalOpen(false);
    
  }
  const handleCancelDelete = () => {
    setIsModalOpen(false);
  }

  return (
    <div>
      <Header title="Quản lí kho"/>

      {id ? <Outlet /> : 
        <main className='mt-6 p-6 w-full'>
          <div className='flex justify-between items-center mb-6'>
            <div className='flex items-center gap-4'>
              <Search 
                placeholder="Nhập tên / id sản phẩm"
                data={products}
                setData={setFilteredProducts}
              />
              {/* <button className='text-blue-500'><PackagePlus /></button> */}
              <Button 
                icon={<PackagePlus />}
                className={"text-blue-500"}
                tooltip={"Add Product"}
                onClick={() => navigate('/inventory/add')}
              />
              <div>
                <input 
                  type="text" 
                  placeholder='Điển prompt...'
                  value={prompt}
                  onChange={() => setPrompt(e.target.value)}
                  className='ring-1 ring-gray-300 p-2 w-96 focus:ring-2 focus:ring-blue-500 focus:outline-none'
                />
                <button onClick={submitPrompt}>TÌm</button>
              </div>
            </div>
            <div className='flex items-center'>
              <button 
                className={`px-4 py-2 ${currentPage === 1 ? "text-blue-200 pointer-events-none" : "text-blue-500 hover:text-blue-700"}`}
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => prev - 1)}
              >
                <ChevronLeft />
              </button>
              <span className='mx-4'>Page {currentPage} of {totalPages}</span>
              <button 
                className={` px-4 py-2 ${currentPage === totalPages ? "text-blue-200 pointer-events-none" : "text-blue-500 hover:text-blue-700"}`}
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(prev => prev + 1)}
              >
                <ChevronRight />
                
              </button>
              
            </div>
              
          </div>
          <div className='w-full overflow-auto'>
            <table className='w-full text-nowrap min-w-96'>
              <thead>
                <tr>
                  <th className='border-b border-gray-300 group text-left py-4'>Tên sàn phẩm</th>
                  <th className='border-b border-gray-300 group text-left py-4'>Số lượng</th>
                  <th className='border-b border-gray-300 group text-left py-4'>Giá bán</th>
                  <th className='border-b border-gray-300 group text-left py-4'>Trạng thái</th>
                  <th className='border-b border-gray-300 group text-left py-4'>Hành động</th>
                </tr>
              </thead>
              <tbody>
                {currentProducts.map(product => (
                  <tr key={product.id} className='group hover:shadow-[0px_-1px_10px_rgba(0,0,0,0.25)] transition-all duration-300'>
                    <td className='border-b border-gray-300 py-4 group-hover:border-none'>{product.name}</td>
                    <td className='border-b border-gray-300 py-4 group-hover:border-none'>{product.quantity}</td>
                    <td className='border-b border-gray-300 py-4 group-hover:border-none'>{product.retailed_price.toLocaleString()}</td>
                    <td className='border-b border-gray-300 py-4 group-hover:border-none'>
                      <span className={`p-2 ${product.quantity > 0 ? "bg-gradient-to-bl from-green-200 to-white text-green-600" : "bg-gradient-to-br from-red-200 to-white text-red-600"}`}>{product.quantity > 0 ? "Còn hàng" : "Hết hàng"}</span>
                    </td>
                    <td className='border-b border-gray-300 py-4 group-hover:border-0 flex items-center'>
                      <a href={`/inventory/${product.id}`} className='text-blue-500  hover:text-blue-600 transition-all duration-200 hover:scale-110'><Eye /></a>
                      <button 
                        className='text-red-500 hover:text-red-600 ml-2 transition-all duration-200 hover:scale-110'
                        onClick={() => handleDeleteProduct(product.id, product.name)}>
                          <Trash />
                      </button>
                    </td>
                  </tr>
                ))} 
              </tbody>
            </table>
          </div>
          {isModalOpen && (
            <Modal 
              isOpen={isModalOpen}
              title="Xóa sản phẩm"
              message={`Xóa sản phẩm ${selectedProduct.name} ra khỏi hệ thống ?`}
              onClose={() => setIsModalOpen(false)}
              onConfirm={handleConfirmDelete}
              onCancel={handleCancelDelete}
            />
          )}
          <ToastContainer />
        </main>
      }
    </div>
  )
}

export default Inventory