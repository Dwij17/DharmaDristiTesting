import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

function Orders() {
  const { backendUrl, token, currency } = useContext(ShopContext);

  const [orderData, setorderData] = useState([])

  const loadOrderData = async () => {
    try{
      if(!token){
        return null
      }

      const response = await axios.post(backendUrl + '/api/order/userorders',{},{headers:{token}})
      if(response.data.success) {
        let allOrdersItem = []
        response.data.orders.map((order)=>{
          order.items.map((item)=>{
            item['status'] = order.status
            item['payment'] = order.payment
            item['paymentMethod'] = order.paymentMethod
            item['date'] = order.date
            allOrdersItem.push(item)
          })
        })
        setorderData(allOrdersItem.reverse())
      }
    } catch (error) {

    }
  }

  useEffect(()=>{
    loadOrderData()
  },[token])
  return (
    <div className='border-t pt-16'>
      <div className='text-2xl'>
        <Title text1={'MY'} text2={'ORDERS'} />
      </div>

      <div>
        {orderData.map((item, index) => (
          <div
            key={index}
            className='py-4 border-t text-gray-700 flex flex-col md:flex-row md:items-center gap-4'
          >
            {/* Left: Product Info */}
            <div className='flex items-start gap-6 flex-[1]'>
              <img className='w-16 sm:w-20' src={item.image[0]} alt='' />
              <div>
                <p className='sm:text-base font-medium'>{item.name}</p>
                <div className='flex items-center gap-3 mt-2 text-base text-gray-700'>
                  <p className='text-lg'>{currency}{item.price}</p>
                  <p>Quantity: {item.quantity}</p>
                </div>
                <p className='mt-2'>Date: <span className='text-gray-400'>{new Date(item.date).toDateString()}</span></p>
                <p className='mt-2'>Payment: <span className='text-gray-400'>{item.paymentMethod}</span></p>
              </div>
            </div>

            {/* Center: Ready to Ship */}
            <div className='flex justify-center items-center flex-[1]'>
              <div className='flex items-center gap-2'>
                <span className='w-2 h-2 rounded-full bg-green-500'></span>
                <span className='text-sm md:text-base'>{item.status}</span>
              </div>
            </div>

            {/* Right: Track Order */}
            <div className='flex justify-end flex-[1]'>
              <button onClick={loadOrderData}className='border px-4 py-2 text-sm font-medium rounded-sm'>
                Track Order
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Orders;