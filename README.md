# Total Home Mobile (development version)
TotalHome is meant to provide a platform for homeowners to organize their home services, and centralize the payment for easy management. It is built with React Native Expo + Typescript. To learn about how to contribute, continue reading. To skip to the components overview, click here.

## Components
### Animation
- **Location**: `./src/components/animation/Animation.ts`
- **Props**: not applicable
- **Purpose**: define reusable animations
- **Usage**: 
    1. import the animation you'd like to use
    2. wrap the component you want to animate in a `MotiView`
    3. spread the animation into the `MotiView` component like `<MotiView { ...fadeInFromBottom(1) } />`
- **Exports**:
    - `const fadeInFromBottom = (delay:number) => MotiProps<ViewStyle>`: fades element in from the bottom, with a delay of `delay * 200` miliseconds
    - `const fadeInOutFromBottom: MotiProps<ViewStyle>`: fades element in and out (commonly used when a component is wrapped in `AnimatePresence`)
    - `const fadeInFromTop: MotiProps<ViewStyle>`: fades element in from top, similar to `fadeInFromBottom`
    - `const fadeInFromLeft: MotiProps<ViewStyle>`: fades element in from left, similar to `fadeInFromBottom`
    - `const fadeInFromRight: MotiProps<ViewStyle>`: fades element in from right, similar to `fadeInFromBottom`
### Button
- **Location**: `./src/components/button/Button.tsx`
- **Props**: `{ style?: ViewStyle, type: ButtonType, children?: React.ReactNode, onPress: () => void, accessibilityLabel: string}`
- **Purpose**: allows for a highly configurable button, which matches the design of Total Home
- **Usage**: 
    1. import the button component
    2. pass your props and children (see `./src/global/styles/Styles.ts` to see how the view lays out children by default)
- **Exports**: exports `Button` as default
### SelectButton
- **Location**: `./src/components/button/SelectButton.tsx`
- **Props**: `{
    label: string;
    iconName: keyof typeof Ionicons.glyphMap;
    isSelected: boolean;
    onPress: () => void;
    accessibilityLabel: string;
    defaultColor: string;
    selectedColor: string;
}`
- **Purpose**: works as a normal select, but is animated with Moti
- **Usage**: same as button (be sure to add all required props)
- **Exports**: exports `SelectButton` as default
### CardContainer
- **Location**: `./src/components/cards/CardContainer.tsx`
- **Props**: `{
    animationProps?: MotiProps<ViewStyle>;
    style?: ViewStyle;
    children?: React.ReactNode;
}`
- **Purpose**: base card for all the different card types, works great against the primary background color (see `./src/global/theme/Theme.tsx`)
- **Usage**:
    1. import CardContainer
    2. pass props and children (see `./src/global/styles/Styles.ts` for more info on how card lays out children)
- **Exports**: exports `CardContainer` as default
### ServiceCard
- **Location**: `./src/components/cards/ServiceCard.tsx`
- **Props**: `extends CardContainerProps {
    service: Service;
}`
- **Purpose**: display a service in a condensed and simple manner
- **Usage**: similar to CardContainer, just pass the service you want to render
- **Exports**: exports `ServiceContainer` as default












