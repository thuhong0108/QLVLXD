import DeleteIcon from '@mui/icons-material/Delete';
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Dialog,
    DialogTitle, DialogContent, TextField, DialogActions, Select, MenuItem } from '@mui/material';
import { useEffect, useState } from 'react';
import { addProduct, deleteProduct, getAllProducts } from '../../services/product';
import { formatPrice } from '../../services/common';
import './style.scss';
import CircularProgress from '@mui/material/CircularProgress';
//1 thư viện hỗ trợ tạo form
import { useFormik } from 'formik';
//hiện thị thông báo
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { getAllCategories } from '../../services/category';

function Admin() {
    //State. Khi cần lưu dữ liệu nào đó để lưu dữ liệu
    const navigate = useNavigate();

    const [products, setProducts] = useState([]);

    const [categories, setCategories] = useState([]);

    //dùng để mở hoặc đóng dialog mặc định là false
    const [open, setOpen] = useState(false);

    const [loading, setLoading] = useState(true);

    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || !user?.isAdmin) {
        navigate('/');
    }

    //tạo from
    const form = useFormik({
        //gồm những giá trị khởi tạo
        initialValues: { name: '', description: '', price: '', category: '', image: '' }
    });

    //khi nào gọi api
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

    // mở dialog
    const openDialog = async () => {
        setOpen(true);
        // lấy tất cả thông tin của categories
        const response = await getAllCategories();
        setCategories(response.data);
    }

    // đóng dialog
    const closeDialog = () => {
        setOpen(false);
        form.resetForm();
    }

    // xoá sản phẩm
    const handleDelete = async (id) => {
        await deleteProduct(id);
        getAllProductsFn();
        toast.success('Xóa sản phẩm thành công');
    }

    //xử lý sự kiện khi nhấn nút lưu
    const onSubmit = async () => {
        //hàm kiểm tra form có valid hay ch
        if (isValidForm()) {
            setLoading(true);

            const data = {
                name: form.values.name,
                description: form.values.description,
                price: form.values.price,
                category: form.values.category,
                image: form.values.image
            }

            await addProduct(data);

            setLoading(false);
            closeDialog();
            getAllProductsFn();
            
            toast.success('Thêm sản phẩm thành công');
        } else {
            toast.error('Hãy nhập đầy đủ thông tin');
        }
    }

    // kiểm tra form có nhập đủ dữ liệu chưa
    const isValidForm = () => {
        const { name, description, price, category } = form.values;
        return name && description && category && price;
    }

    return ( 
        <div className="admin container">
            {
                !loading ? (
                    <>
                        <h2>Quản lí sản phẩm</h2>
                        <div className='admin__top'>
                            {/* nút thêm sản phẩm */}
                            <Button variant="contained" onClick={openDialog}>Thêm mới</Button>
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
                                        //khi map qua cần id
                                        products.map(item => (
                                            <TableRow key={item._id}>
                                                <TableCell>
                                                    <img className='admin__image' src={item.image} alt='' />
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
                                    <TextField fullWidth id="image" value={form.values.image} onChange={form.handleChange} />
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