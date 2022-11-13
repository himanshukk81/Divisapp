import React from "react";
const Logo = () => {
    return (
        <Image source={require('../../assets/images/logo.png')}
            style={{ alignSelf: 'center', width: 140.0, height: 90.0, marginBottom: 1 }}
            resizeMode="contain"
        />
    )
}
export default Logo;