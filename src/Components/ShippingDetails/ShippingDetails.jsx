import axios from 'axios';
import { useFormik } from 'formik';
import React from 'react';
import { useParams } from 'react-router-dom';
import * as Yup from 'yup';

export default function ShippingDetails() {
    const headerOptions = {
        headers: {
            token: localStorage.getItem('token')
        },
    };
    
    const validationForm = Yup.object({
        city: Yup.string()
            .min(2, 'City must be at least 2 characters')
            .required('City is required'),
        details: Yup.string()
            .min(5, 'Details must be at least 5 characters')
            .required('Details are required'),
        phone: Yup.string()
            .matches(/^01[0-9]{9}$/, 'Phone number must be a valid Egyptian number')
            .required('Phone number is required'),
    });
    
    let { id } = useParams();
    
    let shippingForm = useFormik({
        initialValues: {
            city: '',
            details: '',
            phone: ''
        },
        onSubmit: checkOutSession,
        validationSchema: validationForm
    });

    function checkOutSession(values) {
        let data = { shippingAddress: values };
        let currentUrl = window.location.origin;
        axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}?url=${currentUrl}`, data, headerOptions)
            .then((req) => {
                window.open(req.data.session.url, '_self');
            });
    }
    
    return (
        <div className='w-full max-w-lg mx-auto my-10 p-6 bg-white shadow-lg rounded-lg mt-28'>
            <h1 className='text-3xl font-semibold text-main text-center mb-6'>Shipping Form</h1>
            <form onSubmit={shippingForm.handleSubmit} className='space-y-5'>
                {['details', 'city', 'phone'].map((field) => (
                    <div key={field} className='w-full'>
                        <label htmlFor={field} className='block text-sm font-medium text-gray-700 capitalize'>
                            Your {field}
                        </label>
                        <input
                            value={shippingForm.values[field]}
                            onChange={shippingForm.handleChange}
                            onBlur={shippingForm.handleBlur}
                            type={field === 'phone' ? 'tel' : 'text'}
                            id={field}
                            name={field}
                            className={`w-full p-3 border rounded-lg text-gray-900 focus:ring-blue-500 focus:border-blue-500 transition-all ${shippingForm.errors[field] && shippingForm.touched[field] ? 'border-red-500' : 'border-gray-300'}`}
                        />
                        {shippingForm.touched[field] && shippingForm.errors[field] && (
                            <p className='text-red-500 text-sm mt-1'>{shippingForm.errors[field]}</p>
                        )}
                    </div>
                ))}
                <button
                    disabled={!(shippingForm.isValid && shippingForm.dirty)}
                    className='w-full py-3 bg-main text-white font-semibold rounded-lg transition-all disabled:opacity-50 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300'>
                    Proceed to Payment
                </button>
            </form>
        </div>
    );
}
