import React, {
    Component,
    StyleSheet,
    View,
    Text,
    Image,
    PropTypes,
    TouchableOpacity,
}
from 'react-native';
import Styles from './Styles';


class NavigationBarButton extends Component {

    static propTypes = {
        title: PropTypes.string,
        icon: Image.propTypes.source,
        onPress: PropTypes.func,
    };

    static defaultProps = {};

    constructor(props: Object) {
        super(props);

    }

    render() {

        const {
            title, icon, onPress, style
        } = this.props;

        return (
            <TouchableOpacity
                style={[Styles.navBarButton,style]}
                onPress={onPress}>
                <View style={{flex:1,flexDirection:'row'}}>
                    <Image source={icon} />
                    <Text style={[Styles.navBarText,Styles.navBarButtonText]}>
                        {title}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    }

}

export default NavigationBarButton;