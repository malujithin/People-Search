import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import PhotoUploadModal from './modal';
import { useDispatch } from 'react-redux';
import { actions } from '../../state/reducer';

const useStyles = makeStyles(theme => ({
    typography: {
        padding: theme.spacing(2)
    }
}));


const ProfileMenu = ({ user, image }) => {
    const dispatch = useDispatch();
    const classes = useStyles();

    const [anchorEl, setAnchorEl] = useState('');
    // const [reload, setReload] = React.useState(1);

    

    const handleLogout = () => {
        function clearStorages() {
            // clear localstorage
            localStorage.clear();

            // clear caches
            caches.keys().then(cacheNames => {
                cacheNames.forEach(cacheName => {
                    caches.delete(cacheName);
                });
            });

            // clear indexedDB
            indexedDB.databases().then(databases => {
                //A promise that resolves either to an error or a list of dictionaries, each with two elements, name and version.
                databases.forEach(function(db) {
                    deleteTheDB(db.name);
                });
            });
        }

        function deleteTheDB(dbName) {
            // Do we need to close if before deleting?
            // Db.instance.close();
            var deleteRequest = indexedDB.deleteDatabase(dbName);

            deleteRequest.onblocked = function() {
            };

            deleteRequest.onerror = function() {
            };

            deleteRequest.onsuccess = function() {
                alert('*** NOTE : Requires page refresh to see the DB removed from the Resources IndexedDB tab in Chrome.');
            };
        }
        (function() {
            
            var cookies = document.cookie.split('; ');
            for (var c = 0; c < cookies.length; c++) {
                var d = window.location.hostname.split('.');
                while (d.length > 0) {
                    var cookieBase =
                        encodeURIComponent(cookies[c].split(';')[0].split('=')[0]) +
                        '=; expires=Thu, 01-Jan-1970 00:00:01 GMT; domain=' +
                        d.join('.') +
                        ' ;path=';
                    var p = window.location.pathname.split('/');
                    document.cookie = cookieBase + '/';
                    while (p.length > 0) {
                        document.cookie = cookieBase + p.join('/');
                        p.pop();
                    }
                    d.shift();
                }
            }
        })();
        clearStorages();
        dispatch(actions.getLogoutUser());
    };

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <div className="profile-header">
            <span onClick={handleClick}>
                {!!image ? (
                    <img className="user-img" src={image} />
                ) : (
                    // <ProfileImage image = {image} /> :
                    <Button aria-describedby={id} variant="contained" color="primary">
                        {!!user.FirstName ? user.FirstName.charAt(0) : ''}
                        {!!user.LastName ? user.LastName.charAt(0) : ''}{' '}
                    </Button>
                )}{' '}
            </span>

            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center'
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center'
                }}>
                <Typography className={classes.typography}>
                    <span className="menu-proifle">
                        <li
                            style={{
                                marginLeft: 'auto'
                            }}>
                            {image ? (
                                <span>
                                    <img className="user-img" src={image} /> 
                                    <PhotoUploadModal gpid={user.gpid} setAnchorEl={setAnchorEl} />
                                </span>
                            ) : (
                                <span>
                                    <img className="user-img" src={process.env.IMAGE_BASE_PATH} />

                                    <PhotoUploadModal gpid={user.gpid} setAnchorEl={setAnchorEl} />
                                </span>
                            )}
                            {user ? (
                                <span style={{ padding: '15px' }}>
                                    {user.FirstName} {user.LastName}{' '}
                                    {user ? <div style={{ fontSize: '14px', whiteSpace: 'nowrap' }}>{user.email} </div> : ''}
                                </span>
                            ) : (
                                ''
                            )}
                        </li>
                        <li>
                            <a style={{ cursor: 'pointer' }} onClick={handleLogout}>
                                Logout
                            </a>
                        </li>
                    </span>
                </Typography>
            </Popover>
        </div>
    );
};
export default ProfileMenu;
