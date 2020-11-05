import * as React from 'react'
import { useNavigationBuilder, createNavigatorFactory, StackRouter } from '@react-navigation/native';
import { NativeStackView } from 'react-native-screens/native-stack'

const ModalStackRouter = options => {
    const router = StackRouter(options)
    const onFailedStateChange = options.onFailedStateChange
  
    return {
        ...router,

        getStateForAction(state, action, options) {
            const newState = router.getStateForAction(state, action, options)

            if (!newState && 
                typeof onFailedStateChange == 'function'){
                onFailedStateChange(state, action, options)
                return state
            }

            return newState
        }
    }
}

function StackNavigator({
    initialRouteName,
    children,
    screenOptions,
    onFailedStateChange, //new!
    ...rest
}) {
    const router = useNavigationBuilder(ModalStackRouter, {
        initialRouteName,
        children,
        onFailedStateChange,
        screenOptions
    });

    return (
        <NativeStackView
            {...rest}
            {...router}
        />
    )
}

export const createNativeStackNavigator = createNavigatorFactory(StackNavigator)