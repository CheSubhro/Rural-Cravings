
import React, { useEffect, useState } from 'react';
import { Container, Paper, Title, Text, Divider, Box, Table, ActionIcon, Group, Tooltip } from '@mantine/core';
import { IconTrash, IconPencil } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks'; 
import { useDispatch, useSelector } from 'react-redux';
import { notifications } from '@mantine/notifications';
import { fetchAllBlogs, createBlog, updateBlog, deleteBlog, resetBlogState } from '../store/blogSlice';
import BlogForm from '../features/blogs/BlogForm';
import { Modal, ConfirmModal, Badge, Button } from '../components/common'; 

const Blogs = () => {

    const dispatch = useDispatch();
    
    const { isLoading, error, success, blogs = [] } = useSelector((state) => state.blog);
    
    const [formModalOpened, { open: openFormModal, close: closeFormModal }] = useDisclosure(false);
    const [editingBlog, setEditingBlog] = useState(null);

    const [deleteModalOpened, setDeleteModalOpened] = useState(false);
    const [blogToDelete, setBlogToDelete] = useState(null);

    useEffect(() => {
        dispatch(fetchAllBlogs());
    }, [dispatch]);

    useEffect(() => {
        if (success) {
            notifications.show({
                title: 'Success',
                message: editingBlog ? "Article updated successfully!" : "Article created successfully!",
                color: 'green',
                autoClose: 3000,
            });
            
            setEditingBlog(null); 
            closeFormModal();
            dispatch(resetBlogState());
            dispatch(fetchBlogs()); 
        }
    }, [success, dispatch, editingBlog, closeFormModal]);

    const handleBlogSubmit = (formData) => {
        if (editingBlog) {
            dispatch(updateBlog({ blogId: editingBlog._id, blogData: formData }));
        } else {
            dispatch(createBlog(formData));
        }
    };

    const handleEditClick = (blog) => {
        setEditingBlog(blog);
        openFormModal();
    };

    const handleFormModalClose = () => {
        setEditingBlog(null);
        closeFormModal();
    };

    const handleDeleteClick = (id) => {
        setBlogToDelete(id);
        setDeleteModalOpened(true);
    };

    const handleConfirmDelete = async () => {
        if (blogToDelete) {
            try {
                await dispatch(deleteBlog(blogToDelete)).unwrap();
                
                notifications.show({
                    title: 'Success',
                    message: 'Article deleted successfully',
                    color: 'green',
                    autoClose: 3000,
                });
                
                setDeleteModalOpened(false);
                setBlogToDelete(null);
                dispatch(fetchBlogs());
            } catch (err) {
                notifications.show({
                    title: 'Error',
                    message: err || 'Failed to delete article',
                    color: 'red',
                });
            }
        }
    };

    return (
        <Container size="xl" py="xl">
            <Box style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} mb="xl">
                <div>
                    <Title order={1} fw={800} c="dark.7">Blog Management</Title>
                    <Text size="sm" c="dimmed">Add, update, and manage kitchen heritage and nutrition articles</Text>
                </div>
                <Button 
                    onClick={openFormModal} 
                    style={{ backgroundColor: '#f26c23' }} 
                    size="md"
                    radius="md"
                >
                    + Add New Article
                </Button>
            </Box>
            
            <Divider mb="xl" />

            <Modal 
                isOpen={formModalOpened} 
                onClose={handleFormModalClose} 
                title={
                    <Title order={3} fw={700} style={{ fontSize: '22px' }}>
                        {editingBlog ? "Edit Article" : "Add New Article"}
                    </Title>
                }
                size="lg" 
            >
                {error && (
                    <Text color="red" size="sm" mb="md" fw={500}>
                        {typeof error === 'string' ? error : JSON.stringify(error)}
                    </Text>
                )}
                <BlogForm 
                    onSubmit={handleBlogSubmit} 
                    isLoading={isLoading} 
                    initialData={editingBlog}
                />
            </Modal>

            <ConfirmModal
                isOpen={deleteModalOpened}
                onClose={() => setDeleteModalOpened(false)}
                onConfirm={handleConfirmDelete}
                title="Delete Article"
                confirmText="Yes, Delete"
                cancelText="No, Keep It"
                loading={isLoading}
            >
                Are you sure you want to delete this blog post permanently? This action cannot be undone.
            </ConfirmModal>

            <Paper withBorder shadow="sm" p="xl" radius="md">
                <Title order={3} mb="lg">All Articles</Title>
                
                <Table striped highlightOnHover verticalSpacing="md">
                    <Table.Thead style={{ backgroundColor: '#f8f9fa' }}>
                        <Table.Tr>
                            <Table.Th style={{ padding: '12px' }}>Image</Table.Th>
                            <Table.Th>Title</Table.Th>
                            <Table.Th>Status</Table.Th>
                            <Table.Th ta="right" style={{ paddingRight: '20px' }}>Actions</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {blogs.length === 0 ? (
                            <Table.Tr>
                                <Table.Td colSpan={4} ta="center" py="xl">No articles found.</Table.Td>
                            </Table.Tr>
                        ) : (
                            blogs.map((blog) => (
                                <Table.Tr key={blog._id}>
                                    <Table.Td style={{ padding: '12px' }}>
                                        <img 
                                            src={blog.image} 
                                            alt="" 
                                            style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '6px', border: '1px solid #eee' }}
                                            onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=80&q=80" }}
                                        />
                                    </Table.Td>

                                    <Table.Td>
                                        <Text fw={600} size="sm" style={{ maxWidth: '400px' }} truncate>{blog.title}</Text>
                                        <Text size="xs" c="dimmed" style={{ maxWidth: '400px' }} truncate>{blog.excerpt || blog.content}</Text>
                                    </Table.Td>
                                    
                                    <Table.Td>
                                        <Badge status={blog.status === 'published' ? 'success' : 'danger'}>
                                            {blog.status === 'published' ? '🟢 Published' : '🔴 Draft'}
                                        </Badge>
                                    </Table.Td>
                                    
                                    <Table.Td>
                                        <Group gap="xs" justify="center">
                                            <Tooltip label="Edit Article" position="top">
                                                <span>
                                                    <ActionIcon 
                                                        color="blue" 
                                                        variant="light" 
                                                        onClick={() => handleEditClick(blog)}
                                                        size="lg"
                                                    >
                                                        <IconPencil size={18} stroke={1.5} />
                                                    </ActionIcon>
                                                </span>
                                            </Tooltip>
                                            
                                            <Tooltip label="Delete Article" position="top">
                                                <span>
                                                    <ActionIcon 
                                                        color="red" 
                                                        variant="light" 
                                                        onClick={() => handleDeleteClick(blog._id)} 
                                                        size="lg"
                                                    >
                                                        <IconTrash size={18} stroke={1.5} />
                                                    </ActionIcon>
                                                </span>
                                            </Tooltip>
                                        </Group>
                                    </Table.Td>
                                </Table.Tr>
                            ))
                        )}
                    </Table.Tbody>
                </Table>
            </Paper>
        </Container>
    );
};

export default Blogs;