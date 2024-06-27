
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { IoImagesOutline } from 'react-icons/io5';

interface Props {
    imageUrl: string[];
}

const BasicModal: React.FC<Props> = ({ imageUrl }) => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <button onClick={handleOpen} className='flex justify-start items-center gap-1  md:text-[15px] text-[10px] bg-[#ffffff72] p-[6px] rounded-md hover:bg-[#ffffffa9] border border-[#000]'>
                <IoImagesOutline />
                show more
            </button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box
                    sx={{
                        position: 'absolute' as 'absolute',
                        top: '45%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 700,
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 2,
                        m: 5,
                        borderRadius: 2,
                        maxHeight: '90vh',
                        overflowY: 'auto',
                    }}
                >
                    <div className="flex flex-col overflow-y-auto">
                        {imageUrl.map((image, index) => (
                            <div key={index} className="h-[480px] m-1">
                                <img
                                    src={image}
                                    className="rounded-md w-full h-full object-cover object-center"
                                    alt={`Image ${index + 1}`}
                                />
                            </div>
                        ))}
                    </div>
                </Box>
            </Modal>
        </div>
    );
}

export default BasicModal;
