import React, { useEffect, useState } from 'react';
import {
    Box,
    styled,
    Slider,
    Typography,
    Checkbox,
    FormControlLabel,
    FormGroup,
    Select,
    MenuItem,
    Grid,
    Button,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts, sortProducts } from '../../redux/actions/productAction';
import { Link } from 'react-router-dom';
import Header from '../header/Header';

const Wrapper = styled(Box)(({ theme }) => ({
    display: 'flex',
    background: '#F2F2F2',
    padding: '10px 10px',
    height: '100%',
}));

const FilterContainer = styled(Box)(({ theme }) => ({
    flex: 1,
    background: '#ffffff',
    padding: '20px',
    maxWidth: '270px', // Limit the width to 270px
    border: '1px solid #fff2f2',
    marginRight: '10px',
    '& > p ': {
        marginBottom: '5px',
    },
}));

const ProductContainer = styled(Box)(({ theme }) => ({
    flex: 3,
    backgroundColor: '#ffffff',
    padding: '20px',
}));

const GreyHorizontalLine = styled('hr')(({ theme }) => ({
    border: '1px solid #d2d1d1',
    marginTop: '20px',
    marginBottom: '20px'
}))

const SortingDropdownContainer = styled(Box)(({ theme }) => ({
    float: 'right',
    display: 'block',
    padding: '10px',
    zIndex: '1',
    backgroundColor: '#fff',
}));

const ProductItem = styled(Grid)(({ theme }) => ({
    border: '1px solid #ccc',
    borderRadius: '5px',
    padding: '10px',
    margin: '10px',
    minHeight: '200px', // Set a minimum height to ensure consistent appearance
    position: 'relative', // Enable absolute positioning of the price
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between', // Push the price to the bottom
}));

const ProductImage = styled('img')(({ theme }) => ({
    maxWidth: '100%',
    height: '200px',
    objectFit: 'contain', // Maintain aspect ratio while fitting the image within the container
}));

const ProductPrice = styled(Typography)(({ theme }) => ({
    position: 'absolute',
    bottom: '0',
    left: '0',
    right: '0',
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent white background for readability
    padding: '4px',
    fontSize: '14px',
    fontWeight: 'bold',
    borderTopLeftRadius: '5px',
    borderTopRightRadius: '5px',
    textAlign: 'center',
}));

const PriceFilter = styled(Box)(({ theme }) => ({
    display: 'flex'
}));

const FilterProduct = () => {
    let { sortedProducts, products } = useSelector(state => state.getProducts);
    let { filter } = useSelector(state => state.filteredCategory);

    const dispatch = useDispatch()

    const initialMinPrice = Math.min(...products.map(product => product.price.cost));
    const initialMaxPrice = Math.max(...products.map(product => product.price.cost));

    const [priceRange, setPriceRange] = useState([initialMinPrice, initialMaxPrice]);
    const [selectedCategory, setSelectedCategory] = useState(filter);
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [selectedColors, setSelectedColors] = useState([]);
    const [minPrice, setMinPrice] = useState();
    const [maxPrice, setMaxPrice] = useState();

    const [selectedSort, setSelectedSort] = useState('default');
    // if (filter && filter.length > 0) {
    //     setSelectedCategory(filter)
    // }
    const handleCategoryChange = (event) => {
        const newCategory = [event.target.value, ''];
        setSelectedCategory([event.target.value, '']);
        dispatch(sortProducts(selectedSort, newCategory, maxPrice, minPrice)); // Then, dispatch the sorting action
    };

    const handleBrandChange = (event) => {
        const brand = event.target.name;
        setSelectedBrands((prevSelectedBrands) =>
            prevSelectedBrands.includes(brand)
                ? prevSelectedBrands.filter((item) => item !== brand)
                : [...prevSelectedBrands, brand]
        );
    };

    const handleColorChange = (event) => {
        const color = event.target.name;
        setSelectedColors((prevSelectedColors) =>
            prevSelectedColors.includes(color)
                ? prevSelectedColors.filter((item) => item !== color)
                : [...prevSelectedColors, color]
        );
    };

    const handleSortChange = (event) => {
        const newSort = event.target.value;
        setSelectedSort(newSort); // Update selectedSort first
        console.log(maxPrice, minPrice)
        dispatch(sortProducts(newSort, selectedCategory, maxPrice, minPrice)); // Then, dispatch the sorting action
    };

    const filterPrice = () => {
        if (maxPrice >= 0 && minPrice >= 0) {
            dispatch(sortProducts(selectedSort, selectedCategory, maxPrice, minPrice)); // Then, dispatch the sorting action
        }
    }

    // useEffect(() => {
    //     dispatch(getProducts()); // Fetch products initially
    // }, [dispatch]);

    return (
        <Wrapper>
            <Header />
            <FilterContainer>
                <Typography style={{ fontSize: '18px' }}>Filters</Typography>
                <GreyHorizontalLine />
                <Typography>Category</Typography>
                <Select
                    value={selectedCategory?.[0] ?? 'All'}
                    onChange={handleCategoryChange}
                    style={{ width: '100%', height: '40px' }}
                >
                    <MenuItem value="All">All</MenuItem>
                    <MenuItem value="Electronics">Electronics</MenuItem>
                    <MenuItem value="Clothing">Clothing</MenuItem>
                    <MenuItem value="Books">Books</MenuItem>
                </Select>
                <GreyHorizontalLine />
                <Typography>Price Range</Typography>
                <Slider
                    value={priceRange}
                    onChange={(_, newValue) => {
                        setPriceRange(newValue)
                        setMinPrice(newValue[0]);
                        setMaxPrice(newValue[1]);
                    }}
                    valueLabelDisplay="auto"
                    min={0}
                    max={initialMaxPrice}
                />
                <PriceFilter>
                    <input
                        type="number"
                        value={minPrice}
                        onChange={(e) => {
                            let newMinPrice = parseFloat(e.target.value);
                            // Ensure the newMinPrice is within the valid range (0 to maxPrice)
                            if (isNaN(newMinPrice) || newMinPrice < 0) {
                                newMinPrice = '';
                            } else if (newMinPrice > maxPrice) {
                                newMinPrice = maxPrice;
                            }
                            setMinPrice(newMinPrice);
                        }}
                        max={maxPrice} // Set the max attribute for the input
                        placeholder='Min'
                        style={{ width: '50px', height: '20px', marginRight: '20px', textAlign: 'center', padding: '10px' }}
                    />
                    -
                    <input
                        type="number"
                        value={maxPrice}
                        onChange={(e) => {
                            let newMaxPrice = parseFloat(e.target.value);
                            // Ensure the newMaxPrice is within the valid range (0 to initialMaxPrice)
                            if (isNaN(newMaxPrice) || newMaxPrice <= 0) {
                                newMaxPrice = '';
                            } else if (newMaxPrice > initialMaxPrice) {
                                newMaxPrice = initialMaxPrice;
                            }
                            setMaxPrice(newMaxPrice);
                        }}
                        max={initialMaxPrice} // Set the max attribute for the input
                        placeholder='Max'
                        style={{ width: '50px', height: '20px', marginLeft: '20px', textAlign: 'center', padding: '10px' }}
                    />
                    <Button variant='contained' style={{ marginLeft: '20px', }} onClick={() => { filterPrice() }}>Filter</Button>
                </PriceFilter>
                <GreyHorizontalLine />
                <Typography>Brands</Typography>
                <FormGroup>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={selectedBrands.includes('Brand1')}
                                onChange={handleBrandChange}
                                name="Brand1"
                            />
                        }
                        label="Brand 1"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={selectedBrands.includes('Brand2')}
                                onChange={handleBrandChange}
                                name="Brand2"
                            />
                        }
                        label="Brand 2"
                    />
                </FormGroup>
                <GreyHorizontalLine />
                <Typography>Colors</Typography>
                <FormGroup>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={selectedColors.includes('Red')}
                                onChange={handleColorChange}
                                name="Red"
                            />
                        }
                        label="Red"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={selectedColors.includes('Blue')}
                                onChange={handleColorChange}
                                name="Blue"
                            />
                        }
                        label="Blue"
                    />
                </FormGroup>
                <GreyHorizontalLine />
            </FilterContainer>
            <ProductContainer>
                <SortingDropdownContainer>
                    <Typography variant="body2">Sort By:</Typography>
                    <Select
                        value={selectedSort}
                        onChange={handleSortChange}
                        style={{ minWidth: '200px', height: '40px' }}
                    >
                        <MenuItem value="default">Best Match</MenuItem>
                        <MenuItem value="price-low-to-high">Price: Low to High</MenuItem>
                        <MenuItem value="price-high-to-low">Price: High to Low</MenuItem>
                        {/* Add more sorting options as needed */}
                    </Select>
                </SortingDropdownContainer>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px' }}>
                    <Typography style={{ fontSize: '25px' }}>Product Result</Typography>
                </div>
                <Grid container spacing={2}>
                    {(sortedProducts.length > 0 ? sortedProducts : products).map((product, index) => (
                        <Grid item key={index} xs={12} sm={6} md={4} lg={3} xl={3}>
                            <Link to={`/product/${product.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                                <ProductItem>
                                    {product.image && product.image !== '' ?
                                        <ProductImage src={product.image} alt="products" key={index} />
                                        :
                                        <ProductImage src={product.url} alt="products" key={index} />
                                    }
                                    <ProductPrice>रु{product.price.cost}</ProductPrice>
                                </ProductItem>
                            </Link>
                        </Grid>
                    ))}
                </Grid>
            </ProductContainer>
        </Wrapper>
    );
};

export default FilterProduct;
