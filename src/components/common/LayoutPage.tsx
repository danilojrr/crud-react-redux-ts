import * as React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { Grid, Navbar, Nav, NavDropdown, MenuItem, PageHeader } from 'react-bootstrap';
import { IState } from './../../models';
import { LoadingIcon } from './LoadingIcon';

interface IPageProps {
    title: string;
    subtitle?: string;
    headerButton?: JSX.Element;
    talkingToTheServer?: boolean;
}

class Page extends React.Component<IPageProps, any> {
    render() {
        return (
            <div>
                {this.renderNavbar()}
                {this.renderView()}
            </div>
        );
    }
    
    renderView() {
        const {children, talkingToTheServer} = this.props;
        
        if (talkingToTheServer) {
            return <LoadingIcon />;
        }
        
        return (
            <Grid className="animation-slide-in-up">
                {this.renderPageHeader()}
                {children}
            </Grid>
        );
    }

    renderNavbar() {
        return (
            <Navbar>
                <Navbar.Header>
                    <Navbar.Brand>
                        <Link to="/">CRUD</Link>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                        <NavDropdown title="Students" id="students-dropdown">
                            <MenuItem href="#/students">Show List</MenuItem>
                            <MenuItem href="#/students/new">Add New</MenuItem>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }

    renderPageHeader() {
        const subtitle = (this.props.subtitle) ? <small>{' '}{this.props.subtitle}</small> : '';
        let headerButton: JSX.Element;
        
        if (this.props.headerButton) {
            headerButton = <div className="header-button">{this.props.headerButton}</div>;
        }

        return (
            <PageHeader>{this.props.title}{subtitle}{headerButton}</PageHeader>
        );
    }
}

const mapStateToProps = (state: IState) => ({
    talkingToTheServer: state.talkingToTheServer
});

export const LayoutPage = connect(mapStateToProps)(Page as any) as typeof Page;