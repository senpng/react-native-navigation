import React, {
    Component,
    StyleSheet,
    View,
    Text,
    PropTypes,
    Navigator,
    TouchableOpacity,
    Platform,
    Animated,
}
from 'react-native';
import NavigationBarButton from './NavigationBarButton';
import NavigatorNavigationBarStylesIOS from 'NavigatorNavigationBarStylesIOS';
import NavigatorNavigationBarStylesAndroid from 'NavigatorNavigationBarStylesAndroid';

const {
    isAndroid,
} = require('../../utils/CommonUtils');
const NavigatorNavigationBarStyles = isAndroid ? NavigatorNavigationBarStylesAndroid : NavigatorNavigationBarStylesIOS;
const TotalNavHeight = NavigatorNavigationBarStyles.General.TotalNavHeight;
const StatusBarHeight = NavigatorNavigationBarStyles.General.StatusBarHeight;

import Styles from './Styles';


class NavigationBar extends Component {

    static propTypes = {
        /**
         * ```
         * (route, navigation) =>
         *   <Text>{route.title}</Text>
         * ```
         */
        title: PropTypes.func,
        rightButton: PropTypes.func,
        leftButton: PropTypes.func,

        // translucent: PropTypes.bool,

        hidden: PropTypes.bool,

        route: PropTypes.object.isRequired,
        navigation: PropTypes.object.isRequired,
    };

    static defaultProps = {
        // translucent: false,
        height: TotalNavHeight,
        hide: false,
    };

    state = {
        top: new Animated.Value(0),
    };

    constructor(props: Object) {
        super(props);

        this.state.top = new Animated.Value(props.hidden ? -TotalNavHeight : 0);

    }

    hidden(hide: bool, animated: bool) {

        if (animated) {

            // if (hide) {
            //     Animated.spring(this.state.top, {
            //         toValue: hide ? -TotalNavHeight : 0,
            //     }).start();
            // } else {
            Animated.timing(this.state.top, {
                toValue: hide ? -TotalNavHeight : 0,
                duration: 300,
            }).start();
            // }

        } else {

            this.setState({
                top: new Animated.Value(hide ? -TotalNavHeight : 0),
            });

        }
    }

    render() {
        const {
            route, navigation, style,
            title, rightButton, leftButton,
        } = this.props;

        return (
            <Animated.View style={[Styles.navBar,style,{top:this.state.top}]}>
                <View style={[NavigatorNavigationBarStylesIOS.Stages.Center.LeftButton,{top:StatusBarHeight,height:TotalNavHeight-StatusBarHeight}]}
                    pointerEvents="box-none"
                >
                    {leftButton&&leftButton(route,navigation)||this._leftButton(route,navigation)}
                </View>
                <View style = {[NavigatorNavigationBarStylesIOS.Stages.Center.Title, {top: StatusBarHeight,height: TotalNavHeight - StatusBarHeight}]}
                    pointerEvents="box-none"
                >
                    {title&&title(route,navigation)||this._title(route,navigation)}
                </View>
                <View style={[NavigatorNavigationBarStylesIOS.Stages.Center.RightButton,{top:StatusBarHeight,height:TotalNavHeight-StatusBarHeight}]}
                    pointerEvents="box-none"
                >
                    {rightButton&&rightButton(route,navigation)||this._rightButton(route,navigation)}
                </View>
            </Animated.View>
        );
    }

    _title(route, navigation) {
        return (
            <View style={{flex:1,flexDirection:'row'}}>
                <Text style={[Styles.navBarText,Styles.navBarTitleText]}>
                    {route.title}
                </Text>
            </View>
        );
    }

    _rightButton(route, navigation) {
        const {
            rightButtonIcon, rightButtonTitle, onRightButtonPress,
        } = route;

        if (rightButtonIcon === undefined && rightButtonTitle === undefined) {
            return null;
        };

        return (
            <NavigationBarButton
                style={Styles.navBarRightButton}
                title={rightButtonTitle}
                icon={rightButtonIcon}
                onPress={onRightButtonPress}
            >
            </NavigationBarButton>
        );;
    };

    _leftButton(route, navigation) {
        const {
            leftButtonIcon, leftButtonTitle, onLeftButtonPress,
            backButtonIcon, backButtonTitle,
        } = route;

        let index = route.index;

        if (index === 0) {
            if (leftButtonIcon || leftButtonTitle) {
                return (
                    <NavigationBarButton
                        style={Styles.navBarLeftButton}
                        title={leftButtonTitle}
                        icon={leftButtonIcon}
                        onPress={onLeftButtonPress}
                    >
                    </NavigationBarButton>
                );
            };
            return null;
        }

        let previousRoute = navigation.routeStack[index - 1];


        let defalutBackButtonTitle = previousRoute.title;
        let onBackButtonPress = () => {
            navigation.pop();
        };

        let title = undefined;
        let icon = undefined;

        if (leftButtonTitle || leftButtonIcon) {
            title = leftButtonTitle;
            icon = leftButtonIcon;
        } else {
            title = (backButtonTitle || defalutBackButtonTitle);
            icon = backButtonIcon;
        }
        // title={leftButtonTitle||backButtonTitle||defalutBackButtonTitle}
        // icon={leftButtonIcon||backButtonIcon}

        return (
            <NavigationBarButton
                    style={Styles.navBarLeftButton}
                    title={title}
                    icon={icon}
                    onPress={onLeftButtonPress||onBackButtonPress}
                    >
            </NavigationBarButton>
        );
    }

}

export default NavigationBar;