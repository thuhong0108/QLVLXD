import DeleteIcon from '@mui/icons-material/Delete';
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Dialog,
    DialogTitle, DialogContent, TextField, DialogActions, Select, MenuItem } from '@mui/material';
import { useEffect, useState } from 'react';
import { addProduct, deleteProduct, getAllProducts, uploadImage } from '../../services/product';
import { formatPrice } from '../../services/common';
import './style.scss';
import CircularProgress from '@mui/material/CircularProgress';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { getAllCategories } from '../../services/category';

function Admin() {
    const navigate = useNavigate();

    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    const [selectedFile, setSelectedFile] = useState(null);

    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || !user?.isAdmin) {
        navigate('/');
    }

    const form = useFormik({
        initialValues: { _id: '', name: '', description: '', price: '', category: '' }
    });

    useEffect(() => {
        getAllProductsFn();
    }, []);

    //lấy tất cả sp
    const getAllProductsFn = async () => {
        setLoading(true);
        const response = await getAllProducts();
        setProducts(response.data);
        setLoading(false);
    }

    // hàm này gọi mỗi khi chọn file từ máy tính
    const handleImageChange = (event) => {
        const files = event.target.files;
        setSelectedFile(files[0]);
    }

    // mở dialog
    const openDialog = async () => {
        setOpen(true);
        const response = await getAllCategories();
        setCategories(response.data);
    }

    // đóng dialog
    const closeDialog = () => {
        setOpen(false);
        form.resetForm();
        setSelectedFile(null);
    }

    // xoá sản phẩm
    const handleDelete = async (id) => {
        await deleteProduct(id);
        getAllProductsFn();
        toast.success('Xóa sản phẩm thành công');
    }

    const onSubmit = async () => {
        if (isValidForm()) {
            setLoading(true);

            // tải ảnh lên cloud
            const formData = new FormData();
            formData.append('file', selectedFile);
            formData.append('upload_preset', 'instagramimages');
            
            // trả về file, file.secure_url => link ảnh
            var file = await uploadImage(formData);

            const { name, description, price, category } = form.values;
            const data = { name, description, price, image: file.secure_url };

            await addProduct(category, data);
            setLoading(false);
            toast.success('Thêm sản phẩm thành công');

            closeDialog();
            getAllProductsFn();
        } else {
            toast.error('Hãy nhập đầy đủ thông tin');
        }
    }

    // kiểm tra form có nhập đủ dữ liệu chưa
    const isValidForm = () => {
        const { name, description, price, category } = form.values;
        return !!(name && description && category && price && selectedFile);
    }

    return ( 
        <div className="admin container">
            {
                !loading ? (
                    <>
                        <h2>Quản lí sản phẩm</h2>
                        <div className='admin__top'>
                            <Button variant="contained" onClick={() => openDialog()}>Thêm mới</Button>
                            <p>Có tất cả <b>{products?.length}</b> sản phẩm</p>
                        </div>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell></TableCell>
                                        <TableCell>Sản phẩm</TableCell>
                                        <TableCell>Loại sản phẩm</TableCell>
                                        <TableCell>Giá</TableCell>
                                        <TableCell></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        products.map(item => (
                                            <TableRow key={item._id}>
                                                <TableCell>
                                                    <img className='admin__image' src={item.image} />
                                                </TableCell>
                                                <TableCell>{item.name}</TableCell>
                                                <TableCell>{item.category.name}</TableCell>
                                                <TableCell>{formatPrice(item.price)}</TableCell>
                                                <TableCell>
                                                    <DeleteIcon onClick={() => handleDelete(item._id)} />
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>

                        {/*Dialog thêm sản phẩm */}
                        <Dialog open={open} onClose={closeDialog} fullWidth>
                            <DialogTitle>Thêm sản phẩm</DialogTitle>
                            <DialogContent>
                                <div className='admin__row'>
                                    <label>Tên</label>
                                    <TextField id="name" fullWidth value={form.values.name} 
                                        onChange={form.handleChange}
                                    />
                                </div>
                                <div className='admin__row'>
                                    <label>Mô tả</label>
                                    <TextField id="description" fullWidth value={form.values.description} 
                                        onChange={form.handleChange} multiline rows={3}
                                    />
                                </div>
                                <div className='admin__group'>
                                    <div>
                                        <label>Giá</label>
                                        <TextField id="price" fullWidth value={form.values.price} 
                                            onChange={form.handleChange} type='number'
                                        />
                                    </div>
                                    <div>
                                        <label >Loại sản phẩm</label>
                                        <Select value={form.values.category}
                                            onChange={(e) => form.setFieldValue('category', e.target.value)}>
                                            {
                                                categories.map(category => (
                                                    <MenuItem key={category._id} value={category._id}>{category.name}
                                                    </MenuItem>
                                                ))
                                            }
                                        </Select>
                                    </div>
                                </div>
                                <div className='admin__row'>
                                    <label>Hình ảnh</label>
                                    <TextField id="file" type="file" fullWidth onChange={(event) => handleImageChange(event)} />
                                </div>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={closeDialog}>Hủy</Button>
                                <Button onClick={onSubmit}>Lưu</Button>
                            </DialogActions>
                        </Dialog>
                    </>
                ) : (
                    <CircularProgress />
                )
            }
        </div>
     );
}

export default Admin;