import NavigatorNavigationBarStylesIOS from 'NavigatorNavigationBarStylesIOS';
import NavigatorNavigationBarStylesAndroid from 'NavigatorNavigationBarStylesAndroid';
const {
    isAndroid,
} = require('../../utils/CommonUtils');
import cssVar from 'cssVar';
const NavigatorNavigationBarStyles = isAndroid ? NavigatorNavigationBarStylesAndroid : NavigatorNavigationBarStylesIOS;
const TotalNavHeight = NavigatorNavigationBarStyles.General.TotalNavHeight;

module.exports = {
    container: {
        flex: 1,
        overflow: 'hidden',
    },
    navBar: {
        height: TotalNavHeight,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: 'transparent',
    },
    navBarText: {
        fontSize: 16,
        alignSelf: 'center',
    },
    navBarButtonText: {
        color: cssVar('fbui-accent-blue'),
    },
    navBarButton: {
        flex: 1,
        position: 'relative',
    },
    navBarLeftButton: {
        paddingLeft: 10,
        flex: 1,
    },
    navBarRightButton: {
        paddingRight: 10,
        flex: 1,
    },

    border: {
        borderWidth: 1,
        borderColor: 'gray'
    },
};