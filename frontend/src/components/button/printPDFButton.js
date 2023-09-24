import { Button } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import axios from 'axios';

const PrintPDFButton = ({ children, pdfUrl, ...props }) => {
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

  const handlePrint = () => {
    // 1st get the pdf data base64 using axios
    axios.get(pdfUrl, { responseType: 'arraybuffer' })
      .then((response) => {
        // 2nd convert the arraybuffer to base64
        const base64 = btoa(
          new Uint8Array(response.data).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            '',
          ),
        );

        // 3rd print the base64 to pdf using PrintJS
        window.printJS({ printable: base64, type: 'pdf', base64: true });
      });
  };

  return (
    <Button onClick={handlePrint} {...props}>{children}</Button>
  );
};

export default PrintPDFButton;
