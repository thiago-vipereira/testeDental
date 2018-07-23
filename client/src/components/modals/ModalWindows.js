import React from 'react';
import PropTypes from 'prop-types';

import { css } from 'aphrodite/no-important';
import { styles } from './ModalStyles';

import ReactModal from 'react-modal';

const propTypes = {
    /**
     * The parent of the model should handle if the model is open or not
     * and pass a value of true or false in this prop to tell the model to open
     */
    isOpen: PropTypes.bool.isRequired,
    /**
    * The text for the header of the modal
    */
    header: PropTypes.string
}

const defaultProps = {
    isOpen: false,
    header: 'Cabeçalho'
};

function ModalWindows(props) {
    const { isOpen, header, adjustStyle, children, onClose, onMin, myItem } = props;
    
    return (
        <ReactModal
            isOpen={isOpen}
            contentLabel={header}
            closeTimeoutMS={250}
            className={css(styles.modal, adjustStyle)}
            overlayClassName={{
                base: css(styles.overlay),
                afterOpen: css(styles.overlayOpen),
                beforeClose: css(styles.overlayClose)
            }}
        >
            <div className={css(styles.headerWindow)}>{header}</div>
            <div className={css(styles.flexIco)}>
                <div className={css(styles.closeIco)} onClick={() => {onClose(myItem)} }>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill='#fff'>
                        <path d="M2.7,31.4.8,29.6a2.1,2.1,0,0,1-.1-3L26.5.6a2.1,2.1,0,0,1,2.9,0l1.9,1.8a2.1,2.1,0,0,1,.1,3L5.6,31.4A2.1,2.1,0,0,1,2.7,31.4Z"/>
                        <path d="M29.4,31.4l1.9-1.8a2.1,2.1,0,0,0,.1-3L5.6.6A2.1,2.1,0,0,0,2.7.6L.8,2.4a2.1,2.1,0,0,0-.1,3l25.8,26A2.1,2.1,0,0,0,29.4,31.4Z"/>
                    </svg>
                </div>
                <div className={css(styles.minIco)} onClick={() => {onMin(myItem)} }>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill='#fff'>
                        <rect y="20" width="32" height="6" rx="2" ry="2"/>
                    </svg>
                </div>
            </div>

            {children}        
        </ReactModal>
    );
}

ModalWindows.propTypes = propTypes;
ModalWindows.defaultProps = defaultProps;

export default ModalWindows;
