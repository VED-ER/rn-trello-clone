import { Button, View } from "react-native";
import { useAuth } from "@clerk/clerk-expo";

export default function Account() {
    const { signOut } = useAuth();
    return (
        <View>
            <Button title={"Sign out"} onPress={() => signOut()} />
        </View>
    );
}
