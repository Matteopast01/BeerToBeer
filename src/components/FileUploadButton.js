import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

const FileUploadButton = ({ onFileChange }) => {
    const handleFileChange = (event) => {
        if (onFileChange) {
            onFileChange(event.target.files);
        }
    };

    return (
        <Button
            component="label"
            variant="outlined"
            style={{ border: '1px solid primary', color: 'black' }}
            startIcon={<CloudUploadIcon />}>
            Upload file
            <VisuallyHiddenInput type="file" onChange={handleFileChange} />
        </Button>
    );
};

export default FileUploadButton;
