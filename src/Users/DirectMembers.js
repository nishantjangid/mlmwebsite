import React, { useState,useEffect } from 'react';
import {IconButton, Tooltip} from "@material-tailwind/react";
import { tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';


import { useNavigate } from 'react-router-dom';


const DirectMembers=()=> {
    const navigate = useNavigate()

    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [currentFilter, setCurrentFilter] = useState('all'); // Default filter is 'all'
    const [sortOrder, setSortOrder] = useState('asc'); // Default sort order is 'asc'
    const itemsPerPage = 5;


const directChildren = [];
    // Array of objects representing table rows data
    const members = directChildren

    // Filter members based on search query and current filter
    const filteredMembers = members?.filter((member) =>
        (member?.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            member?.user.email.toLowerCase().includes(searchQuery.toLowerCase()) ) &&
        (currentFilter === 'all' || member.user.status.toLowerCase() === currentFilter)
    );

    // Sort members based on createdAt and sortOrder
    const sortedMembers = filteredMembers?.sort((a, b) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
        if (sortOrder === 'asc') {
            return dateA - dateB;
        } else {
            return dateB - dateA;
        }
    });

    // Calculate the total number of pages
    const totalPages = Math.ceil(sortedMembers?.length / itemsPerPage);

    // Change page
    const handlePageChange = (pageNumber) => {
        if (pageNumber < 1 || pageNumber > totalPages) {
            return;
        }
        setCurrentPage(pageNumber);
    };

    // Handle filter change
    const handleFilter = (filter) => {
        setCurrentFilter(filter);
        setCurrentPage(1); // Reset current page when changing the filter
    };

    // Handle sort order change
    const handleSortOrder = () => {
        const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
        setSortOrder(newSortOrder);
    };

    // Calculate the index of the last and first items on the current page
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    // Get the current items to display
    const currentItems = sortedMembers?.slice(indexOfFirstItem, indexOfLastItem);


    const CustomWidthTooltip = styled(({ className, ...props }) => (
        <Tooltip {...props} classes={{ popper: className }} />
    ))({
        [`& .${tooltipClasses.tooltip}`]: {
            maxWidth: 500,
        },
    });




      
  const startPage = Math.max(1, currentPage - 2);
  const endPage = Math.min(totalPages, startPage + 4);
    return (
        <>
            
            <div className="w-full px-0 md:px-6 py-2 ">
                <div className="px-4 md:px-10 py-4 md:py-7 bg-gray-100 rounded-tl-lg rounded-tr-lg bg-black">
                    <div className="sm:flex items-center justify-between">
                        <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-[#c3a177]">Direct Members</p>
                        <div>
                           
                        </div>
                    </div>
                </div>
                <div className="bg-black shadow px-4 md:px-10 pt-4 md:pt-7 pb-5 overflow-y-auto">
            <div style={{ rowGap: '20px' }} className="flex justify-center md:justify-between items-center flex-wrap mb-4">
                <div className="flex">
                    <button
                        className={`px-4 py-2 text-sm font-medium ${currentFilter === 'all' ? 'bg-[#c3a177] text-white' : 'text-[#c3a177]'
                            } rounded-l-md focus:outline-none`}
                        onClick={() => handleFilter('all')}
                    >
                        All
                    </button>
                    <button
                        className={`px-4 py-2 text-sm font-medium ${currentFilter === 'blocked' ? 'bg-[#c3a177] text-white' : 'text-[#c3a177]'
                            } focus:outline-none`}
                        onClick={() => handleFilter('blocked')}
                    >
                        Blocked
                    </button>
                   
                    <button
                        className={`px-4 py-2 text-sm font-medium ${currentFilter === 'active' ? 'bg-[#c3a177] text-white' : 'text-[#c3a177]'
                            } rounded-r-md focus:outline-none`}
                        onClick={() => handleFilter('active')}
                    >
                        Active
                    </button>
                </div>
                <div className="mb-4 flex justify-end">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search Members..."
                        className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#c3a177] focus:border-[#c3a177]"
                    />
                    <button
                        className="ml-2 px-4 py-2 text-sm font-medium bg-[#c3a177] text-white rounded-md focus:outline-none"
                        onClick={handleSortOrder}
                    >
                        {sortOrder === 'asc' ? 'Latest' : 'Oldest'}
                    </button>
                </div>
            </div>
            <table className="w-full whitespace-nowrap">
                <thead>
                    <tr className="h-16 w-full text-sm leading-none text-white">
                        <td className="font-normal text-left pl-12">User</td>
                        <td className="font-normal text-left pl-12">User Name</td>
                        <td className="font-normal text-left pl-12">Contact</td>
                        <td className="font-normal text-left pl-16">Sponsor</td>
                        <td className="font-normal text-left pl-12">Status</td>
                        <td className="font-normal text-left pl-12">Direct Member</td>
                        <td className="font-normal text-left pl-12">total Member</td>
                        <td className="font-normal text-left pl-16">Created At</td>
                        <td className="px-7  2xl:px-0"></td>
                    </tr>
                </thead>
                <tbody className="w-full">
                    {currentItems?.map((member) => (
                        <tr
                            key={member.id}
                            className="h-20 text-sm leading-none text-white bg-black hover:bg-gray-100 border-b border-t "
                        >
                            <td className="pl-4 cursor-pointer">
                                <div className="flex items-center">
                                   
                                    <div className="pl-8">
                                        <p className="font-medium">{member?.user.name}</p>
                                        <p className="text-xs leading-3 text-white pt-2">
                                        {member?.user.userId}
                                        </p>
                                    </div>
                                </div>
                            </td>
                            <td className="pl-12">
                                <p className="text-sm font-medium leading-none text-white">
                                   {member?.user.userName}
                                </p>
                            </td>
                            <td className="pl-4 cursor-pointer">
                                <div className="flex items-center">
                                   
                                    <div className="pl-8">
                                        <p className="font-medium">{member?.user.phoneNo}</p>
                                        <p className="text-xs leading-3 text-white pt-2">
                                        {member?.user.email}
                                        </p>
                                    </div>
                                </div>
                            </td>
                           
                            <td className="pl-8 cursor-pointer">
                                <div className="flex items-center">
                                   
                                    <div className="pl-8">
                                        <p className="font-medium">{member?.user.sponsorName}</p>
                                        <p className="text-xs leading-3 text-white pt-2">
                                           {member?.user.sponsorId}
                                        </p>
                                    </div>
                                </div>
                            </td>
                            {/* <td className="pl-12">
                                <Popover>
                                    <PopoverHandler>
                                        <p className='cursor-pointer text-sm font-medium leading-none text-white'> {member.description.slice(0, 8)}...</p>
                                    </PopoverHandler>
                                    <PopoverContent className="w-72" style={{ fontFamily: "sans-serif", lineHeight: "12px", letterSpacing: "2px" }}>
                                        {member.description}
                                    </PopoverContent>
                                </Popover>
                            </td> */}
                            <td className="pl-12">
                                <p className="text-sm font-medium leading-none text-white">
                                    {member?.user.status}
                                </p>
                            </td>
                            <td className="pl-20">
                                <p className="text-sm font-medium leading-none text-white">
                                {member?.directChildrenCount}
                                </p>
                            </td>
                            <td className="pl-20">
                                <p className="text-sm font-medium leading-none text-white">
                                  {member?.allDescendantsCount}
                                </p>
                            </td>

                            <td className="pl-16">
                                <p className="text-sm font-medium leading-none text-white">
                                    {member?.user.createdAt.slice(0,10)}
                                </p>
                            </td>
                            {/* <td className="px-7  2xl:px-0">
                                {member.status === "Blocked" ? (
                                    <>
                                        <Tooltip content="Reject member">
                                            <IconButton variant="text" color="blue-gray" onClick={() => handleRejectMember(member.id)}>
                                                <ClearIcon className="h-4 w-4" />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip content="Confirm member">
                                            <IconButton variant="text" color="blue-gray" onClick={() => handleConfirmMember(member.id)}>
                                                <DoneIcon className="h-4 w-4" />
                                            </IconButton>
                                        </Tooltip>
                                    </>
                                ) : member.status === "Confirm" ? (
                                    <>
                                        <Tooltip content="Delete member">
                                            <IconButton variant="text" color="blue-gray" onClick={() => handleDltMember(member.id)}>
                                                <TrashIcon className="h-5 w-5" />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip content="Make admin">
                                            <IconButton variant="text" color="blue-gray" onClick={() => handleMakeAdmin(member.id)}>
                                                <UserIcon className="h-5 w-5" />
                                            </IconButton>
                                        </Tooltip>
                                    </>

                                ) : null}
                            </td> */}
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="flex justify-center mt-5">
            <div className="flex">
              {/* <p className="text-[#452a72]">Total Pages -</p> */}
              {currentPage > 1 && (
                <button
                  className="px-3 py-1 text-sm font-medium mx-1 rounded-md focus:outline-none text-[#c3a177]"
                  onClick={() => handlePageChange(currentPage - 1)}
                >
                  Previous
                </button>
              )}
              {Array.from({ length: endPage - startPage + 1 }, (_, index) => (
                <button
                  key={startPage + index}
                  className={`px-3 py-1 text-sm font-medium mx-1 rounded-md focus:outline-none ${
                    currentPage === startPage + index
                      ? "bg-[#c3a177] text-white"
                      : "text-[#c3a177]"
                  }`}
                  onClick={() => handlePageChange(startPage + index)}
                >
                  {startPage + index}
                </button>
              ))}
              {currentPage < totalPages && (
                <button
                  className="px-3 py-1 text-sm font-medium mx-1 rounded-md focus:outline-none text-[#c3a177]"
                  onClick={() => handlePageChange(currentPage + 1)}
                >
                  Next
                </button>
              )}
            </div>
          </div>
        </div>
            </div>
        </>
    );
}

export default DirectMembers;






