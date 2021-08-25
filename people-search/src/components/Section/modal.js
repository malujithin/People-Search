import React, { Fragment, useEffect } from 'react';
import Resizer from 'react-image-file-resizer';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../../state/reducer';
const useStyles = makeStyles(theme => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    paper: {
        width: 400,
        backgroundColor: '#dfdfe6',
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3)
    }
}));

const PhotoUploadModal = ({ gpid, setAnchorEl }) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [imageFile, setImageFile] = React.useState();
    const [base64imageString, setBase64imageString] = React.useState();
    const [buttonDisable, setButtonDisable] = React.useState(true);
    const [loader, setLoader] = React.useState(false);
    const [sizeError, setSizeError] = React.useState(false);

    const data = useSelector(state => state.people);
    const dispatch = useDispatch();
    const handleOpen = () => {
        setButtonDisable(true);
        setOpen(true);
    };

    const handleClose = () => {
        setBase64imageString('');
        setSizeError(false);
        setOpen(false);
    };
    const handleUpdateImage = () => {
        dispatch(actions.uploadClicked(true));
        dispatch(actions.postSuccess(false));
        dispatch(actions.setUserPhoto(process.env.IMAGE_BASE_PATH));

        setButtonDisable(true);
        setLoader(true);
        if (imageFile) {
            const imageDetails = {
                gpid: gpid,
                base64imageString: imageFile,
                photoext: '.jpeg'
            };

            dispatch(actions.updateImage(imageDetails));
        }
    };

    const fileChangedHandler = event => {
        let FileSize = event.target.files[0].size / 1024;
        if (FileSize > 200) {
            setSizeError(true);
            setBase64imageString('');
        } else {
            setSizeError(false);
            setButtonDisable(false);
            let fileInput = false;

            if (event.target.files[0]) {
                const formData = new FormData();
                fileInput = true;
                formData.append('photo', event.target.files[0]);
                setImageFile(formData);
            }
            if (fileInput) {
                Resizer.imageFileResizer(
                    event.target.files[0],
                    500,
                    500,
                    'JPG',
                    90,
                    0,
                    uri => {
                        setBase64imageString(uri);
                    },
                    'base64'
                );
            }
        }
    };
    useEffect(() => {
        if (data.photoUpload) {
            setBase64imageString('');
            setOpen(false);
            setLoader(false);
            setTimeout(() => {
                dispatch(actions.getUserPhoto(gpid));
            }, 50000);
        }
    }, [data.photoUpload]);
    return (
        <Fragment>
            <CameraAltIcon onClick={handleOpen} style={{ cursor: 'pointer' }} />
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500
                }}>
                <Fade in={open}>
                    <div className={classes.paper}>
                        <div className="modal-title"> Upload Your Photo</div>
                        
                          
                        

                        <div className="image-preview">
                            <form encType="multipart/form-data">
                                    <input
                                        style={{ backgroundColor: 'white', width:"96%",padding:"10px",marginBottom:"5px"   }}
                                        type="file"
                                        accept="image/*"
                                        onChange={e => {
                                            fileChangedHandler(e);
                                        }}
                                    />
                                      <div style={{ color: sizeError ? 'red' : 'black', fontFamily: 'lato', paddingBottom: '10px', fontSize: '11px',textAlign:"right" }}>
                                Max Size: 200kb
                            </div>
                            </form>

                            {!!base64imageString && !data.uploadClicked ? (
                                <div className="image-preview">
                                    <img src={base64imageString} alt="text" />
                                </div>
                            ) : loader ? (
                                <div className="suspense">
                                    <i className="fas fa-spinner fa-pulse"></i>
                                </div>
                            ) : (
                                ''
                            )}
                        </div>
                        <div className="modal-footer">
                            <Button variant="contained" onClick={handleClose}>
                                Cancel
                            </Button>
                            <Button className="submit-button" variant="contained" onClick={handleUpdateImage} disabled={buttonDisable}>
                                Update Photo
                            </Button>
                        </div>
                    </div>
                </Fade>
            </Modal>
        </Fragment>
    );
};

export default PhotoUploadModal;
