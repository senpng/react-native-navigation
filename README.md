# react-native-navigation

# Example

```javascript
<Navigation
    initialRoute = {{title: 'Home',component:MainView,navigationBarHidden:true}}
/>
```

# API

## push

```javascript
this.props.navigation.push({
            component: Component,
            title: 'next',
            navigationBarHidden: false,
            backButtonTitle: 'Close',
            // rightButtonTitle: 'ABC',
        });
```

## pop

```javascript
this.props.navigation.pop();
```