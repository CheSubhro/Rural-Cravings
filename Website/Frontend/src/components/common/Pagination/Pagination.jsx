
import React from 'react';
import { HStack, Button, IconButton } from '@chakra-ui/react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

/**
 * @param {number} totalPages - The total number of available pages
 * @param {number} currentPage - The active page the user is currently viewing
 * @param {function} onPageChange - Callback function triggered when a page is changed
 */
const Pagination = ({ totalPages, currentPage, onPageChange }) => {
    // Logic to generate an array of page numbers (e.g., [1, 2, 3, ...])
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    // No need to render pagination if there is only one page or less
    if (totalPages <= 1) return null; 

    return (
        <HStack spacing={2} justifyContent="center" py={4}>
            {/* Previous Page Button */}
            <IconButton
                icon={<FiChevronLeft />}
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                aria-label="Previous Page"
                variant="outline"
            >

                <FiChevronLeft /> 
            </IconButton>

            {/* Individual Page Number Buttons */}
            {pages.map((page) => (
                <Button
                    key={page}
                    onClick={() => onPageChange(page)}
                    colorScheme={currentPage === page ? "blue" : "gray"}
                    variant={currentPage === page ? "solid" : "outline"}
                    size="sm"
                >
                    {page}
                </Button>
            ))}

            {/* Next Page Button */}
            <IconButton
                icon={<FiChevronRight />}
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                aria-label="Next Page"
                variant="outline"
            >
                <FiChevronRight /> 
            </IconButton>
        </HStack>
    );
};

export default Pagination;
