import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

function mapStateToProps(state) {
    return {
        name : state.name
    };
}

function mapDispatchToProps(dispatch) {
    return{
        updateName : name => dispatch({
            type : "UPDATE_NAME",
            name : name
        })
    }
}

class Avatar extends React.Component{
    state = {
        photo:""
    };

    componentDidMount() {
        fetch("https://uifaces.co/api?limit=1&random", {
            headers : new Headers({
                "X-API-KEY" : "240908ba3e0864f757bbcaa250357b"
            })
            }
            )
            .then(
            response => response.json())
            .then(response => {

                this.setState({
                photo : response[0].photo
            });

                this.props.updateName(response[0].name);
            });
    }

    render(){
        return(
            <Image source = {{ uri : this.state.photo }} />


        )
    }
}
export default connect(mapStateToProps, mapDispatchToProps) (Avatar);

const Image = styled.Image`
    width: 44;
    height : 44;
    border-radius: 22;
`;