import React, { Component } from 'react';
import { Container, Content, Thumbnail } from 'native-base';

export default class ThumbnailExample extends Component {
    render() {
        return (
            <Container>
                <Content>
                    {/* <Thumbnail square size={80} source={require('../../assests/images/profile.png')} />
                    <Thumbnail size={80} source={require('../../assests/images/profile.png')} />
                    <Thumbnail square source={require('../../assests/images/profile.png')} /> */}
                    <Thumbnail square size={80} source={require('../../assests/images/profile.png')} />
                </Content>
            </Container>
        );
    }
}