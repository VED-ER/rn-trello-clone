import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { images } from "@/constants";
import Button from "@/components/Button";
import { ModalType } from "@/types/enums";
import * as WebBrowser from "expo-web-browser";
import { useActionSheet } from "@expo/react-native-action-sheet";
import {
    BottomSheetBackdrop,
    BottomSheetModal,
    BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { useCallback, useMemo, useRef, useState } from "react";
import AuthModal from "@/components/AuthModal";

export default function Index() {
    const { showActionSheetWithOptions } = useActionSheet();
    const bottomSheetRef = useRef<BottomSheetModal>(null);
    const snapPoints = useMemo(() => ["33%"], []);
    const [authType, setAuthType] = useState<ModalType | null>(null);

    const openLink = () => {
        WebBrowser.openBrowserAsync("https://vedranerak.vercel.app");
    };
    const openActionSheet = async () => {
        const options = ["View support docs", "Contact us", "Cancel"];
        const cancelButtonIndex = 2;

        showActionSheetWithOptions(
            {
                title: "Can't log in or sign up?",
                options,
                cancelButtonIndex,
            },
            (buttonIndex) => {
                if (buttonIndex === 0 || buttonIndex === 1) {
                    WebBrowser.openBrowserAsync("https://vedranerak.vercel.app");
                }
            },
        );
    };
    const showModal = async (type: ModalType) => {
        setAuthType(type);
        bottomSheetRef.current?.present();
    };

    const renderBackdrop = useCallback(
        (props: any) => (
            <BottomSheetBackdrop
                opacity={0.5}
                appearsOnIndex={0}
                disappearsOnIndex={-1}
                {...props}
                onPress={() => bottomSheetRef.current?.close()}
            />
        ),
        [],
    );
    return (
        <BottomSheetModalProvider>
            <SafeAreaView className={"flex-1 items-center bg-primary pt-7"}>
                <Image
                    source={images.loginTrello}
                    className={"h-[450px] w-full"}
                    contentFit={"contain"}
                />
                <Text className={"font-semibold text-white text-lg p-7 text-center"}>
                    Move teamwork forward -{"\n"} even on the go
                </Text>

                <View className={"w-full px-10 gap-y-3"}>
                    <Button title={"Log in"} onPress={() => showModal(ModalType.Login)} />
                    <Button
                        title={"Sign up"}
                        onPress={() => showModal(ModalType.SignUp)}
                        bgVariant={"outline"}
                        textVariant={"secondary"}
                    />
                    <View className={"mt-2"}>
                        <Text className={"text-[12px] text-center text-white mx-16"}>
                            By signing up, you agree to the{" "}
                            <Text
                                className={"text-[12px] text-center text-white mx-14 underline"}
                                onPress={openLink}
                            >
                                User Notice
                            </Text>{" "}
                            and{" "}
                            <Text
                                className={"text-[12px] text-center text-white mx-14 underline"}
                                onPress={openLink}
                            >
                                Privacy Policy
                            </Text>
                            .
                        </Text>

                        <Text
                            className={"text-[12px] text-center text-white mx-14 mt-2 underline"}
                            onPress={openActionSheet}
                        >
                            Can't log in or sign up?
                        </Text>
                    </View>
                </View>
            </SafeAreaView>
            <BottomSheetModal
                ref={bottomSheetRef}
                index={0}
                snapPoints={snapPoints}
                handleComponent={null}
                enableOverDrag={false}
                backdropComponent={renderBackdrop}
            >
                <AuthModal type={authType} />
            </BottomSheetModal>
        </BottomSheetModalProvider>
    );
}
