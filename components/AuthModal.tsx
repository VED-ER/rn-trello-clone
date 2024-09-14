import { Text, TouchableOpacity } from "react-native";
import { AuthStrategy, ModalType } from "@/types/enums";
import { BottomSheetView } from "@gorhom/bottom-sheet";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { images } from "@/constants";
import { useOAuth, useSignIn, useSignUp } from "@clerk/clerk-expo";
import { useWarmUpBrowser } from "@/hooks/useWarmUpBrowser";

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
    useWarmUpBrowser();
    const { setActive, signUp } = useSignUp();
    const { signIn } = useSignIn();
    const { startOAuthFlow: googleAuth } = useOAuth({ strategy: AuthStrategy.Google });
    const { startOAuthFlow: microsoftAuth } = useOAuth({ strategy: AuthStrategy.Microsoft });
    const { startOAuthFlow: appleAuth } = useOAuth({ strategy: AuthStrategy.Apple });
    const { startOAuthFlow: slackAuth } = useOAuth({ strategy: AuthStrategy.Slack });

    // TODO: add email log in/sign up
    const onSelectedAuth = async (strategy: AuthStrategy) => {
        if (!signIn || !signUp) return;
        const selectedAuth = {
            [AuthStrategy.Google]: googleAuth,
            [AuthStrategy.Microsoft]: microsoftAuth,
            [AuthStrategy.Apple]: appleAuth,
            [AuthStrategy.Slack]: slackAuth,
        }[strategy];

        // If the user has an account in your application, but does not yet
        // have an OAuth account connected to it, you can transfer the OAuth
        // account to the existing user account.
        const userExistsButNeedsToSignIn =
            signUp.verifications.externalAccount.status === "transferable" &&
            signUp.verifications.externalAccount.error?.code === "external_account_exists";

        if (userExistsButNeedsToSignIn) {
            const res = await signIn.create({ transfer: true });

            if (res.status === "complete") {
                setActive({
                    session: res.createdSessionId,
                });
            }
        }

        // If the user has an OAuth account but does not yet
        // have an account in your app, you can create an account
        // for them using the OAuth information.
        const userNeedsToBeCreated = signIn.firstFactorVerification.status === "transferable";

        if (userNeedsToBeCreated) {
            const res = await signUp.create({
                transfer: true,
            });

            if (res.status === "complete") {
                setActive({
                    session: res.createdSessionId,
                });
            }
        } else {
            // If the user has an account in your application
            // and has an OAuth account connected to it, you can sign them in.
            try {
                const { setActive, createdSessionId } = await selectedAuth();

                if (createdSessionId) {
                    setActive!({ session: createdSessionId });
                    console.log("Session created");
                }
            } catch (err) {
                console.log(err);
            }
        }
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
