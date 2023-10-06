import React, { useState } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td, Box, Button, Text, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useDisclosure, styled, FormControl, FormLabel, Input, FormHelperText, VStack, HStack, Textarea } from '@chakra-ui/react'; // Import Chakra UI table components
import DashboardLayout from '../DashboardLayout';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getProducts } from '../../../../client/src/redux/actions/productAction';
import { BsFillPencilFill } from 'react-icons/bs';
import { BiSolidTrashAlt } from 'react-icons/bi';
import { AiFillEye } from 'react-icons/ai';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import axios from 'axios';


const Product = () => {
    const { products } = useSelector(state => state.getProducts);
    const dispatch = useDispatch();

    // const { isOpen, onOpen, onClose } = useDisclosure()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isUpdateMode, setIsUpdateMode] = useState(false);
    const [isViewMode, setIsViewMode] = useState(false);
    const [success, setSuccess] = useState(0);

    //setting error
    const [longTitleError, setLongTitleError] = useState('');
    const [shortTitleError, setShortTitleError] = useState('');
    const [categoryError, setCategoryError] = useState('');
    const [subCategoryError, setSubCategoryError] = useState('');
    const [imageError, setImageError] = useState('');
    const [descriptionError, setDescriptionError] = useState('');
    const [mrpError, setMrpError] = useState('');
    const [costError, setCostError] = useState('');
    const [discountError, setDiscountError] = useState('');
    const [quantityError, setQuantityError] = useState('');
    const [extraDiscountError, setExtraDiscountError] = useState('');
    const [taglineError, setTaglineError] = useState('');


    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch, success]);

    const tableStyle = {
        borderCollapse: 'collapse', // Add border-collapse to prevent double borders
        width: '100%', // Set table width to 100% to fill the container
        height: '100%', // Set table width to 100% to fill the container
        background: 'white',
        marginBottom: '20px'
    };

    const thStyle = {
        border: '1px solid #ded8d8', // Add border styles to table headers
        padding: '20px', // Add padding for spacing
        textAlign: 'left', // Align text left in headers
    };

    const tdStyle = {
        border: '1px solid #ded8d8', // Add border styles to table data cells
        padding: '8px', // Add padding for spacing
    };

    const [formData, setFormData] = useState({
        id: '',
        longTitle: '',
        shortTitle: '',
        category: '',
        subCategory: '',
        image: null,
        description: '',
        mrp: '',
        cost: '',
        discount: '',
        quantity: '',
        extraDiscount: '',
        tagline: '',
    });

    // Step 2: Handle input changes and update the form data state
    const handleInputChange = (e) => {
        const { name, value, type, files } = e.target;
        // Check if the input is a file input or regular input
        const newValue = type === 'file' ? files[0] : value;
        setFormData({
            ...formData,
            [name]: newValue,
        });
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];

        if (file) {
            const reader = new FileReader();

            reader.onload = (e) => {
                // Update the formData.image and the preview image src
                setFormData({
                    ...formData,
                    image: e.target.result,
                });

                // Update the img element src
                const previewImage = document.getElementById('previewImage');
                if (previewImage) {
                    previewImage.src = e.target.result;
                }
            };

            reader.readAsDataURL(file);
        }
    };

    const resetErrorStates = () => {
        setLongTitleError(null);
        setShortTitleError(null);
        setCategoryError(null);
        setSubCategoryError(null);
        setImageError(null);
        setDescriptionError(null);
        setMrpError(null);
        setCostError(null);
        setDiscountError(null);
        setQuantityError(null);
        setExtraDiscountError(null);
        setTaglineError(null);
    }

    let newFormData = new FormData();

    const submitForm = async () => {
        console.log('i am clicked')
        // try {
        //     resetErrorStates();
        //     Object.entries(formData).forEach(([key, value]) => {
        //         newFormData.append(key, value);
        //     });
        //     console.log(newFormData, 'error aayo')
        //     // Make a POST request to the /addProduct endpoint with Axios
        //     const response = await axios.post('http://localhost:8000/addProduct', newFormData);
        //     console.log('Product added:', response.data);
        //     setSuccess(success + 1)
        //     // onClose();
        //     setIsModalOpen(false)
        //     setFormData({
        //         longTitle: '',
        //         shortTitle: '',
        //         category: '',
        //         subCategory: '',
        //         image: null,
        //         description: '',
        //         mrp: '',
        //         cost: '',
        //         discount: '',
        //         quantity: '',
        //         extraDiscount: '',
        //         tagline: '',
        //     });
        // } catch (error) {
        //     if (error.response.data.error) {
        //         // Map the error messages to set error state for each parameter
        //         error.response.data.error.forEach((error) => {
        //             const { msg, params } = error;
        //             // Check params and set the corresponding error state
        //             if (params === 'longTitle') {
        //                 setLongTitleError(msg.replace('title.', ''));
        //             } else if (params === 'shortTitle') {
        //                 setShortTitleError(msg.replace('title.', ''));
        //             } else if (params === 'category') {
        //                 setCategoryError(msg);
        //             } else if (params === 'subCategory') {
        //                 setSubCategoryError(msg);
        //             }
        //             else if (params === 'image') {
        //                 setImageError(msg);
        //             } else if (params === 'description') {
        //                 setDescriptionError(msg);
        //             } else if (params === 'mrp') {
        //                 setMrpError(msg.replace('price.', ''));
        //             } else if (params === 'cost') {
        //                 setCostError(msg.replace('price.', ''));
        //             } else if (params === 'discount') {
        //                 setDiscountError(msg.replace('price.', ''));
        //             } else if (params === 'quantity') {
        //                 setQuantityError(msg);
        //             } else if (params === 'extraDiscount') {
        //                 setExtraDiscountError(msg);
        //             } else if (params === 'tagline') {
        //                 setTaglineError(msg);
        //             }
        //         });
        //     }
        //     console.error('Error adding product:', error);
        // }
        // Object.entries(formData).forEach(([key, value]) => {
        //     newFormData.delete(key, value);
        // });
    };

    const changeModalStatus = () => {
        resetErrorStates();
        setIsModalOpen(false)
        setIsUpdateMode(false)
        setIsViewMode(false)
        setFormData({
            id: '',
            longTitle: '',
            shortTitle: '',
            category: '',
            subCategory: '',
            image: null,
            description: '',
            mrp: '',
            cost: '',
            discount: '',
            quantity: '',
            extraDiscount: '',
            tagline: '',
        });
    }
    const updateProduct = (product) => {
        setFormData({
            id: product._id,
            longTitle: product.title.longTitle,
            shortTitle: product.title.shortTitle,
            category: product.category,
            subCategory: product.subCategory,
            image: product.image,
            description: product.description,
            mrp: product.price.mrp,
            cost: product.price.cost,
            discount: product.price.discount,
            quantity: product.quantity,
            extraDiscount: '',
            tagline: product.tagline,
        });
        setIsUpdateMode(true)
        setIsModalOpen(true)
        // console.log(formData.longTitle)
    }

    const updateForm = async () => {
        try {
            resetErrorStates();
            Object.entries(formData).forEach(([key, value]) => {
                newFormData.append(key, value);
            });

            console.log('why here')
            const response = await axios.put(`http://localhost:8000/updateProduct/${formData.id}`, newFormData);
            setSuccess(success + 1)
            // onClose();
            setIsModalOpen(false)
            setFormData({
                id: '',
                longTitle: '',
                shortTitle: '',
                category: '',
                subCategory: '',
                image: null,
                description: '',
                mrp: '',
                cost: '',
                discount: '',
                quantity: '',
                extraDiscount: '',
                tagline: '',
            });
        } catch (error) {
            if (error.response.data.error) {
                // Map the error messages to set error state for each parameter
                error.response.data.error.forEach((error) => {
                    const { msg, params } = error;
                    // Check params and set the corresponding error state
                    if (params === 'longTitle') {
                        setLongTitleError(msg.replace('title.', ''));
                    } else if (params === 'shortTitle') {
                        setShortTitleError(msg.replace('title.', ''));
                    } else if (params === 'category') {
                        setCategoryError(msg);
                    } else if (params === 'subCategory') {
                        setSubCategoryError(msg);
                    }
                    else if (params === 'image') {
                        setImageError(msg);
                    } else if (params === 'description') {
                        setDescriptionError(msg);
                    } else if (params === 'mrp') {
                        setMrpError(msg.replace('price.', ''));
                    } else if (params === 'cost') {
                        setCostError(msg.replace('price.', ''));
                    } else if (params === 'discount') {
                        setDiscountError(msg.replace('price.', ''));
                    } else if (params === 'quantity') {
                        setQuantityError(msg);
                    } else if (params === 'extraDiscount') {
                        setExtraDiscountError(msg);
                    } else if (params === 'tagline') {
                        setTaglineError(msg);
                    }
                });
            }
            console.error('Error updating product:', error);
        } finally {
            Object.entries(formData).forEach(([key, value]) => {
                newFormData.delete(key, value);
            });
        }
    }

    const viewProduct = (product) => {
        setFormData({
            id: product._id,
            longTitle: product.title.longTitle,
            shortTitle: product.title.shortTitle,
            category: product.category,
            subCategory: product.subCategory,
            image: product.image,
            description: product.description,
            mrp: product.price.mrp,
            cost: product.price.cost,
            discount: product.price.discount,
            quantity: product.quantity,
            extraDiscount: '',
            tagline: product.tagline,
        });
        setIsViewMode(true)
        setIsModalOpen(true)
    }

    const deleteProduct = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:8000/deleteProduct/${id}`);
            setSuccess(success + 1)

        } catch (error) {
            console.error('Error deleting product:', error);
        }
    }

    return (
        <div>
            <DashboardLayout title="Products">
                <Box style={{ display: 'flex', alignItems: 'flex-end', flexDirection: 'column' }}>
                    <Button style={{ background: '#1815de', color: "white", marginBottom: '10px' }} onClick={() => setIsModalOpen(true)}><Text style={{ marginRight: '5px' }}>Add product</Text> <AiOutlinePlusCircle fontSize='22px' color='white' /></Button>
                </Box>
                <Table variant="simple" style={tableStyle}>
                    <Thead>
                        <Tr>
                            <Th style={thStyle}>Name</Th>
                            <Th style={thStyle}>Category</Th>
                            <Th style={thStyle}>Sub Category</Th>
                            <Th style={thStyle}>Image</Th>
                            <Th style={thStyle}>Price</Th>
                            <Th style={thStyle}>Action</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {products?.map(product => (
                            <Tr Tr key={product.id} >
                                <Td style={tdStyle}>{product.title.shortTitle}</Td>
                                <Td style={tdStyle}>{product.category}</Td>
                                <Td style={tdStyle}>{product.subCategory}</Td>
                                <Td style={tdStyle}>
                                    {product.image && product.image !== '' ?
                                        <img src={product.image} alt="" style={{ width: 100, height: 100, margin: 'auto' }} />
                                        :
                                        <img src={product.url} alt="" style={{ width: 100, height: 100, margin: 'auto' }} />
                                    }
                                </Td>
                                <Td style={tdStyle}>{product.price.cost}</Td>
                                <Td style={tdStyle}>
                                    <Box style={{ display: 'flex', justifyContent: 'space-evenly', }}>
                                        <Box style={{ background: '#f2f2f2', padding: '10px 10px', cursor: 'pointer' }} onClick={() => (updateProduct(product))}>
                                            <BsFillPencilFill style={{ color: 'green', fontSize: '20px', }} />
                                        </Box>
                                        <Box style={{ background: '#f2f2f2', padding: '10px 10px', cursor: 'pointer' }} onClick={() => (viewProduct(product))}>
                                            <AiFillEye style={{ color: 'blue', fontSize: '20px', }} />
                                        </Box>
                                        <Box style={{ background: '#f2f2f2', padding: '10px 10px', cursor: 'pointer' }} onClick={() => {
                                            if (window.confirm('Do you want to delete this product?')) {
                                                deleteProduct(product.id);
                                            }
                                        }}>
                                            <BiSolidTrashAlt style={{ color: 'red', fontSize: '20px', }} />
                                        </Box>
                                    </Box>
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
                <Modal isOpen={isModalOpen} onClose={() => changeModalStatus()} size='full'>
                    <ModalOverlay />
                    <ModalContent style={{ width: '50%' }}> {/* Adjust the width as needed */}
                        <ModalHeader>{isViewMode ? 'View Product' : (isUpdateMode ? 'Update Product' : 'Add Product')}</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <form encType="multipart/form-data">
                                <FormControl>
                                    {/* <VStack align="start" mb={2}>
                                    <FormLabel >Long Title</FormLabel>
                                    <Input type='text' w="100%" />
                                </VStack> */}
                                    <HStack spacing={4} mb={2}>
                                        <VStack align="start" w="50%">
                                            <FormLabel>Long Title</FormLabel>
                                            <Input type='email' name='longTitle' value={formData.longTitle}
                                                onChange={handleInputChange}
                                                disabled={isViewMode} />
                                            {longTitleError && (
                                                <Text color="red" fontSize="sm">
                                                    {longTitleError}
                                                </Text>
                                            )}
                                        </VStack>
                                        <VStack align="start" style={{ marginLeft: 'auto' }} w="50%">
                                            <FormLabel>Short Title</FormLabel>
                                            <Input type='email' name='shortTitle' value={formData?.shortTitle}
                                                onChange={handleInputChange}
                                                disabled={isViewMode} />
                                            {shortTitleError && (
                                                <Text color="red" fontSize="sm">
                                                    {shortTitleError}
                                                </Text>
                                            )}
                                        </VStack>
                                    </HStack>
                                    <HStack spacing={4} mb={2}>
                                        <VStack align="start" w="50%">
                                            <FormLabel >Category</FormLabel>
                                            <Input type='email' name='category' value={formData.category}
                                                onChange={handleInputChange}
                                                disabled={isViewMode} />
                                            {categoryError && (
                                                <Text color="red" fontSize="sm">
                                                    {categoryError}
                                                </Text>
                                            )}
                                        </VStack>
                                        <VStack align="start" style={{ marginLeft: 'auto' }} w="50%">
                                            <FormLabel>Sub Category</FormLabel>
                                            <Input type='email' name='subCategory' value={formData.subCategory}
                                                onChange={handleInputChange}
                                                disabled={isViewMode} />
                                            {subCategoryError && (
                                                <Text color="red" fontSize="sm">
                                                    {subCategoryError}
                                                </Text>
                                            )}
                                        </VStack>
                                    </HStack>
                                    <VStack align="start" mb={2}>
                                        <FormLabel>Image</FormLabel>
                                        <Input type="file" name="image" onChange={handleImageChange} />
                                        {formData.image && formData.image !== null && ( // Check if there is an image
                                            <Box>
                                                <img
                                                    src={formData.image}
                                                    alt=""
                                                    style={{ width: 100, height: 100, margin: 'auto' }}
                                                />
                                            </Box>
                                        )}
                                        {imageError && (
                                            <Text color="red" fontSize="sm">
                                                {imageError}
                                            </Text>
                                        )}
                                    </VStack>

                                    <VStack align="start" mb={2}>
                                        <FormLabel >Description</FormLabel>
                                        <Textarea name='description' value={formData.description}
                                            onChange={handleInputChange}
                                            disabled={isViewMode}></Textarea>
                                        {descriptionError && (
                                            <Text color="red" fontSize="sm">
                                                {descriptionError}
                                            </Text>
                                        )}
                                    </VStack>
                                    <HStack spacing={4} mb={2}>
                                        <VStack align="start" w="33%">
                                            <FormLabel >Market Price (mrp)</FormLabel>
                                            <Input type='email' name='mrp' value={formData.mrp}
                                                onChange={handleInputChange}
                                                disabled={isViewMode} />
                                            {mrpError && (
                                                <Text color="red" fontSize="sm">
                                                    {mrpError}
                                                </Text>
                                            )}
                                        </VStack>
                                        <VStack align="start" style={{ marginLeft: 'auto' }} w="33%">
                                            <FormLabel>Cost</FormLabel>
                                            <Input type='email' name='cost' value={formData.cost}
                                                onChange={handleInputChange}
                                                disabled={isViewMode} />
                                            {costError && (
                                                <Text color="red" fontSize="sm">
                                                    {costError}
                                                </Text>
                                            )}
                                        </VStack>
                                        <VStack align="start" style={{ marginLeft: 'auto' }} w="33%">
                                            <FormLabel>Discount</FormLabel>
                                            <Input type='email' name='discount' value={formData.discount}
                                                onChange={handleInputChange}
                                                disabled={isViewMode} />
                                            {discountError && (
                                                <Text color="red" fontSize="sm">
                                                    {discountError}
                                                </Text>
                                            )}
                                        </VStack>
                                    </HStack>
                                    <HStack spacing={4} mb={2}>
                                        <VStack align="start" w="33%">
                                            <FormLabel >Total Quantity</FormLabel>
                                            <Input type='email' name='quantity' value={formData.quantity}
                                                onChange={handleInputChange}
                                                disabled={isViewMode} />
                                            {quantityError && (
                                                <Text color="red" fontSize="sm">
                                                    {quantityError}
                                                </Text>
                                            )}
                                        </VStack>
                                        <VStack align="start" style={{ marginLeft: 'auto' }} w="33%">
                                            <FormLabel>Extra Discount</FormLabel>
                                            <Input type='email' name='extraDiscount' value={formData.extraDiscount}
                                                onChange={handleInputChange}
                                                disabled={isViewMode} />
                                            {extraDiscountError && (
                                                <Text color="red" fontSize="sm">
                                                    {extraDiscountError}
                                                </Text>
                                            )}
                                        </VStack>
                                        <VStack align="start" style={{ marginLeft: 'auto' }} w="33%">
                                            <FormLabel>Tagline</FormLabel>
                                            <Input type='email' name='tagline' value={formData.tagline}
                                                onChange={handleInputChange}
                                                disabled={isViewMode} />
                                            {taglineError && (
                                                <Text color="red" fontSize="sm">
                                                    {taglineError}
                                                </Text>
                                            )}
                                        </VStack>
                                    </HStack>
                                    {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
                                </FormControl>
                            </form>
                        </ModalBody>
                        <ModalFooter>
                            <Button
                                bg='#15bd31'
                                color='white'
                                type='submit'
                                onClick={isUpdateMode ? updateForm : (isViewMode ? changeModalStatus : submitForm)}
                                disabled={isUpdateMode || isViewMode}
                            >
                                {isUpdateMode ? 'Update' : (isViewMode ? 'OK' : 'Submit')}
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>

            </DashboardLayout>
        </div >
    );
};

export default Product;
