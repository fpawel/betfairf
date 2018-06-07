import React from 'react';
import Modal from 'react-responsive-modal';
import './custom-styling.css';

export class Simple extends React.Component {
    state = {
        open: false,
    };

    onOpenModal = () => {
        this.setState({ open: true });
    };

    onCloseModal = () => {
        this.setState({ open: false });
    };

    render() {
        const { open } = this.state;
        return (
            <div>
                <button onClick={this.onOpenModal}>Open simple centered modal</button>
                <Modal open={open} onClose={this.onCloseModal} center>
                    <h2>Simple centered modal</h2>
                </Modal>
            </div>
        );
    }
}

export class CustomStyling extends React.Component {
    state = {
        open: false,
    };

    onOpenModal = () => {
        this.setState({ open: true });
    };

    onCloseModal = () => {
        this.setState({ open: false });
    };

    render() {
        const { open } = this.state;
        return (
            <div className="example">
                <h4>Custom styling</h4>
                <button className="btn btn-action" onClick={this.onOpenModal}>
                    Open
                </button>{' '}
                <a
                    href="https://github.com/pradel/react-responsive-modal/blob/master/docs/src/examples/custom-styling.js"
                    target="_blank"
                >
                    See source code
                </a>
                <Modal
                    open={open}
                    onClose={this.onCloseModal}
                    center
                    classNames={{ overlay: 'custom-overlay', modal: 'custom-modal' }}
                >
                    <h2>Modal</h2>
                </Modal>
            </div>
        );
    }
}

export const App1 = () => <div> <Simple />  <CustomStyling /> </div>;