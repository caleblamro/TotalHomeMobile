# Total Home Mobile (development version)
TotalHome is meant to provide a platform for homeowners to organize their home services, and centralize the payment for easy management. It is built with React Native Expo + Typescript. To learn about how to contribute, continue reading. To skip to the components overview, click here.

## Components
### Animation
- **Location**: `./src/components/animation/Animation.ts`
- **Props**: not applicable
- **Purpose**: define reusable animations
- **Usage**: 
    - import the animation you'd like to use
    - wrap the component you want to animate in a `MotiView`
    - spread the animation into the `MotiView` component like `<MotiView { ...fadeInFromBottom(1) } />`
- **Exports**:
    - `const fadeInFromBottom = (delay:number) => MotiProps<ViewStyle>`: fades element in from the bottom, with a delay of `delay * 200` milliseconds
    - `const fadeInOutFromBottom: MotiProps<ViewStyle>`: fades element in and out (commonly used when a component is wrapped in `AnimatePresence`)
    - `const fadeInFromTop: MotiProps<ViewStyle>`: fades element in from top, similar to `fadeInFromBottom`
    - `const fadeInFromLeft: MotiProps<ViewStyle>`: fades element in from left, similar to `fadeInFromBottom`
    - `const fadeInFromRight: MotiProps<ViewStyle>`: fades element in from right, similar to `fadeInFromBottom`
### Button
- **Location**: `./src/components/button/Button.tsx`
- **Props**: `{ style?: ViewStyle, type: ButtonType, children?: React.ReactNode, onPress: () => void, accessibilityLabel: string}`
- **Purpose**: allows for a highly configurable button, which matches the design of Total Home
- **Usage**: pass your props and children (see `./src/global/styles/Styles.ts` to see how the view lays out children by default)
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
- **Usage**: pass props and children (see `./src/global/styles/Styles.ts` for more info on how card lays out children)
- **Exports**: exports `CardContainer` as default
### ServiceCard
- **Location**: `./src/components/cards/ServiceCard.tsx`
- **Props**: `extends CardContainerProps {
    service: Service;
}`
- **Purpose**: display a service in a condensed and simple manner
- **Usage**: similar to CardContainer, just pass the service you want to render
- **Exports**: exports `ServiceContainer` as default
### Form (not a permanent solution)
- **Location**: `./src/components/input/Form.tsx`
- **Props**: `{
    fields: FormField[];
    animationDelay?: number; // to sync animations with parent component
    onSubmit: (data: { [key: string]: any }) => void; // this is the main issue area, we need to be more safe with what types to expect from a key
}`
- **Purpose**: render form fields in a dynamic manner
- **Usage**: pass `FormField[]` to `Form` component
- **Exports**: exports `Form` as default
### Input
- **Location**: `./src/components/input/Input.tsx`
- **Props**: `{
    animationProps?: MotiProps<ViewStyle>;
    style?: ViewStyle;
    inputProps?: InputItemProps;
    icon?: React.ReactNode;
}`
- **Purpose**: render different input types consistent with the application style (note - only supports `TextInput` as of now, but will support other types soon)
- **Usage**: shouldn't have to be used individually, as `Form` should handle the rendering of different inputs, but if you need to see `./src/global/screens/auth/login/Auth.tsx`
- **Exports**: exports `Input` as default
### Modal
- **Location**: `./src/components/modal/Modal.tsx`
- **Props**: `{
    title: string;
    subtitle?: string;
    children?: React.ReactNode;
    style?: ViewStyle;
    onClose: () => void;
    open: boolean;
}`
- **Purpose**: opens a modal on the screen, used when we don't want to make a new screen but need to display a new page of content to the user
- **Usage**: 
    - modal is displayed when `ModalProps.open === true`
    - add your content as a child to the modal
- **Exports**: exports `Modal` as default
### ModalController
- **Location**: `./src/components/modal/ModalController.tsx`
- **Props**: `{
    title: string;
    subtitle?: string;
    isLink?: boolean;
    link?: string;
    icon: React.ReactNode;
    children: React.ReactNode;
}`
- **Purpose**: nicely displays one way to open the modal (used in `./src/global/screens/owner/settings/OwnerSettings.tsx`)
- **Usage**: `ModalControllerProps.children` will be passed to the modal
- **Exports**: exports `ModalController` as default
### Step
- **Location**: `./src/components/step/Step.tsx`
- **Props**: `{
    title: string;
    subTitle: string;
    number: number;
    animationProps: MotiProps<ViewStyle>;
    style?: ViewStyle;
}`
- **Purpose**: nicely displays a "step" to the user, used in `./src/global/screens/auth/signup/Signup.tsx`
- **Usage**: simply pass props and render the component
- **Exports**: exports `Step` as default
### Tag
- **Location**: `./src/components/tag/Tag.tsx`
- **Props**: `{
    name: string;
    icon: React.ReactElement;
    color: string;
}`
- **Purpose**: similar to most tag components, it's meant to allow the user to easily distinguish different categories of services
- **Usage**: simply pass props and render the component
- **Exports**: exports `Tag` as default