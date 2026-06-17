

import React, { useState, useEffect } from 'react';
import { Textarea, Stack, Select } from '@mantine/core';
import { Input, Button } from '../../components/common'; 

const BlogForm = ({ onSubmit, isLoading, initialData = null }) => {
    const [formData, setFormData] = useState({
        title: '',
        excerpt: '',
        content: '',
        status: 'published'
    });
    
    const [selectedFile, setSelectedFile] = useState(null); 

    useEffect(() => {
        if (initialData) {
            setFormData({
                title: initialData.title || '',
                excerpt: initialData.excerpt || '',
                content: initialData.content || '',
                status: initialData.status || 'published'
            });
            setSelectedFile(null); 
        } else {
            setFormData({ title: '', excerpt: '', content: '', status: 'published' });
            setSelectedFile(null);
        }
    }, [initialData]);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const formPayload = new FormData();
        formPayload.append('title', formData.title);
        formPayload.append('excerpt', formData.excerpt);
        formPayload.append('content', formData.content);
        formPayload.append('status', formData.status);

        if (selectedFile) {
            formPayload.append('image', selectedFile); 
        }

        onSubmit(formPayload); 
    };

    return (
        <form onSubmit={handleSubmit}>
            <Stack gap="sm">
                <Input
                    label="Blog Title"
                    placeholder="e.g., Grandma's Secret Mango Pickle Recipe"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '14px', fontWeight: 500, color: '#2c2e33' }}>
                        Feature Image
                    </label>
                    <input
                        type="file"
                        accept="image/*"
                        required={!initialData}
                        onChange={(e) => setSelectedFile(e.target.files[0])}
                        style={{
                            padding: '8px',
                            border: '1px solid #ced4da',
                            borderRadius: '4px',
                            backgroundColor: '#fff',
                            fontSize: '14px',
                            cursor: 'pointer'
                        }}
                    />
                    
                    {selectedFile && (
                        <div style={{ marginTop: '8px' }}>
                            <img 
                                src={URL.createObjectURL(selectedFile)} 
                                alt="Preview" 
                                style={{ width: '100px', height: '65px', objectFit: 'cover', borderRadius: '8px' }} 
                            />
                        </div>
                    )}

                    {initialData?.image && !selectedFile && (
                        <div style={{ marginTop: '6px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                            <span style={{ fontSize: '12px', color: '#868e96' }}>
                                Existing Image Preview:
                            </span>
                            <img 
                                src={initialData.image} 
                                alt="Current Blog" 
                                style={{ width: '100px', height: '65px', objectFit: 'cover', borderRadius: '8px' }} 
                            />
                        </div>
                    )}
                </div>

                <Input
                    label="Excerpt (Short Summary)"
                    placeholder="Briefly describe what this article covers..."
                    value={formData.excerpt}
                    onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                />

                <Textarea
                    label="Article Content"
                    placeholder="Write the detailed traditional story or recipe tips here..."
                    required
                    rows={6}
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                />

                <Select
                    label="Status"
                    placeholder="Select status"
                    data={[
                        { value: 'published', label: 'Published' },
                        { value: 'draft', label: 'Draft' }
                    ]}
                    value={formData.status}
                    onChange={(value) => setFormData({ ...formData, status: value || 'published' })}
                />

                <Button
                    type="submit"
                    loading={isLoading}
                    style={{ backgroundColor: '#f26c23' }}
                    fullWidth
                    mt="xs"
                >
                    {initialData ? 'Update Article' : 'Create Article'}
                </Button>
            </Stack>
        </form>
    );
};

export default BlogForm;