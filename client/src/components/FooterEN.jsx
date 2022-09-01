import React from 'react';
import { Box, Link } from '@mui/material';

const Footer = () => {
  return (
    <Box pt={1} pb={1} style={{ background: '#abdbd9' }}>
        <Link underline="hover" variant="body2" color="primary" href="/about-en">About Us</Link>
    </Box>
  )
}

export default Footer;