

import React from 'react';
import { Pagination as MantinePagination, Group } from '@mantine/core';

/**
 * @param {number} totalPages - The total number of available pages
 * @param {number} currentPage - The active page
 * @param {function} onPageChange - Callback function
 */
const Pagination = ({ totalPages, currentPage, onPageChange }) => {
    
    if (totalPages <= 1) return null;

    return (
        <Group justify="center" mt="md">
            <MantinePagination 
                total={totalPages} 
                value={currentPage} 
                onChange={onPageChange} 
                color="blue"
            />
        </Group>
    );
};

export default Pagination;