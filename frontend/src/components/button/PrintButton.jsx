import { Button } from '@chakra-ui/react';
import React, { useEffect } from 'react';

const PrintButton = ({ children, order, ...props }) => {
  useEffect(() => {
    // Load the PrintJS library dynamically
    const script = document.createElement('script');
    script.src = '/assets/js/printjs.min.js'; // Replace with the correct URL
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Clean up by removing the script when the component unmounts
      document.body.removeChild(script);
    };
  }, []);

  const handlePrint = async () => {
    const orderResponse = await fetch(`/api/order/${order.id}`);
    const data = await orderResponse.json();
    order = {
      ...order,
      ...data.order,
    }
    window.printJS({ printable: await data.shipping.labelDatas, type: 'pdf', base64: true });
  };

  return (
    <Button onClick={handlePrint} {...props}>{children}</Button>
  );
};

export default PrintButton;
