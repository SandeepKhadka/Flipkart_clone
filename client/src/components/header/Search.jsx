import { Box, InputBase, List, ListItem, Typography, styled } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filteredCategory, getProducts, sortProducts } from '../../redux/actions/productAction';
import { Link, useNavigate } from 'react-router-dom';

const SearchContainer = styled(Box)`
    background: #fff;
    width: 38%;
    border-radius: 2px;
    margin-left: 10px;
    display: flex;
`
const InputSearch = styled(InputBase)`
    padding-left: 20px;
    width: 100%;
`
const SearchIconWrapper = styled(Box)`
    color: blue;
    padding: 5px;
    display: flex;
`

const SearchList = styled(Box)`
    position: absolute;
    margin-top: 30px;
    background: white;
    width: 100%;
    padding-left: 20px;
`

const Search = () => {

    const [text, setText] = useState();

    const getText = (e) => {
        setText(e)
    }

    const { products } = useSelector(state => state.getProducts)
    const navigate = useNavigate()

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProducts())
    }, [dispatch])

    const filterCategory = (searchText, productCategory) => {
        console.log('i am clicked')
        dispatch(filteredCategory([searchText, productCategory]))
        dispatch(sortProducts('', [searchText, productCategory], '', ''))
            .then(() => {
                setText('');
                // Now you can navigate or perform other actions.
            });
        // navigate('/products')
    }
    return (
        <SearchContainer>
            <InputSearch
                placeholder='Search for products, brands and more' value={text} onChange={(e) => getText(e.target.value)} />
            {
                text && <SearchList>
                    <List >
                        {
                            products.filter((product) => product.subCategory.toLowerCase().includes(text.toLowerCase())).map((p) => (
                                <ListItem style={{ color: 'black' }}>
                                    <Link to="/products" onClick={async () => {
                                        await filterCategory(text, p.subCategory);
                                    }} style={{ textDecoration: 'none', color: 'inherit' }}>
                                        {p.subCategory}
                                    </Link>
                                </ListItem>
                            ))
                        }
                        {/* {
                            products.filter((product) => product.title.longTitle.toLowerCase().includes(text.toLowerCase())).map((p) => (
                                <ListItem style={{ color: 'black' }}>
                                    <Link to={`/product/${p.id}`} onClick={() => setText('')} style={{ textDecoration: 'none', color: 'inherit' }}>
                                        {p.title.longTitle}
                                    </Link>
                                </ListItem>
                            ))
                        } */}
                    </List>
                </SearchList>
            }
            <SearchIconWrapper>
                <Link to="/products" onClick={async () => {
                    await filterCategory(text, text);
                }} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <SearchIcon />
                </Link>
            </SearchIconWrapper>
        </SearchContainer >
    )
}

export default Search
