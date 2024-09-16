import { Tabs } from "expo-router";
import { FontAwesome, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { images } from "@/constants";
import { colors } from "@/constants/tailwind-colors";

export default function TabsLayout() {
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: colors.primary,
                headerStyle: {
                    backgroundColor: colors.primary,
                },
                headerTitleStyle: {
                    color: colors.white,
                    fontSize: 20,
                    fontWeight: "700",
                },
                tabBarLabelStyle: { fontSize: 12 },
                tabBarStyle: {
                    height: 90,
                    paddingTop: 10,
                },
            }}
        >
            <Tabs.Screen
                name="boards"
                options={{
                    headerShown: false,
                    title: "Boards",
                    tabBarIcon: ({ size, color, focused }) => (
                        <Image
                            style={{ width: size + 5, height: size + 5 }}
                            source={focused ? images.logoIconBlue : images.logoIconNeutral}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="my-cards"
                options={{
                    title: "My Cards",
                    tabBarIcon: ({ size, color }) => (
                        <MaterialCommunityIcons
                            name="view-dashboard-variant-outline"
                            size={size + 5}
                            color={color}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="search"
                options={{
                    title: "Search",
                    tabBarIcon: ({ size, color }) => (
                        <Ionicons name="search" size={size + 5} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="notifications"
                options={{
                    title: "Notifications",
                    tabBarIcon: ({ size, color }) => (
                        <Ionicons name="notifications-outline" size={size + 5} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="account"
                options={{
                    title: "Account",
                    tabBarIcon: ({ size, color }) => (
                        <FontAwesome name="user-circle" size={size} color={color} />
                    ),
                }}
            />
        </Tabs>
    );
}
