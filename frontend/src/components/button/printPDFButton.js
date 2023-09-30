import { Button } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import axios from 'axios';

const PrintPDFButton = ({ children, order, ...props }) => {
  useEffect(() => {
    // Load the PrintJS library dynamically
    const script = document.createElement('script');
    script.src = 'https://printjs-4de6.kxcdn.com/print.min.js'; // Replace with the correct URL
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Clean up by removing the script when the component unmounts
      document.body.removeChild(script);
    };
  }, []);

  // get the base64 string from the backend API /api/order/:id/shippinglabel
  const [base64, setBase64] = React.useState('');
  useEffect(() => {
    const getBase64 = async () => {
      const { data } = await axios.get(`/api/order/${order._id}/shippinglabel`);
      setBase64(data);
    };
    getBase64();
  }, [order]);

  const handlePrint = () => {
      window.printJS({ printable: base64, type: 'pdf', base64: true });
  };

  return (
    <Button onClick={handlePrint} {...props}>{children}</Button>
  );
};

export default PrintPDFButton;
