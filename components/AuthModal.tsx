import { Text, TouchableOpacity } from "react-native";
import { AuthStrategy, ModalType } from "@/types/enums";
import { BottomSheetView } from "@gorhom/bottom-sheet";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { images } from "@/constants";

const LOGIN_OPTIONS = [
    {
        text: "Continue with Google",
        icon: images.google,
        strategy: AuthStrategy.Google,
    },
    {
        text: "Continue with Microsoft",
        icon: images.microsoft,
        strategy: AuthStrategy.Microsoft,
    },
    {
        text: "Continue with Apple",
        icon: images.apple,
        strategy: AuthStrategy.Apple,
    },
    {
        text: "Continue with Slack",
        icon: images.slack,
        strategy: AuthStrategy.Slack,
    },
];

interface AuthModalProps {
    type: ModalType | null;
}

export default function AuthModal({ type }: AuthModalProps) {
    const onSelectedAuth = async (strategy: AuthStrategy) => {
        console.log(strategy);
        // TODO: Clerk auth
        // TODO: add email log in/sign up
    };
    return (
        <BottomSheetView style={{ flex: 1, gap: 20, padding: 20 }}>
            <TouchableOpacity className={"flex-row gap-4 items-center"}>
                <Ionicons name={"mail-outline"} size={20} />
                <Text className={"text-lg"}>
                    {type === ModalType.Login ? "Log in with email" : "Sign up with email"}
                </Text>
            </TouchableOpacity>

            {LOGIN_OPTIONS.map((option) => (
                <TouchableOpacity
                    key={option.strategy}
                    className={"flex-row gap-4 items-center"}
                    onPress={() => onSelectedAuth(option.strategy)}
                >
                    <Image source={option.icon} className={"w-6 h-6 overflow-visible"} />
                    <Text className={"text-lg"}>{option.text}</Text>
                </TouchableOpacity>
            ))}
        </BottomSheetView>
    );
}
