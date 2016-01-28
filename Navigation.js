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
    Image,
}
from 'react-native';
import cssVar from 'cssVar';
import NavigationBar from './NavigationBar';

const {
    isAndroid,
} = require('../../utils/CommonUtils');

class Navigation extends Component {

    static PropTypes = {
        initialRoute: PropTypes.shape({
            component: PropTypes.func.isRequired,

            title: PropTypes.string.isRequired,

            backButtonIcon: Image.propTypes.source,
            backButtonTitle: PropTypes.string,

            leftButtonIcon: Image.propTypes.source,
            leftButtonTitle: PropTypes.string,
            onLeftButtonPress: PropTypes.func,

            rightButtonIcon: Image.propTypes.source,
            rightButtonTitle: PropTypes.string,
            onRightButtonPress: PropTypes.func,

            navigationBarHidden: PropTypes.bool,
        }),

        navigationBar: PropTypes.object,
    };

    state = {
        scenePaddingTop: 0,
    };

    constructor(props) {
        super(props)

        this._components = [props.initialRoute.component];

    }

    get routeStack() {
        return this._navigator.state.routeStack;
    }

    /**
     * push
     *
     * @param  {Object} route 需要push的视图组件
     */
    push(route: Object) {

        let index = this._navigator.state.presentedIndex;

        this._components[++index] = route.component;

        route.index = index;

        this._navigator.push(route);
    }

    /**
     * pop
     */
    pop() {
        this._navigator.pop();
    }

    getCurrentRoute() {
        return this._navigator.state.routeStack[this._navigator.state.presentedIndex];
    }

    setNavigationBarHidden(hidden: bool, animated: bool) {
        this._navigator.state.routeStack[this._navigator.state.presentedIndex].navigationBarHidden = hidden;
        // this._navigator.setState({});
        this.navigationBar.hidden(hidden, animated);
    }

    render() {

        let configureScene = {
            ...Navigator.SceneConfigs.PushFromRight,
                transformScale: null,
                opacity: {
                    from: 1,
                    to: 0.8,
                    min: 0,
                    max: 1,
                    type: 'linear',
                    extrapolate: false,
                    round: 100,
                },
        }

        return (
            <Navigator
                initialRoute = {this.props.initialRoute}
                renderScene = {this._renderScene.bind(this)}
                configureScene={(route) => configureScene}
                ref = {(navigator) => {this._navigator=navigator}}
            />
        );
    }

    _renderScene(route, navigator) {
        if (route.navigationBarHidden === undefined) {
            route.navigationBarHidden = true;
        };

        if (route.index === undefined) {
            route.index = 0;
        };

        let index = route.index;
        let Component = this._components[index];

        return (
            <View style={styles.container}>
                <View style={[styles.scene,{paddingTop:this.state.scenePaddingTop}]}>
                    <Component {...this.props.initialRoute.passProps} navigation={this}/>
                </View>
                <NavigationBar
                    style={{backgroundColor:'white'}}

                    hidden={route.navigationBarHidden}

                    route={route}
                    navigation={this}
                    ref={(navBar)=>this.navigationBar = navBar}
                    />
            </View>
        );
    }

    componentDidMount() {

        let navigator = this._navigator;

        let callback = (event) => {
            console.log(
                `Navigation : event ${event.type}`, {
                    route: JSON.stringify(event.data.route),
                    target: event.target,
                    type: event.type,
                }
            );
        };

        // Observe focus change events from this component.
        this._listeners = [
            navigator.navigationContext.addListener('willfocus', callback),
            // navigator.navigationContext.addListener('didfocus', callback),
        ];
    }

    componentWillUnmount() {
        this._listeners && this._listeners.forEach(listener => listener.remove());
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        overflow: 'hidden',
    },
    scene: {
        flex: 1,
        // paddingTop: TotalNavHeight,
        // backgroundColor: '#EAEAEA',
    },
    border: {
        borderWidth: 1,
        borderColor: 'gray'
    },
});


export default Navigation;