import React, { useEffect, useRef, useState } from 'react';
import { navData } from '../constants/data';
import { Box, Typography, styled } from '@mui/material';
import { getAllCategory } from '../../service/api';

const Component = styled(Box)(({ theme }) => ({
    display: 'flex',
    margin: '55px 130px 0 130px',
    justifyContent: 'space-between',
    [theme.breakpoints.down('xl')]: {
        justifyContent: 'space-center',
        margin: '5px 15px 0 5px',
    },
    [theme.breakpoints.down('md')]: {
        margin: '5px 15px 0 15px',
    },
}));

const Container = styled(Box)(({ theme }) => ({
    padding: '12px 8px',
    textAlign: 'center',
}));

const Text = styled(Typography)`
    font-size: 14px;
    font-family: inherit;
    font-weight: 600;
`;

const ScrollableNavbar = styled(Box)(({ theme }) => ({
    [theme.breakpoints.down('md')]: {
        overflowX: 'hidden',
        whiteSpace: 'nowrap',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        touchAction: 'pan-y',
        userSelect: 'none',
        cursor: 'grab', // Change cursor to "grab" on hover
    },
}));

const Navbar = ({ scrollToSection }) => {
    const scrollContainerRef = useRef(null);
    const [startX, setStartX] = useState(null);

    const [categories, setCategories] = useState([]);
    useEffect(() => {
        async function fetchCategories() {
            try {
                const response = await getAllCategory();
                if (response.status === 200) {
                    setCategories(response.data);
                } else {
                    console.error('Error fetching categories:', response);
                }
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        }

        fetchCategories();
    }, []);

    const handleMouseDown = (event) => {
        setStartX(event.clientX);
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
        document.body.style.cursor = 'grabbing'; // Change cursor to "grabbing"
    };

    const handleMouseMove = (event) => {
        if (startX === null) return;

        const container = scrollContainerRef.current;
        const currentX = event.clientX;
        const deltaX = startX - currentX;

        if (container) {
            container.scrollLeft += deltaX;
        }

        setStartX(currentX);
    };

    const handleMouseUp = () => {
        setStartX(null);
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        document.body.style.cursor = 'default'; // Restore default cursor
    };


    const handleTouchStart = (event) => {
        setStartX(event.touches[0].clientX);
    };

    const handleTouchMove = (event) => {
        if (startX === null) return;

        const container = scrollContainerRef.current;
        const currentX = event.touches[0].clientX;
        const deltaX = startX - currentX;

        if (container) {
            container.scrollLeft += deltaX;
        }

        setStartX(currentX);
    };

    const handleTouchEnd = () => {
        setStartX(null);
    };


    const handleCategoryClick = (categoryName) => {
        // Determine the sectionId based on the categoryName
        console.log('I am clicked', categoryName);
        let sectionId = `section-${categoryName.toLowerCase().replace(/\s/g, '-')}`;

        // Call the scrollToSection callback to scroll to the section
        if (sectionId) {
            scrollToSection(sectionId);
        }
    };

    const basePath = 'categories_image/';
    return (
        <ScrollableNavbar
            ref={scrollContainerRef}
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
            <Component>
                {categories.map(category => (
                    <Container key={category.name} style={{ cursor: 'pointer' }} onClick={() => handleCategoryClick(category.name)}>
                        <img src={`${basePath}${category.img}`} alt="nav" style={{ width: 64 }} />
                        <Text>{category.name}</Text>
                    </Container>
                ))}
            </Component>
        </ScrollableNavbar>
    );
};

export default Navbar;
