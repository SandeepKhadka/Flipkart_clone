import { Fragment, useEffect, useState } from 'react'
import Banner from './Banner'
import Navbar from './Navbar'
import { Box, styled } from '@mui/material'
import { getProducts } from '../../redux/actions/productAction'

import { useDispatch, useSelector } from 'react-redux'
import Slider from './Slider'
import MidBanner from './MidBanner'


//images
// import topOffers from '../../assets/images/topOffers.png'
// import topDeals from '../../assets/images/topDeals.png';
// import new_styles from '../../assets/images/new_styles.png';
// import new_styles_him from '../../assets/images/new_styles_him.png';
// import deals from '../../assets/images/deals.png';
// import best_fashion from '../../assets/images/best_fashion.png';

import mid_banner_1 from '../../assets/images/mid_banner_1.png';
import mid_banner_2 from '../../assets/images/mid_banner_2.png';
import mid_banner_3 from '../../assets/images/mid_banner_3.png';
import MidSlider from './MidSlider'
import Header from '../header/Header'
import { getAllCategory } from '../../service/api'

const Component = styled(Box)`
  padding: 20px 10px;
  background: #F2F2F2;

`
const MidBannerWrapper = styled(Box)`
    display: flex;
    justify-content: space-between;
`

const Home = () => {
    const { products } = useSelector(state => state.getProducts)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getProducts())
    }, [dispatch])

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

    const uniqueCategoryNames = [...new Set(categories.map(category => category.name))];


    const scrollToSection = (sectionId) => {
        const section = document.getElementById(sectionId);
        console.log(section)
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <Fragment>
            <Header />
            <Navbar scrollToSection={scrollToSection} />
            <Component>
                <Banner />
                {uniqueCategoryNames.slice(0, 2).map((categoryName, index) => {
                    // Filter products for the current category
                    const categoryProducts = products.filter(product => product.category === categoryName);

                    // Check if there are products in this category
                    const hasProductsInCategory = categoryProducts.length > 0;

                    return hasProductsInCategory && (
                        <div key={categoryName}>
                            <section
                                id={`section-${categoryName.toLowerCase().replace(/\s+/g, '-')}`}
                            >
                                <MidSlider
                                    products={categoryProducts}
                                    rightBanner={categoryName === 'Top Offers'}
                                    title={categoryName}
                                    sectionId={`section-${categoryName.toLowerCase().replace(/\s/g, '-')}`}
                                />
                            </section>
                        </div>
                    );
                })}
                <MidBannerWrapper>
                    <MidBanner src={mid_banner_1} />
                    <MidBanner src={mid_banner_2} />
                    <MidBanner src={mid_banner_3} />
                </MidBannerWrapper>
                <MidBannerWrapper>
                    <MidBanner src={mid_banner_1} />
                    <MidBanner src={mid_banner_2} />
                    <MidBanner src={mid_banner_3} />
                </MidBannerWrapper>
                {uniqueCategoryNames.slice(2).map((categoryName, index) => {
                    // Filter products for the current category
                    const categoryProducts = products.filter(product => product.category === categoryName);

                    // Check if there are products in this category
                    const hasProductsInCategory = categoryProducts.length > 0;

                    return hasProductsInCategory && (
                        <div key={categoryName}>
                            <section
                                id={`section-${categoryName.toLowerCase().replace(/\s+/g, '-')}`}
                            >
                                <MidSlider
                                    products={categoryProducts}
                                    rightBanner={false}
                                    title={categoryName}
                                    sectionId={`section-${categoryName.toLowerCase().replace(/\s/g, '-')}`}
                                />
                            </section>
                        </div>
                    );
                })}
                <MidBannerWrapper>
                    <MidBanner src={mid_banner_1} />
                    <MidBanner src={mid_banner_2} />
                    <MidBanner src={mid_banner_3} />
                </MidBannerWrapper>
            </Component>


        </Fragment>
    )
}

export default Home
