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

function Modal(props) {
    const {
        isOpen,
        header,
        adjustStyle,
        children
    } = props;
    
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
            <div className={css(styles.header)}>{header}</div>

            {children}        
        </ReactModal>
    );
}

Modal.propTypes = propTypes;
Modal.defaultProps = defaultProps;

export default Modal;
